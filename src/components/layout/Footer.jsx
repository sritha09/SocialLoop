import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';
import { SocialLoopLogo } from '../common/SocialLoopLogo';

export const Footer = ({ setActiveView, openLegalModal }) => {
  const handleDummyClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <SocialLoopLogo showText={true} textClassName="text-2xl text-white" />
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400 max-w-sm pt-1">
              The premier marketplace connecting local businesses, cafes, startups, and global brands with vetted content creators & micro-influencers for authentic campaigns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button onClick={handleDummyClick} className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <InstagramIcon className="w-4 h-4" />
              </button>
              <button onClick={handleDummyClick} className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </button>
              <button onClick={handleDummyClick} className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <TwitterIcon className="w-4 h-4" />
              </button>
              <button onClick={handleDummyClick} className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">For Businesses</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Post a Campaign</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Browse Creators</button></li>
              <li><button onClick={handleDummyClick} className="hover:text-[#6D5EF8] transition-colors">Escrow Protection</button></li>
              <li><button onClick={handleDummyClick} className="hover:text-[#6D5EF8] transition-colors">ROI Analytics</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">For Creators</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Find Paid Deals</button></li>
              <li><button onClick={handleDummyClick} className="hover:text-[#6D5EF8] transition-colors">Rate Calculator</button></li>
              <li><button onClick={handleDummyClick} className="hover:text-[#6D5EF8] transition-colors">Instant Payouts</button></li>
              <li><button onClick={handleDummyClick} className="hover:text-[#6D5EF8] transition-colors">Media Kit Generator</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Company & Legal</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => openLegalModal('about')} className="hover:text-[#6D5EF8] transition-colors">About SocialLoop</button></li>
              <li><button onClick={() => openLegalModal('privacy')} className="hover:text-[#6D5EF8] transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => openLegalModal('terms')} className="hover:text-[#6D5EF8] transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => openLegalModal('careers')} className="hover:text-[#6D5EF8] transition-colors">Careers & Hiring</button></li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Platform
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SocialLoop. All rights reserved. Registered trademark.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => openLegalModal('privacy')} className="hover:text-slate-300 transition-colors">Privacy</button>
            <button onClick={() => openLegalModal('terms')} className="hover:text-slate-300 transition-colors">Terms</button>
            <button onClick={() => openLegalModal('cookies')} className="hover:text-slate-300 transition-colors">Cookies</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
