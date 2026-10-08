import React from 'react';
import { Sparkles, Heart, Github, Linkedin, Twitter, Shield, Code, Cpu } from 'lucide-react';

export function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-dark-950 border-t border-white/10 text-slate-400 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <span>InterviewAI <span className="text-indigo-400">PRO</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete professional AI-powered interview preparation ecosystem with real-time speech evaluation, resume parsing, live coding sandbox, and personalized career roadmaps.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#github" className="hover:text-indigo-400 transition-colors"><Github className="w-4 h-4" /></a>
              <a href="#linkedin" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#twitter" className="hover:text-indigo-400 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Core Modules */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Interview Tracks</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => setCurrentPage('setup')} className="hover:text-white transition-colors">Python Developer Track</button></li>
              <li><button onClick={() => setCurrentPage('setup')} className="hover:text-white transition-colors">Full Stack Developer Track</button></li>
              <li><button onClick={() => setCurrentPage('coding')} className="hover:text-white transition-colors">Live Algorithm Coding</button></li>
              <li><button onClick={() => setCurrentPage('companies')} className="hover:text-white transition-colors">FAANG & MNC Company Rounds</button></li>
              <li><button onClick={() => setCurrentPage('setup')} className="hover:text-white transition-colors">STAR Behavioral & HR Panel</button></li>
            </ul>
          </div>

          {/* AI Career Tools */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">AI Career Tools</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => setCurrentPage('resume')} className="hover:text-white transition-colors">AI Resume Parser & ATS Score</button></li>
              <li><button onClick={() => setCurrentPage('skills')} className="hover:text-white transition-colors">Skill Gap Analyzer</button></li>
              <li><button onClick={() => setCurrentPage('learning-plan')} className="hover:text-white transition-colors">5-Day Personalized Study Plans</button></li>
              <li><button onClick={() => setCurrentPage('career-ai')} className="hover:text-white transition-colors">24/7 AI Career Mentor</button></li>
              <li><button onClick={() => setCurrentPage('history')} className="hover:text-white transition-colors">Performance History Archive</button></li>
            </ul>
          </div>

          {/* Tech Stack & Admin */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Platform Specs</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-indigo-300 font-mono">React 18</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-cyan-300 font-mono">Web Speech API</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-emerald-300 font-mono">Tailwind CSS</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-purple-300 font-mono">FastAPI</span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setCurrentPage('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
              >
                <Shield className="w-3.5 h-3.5" /> Admin Control Center
              </button>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AI Interview Coach Platform. Built for Excellence.</p>
          <div className="flex items-center gap-1">
            Designed for professional career advancement
          </div>
        </div>
      </div>
    </footer>
  );
}
