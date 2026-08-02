import React, { useState } from 'react';
import { 
  Sun, Moon, Bell, User, LogOut, ChevronDown, 
  Menu, X, LayoutDashboard, Compass, MessageSquare, 
  DollarSign, Handshake, Settings as SettingsIcon, Home, Radio
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { SocialLoopLogo } from '../common/SocialLoopLogo';

export const Navbar = ({ activeView, setActiveView, openAuthModal, openSettingsModal, onLogoutClick, openLegalModal }) => {
  const { currentUser, isBusiness, switchDemoUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { currentCurrency } = useCurrency();
  const { notifications, markNotificationAsRead } = useData();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifs = currentUser 
    ? notifications.filter(n => n.userId === currentUser.id && !n.isRead) 
    : [];

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  const handleRoleSwitch = (userId) => {
    switchDemoUser(userId);
    setActiveView('feed');
  };

  const scrollToSection = (sectionId) => {
    if (activeView !== 'landing') {
      setActiveView('landing');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* BRAND LOGO */}
          <div onClick={() => handleNavClick(currentUser ? 'feed' : 'landing')}>
            <SocialLoopLogo />
          </div>

          {/* PUBLIC NAVIGATION BAR (WHEN LOGGED OUT) */}
          {!currentUser && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold">
              <button
                onClick={() => handleNavClick('landing')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  activeView === 'landing' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-4 py-1.5 text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8] rounded-full transition-all"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-4 py-1.5 text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8] rounded-full transition-all"
              >
                How It Works
              </button>
              <button
                onClick={() => openLegalModal('about')}
                className="px-4 py-1.5 text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8] rounded-full transition-all"
              >
                About
              </button>
            </nav>
          )}

          {/* DASHBOARD & SOCIAL NAVIGATION BAR (WHEN LOGGED IN) */}
          {currentUser && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-full border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold">
              <button
                onClick={() => handleNavClick('feed')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'feed' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Home Feed</span>
              </button>

              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'dashboard' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleNavClick('explore')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'explore' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore</span>
              </button>

              <button
                onClick={() => handleNavClick('chat')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'chat' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Messages</span>
              </button>

              <button
                onClick={() => handleNavClick('campaign-manage')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'campaign-manage' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <Handshake className="w-3.5 h-3.5" />
                <span>Deals</span>
              </button>

              <button
                onClick={() => handleNavClick('transactions')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'transactions' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Payments</span>
              </button>

              <button
                onClick={() => handleNavClick('profile')}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                  activeView === 'profile' ? 'bg-[#6D5EF8] text-white shadow-sm font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </button>
            </nav>
          )}

          {/* ACTION CONTROLS */}
          <div className="flex items-center gap-2">

            {/* CURRENCY BADGE */}
            <button
              onClick={openSettingsModal}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold hover:border-[#6D5EF8] transition-all"
              title="Currency Settings"
            >
              <span>{currentCurrency.flag}</span>
              <span>{currentCurrency.code}</span>
            </button>

            {/* DEMO ROLE SWITCHER */}
            <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800">
              <span className="px-2 text-slate-400">Role:</span>
              <button 
                onClick={() => handleRoleSwitch('b1')} 
                className={`px-2.5 py-1 rounded-lg transition-all ${currentUser?.id === 'b1' ? 'bg-[#6D5EF8] text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                Business
              </button>
              <button 
                onClick={() => handleRoleSwitch('i1')} 
                className={`px-2.5 py-1 rounded-lg transition-all ${currentUser?.id === 'i1' ? 'bg-[#6D5EF8] text-white font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                Creator
              </button>
            </div>

            {/* THEME TOGGLE */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#6D5EF8] transition-all"
              title="Toggle Theme Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* LOGGED IN CONTROLS */}
            {currentUser ? (
              <>
                {/* NOTIFICATIONS */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#6D5EF8] transition-all relative"
                  >
                    <Bell className="w-4 h-4" />
                    {unreadNotifs.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6D5EF8] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                        {unreadNotifs.length}
                      </span>
                    )}
                  </button>

                  {/* NOTIFICATION DROPDOWN */}
                  {isNotifOpen && (
                    <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-panel p-4 shadow-xl z-50 animate-fadeIn">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">Notifications</h4>
                        <span className="text-xs text-[#6D5EF8] font-semibold">{unreadNotifs.length} unread</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto space-y-2">
                        {notifications.filter(n => n.userId === currentUser.id).length === 0 ? (
                          <p className="text-xs text-slate-500 text-center py-4">No notifications yet</p>
                        ) : (
                          notifications.filter(n => n.userId === currentUser.id).map(n => (
                            <div 
                              key={n.id}
                              onClick={() => markNotificationAsRead(n.id)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                                n.isRead 
                                  ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75' 
                                  : 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
                              }`}
                            >
                              <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                                <span>{n.title}</span>
                                {!n.isRead && <span className="w-2 h-2 rounded-full bg-[#6D5EF8]"></span>}
                              </div>
                              <p className="text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* USER PROFILE DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:border-[#6D5EF8] transition-all"
                  >
                    <img 
                      src={currentUser.avatar || currentUser.logo} 
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#6D5EF8]" 
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-0.5" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel p-3 shadow-xl z-50 animate-fadeIn">
                      <div className="p-3 border-b border-slate-200 dark:border-slate-800 mb-2">
                        <p className="font-bold text-xs text-slate-900 dark:text-white">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                      </div>

                      <div className="space-y-1 text-xs">
                        <button
                          onClick={() => { setActiveView('feed'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#6D5EF8] hover:text-white transition-all"
                        >
                          <Radio className="w-4 h-4" />
                          Home Social Feed
                        </button>

                        <button
                          onClick={() => { setActiveView('dashboard'); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#6D5EF8] hover:text-white transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Personal Dashboard
                        </button>

                        <button
                          onClick={() => { openSettingsModal(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-[#6D5EF8] hover:text-white transition-all"
                        >
                          <SettingsIcon className="w-4 h-4" />
                          Settings & Currency
                        </button>

                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-1">
                          <button
                            onClick={() => { setIsUserMenuOpen(false); onLogoutClick(); }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 font-medium rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-all"
                          >
                            <LogOut className="w-4 h-4" />
                            Log Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* LOGGED OUT BUTTONS */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#6D5EF8] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 rounded-xl gradient-button text-white text-xs font-bold"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel px-4 py-6 border-b space-y-3 text-sm font-semibold animate-fadeIn">
          {!currentUser ? (
            <>
              <button onClick={() => handleNavClick('landing')} className="block w-full text-left py-2 font-bold text-[#6D5EF8]">Home</button>
              <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2">Features</button>
              <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-2">How It Works</button>
              <button onClick={() => openLegalModal('about')} className="block w-full text-left py-2">About</button>
            </>
          ) : (
            <>
              <button onClick={() => handleNavClick('feed')} className="block w-full text-left py-2 font-bold text-[#6D5EF8]">Home Feed</button>
              <button onClick={() => handleNavClick('dashboard')} className="block w-full text-left py-2 font-bold">Dashboard</button>
              <button onClick={() => handleNavClick('explore')} className="block w-full text-left py-2">Explore</button>
              <button onClick={() => handleNavClick('chat')} className="block w-full text-left py-2">Messages</button>
              <button onClick={() => handleNavClick('campaign-manage')} className="block w-full text-left py-2">Deals</button>
              <button onClick={() => handleNavClick('transactions')} className="block w-full text-left py-2">Payments</button>
              <button onClick={() => handleNavClick('profile')} className="block w-full text-left py-2">Profile</button>
              <button onClick={openSettingsModal} className="block w-full text-left py-2 text-[#6D5EF8]">Settings ({currentCurrency.code})</button>
              <button onClick={onLogoutClick} className="block w-full text-left py-2 text-rose-500">Log Out</button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
