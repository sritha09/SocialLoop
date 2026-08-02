import React, { useState } from 'react';
import { Sparkles, Briefcase, Camera, LogIn, UserCheck, PlusCircle, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BusinessSignupForm } from './BusinessSignupForm';
import { InfluencerSignupForm } from './InfluencerSignupForm';

import { Modal } from '../common/Modal';

export const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login', initialRole = 'business' }) => {
  const [mode, setMode] = useState(initialMode); // 'login', 'signup', or 'account_selection'
  const [role, setRole] = useState(initialRole); // 'business' or 'influencer'
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [availableAccounts, setAvailableAccounts] = useState([]);

  const { login, selectAccount } = useAuth();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(loginEmail, loginPassword);
    
    if (res.requiresAccountSelection) {
      setAvailableAccounts(res.accounts || []);
      setMode('account_selection');
      return;
    }

    if (res.success) {
      if (onSuccess) onSuccess();
      else onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleAccountChosen = (account) => {
    selectAccount(account);
    if (onSuccess) onSuccess();
    else onClose();
  };

  const handleSignupSuccess = () => {
    if (onSuccess) onSuccess();
    else onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">

        {/* HEADER */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl gradient-bg mx-auto flex items-center justify-center p-0.5 shadow-lg shadow-indigo-500/30">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {mode === 'account_selection' ? 'Choose Your SocialLoop Account' : mode === 'login' ? 'Welcome Back to SocialLoop' : 'Create Your Account'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'account_selection' ? 'Multiple accounts found for your login email. Select an account to enter:' : mode === 'login' ? 'Log in using your @username or email address' : 'Select your role to view tailored signup form'}
          </p>
        </div>

        {/* MODE TOGGLE (LOGIN / SIGNUP) */}
        {mode !== 'account_selection' && (
          <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-2xl mb-6 border border-slate-200 dark:border-white/10">
            <button
              type="button"
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
              type="button"
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
        )}

        {/* ACCOUNT SELECTION SCREEN (MULTI-ACCOUNT EMAILS) */}
        {mode === 'account_selection' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {availableAccounts.map(account => (
                <button
                  key={account.id}
                  type="button"
                  onClick={() => handleAccountChosen(account)}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 hover:border-[#6D5EF8] bg-white/80 dark:bg-slate-800/80 text-left transition-all flex items-center justify-between group hover:scale-[1.01] shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={account.avatar || account.logo} 
                      alt={account.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#6D5EF8] shrink-0"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-[#6D5EF8] transition-colors">
                        {account.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#6D5EF8]">
                        {account.username ? (account.username.startsWith('@') ? account.username : `@${account.username}`) : `@${account.id}`}
                      </p>
                      <p className="text-[11px] text-slate-400">{account.city || account.state || 'Registered User'}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-[#6D5EF8] text-[11px] font-bold uppercase tracking-wider">
                      {account.role === 'business' ? 'Business / Brand' : 'Influencer / Creator'}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => { setMode('signup'); setAvailableAccounts([]); }}
                className="w-full py-3 rounded-xl border border-dashed border-[#6D5EF8] text-[#6D5EF8] font-bold text-xs hover:bg-[#6D5EF8]/10 transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create another SocialLoop account with this email</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('login'); setAvailableAccounts([]); }}
                className="w-full py-2 text-xs text-slate-500 hover:underline text-center font-medium"
              >
                Use a different account or username
              </button>
            </div>
          </div>
        )}

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
                <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-1">
                  Username or Email Address *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter @username or email address" 
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-1">Password *</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In To Account</span>
              </button>
            </form>
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
              <BusinessSignupForm onSuccess={handleSignupSuccess} onClose={onClose} />
            ) : (
              <InfluencerSignupForm onSuccess={handleSignupSuccess} onClose={onClose} />
            )}

          </div>
        )}
    </Modal>
  );
};
