import React, { useState } from 'react';
import { 
  ShieldCheck, Star, MapPin, Globe, Users, Award, MessageSquare, UserPlus, Grid, Handshake
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const UserProfileView = ({ userId, onChatClick }) => {
  const { currentUser, users } = useAuth();
  const { reviews, campaigns, posts, followUser, followingMap } = useData();

  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'collabs', 'reviews'

  const profileUser = users.find(u => u.id === userId) || currentUser;
  const isBusiness = profileUser?.role === 'business';

  const userReviews = reviews.filter(r => r.targetUserId === profileUser?.id);
  const userPosts = posts.filter(p => p.authorId === profileUser?.id);
  const userCampaigns = campaigns.filter(c => c.businessId === profileUser?.id);

  const isFollowing = (followingMap[currentUser?.id] || []).includes(profileUser.id);
  const followersCount = (profileUser.followersCount || 85000) + (isFollowing ? 1 : 0);
  const followingCount = isBusiness ? 48 : 420;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* MAIN PROFILE CARD WITH COVER & AVATAR */}
      <div className="glass-panel rounded-2xl border border-[#ECECF3] dark:border-[#26334D] overflow-hidden shadow-sm relative">
        
        {/* COVER BANNER */}
        <div className="h-48 sm:h-64 w-full relative bg-slate-900">
          <img 
            src={profileUser.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>

        <div className="p-6 sm:p-8 pt-0 relative z-10 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#ECECF3] dark:border-[#26334D]">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
              <img 
                src={profileUser.avatar || profileUser.logo} 
                alt={profileUser.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-lg shrink-0" 
              />
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {profileUser.name}
                  </h2>
                  {profileUser.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[#6D5EF8]">
                  {profileUser.username || profileUser.category} • {profileUser.city}, {profileUser.state}
                </p>

                {/* FOLLOWERS & FOLLOWING COUNTS */}
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs pt-1">
                  <span className="text-slate-900 dark:text-white font-bold">
                    {(followersCount / 1000).toFixed(0)}K <span className="font-normal text-slate-400">Followers</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {followingCount} <span className="font-normal text-slate-400">Following</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {userPosts.length} <span className="font-normal text-slate-400">Posts</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-center gap-3">
              {currentUser?.id !== profileUser.id && (
                <>
                  <button
                    onClick={() => followUser(currentUser?.id, profileUser.id)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow flex items-center gap-1.5 transition-all ${
                      isFollowing
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                        : 'gradient-button text-white'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{isFollowing ? 'Following' : 'Follow'}</span>
                  </button>

                  <button
                    onClick={() => onChatClick(profileUser.id)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:border-[#6D5EF8] border transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-[#6D5EF8]" />
                    <span>Message</span>
                  </button>
                </>
              )}
            </div>

          </div>

          <div className="py-6 space-y-4">
            <div>
              <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1.5">Bio & Vision</h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
                {profileUser.description || profileUser.bio || 'Professional collaborator on SocialLoop platform.'}
              </p>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {profileUser.instagram && (
                <a href={profileUser.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-rose-500 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              )}
              {profileUser.youtube && (
                <a href={profileUser.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-red-500 transition-colors">
                  <YoutubeIcon className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
              )}
              {profileUser.website && (
                <a href={profileUser.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold hover:text-[#6D5EF8] transition-colors">
                  <Globe className="w-4 h-4 text-[#6D5EF8]" />
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* TABBED SECTIONS (POSTS GRID, COLLABS, REVIEWS) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#ECECF3] dark:border-[#26334D] pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'posts'
                ? 'bg-[#6D5EF8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Posts ({userPosts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('collabs')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'collabs'
                ? 'bg-[#6D5EF8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>Collaborations</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
              activeTab === 'reviews'
                ? 'bg-[#6D5EF8] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#6D5EF8]'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Reviews ({userReviews.length})</span>
          </button>
        </div>

        {/* POSTS GRID */}
        {activeTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div className="p-8 text-center glass-panel rounded-2xl text-xs text-slate-500">
                No social posts created yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPosts.map(post => (
                  <div key={post.id} className="glass-card rounded-xl overflow-hidden border border-[#ECECF3] dark:border-[#26334D] space-y-2 p-3">
                    {post.images?.[0] && (
                      <img src={post.images[0]} alt="Post" className="w-full h-44 object-cover rounded-lg" />
                    )}
                    <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2">{post.caption}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* COLLABORATIONS TAB */}
        {activeTab === 'collabs' && (
          <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Active & Past Collaborations</h3>
            {userCampaigns.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active campaign listings published yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userCampaigns.map(camp => (
                  <div key={camp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] text-xs space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{camp.title}</h4>
                    <p className="text-slate-500">{camp.city} • Payout Offer: ${camp.budget}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="glass-panel p-6 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Verified Partner Reviews</h3>
            {userReviews.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No written reviews yet.</p>
            ) : (
              <div className="space-y-3">
                {userReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">{rev.authorName}</span>
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
        )}

      </div>

    </div>
  );
};
