import React from 'react';
import { 
  ShieldCheck, Star, MapPin, Globe, Users, TrendingUp, Award, CheckCircle2, MessageSquare, Briefcase, Camera 
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const UserProfileView = ({ userId, onChatClick }) => {
  const { currentUser, users } = useAuth();
  const { reviews, campaigns } = useData();

  const profileUser = users.find(u => u.id === userId) || currentUser;
  const isBusiness = profileUser?.role === 'business';

  const userReviews = reviews.filter(r => r.targetUserId === profileUser?.id);
  const userCampaigns = campaigns.filter(c => c.businessId === profileUser?.id);

  return (
    <div className="space-y-8">
      
      <div className="glass-panel rounded-3xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-2xl relative">
        <div className="h-64 sm:h-72 w-full relative">
          <img 
            src={profileUser.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'} 
            alt="Cover" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>
        </div>

        <div className="p-6 sm:p-8 pt-0 relative z-10 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-white/10">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <img 
                src={profileUser.avatar || profileUser.logo} 
                alt={profileUser.name} 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-white dark:border-slate-900 shadow-2xl shrink-0" 
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {profileUser.name}
                  </h2>
                  {profileUser.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-indigo-500">
                  {profileUser.username || profileUser.category} • {profileUser.city}, {profileUser.state}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 font-bold text-xs">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-slate-900 dark:text-white">{profileUser.rating || 4.9}</span>
                  <span className="text-slate-400">({profileUser.reviewsCount || userReviews.length} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {currentUser?.id !== profileUser.id && (
                <button
                  onClick={() => onChatClick(profileUser.id)}
                  className="px-6 py-3 rounded-2xl gradient-bg text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message</span>
                </button>
              )}
            </div>

          </div>

          <div className="py-6 space-y-6">
            <div>
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">About & Vision</h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                {profileUser.description || profileUser.bio || 'Professional collaborator on InfluenceConnect platform.'}
              </p>
            </div>

            {!isBusiness && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                  <span className="text-xs text-slate-400 font-bold block">Followers Count</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    {((profileUser.followersCount || 85000) / 1000).toFixed(0)}K
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center">
                  <span className="text-xs text-slate-400 font-bold block">Engagement Rate</span>
                  <span className="text-2xl font-black text-emerald-500 mt-1 block">
                    {profileUser.engagementRate || 5.4}%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 text-center col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 font-bold block">Avg Post Reach</span>
                  <span className="text-2xl font-black text-indigo-500 mt-1 block">
                    {((profileUser.avgReach || 32000) / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {profileUser.instagram && (
                <a href={profileUser.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-rose-500 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {profileUser.youtube && (
                <a href={profileUser.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-red-500 transition-colors">
                  <YoutubeIcon className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
              {profileUser.website && (
                <a href={profileUser.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-indigo-500 transition-colors">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

      {profileUser.portfolio && profileUser.portfolio.length > 0 && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Content Portfolio Showcase</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profileUser.portfolio.map((img, idx) => (
              <img key={idx} src={img} alt="Portfolio" className="w-full h-48 rounded-2xl object-cover hover:scale-105 transition-transform border border-slate-200/60 dark:border-white/10" />
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 space-y-6">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Verified Partner Reviews</h3>
        
        {userReviews.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">No written reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {userReviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{rev.authorName}</span>
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
                <span className="text-[10px] text-slate-400 block text-right">{rev.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
