import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Sparkles, MapPin, Calendar, Clock, DollarSign, Users, Upload, Check, Wand2, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

import { Modal } from '../common/Modal';

export const CreateCampaignModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { createCampaign } = useData();

  const [formData, setFormData] = useState({
    title: '',
    campaignType: 'Promotion',
    description: '',
    businessCategory: currentUser?.category || 'Cafe & Restaurant',
    state: currentUser?.state || '',
    city: currentUser?.city || 'Hyderabad',
    venue: currentUser?.location || 'Hyderabad Flagship Venue',
    date: '2026-08-20',
    time: '18:00',
    duration: '2 Hours',
    isPaid: true,
    budget: 500,
    minFollowers: 10000,
    maxFollowers: 150000,
    platforms: ['Instagram'],
    creatorCategory: 'Food & Lifestyle',
    deadline: '2026-08-14',
    mode: 'Offline',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800'
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData(prev => ({ ...prev, image: reader.result.toString() }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => {
      const exists = prev.platforms.includes(platform);
      return {
        ...prev,
        platforms: exists ? prev.platforms.filter(p => p !== platform) : [...prev.platforms, platform]
      };
    });
  };

  const handleAIGenerate = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        title: `Exclusive ${prev.businessCategory} Showcase & Tasting Experience`,
        description: `We are looking for top-tier creators in ${prev.city} to cover our upcoming VIP showcase! Deliverables include 1 high-definition Reel, 3 IG Stories with link stickers, and an honest Google review. Food/Beverages and compensation included.`,
        budget: 650,
        minFollowers: 15000
      }));
      setIsGeneratingAI(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCampaign({
      businessId: currentUser.id,
      ...formData
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">

        {/* HEADER & AI ASSISTANT BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-[#6D5EF8]" />
              <span>Create New Campaign</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Publish a promotion or collaboration opportunity for creators.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAIGenerate}
            disabled={isGeneratingAI}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 hover:scale-105 transition-all self-start sm:self-auto"
          >
            <Wand2 className={`w-4 h-4 ${isGeneratingAI ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAI ? 'Generating...' : 'AI Auto-Fill'}</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          
          {/* TITLE & TYPE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Title *</label>
              <input 
                type="text"
                required
                placeholder="e.g. Cold Brew Tasting Reel Campaign"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8] font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Type *</label>
              <select
                value={formData.campaignType}
                onChange={e => setFormData({ ...formData, campaignType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8] font-medium"
              >
                <option value="Promotion">Promotion (One-Time)</option>
                <option value="Collaboration">Collaboration (Long-Term)</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Description & Deliverables *</label>
            <textarea 
              rows="3"
              required
              placeholder="Detail what content is expected (e.g. 1 Reel, 3 IG Stories), event details, free products provided, etc."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8] font-normal"
            ></textarea>
          </div>

          {/* CATEGORY, STATE, CITY, VENUE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Category</label>
              <input 
                type="text"
                value={formData.businessCategory}
                onChange={e => setFormData({ ...formData, businessCategory: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">State</label>
              <input 
                type="text"
                value={formData.state}
                onChange={e => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City</label>
              <input 
                type="text"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mode</label>
              <select
                value={formData.mode}
                onChange={e => setFormData({ ...formData, mode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              >
                <option value="Offline">Offline (In-Person)</option>
                <option value="Online">Online / Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* DATES, TIME, BUDGET */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Event / Start Date</label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time & Duration</label>
              <input 
                type="text"
                placeholder="18:00 (2 Hours)"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Payout ($ USD)</label>
              <input 
                type="number"
                placeholder="500"
                value={formData.budget}
                onChange={e => setFormData({ ...formData, budget: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Application Deadline</label>
              <input 
                type="date"
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>
          </div>

          {/* COVER IMAGE & DEVICE FILE PICKER */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Header Image</label>
            {formData.image && (
              <img src={formData.image} alt="Campaign preview" className="w-full h-36 rounded-xl object-cover mb-2 border border-slate-300" />
            )}
            <div className="flex items-center gap-3">
              <label 
                htmlFor="camp-file-input"
                className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs shadow cursor-pointer hover:bg-[#5847E0] transition-colors inline-flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>📁 Select Image from Device Gallery or Computer</span>
              </label>
              <input 
                id="camp-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow mt-2"
            >
              Publish Campaign
            </button>
          </div>

        </form>
    </Modal>
  );
};
