import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, MapPin, Calendar, Clock, DollarSign, Users, Upload, Check, Wand2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreateCampaignModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { createCampaign } = useData();

  const [formData, setFormData] = useState({
    title: '',
    campaignType: 'Promotion', // 'Promotion' or 'Collaboration'
    description: '',
    businessCategory: currentUser?.category || 'Cafe & Restaurant',
    state: currentUser?.state || 'California',
    city: currentUser?.city || 'San Francisco',
    venue: currentUser?.location || 'San Francisco Flagship Venue',
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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 my-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER & AI ASSISTANT BUTTON */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PlusCircle className="w-6 h-6 text-indigo-500" />
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Type *</label>
              <select
                value={formData.campaignType}
                onChange={e => setFormData({ ...formData, campaignType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
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
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-normal"
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

          {/* MIN / MAX FOLLOWERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Minimum Followers Required</label>
              <input 
                type="number"
                placeholder="10000"
                value={formData.minFollowers}
                onChange={e => setFormData({ ...formData, minFollowers: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Maximum Followers Target</label>
              <input 
                type="number"
                placeholder="200000"
                value={formData.maxFollowers}
                onChange={e => setFormData({ ...formData, maxFollowers: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
              />
            </div>
          </div>

          {/* PREFERRED PLATFORMS */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Creator Platforms</label>
            <div className="flex flex-wrap gap-2">
              {['Instagram', 'YouTube', 'TikTok', 'Facebook', 'LinkedIn', 'Twitter/X'].map(p => {
                const selected = formData.platforms.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePlatformToggle(p)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selected 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-indigo-400'
                    }`}
                  >
                    {selected && <Check className="w-3.5 h-3.5" />}
                    <span>{p}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COVER IMAGE */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Header Image URL</label>
            <input 
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform"
            >
              Publish Campaign
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
