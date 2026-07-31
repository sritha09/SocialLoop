import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does escrow payment protection work on InfluenceConnect?',
      a: 'When a business owner accepts an influencer deal, funds are securely held in platform escrow (via Stripe/Razorpay or locked offline status). Once the creator publishes the content and the business approves, payment is instantly released.'
    },
    {
      q: 'Can local cafes or small businesses post offline event campaigns?',
      a: 'Absolutely! Business owners can specify exact state, city, venue, event date, and time. Influencers can check in at offline events using our built-in QR Code scanner tool.'
    },
    {
      q: 'How does the AI Matchmaker recommend creators or campaigns?',
      a: 'Our smart matching algorithm analyzes niche categories, geographic proximity, engagement rate, average post reach, and past rating scores to calculate a % compatibility score for every applicant.'
    },
    {
      q: 'What is the difference between Promotion and Collaboration campaigns?',
      a: 'Promotions are typically one-time posts or event coverage (e.g. 1 Instagram Reel + 3 Stories). Collaborations are long-term arrangements like 3-month brand ambassador programs or recurring content partnerships.'
    },
    {
      q: 'Is there a verification badge process for creators and brands?',
      a: 'Yes! Business owners can submit official registration documents and creators can authenticate their Instagram/YouTube handles to receive the verified shield badge.'
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center space-y-4 mb-14">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            Everything you need to know about campaigns, escrow, real-time chat, and verification.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between font-bold text-base text-slate-900 dark:text-white hover:text-indigo-500 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform duration-300 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
