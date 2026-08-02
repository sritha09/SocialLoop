import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreateStoryModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addStory } = useData();

  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    addStory({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username || currentUser.name.toLowerCase().replace(/\s+/g, ''),
      avatar: currentUser.avatar || currentUser.logo,
      mediaUrl,
      mediaType: 'image',
      caption,
    });

    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm glass-panel rounded-2xl p-6 shadow-2xl border border-[#ECECF3] dark:border-[#26334D]">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>24h Disappearing Story</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Add to Story
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Story Caption</label>
            <input 
              type="text"
              placeholder="Behind the scenes at the cafe tasting..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Image / Media URL</label>
            <input 
              type="text"
              required
              value={mediaUrl}
              onChange={e => setMediaUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-button text-white font-bold text-xs shadow mt-2"
          >
            Post 24h Story
          </button>
        </form>

      </div>
    </div>
  );
};
