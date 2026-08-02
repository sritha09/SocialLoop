import React, { useState } from 'react';
import { ShieldCheck, Users, Briefcase, DollarSign, AlertCircle, CheckCircle2, Trash2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AdminPanel = () => {
  const { users } = useAuth();
  const { campaigns, deals } = useData();

  const [activeTab, setActiveTab] = useState('users'); // 'users', 'campaigns', 'payments', 'verifications'

  const businesses = users.filter(u => u.role === 'business');
  const influencers = users.filter(u => u.role === 'influencer');

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20 mb-2 inline-block">
            Platform Master Console
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-rose-500" />
            <span>SocialLoop Admin Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            System oversight for accounts, business verifications, payments, and platform integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
          <CheckCircle2 className="w-4 h-4" />
          <span>System Health: 100% Operational</span>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10">
          <span className="text-xs text-slate-400 font-bold block">Total Registered Businesses</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{businesses.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10">
          <span className="text-xs text-slate-400 font-bold block">Vetted Creators</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{influencers.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10">
          <span className="text-xs text-slate-400 font-bold block">Live Campaigns</span>
          <p className="text-2xl font-black text-indigo-500 mt-1">{campaigns.length}</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10">
          <span className="text-xs text-slate-400 font-bold block">Escrow Volume</span>
          <p className="text-2xl font-black text-emerald-500 mt-1">$68,400</p>
        </div>
      </div>

      {/* ADMIN TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'users' ? 'gradient-bg text-white shadow' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Manage Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'campaigns' ? 'gradient-bg text-white shadow' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Active Campaigns ({campaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'verifications' ? 'gradient-bg text-white shadow' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Verification Requests (2)
        </button>
      </div>

      {/* USERS TABLE */}
      {activeTab === 'users' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Registered Users & Creators</h3>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img src={user.avatar || user.logo} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-indigo-500" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{user.name}</span>
                    <span className="text-slate-500">{user.email} • Role: <strong className="capitalize">{user.role}</strong></span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    user.isVerified ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                  }`}>
                    {user.isVerified ? 'Verified Shield' : 'Pending Verification'}
                  </span>
                  <button className="p-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CAMPAIGNS TABLE */}
      {activeTab === 'campaigns' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Platform Campaign Moderation</h3>
          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">{camp.title}</span>
                  <span className="text-slate-500">{camp.city}, {camp.state} • Budget: ${camp.budget}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">
                  {camp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VERIFICATIONS TAB */}
      {activeTab === 'verifications' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Pending Document Verification Audits</h3>
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Artisan Roast Cafe (Business ID: b1)</span>
              <span className="text-slate-500">Submitted: tax_registration_verified.pdf</span>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-bold hover:scale-105 transition-all">
              Approve Verified Badge
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
