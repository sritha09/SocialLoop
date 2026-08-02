import React from 'react';
import { ArrowRight, ShieldCheck, Users, CheckCircle2, Sparkles } from 'lucide-react';

export const HeroSection = ({ setActiveView, openAuthModal }) => {
  return (
    <section className="relative pt-8 pb-14 lg:pt-14 lg:pb-20 overflow-hidden">
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
                onClick={() => openAuthModal('signup', 'business')}
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

          {/* HERO RIGHT COLUMN: RESTORED HERO ILLUSTRATION */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <div className="glass-panel p-3 rounded-3xl border border-[#ECECF3] dark:border-[#26334D] shadow-xl overflow-hidden animate-float">
                <img 
                  src="/hero_illustration.png" 
                  alt="SocialLoop Creator and Business Collaboration Illustration" 
                  className="w-full h-auto rounded-2xl object-cover shadow-inner"
                />
              </div>

              {/* FLOATING ESCROW BADGE */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl z-20 shadow-xl border border-[#ECECF3] dark:border-[#26334D] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-[#6D5EF8] font-bold text-sm">
                  100%
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">Escrow Protected</p>
                  <p className="text-xs font-black text-emerald-500">Guaranteed Payment</p>
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
