import React from 'react';
import { ShieldCheck, Cpu, Lock, MessageSquare, MapPin, CreditCard, Sparkles } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Profiles & Badges',
      desc: 'Strict identity check for businesses and creator social authentications to eliminate fake follower accounts.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Cpu,
      title: 'Smart AI Matchmaker',
      desc: 'Algorithmically match campaigns based on budget, audience demographics, location, niche, and engagement rate.',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Lock,
      title: 'Protected Escrow Deals',
      desc: 'Funds are safely locked in platform escrow until the campaign deliverables are submitted and approved.',
      gradient: 'from-rose-500 to-pink-500'
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Chat & Negotiation',
      desc: 'Built-in instant chat with document sharing, typing indicators, and integrated price offer/counter tools.',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: MapPin,
      title: 'Location & Geo Searching',
      desc: 'Filter opportunities by State, City, or radius to run hyper-local cafe tastings, boutique launches & popups.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: CreditCard,
      title: 'Online & Offline Payments',
      desc: 'Seamless Stripe/Razorpay credit cards or dual 2-way manual confirmation for cash & direct bank transfers.',
      gradient: 'from-cyan-500 to-blue-500'
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
            Platform Powers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need for <span className="gradient-text">Flawless Collaborations</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Built from the ground up to solve the headache of manual DM outreach, unclear deliverables, and payment delays.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.gradient} p-3.5 text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
