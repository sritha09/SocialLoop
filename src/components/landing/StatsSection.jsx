import React from 'react';
import { Building2, Users, CheckCircle2, MapPin } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    { id: 1, label: 'Verified Businesses', value: '1,250+', icon: Building2 },
    { id: 2, label: 'Vetted Creators', value: '8,400+', icon: Users },
    { id: 3, label: 'Deals Completed', value: '14,200+', icon: CheckCircle2 },
    { id: 4, label: 'Cities Covered', value: '85+', icon: MapPin }
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
                className="glass-card p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm hover:shadow-card transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 p-2.5 text-[#6D5EF8] dark:text-[#8B7CFF] group-hover:scale-105 transition-transform">
                    <Icon className="w-full h-full" />
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    Live Metric
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
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
