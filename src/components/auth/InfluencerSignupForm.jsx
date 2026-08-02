import React, { useState } from 'react';
import { Camera, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export const InfluencerSignupForm = ({ onSuccess, onClose }) => {
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    role: 'influencer',
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    age: 24,
    gender: 'Female',
    state: '',
    city: '',
    languages: ['English'],
    category: 'Food & Lifestyle',
    instagram: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.instagram.trim()) return;

    signup(formData);
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              required
              placeholder="e.g. Alex Rivera" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Username / Handle *</label>
          <div className="relative">
            <Camera className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              required
              placeholder="@alexvlogs" 
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="email" 
              required
              placeholder="alex@creator.com" 
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="tel" 
              required
              placeholder="+91 98765 43210" 
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Password *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Content Niche *</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          >
            <option value="Food & Lifestyle">Food & Lifestyle</option>
            <option value="Fitness & Health">Fitness & Health</option>
            <option value="Tech & Gadgets">Tech & Gadgets</option>
            <option value="Beauty & Fashion">Beauty & Fashion</option>
            <option value="Travel & Adventure">Travel & Adventure</option>
            <option value="Gaming & Esports">Gaming & Esports</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">State *</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Telangana" 
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Hyderabad" 
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          />
        </div>

        {/* MANDATORY INSTAGRAM HANDLE FIELD */}
        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Instagram Handle / Link * <span className="text-rose-500 text-xs font-normal">(Required)</span>
          </label>
          <div className="relative">
            <div className="w-4 h-4 text-rose-500 absolute left-3 top-3">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              required
              placeholder="e.g. @alexcreates or https://instagram.com/alexcreates" 
              value={formData.instagram}
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none font-medium"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">YouTube Channel Link (Optional)</label>
          <div className="relative">
            <div className="w-4 h-4 text-slate-400 absolute left-3 top-3">
              <YoutubeIcon className="w-4 h-4" />
            </div>
            <input 
              type="url" 
              placeholder="https://youtube.com/c/channel" 
              value={formData.youtube}
              onChange={e => setFormData({ ...formData, youtube: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Creator Bio</label>
          <textarea 
            rows="3"
            placeholder="Share your creator vision, target audience, and niche..."
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          ></textarea>
        </div>

      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
        >
          <span>Complete Creator Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
