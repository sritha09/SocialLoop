import React from 'react';

/**
 * SocialLoop Logo Component
 * Modern, flat, startup logo representing Creators, Businesses, Connection & Growth.
 * Colors: Deep Violet (#6D5EF8), Soft Lavender (#8B7CFF / #C4B5FD), Midnight Blue (#0F172A), White (#FFFFFF)
 */
export const SocialLoopLogoIcon = ({ className = "w-9 h-9" }) => (
  <svg 
    className={className} 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background rounded app icon tile */}
    <rect width="48" height="48" rx="14" fill="#6D5EF8" />
    
    {/* Interlocking geometric loop nodes */}
    <path 
      d="M16 20C16 16.6863 18.6863 14 22 14H24C27.3137 14 30 16.6863 30 20C30 23.3137 27.3137 26 24 26H22C18.6863 26 16 28.6863 16 32C16 35.3137 18.6863 38 22 38H26C29.3137 38 32 35.3137 32 32" 
      stroke="white" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Node accents */}
    <circle cx="16" cy="20" r="2.5" fill="#C4B5FD" />
    <circle cx="32" cy="32" r="2.5" fill="#C4B5FD" />
  </svg>
);

export const SocialLoopLogo = ({ 
  showText = true, 
  iconSize = "w-9 h-9", 
  textClassName = "text-xl",
  className = "flex items-center gap-3 cursor-pointer group" 
}) => {
  return (
    <div className={className}>
      <SocialLoopLogoIcon className={`${iconSize} group-hover:scale-105 transition-transform duration-200 shrink-0`} />
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-slate-900 dark:text-white ${textClassName} leading-none flex items-center gap-0.5`}>
            Social<span className="text-[#6D5EF8]">Loop</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 dark:text-slate-400 uppercase mt-0.5">
            Creators • Brands
          </span>
        </div>
      )}
    </div>
  );
};

export default SocialLoopLogo;
