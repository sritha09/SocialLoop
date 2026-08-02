import React from 'react';
import { MapPin, Calendar, Bookmark, MessageSquare, Send, CheckCircle2, Sparkles, Tag, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';

export const CampaignCard = ({ campaign, onApplyClick, onChatClick, onViewDetailClick }) => {
  const { users, currentUser, isInfluencer } = useAuth();
  const { savedCampaigns, toggleSaveCampaign } = useData();
  const { formatCurrency } = useCurrency();

  const business = users.find(u => u.id === campaign.businessId) || {
    name: campaign.businessName || 'Featured Brand',
    logo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=150',
    isVerified: true
  };

  const isSaved = savedCampaigns.includes(campaign.id);
  const aiScore = campaign.aiMatchScore || 95;

  return (
    <div className="glass-card rounded-2xl p-5 border border-[#ECECF3] dark:border-[#26334D] shadow-sm hover:shadow-card transition-all duration-200 flex flex-col justify-between group h-full">
      
      <div>
        {/* TOP IMAGE & OVERLAY BADGES */}
        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
          <img 
            src={campaign.image} 
            alt={campaign.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

          {/* AI MATCH SCORE PILL */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#6D5EF8] text-white text-[11px] font-bold shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>{aiScore}% AI Match</span>
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleSaveCampaign(campaign.id); }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-rose-500 text-white shadow' 
                : 'bg-slate-950/50 text-white hover:bg-slate-900'
            }`}
            title={isSaved ? 'Saved' : 'Save Campaign'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* BUSINESS LOGO & OVERLAY */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <img 
                src={business.logo} 
                alt={business.name} 
                className="w-8 h-8 rounded-lg object-cover border border-white/80 shadow" 
              />
              <div className="truncate">
                <h5 className="font-bold text-xs flex items-center gap-1 text-white truncate drop-shadow-sm">
                  {business.name}
                  {business.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" />}
                </h5>
                <p className="text-[10px] text-slate-200">{campaign.businessCategory}</p>
              </div>
            </div>
            
            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-300 block">Budget</span>
              <span className="text-sm font-black text-emerald-400 drop-shadow-sm">{formatCurrency(campaign.budget)}</span>
            </div>
          </div>
        </div>

        {/* CAMPAIGN CONTENT */}
        <div className="space-y-2 cursor-pointer" onClick={() => onViewDetailClick(campaign)}>
          <div className="flex items-center justify-between gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] text-[10px] font-bold border border-indigo-100 dark:border-indigo-900/50">
              {campaign.campaignType || 'Promotion'}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {campaign.date || '7 days left'}
            </span>
          </div>

          <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug group-hover:text-[#6D5EF8] transition-colors line-clamp-2 pt-1">
            {campaign.title}
          </h4>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {campaign.description}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-[#ECECF3] dark:border-[#26334D]">
            <div className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{campaign.city}, {campaign.state}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[11px]">
              <Tag className="w-3 h-3 text-[#6D5EF8]" />
              <span>{campaign.mode || 'Offline'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-3 border-t border-[#ECECF3] dark:border-[#26334D] mt-4 flex items-center gap-2">
        <button
          onClick={() => onViewDetailClick(campaign)}
          className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all text-center"
        >
          View Details
        </button>

        <button
          onClick={() => onChatClick(campaign.businessId)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#6D5EF8] transition-all"
          title="Direct Chat"
        >
          <MessageSquare className="w-4 h-4" />
        </button>

        <button
          onClick={() => onApplyClick(campaign)}
          className="flex-1 py-2 rounded-xl gradient-button font-bold text-xs shadow flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Apply</span>
        </button>
      </div>

    </div>
  );
};
