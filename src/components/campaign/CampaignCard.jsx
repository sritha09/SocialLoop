import React from 'react';
import { MapPin, Calendar, DollarSign, Users, Bookmark, MessageSquare, Send, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';

export const CampaignCard = ({ campaign, onApplyClick, onChatClick, onViewDetailClick }) => {
  const { users, currentUser, isInfluencer } = useAuth();
  const { savedCampaigns, toggleSaveCampaign } = useData();
  const { formatCurrency } = useCurrency();

  const business = users.find(u => u.id === campaign.businessId) || {
    name: 'Featured Brand',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150',
    isVerified: true
  };

  const isSaved = savedCampaigns.includes(campaign.id);

  return (
    <div className="glass-panel rounded-3xl p-5 border border-purple-100 dark:border-purple-500/20 hover:border-purple-400 dark:hover:border-purple-400 shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
      
      <div>
        {/* HEADER: IMAGE & BADGES */}
        <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

          {/* TOP BADGES */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md backdrop-blur-md ${
              campaign.campaignType === 'Promotion' ? 'bg-purple-600/90' : 'bg-pink-600/90'
            }`}>
              {campaign.campaignType}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 text-slate-200 shadow-md backdrop-blur-md border border-white/10">
              {campaign.mode || 'Offline'}
            </span>
          </div>

          {/* WISHLIST SAVE BUTTON */}
          {isInfluencer && (
            <button
              onClick={(e) => { e.stopPropagation(); toggleSaveCampaign(campaign.id); }}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                isSaved 
                  ? 'bg-rose-500 text-white shadow-lg scale-110' 
                  : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900 hover:text-white'
              }`}
              title={isSaved ? 'Saved in Wishlist' : 'Save Campaign'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}

          {/* BUSINESS LOGO & PAYOUT OVERLAY */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <img 
                src={business.logo} 
                alt={business.name} 
                className="w-9 h-9 rounded-xl object-cover border-2 border-white/80 shadow" 
              />
              <div>
                <h5 className="font-bold text-xs flex items-center gap-1 text-white drop-shadow">
                  {business.name}
                  {business.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />}
                </h5>
                <p className="text-[10px] text-slate-300 drop-shadow">{campaign.businessCategory}</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-slate-300 block">Payout Offer</span>
              <span className="text-sm sm:text-base font-black text-emerald-400 drop-shadow">{formatCurrency(campaign.budget)}</span>
            </div>
          </div>
        </div>

        {/* CAMPAIGN CONTENT */}
        <div className="space-y-2 cursor-pointer" onClick={() => onViewDetailClick(campaign)}>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
            {campaign.title}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-purple-100 dark:border-purple-900/20">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
              <span className="truncate">{campaign.city}, {campaign.state}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span>{campaign.date}</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-3 border-t border-purple-100 dark:border-purple-900/20 mt-4 flex items-center gap-2">
        <button
          onClick={() => onViewDetailClick(campaign)}
          className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onChatClick(campaign.businessId)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-600 transition-all"
          title="Direct Chat"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        {isInfluencer && (
          <button
            onClick={() => onApplyClick(campaign)}
            className="flex-1 py-2 rounded-xl gradient-button font-bold text-xs shadow flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>
        )}
      </div>

    </div>
  );
};
