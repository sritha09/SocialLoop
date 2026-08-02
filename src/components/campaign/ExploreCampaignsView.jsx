import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Sparkles, Coffee, Dumbbell, Laptop, Sparkle, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { COUNTRIES, LOCATIONS_BY_COUNTRY } from '../../mockData/locationsData';
import { CampaignCard } from './CampaignCard';

export const ExploreCampaignsView = ({ openApplyModal, onChatClick, onViewDetailClick }) => {
  const { campaigns } = useData();
  const { formatCurrency } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('IN'); // Default to India
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [paidOnly, setPaidOnly] = useState(false);

  const availableStates = LOCATIONS_BY_COUNTRY[selectedCountry] || [];
  const selectedStateObj = availableStates.find(s => s.state === selectedState);
  const availableCities = selectedStateObj ? selectedStateObj.cities : availableStates.flatMap(s => s.cities);

  const filterChips = [
    { label: 'All Campaigns', icon: Sparkles, cat: 'All' },
    { label: 'Cafes & Dining', icon: Coffee, cat: 'Cafe & Restaurant' },
    { label: 'Fitness & Apparel', icon: Dumbbell, cat: 'Fashion & Fitness' },
    { label: 'Tech & Startups', icon: Laptop, cat: 'Technology & Startups' },
    { label: 'Beauty & Skincare', icon: Sparkle, cat: 'Beauty & Skincare' },
  ];

  const filteredCampaigns = campaigns.filter(c => {
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
          Discover vetted promotional deals from cafes, startups, & fitness brands across India and global cities.
        </p>

        {/* AIRBNB-STYLE PROMINENT SEARCH BAR */}
        <div className="glass-panel p-3 rounded-2xl shadow-md border border-[#ECECF3] dark:border-[#26334D] space-y-3 max-w-3xl mx-auto">
          
          {/* SEARCH INPUT */}
          <div className="flex items-center gap-3 px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              placeholder="Search by city, brand, or campaign keyword..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 py-2"
            />
          </div>

          {/* CASCADING LOCATION FILTERS: COUNTRY -> STATE -> CITY */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-semibold">
            
            {/* COUNTRY */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Globe className="w-4 h-4 text-[#6D5EF8] shrink-0" />
              <select
                value={selectedCountry}
                onChange={e => { setSelectedCountry(e.target.value); setSelectedState('All'); setSelectedCity('All'); }}
                className="w-full bg-transparent text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            {/* STATE */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <select
                value={selectedState}
                onChange={e => { setSelectedState(e.target.value); setSelectedCity('All'); }}
                className="w-full bg-transparent text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                <option value="All">All States</option>
                {availableStates.map(s => (
                  <option key={s.state} value={s.state}>{s.state}</option>
                ))}
              </select>
            </div>

            {/* CITY */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <select
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-slate-900 dark:text-white outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* PAID ONLY TOGGLE */}
            <button
              onClick={() => setPaidOnly(!paidOnly)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0 ${
                paidOnly
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Paid Deals Only</span>
            </button>

          </div>

        </div>

        {/* CATEGORY FILTER CHIPS */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 text-xs font-semibold pt-1">
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
            <p className="text-xs text-slate-500">No active campaigns match your selected search criteria.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedCountry('IN'); setSelectedState('All'); setSelectedCity('All'); setSearchQuery(''); setPaidOnly(false); }}
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
