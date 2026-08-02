import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Send, Image, Smile, CheckCheck, 
  ShieldCheck, Check, Zap, Lock, ArrowLeft, Mic, Paperclip, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';
import { NegotiationWidget } from './NegotiationWidget';
import { EmptyState } from '../common/EmptyState';

export const ChatWindow = ({ targetUserId }) => {
  const { currentUser, users } = useAuth();
  const { messages, sendMessage, createDeal } = useData();
  const { formatCurrency } = useCurrency();

  const [selectedPartnerId, setSelectedPartnerId] = useState(
    targetUserId || (currentUser?.role === 'business' ? 'i1' : 'b1')
  );

  // Mobile View State: 'list' (conversations list) or 'thread' (single active conversation)
  const [mobileView, setMobileView] = useState(targetUserId ? 'thread' : 'list');
  const [isCampaignHeaderExpanded, setIsCampaignHeaderExpanded] = useState(false);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [reactions, setReactions] = useState({}); // msgId -> reaction emoji

  const messagesEndRef = useRef(null);

  const partners = users.filter(u => u.id !== currentUser?.id);
  const activePartner = users.find(u => u.id === selectedPartnerId) || partners[0];

  const conversationMessages = messages.filter(m => 
    (m.senderId === currentUser?.id && m.receiverId === activePartner?.id) ||
    (m.senderId === activePartner?.id && m.receiverId === currentUser?.id)
  );

  useEffect(() => {
    if (targetUserId) {
      setSelectedPartnerId(targetUserId);
      setMobileView('thread');
    }
  }, [targetUserId]);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversationMessages, isTyping]);

  const handleSelectPartner = (partnerId) => {
    setSelectedPartnerId(partnerId);
    setMobileView('thread');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() && !attachedImage && !isRecordingVoice) return;

    let sentText = inputText;
    if (isRecordingVoice) {
      sentText = '🎙️ [Voice Note 0:12]';
      setIsRecordingVoice(false);
    }

    sendMessage({
      senderId: currentUser.id,
      receiverId: activePartner.id,
      text: sentText,
      image: attachedImage,
    });

    setInputText('');
    setAttachedImage(null);

    // Simulate partner typing reply
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      sendMessage({
        senderId: activePartner.id,
        receiverId: currentUser.id,
        text: `Sounds great ${currentUser.name.split(' ')[0]}! I've reviewed your note and I'm ready to proceed.`
      });
    }, 2800);
  };

  const handleSendOffer = (offerData) => {
    sendMessage({
      senderId: currentUser.id,
      receiverId: activePartner.id,
      text: `🤝 CUSTOM OFFER: ${formatCurrency(offerData.price)} for ${offerData.deliverables}`,
      isOffer: true,
      offerPrice: offerData.price,
      offerDeliverables: offerData.deliverables
    });
  };

  const handleAcceptOffer = (msg) => {
    createDeal({
      campaignId: 'c1',
      businessId: currentUser.role === 'business' ? currentUser.id : activePartner.id,
      influencerId: currentUser.role === 'influencer' ? currentUser.id : activePartner.id,
      finalPrice: msg.offerPrice || 500,
      deliverables: msg.offerDeliverables || 'Agreed content package',
      deadline: '2026-08-20',
      terms: 'Negotiated directly in chat.',
      paymentMethod: 'Online',
      status: 'Active'
    });

    sendMessage({
      senderId: currentUser.id,
      receiverId: activePartner.id,
      text: `✅ OFFER ACCEPTED! Deal contract has been automatically created for ${formatCurrency(msg.offerPrice)}.`
    });
  };

  const handleAddReaction = (msgId, emoji) => {
    setReactions(prev => ({ ...prev, [msgId]: emoji }));
  };

  const emojis = ['👍', '🎉', '☕', '❤️', '🔥', '✨', '📸', '🚀'];

  return (
    <div className="glass-panel rounded-2xl border border-[#ECECF3] dark:border-[#26334D] shadow-sm overflow-hidden h-[80vh] flex flex-col md:flex-row relative">
      
      {/* SIDEBAR MESSAGES / CONVERSATION LIST */}
      <div className={`w-full md:w-72 border-r border-[#ECECF3] dark:border-[#26334D] flex flex-col bg-slate-50/70 dark:bg-[#0B0F17]/70 ${
        mobileView === 'thread' ? 'hidden md:flex' : 'flex'
      }`}>
        <div className="p-4 border-b border-[#ECECF3] dark:border-[#26334D] flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#6D5EF8]" />
            <span>Direct Messages</span>
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#6D5EF8] text-[10px] font-bold">
            {partners.length} Active
          </span>
        </div>

        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {partners.length === 0 ? (
            <EmptyState 
              icon={MessageSquare}
              title="No conversations yet"
              description="Connect with creators or businesses to start discussing collaborations."
            />
          ) : (
            partners.map((partner) => {
              const isSelected = partner.id === activePartner?.id;
              return (
                <div
                  key={partner.id}
                  onClick={() => handleSelectPartner(partner.id)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-[#6D5EF8]/10 border border-[#6D5EF8]/30 text-[#6D5EF8] dark:text-[#8B7CFF] font-bold' 
                      : 'hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={partner.avatar || partner.logo} alt={partner.name} className="w-10 h-10 rounded-full object-cover border border-[#6D5EF8]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 absolute bottom-0 right-0"></span>
                  </div>
                  <div className="truncate flex-1">
                    <h4 className="font-bold text-xs truncate flex items-center gap-1">
                      {partner.name}
                      {partner.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{partner.category || 'Creator / Brand'}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* CHAT MAIN THREAD WINDOW */}
      <div className={`flex-1 flex-col bg-white dark:bg-[#161E2E] relative ${
        mobileView === 'list' ? 'hidden md:flex' : 'flex'
      }`}>
        
        {/* TOP CHAT HEADER WITH MOBILE BACK ARROW */}
        {activePartner && (
          <div className="p-3 border-b border-[#ECECF3] dark:border-[#26334D] bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md z-10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* MOBILE BACK ARROW BUTTON */}
                <button
                  onClick={() => setMobileView('list')}
                  className="md:hidden p-1.5 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#6D5EF8] transition-colors"
                  title="Back to conversations"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img src={activePartner.avatar || activePartner.logo} alt={activePartner.name} className="w-9 h-9 rounded-full object-cover border border-[#6D5EF8] shrink-0" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 absolute bottom-0 right-0"></span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {activePartner.name}
                    </h4>
                    {activePartner.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span>● Online</span>
                    <span>• Usually responds in &lt; 15 mins</span>
                  </p>
                </div>
              </div>

              {/* COLLAPSIBLE CAMPAIGN DETAILS HEADER TOGGLE */}
              <button
                onClick={() => setIsCampaignHeaderExpanded(!isCampaignHeaderExpanded)}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 hover:border-[#6D5EF8] border transition-all"
              >
                <span className="hidden sm:inline">Campaign Details</span>
                {isCampaignHeaderExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* COLLAPSIBLE CAMPAIGN BANNER */}
            {isCampaignHeaderExpanded && (
              <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Active Deal: SF Cold Brew Launch</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Escrow Locked ($450)
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                  Deliverables: 1 Instagram Reel + 3 Stories featuring cold brew launch.
                </p>
              </div>
            )}
          </div>
        )}

        {/* MESSAGES THREAD */}
        <div ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
          {conversationMessages.map((msg) => {
            const isMe = msg.senderId === currentUser?.id;
            const currentReaction = reactions[msg.id];

            return (
              <div 
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} group relative`}
              >
                <div className={`max-w-[85%] sm:max-w-md p-3 rounded-2xl space-y-2 shadow-sm relative ${
                  isMe 
                    ? 'bg-[#6D5EF8] text-white rounded-br-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none border border-[#ECECF3] dark:border-[#26334D]'
                }`}>
                  
                  <p className="leading-relaxed">{msg.text}</p>

                  {/* IN-CHAT OFFER CARD */}
                  {msg.isOffer && (
                    <div className="p-3 rounded-xl bg-slate-900 text-white border border-[#8B7CFF] space-y-2 my-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-emerald-400">{formatCurrency(msg.offerPrice)} Proposed Quote</span>
                        <span className="px-2 py-0.5 rounded bg-[#6D5EF8] text-[10px] font-bold">Offer</span>
                      </div>
                      <p className="text-[11px] text-slate-300">{msg.offerDeliverables}</p>

                      {!isMe && (
                        <button
                          onClick={() => handleAcceptOffer(msg)}
                          className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Offer & Lock Escrow</span>
                        </button>
                      )}
                    </div>
                  )}

                  {msg.image && (
                    <img src={msg.image} alt="Attachment" className="rounded-xl max-h-48 object-cover border border-white/20" />
                  )}

                  {/* REACTION BADGE IF ADDED */}
                  {currentReaction && (
                    <span className="absolute -bottom-2 right-2 px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs shadow">
                      {currentReaction}
                    </span>
                  )}

                  <div className={`flex items-center justify-end gap-1 text-[10px] ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                  </div>

                </div>

                {/* QUICK EMOJI REACTION TOOLBAR ON HOVER */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-1 bg-white dark:bg-slate-900 p-1 rounded-full border shadow-sm z-10 text-xs">
                  {['❤️', '🔥', '👍', '😂', '😮'].map(emoji => (
                    <button 
                      key={emoji}
                      onClick={() => handleAddReaction(msg.id, emoji)}
                      className="hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

              </div>
            );
          })}

          {/* TYPING INDICATOR */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <span className="w-2 h-2 rounded-full bg-[#6D5EF8] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#6D5EF8] animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-[#6D5EF8] animate-bounce [animation-delay:0.4s]"></span>
              <span>{activePartner?.name} is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* NEGOTIATION WIDGET TOOL */}
        <NegotiationWidget 
          onSendOffer={handleSendOffer}
        />

        {/* CHAT INPUT BAR */}
        <form onSubmit={handleSend} className="p-3 border-t border-[#ECECF3] dark:border-[#26334D] bg-white dark:bg-[#161E2E] flex items-center gap-2 relative">
          
          {/* EMOJI PICKER */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-3 glass-panel p-2 rounded-xl flex gap-2 shadow-md border border-[#ECECF3] z-30">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => { setInputText(prev => prev + emoji); setShowEmojiPicker(false); }}
                  className="text-lg hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-slate-400 hover:text-[#6D5EF8] transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* VOICE MESSAGE RECORD TOGGLE */}
          <button
            type="button"
            onClick={() => setIsRecordingVoice(!isRecordingVoice)}
            className={`p-2 transition-colors ${isRecordingVoice ? 'text-rose-500 font-bold animate-pulse' : 'text-slate-400 hover:text-[#6D5EF8]'}`}
            title="Voice Note Record UI"
          >
            <Mic className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setAttachedImage('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600')}
            className={`p-2 transition-colors ${attachedImage ? 'text-[#6D5EF8] font-bold' : 'text-slate-400 hover:text-[#6D5EF8]'}`}
            title="Attach Image"
          >
            <Image className="w-5 h-5" />
          </button>

          <input 
            type="text" 
            placeholder={isRecordingVoice ? 'Recording voice note... Click Send to post' : 'Type a message or negotiate terms...'} 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#ECECF3] dark:border-[#26334D] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#6D5EF8] font-medium"
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl gradient-button text-white shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
