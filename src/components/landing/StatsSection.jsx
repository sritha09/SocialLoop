import React from 'react';
import { Building2, Users, CheckCircle2, MapPin } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    { id: 1, label: 'Total Businesses', value: '1,250+', icon: Building2, color: 'from-indigo-500 to-purple-500' },
    { id: 2, label: 'Vetted Influencers', value: '8,400+', icon: Users, color: 'from-rose-500 to-pink-500' },
    { id: 3, label: 'Collaborations Completed', value: '14,200+', icon: CheckCircle2, color: 'from-emerald-500 to-teal-500' },
    { id: 4, label: 'Cities Covered', value: '85+', icon: MapPin, color: 'from-amber-500 to-orange-500' }
  ];

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-lg hover:scale-105 transition-transform duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stat.color} p-2.5 text-white shadow-md group-hover:rotate-6 transition-transform`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                    Live Metric
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
