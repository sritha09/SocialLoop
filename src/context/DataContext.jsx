import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_CAMPAIGNS,
  INITIAL_APPLICATIONS,
  INITIAL_DEALS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS
} from '../mockData/initialData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('ic_campaigns');
    return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('ic_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('ic_deals');
    return saved ? JSON.parse(saved) : INITIAL_DEALS;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('ic_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ic_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('ic_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [savedCampaigns, setSavedCampaigns] = useState(() => {
    const saved = localStorage.getItem('ic_saved_campaigns');
    return saved ? JSON.parse(saved) : ['c1'];
  });

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('ic_campaigns', JSON.stringify(campaigns)); }, [campaigns]);
  useEffect(() => { localStorage.setItem('ic_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('ic_deals', JSON.stringify(deals)); }, [deals]);
  useEffect(() => { localStorage.setItem('ic_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('ic_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('ic_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('ic_saved_campaigns', JSON.stringify(savedCampaigns)); }, [savedCampaigns]);

  // CAMPAIGN ACTIONS
  const createCampaign = (campaignData) => {
    const newCamp = {
      id: 'c' + Date.now(),
      status: 'Active',
      applicantsCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      image: campaignData.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
      ...campaignData,
    };
    setCampaigns(prev => [newCamp, ...prev]);

    // Send notification
    addNotification({
      userId: campaignData.businessId,
      title: 'Campaign Published!',
      message: `Your campaign "${newCamp.title}" is now live for creators.`,
      type: 'campaign'
    });

    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    return newCamp;
  };

  const updateCampaignStatus = (campaignId, newStatus) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: newStatus } : c));
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  // APPLICATION ACTIONS
  const submitApplication = (appData) => {
    const newApp = {
      id: 'app' + Date.now(),
      status: 'Pending',
      appliedAt: new Date().toISOString().split('T')[0],
      ...appData
    };
    setApplications(prev => [newApp, ...prev]);

    // Increment campaign applicants count
    setCampaigns(prev => prev.map(c => c.id === appData.campaignId ? { ...c, applicantsCount: (c.applicantsCount || 0) + 1 } : c));

    // Notify business owner
    const campaign = campaigns.find(c => c.id === appData.campaignId);
    if (campaign) {
      addNotification({
        userId: campaign.businessId,
        title: 'New Application Received',
        message: `An influencer applied for your campaign "${campaign.title}".`,
        type: 'application'
      });
    }

    confetti({ particleCount: 50, spread: 40 });
    return newApp;
  };

  const updateApplicationStatus = (appId, newStatus) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    
    const app = applications.find(a => a.id === appId);
    if (app && newStatus === 'Accepted') {
      const campaign = campaigns.find(c => c.id === app.campaignId);
      // Auto-create deal draft
      if (campaign) {
        createDeal({
          campaignId: campaign.id,
          businessId: campaign.businessId,
          influencerId: app.influencerId,
          finalPrice: app.expectedPrice || campaign.budget,
          deliverables: `Content package for ${campaign.title}`,
          deadline: campaign.date,
          terms: 'Standard campaign terms & guidelines.',
          paymentMethod: 'Online',
          status: 'Active',
          paymentStatus: 'Processing',
          qrCodeToken: `IC-QR-${campaign.id}-${Date.now().toString().slice(-4)}`
        });
      }

      addNotification({
        userId: app.influencerId,
        title: 'Application Accepted! 🎉',
        message: `Your application for "${campaign?.title || 'campaign'}" has been accepted!`,
        type: 'deal'
      });
    }
  };

  // DEAL ACTIONS
  const createDeal = (dealData) => {
    const newDeal = {
      id: 'd' + Date.now(),
      status: 'Active',
      paymentStatus: dealData.paymentMethod === 'Online' ? 'Processing' : 'Awaiting_Confirmation',
      offlineBusinessPaid: false,
      offlineInfluencerReceived: false,
      createdAt: new Date().toISOString().split('T')[0],
      ...dealData
    };
    setDeals(prev => [newDeal, ...prev]);
    return newDeal;
  };

  const updateDealPaymentStatus = (dealId, updates) => {
    setDeals(prev => prev.map(d => {
      if (d.id === dealId) {
        const updated = { ...d, ...updates };
        // Check if offline payment is fully confirmed by both sides
        if (updated.paymentMethod === 'Offline' && updated.offlineBusinessPaid && updated.offlineInfluencerReceived) {
          updated.paymentStatus = 'Completed';
          updated.status = 'Completed';
        }
        return updated;
      }
      return d;
    }));
  };

  // CHAT MESSAGES
  const sendMessage = (msgData) => {
    const newMsg = {
      id: 'm' + Date.now(),
      timestamp: new Date().toISOString(),
      isSeen: false,
      ...msgData
    };
    setMessages(prev => [...prev, newMsg]);

    addNotification({
      userId: msgData.receiverId,
      title: 'New Message 💬',
      message: msgData.text.slice(0, 45) + '...',
      type: 'message'
    });

    return newMsg;
  };

  // NOTIFICATION ACTIONS
  const addNotification = (notifData) => {
    const newNotif = {
      id: 'n' + Date.now(),
      timestamp: new Date().toISOString(),
      isRead: false,
      ...notifData
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, isRead: true } : n));
  };

  // REVIEWS
  const addReview = (reviewData) => {
    const newReview = {
      id: 'r' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...reviewData
    };
    setReviews(prev => [newReview, ...prev]);
    confetti({ particleCount: 70, spread: 50 });
  };

  // SAVED CAMPAIGNS (WISHLIST)
  const toggleSaveCampaign = (campaignId) => {
    setSavedCampaigns(prev => 
      prev.includes(campaignId) ? prev.filter(id => id !== campaignId) : [...prev, campaignId]
    );
  };

  return (
    <DataContext.Provider value={{
      campaigns,
      createCampaign,
      updateCampaignStatus,
      deleteCampaign,
      applications,
      submitApplication,
      updateApplicationStatus,
      deals,
      createDeal,
      updateDealPaymentStatus,
      messages,
      sendMessage,
      notifications,
      addNotification,
      markNotificationAsRead,
      reviews,
      addReview,
      savedCampaigns,
      toggleSaveCampaign
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
