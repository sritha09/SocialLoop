import React, { useState } from 'react';
import { X, Sparkles, Camera, Image, User, Globe, MapPin, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || currentUser?.description || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || currentUser?.logo || '');
  const [coverImage, setCoverImage] = useState(currentUser?.coverImage || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [state, setState] = useState(currentUser?.state || '');
  const [category, setCategory] = useState(currentUser?.category || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [instagram, setInstagram] = useState(currentUser?.instagram || '');
  const [youtube, setYoutube] = useState(currentUser?.youtube || '');
  const [twitter, setTwitter] = useState(currentUser?.twitter || '');
  const [linkedin, setLinkedin] = useState(currentUser?.linkedin || '');

  if (!isOpen || !currentUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      username,
      bio,
      description: bio,
      avatar,
      logo: avatar,
      coverImage,
      city,
      state,
      category,
      website,
      instagram,
      youtube,
      twitter,
      linkedin
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Customize Workspace Profile</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Edit SocialLoop Profile
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Name</label>
              <input 
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Username / Handle</label>
              <input 
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Bio / Vision Statement</label>
            <textarea 
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell brands or creators about your portfolio, niche, and collaboration vision..."
              className="w-full p-3 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Profile Avatar Image URL</label>
              <input 
                type="text"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Banner Image URL</label>
              <input 
                type="text"
                value={coverImage}
                onChange={e => setCoverImage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category / Niche</label>
              <input 
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Cafe, Fitness, Tech"
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input 
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">State / Region</label>
              <input 
                type="text"
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Instagram Profile</label>
              <input 
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
                placeholder="https://instagram.com/yourhandle"
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
              <input 
                type="text"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
                className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-xs shadow-md mt-4"
          >
            Save Profile Customizations
          </button>
        </form>

      </div>
    </div>
  );
};
