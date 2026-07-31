import React from 'react';
import { X, MapPin, Calendar, Clock, DollarSign, Users, CheckCircle2, MessageSquare, Send, Globe, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';

export const CampaignDetailModal = ({ campaign, isOpen, onClose, onApplyClick, onChatClick }) => {
  const { users, isInfluencer } = useAuth();

  if (!isOpen || !campaign) return null;

  const business = users.find(u => u.id === campaign.businessId) || {
    name: 'Artisan Roast Cafe',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300',
    description: 'Specialty coffee house and bakery.',
    instagram: 'https://instagram.com/artisanroast',
    website: 'https://artisanroast.com',
    location: 'San Francisco, CA',
    isVerified: true
  };

  const handleChatClick = (businessId) => {
    onClose(); // Automatically close modal first!
    onChatClick(businessId); // Then navigate directly to Chat interface
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 my-8 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 hover:text-rose-500 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow">
                {campaign.campaignType} • {campaign.mode || 'Offline'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md">{campaign.title}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Payout Offer</span>
              <span className="text-2xl font-black text-emerald-400 drop-shadow">${campaign.budget}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-slate-800 dark:text-slate-200">
          
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img 
                src={business.logo} 
                alt={business.name} 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-500" 
              />
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                  {business.name}
                  {business.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{business.category || campaign.businessCategory} • {campaign.city}, {campaign.state}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleChatClick(business.id)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold hover:bg-amber-500 hover:text-white transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Business</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 block mb-1">Event Date</span>
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                {campaign.date}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 block mb-1">Min Followers</span>
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                {(campaign.minFollowers / 1000).toFixed(0)}K+
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 block mb-1">Platforms</span>
              <span className="font-extrabold text-indigo-600 dark:text-indigo-400 truncate block">
                {campaign.platforms?.join(', ') || 'Instagram'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-white/5">
              <span className="text-slate-400 block mb-1">Deadline</span>
              <span className="font-extrabold text-rose-500 block">
                {campaign.deadline}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Campaign Details & Deliverables</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl border border-slate-200/50 dark:border-white/5">
              {campaign.description}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Venue & Location</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {campaign.venue || business.location || `${campaign.city}, ${campaign.state}`}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center gap-3">
            {isInfluencer ? (
              <button
                onClick={() => { onClose(); onApplyClick(campaign); }}
                className="w-full py-4 rounded-2xl gradient-bg text-white font-black text-base shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                <span>Apply for Campaign (${campaign.budget})</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              >
                Close Preview
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
