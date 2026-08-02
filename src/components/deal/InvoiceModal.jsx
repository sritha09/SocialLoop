import React from 'react';
import { Printer, Sparkles, ShieldCheck } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { Modal } from '../common/Modal';

export const InvoiceModal = ({ deal, isOpen, onClose }) => {
  const { formatCurrency } = useCurrency();

  if (!deal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
        
        {/* INVOICE CONTENT */}
        <div id="printable-invoice" className="space-y-6 text-slate-900 dark:text-white">
          
          {/* HEADER */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg p-0.5 shadow flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black">SocialLoop</h3>
                <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Official Escrow Receipt</p>
              </div>
            </div>

            <div className="text-right text-xs">
              <p className="font-bold">INVOICE #{deal.id.toUpperCase()}</p>
              <p className="text-slate-400">Date: {deal.createdAt || new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* SUMMARY TABLE */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold">
                <span>Agreed Campaign Deliverables Payout</span>
                <span className="text-base font-black text-emerald-500">{formatCurrency(deal.finalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Payment Method</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{deal.paymentMethod || 'Escrow Online'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Escrow Status</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">{deal.paymentStatus || 'Completed'}</span>
              </div>
            </div>
          </div>

          {/* FOOTER VERIFICATION */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Verified Transaction</span>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-[#6D5EF8] hover:text-white transition-colors flex items-center gap-1.5 print:hidden"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice Receipt</span>
            </button>
          </div>

        </div>

    </Modal>
  );
};
