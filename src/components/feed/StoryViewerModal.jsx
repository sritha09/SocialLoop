import React, { useEffect } from 'react';
import { X, Eye, Heart, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const StoryViewerModal = ({ stories = [], story = null, activeIndex = 0, isOpen, onClose, onIndexChange }) => {
  const { viewStory } = useData();

  // Handle both stories array or single story object
  const storyList = stories.length > 0 ? stories : story ? [story] : [];
  const currentIndex = Math.min(activeIndex, Math.max(0, storyList.length - 1));
  const currentStory = storyList[currentIndex];

  useEffect(() => {
    if (isOpen && currentStory) {
      viewStory(currentStory.id);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, currentStory]);

  if (!isOpen || !currentStory) return null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (currentIndex > 0 && onIndexChange) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (currentIndex < storyList.length - 1 && onIndexChange) {
      onIndexChange(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const isVideo = currentStory.mediaType === 'video' || currentStory.mediaUrl?.match(/\.(mp4|mov|webm)$/i);

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md overflow-hidden animate-fadeIn select-none">
      <div className="relative w-full max-w-sm h-[85vh] max-h-[700px] my-auto rounded-3xl overflow-hidden shadow-2xl bg-black flex flex-col justify-between border border-white/10 group">
        
        {/* TOP PROGRESS BARS & AUTHOR HEADER */}
        <div className="p-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-20 space-y-3">
          {/* PROGRESS BARS FOR ALL STORIES */}
          <div className="flex gap-1.5 w-full">
            {storyList.map((s, idx) => (
              <div key={s.id || idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div className={`h-full bg-white transition-all ${
                  idx < currentIndex ? 'w-full' : idx === currentIndex ? 'w-full animate-[progress_5s_linear_forwards]' : 'w-0'
                }`}></div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={currentStory.avatar} alt={currentStory.authorName} className="w-8 h-8 rounded-full object-cover border border-white" />
              <div>
                <h4 className="font-bold text-xs text-white">{currentStory.authorName}</h4>
                <p className="text-[10px] text-slate-300">Active 24h Story</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-black/50 text-white hover:bg-rose-500 transition-colors z-30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MEDIA DISPLAY (IMAGE OR VIDEO) */}
        {isVideo ? (
          <video 
            src={currentStory.mediaUrl} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        ) : (
          <img 
            src={currentStory.mediaUrl} 
            alt="Story Content" 
            className="absolute inset-0 w-full h-full object-cover z-10" 
          />
        )}

        {/* TAP / CLICK ZONES FOR PREVIOUS AND NEXT */}
        <div 
          onClick={handlePrev}
          className="absolute left-0 top-1/4 bottom-1/4 w-1/3 z-20 cursor-pointer flex items-center justify-start pl-2"
        >
          {currentIndex > 0 && (
            <button className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors hidden group-hover:flex">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
        </div>

        <div 
          onClick={handleNext}
          className="absolute right-0 top-1/4 bottom-1/4 w-1/3 z-20 cursor-pointer flex items-center justify-end pr-2"
        >
          <button className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors hidden group-hover:flex">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* BOTTOM CAPTION & INTERACTIONS */}
        <div className="p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 space-y-3">
          {currentStory.caption && (
            <p className="text-xs text-white leading-relaxed drop-shadow font-medium">
              {currentStory.caption}
            </p>
          )}

          <div className="flex items-center justify-between text-xs text-white/80 pt-1">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">{currentStory.viewsCount || 1} views</span>
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
