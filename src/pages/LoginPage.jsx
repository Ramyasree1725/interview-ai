import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';

export function LoginPage({ setCurrentPage }) {
  const { login, loadDemoRole } = useAuth();
  const [email, setEmail] = useState('ramyasri@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    setCurrentPage('dashboard');
  };

  const handleQuickDemo = (role, skills) => {
    loadDemoRole(role, skills);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-slate-900/90 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">Sign in to resume your AI interview preparation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
          >
            Sign In to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Instant Demo Profiles */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="text-center text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            ⚡ Instant 1-Click Demo Profiles
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo("Python Developer", ["Python", "FastAPI", "PostgreSQL", "OOPs", "Docker"])}
              className="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 text-[11px] text-slate-300 font-medium text-left"
            >
              🐍 Python Dev Demo
            </button>
            <button
              onClick={() => handleQuickDemo("Full Stack Developer", ["React", "Node.js", "JavaScript", "SQL", "MongoDB"])}
              className="px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-white/5 text-[11px] text-slate-300 font-medium text-left"
            >
              ⚛️ Full Stack Demo
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentPage('register')}
            className="text-indigo-400 hover:underline font-semibold"
          >
            Create Free Account
          </button>
        </div>

      </div>
    </div>
  );
}
