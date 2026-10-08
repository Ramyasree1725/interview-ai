import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AIEngine } from '../services/aiEngine';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  HelpCircle, 
  MessageSquare, 
  Lightbulb, 
  Layers 
} from 'lucide-react';

export function CareerAiPage() {
  const { user } = useAuth();
  
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'there'}! 👋 I am your dedicated **AI Career Coach & Interview Strategist**.\n\nI can help you with:\n- Crafting the perfect **"Tell me about yourself"** intro\n- Mastering the **STAR Method** for behavioral scenarios\n- Tech salary negotiation strategies\n- System design and coding interview checklists\n\nWhat would you like to prepare for today?`,
      time: 'Just now'
    }
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const promptSuggestions = [
    "How should I answer 'Tell me about yourself'?",
    "Explain the STAR method with an example",
    "How to negotiate salary for a Full Stack Developer?",
    "What are common pitfalls in technical interviews?"
  ];

  const handleSend = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const response = AIEngine.generateCareerAdvice(textToSend, user);
      const aiMsg = {
        sender: 'ai',
        text: response.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-0.5 shadow-lg">
            <div className="w-full h-full bg-dark-900 rounded-[14px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-cyan-300" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">24/7 AI Career Mentor</h1>
            <p className="text-xs text-slate-400">Contextual interview strategy, behavioral prep & salary guidance</p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col h-[560px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/80 border border-white/5 text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
                <div className={`text-[10px] mt-1 text-right ${m.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {m.time}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Bot className="w-4 h-4 animate-bounce" /> AI is thinking...
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 py-3 border-t border-white/10">
          {promptSuggestions.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-white/5 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2 pt-2 border-t border-white/10"
        >
          <input
            type="text"
            placeholder="Ask anything about interviews, salary negotiation, system design..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </form>

      </div>

    </div>
  );
}
