import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, PlusCircle, 
  MapPin, ShieldCheck, Sparkles, TrendingUp, UserPlus, Trash2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CreatePostModal } from './CreatePostModal';
import { PostDetailModal } from './PostDetailModal';
import { ShareModal } from '../common/ShareModal';

export const HomeFeed = ({ setActiveView, openApplyModal, onViewDetailClick, onChatClick, onViewProfile }) => {
  const { currentUser, users } = useAuth();
  const { posts, campaigns, likePost, commentPost, followUser, followingMap, deletePost } = useData();
  const { formatCurrency } = useCurrency();

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [shareTarget, setShareTarget] = useState(null);

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text?.trim() || !currentUser) return;

    commentPost(postId, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      text,
      timestamp: 'Just now'
    });

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const isFollowing = (targetId) => {
    return (followingMap[currentUser?.id] || []).includes(targetId);
  };

  const suggestedCreators = users.filter(u => u.id !== currentUser?.id && u.role === 'influencer').slice(0, 4);
  const trendingCampaigns = campaigns.filter(c => c.status === 'Active').slice(0, 4);

  const handleProfileClick = (targetId) => {
    if (onViewProfile) {
      onViewProfile(targetId);
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(postId);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* MAIN FEED LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* POSTS FEED (LEFT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CREATE POST PROMPT BOX */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm flex items-center gap-3">
            <img 
              src={currentUser?.avatar || currentUser?.logo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'} 
              alt={currentUser?.name || 'User'}
              onClick={() => handleProfileClick(currentUser?.id)}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#6D5EF8] shrink-0 cursor-pointer"
            />
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
            >
              What's on your mind, {currentUser?.name?.split(' ')[0] || 'Creator'}? Share updates, reels or photos...
            </button>
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="px-4 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Post</span>
            </button>
          </div>

          {/* POSTS LIST */}
          {posts.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#6D5EF8]/10 text-[#6D5EF8] mx-auto flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">No Social Posts Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Be the first to share an update, reel highlight, or collaboration pitch with the community!</p>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create First Post</span>
              </button>
            </div>
          ) : (
            posts.map(post => {
              const hasLiked = post.likedBy?.includes(currentUser?.id);

              return (
                <div 
                  key={post.id}
                  className="glass-card rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm overflow-hidden space-y-3"
                >
                  {/* POST HEADER */}
                  <div className="p-4 flex items-center justify-between border-b border-[#ECECF3] dark:border-[#26334D]">
                    <div className="flex items-center gap-3">
                      <img 
                        src={post.authorAvatar} 
                        alt={post.authorName} 
                        onClick={() => handleProfileClick(post.authorId)}
                        className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8] cursor-pointer hover:scale-105 transition-transform" 
                      />
                      <div>
                        <h4 
                          onClick={() => handleProfileClick(post.authorId)}
                          className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1 cursor-pointer hover:text-[#6D5EF8] transition-colors"
                        >
                          {post.authorName}
                          {post.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span onClick={() => handleProfileClick(post.authorId)} className="cursor-pointer hover:text-[#6D5EF8] transition-colors font-semibold">{post.authorUsername}</span>
                          {post.location && (
                            <>
                              <span>•</span>
                              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                              <span>{post.location}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentUser?.id === post.authorId ? (
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => followUser(currentUser?.id, post.authorId)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                            isFollowing(post.authorId)
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                              : 'bg-[#6D5EF8]/10 text-[#6D5EF8] dark:text-[#8B7CFF] hover:bg-[#6D5EF8] hover:text-white'
                          }`}
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>{isFollowing(post.authorId) ? 'Following' : 'Follow'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* POST IMAGES / VIDEO PREVIEW */}
                  {post.images?.length > 0 && (
                    <div 
                      onClick={() => setSelectedPostForDetail(post)}
                      className="relative max-h-96 overflow-hidden bg-black cursor-pointer group"
                    >
                      {post.mediaTypes?.[0] === 'video' || post.images[0]?.match(/\.(mp4|mov|webm)$/i) ? (
                        <video src={post.images[0]} className="w-full h-auto object-cover max-h-96" />
                      ) : (
                        <img 
                          src={post.images[0]} 
                          alt="Post" 
                          className="w-full h-auto object-cover max-h-96 group-hover:scale-105 transition-transform duration-300" 
                        />
                      )}
                      {post.images.length > 1 && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white font-bold text-xs backdrop-blur-md">
                          +{post.images.length - 1} photos
                        </span>
                      )}
                    </div>
                  )}

                  {/* POST CAPTION & HASHTAGS */}
                  <div 
                    onClick={() => setSelectedPostForDetail(post)}
                    className="px-4 space-y-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                      {post.caption}
                    </p>
                    {post.hashtags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold text-[#6D5EF8]">
                        {post.hashtags.map(tag => (
                          <span key={tag}>#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ACTION BAR (LIKE, COMMENT, SHARE) */}
                  <div className="px-4 py-3 border-t border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => likePost(post.id, currentUser?.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          hasLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                        <span>{post.likesCount || 0}</span>
                      </button>

                      <button 
                        onClick={() => setSelectedPostForDetail(post)}
                        className="flex items-center gap-1.5 hover:text-[#6D5EF8] transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-[#6D5EF8]" />
                        <span>{post.commentsCount || 0}</span>
                      </button>

                      <button 
                        onClick={() => setShareTarget({ item: post, type: 'post' })}
                        className="flex items-center gap-1.5 hover:text-[#6D5EF8] transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>

                  {/* COMMENTS LIST */}
                  {post.comments?.length > 0 && (
                    <div className="px-4 pb-3 space-y-2 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
                      {post.comments.slice(0, 2).map(c => (
                        <div key={c.id} className="flex items-start gap-2 pt-1">
                          <span 
                            onClick={() => handleProfileClick(c.authorId)}
                            className="font-bold text-slate-900 dark:text-white shrink-0 cursor-pointer hover:text-[#6D5EF8]"
                          >
                            {c.authorName}:
                          </span>
                          <span className="text-slate-600 dark:text-slate-300">{c.text}</span>
                        </div>
                      ))}
                      {post.comments.length > 2 && (
                        <button 
                          onClick={() => setSelectedPostForDetail(post)}
                          className="text-[11px] font-bold text-[#6D5EF8] hover:underline pt-1"
                        >
                          View all {post.comments.length} comments
                        </button>
                      )}
                    </div>
                  )}

                  {/* ADD COMMENT INPUT */}
                  <form 
                    onSubmit={(e) => handleCommentSubmit(post.id, e)}
                    className="px-4 py-2 border-t border-[#ECECF3] dark:border-[#26334D] flex items-center gap-2 text-xs"
                  >
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      value={commentInputs[post.id] || ''}
                      onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      className="w-full bg-transparent text-slate-900 dark:text-white outline-none py-1"
                    />
                    <button 
                      type="submit" 
                      disabled={!commentInputs[post.id]?.trim()}
                      className="text-[#6D5EF8] font-bold disabled:opacity-40 hover:underline"
                    >
                      Post
                    </button>
                  </form>
                </div>
              );
            })
          )}

        </div>

        {/* SIDEBAR DISCOVERY (RIGHT 5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* TRENDING CAMPAIGNS */}
          <div className="glass-panel p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECECF3] dark:border-[#26334D]">
              <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#6D5EF8]" />
                <span>Campaigns ({currentUser?.city || 'Worldwide'})</span>
              </h3>
              <button onClick={() => setActiveView('explore')} className="text-xs font-bold text-[#6D5EF8] hover:underline">
                View All
              </button>
            </div>

            {trendingCampaigns.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No active campaign listings published yet.</p>
            ) : (
              <div className="space-y-3">
                {trendingCampaigns.map(camp => (
                  <div 
                    key={camp.id}
                    onClick={() => onViewDetailClick(camp)}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-[#ECECF3] dark:border-[#26334D] hover:border-[#6D5EF8] cursor-pointer transition-all space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-white group-hover:text-[#6D5EF8] truncate max-w-[180px]">
                        {camp.title}
                      </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                        {formatCurrency(camp.budget)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{camp.city}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] font-semibold">
                        {camp.campaignType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECOMMENDED CREATORS */}
          <div className="glass-panel p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECECF3] dark:border-[#26334D]">
              <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Creators ({currentUser?.city || 'Nearby'})</span>
              </h3>
            </div>

            {suggestedCreators.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No other registered creators yet.</p>
            ) : (
              <div className="space-y-3">
                {suggestedCreators.map(creator => (
                  <div key={creator.id} className="flex items-center justify-between text-xs">
                    <div 
                      onClick={() => handleProfileClick(creator.id)}
                      className="flex items-center gap-2.5 truncate cursor-pointer group"
                    >
                      <img 
                        src={creator.avatar} 
                        alt={creator.name} 
                        className="w-9 h-9 rounded-full object-cover border border-[#6D5EF8] shrink-0" 
                      />
                      <div className="truncate">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-[#6D5EF8] transition-colors truncate">{creator.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{creator.username || creator.category}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => followUser(currentUser?.id, creator.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                        isFollowing(creator.id)
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          : 'bg-[#6D5EF8]/10 text-[#6D5EF8] hover:bg-[#6D5EF8] hover:text-white'
                      }`}
                    >
                      {isFollowing(creator.id) ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODALS */}
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
