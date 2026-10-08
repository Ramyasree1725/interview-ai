import React from 'react';
import { Award, Zap, Brain, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';

export function ScoreCard({ score = 84, metrics = {} }) {
  const metricList = [
    { key: 'technical', label: 'Technical Depth', val: metrics.technical || 88, icon: Brain, color: 'from-blue-500 to-indigo-500' },
    { key: 'communication', label: 'Communication', val: metrics.communication || 79, icon: MessageSquare, color: 'from-cyan-500 to-teal-500' },
    { key: 'confidence', label: 'Confidence & Delivery', val: metrics.confidence || 82, icon: Zap, color: 'from-amber-500 to-orange-500' },
    { key: 'relevance', label: 'Relevance to Question', val: metrics.relevance || 91, icon: CheckCircle, color: 'from-emerald-500 to-green-500' },
    { key: 'clarity', label: 'Clarity & Structure', val: metrics.clarity || 79, icon: Award, color: 'from-violet-500 to-purple-500' },
    { key: 'completeness', label: 'Completeness', val: metrics.completeness || 83, icon: ShieldCheck, color: 'from-pink-500 to-rose-500' },
  ];

  const getScoreGrade = (s) => {
    if (s >= 90) return { grade: "Outstanding (A+)", badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    if (s >= 80) return { grade: "Very Good (A)", badge: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" };
    if (s >= 70) return { grade: "Good Competence (B+)", badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" };
    if (s >= 60) return { grade: "Needs Practice (B)", badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    return { grade: "Foundational (C)", badge: "bg-rose-500/20 text-rose-400 border-rose-500/30" };
  };

  const { grade, badge } = getScoreGrade(score);

  return (
    <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
      
      {/* Top Header & Big Score Dial */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Diagnostic Scorecard</span>
          <h2 className="text-2xl font-extrabold text-white mt-1">Interview Performance Evaluation</h2>
          <p className="text-sm text-slate-400 mt-0.5">Comprehensive multi-dimensional analysis powered by AI</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-800/80 px-6 py-4 rounded-2xl border border-white/10 shadow-inner">
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              {score}
              <span className="text-lg font-bold text-slate-400">/100</span>
            </div>
            <div className={`mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge}`}>
              {grade}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {metricList.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.key} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 font-medium text-slate-200">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{m.label}</span>
                </div>
                <span className="font-bold text-white text-sm">{m.val}%</span>
              </div>
              {/* Progress Track */}
              <div className="w-full h-2 rounded-full bg-slate-700/60 overflow-hidden">
                <div
                  style={{ width: `${m.val}%` }}
                  className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-700`}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
