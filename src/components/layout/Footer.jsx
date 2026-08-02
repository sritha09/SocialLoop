import React from 'react';
import { ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';
import { SocialLoopLogo } from '../common/SocialLoopLogo';

export const Footer = ({ setActiveView }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <SocialLoopLogo showText={true} textClassName="text-2xl text-white" />
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm pt-1">
              The premier marketplace connecting local businesses, cafes, startups, and global brands with vetted content creators & micro-influencers for authentic campaigns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#6D5EF8] hover:text-white flex items-center justify-center transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">For Businesses</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Post a Campaign</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Browse Creators</button></li>
              <li><a href="#" className="hover:text-[#6D5EF8] transition-colors">Escrow Guarantee</a></li>
              <li><a href="#" className="hover:text-[#6D5EF8] transition-colors">ROI Analytics</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">For Creators</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#6D5EF8] transition-colors">Find Paid Deals</button></li>
              <li><a href="#" className="hover:text-[#6D5EF8] transition-colors">Rate Calculator</a></li>
              <li><a href="#" className="hover:text-[#6D5EF8] transition-colors">Instant Payouts</a></li>
              <li><a href="#" className="hover:text-[#6D5EF8] transition-colors">Media Kit Generator</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase">Contact & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B7CFF]" />
                <span>support@socialloop.io</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B7CFF]" />
                <span>+1 (800) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8B7CFF]" />
                <span>San Francisco, CA 94105</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Escrow Protected
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} SocialLoop Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
