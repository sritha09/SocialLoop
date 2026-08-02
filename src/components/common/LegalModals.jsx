import React from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';

export const LegalModals = ({ activeModal, onClose }) => {
  React.useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal]);

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[85vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ABOUT MODAL */}
        {activeModal === 'about' && (
          <div className="space-y-5 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <div className="space-y-2 border-b border-[#ECECF3] dark:border-[#26334D] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Our Blueprint & Vision</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                About SocialLoop
              </h3>
            </div>

            <p className="leading-relaxed">
              SocialLoop is the next-generation marketplace connecting local cafes, startups, boutiques, and global brands directly with verified micro-influencers and content creators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Escrow Protection
                </h4>
                <p className="text-slate-500 text-[11px]">Funds are securely locked in platform escrow until agreed deliverables are approved.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#6D5EF8]" />
                  Direct Chat Negotiations
                </h4>
                <p className="text-slate-500 text-[11px]">Real-time in-chat custom offer builder with instant contract creation.</p>
              </div>
            </div>
          </div>
        )}

        {/* PRIVACY POLICY */}
        {activeModal === 'privacy' && (
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <div className="space-y-2 border-b border-[#ECECF3] dark:border-[#26334D] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Data Protection & Privacy</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Privacy Policy
              </h3>
            </div>

            <p className="leading-relaxed">
              At SocialLoop, your data privacy is paramount. We store user credentials securely using industry-grade encryption and never share unverified private payment data.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400 text-xs">
              <li>Information collected includes profile details, portfolio links, and campaign deliverables.</li>
              <li>Escrow transactions are processed securely via encrypted payment tokens.</li>
              <li>You may request complete data export or account deletion at any time.</li>
            </ul>
          </div>
        )}

        {/* TERMS & CONDITIONS */}
        {activeModal === 'terms' && (
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <div className="space-y-2 border-b border-[#ECECF3] dark:border-[#26334D] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-xs font-bold">
                <FileText className="w-4 h-4" />
                <span>Platform Agreements</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Terms & Conditions
              </h3>
            </div>

            <p className="leading-relaxed">
              By accessing or using SocialLoop, you agree to comply with our platform guidelines for authentic brand-creator partnerships.
            </p>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p><strong>1. Content Rights:</strong> Creators retain copyright of created media while granting non-exclusive commercial license to hiring businesses as stipulated in deal terms.</p>
              <p><strong>2. Escrow Payouts:</strong> Payouts are automatically released once content meets contract criteria.</p>
            </div>
          </div>
        )}

        {/* CAREERS */}
        {activeModal === 'careers' && (
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
            <div className="space-y-2 border-b border-[#ECECF3] dark:border-[#26334D] pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold">
                <Briefcase className="w-4 h-4" />
                <span>Join Our Remote Team</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Careers at SocialLoop
              </h3>
            </div>

            <p className="leading-relaxed">
              We are building the future of creator commerce. Check out our open roles in Engineering, Growth, and Creator Success!
            </p>

            <div className="space-y-2 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Senior Fullstack Engineer (React/Node)</h4>
                  <p className="text-[11px] text-slate-500">Remote • Full-time</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#6D5EF8] text-white font-bold text-[11px]">Apply</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">Creator Partnerships Manager</h4>
                  <p className="text-[11px] text-slate-500">San Francisco / Remote</p>
                </div>
                <span className="px-3 py-1 rounded-lg bg-[#6D5EF8] text-white font-bold text-[11px]">Apply</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
