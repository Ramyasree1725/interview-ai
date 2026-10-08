import React, { useState } from 'react';
import { COMPANY_PROFILES } from '../data/companyProfiles';
import { useInterview } from '../context/InterviewContext';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Play, 
  Award 
} from 'lucide-react';

export function CompanyTrackPage({ setCurrentPage }) {
  const { startSession } = useInterview();
  const [selectedCompanyId, setSelectedCompanyId] = useState("google");

  const company = COMPANY_PROFILES.find(c => c.id === selectedCompanyId) || COMPANY_PROFILES[0];

  const handleStartCompanyInterview = () => {
    startSession({
      jobRole: "full-stack-developer",
      jobRoleTitle: `${company.name} Technical & Culture Track`,
      interviewType: "company-specific",
      difficulty: "advanced",
      questionsCount: 5
    });
    setCurrentPage('room');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
          <Building2 className="w-3.5 h-3.5" /> Company-Specific Hiring Bar
        </div>
        <h1 className="text-3xl font-black text-white">Target Company Interview Tracks</h1>
        <p className="text-sm text-slate-400 mt-1">
          Master company-specific interview rounds, leadership rubrics, and actual historical interview styles.
        </p>
      </div>

      {/* Company Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {COMPANY_PROFILES.map((c) => {
          const isSelected = selectedCompanyId === c.id;
          return (
            <div
              key={c.id}
              onClick={() => setSelectedCompanyId(c.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-900/80 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-white font-black text-sm mb-3">
                {c.logoText}
              </div>
              <h3 className="text-base font-bold text-white">{c.name}</h3>
              <span className="text-[10px] text-slate-400">4 Hiring Rounds</span>
            </div>
          );
        })}
      </div>

      {/* Selected Company Deep Dive Details */}
      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Company Overview</span>
            <h2 className="text-2xl font-black text-white mt-0.5">{company.name} Interview Process</h2>
            <p className="text-xs text-slate-400 mt-1">{company.tagline}</p>
          </div>

          <button
            onClick={handleStartCompanyInterview}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-lg flex items-center gap-2 self-start"
          >
            <Play className="w-4 h-4 fill-white" /> Launch {company.name} Mock Simulation
          </button>
        </div>

        {/* Rounds Breakdown */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Rounds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {company.rounds.map((round, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 space-y-1">
                <div className="text-xs font-bold text-indigo-300">Round {idx + 1}: {round.name}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{round.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typical Questions Sample */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {company.typicalQuestions.map((q, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-300 flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {i + 1}
                </span>
                <span>"{q}"</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
