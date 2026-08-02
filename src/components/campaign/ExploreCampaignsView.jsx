import React, { useState } from 'react';
import { Search, MapPin, DollarSign, SlidersHorizontal, Sparkles, Coffee, Dumbbell, Laptop, Sparkle, Tag } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { CampaignCard } from './CampaignCard';

export const ExploreCampaignsView = ({ openApplyModal, onChatClick, onViewDetailClick }) => {
  const { campaigns } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [paidOnly, setPaidOnly] = useState(false);

  const filterChips = [
    { label: 'All Campaigns', icon: Sparkles, cat: 'All' },
    { label: 'Cafes & Dining', icon: Coffee, cat: 'Cafe & Restaurant' },
    { label: 'Fitness & Apparel', icon: Dumbbell, cat: 'Fashion & Fitness' },
    { label: 'Tech & Startups', icon: Laptop, cat: 'Technology & Startups' },
    { label: 'Beauty & Skincare', icon: Sparkle, cat: 'Beauty & Skincare' },
  ];

  const filteredCampaigns = campaigns.filter(c => {
    if (selectedType !== 'All' && c.campaignType !== selectedType) return false;
    if (selectedCategory !== 'All' && c.businessCategory !== selectedCategory) return false;
    if (selectedCity !== 'All' && c.city !== selectedCity) return false;
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
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* AIRBNB-STYLE HERO SEARCH HEADER */}
      <div className="space-y-6 text-center max-w-3xl mx-auto pt-4">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore Active <span className="text-[#6D5EF8]">Brand Campaigns</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
          Discover vetted promotional deals from top cafes, startups, and fitness brands.
        </p>

        {/* AIRBNB-STYLE PROMINENT SEARCH BAR */}
        <div className="glass-panel p-2 rounded-2xl shadow-md border border-[#ECECF3] dark:border-[#26334D] flex flex-col sm:flex-row items-center gap-2 max-w-2xl mx-auto">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              placeholder="Search by city, brand, or campaign..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

          <div className="flex items-center gap-2 w-full sm:w-auto px-2">
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border-none outline-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="San Francisco">San Francisco</option>
              <option value="New York">New York</option>
              <option value="Austin">Austin</option>
            </select>

            <button
              onClick={() => setPaidOnly(!paidOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                paidOnly
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Paid</span>
            </button>
          </div>
        </div>

        {/* AIRBNB-STYLE FILTER CHIPS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-semibold pt-2">
          {filterChips.map((chip) => {
            const Icon = chip.icon;
            const isSelected = selectedCategory === chip.cat;
            return (
              <button
                key={chip.label}
                onClick={() => setSelectedCategory(chip.cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#6D5EF8] text-white border-[#6D5EF8] shadow-sm font-bold'
                    : 'bg-white dark:bg-[#161E2E] text-slate-600 dark:text-slate-300 border-[#ECECF3] dark:border-[#26334D] hover:border-[#6D5EF8]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#6D5EF8]'}`} />
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* CAMPAIGN CARDS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Available Collaborations ({filteredCampaigns.length})
          </h3>
        </div>

        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-3">
            <p className="text-xs text-slate-500">No campaigns match your selected search criteria.</p>
            <button
              onClick={() => { setSelectedType('All'); setSelectedCategory('All'); setSelectedCity('All'); setSearchQuery(''); setPaidOnly(false); }}
              className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white text-xs font-bold"
            >
              Reset All Filters
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
