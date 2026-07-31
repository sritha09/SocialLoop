import React from 'react';
import { 
  Sparkles, DollarSign, Send, Handshake, Star, ArrowUpRight, 
  Calendar, CheckCircle2, MessageSquare, Briefcase, Camera, Clock, ShieldCheck, Bookmark 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const InfluencerDashboard = ({ setActiveView, openApplyModal, onChatClick, onViewDetailClick }) => {
  const { currentUser, users } = useAuth();
  const { campaigns, applications, deals, savedCampaigns } = useData();

  const myApps = applications.filter(a => a.influencerId === currentUser?.id);
  const myDeals = deals.filter(d => d.influencerId === currentUser?.id);

  const activeDeals = myDeals.filter(d => d.status === 'Active');
  const completedDeals = myDeals.filter(d => d.status === 'Completed');

  const totalEarnings = myDeals.reduce((sum, d) => sum + (d.finalPrice || 0), 0);

  // Personalized AI Recommendations (matches creator's niche/city)
  const recommendedCampaigns = campaigns.filter(c => 
    c.creatorCategory === currentUser?.category || c.city === currentUser?.city
  ).slice(0, 3);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* PERSONAL WORKSPACE BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} 
            alt={currentUser?.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500 shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome, {currentUser?.name || 'Creator'}!
              </h1>
              {currentUser?.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentUser?.username || '@mayacreates'} • {currentUser?.category} Creator • {currentUser?.city}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('explore')}
          className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow hover:scale-105 transition-transform flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Browse New Campaigns</span>
        </button>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Total Creator Earnings</span>
          <p className="text-2xl font-black text-emerald-500">${totalEarnings}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">Escrow Protected</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Proposals Submitted</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{myApps.length}</p>
          <span className="text-[11px] text-indigo-500 font-medium mt-1 block">
            {myApps.filter(a => a.status === 'Accepted').length} Accepted
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Active Contracts</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{activeDeals.length}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">
            {completedDeals.length} Completed
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Creator Rating</span>
          <p className="text-2xl font-black text-amber-500 flex items-center gap-1">
            <Star className="w-5 h-5 fill-current" />
            <span>{currentUser?.rating || 4.95}</span>
          </p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 block">Top 5% Creator Rank</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SUBMITTED APPLICATIONS & ACTIVE DEALS (LEFT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* MY APPLICATIONS PIPELINE */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-500" />
                <span>My Submitted Applications ({myApps.length})</span>
              </h3>
            </div>

            {myApps.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl text-xs text-slate-500">
                You haven't submitted any campaign proposals yet. Explore active opportunities to apply!
              </div>
            ) : (
              <div className="space-y-3">
                {myApps.map((app) => {
                  const campaign = campaigns.find(c => c.id === app.campaignId) || { title: 'Campaign', budget: 450 };
                  const business = users.find(u => u.id === campaign.businessId) || { name: 'Business' };

                  return (
                    <div key={app.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{campaign.title}</h4>
                        <p className="text-slate-500 text-[11px] mt-0.5">{business.name} • Quote: <strong className="text-emerald-500">${app.expectedPrice}</strong></p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'Accepted' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ACTIVE CONTRACTS */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Handshake className="w-4 h-4 text-emerald-500" />
                <span>Active Collaboration Contracts ({myDeals.length})</span>
              </h3>
            </div>

            {myDeals.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl text-xs text-slate-500">
                No active contracts at the moment.
              </div>
            ) : (
              <div className="space-y-3">
                {myDeals.map((deal) => {
                  const business = users.find(u => u.id === deal.businessId) || { name: 'Business Partner', avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150' };

                  return (
                    <div key={deal.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={business.avatar || business.logo} alt={business.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{business.name}</h4>
                          <p className="text-[11px] text-slate-400">Locked Payout: <strong className="text-emerald-500">${deal.finalPrice}</strong> • Deadline: {deal.deadline}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onChatClick(business.id)}
                        className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-amber-500 transition-colors"
                        title="Chat Business"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* PERSONALIZED AI CAMPAIGN RECOMMENDATIONS (RIGHT 5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>AI Recommended For You</span>
              </h3>
              <button 
                onClick={() => setActiveView('explore')} 
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendedCampaigns.map((camp) => (
                <div 
                  key={camp.id}
                  onClick={() => onViewDetailClick(camp)}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-amber-500/50 cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {camp.campaignType}
                    </span>
                    <span className="font-bold text-emerald-500 text-xs">${camp.budget}</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {camp.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">{camp.city} • Min {(camp.minFollowers / 1000).toFixed(0)}K Followers</p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
