import React from 'react';
import { ShieldCheck, Cpu, Lock, MessageSquare, MapPin, CreditCard } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Verified Profiles & Badges',
      desc: 'Strict identity check for businesses and creator social authentications to eliminate fake follower accounts.',
    },
    {
      icon: Cpu,
      title: 'Smart AI Matchmaker',
      desc: 'Algorithmically match campaigns based on budget, audience demographics, location, niche, and engagement rate.',
    },
    {
      icon: Lock,
      title: 'Protected Escrow Deals',
      desc: 'Funds are safely locked in platform escrow until the campaign deliverables are submitted and approved.',
    },
    {
      icon: MessageSquare,
      title: 'Real-Time Chat & Negotiation',
      desc: 'Built-in instant chat with document sharing, typing indicators, and integrated price offer/counter tools.',
    },
    {
      icon: MapPin,
      title: 'Location & Geo Searching',
      desc: 'Filter opportunities by State, City, or radius to run hyper-local cafe tastings, boutique launches & popups.',
    },
    {
      icon: CreditCard,
      title: 'Online & Offline Payments',
      desc: 'Seamless Stripe/Razorpay credit cards or dual 2-way manual confirmation for cash & direct bank transfers.',
    }
  ];

  return (
    <section id="features" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-900/50">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need for <span className="text-[#6D5EF8]">Flawless Collaborations</span>
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
                className="glass-card p-8 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm hover:shadow-card transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 p-3 text-[#6D5EF8] dark:text-[#8B7CFF] mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
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
