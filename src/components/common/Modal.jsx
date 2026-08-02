import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-lg' }) => {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // 1. Record exact scrollY position before opening
      const currentScrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollYRef.current = currentScrollY;
      
      // 2. Capture element that had focus prior to opening modal
      const previouslyFocusedElement = document.activeElement;

      // 3. Store original body inline styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // 4. Compute scrollbar width compensation
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // 5. Lock scroll exclusively on body
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        // 6. Restore original body inline styles
        document.body.style.overflow = originalOverflow || '';
        document.body.style.paddingRight = originalPaddingRight || '';

        // 7. Safely restore focus without triggering browser auto-scroll
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
          try {
            previouslyFocusedElement.focus({ preventScroll: true });
          } catch (e) {
            // Ignore focus errors if element unmounted
          }
        }

        // 8. Defer scroll position restoration to next frame after layout reflow
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollYRef.current,
            left: 0,
            behavior: 'instant'
          });
        });
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      onClick={onClose}
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn select-none"
    >
      <div 
        onClick={e => e.stopPropagation()}
        className={`relative w-full ${maxWidth} glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] max-h-[85vh] overflow-y-auto my-auto cursor-default`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
