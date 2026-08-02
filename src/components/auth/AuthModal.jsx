import React, { useState } from 'react';
import { X, Sparkles, Briefcase, Camera, LogIn, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BusinessSignupForm } from './BusinessSignupForm';
import { InfluencerSignupForm } from './InfluencerSignupForm';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login', initialRole = 'business' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [role, setRole] = useState(initialRole); // 'business' or 'influencer'
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login, switchDemoUser } = useAuth();

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const res = login(loginEmail, loginPassword);
    if (res.success) {
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleDemoLogin = (userId) => {
    switchDemoUser(userId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-300 hover:text-rose-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HEADER */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-bg mx-auto flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'login' ? 'Welcome Back to SocialLoop' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'login' ? 'Enter your credentials or try instant demo login below' : 'Select your role to view tailored signup form'}
          </p>
        </div>

        {/* MODE TOGGLE (LOGIN / SIGNUP) */}
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl mb-6 border border-slate-200 dark:border-white/10">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              mode === 'login'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              mode === 'signup'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <div className="space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="elena@artisanroast.com" 
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl shadow-indigo-500/30 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In To Account</span>
              </button>
            </form>

            {/* QUICK 1-CLICK DEMO LOGIN BUTTONS */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10">
              <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                ⚡ Instant 1-Click Demo Accounts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleDemoLogin('b1')}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-indigo-500 transition-all text-left group"
                >
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=100" alt="Artisan" className="w-9 h-9 rounded-xl object-cover" />
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-500">Artisan Roast Cafe</p>
                    <p className="text-[11px] text-slate-500">Business Owner Role</p>
                  </div>
                </button>

                <button
                  onClick={() => handleDemoLogin('i1')}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-rose-500 transition-all text-left group"
                >
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Maya" className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-500">Maya Lin (@mayacreates)</p>
                    <p className="text-[11px] text-slate-500">Influencer Role</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SIGNUP FORM */}
        {mode === 'signup' && (
          <div className="space-y-6">
            
            {/* ROLE SELECTION QUESTION "WHO ARE YOU?" */}
            <div className="space-y-2">
              <label className="block text-center font-extrabold text-sm text-slate-800 dark:text-slate-200">
                "Who are you?"
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('business')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                    role === 'business'
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold shadow-md'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                  }`}
                >
                  <Briefcase className="w-6 h-6" />
                  <span className="text-xs sm:text-sm">Business Owner</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('influencer')}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-2 ${
                    role === 'influencer'
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold shadow-md'
                      : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-rose-300'
                  }`}
                >
                  <Camera className="w-6 h-6" />
                  <span className="text-xs sm:text-sm">Influencer / Creator</span>
                </button>
              </div>
            </div>

            {/* TAILORED FORM BASED ON ROLE */}
            {role === 'business' ? (
              <BusinessSignupForm onSuccess={onClose} onClose={onClose} />
            ) : (
              <InfluencerSignupForm onSuccess={onClose} onClose={onClose} />
            )}

          </div>
        )}

      </div>
    </div>
  );
};
