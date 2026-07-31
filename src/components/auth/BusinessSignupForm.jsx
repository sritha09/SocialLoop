import React, { useState } from 'react';
import { Briefcase, Building, Mail, Phone, Lock, MapPin, Globe, Upload, ShieldCheck, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export const BusinessSignupForm = ({ onSuccess, onClose }) => {
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    role: 'business',
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    state: 'California',
    city: 'San Francisco',
    category: 'Cafe & Restaurant',
    description: '',
    instagram: '',
    website: '',
    location: '',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300',
    verificationDocName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
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
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
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
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
              placeholder="+1 (555) 000-0000" 
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Category *</label>
          <select
            value={formData.category}
            onChange={e => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
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
            placeholder="e.g. California" 
            value={formData.state}
            onChange={e => setFormData({ ...formData, state: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
          <input 
            type="text" 
            required
            placeholder="e.g. San Francisco" 
            value={formData.city}
            onChange={e => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Physical Address / Venue Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="e.g. 100 Main St, Suite 400, San Francisco, CA" 
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Instagram Profile Link</label>
          <div className="relative">
            <div className="w-4 h-4 text-slate-400 absolute left-3 top-3">
              <InstagramIcon className="w-4 h-4" />
            </div>
            <input 
              type="url" 
              placeholder="https://instagram.com/yourbusiness" 
              value={formData.instagram}
              onChange={e => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Website URL</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="url" 
              placeholder="https://yourbusiness.com" 
              value={formData.website}
              onChange={e => setFormData({ ...formData, website: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Description</label>
          <textarea 
            rows="3"
            placeholder="Tell creators about your brand story, specialty offerings, and ideal collaboration goals..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Logo URL</label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/..." 
              value={formData.logo}
              onChange={e => setFormData({ ...formData, logo: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Verification Document (Optional)</label>
            <div className="flex items-center gap-2 p-2 rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-slate-800/50">
              <Upload className="w-4 h-4 text-indigo-500" />
              <span className="text-xs text-slate-500 truncate">
                {formData.verificationDocName || 'Upload Tax ID / License PDF'}
              </span>
              <button 
                type="button"
                onClick={() => setFormData({ ...formData, verificationDocName: 'tax_registration_verified.pdf' })}
                className="ml-auto px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[11px] font-bold"
              >
                Attach
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
        >
          <span>Complete Business Registration</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
