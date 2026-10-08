import React from 'react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { ScoreCard } from '../components/ScoreCard';
import { 
  Award, 
  Download, 
  RotateCcw, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Printer, 
  Star, 
  Code2, 
  CheckSquare 
} from 'lucide-react';

export function ResultPage({ setCurrentPage }) {
  const { sessionResults } = useInterview();
  const { user } = useAuth();

  const results = sessionResults || {
    overallScore: 88,
    jobRole: user?.targetJob || "Full Stack Developer",
    interviewType: "Resume-Based & Coding Round",
    duration: 25,
    metrics: {
      technical: 90,
      communication: 84,
      confidence: 88,
      relevance: 92,
      clarity: 85,
      completeness: 87
    },
    feedbackSummary: "Excellent overall performance across all assessment rounds! Candidate demonstrated strong technical architecture clarity, passed all coding sandbox test cases, and earned top stars in the resume-driven interview."
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 print:p-0 print:m-0">
      
      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
            <Award className="w-3.5 h-3.5" /> Final Student Placement Feedback & Performance Report
          </div>
          <h1 className="text-3xl font-extrabold text-white">Comprehensive Candidate Evaluation</h1>
          <p className="text-xs text-slate-400">Delivered after full completion of Mock Test, 5-Star Voice Interview, and Live Coding Sandbox.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-indigo-400" /> Print / Save PDF Certificate
          </button>

          <button
            onClick={() => setCurrentPage('resume')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Start New Assessment
          </button>
        </div>
      </div>

      {/* 3-Stage Assessment Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Stage 1: Mock Test */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5"><CheckSquare className="w-4 h-4 text-indigo-400" /> 1. Mock Online Test</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">PASSED &gt; 50%</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">80% Score</div>
          <p className="text-[11px] text-slate-400">8/10 Technical & Aptitude Questions Correct</p>
        </div>

        {/* Stage 2: 5-Star Voice Interview */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 2. 5-Star Voice Interview</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">4 / 5 ⭐ STARS</span>
          </div>
          <div className="text-2xl font-black text-amber-400">4 Gold Stars ⭐</div>
          <p className="text-[11px] text-slate-400">Strong resume project architecture answers</p>
        </div>

        {/* Stage 3: Live Coding */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5"><Code2 className="w-4 h-4 text-emerald-400" /> 3. Live Coding Round</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">QUALIFIED</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">100% Passed</div>
          <p className="text-[11px] text-slate-400">All test cases passed in 1.2ms ($O(N)$ Time)</p>
        </div>

      </div>

      {/* Main Multi-Metric Scorecard */}
      <ScoreCard score={results.overallScore} metrics={results.metrics} />

      {/* Comprehensive Student Feedback & Recommendations Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-5">
        
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Final Placement Feedback & Critique
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
          <h3 className="text-base font-bold text-white">Executive Verdict: Ready for Technical & HR Panels</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {results.feedbackSummary}
          </p>
        </div>

        {/* Strengths & Actionable Improvements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> What You Did Exceptionally Well:
            </h4>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Excellent STAR storytelling during project architecture questions.</li>
              <li>Clean, optimal code implementation passing all edge cases in $O(N)$ time.</li>
              <li>Strong foundational grasp of quantitative aptitude and logical sequences.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <h4 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Recommended Areas of Focus:
            </h4>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li>Mention distributed caching bottlenecks (e.g. Cache Stampede) during system design.</li>
              <li>Include concrete performance numbers (% CPU savings, queries/sec).</li>
              <li>Follow the 5-Day Study Blueprint to master container orchestration.</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Next Step Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
        <div 
          onClick={() => setCurrentPage('learning-plan')}
          className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 cursor-pointer hover:border-indigo-400 transition-all space-y-2"
        >
          <span className="text-xs font-bold uppercase text-indigo-300">Target Action Plan</span>
          <h3 className="text-lg font-bold text-white">Open 5-Day Study Roadmap</h3>
          <p className="text-xs text-slate-400">Day-by-day curated checklist and mini projects to seal missing skills.</p>
        </div>

        <div 
          onClick={() => setCurrentPage('career-ai')}
          className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 cursor-pointer hover:border-cyan-400 transition-all space-y-2"
        >
          <span className="text-xs font-bold uppercase text-cyan-300">24/7 AI Mentor</span>
          <h3 className="text-lg font-bold text-white">Ask Career AI Mentor</h3>
          <p className="text-xs text-slate-400">Get tips on salary negotiation and STAR behavioral storytelling.</p>
        </div>
      </div>

    </div>
  );
}
