import React from 'react';
import { Infinity as LoopIcon, ArrowRight, ShieldCheck, Star, Users, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HeroSection = ({ setActiveView, openAuthModal }) => {
  const { switchDemoUser } = useAuth();

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Soft Pastel Ambient Glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl pointer-events-none animate-aurora"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-900/20 rounded-full blur-3xl pointer-events-none animate-aurora"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* HERO LEFT COLUMN */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              <span>Next-Gen Creator x Brand Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Connect <span className="gradient-text">Local Brands</span> With Vetted <span className="underline decoration-purple-400 decoration-wavy">Creators</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Elevate your cafe, startup, or brand promotions with verified micro-influencers. Direct chat negotiation, smart AI matching, transparent escrow payments, and localized currencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => openAuthModal('signup')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl gradient-button text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  switchDemoUser('i1');
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card text-slate-900 dark:text-white font-bold text-sm border border-purple-200 dark:border-purple-800/40 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4 text-purple-500" />
                <span>Explore Live Demo</span>
              </button>
            </div>

          </div>

          {/* HERO RIGHT COLUMN: EYE-CATCHING GENERATED ILLUSTRATION */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              <div className="glass-panel p-3 rounded-3xl border border-purple-200 dark:border-purple-500/20 shadow-2xl overflow-hidden animate-float">
                <img 
                  src="/hero_illustration.png" 
                  alt="Creator and Business Collaboration Illustration" 
                  className="w-full h-auto rounded-2xl object-cover shadow-inner"
                />
              </div>

              {/* FLOATING ESCROW BADGE */}
              <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl z-20 shadow-xl border border-purple-300 dark:border-purple-700/50 hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-sm">
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
      </div>
    </section>
  );
};
