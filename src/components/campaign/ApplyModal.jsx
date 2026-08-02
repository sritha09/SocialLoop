import React, { useState } from 'react';
import { Send, Calendar, Link } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';

import { Modal } from '../common/Modal';

export const ApplyModal = ({ campaign, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { submitApplication } = useData();
  const { currentCurrency, formatCurrency } = useCurrency();

  const [message, setMessage] = useState(
    `Hi! I'm ${currentUser?.name || 'a creator'} and I would love to collaborate on "${campaign?.title}". My audience matches your target demographic perfectly!`
  );
  const [availableDate, setAvailableDate] = useState(campaign?.date || '2026-08-15');
  const [expectedPrice, setExpectedPrice] = useState(String(campaign?.budget || '450'));
  const [portfolioLink, setPortfolioLink] = useState(currentUser?.instagram || '');

  if (!campaign) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    submitApplication({
      campaignId: campaign.id,
      influencerId: currentUser.id,
      message,
      availableDate,
      expectedPrice: Number(expectedPrice) || 0,
      portfolioLink
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-xl">
        <div className="space-y-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
            Campaign Application
          </span>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            Apply for "{campaign.title}"
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Target Budget: <span className="font-bold text-emerald-500">{formatCurrency(campaign.budget)}</span> • Venue: {campaign.city || 'Location'}
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
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
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
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expected Quote ({currentCurrency.symbol} {currentCurrency.code}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400 text-xs">
                  {currentCurrency.symbol}
                </span>
                <input 
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="Enter quote amount"
                  value={expectedPrice}
                  onChange={e => {
                    const val = e.target.value;
                    if (val === '' || /^\d*$/.test(val)) {
                      setExpectedPrice(val);
                    }
                  }}
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8] font-bold"
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#6D5EF8]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Campaign Proposal ({currentCurrency.symbol}{expectedPrice || '0'})</span>
            </button>
          </div>

        </form>

    </Modal>
  );
};
