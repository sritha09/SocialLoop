import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, Tag, Sparkles, UploadCloud, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Modal } from '../common/Modal';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { addPost } = useData();

  const [caption, setCaption] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [location, setLocation] = useState(currentUser?.city ? `${currentUser.city}, ${currentUser.state}` : '');
  const [hashtags, setHashtags] = useState('');
  const [visibility, setVisibility] = useState('Public');

  const handleMultipleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|webm)$/i.test(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setMediaFiles(prev => [
            ...prev,
            {
              id: 'm_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
              url: reader.result.toString(),
              type: isVideo ? 'video' : 'image'
            }
          ]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveMedia = (idToRemove) => {
    setMediaFiles(prev => prev.filter(m => m.id !== idToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const parsedHashtags = hashtags ? hashtags.split(',').map(h => h.trim().replace(/^#/, '')) : [];
    const imagesList = mediaFiles.map(m => m.url);

    const author = currentUser || {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      username: 'guest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      role: 'influencer',
      isVerified: false
    };

    addPost({
      authorId: author.id,
      authorName: author.name,
      authorUsername: author.username || author.name.toLowerCase().replace(/\s+/g, ''),
      authorAvatar: author.avatar || author.logo,
      authorRole: author.role,
      isVerified: author.isVerified || false,
      location,
      images: imagesList,
      mediaTypes: mediaFiles.map(m => m.type),
      caption,
      hashtags: parsedHashtags,
      visibility
    });

    setCaption('');
    setMediaFiles([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
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
          
          {/* THUMBNAILS GRID WITH REMOVE BUTTON */}
          {mediaFiles.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
              {mediaFiles.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden bg-black border border-slate-700 aspect-square">
                  {item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.url} alt="Preview" className="w-full h-full object-cover" />
                  )}

                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(item.id)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-500 transition-colors shadow"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 space-y-2">
              <UploadCloud className="w-8 h-8 text-[#6D5EF8] mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-300 text-xs">Select photos or videos from your phone gallery or computer</p>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 pt-1">
            <label 
              htmlFor="multi-post-file-input"
              className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs shadow-md cursor-pointer hover:bg-[#5847E0] transition-colors inline-flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>📁 Upload Photos / Videos from Device</span>
            </label>
            <input 
              id="multi-post-file-input"
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMultipleFilesChange}
              className="hidden"
            />
            <span className="text-[10px] text-slate-400">Supported: JPG, PNG, WEBP, GIF, MP4, MOV, WEBM</span>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Caption</label>
          <textarea 
            rows={3}
            required
            placeholder="Share details about your latest project, work showcase, or collaboration..."
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
              placeholder="Hyderabad, India"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Hashtags (Comma Separated)</label>
            <input 
              type="text"
              placeholder="SocialLoop, Hyderabad, Creator"
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
    </Modal>
  );
};
