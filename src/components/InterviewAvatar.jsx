import React from 'react';
import { Bot, Volume2, Mic, Sparkles, Brain, CheckCircle2 } from 'lucide-react';
import { AudioVisualizer } from './AudioVisualizer';

export function InterviewAvatar({ state = "idle", isSpeaking = false, isListening = false }) {
  // state: "speaking" | "listening" | "thinking" | "evaluating" | "idle"

  const stateConfig = {
    speaking: {
      label: "AI Interviewer Speaking...",
      color: "from-indigo-500 to-cyan-500",
      ringColor: "ring-indigo-500/50 shadow-indigo-500/30",
      icon: Volume2,
      badge: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
    },
    listening: {
      label: "Candidate Speaking (Listening...)",
      color: "from-rose-500 to-amber-500",
      ringColor: "ring-rose-500/50 shadow-rose-500/30 animate-pulse",
      icon: Mic,
      badge: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    },
    thinking: {
      label: "AI Synthesizing Next Question...",
      color: "from-violet-500 to-purple-600",
      ringColor: "ring-purple-500/50 shadow-purple-500/30",
      icon: Brain,
      badge: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    },
    evaluating: {
      label: "Analyzing Rubric & Depth...",
      color: "from-emerald-500 to-teal-500",
      ringColor: "ring-emerald-500/50 shadow-emerald-500/30",
      icon: CheckCircle2,
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
    },
    idle: {
      label: "AI Ready",
      color: "from-slate-600 to-slate-700",
      ringColor: "ring-slate-700/50 shadow-none",
      icon: Bot,
      badge: "bg-slate-700/30 text-slate-300 border-slate-700"
    }
  };

  const current = isSpeaking 
    ? stateConfig.speaking 
    : isListening 
    ? stateConfig.listening 
    : stateConfig[state] || stateConfig.idle;

  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900/80 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      
      {/* Background Glow Orb */}
      <div className={`absolute -top-12 w-64 h-64 bg-gradient-to-br ${current.color} opacity-20 blur-3xl rounded-full pointer-events-none transition-all duration-700`} />

      {/* Avatar Container */}
      <div className="relative mb-5">
        {/* Animated Ripple Waves */}
        {(isSpeaking || isListening) && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 animate-ping opacity-25" />
        )}

        <div className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr ${current.color} shadow-xl ${current.ringColor} transition-all duration-500`}>
          <div className="w-full h-full bg-dark-900 rounded-full flex flex-col items-center justify-center overflow-hidden border-2 border-white/10">
            {/* AI Humanized Robotic Holographic Eye */}
            <div className="relative flex items-center justify-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg transform rotate-3`}>
                <Bot className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <Sparkles className="w-4 h-4 text-cyan-300 absolute -top-1 -right-1 animate-spin" />
            </div>
          </div>
        </div>

        {/* Live Status Icon Tag */}
        <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-slate-800 border border-white/20 shadow-md">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Status Pill */}
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${current.badge} mb-4 transition-all duration-300`}>
        <span className="w-2 h-2 rounded-full bg-current animate-ping" />
        {current.label}
      </div>

      {/* Real-time Voice Audio Visualizer */}
      <div className="w-full max-w-xs">
        <AudioVisualizer isSpeaking={isSpeaking} isListening={isListening} />
      </div>

    </div>
  );
}
