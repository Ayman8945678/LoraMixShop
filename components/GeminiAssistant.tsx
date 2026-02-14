
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getShoppingAdvice } from '../services/geminiService';
import { CartItem } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiAssistantProps {
  cart: CartItem[];
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Greetings. I am your Elite Concierge. How may I assist your shopping experience today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getShoppingAdvice(userMsg, cart);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[380px] h-[550px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-slate-900 px-6 py-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/20 rounded-xl">
                <Sparkles size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <span className="block font-black text-xs uppercase tracking-widest">Elite Assistant</span>
                <span className="block text-[8px] text-slate-400 uppercase tracking-widest">Always Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#fcfcfc]"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-br-none shadow-lg shadow-slate-900/10' 
                    : 'bg-white text-slate-700 border border-gray-100 rounded-bl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100">
                  <Loader2 size={18} className="animate-spin text-[#D4AF37]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="relative group">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your concierge..."
                className="w-full bg-gray-50 border-gray-100 rounded-full py-4 px-6 pr-14 text-sm focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all duration-300"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-2.5 bg-slate-900 text-white rounded-full hover:bg-black disabled:opacity-30 transition-all shadow-md active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group bg-slate-900 text-white pl-5 pr-6 py-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative">
              <Sparkles className="relative z-10 text-[#D4AF37] group-hover:text-slate-900 transition-colors duration-500" size={24} />
              <div className="absolute inset-0 bg-[#D4AF37] blur-md opacity-50 animate-pulse" />
            </div>
            <span className="font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors duration-500">Concierge</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;
