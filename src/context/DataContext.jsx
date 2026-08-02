import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState(() => {
    const saved = localStorage.getItem('sl_campaigns');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(c => c && !['c1', 'c2', 'c3', 'c4'].includes(c.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('sl_applications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(a => a && !['app1', 'app2', 'app3'].includes(a.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [deals, setDeals] = useState(() => {
    const saved = localStorage.getItem('sl_deals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(d => d && !['d1', 'd2'].includes(d.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('sl_messages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(m => m && !['m1', 'm2', 'm3'].includes(m.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sl_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(n => n && !['n1', 'n2'].includes(n.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('sl_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(r => r && !['r1', 'r2'].includes(r.id));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [savedCampaigns, setSavedCampaigns] = useState(() => {
    const saved = localStorage.getItem('sl_saved_campaigns');
    return saved ? JSON.parse(saved) : [];
  });

  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('sl_posts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.filter(p => p && !['p1', 'p2', 'p3'].includes(p.id) && !['b1', 'b2', 'i1', 'i2'].includes(p.authorId));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [followingMap, setFollowingMap] = useState(() => {
    const saved = localStorage.getItem('sl_following');
    return saved ? JSON.parse(saved) : {};
  });

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('sl_campaigns', JSON.stringify(campaigns)); }, [campaigns]);
  useEffect(() => { localStorage.setItem('sl_applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('sl_deals', JSON.stringify(deals)); }, [deals]);
  useEffect(() => { localStorage.setItem('sl_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('sl_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('sl_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('sl_saved_campaigns', JSON.stringify(savedCampaigns)); }, [savedCampaigns]);
  useEffect(() => { localStorage.setItem('sl_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('sl_following', JSON.stringify(followingMap)); }, [followingMap]);

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

    addNotification({
      userId: campaignData.businessId,
      campaignId: newCamp.id,
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

  // COMPLETE CASCADE CAMPAIGN DELETION
  const deleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
    setApplications(prev => prev.filter(a => a.campaignId !== campaignId));
    setDeals(prev => prev.filter(d => d.campaignId !== campaignId));
    setSavedCampaigns(prev => prev.filter(id => id !== campaignId));
    setNotifications(prev => prev.filter(n => n.campaignId !== campaignId));
  };

  // APPLICATION ACTIONS
  const submitApplication = (appData) => {
    // Single application constraint per creator/campaign
    const existing = applications.find(a => a.campaignId === appData.campaignId && a.influencerId === appData.influencerId);
    if (existing) {
      return existing;
    }

    const newApp = {
      id: 'app' + Date.now(),
      status: 'Pending',
      appliedAt: new Date().toISOString().split('T')[0],
      ...appData
    };
    setApplications(prev => [newApp, ...prev]);

    setCampaigns(prev => prev.map(c => c.id === appData.campaignId ? { ...c, applicantsCount: (c.applicantsCount || 0) + 1 } : c));

    const campaign = campaigns.find(c => c.id === appData.campaignId);
    if (campaign) {
      addNotification({
        userId: campaign.businessId,
        campaignId: campaign.id,
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
          qrCodeToken: `SL-QR-${campaign.id}-${Date.now().toString().slice(-4)}`
        });
      }

      addNotification({
        userId: app.influencerId,
        campaignId: campaign?.id,
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
        if (updated.paymentMethod === 'Offline' && updated.offlineBusinessPaid && updated.offlineInfluencerReceived) {
          updated.paymentStatus = 'Completed';
          updated.status = 'Completed';
        }
        return updated;
      }
      return d;
    }));
  };

  // POST ACTIONS
  const addPost = (postData) => {
    const newPost = {
      id: 'p' + Date.now(),
      likesCount: 0,
      likedBy: [],
      commentsCount: 0,
      comments: [],
      sharesCount: 0,
      savesCount: 0,
      viewCount: 1,
      createdAt: new Date().toISOString(),
      ...postData,
    };
    setPosts(prev => [newPost, ...prev]);

    confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
    return newPost;
  };

  const deletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const likePost = (postId, userId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const hasLiked = p.likedBy?.includes(userId);
        const updatedLikes = hasLiked
          ? p.likedBy.filter(id => id !== userId)
          : [...(p.likedBy || []), userId];
        
        if (!hasLiked && p.authorId !== userId) {
          addNotification({
            userId: p.authorId,
            postId: p.id,
            title: 'New Like ❤️',
            message: `Someone liked your post "${p.caption?.slice(0, 30)}..."`,
            type: 'like'
          });
        }

        return {
          ...p,
          likedBy: updatedLikes,
          likesCount: updatedLikes.length
        };
      }
      return p;
    }));
  };

  const commentPost = (postId, commentData) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComments = [...(p.comments || []), { id: 'c' + Date.now(), ...commentData }];
        
        if (p.authorId !== commentData.authorId) {
          addNotification({
            userId: p.authorId,
            postId: p.id,
            title: 'New Comment 💬',
            message: `${commentData.authorName}: "${commentData.text?.slice(0, 35)}..."`,
            type: 'comment'
          });
        }

        return {
          ...p,
          comments: newComments,
          commentsCount: newComments.length
        };
      }
      return p;
    }));
  };

  // FOLLOW ACTIONS
  const followUser = (currentUserId, targetUserId) => {
    setFollowingMap(prev => {
      const currentList = prev[currentUserId] || [];
      const isFollowing = currentList.includes(targetUserId);
      const updated = isFollowing
        ? currentList.filter(id => id !== targetUserId)
        : [...currentList, targetUserId];

      if (!isFollowing) {
        addNotification({
          userId: targetUserId,
          senderId: currentUserId,
          title: 'New Follower! 👤',
          message: 'Someone started following your profile on SocialLoop.',
          type: 'follow'
        });
      }

      return { ...prev, [currentUserId]: updated };
    });
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
      senderId: msgData.senderId,
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
      toggleSaveCampaign,
      posts,
      addPost,
      deletePost,
      likePost,
      commentPost,
      followingMap,
      followUser
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
