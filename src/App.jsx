import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CurrencyProvider } from './context/CurrencyContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './components/landing/HeroSection';
import { StatsSection } from './components/landing/StatsSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { LeaderboardSection } from './components/landing/LeaderboardSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { FAQSection } from './components/landing/FAQSection';

import { BusinessDashboard } from './components/dashboard/BusinessDashboard';
import { InfluencerDashboard } from './components/dashboard/InfluencerDashboard';
import { ExploreCampaignsView } from './components/campaign/ExploreCampaignsView';
import { TransactionsView } from './components/transactions/TransactionsView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { AdminPanel } from './components/dashboard/AdminPanel';

import { AuthModal } from './components/auth/AuthModal';
import { CreateCampaignModal } from './components/campaign/CreateCampaignModal';
import { CampaignDetailModal } from './components/campaign/CampaignDetailModal';
import { ApplyModal } from './components/campaign/ApplyModal';
import { CampaignManagement } from './components/campaign/CampaignManagement';
import { SettingsModal } from './components/common/SettingsModal';

import { ChatWindow } from './components/chat/ChatWindow';
import { UserProfileView } from './components/profile/UserProfileView';
import { PaymentModal } from './components/deal/PaymentModal';
import { InvoiceModal } from './components/deal/InvoiceModal';
import { QRCodeModal } from './components/common/QRCodeModal';
import { AIChatbot } from './components/ai/AIChatbot';

const MainAppContent = () => {
  const { currentUser, isBusiness, logout } = useAuth();
  
  // Default view: if user logged in, go straight to dashboard. Otherwise public landing page.
  const [activeView, setActiveView] = useState(() => currentUser ? 'dashboard' : 'landing');
  const [chatTargetUserId, setChatTargetUserId] = useState(null);

  // MODAL STATES
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [selectedDetailCamp, setSelectedDetailCamp] = useState(null);
  const [selectedApplyCamp, setSelectedApplyCamp] = useState(null);

  const [selectedPaymentDeal, setSelectedPaymentDeal] = useState(null);
  const [selectedInvoiceDeal, setSelectedInvoiceDeal] = useState(null);
  const [selectedQRDeal, setSelectedQRDeal] = useState(null);

  const openAuthModal = (mode = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  // DIRECT CHAT HANDLER: Closes open modals & navigates immediately to 'chat' view!
  const handleOpenChat = (targetId) => {
    setSelectedDetailCamp(null);
    setSelectedApplyCamp(null);
    if (targetId) {
      setChatTargetUserId(targetId);
    }
    setActiveView('chat');
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setActiveView('landing'); // Redirect directly to public landing page on logout!
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-purple-500 selection:text-white">
      
      {/* STICKY NAVBAR */}
      <Navbar 
        activeView={activeView}
        setActiveView={setActiveView}
        openAuthModal={openAuthModal}
        openCreateCampaignModal={() => setIsCreateCampOpen(true)}
        openSettingsModal={() => setIsSettingsOpen(true)}
        onLogoutClick={handleLogout}
      />

      {/* DYNAMIC VIEW ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* LOGGED-OUT USERS: PUBLIC LANDING PAGE */}
        {!currentUser && activeView === 'landing' && (
          <div className="space-y-12 animate-fadeIn">
            <HeroSection setActiveView={setActiveView} openAuthModal={openAuthModal} />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <LeaderboardSection setActiveView={setActiveView} />
            <TestimonialsSection />
            <FAQSection />
          </div>
        )}

        {/* LOGGED-IN USERS: PERSONAL DASHBOARD WORKSPACE */}
        {currentUser && (activeView === 'dashboard' || activeView === 'landing') && (
          <div className="animate-fadeIn">
            {isBusiness ? (
              <BusinessDashboard 
                setActiveView={setActiveView}
                openCreateCampaignModal={() => setIsCreateCampOpen(true)}
                onChatClick={handleOpenChat}
                openPaymentModal={(deal) => setSelectedPaymentDeal(deal)}
                openInvoiceModal={(deal) => setSelectedInvoiceDeal(deal)}
              />
            ) : (
              <InfluencerDashboard 
                setActiveView={setActiveView}
                openApplyModal={(camp) => setSelectedApplyCamp(camp)}
                onChatClick={handleOpenChat}
                onViewDetailClick={(camp) => setSelectedDetailCamp(camp)}
              />
            )}
          </div>
        )}

        {/* EXPLORE CAMPAIGNS PORTAL */}
        {activeView === 'explore' && (
          <div className="animate-fadeIn">
            <ExploreCampaignsView 
              openApplyModal={(camp) => setSelectedApplyCamp(camp)}
              onChatClick={handleOpenChat}
              onViewDetailClick={(camp) => setSelectedDetailCamp(camp)}
            />
          </div>
        )}

        {/* DEDICATED MESSAGES & CHATS */}
        {activeView === 'chat' && (
          <div className="animate-fadeIn">
            <ChatWindow targetUserId={chatTargetUserId} />
          </div>
        )}

        {/* DEDICATED TRANSACTIONS & PAYMENTS */}
        {activeView === 'transactions' && (
          <div className="animate-fadeIn">
            <TransactionsView 
              openInvoiceModal={(deal) => setSelectedInvoiceDeal(deal)}
            />
          </div>
        )}

        {/* LEADERBOARDS */}
        {activeView === 'leaderboard' && (
          <div className="animate-fadeIn">
            <LeaderboardSection setActiveView={setActiveView} />
          </div>
        )}

        {/* USER PROFILE */}
        {activeView === 'profile' && (
          <div className="animate-fadeIn">
            <UserProfileView onChatClick={handleOpenChat} />
          </div>
        )}

        {/* CAMPAIGN MANAGEMENT / DEALS */}
        {activeView === 'campaign-manage' && (
          <div className="animate-fadeIn">
            <CampaignManagement 
              onChatClick={handleOpenChat}
              openCreateModal={() => setIsCreateCampOpen(true)}
            />
          </div>
        )}

        {/* ANALYTICS */}
        {activeView === 'analytics' && (
          <div className="animate-fadeIn">
            <AnalyticsView />
          </div>
        )}

        {/* ADMIN PANEL */}
        {activeView === 'admin' && (
          <div className="animate-fadeIn">
            <AdminPanel />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer setActiveView={setActiveView} />

      {/* FLOATING AI COPILOT BOT */}
      <AIChatbot />

      {/* MODALS */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={handleAuthSuccess}
        initialMode={authInitialMode}
      />

      <CreateCampaignModal 
        isOpen={isCreateCampOpen}
        onClose={() => setIsCreateCampOpen(false)}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <CampaignDetailModal 
        campaign={selectedDetailCamp}
        isOpen={!!selectedDetailCamp}
        onClose={() => setSelectedDetailCamp(null)}
        onApplyClick={(camp) => setSelectedApplyCamp(camp)}
        onChatClick={handleOpenChat}
      />

      <ApplyModal 
        campaign={selectedApplyCamp}
        isOpen={!!selectedApplyCamp}
        onClose={() => setSelectedApplyCamp(null)}
      />

      <PaymentModal 
        deal={selectedPaymentDeal}
        isOpen={!!selectedPaymentDeal}
        onClose={() => setSelectedPaymentDeal(null)}
      />

      <InvoiceModal 
        deal={selectedInvoiceDeal}
        isOpen={!!selectedInvoiceDeal}
        onClose={() => setSelectedInvoiceDeal(null)}
      />

      <QRCodeModal 
        deal={selectedQRDeal}
        isOpen={!!selectedQRDeal}
        onClose={() => setSelectedQRDeal(null)}
      />

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CurrencyProvider>
          <DataProvider>
            <MainAppContent />
          </DataProvider>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
