import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const StoriesBar = ({ openStoryViewer, openCreateStoryModal }) => {
  const { currentUser } = useAuth();
  const { stories } = useData();

  return (
    <div className="glass-panel p-4 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
        
        {/* ADD MY STORY BUTTON */}
        <div 
          onClick={openCreateStoryModal}
          className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
        >
          <div className="relative">
            <img 
              src={currentUser?.avatar || currentUser?.logo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.name || 'Me'} 
              className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 dark:border-slate-800 group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#6D5EF8] text-white flex items-center justify-center border-2 border-white dark:border-slate-900 text-xs font-bold shadow">
              <Plus className="w-3.5 h-3.5" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">Your Story</span>
        </div>

        {/* STORIES LIST */}
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => openStoryViewer(story)}
            className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
          >
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#6D5EF8] via-[#8B7CFF] to-pink-500 shadow-sm group-hover:scale-105 transition-transform">
              <img 
                src={story.avatar} 
                alt={story.authorName} 
                className="w-13 h-13 rounded-full object-cover border-2 border-white dark:border-slate-900"
              />
            </div>
            <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate max-w-[64px]">
              {story.authorName.split(' ')[0]}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};
