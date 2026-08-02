import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = 'No items found',
  description = 'There is currently no data to display in this view.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 sm:p-12 text-center glass-panel rounded-2xl border border-[#ECECF3] dark:border-[#26334D] space-y-4 max-w-md mx-auto my-6 shadow-sm ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] dark:text-[#8B7CFF] flex items-center justify-center mx-auto shadow-inner">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shadow-sm hover:scale-[1.02] transition-transform inline-flex items-center gap-2"
        >
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
