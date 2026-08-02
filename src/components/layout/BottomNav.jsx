import React, { useState } from 'react';
import { Home, Compass, PlusCircle, MessageSquare, User, Sparkles, Image, Zap, Plus } from 'lucide-react';

export const BottomNav = ({ 
  activeView, 
  setActiveView, 
  openCreateCampaignModal,
  openCreatePostModal,
  openCreateStoryModal
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navTabs = [
    { id: 'feed', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'create', label: 'Create', icon: PlusCircle, isAction: true },
    { id: 'chat', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* POPUP ACTION CHOOSER MENU FOR CREATING POST/STORY/CAMPAIGN */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end justify-center pb-24 px-4 animate-fadeIn"
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className="w-full max-w-sm glass-panel rounded-3xl p-4 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-2 animate-slideUp"
          >
            <div className="text-center pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Create New Content</span>
            </div>

            <button
              onClick={() => { setIsMenuOpen(false); openCreatePostModal(); }}
              className="w-full p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] font-bold text-xs flex items-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className="p-2 rounded-xl bg-[#6D5EF8] text-white">
                <Image className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold">Create Post</div>
                <div className="text-[10px] text-slate-500 font-normal">Share photos, videos, captions & hashtags</div>
              </div>
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); openCreateStoryModal(); }}
              className="w-full p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white">
                <Zap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold">Create Story</div>
                <div className="text-[10px] text-slate-500 font-normal">Add a 24-hour photo or video story</div>
              </div>
            </button>

            <button
              onClick={() => { setIsMenuOpen(false); openCreateCampaignModal(); }}
              className="w-full p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-3 hover:scale-[1.02] transition-transform"
            >
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <Plus className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-bold">Create Campaign</div>
                <div className="text-[10px] text-slate-500 font-normal">Publish brand collaboration deal</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-nav border-t border-[#ECECF3] dark:border-[#26334D] px-2 py-1.5 backdrop-blur-xl bg-white/95 dark:bg-[#0B0F17]/95">
        <div className="flex items-center justify-around">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;

            if (tab.isAction) {
              return (
                <button
                  key={tab.id}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex flex-col items-center justify-center p-1 group"
                  title="Create Content"
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
    </>
  );
};
