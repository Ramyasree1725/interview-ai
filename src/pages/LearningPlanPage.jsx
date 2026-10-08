import React, { useState } from 'react';
import { LEARNING_ROADMAPS } from '../data/learningRoadmaps';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Play,
  Flame
} from 'lucide-react';

export function LearningPlanPage({ setCurrentPage }) {
  const [selectedPlanKey, setSelectedPlanKey] = useState("rest-apis");
  const [completedDays, setCompletedDays] = useState({ 1: true });

  const activePlan = LEARNING_ROADMAPS[selectedPlanKey] || LEARNING_ROADMAPS["rest-apis"];

  const toggleDayCompletion = (dayNum) => {
    setCompletedDays(prev => ({
      ...prev,
      [dayNum]: !prev[dayNum]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Structured 5-Day Fast Tracks
        </div>
        <h1 className="text-3xl font-black text-white">Personalized 5-Day Learning Roadmaps</h1>
        <p className="text-sm text-slate-400 mt-1">
          Bite-sized daily milestones designed to convert your weak areas into interview strengths.
        </p>
      </div>

      {/* Plan Switcher Pills */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(LEARNING_ROADMAPS).map(([key, plan]) => (
          <button
            key={key}
            onClick={() => setSelectedPlanKey(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedPlanKey === key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {plan.skill}
          </button>
        ))}
      </div>

      {/* Main Roadmap Days Timeline */}
      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">{activePlan.category}</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">{activePlan.skill}</h2>
            <p className="text-xs text-slate-400 mt-1">Targeting: {activePlan.targetRole}</p>
          </div>

          <button
            onClick={() => setCurrentPage('setup')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-md flex items-center gap-2 self-start"
          >
            <Play className="w-4 h-4 fill-white" /> Practice Mock Test
          </button>
        </div>

        {/* Day Cards */}
        <div className="space-y-4">
          {activePlan.days.map((d) => {
            const isDone = completedDays[d.day];
            return (
              <div
                key={d.day}
                className={`p-5 rounded-2xl border transition-all ${
                  isDone 
                    ? 'bg-slate-950/80 border-emerald-500/30' 
                    : 'bg-slate-800/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleDayCompletion(d.day)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                        isDone 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-800 text-slate-400 border border-white/10 hover:border-indigo-500'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-5 h-5" /> : `D${d.day}`}
                    </button>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-bold ${isDone ? 'text-slate-300 line-through' : 'text-white'}`}>
                          Day {d.day}: {d.title}
                        </h3>
                      </div>

                      {/* Topic Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {d.topics.map((t, idx) => (
                          <span key={idx} className="px-2.5 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-medium">
                            • {t}
                          </span>
                        ))}
                      </div>

                      {/* Practical Exercise */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300">
                        <strong className="text-amber-300">Hands-on Task:</strong> {d.exercise}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap self-end sm:self-start">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{d.estimatedTime}</span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
