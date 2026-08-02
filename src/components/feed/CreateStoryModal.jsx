import React, { useState, useEffect } from 'react';
import { X, Sparkles, UploadCloud, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreateStoryModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addStory } = useData();

  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setMediaUrl(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors z-10"
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
          
          {/* MEDIA PREVIEW & FILE UPLOAD */}
          <div className="p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-2">
            {mediaUrl && (
              <div className="relative max-h-40 overflow-hidden rounded-xl bg-black">
                <img src={mediaUrl} alt="Story preview" className="w-full h-36 object-cover" />
              </div>
            )}

            <div className="flex flex-col items-center gap-2 pt-1">
              <label 
                htmlFor="story-file-input"
                className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs shadow cursor-pointer hover:bg-[#5847E0] transition-colors inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>📁 Select Photo from Device Gallery</span>
              </label>
              <input 
                id="story-file-input"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

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
