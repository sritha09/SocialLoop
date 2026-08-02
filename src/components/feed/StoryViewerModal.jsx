import React, { useEffect } from 'react';
import { X, Eye, Heart, Send } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StoryViewerModal = ({ story, isOpen, onClose }) => {
  const { viewStory } = useData();

  useEffect(() => {
    if (isOpen && story) {
      viewStory(story.id);
    }
  }, [isOpen, story]);

  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-black flex flex-col justify-between border border-white/10">
        
        {/* TOP PROGRESS BAR & AUTHOR HEADER */}
        <div className="p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 space-y-3">
          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-[progress_5s_linear_forwards]"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={story.avatar} alt={story.authorName} className="w-8 h-8 rounded-full object-cover border border-white" />
              <div>
                <h4 className="font-bold text-xs text-white">{story.authorName}</h4>
                <p className="text-[10px] text-slate-300">Active 24h Story</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STORY MEDIA IMAGE */}
        <img 
          src={story.mediaUrl} 
          alt="Story Content" 
          className="absolute inset-0 w-full h-full object-cover z-10" 
        />

        {/* BOTTOM CAPTION & INTERACTIONS */}
        <div className="p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 space-y-3">
          {story.caption && (
            <p className="text-xs text-white leading-relaxed drop-shadow font-medium">
              {story.caption}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-white/80 pt-1">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">{story.viewsCount || 342} views</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
                <Heart className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
