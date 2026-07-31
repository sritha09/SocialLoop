import React, { useState } from 'react';
import { 
  DollarSign, ArrowUpRight, ArrowDownLeft, ShieldCheck, Search, Filter, 
  CreditCard, FileText, CheckCircle2, Clock, AlertCircle, Calendar 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const TransactionsView = ({ openInvoiceModal }) => {
  const { currentUser, users, isBusiness } = useAuth();
  const { deals, campaigns } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Completed', 'Processing', 'Pending'
  const [methodFilter, setMethodFilter] = useState('All'); // 'All', 'Online', 'Offline'

  // Build transactions list from deals data
  const myDeals = deals.filter(d => 
    d.businessId === currentUser?.id || d.influencerId === currentUser?.id
  );

  const transactions = myDeals.map(deal => {
    const isPayer = deal.businessId === currentUser?.id;
    const partnerId = isPayer ? deal.influencerId : deal.businessId;
    const partner = users.find(u => u.id === partnerId) || { name: 'Partner User', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' };
    const campaign = campaigns.find(c => c.id === deal.campaignId) || { title: 'Campaign Deal' };

    return {
      id: `TXN-${deal.id.toUpperCase()}-SL`,
      dealId: deal.id,
      deal,
      campaignTitle: campaign.title,
      partnerName: partner.name,
      partnerAvatar: partner.avatar || partner.logo,
      amount: deal.finalPrice,
      type: isPayer ? 'Payment Sent' : 'Payment Received',
      isPayer,
      date: deal.createdAt || '2026-07-30',
      paymentMethod: deal.paymentMethod || 'Online',
      status: deal.paymentStatus === 'Completed' ? 'Completed' : (deal.paymentStatus || 'Processing'),
      qrToken: deal.qrCodeToken
    };
  });

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (methodFilter !== 'All' && t.paymentMethod !== methodFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchId = t.id.toLowerCase().includes(q);
      const matchPartner = t.partnerName.toLowerCase().includes(q);
      const matchCampaign = t.campaignTitle.toLowerCase().includes(q);
      if (!matchId && !matchPartner && !matchCampaign) return false;
    }
    return true;
  });

  // Metrics
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0);
  const completedCount = transactions.filter(t => t.status === 'Completed').length;
  const inEscrowVolume = transactions.filter(t => t.status === 'Processing' || t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Financial Ledger</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Transactions & Payment History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent overview of escrow payments, receipts, and contract balances.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 font-medium block">Total Account Volume</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white">${totalVolume}</span>
          </div>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {isBusiness ? 'Total Payments Sent' : 'Total Earnings Received'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">${totalVolume}</p>
          <span className="text-[11px] text-emerald-500 font-medium mt-1 inline-block">100% Protected</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Locked in Escrow</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">${inEscrowVolume}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Awaiting Release</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Completed Deals</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedCount}</p>
          <span className="text-[11px] text-slate-400 font-medium mt-1 inline-block">Verified Receipt Receipts</span>
        </div>

      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input 
              type="text"
              placeholder="Search by transaction ID, partner, or campaign..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto text-xs">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing / Escrow</option>
              <option value="Awaiting_Confirmation">Awaiting Confirmation</option>
            </select>

            <select
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-medium outline-none"
            >
              <option value="All">All Methods</option>
              <option value="Online">Online (Stripe/Razorpay)</option>
              <option value="Offline">Offline Cash / Transfer</option>
            </select>
          </div>

        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Financial Activity Ledger ({filteredTransactions.length})</h3>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 dark:bg-slate-800/30 rounded-xl text-xs text-slate-500">
            No transaction history found matching your filters.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTransactions.map((txn) => (
              <div key={txn.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    txn.isPayer ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {txn.isPayer ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5 text-emerald-500" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">{txn.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {txn.paymentMethod}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
                      {txn.type}: {txn.partnerName}
                    </p>
                    <p className="text-[11px] text-slate-400">{txn.campaignTitle} • {txn.date}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <span className={`text-base font-bold ${txn.isPayer ? 'text-slate-900 dark:text-white' : 'text-emerald-500'}`}>
                      {txn.isPayer ? '-' : '+'}${txn.amount}
                    </span>
                    <div className="mt-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => openInvoiceModal(txn.deal)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 transition-colors"
                    title="View Receipt Invoice"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
