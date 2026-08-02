import React, { useState } from 'react';
import { Sparkles, Camera, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../common/Modal';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateUserProfile } = useAuth();

  const [name, setName] = useState(currentUser?.name || '');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [bio, setBio] = useState(currentUser?.bio || currentUser?.description || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || currentUser?.logo || '');
  const [coverImage, setCoverImage] = useState(currentUser?.coverImage || '');
  const [city, setCity] = useState(currentUser?.city || '');
  const [state, setState] = useState(currentUser?.state || '');
  const [country, setCountry] = useState(currentUser?.country || '');
  const [category, setCategory] = useState(currentUser?.category || '');
  const [website, setWebsite] = useState(currentUser?.website || '');
  const [instagram, setInstagram] = useState(currentUser?.instagram || '');
  const [youtube, setYoutube] = useState(currentUser?.youtube || '');

  if (!currentUser) return null;

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setAvatar(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setCoverImage(reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
      country,
      category,
      website,
      instagram,
      youtube
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
          <Sparkles className="w-4 h-4" />
          <span>Customize Profile</span>
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

        {/* DEVICE MEDIA UPLOADS FOR AVATAR AND COVER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D]">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Profile Picture (Avatar)</label>
            {avatar && (
              <img src={avatar} alt="Avatar Preview" className="w-14 h-14 rounded-full object-cover mb-2 border border-[#6D5EF8]" />
            )}
            <label 
              htmlFor="avatar-file-input"
              className="px-3 py-1.5 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs cursor-pointer hover:bg-[#5847E0] transition-colors inline-flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Upload Profile Photo</span>
            </label>
            <input 
              id="avatar-file-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarFileChange}
              className="hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cover Banner Photo</label>
            {coverImage && (
              <img src={coverImage} alt="Cover Preview" className="w-full h-14 rounded-xl object-cover mb-2 border border-slate-300" />
            )}
            <label 
              htmlFor="cover-file-input"
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Upload Cover Banner</span>
            </label>
            <input 
              id="cover-file-input"
              type="file"
              accept="image/*"
              onChange={handleCoverFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <input 
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Cafe, Tech"
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
            <input 
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Hyderabad"
              className="w-full p-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Country</label>
            <input 
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              placeholder="India"
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
    </Modal>
  );
};
