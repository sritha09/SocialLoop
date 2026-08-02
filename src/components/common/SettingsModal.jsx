import React from 'react';
import { X, Globe, Sun, Moon, DollarSign, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';

export const SettingsModal = ({ isOpen, onClose }) => {
  const { currentUser, isBusiness } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { currencyCode, setCurrencyCode, currencies } = useCurrency();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ECECF3] dark:border-[#26334D] my-auto max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Account Settings</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage your currency localization, theme mode, and preferences.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm">
          
          {/* CURRENCY LOCALIZATION SELECTOR */}
          <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-500" />
                <span>Local Currency System</span>
              </span>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">Auto-Detected</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every campaign price, quote, payout, and escrow deal will automatically format to your selected currency.
            </p>

            <select
              value={currencyCode}
              onChange={e => setCurrencyCode(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-bold outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.values(currencies).map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.label}
                </option>
              ))}
            </select>
          </div>

          {/* THEME PREFERENCE */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Theme Appearance</span>
              <span className="text-xs text-slate-500">{isDark ? 'Dreamy Futuristic Dark' : 'Premium Pastel Light'}</span>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow hover:bg-purple-700 transition-all flex items-center gap-1.5"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-white" />}
              <span>{isDark ? 'Light Pastel' : 'Dreamy Dark'}</span>
            </button>
          </div>

          {/* USER INFO PREVIEW */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Account Role</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 capitalize">{currentUser?.role}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Email</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentUser?.email}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl gradient-button font-bold text-sm shadow-lg"
          >
            Save & Close Settings
          </button>

        </div>

      </div>
    </div>
  );
};
