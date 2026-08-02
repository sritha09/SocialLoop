import React, { useState } from 'react';
import { Camera, User, Mail, Phone, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export const InfluencerSignupForm = ({ onSuccess, onClose }) => {
  const { signup, checkUsernameAvailability } = useAuth();
  
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

  const [usernameError, setUsernameError] = useState('');
  const [formError, setFormError] = useState('');

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, username: val }));

    if (val.trim()) {
      const isAvailable = checkUsernameAvailability(val);
      if (!isAvailable) {
        setUsernameError('This username is already taken. Please choose another one.');
      } else {
        setUsernameError('');
      }
    } else {
      setUsernameError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.username.trim()) {
      setUsernameError('Username is required.');
      return;
    }

    if (!checkUsernameAvailability(formData.username)) {
      setUsernameError('This username is already taken. Please choose another one.');
      return;
    }

    if (!formData.instagram.trim()) {
      setFormError('Instagram Handle is required.');
      return;
    }

    const res = signup(formData);
    if (res.success) {
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } else {
      setFormError(res.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
      {formError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
          {formError}
        </div>
      )}

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
              onChange={handleUsernameChange}
              className={`w-full pl-9 pr-3 py-2.5 rounded-xl border bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none font-bold ${
                usernameError 
                  ? 'border-rose-500 focus:ring-2 focus:ring-rose-500' 
                  : 'border-slate-300 dark:border-white/10 focus:ring-2 focus:ring-[#6D5EF8]'
              }`}
            />
          </div>
          {usernameError && (
            <p className="text-[11px] text-rose-500 font-semibold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{usernameError}</span>
            </p>
          )}
          {!usernameError && formData.username.trim() && (
            <p className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Username is available!</span>
            </p>
          )}
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
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Niche / Category *</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          >
            <option value="Food & Lifestyle">Food & Culinary Lifestyle</option>
            <option value="Fashion & Beauty">Fashion & Beauty</option>
            <option value="Fitness & Wellness">Fitness & Wellness</option>
            <option value="Tech & Gaming">Tech & Gaming</option>
            <option value="Travel & Hospitality">Travel & Hospitality</option>
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
              placeholder="e.g. @alexvlogs or https://instagram.com/alexvlogs" 
              value={formData.instagram}
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none font-medium"
            />
          </div>
        </div>

      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!!usernameError}
          className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Complete Creator Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
