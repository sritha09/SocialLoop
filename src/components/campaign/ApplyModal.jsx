import React, { useState } from 'react';
import { X, Send, Calendar, DollarSign, Link, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ApplyModal = ({ campaign, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { submitApplication } = useData();

  const [message, setMessage] = useState(
    `Hi! I'm ${currentUser?.name || 'a creator'} and I would love to collaborate on "${campaign?.title}". My audience matches your target demographic perfectly!`
  );
  const [availableDate, setAvailableDate] = useState(campaign?.date || '2026-08-15');
  const [expectedPrice, setExpectedPrice] = useState(campaign?.budget || 450);
  const [portfolioLink, setPortfolioLink] = useState(currentUser?.instagram || 'https://instagram.com/mayacreates');

  if (!isOpen || !campaign) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitApplication({
      campaignId: campaign.id,
      influencerId: currentUser.id,
      message,
      availableDate,
      expectedPrice: Number(expectedPrice),
      portfolioLink
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
            Campaign Application
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Apply for "{campaign.title}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Target Budget: <span className="font-bold text-emerald-500">${campaign.budget}</span> • Venue: {campaign.city}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Proposal Pitch & Cover Message *</label>
            <textarea 
              rows="4"
              required
              placeholder="Introduce yourself, mention why you're a great fit, and pitch your content idea..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Available Date *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="date"
                  required
                  value={availableDate}
                  onChange={e => setAvailableDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Quote ($ USD) *</label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="number"
                  required
                  placeholder="450"
                  value={expectedPrice}
                  onChange={e => setExpectedPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Portfolio or Social Handle Link</label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input 
                type="url"
                required
                placeholder="https://instagram.com/yourhandle"
                value={portfolioLink}
                onChange={e => setPortfolioLink(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Campaign Proposal</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
