import React from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const QRCodeModal = ({ deal, isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !deal) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl p-6 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[90vh] text-center space-y-4 overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 mx-auto flex items-center justify-center">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Event Check-In QR Pass
        </h3>
        <p className="text-xs text-slate-500">
          Show this QR code at the offline venue to verify check-in and unlock escrow release.
        </p>

        {/* QR VISUAL PREVIEW */}
        <div className="p-4 rounded-2xl bg-white border-2 border-indigo-500/30 inline-block shadow-lg my-2">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${deal.qrCodeToken || 'INFLUENCE-CONNECT-QR'}`} 
            alt="Check-in QR" 
            className="w-44 h-44 mx-auto"
          />
        </div>

        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300">
          TOKEN: {deal.qrCodeToken || 'IC-QR-VERIFIED'}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl gradient-bg text-white font-bold text-xs shadow"
        >
          Close Pass
        </button>

      </div>
    </div>
  );
};
