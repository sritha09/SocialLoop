import React from 'react';
import { 
  Sparkles, DollarSign, Send, Handshake, Star, ArrowUpRight, 
  ShieldCheck, MessageSquare, Compass, Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { EmptyState } from '../common/EmptyState';

export const InfluencerDashboard = ({ setActiveView, openApplyModal, onChatClick, onViewDetailClick }) => {
  const { currentUser, users } = useAuth();
  const { campaigns, applications, deals } = useData();
  const { formatCurrency } = useCurrency();

  const myApps = applications.filter(a => a.influencerId === currentUser?.id);
  const myDeals = deals.filter(d => d.influencerId === currentUser?.id);

  const activeDeals = myDeals.filter(d => d.status === 'Active');
  const completedDeals = myDeals.filter(d => d.status === 'Completed');

  const totalEarnings = myDeals
    .filter(d => d.status === 'Completed' && d.paymentStatus === 'Completed')
    .reduce((sum, d) => sum + (d.finalPrice || 0), 0);

  const recommendedCampaigns = campaigns.filter(c => 
    c.creatorCategory === currentUser?.category || c.city === currentUser?.city
  ).slice(0, 3);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* PERSONAL CREATOR WORKSPACE BANNER */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} 
            alt={currentUser?.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#6D5EF8] shadow"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Welcome back, {currentUser?.name || 'Creator'}!
              </h1>
              {currentUser?.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {currentUser?.username || '@mayacreates'} • {currentUser?.category} Creator • {currentUser?.city}
            </p>
          </div>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={() => setActiveView('explore')}
            className="px-4 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shadow flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Browse New Campaigns</span>
          </button>
        </div>
      </div>

      {/* STATISTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Creator Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{formatCurrency(totalEarnings)}</p>
          <span className="text-xs text-emerald-500 font-bold mt-2 inline-block">100% Escrow Secured</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Proposals Sent</span>
            <Send className="w-4 h-4 text-[#6D5EF8]" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{myApps.length}</p>
          <span className="text-xs text-[#6D5EF8] font-bold mt-2 inline-block">
            {myApps.filter(a => a.status === 'Accepted').length} Accepted
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Active Contracts</span>
            <Handshake className="w-4 h-4 text-[#6D5EF8]" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{activeDeals.length}</p>
          <span className="text-xs text-slate-500 mt-2 inline-block">
            {completedDeals.length} Completed
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Creator Score</span>
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-500 flex items-center gap-1">
            <span>{currentUser?.rating || 4.95}</span>
          </p>
          <span className="text-xs text-slate-400 font-medium mt-2 inline-block">Top 5% Creator Rank</span>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SUBMITTED APPLICATIONS & ACTIVE DEALS (LEFT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* MY APPLICATIONS PIPELINE */}
          <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-[#6D5EF8]" />
                <span>My Submitted Applications ({myApps.length})</span>
              </h3>
            </div>

            {myApps.length === 0 ? (
              <EmptyState 
                icon={Send}
                title="No proposals submitted yet"
                description="Explore active brand campaigns and submit your first collaboration proposal!"
                actionLabel="Explore Active Campaigns"
                onAction={() => setActiveView('explore')}
              />
            ) : (
              <div className="space-y-3">
                {myApps.map((app) => {
                  const campaign = campaigns.find(c => c.id === app.campaignId) || { title: 'Campaign', budget: 450 };
                  const business = users.find(u => u.id === campaign.businessId) || { name: 'Business' };

                  return (
                    <div key={app.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">{campaign.title}</h4>
                        <p className="text-slate-500 text-[11px] mt-0.5">{business.name} • Quote: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(app.expectedPrice)}</strong></p>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600'
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
          <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Handshake className="w-4 h-4 text-emerald-500" />
                <span>Active Collaboration Contracts ({myDeals.length})</span>
              </h3>
            </div>

            {myDeals.length === 0 ? (
              <EmptyState 
                icon={Handshake}
                title="No active contracts"
                description="Once a business accepts your application, your active deal contract will appear here."
              />
            ) : (
              <div className="space-y-3">
                {myDeals.map((deal) => {
                  const business = users.find(u => u.id === deal.businessId) || { name: 'Business Partner', avatar: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150' };

                  return (
                    <div key={deal.id} className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={business.avatar || business.logo} alt={business.name} className="w-9 h-9 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{business.name}</h4>
                          <p className="text-[11px] text-slate-400">Escrow Payout: <strong className="text-emerald-600 dark:text-emerald-400">{formatCurrency(deal.finalPrice)}</strong> • Deadline: {deal.deadline}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onChatClick(business.id)}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#6D5EF8] transition-colors"
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

        {/* AI CAMPAIGN RECOMMENDATIONS (RIGHT 5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6D5EF8]" />
                <span>AI Matches For You</span>
              </h3>
              <button 
                onClick={() => setActiveView('explore')} 
                className="text-xs font-bold text-[#6D5EF8] hover:underline flex items-center gap-1"
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
                  className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D] hover:border-[#6D5EF8] cursor-pointer transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF]">
                      {camp.campaignType}
                    </span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs">{formatCurrency(camp.budget)}</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#6D5EF8] transition-colors line-clamp-1">
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
