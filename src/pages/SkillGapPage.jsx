import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { JOB_ROLES } from '../data/jobRoles';
import { TrendingUp, AlertCircle, CheckCircle2, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

export function SkillGapPage({ setCurrentPage }) {
  const { user } = useAuth();
  const [selectedRoleTitle, setSelectedRoleTitle] = useState(user?.targetJob || "Full Stack Developer");

  const selectedRole = JOB_ROLES.find(r => r.title === selectedRoleTitle) || JOB_ROLES[0];
  const userSkills = user?.skills || ["Python", "React", "JavaScript", "SQL", "REST APIs", "Git", "Docker"];

  const matchedSkills = selectedRole.requiredSkills.filter(sk => 
    userSkills.some(us => us.toLowerCase() === sk.toLowerCase())
  );

  const missingSkills = selectedRole.requiredSkills.filter(sk => 
    !userSkills.some(us => us.toLowerCase() === sk.toLowerCase())
  );

  const matchPercentage = Math.round((matchedSkills.length / selectedRole.requiredSkills.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" /> Market Competency Comparator
        </div>
        <h1 className="text-3xl font-black text-white">Skill Gap Analysis & Recommendations</h1>
        <p className="text-sm text-slate-400 mt-1">
          Compare your current profile against top hiring expectations and get actionable recommendations.
        </p>
      </div>

      {/* Role Switcher */}
      <div className="flex flex-wrap gap-2">
        {JOB_ROLES.slice(0, 5).map(role => (
          <button
            key={role.id}
            onClick={() => setSelectedRoleTitle(role.title)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedRoleTitle === role.title
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {role.title}
          </button>
        ))}
      </div>

      {/* Main Analysis Card */}
      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
        
        {/* Top Summary Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Benchmark</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">{selectedRole.title}</h2>
            <p className="text-xs text-slate-400 mt-1">{selectedRole.description}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-2xl border border-white/10">
            <div className="text-right">
              <div className="text-3xl font-black text-indigo-400">{matchPercentage}%</div>
              <span className="text-[10px] text-slate-400 font-medium">Job Readiness Match</span>
            </div>
          </div>
        </div>

        {/* Matched vs Missing Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Matched Skills */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> You Possess ({matchedSkills.length})
              </h3>
              <span className="text-[11px] text-emerald-400 font-semibold">Ready to interview</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {matchedSkills.map((sk, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-xs font-medium">
                  ✓ {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Missing Critical Skills ({missingSkills.length})
              </h3>
              <span className="text-[11px] text-amber-400 font-semibold">Priority to learn</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {missingSkills.map((sk, i) => (
                <span key={i} className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-medium">
                  + {sk}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Action Callout */}
        <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-300" /> Need a Fast Track to bridge these gaps?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Launch our personalized 5-Day Study Blueprint with daily topic breakdowns and practice quizzes.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('learning-plan')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            Open 5-Day Learning Plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
