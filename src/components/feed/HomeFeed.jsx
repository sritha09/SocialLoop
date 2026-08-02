import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Bookmark, PlusCircle, 
  MapPin, CheckCircle2, ShieldCheck, Sparkles, TrendingUp, Compass, UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CreatePostModal } from './CreatePostModal';
import { PostDetailModal } from './PostDetailModal';

export const HomeFeed = ({ setActiveView, openApplyModal, onViewDetailClick, onChatClick }) => {
  const { currentUser, users } = useAuth();
  const { posts, campaigns, likePost, commentPost, followUser, followingMap } = useData();
  const { formatCurrency } = useCurrency();

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [selectedPostForDetail, setSelectedPostForDetail] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

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

  const userCity = (currentUser?.city || 'Hyderabad').toLowerCase();
  const userCountry = (currentUser?.country || 'India').toLowerCase();

  const isLocationMatch = (item) => {
    const itemCity = (item.city || '').toLowerCase();
    const itemCountry = (item.country || '').toLowerCase();
    return itemCity === userCity || itemCountry === userCountry;
  };

  const suggestedCreators = [...users]
    .filter(u => u.role === 'influencer' && u.id !== currentUser?.id)
    .sort((a, b) => (isLocationMatch(b) ? 1 : 0) - (isLocationMatch(a) ? 1 : 0))
    .slice(0, 4);

  const suggestedBusinesses = [...users]
    .filter(u => u.role === 'business' && u.id !== currentUser?.id)
    .sort((a, b) => (isLocationMatch(b) ? 1 : 0) - (isLocationMatch(a) ? 1 : 0))
    .slice(0, 4);

  const trendingCampaigns = [...campaigns]
    .sort((a, b) => (isLocationMatch(b) ? 1 : 0) - (isLocationMatch(a) ? 1 : 0))
    .slice(0, 4);

  const isFollowing = (targetId) => {
    const list = followingMap[currentUser?.id] || [];
    return list.includes(targetId);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FEED (LEFT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CREATE POST PROMPT */}
          <div className="glass-panel p-4 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm flex items-center gap-3">
            <img 
              src={currentUser?.avatar || currentUser?.logo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.name || 'User'} 
              className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8]" 
            />
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 text-xs text-left hover:border-[#6D5EF8] border border-transparent transition-all font-medium"
            >
              Share an update, showcase a campaign, or upload photos/videos...
            </button>
            <button
              onClick={() => setIsCreatePostOpen(true)}
              className="p-2.5 rounded-xl bg-[#6D5EF8] text-white text-xs font-bold shrink-0 hover:bg-[#5847E0] transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>

          {/* SOCIAL POSTS THREAD OR EMPTY FEED STATE */}
          {posts.length === 0 ? (
            <div className="p-12 text-center glass-panel rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] mx-auto flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white">No posts yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Follow creators or businesses in {currentUser?.city || 'your location'} to see their latest updates, or share your first post!
                </p>
              </div>
              <button
                onClick={() => setIsCreatePostOpen(true)}
                className="px-5 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shadow inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create First Post</span>
              </button>
            </div>
          ) : (
            posts.map((post) => {
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
                        className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8]" 
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1">
                          {post.authorName}
                          {post.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                        </h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span>{post.authorUsername}</span>
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

                    {currentUser?.id !== post.authorId && (
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
                          alt="Post content" 
                          className="w-full h-auto object-cover max-h-96 group-hover:scale-[1.01] transition-transform" 
                        />
                      )}
                      {post.images.length > 1 && (
                        <span className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white font-bold text-[10px]">
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

                  {/* ACTION BAR (LIKE, COMMENT, SHARE, BOOKMARK) */}
                  <div className="px-4 py-3 border-t border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-4">
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

                      <button className="flex items-center gap-1.5 hover:text-[#6D5EF8] transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>{post.sharesCount || 0}</span>
                      </button>
                    </div>

                    <button className="hover:text-amber-500 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* COMMENTS LIST */}
                  {post.comments?.length > 0 && (
                    <div className="px-4 pb-3 space-y-2 bg-slate-50/50 dark:bg-slate-900/30 text-xs">
                      {post.comments.slice(0, 2).map(c => (
                        <div key={c.id} className="flex items-start gap-2 pt-1">
                          <span className="font-bold text-slate-900 dark:text-white shrink-0">{c.authorName}:</span>
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
                      className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white text-xs"
                    />
                    <button type="submit" className="font-bold text-[#6D5EF8] hover:underline">Post</button>
                  </form>

                </div>
              );
            })
          )}

        </div>

        {/* SIDEBAR SUGGESTIONS (RIGHT 5 COLUMNS) - LOCATION BASED */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* TRENDING CAMPAIGN DISCOVERY */}
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

          {/* RECOMMENDED CREATORS (LOCATION BASED) */}
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
                    <div className="flex items-center gap-2.5 truncate">
                      <img src={creator.avatar} alt={creator.name} className="w-9 h-9 rounded-full object-cover border border-[#6D5EF8]" />
                      <div className="truncate">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{creator.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{creator.city || creator.category}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onChatClick(creator.id)}
                      className="px-3 py-1 rounded-xl bg-[#6D5EF8]/10 text-[#6D5EF8] dark:text-[#8B7CFF] font-bold text-xs hover:bg-[#6D5EF8] hover:text-white transition-all shrink-0"
                    >
                      Chat
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECOMMENDED BUSINESSES (LOCATION BASED) */}
          <div className="glass-panel p-5 rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ECECF3] dark:border-[#26334D]">
              <h3 className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#6D5EF8]" />
                <span>Brands ({currentUser?.city || 'Nearby'})</span>
              </h3>
            </div>

            {suggestedBusinesses.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">No other registered brands yet.</p>
            ) : (
              <div className="space-y-3">
                {suggestedBusinesses.map(biz => (
                  <div key={biz.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 truncate">
                      <img src={biz.logo} alt={biz.name} className="w-9 h-9 rounded-xl object-cover border border-[#6D5EF8]" />
                      <div className="truncate">
                        <h4 className="font-bold text-slate-900 dark:text-white truncate">{biz.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{biz.city}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => onChatClick(biz.id)}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:border-[#6D5EF8] border transition-all shrink-0"
                    >
                      Contact
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODALS */}
      <CreatePostModal 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />

      <PostDetailModal
        post={selectedPostForDetail}
        isOpen={!!selectedPostForDetail}
        onClose={() => setSelectedPostForDetail(null)}
      />

    </div>
  );
};
