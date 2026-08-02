import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle2, MessageSquare, Send, Globe, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Modal } from '../common/Modal';

export const CampaignDetailModal = ({ campaign, isOpen, onClose, onApplyClick, onChatClick }) => {
  const { users, isInfluencer } = useAuth();
  const { formatCurrency } = useCurrency();

  if (!campaign) return null;

  const business = users.find(u => u.id === campaign.businessId) || {
    name: campaign.businessCategory || 'Partner Brand',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=300',
    description: 'Verified platform advertiser.',
    location: campaign.city || 'Hyderabad',
    isVerified: true
  };

  const handleChatClick = (businessId) => {
    onClose();
    onChatClick(businessId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-3xl">
        <div className="relative h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden rounded-t-3xl">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 text-white flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#6D5EF8] text-white text-xs font-bold uppercase tracking-wider mb-2 inline-block shadow">
                {campaign.campaignType} • {campaign.mode || 'Offline'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black drop-shadow-md">{campaign.title}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-300 block">Payout Offer</span>
              <span className="text-2xl font-black text-emerald-400 drop-shadow">{formatCurrency(campaign.budget)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-slate-800 dark:text-slate-200">
          
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <img 
                src={business.logo} 
                alt={business.name} 
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#6D5EF8]" 
              />
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-1.5">
                  {business.name}
                  {business.isVerified && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                </h4>
                <p className="text-xs text-slate-500">{business.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChatClick(campaign.businessId)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-[#6D5EF8] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Brand</span>
              </button>

              {isInfluencer && (
                <button
                  type="button"
                  onClick={() => { onClose(); onApplyClick(campaign); }}
                  className="px-5 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
              <span className="text-slate-400 block mb-0.5 font-medium">Payout</span>
              <span className="font-extrabold text-emerald-500 text-sm">{formatCurrency(campaign.budget)}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
              <span className="text-slate-400 block mb-0.5 font-medium">Category</span>
              <span className="font-extrabold text-slate-900 dark:text-white">{campaign.businessCategory}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
              <span className="text-slate-400 block mb-0.5 font-medium">Location</span>
              <span className="font-extrabold text-slate-900 dark:text-white truncate block">{campaign.city}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
              <span className="text-slate-400 block mb-0.5 font-medium">Deadline</span>
              <span className="font-extrabold text-indigo-500">{campaign.deadline}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Campaign Details & Expectations</h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {campaign.description}
            </p>
          </div>

        </div>
    </Modal>
  );
};
