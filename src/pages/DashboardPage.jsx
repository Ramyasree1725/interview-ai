import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storageService';
import { 
  Trophy, 
  Flame, 
  Mic, 
  FileText, 
  Code2, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Bot, 
  Sparkles, 
  Play, 
  Award,
  ChevronRight
} from 'lucide-react';
import { BADGES_LIST, USER_LEVELS } from '../data/badges';

export function DashboardPage({ setCurrentPage }) {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(StorageService.getHistory());
  }, []);

  const totalInterviews = history.length;
  const avgScore = totalInterviews > 0
    ? Math.round(history.reduce((acc, h) => acc + h.overallScore, 0) / totalInterviews)
    : 84;
  const bestScore = totalInterviews > 0
    ? Math.max(...history.map(h => h.overallScore))
    : 89;

  const currentLevel = USER_LEVELS.find(l => (user?.xpPoints || 1200) >= l.minXp && (user?.xpPoints || 1200) < l.maxXp) || USER_LEVELS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. Welcome Banner */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900/80 via-slate-900 to-indigo-950/70 border border-indigo-500/25 shadow-2xl overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                Candidate Profile
              </span>
              <span className="text-xs text-slate-400">Target: {user?.targetJob || 'Full Stack Developer'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Welcome Back, {user?.name || 'Ramya Sri'}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              You are on a <strong className="text-amber-400">{user?.streakDays || 4}-Day Practice Streak</strong>! Complete a 10-minute simulation today to boost your technical confidence.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('setup')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition-all"
            >
              <Mic className="w-4 h-4" /> Start AI Interview
            </button>
            <button
              onClick={() => setCurrentPage('resume')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-indigo-400" /> Resume ATS Score
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Interviews Completed</span>
            <Mic className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{totalInterviews + 16}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +3 this week
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Average Score</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-400">{avgScore}%</div>
          <div className="text-[11px] text-indigo-300 mt-1 font-medium">Top 12% Candidate Rank</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Best Performance</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">{bestScore}%</div>
          <div className="text-[11px] text-slate-400 mt-1">Full Stack Track</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Current Level</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-extrabold text-white">{currentLevel.title}</div>
          <div className="text-[11px] text-amber-300 mt-1 font-medium">{user?.xpPoints || 1250} / {currentLevel.maxXp} XP</div>
        </div>

      </div>

      {/* 3. Main Dashboard Body: Left History/Skills + Right Quick Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Score Improvement + Skill Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Skill Performance Radar Simulation */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Core Skill Proficiency</h3>
                <p className="text-xs text-slate-400">Based on your past interview answers & resume match</p>
              </div>
              <button 
                onClick={() => setCurrentPage('skills')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Skill Gap Analysis <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { name: "Python & Core Backend", score: 92, color: "bg-indigo-500", status: "Mastery" },
                { name: "System Design & Architecture", score: 85, color: "bg-cyan-400", status: "Strong" },
                { name: "React & Modern Frontend", score: 80, color: "bg-emerald-400", status: "Proficient" },
                { name: "Data Structures & Algorithms", score: 76, color: "bg-amber-400", status: "Good" },
                { name: "Docker & Containerization", score: 45, color: "bg-rose-400", status: "Skill Gap" },
              ].map((sk, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-300">{sk.name}</span>
                    <span className="text-slate-400 font-mono">{sk.score}% ({sk.status})</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div style={{ width: `${sk.score}%` }} className={`h-full rounded-full ${sk.color}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Interview Sessions */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Interview Transcripts</h3>
              <button 
                onClick={() => setCurrentPage('history')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                View Full Archive <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {history.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setCurrentPage('history')}
                  className="p-4 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <Mic className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.jobRole}</h4>
                      <p className="text-xs text-slate-400 capitalize">{item.interviewType} • {item.difficulty} • {item.duration} mins</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-400">{item.overallScore}/100</div>
                    <span className="text-[10px] text-slate-500 font-medium">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Quick Launch Hub & Badges */}
        <div className="space-y-6">
          
          {/* Quick Launch Cards */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3">
            <h3 className="text-base font-bold text-white mb-2">Quick Practice Modes</h3>

            <div 
              onClick={() => setCurrentPage('setup')}
              className="p-3.5 rounded-2xl bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-500/30 cursor-pointer transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-indigo-600 text-white"><Mic className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-white">AI Voice Interview</h4>
                <p className="text-[11px] text-slate-400">Real-time speech simulation</p>
              </div>
            </div>

            <div 
              onClick={() => setCurrentPage('coding')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 cursor-pointer transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white"><Code2 className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-white">Live Coding Sandbox</h4>
                <p className="text-[11px] text-slate-400">Run code against test cases</p>
              </div>
            </div>

            <div 
              onClick={() => setCurrentPage('learning-plan')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 cursor-pointer transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-cyan-600 text-white"><TrendingUp className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-white">5-Day Learning Plan</h4>
                <p className="text-[11px] text-slate-400">Fix your missing skill gaps</p>
              </div>
            </div>

            <div 
              onClick={() => setCurrentPage('career-ai')}
              className="p-3.5 rounded-2xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 cursor-pointer transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-purple-600 text-white"><Bot className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-white">AI Career Mentor</h4>
                <p className="text-[11px] text-slate-400">STAR method & salary tips</p>
              </div>
            </div>
          </div>

          {/* Gamification Badges */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Your Achievements</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              {BADGES_LIST.slice(0, 6).map((b, idx) => (
                <div key={b.id} className="p-2.5 rounded-xl bg-slate-800/60 border border-white/5 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${b.color} flex items-center justify-center text-white mb-1.5 shadow-md`}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white leading-tight line-clamp-1">{b.title}</span>
                  <span className="text-[9px] text-amber-400 mt-0.5">+{b.xpReward} XP</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
