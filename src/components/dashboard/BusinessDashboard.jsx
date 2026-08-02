import React from 'react';
import { 
  Users, Handshake, DollarSign, ArrowUpRight, PlusCircle, 
  TrendingUp, ShieldCheck, MessageSquare, FileText, Zap, Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const BusinessDashboard = ({ setActiveView, openCreateCampaignModal, onChatClick, openPaymentModal, openInvoiceModal }) => {
  const { currentUser, users } = useAuth();
  const { campaigns, applications, deals } = useData();

  const myCampaigns = campaigns.filter(c => c.businessId === currentUser?.id);
  const myCampaignIds = myCampaigns.map(c => c.id);
  const myApplications = applications.filter(a => myCampaignIds.includes(a.campaignId));
  const myDeals = deals.filter(d => d.businessId === currentUser?.id);

  const activeDeals = myDeals.filter(d => d.status === 'Active');
  const completedDeals = myDeals.filter(d => d.status === 'Completed');
  const totalSpent = myDeals.reduce((sum, d) => sum + (d.finalPrice || 0), 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* WELCOME PROFILE SUMMARY HEADER */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Business Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Welcome back, {currentUser?.name || 'Business Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Monitor campaign ROI, manage active creator deals, and approve escrow payouts.
          </p>
        </div>

        {/* QUICK ACTIONS ROW */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <button
            onClick={openCreateCampaignModal}
            className="px-4 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shadow flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>

          <button
            onClick={() => setActiveView('explore')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:border-[#6D5EF8] transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-800"
          >
            <Compass className="w-4 h-4 text-[#6D5EF8]" />
            <span>Explore Creators</span>
          </button>
        </div>
      </div>

      {/* LARGE STATISTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Active Campaigns</span>
            <Zap className="w-4 h-4 text-[#6D5EF8]" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{myCampaigns.length}</p>
          <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 mt-2">
            <TrendingUp className="w-3 h-3" /> {myCampaigns.filter(c => c.status === 'Active').length} Currently Live
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Proposals Received</span>
            <Users className="w-4 h-4 text-[#6D5EF8]" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{myApplications.length}</p>
          <span className="text-xs text-[#6D5EF8] font-bold mt-2 inline-block">
            {myApplications.filter(a => a.status === 'Pending').length} Pending Screen
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Active Deals</span>
            <Handshake className="w-4 h-4 text-[#6D5EF8]" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{activeDeals.length}</p>
          <span className="text-xs text-slate-500 mt-2 inline-block">
            {completedDeals.length} Completed
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Escrow Capital</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">${totalSpent}</p>
          <span className="text-xs text-emerald-500 font-bold mt-2 inline-block">
            100% Protected
          </span>
        </div>

      </div>

      {/* UPCOMING COLLABORATIONS & RECENT ACTIVITY */}
      <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#ECECF3] dark:border-[#26334D]">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#6D5EF8]" />
              <span>Upcoming Collaborations & Active Deals</span>
            </h3>
          </div>

          <button 
            onClick={() => setActiveView('campaign-manage')}
            className="text-xs font-bold text-[#6D5EF8] hover:underline flex items-center gap-1"
          >
            <span>Manage All Deals</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myDeals.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-xs text-slate-500">
            No active deals yet. Screen and accept an applicant proposal to create a deal.
          </div>
        ) : (
          <div className="space-y-3">
            {myDeals.map((deal) => {
              const influencer = users.find(u => u.id === deal.influencerId) || {
                name: 'Maya Lin',
                username: '@mayacreates',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
              };
              const campaign = campaigns.find(c => c.id === deal.campaignId) || { title: 'Cold Brew Launch' };

              return (
                <div 
                  key={deal.id}
                  className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={influencer.avatar} 
                      alt={influencer.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8]" 
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{influencer.name} ({influencer.username})</h4>
                      <p className="text-slate-500 text-[11px]">{campaign.title}</p>
                      <p className="text-[11px] text-slate-400">Payout Offer: <strong className="text-emerald-600 dark:text-emerald-400">${deal.finalPrice}</strong> • Deadline: {deal.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto">
                    <button
                      onClick={() => openPaymentModal(deal)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-1"
                    >
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Payment Escrow</span>
                    </button>

                    <button
                      onClick={() => openInvoiceModal(deal)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#6D5EF8] transition-colors"
                      title="Receipt Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onChatClick(influencer.id)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#6D5EF8] transition-colors"
                      title="Open Chat"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
