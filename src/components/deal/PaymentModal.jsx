import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, DollarSign, ShieldCheck, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import confetti from 'canvas-confetti';

export const PaymentModal = ({ deal, isOpen, onClose }) => {
  const { updateDealPaymentStatus } = useData();

  const [paymentOption, setPaymentOption] = useState('Online');
  const [processingState, setProcessingState] = useState('idle');

  if (!isOpen || !deal) return null;

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

  const steps = [
    { num: 1, title: 'Terms Agreed', done: true },
    { num: 2, title: 'Escrow Funded', done: deal.paymentStatus === 'Completed' || processingState === 'success' },
    { num: 3, title: 'Deliverable Submitted', done: deal.status === 'Submitted' || deal.status === 'Completed' },
    { num: 4, title: 'Funds Released', done: deal.status === 'Completed' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Payment Gateway</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            SocialLoop Escrow Workflow
          </h3>
        </div>

        {/* STEP-BY-STEP PROGRESS INDICATOR */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center text-[10px] sm:text-xs font-semibold">
          {steps.map(step => (
            <div key={step.num} className="space-y-1">
              <div className={`w-7 h-7 rounded-full mx-auto flex items-center justify-center font-bold transition-all ${
                step.done 
                  ? 'bg-[#6D5EF8] text-white shadow-sm' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}>
                {step.done ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <p className={step.done ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400'}>{step.title}</p>
            </div>
          ))}
        </div>

        {/* DEAL SUMMARY CARD */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#ECECF3] dark:border-[#26334D] mb-6 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <p className="text-slate-400 font-medium">Deal Contract #{deal.id}</p>
            <p className="font-extrabold text-slate-900 dark:text-white">{deal.deliverables || 'Instagram Campaign Deliverables'}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 font-medium">Total Amount</p>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">${deal.finalPrice}</p>
          </div>
        </div>

        {/* OPTION SELECTOR (ONLINE VS OFFLINE) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPaymentOption('Online')}
            className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
              paymentOption === 'Online' 
                ? 'border-[#6D5EF8] bg-[#6D5EF8]/10 text-[#6D5EF8] dark:text-[#8B7CFF]' 
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Online (Stripe/Escrow)</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentOption('Offline')}
            className={`p-3 rounded-xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
              paymentOption === 'Offline' 
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Offline Cash / Transfer</span>
          </button>
        </div>

        {/* ONLINE PAYMENT FORM */}
        {paymentOption === 'Online' && (
          <div className="space-y-4">
            {processingState === 'idle' && (
              <form onSubmit={handleOnlinePayment} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cardholder Name</label>
                  <input 
                    type="text"
                    required
                    defaultValue="Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      required
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                    <input 
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CVC / CVV</label>
                    <input 
                      type="password"
                      defaultValue="123"
                      className="w-full px-3 py-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-slate-900 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gradient-button text-white font-bold text-sm shadow flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock ${deal.finalPrice} in Escrow</span>
                </button>
              </form>
            )}

            {processingState === 'processing' && (
              <div className="text-center py-12 space-y-4">
                <RefreshCw className="w-8 h-8 text-[#6D5EF8] animate-spin mx-auto" />
                <h4 className="font-bold text-base text-slate-900 dark:text-white">Securing Funds in Escrow...</h4>
                <p className="text-xs text-slate-500">Processing encrypted transaction via Stripe Gateway.</p>
              </div>
            )}

            {processingState === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-xl text-slate-900 dark:text-white">Escrow Payment Confirmed!</h4>
                <p className="text-xs text-slate-500">
                  ${deal.finalPrice} is now securely locked in SocialLoop Escrow. Funds release upon content completion.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        )}

        {/* OFFLINE PAYMENT WORKFLOW */}
        {paymentOption === 'Offline' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D] space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Two-Way Offline Verification</h4>
              <p className="text-slate-500">
                Business marks payment sent &rarr; Influencer confirms receipt.
              </p>

              <div className="space-y-2 pt-2 border-t border-[#ECECF3] dark:border-[#26334D]">
                <div className="flex items-center justify-between">
                  <span>1. Business Owner Status:</span>
                  <button
                    onClick={handleOfflineBusinessClick}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      deal.offlineBusinessPaid 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-[#6D5EF8] text-white'
                    }`}
                  >
                    {deal.offlineBusinessPaid ? '✓ Payment Sent' : 'Mark Payment Sent'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>2. Influencer Status:</span>
                  <button
                    onClick={handleOfflineInfluencerClick}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      deal.offlineInfluencerReceived 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-[#6D5EF8] text-white'
                    }`}
                  >
                    {deal.offlineInfluencerReceived ? '✓ Payment Received' : 'Confirm Payment Received'}
                  </button>
                </div>
              </div>

              {deal.offlineBusinessPaid && deal.offlineInfluencerReceived && (
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-center">
                  🎉 Deal Status = COMPLETED
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
