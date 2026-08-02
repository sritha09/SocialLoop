import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CurrencyProvider } from './context/CurrencyContext';

// COMPONENTS
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';

// LANDING SECTIONS
import { HeroSection } from './components/landing/HeroSection';
import { StatsSection } from './components/landing/StatsSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { HowItWorksSection } from './components/landing/HowItWorksSection';
import { LeaderboardSection } from './components/landing/LeaderboardSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { FAQSection } from './components/landing/FAQSection';

// CORE PLATFORM VIEWS
import { HomeFeed } from './components/feed/HomeFeed';
import { BusinessDashboard } from './components/dashboard/BusinessDashboard';
import { InfluencerDashboard } from './components/dashboard/InfluencerDashboard';
import { ExploreCampaignsView } from './components/campaign/ExploreCampaignsView';
import { ChatWindow } from './components/chat/ChatWindow';
import { CampaignManagement } from './components/campaign/CampaignManagement';
import { TransactionsView } from './components/transactions/TransactionsView';
import { UserProfileView } from './components/profile/UserProfileView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';

// MODALS
import { AuthModal } from './components/auth/AuthModal';
import { CreateCampaignModal } from './components/campaign/CreateCampaignModal';
import { CreatePostModal } from './components/feed/CreatePostModal';
import { CampaignDetailModal } from './components/campaign/CampaignDetailModal';
import { ApplyModal } from './components/campaign/ApplyModal';
import { PaymentModal } from './components/deal/PaymentModal';
import { InvoiceModal } from './components/deal/InvoiceModal';
import { QRCodeModal } from './components/common/QRCodeModal';
import { SettingsModal } from './components/common/SettingsModal';
import { LegalModals } from './components/common/LegalModals';

const MainAppContent = () => {
  const { currentUser, isBusiness, logout } = useAuth();
  
  // Navigation View Router
  const [activeView, setActiveView] = useState('landing');
  const [viewingProfileUserId, setViewingProfileUserId] = useState(null);

  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  
  const [isCreateCampOpen, setIsCreateCampOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);

  const [chatTargetUserId, setChatTargetUserId] = useState(null);

  const [selectedDetailCamp, setSelectedDetailCamp] = useState(null);
  const [selectedApplyCamp, setSelectedApplyCamp] = useState(null);

  const [selectedPaymentDeal, setSelectedPaymentDeal] = useState(null);
  const [selectedInvoiceDeal, setSelectedInvoiceDeal] = useState(null);
  const [selectedQRDeal, setSelectedQRDeal] = useState(null);

  const openAuthModal = (mode = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenChat = (targetId) => {
    setSelectedDetailCamp(null);
    setSelectedApplyCamp(null);
    if (targetId) {
      setChatTargetUserId(targetId);
    }
    setActiveView('chat');
  };

  const handleViewProfile = (targetId) => {
    setViewingProfileUserId(targetId || currentUser?.id || null);
    setActiveView('profile');
  };

  const handleAuthSuccess = () => {
    setIsAuthOpen(false);
    setActiveView('feed');
  };

  const handleLogout = () => {
    logout();
    setViewingProfileUserId(null);
    setActiveView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#6D5EF8] selection:text-[#6D5EF8]">
      
      {/* STICKY NAVBAR */}
      <Navbar 
        activeView={activeView}
        setActiveView={(view) => {
          if (view === 'profile') setViewingProfileUserId(null);
          setActiveView(view);
        }}
        openAuthModal={openAuthModal}
        openCreateCampaignModal={() => setIsCreateCampOpen(true)}
        openSettingsModal={() => setIsSettingsOpen(true)}
        onLogoutClick={handleLogout}
        openLegalModal={(type) => setLegalModalType(type)}
        onOpenChat={handleOpenChat}
        onViewProfile={handleViewProfile}
      />

      {/* DYNAMIC VIEW ROUTER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-6">
        
        {/* LOGGED-OUT USERS: PUBLIC LANDING PAGE */}
        {!currentUser && activeView === 'landing' && (
          <div className="space-y-12">
            <HeroSection setActiveView={setActiveView} openAuthModal={openAuthModal} />
            <StatsSection />
            <FeaturesSection />
            <HowItWorksSection />
            <LeaderboardSection setActiveView={setActiveView} />
            <TestimonialsSection />
            <FAQSection />
          </div>
        )}

        {/* LOGGED-IN USERS: SOCIAL HOME FEED */}
        {currentUser && activeView === 'feed' && (
          <div className="animate-fadeIn">
            <HomeFeed 
              setActiveView={setActiveView}
              openApplyModal={(camp) => setSelectedApplyCamp(camp)}
              onViewDetailClick={(camp) => setSelectedDetailCamp(camp)}
              onChatClick={handleOpenChat}
              onViewProfile={handleViewProfile}
            />
          </div>
        )}

        {/* LOGGED-IN USERS: PERSONAL DASHBOARD WORKSPACE */}
        {currentUser && activeView === 'dashboard' && (
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

        {/* MESSAGING CHAT WINDOW */}
        {activeView === 'chat' && (
          <div className="animate-fadeIn">
            <ChatWindow 
              targetUserId={chatTargetUserId} 
              onViewProfile={handleViewProfile}
            />
          </div>
        )}

        {/* TRANSACTIONS & PAYMENTS */}
        {activeView === 'transactions' && (
          <div className="animate-fadeIn">
            <TransactionsView 
              openInvoiceModal={(deal) => setSelectedInvoiceDeal(deal)}
              openQRModal={(deal) => setSelectedQRDeal(deal)}
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
            <UserProfileView 
              userId={viewingProfileUserId || currentUser?.id}
              onOpenChat={handleOpenChat} 
              onViewProfile={handleViewProfile}
            />
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

      </main>

      {/* FOOTER */}
      <Footer setActiveView={setActiveView} openLegalModal={(type) => setLegalModalType(type)} />

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {currentUser && (
        <BottomNav 
          activeView={activeView}
          setActiveView={(view) => {
            if (view === 'profile') setViewingProfileUserId(null);
            setActiveView(view);
          }}
          openCreateCampaignModal={() => setIsCreateCampOpen(true)}
          openCreatePostModal={() => setIsCreatePostOpen(true)}
        />
      )}

      {/* MODALS */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authInitialMode}
      />

      <CreateCampaignModal 
        isOpen={isCreateCampOpen}
        onClose={() => setIsCreateCampOpen(false)}
      />

      <CreatePostModal 
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <LegalModals 
        activeModal={legalModalType}
        onClose={() => setLegalModalType(null)}
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
