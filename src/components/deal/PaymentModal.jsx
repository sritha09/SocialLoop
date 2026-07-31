import React, { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2, DollarSign, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';
import confetti from 'canvas-confetti';

export const PaymentModal = ({ deal, isOpen, onClose }) => {
  const { updateDealPaymentStatus } = useData();

  const [paymentOption, setPaymentOption] = useState('Online'); // 'Online' or 'Offline'
  const [processingState, setProcessingState] = useState('idle'); // 'idle', 'processing', 'success'

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
    }, 2000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Protected Payment Gateway</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Escrow Payment for Deal #{deal.id}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total Amount: <span className="font-bold text-emerald-500">${deal.finalPrice}</span>
          </p>
        </div>

        {/* OPTION SELECTOR (ONLINE VS OFFLINE) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setPaymentOption('Online')}
            className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
              paymentOption === 'Online' 
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-md' 
                : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>Option 1: Online (Stripe/Razorpay)</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentOption('Offline')}
            className={`p-3.5 rounded-2xl border-2 font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
              paymentOption === 'Offline' 
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-md' 
                : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-emerald-300'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Option 2: Offline Cash / Bank</span>
          </button>
        </div>

        {/* ONLINE PAYMENT FORM */}
        {paymentOption === 'Online' && (
          <div className="space-y-4">
            {processingState === 'idle' && (
              <form onSubmit={handleOnlinePayment} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Cardholder Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Elena Rostova"
                    defaultValue="Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      required
                      placeholder="4242 •••• •••• 4242"
                      defaultValue="4242 4242 4242 4242"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                    <input 
                      type="text"
                      placeholder="08/28"
                      defaultValue="08/28"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CVC / CVV</label>
                    <input 
                      type="password"
                      placeholder="123"
                      defaultValue="123"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800 text-slate-900 dark:text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Lock ${deal.finalPrice} in Escrow Now</span>
                </button>
              </form>
            )}

            {processingState === 'processing' && (
              <div className="text-center py-12 space-y-4">
                <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin mx-auto" />
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">Securing Funds in Escrow...</h4>
                <p className="text-xs text-slate-500">Communicating with Stripe/Razorpay secure server.</p>
              </div>
            )}

            {processingState === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-black text-xl text-slate-900 dark:text-white">Payment Successful!</h4>
                <p className="text-xs text-slate-500">
                  ${deal.finalPrice} is now securely locked in InfluenceConnect Escrow. Deal is ACTIVE!
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
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/40 border space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Two-Way Offline Payment Verification</h4>
              <p className="text-slate-500">
                Business marks payment done &rarr; Influencer confirms receipt &rarr; Deal completed.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span>1. Business Owner Payment:</span>
                  <button
                    onClick={handleOfflineBusinessClick}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      deal.offlineBusinessPaid 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {deal.offlineBusinessPaid ? '✓ Payment Done' : 'Click: Payment Done'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>2. Influencer Receipt:</span>
                  <button
                    onClick={handleOfflineInfluencerClick}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      deal.offlineInfluencerReceived 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-rose-600 text-white hover:bg-rose-700'
                    }`}
                  >
                    {deal.offlineInfluencerReceived ? '✓ Payment Received' : 'Click: Payment Received'}
                  </button>
                </div>
              </div>

              {deal.offlineBusinessPaid && deal.offlineInfluencerReceived && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-center">
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
