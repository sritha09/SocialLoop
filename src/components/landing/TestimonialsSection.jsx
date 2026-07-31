import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Owner, Artisan Roast Cafe',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      text: 'InfluenceConnect made it effortless for our SF cafe to book 4 local food bloggers for our new cold brew launch. The escrow system gave us total peace of mind.',
      rating: 5,
      type: 'Business Owner'
    },
    {
      name: 'Maya Lin',
      role: 'Lifestyle & Culinary Creator',
      location: '@mayacreates (85K followers)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      text: 'The in-chat negotiation feature is brilliant! I was able to agree on custom reel deliverables and price with Elena in under 10 minutes. Payments are fast and transparent.',
      rating: 5,
      type: 'Content Creator'
    },
    {
      name: 'Marcus Vance',
      role: 'Founder, PulseFit Wear',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      text: 'Finding authentic micro-influencers with engaged fitness audiences used to take weeks of cold DMing. With InfluenceConnect, we signed 3 brand ambassadors in 48 hours!',
      rating: 5,
      type: 'Business Owner'
    }
  ];

  return (
    <section className="py-20 relative z-10 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved By <span className="gradient-text">Brands & Creators</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base">
            See how InfluenceConnect is powering meaningful collaborations across top cities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 relative flex flex-col justify-between hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-indigo-500/20 dark:text-white/10" />
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-200/60 dark:border-white/10 mt-6">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" 
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">{t.role}</p>
                  <p className="text-[11px] text-slate-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
