import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storageService';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Award, 
  ChevronRight, 
  Search, 
  Filter, 
  Mic, 
  ArrowLeft 
} from 'lucide-react';

export function HistoryPage({ setCurrentPage }) {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    setHistory(StorageService.getHistory());
  }, []);

  const filteredHistory = history.filter(h => 
    h.jobRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.interviewType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Interview Transcripts & History</h1>
          <p className="text-sm text-slate-400 mt-1">
            Review past scores, question feedback, and track your long-term communication growth.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by role or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {selectedRecord ? (
        // Detailed Drill-down View
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
          <button
            onClick={() => setSelectedRecord(null)}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back to History List
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {selectedRecord.interviewType} Round
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">{selectedRecord.jobRole}</h2>
              <p className="text-xs text-slate-400">
                Completed on {new Date(selectedRecord.date).toLocaleDateString()} • {selectedRecord.duration} mins
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-black text-emerald-400">{selectedRecord.overallScore}/100</div>
              <span className="text-xs text-slate-400">Final Score</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">AI Executive Feedback</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedRecord.feedbackSummary}</p>
          </div>

          {/* Metrics breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(selectedRecord.metrics || {}).map(([k, v]) => (
              <div key={k} className="p-3 rounded-xl bg-slate-800/60 border border-white/5">
                <div className="text-[11px] text-slate-400 capitalize">{k}</div>
                <div className="text-base font-bold text-white mt-0.5">{v}%</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // History List Table / Cards
        <div className="space-y-3">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedRecord(item)}
                className="p-5 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/5 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                    <Mic className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.jobRole}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="capitalize">{item.interviewType} Round</span>
                      <span>•</span>
                      <span>{item.difficulty}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-400">{item.overallScore}/100</div>
                    <span className="text-[10px] text-slate-500">View Full Transcript</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-3xl border border-white/5">
              No interview records found matching your search.
            </div>
          )}
        </div>
      )}

    </div>
  );
}
