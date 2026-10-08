import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  LayoutDashboard, 
  FileText, 
  Mic, 
  Code2, 
  TrendingUp, 
  Bot, 
  Building2, 
  User, 
  ShieldCheck, 
  Menu, 
  X,
  Star,
  CheckSquare
} from 'lucide-react';

export function Navbar({ currentPage, setCurrentPage }) {
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'resume', label: '1. Upload Resume', icon: FileText },
    { id: 'mock-test', label: '2. Mock Test (>50% Pass)', icon: CheckSquare },
    { id: 'room', label: '3. 5-Star Interview', icon: Star, highlight: true },
    { id: 'coding', label: '4. Live Coding', icon: Code2 },
    { id: 'skills', label: 'Skill Gap', icon: TrendingUp },
    { id: 'career-ai', label: 'Career AI', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-primary-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  InterviewAI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Student Placement & Mock Ecosystem</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-indigo-600 to-primary-500 text-white shadow-md shadow-indigo-500/20 hover:brightness-110'
                      : isActive 
                        ? 'bg-white/10 text-indigo-300 shadow-inner' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.highlight ? 'text-amber-300 fill-amber-300' : isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Profile Stats */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && user && (
              <>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
                  <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{user.streakDays || 4}d Streak</span>
                </div>

                <div 
                  onClick={() => setCurrentPage('profile')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 cursor-pointer transition-colors"
                >
                  <img 
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} 
                    alt="Avatar"
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/50"
                  />
                  <span className="text-xs font-semibold text-slate-200">{user.name?.split(' ')[0] || 'User'}</span>
                </div>

                <button
                  onClick={() => setCurrentPage('admin')}
                  title="Admin Dashboard"
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-dark-900/95 border-b border-white/10 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 text-indigo-400" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
