import React, { useState } from 'react';
import { Briefcase, Camera, ArrowRight, UserPlus, FilePlus, Users, MessageSquare, Handshake, CheckCircle2, Search, Send, DollarSign } from 'lucide-react';

export const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('business'); // 'business' or 'influencer'

  const businessSteps = [
    { num: '01', title: 'Create Account', desc: 'Register business details, location, logo, and optional official verification doc.', icon: UserPlus },
    { num: '02', title: 'Post Campaign', desc: 'Define title, category, target budget, date, venue, min/max followers & platforms.', icon: FilePlus },
    { num: '03', title: 'Receive Applications', desc: 'Browse applicants with AI compatibility scores, portfolios, and proposed rates.', icon: Users },
    { num: '04', title: 'Chat & Negotiate', desc: 'Directly message creators, request revisions, or adjust payout inside chat.', icon: MessageSquare },
    { num: '05', title: 'Finalize Deal', desc: 'Confirm terms & fund escrow using online card processing or offline manual option.', icon: Handshake },
    { num: '06', title: 'Complete Campaign', desc: 'Approve deliverables, release escrow payment, and leave 5-star review rating.', icon: CheckCircle2 }
  ];

  const creatorSteps = [
    { num: '01', title: 'Sign Up', desc: 'Create creator profile, link social handles (IG, YT, X), followers count & reach.', icon: UserPlus },
    { num: '02', title: 'Find Opportunities', desc: 'Search active promotions & long-term brand collabs filtered by city & payout.', icon: Search },
    { num: '03', title: 'Apply With Quote', desc: 'Submit pitch message, available dates, quote rate, and portfolio highlights.', icon: Send },
    { num: '04', title: 'Negotiate Terms', desc: 'Chat with business owners to align on deliverables, schedules, and perks.', icon: MessageSquare },
    { num: '05', title: 'Accept Deal', desc: 'Lock in agreed terms; deal status changes to Active with guaranteed escrow.', icon: Handshake },
    { num: '06', title: 'Get Paid & Reviewed', desc: 'Publish content, receive payment directly to account, and build leaderboard rank.', icon: DollarSign }
  ];

  const steps = activeTab === 'business' ? businessSteps : creatorSteps;

  return (
    <section id="how-it-works" className="py-20 relative z-10 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/20">
            Simple 6-Step Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How <span className="text-[#6D5EF8]">SocialLoop</span> Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Seamless end-to-end workflow tailored specifically for business owners and content creators.
          </p>

          {/* ROLE TOGGLE */}
          <div className="pt-4 inline-flex p-1.5 rounded-2xl glass-panel border border-slate-300 dark:border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'business'
                  ? 'gradient-bg text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>For Business Owners</span>
            </button>
            <button
              onClick={() => setActiveTab('influencer')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'influencer'
                  ? 'gradient-bg text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>For Influencers</span>
            </button>
          </div>
        </div>

        {/* STEP TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 relative hover:border-indigo-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-indigo-500/30 dark:text-indigo-400/20 group-hover:text-indigo-500 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
