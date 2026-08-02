import React, { useState } from 'react';
import { 
  UserPlus, UserCheck, MessageSquare, ShieldCheck, 
  MapPin, Globe, Grid, Handshake, Star, PlusCircle, Trash2, Share2 
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon, TwitterIcon, LinkedinIcon } from '../common/Icons';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { EditProfileModal } from './EditProfileModal';
import { CreatePostModal } from '../feed/CreatePostModal';
import { PostDetailModal } from '../feed/PostDetailModal';
import { ShareModal } from '../common/ShareModal';

export const UserProfileView = ({ userId, onOpenChat, onViewProfile }) => {
  const { currentUser, users } = useAuth();
  const { posts, reviews, followingMap, followUser, deals, deletePost } = useData();

  const [activeTab, setActiveTab] = useState('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState(null);
  const [shareTarget, setShareTarget] = useState(null);

  const profileUser = users.find(u => u.id === userId) || currentUser;

  if (!profileUser) return null;

  const isOwnProfile = currentUser?.id === profileUser.id;
  const isFollowing = (followingMap[currentUser?.id] || []).includes(profileUser.id);

  const userPosts = posts.filter(p => p.authorId === profileUser.id);
  const userReviews = reviews.filter(r => r.targetId === profileUser.id);
  const userFollowingList = followingMap[profileUser.id] || [];

  const followersCount = (profileUser.followersCount || 0) + (isFollowing ? 1 : 0);
  const followingCount = userFollowingList.length;

  const formatStatNumber = (num) => {
    if (!num || num === 0) return '0';
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  };

  const handleFollowClick = () => {
    if (currentUser) {
      followUser(currentUser.id, profileUser.id);
    }
  };

  const handleDeletePostClick = (e, postId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

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
                  {profileUser.username || `@${profileUser.name.toLowerCase().replace(/\s+/g, '')}`} • {profileUser.city || 'Hyderabad'}, {profileUser.state || 'Telangana'}
                </p>

                {/* FOLLOWERS & FOLLOWING COUNTS (CLEAN INTEGER FORMATTING, NO 0K) */}
                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs pt-1">
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formatStatNumber(followersCount)} <span className="font-normal text-slate-400">Followers</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formatStatNumber(followingCount)} <span className="font-normal text-slate-400">Following</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {formatStatNumber(userPosts.length)} <span className="font-normal text-slate-400">Posts</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-center sm:justify-end gap-3">
              {isOwnProfile ? (
                <>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-[#6D5EF8] hover:text-white transition-colors"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="px-4 py-2 rounded-xl gradient-button text-white font-bold text-xs shadow flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Post</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleFollowClick}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all flex items-center gap-1.5 ${
                      isFollowing 
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200' 
                        : 'gradient-button text-white'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4 text-emerald-500" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onOpenChat(profileUser.id)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-[#6D5EF8] hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* BIO & SOCIAL LINKS */}
          <div className="pt-6 space-y-4">
            {profileUser.bio && (
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
                {profileUser.bio}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {profileUser.instagram && (
                <a href={profileUser.instagram.startsWith('http') ? profileUser.instagram : `https://instagram.com/${profileUser.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                  <InstagramIcon className="w-4 h-4 text-rose-500" />
                  <span>{profileUser.instagram}</span>
                </a>
              )}
              {profileUser.website && (
                <a href={profileUser.website.startsWith('http') ? profileUser.website : `https://${profileUser.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#6D5EF8] transition-colors">
                  <Globe className="w-4 h-4 text-[#6D5EF8]" />
                  <span>{profileUser.website}</span>
                </a>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* NAVIGATION TABS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[#ECECF3] dark:border-[#26334D] pb-3 text-xs font-bold">
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

        {/* POSTS GRID WITH DELETE OPTION FOR AUTHOR */}
        {activeTab === 'posts' && (
          <div>
            {userPosts.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl space-y-3">
                <p className="text-xs text-slate-500">No social posts created yet.</p>
                {isOwnProfile && (
                  <button
                    onClick={() => setIsCreatePostOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs inline-flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Create Your First Post</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userPosts.map(post => (
                  <div 
                    key={post.id} 
                    onClick={() => setSelectedPostForDetail(post)}
                    className="glass-card rounded-xl overflow-hidden border border-[#ECECF3] dark:border-[#26334D] space-y-2 p-3 cursor-pointer hover:border-[#6D5EF8] transition-all group relative"
                  >
                    {isOwnProfile && (
                      <button
                        type="button"
                        onClick={(e) => handleDeletePostClick(e, post.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 text-white hover:bg-rose-600 transition-colors z-20"
                        title="Delete Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {post.images?.[0] && (
                      <div className="relative max-h-44 overflow-hidden rounded-lg bg-black">
                        {post.mediaTypes?.[0] === 'video' || post.images[0]?.match(/\.(mp4|mov|webm)$/i) ? (
                          <video src={post.images[0]} className="w-full h-44 object-cover" />
                        ) : (
                          <img src={post.images[0]} alt="Post" className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
                        )}
                      </div>
                    )}
                    <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2 font-medium">{post.caption}</p>
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
            <p className="text-xs text-slate-500">Verified platform brand deals and creator promotion history.</p>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {userReviews.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center glass-panel rounded-2xl">No public reviews yet.</p>
            ) : (
              userReviews.map(r => (
                <div key={r.id} className="glass-panel p-4 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">{r.authorName}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {r.rating}.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{r.comment}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* MODALS */}
      {isEditModalOpen && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}

      {isCreatePostOpen && (
        <CreatePostModal 
          isOpen={isCreatePostOpen} 
          onClose={() => setIsCreatePostOpen(false)} 
        />
      )}

      {selectedPostForDetail && (
        <PostDetailModal 
          post={selectedPostForDetail} 
          isOpen={!!selectedPostForDetail} 
          onClose={() => setSelectedPostForDetail(null)}
          onViewProfile={onViewProfile}
        />
      )}

      {shareTarget && (
        <ShareModal 
          item={shareTarget.item} 
          type={shareTarget.type} 
          isOpen={!!shareTarget} 
          onClose={() => setShareTarget(null)} 
        />
      )}

    </div>
  );
};
