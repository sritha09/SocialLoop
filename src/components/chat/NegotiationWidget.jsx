import React, { useState } from 'react';
import { Handshake, DollarSign, Check, X, ArrowRight } from 'lucide-react';

export const NegotiationWidget = ({ onSendOffer, onAcceptOffer }) => {
  const [offerPrice, setOfferPrice] = useState(500);
  const [offerDeliverables, setOfferDeliverables] = useState('1 Instagram Reel + 3 IG Stories + High Res Photos');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendOffer({
      price: Number(offerPrice),
      deliverables: offerDeliverables
    });
    setIsOpen(false);
  };

  return (
    <div className="border-t border-slate-200 dark:border-white/10 p-3 bg-indigo-500/5 dark:bg-indigo-950/20">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <Handshake className="w-4 h-4" />
          <span>Open Price Negotiation & Custom Offer Tool</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 p-3 rounded-2xl glass-panel border border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs text-indigo-500 flex items-center gap-1">
              <Handshake className="w-4 h-4" />
              <span>Propose Agreed Terms / Price</span>
            </span>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-rose-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Agreed Price ($ USD)</label>
              <input 
                type="number"
                required
                value={offerPrice}
                onChange={e => setOfferPrice(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Agreed Deliverables Summary</label>
              <input 
                type="text"
                required
                value={offerDeliverables}
                onChange={e => setOfferDeliverables(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl gradient-bg text-white font-bold text-xs shadow hover:scale-[1.01] transition-transform"
          >
            Send Terms Proposal In Chat
          </button>
        </form>
      )}
    </div>
  );
};
