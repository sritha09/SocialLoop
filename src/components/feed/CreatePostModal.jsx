import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, MapPin, Tag, Sparkles, UploadCloud, Eye } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addPost } = useData();

  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800');
  const [location, setLocation] = useState(currentUser?.city ? `${currentUser.city}, ${currentUser.state}` : 'San Francisco, CA');
  const [hashtags, setHashtags] = useState('SocialLoop, CreatorsOfSF, BrandCollab');
  const [visibility, setVisibility] = useState('Public');

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
          setImageUrl(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
      visibility
    });

    setCaption('');
    onClose();
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Portfolio & Activity Showcase</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Create Portfolio Post
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          {/* NATIVE DEVICE FILE UPLOAD BOX */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-center space-y-3">
            {imageUrl ? (
              <div className="relative max-h-48 overflow-hidden rounded-xl bg-black">
                <img src={imageUrl} alt="Preview" className="w-full h-44 object-cover" />
              </div>
            ) : (
              <div className="py-4 space-y-2">
                <UploadCloud className="w-8 h-8 text-[#6D5EF8] mx-auto" />
                <p className="font-bold text-slate-700 dark:text-slate-300 text-xs">Select image/video from your phone gallery or computer</p>
              </div>
            )}

            <div className="flex flex-col items-center gap-2 pt-1">
              <label 
                htmlFor="post-file-input"
                className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs shadow-md cursor-pointer hover:bg-[#5847E0] transition-colors inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>📁 Upload Photo / Video from Device</span>
              </label>
              <input 
                id="post-file-input"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption</label>
            <textarea 
              rows={3}
              required
              placeholder="Share details about your latest product launch, coffee tasting, or creator collaboration..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full p-3 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
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

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Visibility Setting</label>
            <select
              value={visibility}
              onChange={e => setVisibility(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs cursor-pointer font-semibold"
            >
              <option value="Public">Public (Everyone on SocialLoop)</option>
              <option value="Followers">Followers & Partners Only</option>
              <option value="BrandsOnly">Verified Brands Only</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-xs shadow mt-2"
          >
            Publish Portfolio Post
          </button>
        </form>

      </div>
    </div>
  );
};
