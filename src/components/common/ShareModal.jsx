import React, { useState } from 'react';
import { Copy, Check, Share2, MessageCircle, Send } from 'lucide-react';
import { TwitterIcon, LinkedinIcon } from './Icons';
import { Modal } from './Modal';

export const ShareModal = ({ item, type = 'post', isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !item) return null;

  const title = item.title || item.caption || 'Check this out on SocialLoop!';
  const shareUrl = `${window.location.origin}/#${type}-${item.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SocialLoop',
          text: title,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled share sheet
      }
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="text-center space-y-2 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[#6D5EF8]/10 text-[#6D5EF8] mx-auto flex items-center justify-center">
          <Share2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white">
          Share {type === 'campaign' ? 'Campaign Opportunity' : 'Social Post'}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-1 px-4">
          "{title}"
        </p>
      </div>

      <div className="space-y-4">
        {/* QUICK SHARE SOCIAL BUTTONS */}
        <div className="grid grid-cols-3 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex flex-col items-center gap-1.5 border border-emerald-500/20 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-bold text-xs flex flex-col items-center gap-1.5 border border-sky-500/20 transition-all"
          >
            <TwitterIcon className="w-5 h-5" />
            <span>X / Twitter</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-xs flex flex-col items-center gap-1.5 border border-blue-600/20 transition-all"
          >
            <LinkedinIcon className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* COPY LINK INPUT BOX */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Direct Sharable Link</label>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              readOnly 
              value={shareUrl}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 outline-none select-all"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl gradient-button text-white font-bold text-xs shrink-0 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* NATIVE DEVICE SHARE SHEET BUTTON */}
        {typeof navigator !== 'undefined' && navigator.share && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-[#6D5EF8] hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>More Sharing Options (Device Share Sheet)</span>
          </button>
        )}
      </div>
    </Modal>
  );
};
