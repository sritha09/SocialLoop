import React, { useState } from 'react';
import { Bot, Sparkles, X, Send, User, ChevronUp } from 'lucide-react';

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '👋 Hi! I am LoopBot, your AI Assistant for SocialLoop. How can I help you negotiate deals, generate campaign descriptions, or match with top creators today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userQuery = inputMsg;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInputMsg('');

    setTimeout(() => {
      let reply = "I can help with that! SocialLoop matches creators using engagement rates, location proximity, and verified escrow payments. Try checking our Explore section or AI Auto-Fill feature in Campaign Creation!";
      
      const q = userQuery.toLowerCase();
      if (q.includes('price') || q.includes('rate') || q.includes('negotiate')) {
        reply = "💡 Pricing Tip: Micro-influencers (10K-50K followers) typically charge $300-$700 per Instagram Reel. You can propose custom offers directly using the Negotiation Tool inside the chat!";
      } else if (q.includes('escrow') || q.includes('pay') || q.includes('stripe')) {
        reply = "🔒 Escrow Protection: Funds are locked when the business accepts a proposal. Creators receive payment as soon as the deliverable is published and verified.";
      } else if (q.includes('cafe') || q.includes('food')) {
        reply = "☕ Cafe Promotion Idea: Host a VIP tasting event! Require 1 Reel showcasing ambience + 3 IG Stories with location tag. Top creators in SF like @mayacreates have 5.4% engagement for food!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-slate-900 dark:bg-amber-600 text-white shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group border border-white/20"
        >
          <Bot className="w-5 h-5 text-amber-400 dark:text-white animate-pulse" />
          <span className="font-bold text-xs pr-1 hidden sm:inline">AI Copilot</span>
        </button>
      )}

      {/* CHATBOT CONTAINER */}
      {isOpen && (
        <div className="w-80 sm:w-96 glass-panel rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-fadeIn">
          
          {/* HEADER */}
          <div className="p-4 bg-slate-900 dark:bg-amber-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm flex items-center gap-1">
                  LoopBot AI
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h4>
                <p className="text-[10px] text-slate-300">SocialLoop Assistant</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/20">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MESSAGES AREA */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* INPUT FORM */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/40">
            <input 
              type="text" 
              placeholder="Ask AI about rates, matching, titles..." 
              value={inputMsg}
              onChange={e => setInputMsg(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-white/10 bg-white/80 dark:bg-slate-800 text-xs text-slate-900 dark:text-white outline-none"
            />
            <button type="submit" className="p-2 rounded-xl bg-amber-600 text-white shadow">
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
