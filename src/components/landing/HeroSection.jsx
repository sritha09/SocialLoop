import React from 'react';
import { ArrowRight, ShieldCheck, Star, Users, CheckCircle2, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HeroSection = ({ setActiveView, openAuthModal }) => {
  const { switchDemoUser } = useAuth();

  return (
    <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* HERO LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Brand x Creator Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Where Businesses Meet the <span className="text-[#6D5EF8]">Right Creators.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
              SocialLoop helps growing cafes, startups, and brands partner with verified micro-influencers. Direct chat negotiations, transparent escrow payments, and measurable ROI.
            </p>

            {/* TWO MAIN CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setActiveView('explore')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Find Creators</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openAuthModal('signup', 'influencer')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-card text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-[#6D5EF8]" />
                <span>Become a Creator</span>
              </button>
            </div>

            {/* QUICK TRUST HIGHLIGHTS */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                100% Escrow Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#6D5EF8]" />
                Vetted Influencer Metrics
              </span>
            </div>

          </div>

          {/* HERO RIGHT COLUMN: STARTUP DASHBOARD PREVIEW MOCKUP */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* MAIN DASHBOARD PREVIEW SURFACE */}
              <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-float">
                
                {/* PREVIEW TOP BAR */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-[#6D5EF8] font-bold text-xs">
                      SL
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Artisan Roast SF x Maya Lin</h4>
                      <p className="text-[11px] text-slate-500">Instagram Reel Campaign • SF Local</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                    Escrow Locked ($450)
                  </span>
                </div>

                {/* STAT CARDS PREVIEW */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Reach</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">85.4K</p>
                    <span className="text-[9px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
                      <TrendingUp className="w-2.5 h-2.5" /> +14%
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Eng. Rate</p>
                    <p className="text-sm font-black text-[#6D5EF8] mt-0.5">4.8%</p>
                    <span className="text-[9px] text-slate-500 mt-1">High Intent</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Payout</p>
                    <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5">$450</p>
                    <span className="text-[9px] text-emerald-500 font-bold mt-1">Guaranteed</span>
                  </div>
                </div>

                {/* MINI IN-CHAT PREVIEW */}
                <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Maya" className="w-6 h-6 rounded-full object-cover mt-0.5" />
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                      I can deliver 1 Instagram Reel + 3 Stories by Friday! ☕
                    </div>
                  </div>
                  <div className="flex items-start justify-end gap-2">
                    <div className="bg-[#6D5EF8] text-white p-2 rounded-xl text-right">
                      Deal accepted! Escrow funded.
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* TRUSTED BY GROWING BRANDS PROOF BAR */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by growing cafes, startups, & top brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all text-xs font-bold text-slate-500 dark:text-slate-400">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">Artisan Roast SF</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">PulseFit Wear</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">GlowBeauty Labs</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">ByteCraft AI</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-lg">Urban Eats Co.</span>
          </div>
        </div>

      </div>
    </section>
  );
};
