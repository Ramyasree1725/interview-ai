import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  FileText, 
  Code2, 
  Award, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Star, 
  ShieldCheck, 
  Bot, 
  Zap, 
  BrainCircuit, 
  Users 
} from 'lucide-react';
import { JOB_ROLES } from '../data/jobRoles';

export function LandingPage({ setCurrentPage }) {
  // Quick Interactive Live Demo Question in Hero
  const [demoAnswer, setDemoAnswer] = useState("");
  const [demoFeedback, setDemoFeedback] = useState(null);
  const [isEvaluatingDemo, setIsEvaluatingDemo] = useState(false);

  const handleTestEvaluation = () => {
    if (!demoAnswer.trim()) return;
    setIsEvaluatingDemo(true);
    setTimeout(() => {
      setIsEvaluatingDemo(false);
      setDemoFeedback({
        score: 86,
        technical: 90,
        communication: 82,
        strength: "Great mention of mutability vs immutability and memory optimization!",
        tip: "Consider mentioning dictionary key hashability for a senior-level answer."
      });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Glow Ambient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg shadow-indigo-500/10 animate-float">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>AI-Powered Comprehensive Interview Preparation Platform</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
            Practice Interviews. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              Improve Skills. Get Hired.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Stop giving robotic answers. Simulate realistic technical, live coding, and HR panel rounds with voice-driven AI evaluation, instant ATS resume diagnostics, and personalized 5-day study plans.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage('setup')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-primary-500 to-cyan-500 hover:brightness-110 text-white font-bold text-base shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Mic className="w-5 h-5" />
              Start Free AI Interview
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentPage('resume')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-white/10 font-semibold text-base flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-5 h-5 text-indigo-400" />
              Analyze My Resume
            </button>

            <button
              onClick={() => setCurrentPage('coding')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-white/10 font-semibold text-base flex items-center justify-center gap-2 transition-all"
            >
              <Code2 className="w-5 h-5 text-emerald-400" />
              Live Coding Sandbox
            </button>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">98.4%</div>
              <div className="text-xs text-slate-400 mt-1">Interview Readiness Score</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400">12+</div>
              <div className="text-xs text-slate-400 mt-1">Tech Roles & Tracks</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">Instant</div>
              <div className="text-xs text-slate-400 mt-1">Voice & Code Feedback</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Free & Practical Prep</div>
            </div>
          </div>
        </div>

        {/* Interactive Live Demo Preview Box in Hero */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">Interactive AI Interview Simulator</span>
            </div>
            <span className="text-xs font-bold text-indigo-400 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
              Live Test
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-indigo-500/20">
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Sample AI Question</div>
              <p className="text-base sm:text-lg font-medium text-white">
                "Explain the difference between a list and a tuple in Python. When would you use one over the other?"
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex justify-between">
                <span>Try Answering in Your Own Words:</span>
                <span className="text-slate-500">Supports typing or quick test</span>
              </label>
              <textarea
                value={demoAnswer}
                onChange={(e) => setDemoAnswer(e.target.value)}
                placeholder="Example: Lists are mutable meaning items can change, while tuples are immutable and take less memory..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none focus:border-indigo-500 font-sans text-sm resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setDemoAnswer("Lists are mutable and use square brackets, whereas tuples are immutable and use parentheses. Tuples have lower memory overhead and are faster, making them ideal for fixed database records and dictionary keys.")}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
              >
                Insert Sample Answer
              </button>

              <button
                onClick={handleTestEvaluation}
                disabled={isEvaluatingDemo || !demoAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 shadow-md transition-all"
              >
                {isEvaluatingDemo ? (
                  <>
                    <BrainCircuit className="w-4 h-4 animate-spin text-cyan-300" />
                    AI Analyzing Answer...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    Test AI Evaluation
                  </>
                )}
              </button>
            </div>

            {demoFeedback && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 animate-fadeIn space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> AI Score: {demoFeedback.score}/100
                  </span>
                  <span className="text-xs text-slate-400">Technical Depth: {demoFeedback.technical}%</span>
                </div>
                <p className="text-xs text-slate-300"><strong className="text-emerald-300">Strength:</strong> {demoFeedback.strength}</p>
                <p className="text-xs text-slate-400"><strong className="text-amber-300">Improvement Tip:</strong> {demoFeedback.tip}</p>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* 2. Why AI Interview Coach? */}
      <section className="py-20 bg-dark-950 border-y border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Why AI Interview Coach?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need to Crack Any Technical & HR Interview
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Traditional mock interviews are expensive and lack structured rubrics. Our platform brings senior staff engineer level interview evaluation directly to your screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Voice & Speech AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Realistic Text-to-Speech audio questions and real-time Speech-to-Text transcription with confidence pacing analysis.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI Resume Parsing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extract skills, detect project architectures, compute ATS score, and automatically generate tailored project questions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live Coding Sandbox</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                In-browser test case execution, time/space complexity analysis, and algorithmic hints for Python and JavaScript.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Skill Gap & Roadmaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identifies missing high-impact tech skills and generates daily structured 5-day step-by-step learning plans.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works (Step-by-Step Interactive Timeline) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Step-by-Step Flow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            From Preparation to Offer Letter in 5 Clear Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { step: "01", title: "Create Profile", desc: "Select your target role and technical experience level." },
            { step: "02", title: "Upload Resume", desc: "AI extracts projects and checks ATS keyword match." },
            { step: "03", title: "Select Track", desc: "Choose Technical, HR, Coding, or Company-specific." },
            { step: "04", title: "AI Interview", desc: "Answer via voice or text with dynamic follow-up questions." },
            { step: "05", title: "Score & Feedback", desc: "Get diagnostic scorecard & staff engineer model answers." },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 relative group hover:border-indigo-500/40 transition-all">
              <div className="text-3xl font-black text-indigo-500/30 mb-2 group-hover:text-indigo-400 transition-colors">
                {item.step}
              </div>
              <h4 className="text-base font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Supported Job Roles Showcase */}
      <section className="py-20 bg-dark-950 border-t border-white/5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Target Roles</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Explore Popular Interview Tracks</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Custom question pools curated for modern hiring standards.</p>
            </div>
            <button
              onClick={() => setCurrentPage('setup')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all self-start"
            >
              Browse All Tracks <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOB_ROLES.slice(0, 6).map((role) => (
              <div
                key={role.id}
                onClick={() => setCurrentPage('setup')}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-indigo-500/40 cursor-pointer transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                    {role.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{role.avgSalary}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {role.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {role.requiredSkills.slice(0, 4).map((sk, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {sk}
                    </span>
                  ))}
                  {role.requiredSkills.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-500">
                      +{role.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Final Callout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-cyan-950/60 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Ace Your Next Dream Tech Job?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Join thousands of aspiring engineers practicing with our intelligent AI interviewer. Get scored, pinpoint gaps, and level up today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('setup')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all"
              >
                Launch AI Interview Room
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="px-6 py-4 rounded-xl bg-slate-800/90 text-slate-200 border border-white/10 text-sm font-semibold hover:bg-slate-700 transition-all"
              >
                Go to Candidate Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
