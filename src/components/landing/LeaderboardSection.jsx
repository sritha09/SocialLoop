import React from 'react';
import { Trophy, Star, ShieldCheck, Award, ArrowUpRight } from 'lucide-react';
import { LEADERBOARD_CREATORS, LEADERBOARD_BUSINESSES } from '../../mockData/initialData';

export const LeaderboardSection = ({ setActiveView }) => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
            Hall of Fame
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Top Creators & <span className="gradient-text">Trusted Businesses</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Recognizing the top performing content creators and highest rated business partners on InfluenceConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* TOP CREATORS LEADERBOARD */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Top Creator Leaderboard</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ranked by completed collabs & ratings</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveView('leaderboard')}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {LEADERBOARD_CREATORS.map((creator) => (
                <div 
                  key={creator.rank}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                      creator.rank === 1 ? 'bg-amber-400 text-slate-900 shadow' :
                      creator.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      'bg-amber-700 text-white'
                    }`}>
                      #{creator.rank}
                    </span>
                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{creator.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{creator.username} • {creator.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{creator.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{creator.deals} Deals ({creator.earnings})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOST TRUSTED BUSINESSES LEADERBOARD */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Most Trusted Businesses</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Ranked by campaign volume & payout reliability</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveView('leaderboard')}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {LEADERBOARD_BUSINESSES.map((business) => (
                <div 
                  key={business.rank}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center ${
                      business.rank === 1 ? 'bg-amber-400 text-slate-900 shadow' :
                      business.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      'bg-amber-700 text-white'
                    }`}>
                      #{business.rank}
                    </span>
                    <img 
                      src={business.logo} 
                      alt={business.name} 
                      className="w-11 h-11 rounded-2xl object-cover border-2 border-indigo-500/50"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{business.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{business.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{business.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{business.campaigns} Campaigns ({business.totalPaid})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
