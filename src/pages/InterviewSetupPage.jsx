import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { JOB_ROLES, INTERVIEW_TYPES, DIFFICULTY_LEVELS, DURATION_OPTIONS } from '../data/jobRoles';
import { 
  Sparkles, 
  Mic, 
  Layers, 
  Compass, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Volume2, 
  Video 
} from 'lucide-react';

export function InterviewSetupPage({ setCurrentPage }) {
  const { startSession } = useInterview();
  const { user } = useAuth();

  const [selectedRole, setSelectedRole] = useState(
    JOB_ROLES.find(r => r.title === user?.targetJob)?.id || "python-developer"
  );
  const [selectedType, setSelectedType] = useState("technical");
  const [selectedDifficulty, setSelectedDifficulty] = useState(user?.experienceLevel || "intermediate");
  const [selectedDuration, setSelectedDuration] = useState(DURATION_OPTIONS[1]); // Standard Round 20m 7 Qs
  const [enableVoice, setEnableVoice] = useState(true);
  const [enableCamera, setEnableCamera] = useState(false);

  const handleLaunch = () => {
    const roleObj = JOB_ROLES.find(r => r.id === selectedRole);
    startSession({
      jobRole: selectedRole,
      jobRoleTitle: roleObj?.title || "Software Engineer",
      interviewType: selectedType,
      difficulty: selectedDifficulty,
      questionsCount: selectedDuration.questions,
      durationMinutes: selectedDuration.minutes,
      enableVoice,
      enableCamera
    });
    setCurrentPage('room');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Simulation Setup Wizard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Configure Your AI Interview</h1>
        <p className="text-sm text-slate-400">
          Tailor the domain, question types, difficulty, and duration for your upcoming practice session.
        </p>
      </div>

      <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-8">
        
        {/* 1. Job Role Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center">1</span>
              Select Job Domain & Role
            </h3>
            <span className="text-xs text-slate-400 font-medium">9 Tracks Available</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {JOB_ROLES.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-500/15'
                      : 'bg-slate-800/40 border-white/5 hover:border-white/20 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{role.title}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{role.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Interview Type */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-xs flex items-center justify-center">2</span>
              Interview Category & Round Type
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INTERVIEW_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-600/20 border-cyan-500 shadow-md shadow-cyan-500/15'
                      : 'bg-slate-800/40 border-white/5 hover:border-white/20 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{type.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">{type.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Difficulty Level & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          
          {/* Difficulty */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">3</span>
              Target Difficulty
            </h3>
            <div className="space-y-2">
              {DIFFICULTY_LEVELS.map((diff) => {
                const isSelected = selectedDifficulty === diff.id;
                return (
                  <div
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{diff.label}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {diff.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Duration Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">4</span>
              Interview Pace & Duration
            </h3>
            <div className="space-y-2">
              {DURATION_OPTIONS.map((dur, i) => {
                const isSelected = selectedDuration.minutes === dur.minutes;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedDuration(dur)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-600/20 border-purple-500 text-purple-300'
                        : 'bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{dur.label}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 4. Voice & Media Features Toggles */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={enableVoice}
                onChange={(e) => setEnableVoice(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-950 border-white/20 focus:ring-0"
              />
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-indigo-400" /> Enable AI Voice & Speech Recognition
              </span>
            </label>
          </div>

          <button
            onClick={handleLaunch}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-primary-500 to-cyan-500 hover:brightness-110 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Mic className="w-4 h-4" /> Enter AI Interview Room <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
