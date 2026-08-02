import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Share2, Bookmark, ShieldCheck, MapPin, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const PostDetailModal = ({ post, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { likePost, commentPost, followUser, followingMap } = useData();

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveMediaIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, post]);

  if (!isOpen || !post) return null;

  const hasLiked = post.likedBy?.includes(currentUser?.id);
  const isFollowing = (followingMap[currentUser?.id] || []).includes(post.authorId);
  const mediaItems = post.images || [];

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;

    commentPost(post.id, {
      authorId: currentUser.id,
      authorName: currentUser.name,
      text: commentText,
      timestamp: 'Just now'
    });

    setCommentText('');
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[90vh] flex flex-col md:flex-row">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:text-rose-500 transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT MEDIA DISPLAY AREA */}
        <div className="w-full md:w-7/12 bg-black flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
          {mediaItems.length > 0 && (
            <div className="w-full h-full flex items-center justify-center">
              {post.mediaTypes?.[activeMediaIndex] === 'video' || mediaItems[activeMediaIndex]?.match(/\.(mp4|mov|webm)$/i) ? (
                <video 
                  src={mediaItems[activeMediaIndex]} 
                  controls 
                  autoPlay 
                  className="max-h-[500px] w-full object-contain" 
                />
              ) : (
                <img 
                  src={mediaItems[activeMediaIndex]} 
                  alt="Post media" 
                  className="max-h-[500px] w-full object-contain" 
                />
              )}
            </div>
          )}

          {/* CAROUSEL NAVIGATION ARROWS */}
          {mediaItems.length > 1 && (
            <>
              {activeMediaIndex > 0 && (
                <button
                  onClick={() => setActiveMediaIndex(prev => prev - 1)}
                  className="absolute left-3 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors z-20"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {activeMediaIndex < mediaItems.length - 1 && (
                <button
                  onClick={() => setActiveMediaIndex(prev => prev + 1)}
                  className="absolute right-3 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors z-20"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR (AUTHOR, CAPTION, COMMENTS) */}
        <div className="w-full md:w-5/12 flex flex-col justify-between bg-white dark:bg-[#161E2E] p-5 border-l border-[#ECECF3] dark:border-[#26334D]">
          
          <div className="space-y-4 overflow-y-auto max-h-[360px] pr-1">
            {/* AUTHOR HEADER */}
            <div className="flex items-center justify-between pb-3 border-b border-[#ECECF3] dark:border-[#26334D]">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.authorName} className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8]" />
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
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      : 'bg-[#6D5EF8]/10 text-[#6D5EF8] dark:text-[#8B7CFF]'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>

            {/* CAPTION & HASHTAGS */}
            <div className="space-y-2 text-xs">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{post.caption}</p>
              {post.hashtags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 font-semibold text-[#6D5EF8]">
                  {post.hashtags.map(t => <span key={t}>#{t}</span>)}
                </div>
              )}
            </div>

            {/* COMMENTS THREAD */}
            <div className="space-y-2 pt-2 border-t border-[#ECECF3] dark:border-[#26334D]">
              <h5 className="font-bold text-[11px] text-slate-400 uppercase tracking-wider">Comments ({post.comments?.length || 0})</h5>
              {post.comments?.length === 0 ? (
                <p className="text-[11px] text-slate-500 py-2 italic">Be the first to comment on this post.</p>
              ) : (
                post.comments?.map(c => (
                  <div key={c.id} className="text-xs p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-[#ECECF3] dark:border-[#26334D]">
                    <span className="font-bold text-slate-900 dark:text-white mr-1.5">{c.authorName}:</span>
                    <span className="text-slate-600 dark:text-slate-300">{c.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* BOTTOM ACTIONS BAR & ADD COMMENT INPUT */}
          <div className="pt-3 border-t border-[#ECECF3] dark:border-[#26334D] space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => likePost(post.id, currentUser?.id)}
                  className={`flex items-center gap-1.5 ${hasLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-500'}`}
                >
                  <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
                  <span>{post.likesCount || 0}</span>
                </button>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-[#6D5EF8]" />
                  <span>{post.commentsCount || 0}</span>
                </span>
              </div>
              <Bookmark className="w-4 h-4 hover:text-amber-500 cursor-pointer" />
            </div>

            <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Add a comment..."
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-1 focus:ring-[#6D5EF8]"
              />
              <button type="submit" className="p-2 rounded-xl bg-[#6D5EF8] text-white font-bold text-xs">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
