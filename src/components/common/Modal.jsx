import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = prevBodyOverflow || '';
        document.documentElement.style.overflow = prevHtmlOverflow || '';
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
