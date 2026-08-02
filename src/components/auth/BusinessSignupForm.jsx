import React, { useState } from 'react';
import { Briefcase, Building, Mail, Phone, Lock, MapPin, Globe, ArrowRight, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export const BusinessSignupForm = ({ onSuccess, onClose }) => {
  const { signup, checkUsernameAvailability } = useAuth();
  
  const [formData, setFormData] = useState({
    role: 'business',
    name: '',
    username: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    state: '',
    city: '',
    category: 'Cafe & Restaurant',
    description: '',
    instagram: '',
    website: '',
    location: '',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300'
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
      setFormError('Instagram Business handle is required.');
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
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Name *</label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              required
              placeholder="e.g. Bean & Leaf Cafe" 
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
              placeholder="@beanandleaf" 
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
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Owner / Representative Name *</label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              required
              placeholder="e.g. Sarah Jenkins" 
              value={formData.ownerName}
              onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Email *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="email" 
              required
              placeholder="contact@beanandleaf.com" 
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
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Category *</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          >
            <option value="Cafe & Restaurant">Cafe & Restaurant</option>
            <option value="Fashion & Fitness">Fashion & Fitness</option>
            <option value="Technology & Startups">Technology & Startups</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Events & Concerts">Events & Concerts</option>
            <option value="Retail & Local Shops">Retail & Local Shops</option>
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
            Instagram Business Handle / Link * <span className="text-rose-500 text-xs font-normal">(Required)</span>
          </label>
          <div className="relative">
            <div className="w-4 h-4 text-rose-500 absolute left-3 top-3">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              required
              placeholder="e.g. @beanandleaf or https://instagram.com/beanandleaf" 
              value={formData.instagram}
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none font-medium"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Physical Address / Venue Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="e.g. Jubilee Hills, Road No 36, Hyderabad" 
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Website URL (Optional)</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="url" 
              placeholder="https://yourbusiness.com" 
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Description</label>
          <textarea 
            rows="3"
            placeholder="Tell creators about your brand story, specialty offerings, and collaboration goals..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#6D5EF8] outline-none"
          ></textarea>
        </div>

      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!!usernameError}
          className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Complete Business Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
