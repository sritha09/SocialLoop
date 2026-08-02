import React from 'react';
import { Home, Compass, PlusCircle, MessageSquare, User } from 'lucide-react';

export const BottomNav = ({ activeView, setActiveView, openCreateCampaignModal }) => {
  const navTabs = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'create', label: 'Create', icon: PlusCircle, isAction: true },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-nav border-t border-[#ECECF3] dark:border-[#26334D] px-2 py-1.5 backdrop-blur-xl bg-white/95 dark:bg-[#0B0F17]/95">
      <div className="flex items-center justify-around">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;

          if (tab.isAction) {
            return (
              <button
                key={tab.id}
                onClick={openCreateCampaignModal}
                className="flex flex-col items-center justify-center p-1 group"
                title="Create Campaign"
              >
                <div className="w-10 h-10 rounded-full bg-[#6D5EF8] text-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#6D5EF8] mt-0.5">Create</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive 
                  ? 'text-[#6D5EF8] dark:text-[#8B7CFF] font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
