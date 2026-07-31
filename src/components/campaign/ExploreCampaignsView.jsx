import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, DollarSign, Users, SlidersHorizontal, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { CampaignCard } from './CampaignCard';

export const ExploreCampaignsView = ({ openApplyModal, onChatClick, onViewDetailClick }) => {
  const { campaigns } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All'); // 'All', 'Promotion', 'Collaboration'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedMode, setSelectedMode] = useState('All');
  const [paidOnly, setPaidOnly] = useState(false);

  const categories = ['All', 'Cafe & Restaurant', 'Fashion & Fitness', 'Technology & Startups', 'Beauty & Skincare'];

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedType !== 'All' && c.campaignType !== selectedType) return false;
    if (selectedCategory !== 'All' && c.businessCategory !== selectedCategory) return false;
    if (selectedCity !== 'All' && c.city !== selectedCity) return false;
    if (selectedMode !== 'All' && c.mode !== selectedMode) return false;
    if (paidOnly && !c.isPaid) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchCategory = c.businessCategory.toLowerCase().includes(q);
      const matchCity = c.city.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchCity) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* DISCOVERY PORTAL BANNER */}
      <div className="p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
            Campaign Discovery Portal
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Explore Brand Opportunities & Collabs
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Discover verified promotional campaigns from top cafes, startups, and fitness brands. Pitch your creative rates and earn guaranteed escrow payouts.
          </p>
        </div>
      </div>

      {/* SEARCH BAR & CATEGORY PILLS */}
      <div className="space-y-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          
          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input 
              type="text"
              placeholder="Search by keyword, city, brand, or campaign title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs font-medium outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* CATEGORY PILLS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-medium">
            <span className="text-slate-400 font-bold pr-2 shrink-0">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SECONDARY FILTERS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium">
            
            <div>
              <label className="block text-[11px] text-slate-400 font-semibold mb-1">Opportunity Type</label>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none"
              >
                <option value="All">All Types</option>
                <option value="Promotion">Promotion (One-Time)</option>
                <option value="Collaboration">Collaboration (Long-Term)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-semibold mb-1">Location / City</label>
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none"
              >
                <option value="All">All Cities</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Austin">Austin</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 font-semibold mb-1">Venue Mode</label>
              <select
                value={selectedMode}
                onChange={e => setSelectedMode(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none"
              >
                <option value="All">All Modes</option>
                <option value="Offline">Offline (In-Person)</option>
                <option value="Online">Online / Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={() => setPaidOnly(!paidOnly)}
                className={`w-full py-2 px-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-all ${
                  paidOnly
                    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Paid Campaigns Only</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* CAMPAIGN GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Matching Campaigns ({filteredCampaigns.length})
          </h3>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs text-slate-500">No active campaigns found matching your current filter criteria.</p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedCategory('All'); setSelectedCity('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <CampaignCard 
                key={camp.id}
                campaign={camp}
                onApplyClick={openApplyModal}
                onChatClick={onChatClick}
                onViewDetailClick={onViewDetailClick}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
