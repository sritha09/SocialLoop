import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Award, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const AnalyticsView = () => {
  const { currentUser, isBusiness } = useAuth();
  const { campaigns, applications, deals } = useData();

  const businessStats = {
    campaignReach: '450,000+',
    totalApplications: 28,
    acceptanceRate: '75%',
    moneySpent: '$2,850',
    completedCampaigns: 4,
    topInfluencers: ['@mayacreates', '@devonfit', '@ariacodes']
  };

  const influencerStats = {
    applicationsSent: 14,
    acceptedDeals: 8,
    completedCampaigns: 6,
    totalEarnings: '$4,250',
    profileViews: '3,840'
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 flex items-center justify-between shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20 mb-2 inline-block">
            Performance Intelligence
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" />
            <span>{isBusiness ? 'Business Campaign Analytics' : 'Creator Growth & Earnings Analytics'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time ROI, engagement rates, and deal completion statistics.
          </p>
        </div>
      </div>

      {isBusiness ? (
        <div className="space-y-8">
          
          {/* CARDS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Total Campaign Reach</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{businessStats.campaignReach}</p>
              <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +24% vs last month
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Total Applications</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{businessStats.totalApplications}</p>
              <span className="text-[11px] text-indigo-400 font-semibold mt-1 block">
                Acceptance Rate: {businessStats.acceptanceRate}
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Capital Invested</span>
              <p className="text-3xl font-black text-emerald-500">{businessStats.moneySpent}</p>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                100% Verified Escrow
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Completed Campaigns</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{businessStats.completedCampaigns}</p>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                5.0 Average Creator Rating
              </span>
            </div>
          </div>

          {/* MOCK VISUAL CHART & TOP INFLUENCERS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Monthly Reach Growth Chart</h3>
              <div className="h-48 flex items-end justify-between gap-3 pt-8 px-4 border-b border-slate-200/50 dark:border-white/5">
                {[
                  { month: 'Mar', val: 35 },
                  { month: 'Apr', val: 55 },
                  { month: 'May', val: 40 },
                  { month: 'Jun', val: 75 },
                  { month: 'Jul', val: 90 },
                  { month: 'Aug', val: 100 }
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div 
                      style={{ height: `${bar.val}%` }} 
                      className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-purple-500 group-hover:brightness-125 transition-all"
                    ></div>
                    <span className="text-[11px] text-slate-400 font-bold">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Top Performing Creators</h3>
              <div className="space-y-3">
                {businessStats.topInfluencers.map((handle, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-500">{handle}</span>
                    <span className="text-emerald-500 font-bold">5.0 Star Rating</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="space-y-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Total Creator Earnings</span>
              <p className="text-3xl font-black text-emerald-500">{influencerStats.totalEarnings}</p>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +32% this quarter
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Proposals Sent</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{influencerStats.applicationsSent}</p>
              <span className="text-[11px] text-indigo-400 font-semibold mt-1 block">
                {influencerStats.acceptedDeals} Accepted Deals
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Completed Campaigns</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{influencerStats.completedCampaigns}</p>
              <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">
                100% On-Time Delivery
              </span>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg">
              <span className="text-xs text-slate-400 font-bold block mb-1">Profile Views</span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{influencerStats.profileViews}</p>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                High Business Traffic
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
