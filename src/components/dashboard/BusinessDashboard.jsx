import React from 'react';
import { 
  Briefcase, Users, Handshake, DollarSign, ArrowUpRight, PlusCircle, 
  Clock, TrendingUp, ShieldCheck, MessageSquare, CheckCircle2, FileText 
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
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* WELCOME HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Business Partner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Welcome, {currentUser?.name || 'Business Partner'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl font-normal">
            Manage active promotional campaigns, screen applicant creators, and monitor escrow balances.
          </p>
        </div>

        <button
          onClick={openCreateCampaignModal}
          className="px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow hover:scale-105 transition-transform flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Active Campaigns</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{myCampaigns.length}</p>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">
            {myCampaigns.filter(c => c.status === 'Active').length} Currently Live
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Applications Received</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{myApplications.length}</p>
          <span className="text-[11px] text-indigo-500 font-medium mt-1 inline-block">
            {myApplications.filter(a => a.status === 'Pending').length} Pending Review
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Active Deals</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{activeDeals.length}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">
            {completedDeals.length} Completed
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-400 font-semibold block mb-1">Capital Invested</span>
          <p className="text-2xl font-black text-emerald-500">${totalSpent}</p>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">
            100% Escrow Protected
          </span>
        </div>

      </div>

      {/* RECENT DEALS & ESCROW WORKFLOW */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Handshake className="w-4 h-4 text-indigo-500" />
              <span>Active Contracts & Escrow Pipeline</span>
            </h3>
          </div>

          <button 
            onClick={() => setActiveView('campaign-manage')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Manage All Campaigns</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myDeals.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl text-xs text-slate-500">
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
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={influencer.avatar} 
                      alt={influencer.name} 
                      className="w-10 h-10 rounded-full object-cover border border-amber-500" 
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{influencer.name} ({influencer.username})</h4>
                      <p className="text-slate-500 text-[11px]">{campaign.title}</p>
                      <p className="text-[11px] text-slate-400">Payout: <strong className="text-emerald-500">${deal.finalPrice}</strong> • Deadline: {deal.deadline}</p>
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
                      className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
                      title="Receipt Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onChatClick(influencer.id)}
                      className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors"
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
