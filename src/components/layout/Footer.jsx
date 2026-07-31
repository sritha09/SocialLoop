import React from 'react';
import { Sparkles, Heart, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';

export const Footer = ({ setActiveView }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-bg p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Influence<span className="gradient-text">Connect</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The premier marketplace connecting local businesses, cafes, startups, and global brands with vetted content creators & micro-influencers for authentic campaigns.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-all">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">For Businesses</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-indigo-400 transition-colors">Post a Campaign</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-indigo-400 transition-colors">Browse Creators</button></li>
              <li><a href="#how-it-works" className="hover:text-indigo-400 transition-colors">Pricing & Escrow</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Enterprise Solutions</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">For Creators</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-rose-400 transition-colors">Find Opportunities</button></li>
              <li><button onClick={() => setActiveView('leaderboard')} className="hover:text-rose-400 transition-colors">Creator Leaderboard</button></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Earnings & Payouts</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Verification Badge</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Media Kit Generator</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Contact & Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@influenceconnect.io</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+1 (800) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
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
          <p>© {new Date().getFullYear()} InfluenceConnect Inc. All rights reserved.</p>
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
