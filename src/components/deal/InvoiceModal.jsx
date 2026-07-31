import React from 'react';
import { X, Printer, Download, Sparkles, ShieldCheck } from 'lucide-react';

export const InvoiceModal = ({ deal, isOpen, onClose }) => {
  if (!isOpen || !deal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* INVOICE CONTENT */}
        <div id="printable-invoice" className="space-y-6 text-slate-900 dark:text-white">
          
          {/* HEADER */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg p-0.5 shadow flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black">socialLoop</h3>
                <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Official Escrow Receipt</p>
              </div>
            </div>

            <div className="text-right text-xs">
              <p className="font-bold">INVOICE #{deal.id.toUpperCase()}</p>
              <p className="text-slate-400">Date: {new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* DEAL PARTICIPANTS */}
          <div className="grid grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Billed To (Business)</span>
              <p className="font-extrabold text-sm">Artisan Roast Cafe</p>
              <p className="text-slate-500">San Francisco, CA</p>
              <p className="text-slate-500">Tax ID: US-984210349</p>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">Payee (Creator)</span>
              <p className="font-extrabold text-sm">Maya Lin (@mayacreates)</p>
              <p className="text-slate-500">San Francisco, CA</p>
              <p className="text-slate-500 font-semibold text-emerald-500">Verified Creator Handle</p>
            </div>
          </div>

          {/* LINE ITEMS TABLE */}
          <div className="space-y-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 font-bold">
                  <th className="py-2">Deliverable Item</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                <tr>
                  <td className="py-3 font-semibold">{deal.deliverables || 'Campaign Sponsorship & Content Creation'}</td>
                  <td className="py-3 text-right">1 Package</td>
                  <td className="py-3 text-right font-extrabold">${deal.finalPrice}</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-500">InfluenceConnect Platform Escrow Protection Fee</td>
                  <td className="py-3 text-right">1</td>
                  <td className="py-3 text-right text-emerald-500 font-bold">$0.00 (Waived)</td>
                </tr>
              </tbody>
            </table>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Escrow Status: {deal.paymentStatus || 'Completed'}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Total Agreed</span>
                <span className="text-2xl font-black text-emerald-500">${deal.finalPrice}</span>
              </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow hover:scale-105 transition-transform flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice / Save PDF</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
