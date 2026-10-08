import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  HelpCircle, 
  Layers, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  Server
} from 'lucide-react';
import { JOB_ROLES } from '../data/jobRoles';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview"); // overview, questions, roles, users
  const [customQuestions, setCustomQuestions] = useState([
    { id: "adm-1", role: "Python Developer", question: "How does async/await work in Python under the hood?", level: "Intermediate" },
    { id: "adm-2", role: "Full Stack Developer", question: "Explain Micro-Frontends architecture and routing.", level: "Advanced" },
    { id: "adm-3", role: "HR & Behavioral", question: "Tell me about a time you handled a difficult client requirement.", level: "All" }
  ]);

  const [newQ, setNewQ] = useState({ role: "Python Developer", question: "", level: "Intermediate" });

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQ.question.trim()) return;
    setCustomQuestions([
      ...customQuestions,
      { id: `adm-${Date.now()}`, ...newQ }
    ]);
    setNewQ({ role: "Python Developer", question: "", level: "Intermediate" });
  };

  const handleDeleteQuestion = (id) => {
    setCustomQuestions(customQuestions.filter(q => q.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Platform Administration & Content Management
          </div>
          <h1 className="text-3xl font-black text-white">Admin Control Console</h1>
          <p className="text-sm text-slate-400 mt-1">
            Monitor platform metrics, manage question pools, configure roles, and inspect candidate feedback.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {[
          { id: "overview", label: "System Overview", icon: BarChart3 },
          { id: "questions", label: "Question Bank Curation", icon: HelpCircle },
          { id: "roles", label: "Role Tracks & Skills", icon: Layers },
          { id: "users", label: "Registered Candidates", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: System Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400">Total Registered Users</span>
              <div className="text-3xl font-extrabold text-white mt-1">1,482</div>
              <span className="text-[11px] text-emerald-400 font-medium">+14% this month</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400">Total Interviews Taken</span>
              <div className="text-3xl font-extrabold text-indigo-400 mt-1">8,920</div>
              <span className="text-[11px] text-indigo-300 font-medium">99.4% speech completion</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400">Average Platform Score</span>
              <div className="text-3xl font-extrabold text-cyan-300 mt-1">81.4%</div>
              <span className="text-[11px] text-slate-400 font-medium">Solid candidate curve</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10">
              <span className="text-xs text-slate-400">AI Speech Engine Status</span>
              <div className="text-xl font-extrabold text-emerald-400 mt-1">All Systems Operational</div>
              <span className="text-[11px] text-slate-500 font-medium">Latency: ~240ms</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white">Popular Interview Domains Breakdown</h3>
            <div className="space-y-3">
              {[
                { name: "Full Stack Developer", percent: 38, count: "3,390 sessions" },
                { name: "Python & Backend Developer", percent: 26, count: "2,320 sessions" },
                { name: "Data Science & ML", percent: 18, count: "1,600 sessions" },
                { name: "HR & Behavioral Master", percent: 18, count: "1,610 sessions" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-slate-400 font-mono">{item.percent}% ({item.count})</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div style={{ width: `${item.percent}%` }} className="h-full bg-indigo-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Question Bank Curation */}
      {activeTab === "questions" && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-400" /> Add Custom Question to AI Pool
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Role</label>
                <select
                  value={newQ.role}
                  onChange={(e) => setNewQ({ ...newQ, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                >
                  {JOB_ROLES.map(r => (
                    <option key={r.id} value={r.title}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Difficulty Calibration</label>
                <select
                  value={newQ.level}
                  onChange={(e) => setNewQ({ ...newQ, level: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                >
                  <option value="Beginner">Entry Level / Fresher</option>
                  <option value="Intermediate">Mid-Level</option>
                  <option value="Advanced">Senior / Lead</option>
                  <option value="All">Applicable to All Levels</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Question Prompt</label>
              <textarea
                value={newQ.question}
                onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                placeholder="Enter the question text to be spoken by AI..."
                rows={2}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add to Live Question Bank
            </button>
          </form>

          {/* List */}
          <div className="space-y-3">
            {customQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {q.role}
                    </span>
                    <span className="text-[10px] text-slate-500">{q.level}</span>
                  </div>
                  <p className="text-xs text-white font-medium">"{q.question}"</p>
                </div>

                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Roles & Skills */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {JOB_ROLES.map((r) => (
            <div key={r.id} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">{r.title}</h4>
                <span className="text-[10px] text-indigo-400">{r.category}</span>
              </div>
              <p className="text-xs text-slate-400">{r.description}</p>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                {r.requiredSkills.map((sk, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">{sk}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Candidates */}
      {activeTab === "users" && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4">
          <h3 className="text-sm font-bold text-white">Active Candidates Overview</h3>
          <div className="space-y-3">
            {[
              { name: "Ramya Sri", email: "ramyasri@example.com", role: "Full Stack Developer", interviews: 18, avg: "88%" },
              { name: "Aarav Sharma", email: "aarav@example.com", role: "Python Developer", interviews: 12, avg: "84%" },
              { name: "Priya Nair", email: "priya@example.com", role: "Data Scientist", interviews: 9, avg: "91%" },
              { name: "Rahul Verma", email: "rahul@example.com", role: "Java Developer", interviews: 14, avg: "82%" },
            ].map((usr, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-800/40 border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{usr.name}</div>
                  <div className="text-slate-500">{usr.email} • {usr.role}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-400">{usr.avg} Avg Score</div>
                  <div className="text-[10px] text-slate-500">{usr.interviews} Sessions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
