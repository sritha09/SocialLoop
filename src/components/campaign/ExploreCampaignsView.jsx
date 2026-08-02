import React, { useState } from 'react';
import { Search, MapPin, Sparkles, User, Briefcase, UserPlus, Send, Filter, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CampaignCard } from './CampaignCard';
import { UserProfileView } from '../profile/UserProfileView';
import { Modal } from '../common/Modal';

export const ExploreCampaignsView = ({ openApplyModal, onChatClick, onViewDetailClick }) => {
  const { currentUser, users } = useAuth();
  const { campaigns, followUser, followingMap } = useData();
  const { formatCurrency } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'creators', 'brands', 'campaigns'
  const [selectedUserId, setSelectedUserId] = useState(null);

  const isFollowing = (targetId) => {
    const list = followingMap[currentUser?.id] || [];
    return list.includes(targetId);
  };

  const q = searchQuery.toLowerCase().trim();

  // FILTER USERS
  const matchingUsers = users.filter(u => {
    if (u.id === currentUser?.id) return false;
    if (activeTab === 'creators' && u.role !== 'influencer') return false;
    if (activeTab === 'brands' && u.role !== 'business') return false;

    if (!q) return true;

    const nameMatch = u.name?.toLowerCase().includes(q);
    const usernameMatch = u.username?.toLowerCase().includes(q);
    const categoryMatch = u.category?.toLowerCase().includes(q);
    const cityMatch = u.city?.toLowerCase().includes(q);
    const countryMatch = u.country?.toLowerCase().includes(q);

    return nameMatch || usernameMatch || categoryMatch || cityMatch || countryMatch;
  });

  // FILTER CAMPAIGNS
  const matchingCampaigns = campaigns.filter(c => {
    if (activeTab === 'creators' || activeTab === 'brands') return false;
    if (!q) return true;

    const titleMatch = c.title?.toLowerCase().includes(q);
    const categoryMatch = c.businessCategory?.toLowerCase().includes(q);
    const cityMatch = c.city?.toLowerCase().includes(q);

    return titleMatch || categoryMatch || cityMatch;
  });

  const totalResults = matchingUsers.length + matchingCampaigns.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* EXPLORE HEADER & PROMINENT SEARCH BAR */}
      <div className="space-y-6 text-center max-w-3xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-extrabold border border-indigo-500/20">
          <Compass className="w-4 h-4" />
          <span>Real-Time Discovery Network</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Discover <span className="text-[#6D5EF8]">Creators, Brands & Campaigns</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
          Search real user profiles, creators, verified businesses, and active collaboration deals across SocialLoop.
        </p>

        {/* SEARCH BAR INPUT */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-[#161E2E]">
            <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
            <input 
              type="text"
              placeholder="Search creators, brands, usernames, cities (e.g. Hyderabad), or campaign titles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-3 py-4 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white outline-none font-medium placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mr-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* SEARCH FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'all'
                ? 'bg-[#6D5EF8] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'creators'
                ? 'bg-[#6D5EF8] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Creators & Influencers ({users.filter(u => u.role === 'influencer' && u.id !== currentUser?.id).length})
          </button>
          <button
            onClick={() => setActiveTab('brands')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'brands'
                ? 'bg-[#6D5EF8] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Brands & Businesses ({users.filter(u => u.role === 'business' && u.id !== currentUser?.id).length})
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'campaigns'
                ? 'bg-[#6D5EF8] text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Campaign Deals ({campaigns.length})
          </button>
        </div>

      </div>

      {/* SEARCH RESULTS SECTION */}
      {totalResults === 0 ? (
        <div className="p-12 text-center glass-panel rounded-3xl border border-[#ECECF3] dark:border-[#26334D] max-w-xl mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white">No results found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery 
              ? `No registered accounts or campaigns match "${searchQuery}". Try searching another name or location.`
              : 'No registered creators, brands, or active campaigns on the platform yet. Be the first to publish content!'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* USER SEARCH RESULTS (CREATORS & BRANDS) */}
          {matchingUsers.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#6D5EF8]" />
                <span>Registered Profiles ({matchingUsers.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingUsers.map(user => (
                  <div 
                    key={user.id}
                    className="glass-card p-4 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm hover:border-[#6D5EF8] transition-all flex items-center justify-between gap-3 group"
                  >
                    <div 
                      onClick={() => setSelectedUserId(user.id)}
                      className="flex items-center gap-3 truncate cursor-pointer flex-1"
                    >
                      <img 
                        src={user.avatar || user.logo} 
                        alt={user.name} 
                        className="w-12 h-12 rounded-full object-cover border border-[#6D5EF8] shrink-0 group-hover:scale-105 transition-transform" 
                      />
                      <div className="truncate">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate flex items-center gap-1">
                          {user.name}
                          {user.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {user.username || '@' + user.name.toLowerCase().replace(/\s+/g, '')}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500">
                          <span className={`px-2 py-0.5 rounded font-bold ${
                            user.role === 'business' 
                              ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' 
                              : 'bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8]'
                          }`}>
                            {user.role === 'business' ? 'Brand' : 'Creator'}
                          </span>
                          {user.city && <span>• {user.city}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => followUser(currentUser?.id, user.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                        isFollowing(user.id)
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          : 'bg-[#6D5EF8] text-white hover:bg-[#5847E0] shadow'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{isFollowing(user.id) ? 'Following' : 'Follow'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAMPAIGN SEARCH RESULTS */}
          {matchingCampaigns.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#6D5EF8]" />
                <span>Campaign Deals ({matchingCampaigns.length})</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingCampaigns.map(camp => (
                  <CampaignCard 
                    key={camp.id}
                    campaign={camp}
                    onApplyClick={openApplyModal}
                    onChatClick={onChatClick}
                    onViewDetailClick={onViewDetailClick}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* USER PROFILE MODAL WHEN CLICKING A SEARCH RESULT */}
      {selectedUserId && (
        <Modal isOpen={!!selectedUserId} onClose={() => setSelectedUserId(null)} maxWidth="max-w-4xl">
          <UserProfileView userId={selectedUserId} onChatClick={onChatClick} />
        </Modal>
      )}

    </div>
  );
};
