import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle2, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Modal } from '../common/Modal';
import confetti from 'canvas-confetti';

export const PaymentModal = ({ deal, isOpen, onClose }) => {
  const { updateDealPaymentStatus } = useData();
  const { formatCurrency, currentCurrency } = useCurrency();

  const [paymentOption, setPaymentOption] = useState('Online');
  const [processingState, setProcessingState] = useState('idle');

  if (!deal) return null;

  const handleOnlinePayment = (e) => {
    e.preventDefault();
    setProcessingState('processing');

    setTimeout(() => {
      setProcessingState('success');
      updateDealPaymentStatus(deal.id, {
        paymentMethod: 'Online',
        paymentStatus: 'Completed',
        status: 'Active'
      });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1800);
  };

  const handleOfflineBusinessClick = () => {
    updateDealPaymentStatus(deal.id, {
      paymentMethod: 'Offline',
      offlineBusinessPaid: true
    });
  };

  const handleOfflineInfluencerClick = () => {
    updateDealPaymentStatus(deal.id, {
      paymentMethod: 'Offline',
      offlineInfluencerReceived: true
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected Deal</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Campaign Escrow Payment
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Payout Amount: <span className="font-extrabold text-emerald-500 text-base">{formatCurrency(deal.finalPrice)}</span>
          </p>
        </div>

        {/* PAYMENT METHOD SELECTION */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPaymentOption('Online')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              paymentOption === 'Online'
                ? 'border-[#6D5EF8] bg-[#6D5EF8]/10 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-[#6D5EF8]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-[#6D5EF8]" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#6D5EF8] text-white">Instant</span>
            </div>
            <p className="text-xs font-extrabold">Online Escrow</p>
            <p className="text-[11px] text-slate-500">Credit Card, UPI, Netbanking</p>
          </button>

          <button
            type="button"
            onClick={() => setPaymentOption('Offline')}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              paymentOption === 'Offline'
                ? 'border-[#6D5EF8] bg-[#6D5EF8]/10 text-slate-900 dark:text-white font-bold shadow-sm'
                : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-[#6D5EF8]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500 text-white">Manual</span>
            </div>
            <p className="text-xs font-extrabold">Offline Direct Pay</p>
            <p className="text-[11px] text-slate-500">Cash or Direct Transfer</p>
          </button>
        </div>

        {paymentOption === 'Online' && (
          <form onSubmit={handleOnlinePayment} className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between font-bold text-xs text-slate-700 dark:text-slate-300">
                <span>Agreed Campaign Deliverables Payout</span>
                <span className="text-emerald-500 font-extrabold text-sm">{formatCurrency(deal.finalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Platform Service Fee</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{formatCurrency(0)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processingState === 'processing'}
              className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
            >
              {processingState === 'processing' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Secure Payment...</span>
                </>
              ) : processingState === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Escrow Deposited Successfully!</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Deposit {formatCurrency(deal.finalPrice)} to Escrow</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {paymentOption === 'Offline' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 space-y-2">
              <p className="font-bold">Offline Direct Settlement Guidelines</p>
              <p className="text-[11px] leading-relaxed">
                Both parties must acknowledge receipt of payment ({formatCurrency(deal.finalPrice)}) directly. Once verified by both, deal status updates to Completed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleOfflineBusinessClick}
                disabled={deal.offlineBusinessPaid}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition-all ${
                  deal.offlineBusinessPaid
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-[#6D5EF8] hover:text-white'
                }`}
              >
                {deal.offlineBusinessPaid ? '✓ Business Marked Paid' : 'Business: Mark Paid'}
              </button>

              <button
                type="button"
                onClick={handleOfflineInfluencerClick}
                disabled={deal.offlineInfluencerReceived}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition-all ${
                  deal.offlineInfluencerReceived
                    ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-[#6D5EF8] hover:text-white'
                }`}
              >
                {deal.offlineInfluencerReceived ? '✓ Creator Confirmed Receipt' : 'Creator: Confirm Received'}
              </button>
            </div>
          </div>
        )}
    </Modal>
  );
};
