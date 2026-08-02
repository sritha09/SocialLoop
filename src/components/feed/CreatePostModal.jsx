import React, { useState } from 'react';
import { X, Image, MapPin, Tag, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addPost } = useData();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800');
  const [location, setLocation] = useState(currentUser?.city ? `${currentUser.city}, ${currentUser.state}` : 'San Francisco, CA');
  const [hashtags, setHashtags] = useState('SocialLoop, CreatorsOfSF, BrandCollab');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const parsedHashtags = hashtags.split(',').map(h => h.trim().replace(/^#/, ''));

    addPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorUsername: currentUser.username || currentUser.name.toLowerCase().replace(/\s+/g, ''),
      authorAvatar: currentUser.avatar || currentUser.logo,
      authorRole: currentUser.role,
      isVerified: currentUser.isVerified || false,
      location,
      images: [imageUrl],
      caption,
      hashtags: parsedHashtags,
    });

    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl p-6 shadow-2xl border border-[#ECECF3] dark:border-[#26334D]">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Showcase Content</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Create Social Post
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption</label>
            <textarea 
              rows={3}
              required
              placeholder="Share details about your latest campaign, coffee tasting, or activewear collection..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Image URL</label>
            <input 
              type="text"
              required
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Location Tag</label>
              <input 
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hashtags (Comma Separated)</label>
              <input 
                type="text"
                value={hashtags}
                onChange={e => setHashtags(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gradient-button text-white font-bold text-xs shadow mt-2"
          >
            Publish Post
          </button>
        </form>

      </div>
    </div>
  );
};
