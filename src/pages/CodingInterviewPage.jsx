import React, { useState } from 'react';
import { CODING_PROBLEMS } from '../data/codingProblems';
import { CodeRunner } from '../services/codeRunner';
import { 
  Code2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Sparkles, 
  RotateCcw,
  Terminal,
  Award,
  ArrowRight
} from 'lucide-react';

export function CodingInterviewPage({ setCurrentPage }) {
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  
  const currentProblem = CODING_PROBLEMS[selectedProblemIndex];
  
  const [code, setCode] = useState(currentProblem.languages[selectedLanguage]?.starter || "");
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSelectProblem = (idx) => {
    setSelectedProblemIndex(idx);
    const p = CODING_PROBLEMS[idx];
    setCode(p.languages[selectedLanguage]?.starter || "");
    setTestResults(null);
    setShowHint(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(currentProblem.languages[lang]?.starter || "");
    setTestResults(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      let result;
      if (selectedLanguage === 'javascript') {
        result = CodeRunner.runJavaScript(code, currentProblem.testCases);
      } else {
        result = CodeRunner.runPythonSimulation(code, currentProblem.id, currentProblem.testCases);
      }
      setTestResults(result);
      setIsRunning(false);
    }, 500);
  };

  const isQualified = testResults && testResults.passedCount === testResults.totalCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-1">
            <Terminal className="w-3.5 h-3.5" /> Step 4: Live Coding Assessment Round
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Algorithmic Coding Studio</h1>
          <p className="text-xs text-slate-400">Pass all test cases to achieve QUALIFIED status. Student feedback follows immediately.</p>
        </div>

        {/* Problem Selector */}
        <div className="flex flex-wrap gap-2">
          {CODING_PROBLEMS.map((prob, idx) => (
            <button
              key={prob.id}
              onClick={() => handleSelectProblem(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedProblemIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {prob.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 5: Problem Description */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                currentProblem.difficulty === 'Easy' 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {currentProblem.difficulty}
              </span>
              <span className="text-xs text-slate-400">{currentProblem.category}</span>
            </div>

            <h2 className="text-xl font-bold text-white">{currentProblem.title}</h2>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
              <p>{currentProblem.description}</p>
            </div>

            {/* Examples */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Examples:</h4>
              {currentProblem.examples.map((ex, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-white/5 font-mono text-[11px] space-y-1">
                  <div><strong className="text-slate-400">Input:</strong> <span className="text-indigo-300">{ex.input}</span></div>
                  <div><strong className="text-slate-400">Output:</strong> <span className="text-emerald-300">{ex.output}</span></div>
                </div>
              ))}
            </div>

            {/* Hints Toggle */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
              >
                <Lightbulb className="w-3.5 h-3.5" /> {showHint ? "Hide Algorithmic Hint" : "Need a Hint?"}
              </button>
              {showHint && (
                <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
                  {currentProblem.hints.map((h, i) => (
                    <p key={i}>• {h}</p>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right 7: Code Editor + Qualification Status */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            
            {/* Editor Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Solution Sandbox</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none"
                >
                  <option value="javascript">JavaScript (ES6+)</option>
                  <option value="python">Python 3</option>
                </select>

                <button
                  onClick={() => setCode(currentProblem.languages[selectedLanguage]?.starter || "")}
                  title="Reset code"
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                spellCheck={false}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-white/10 text-indigo-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-indigo-500 resize-none selection:bg-indigo-600"
              />
            </div>

            {/* Run Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-mono">
                Target Complexity: <strong className="text-white">{currentProblem.timeComplexity}</strong>
              </span>

              <button
                onClick={handleRunCode}
                disabled={isRunning || !code.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
              >
                {isRunning ? (
                  <><Sparkles className="w-4 h-4 animate-spin" /> Executing Testcases...</>
                ) : (
                  <><Play className="w-4 h-4 fill-white" /> Run & Submit Code</>
                )}
              </button>
            </div>

          </div>

          {/* Test Case Execution Output Panel with QUALIFIED / FAILED Banner & Action to Final Feedback */}
          {testResults && (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4 animate-fadeIn">
              
              {/* Qualification Header */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isQualified
                  ? 'bg-emerald-950/40 border-emerald-500/40'
                  : 'bg-rose-950/40 border-rose-500/40'
              }`}>
                <div className="flex items-center gap-3">
                  {isQualified ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
                  )}
                  <div>
                    <h3 className={`text-base font-extrabold ${isQualified ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isQualified ? "QUALIFIED (PASSED ALL TEST CASES) 🎉" : "FAILED / NOT QUALIFIED ❌"}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {isQualified 
                        ? `All ${testResults.totalCount}/${testResults.totalCount} test cases passed successfully in ${testResults.executionTime}!` 
                        : `Only ${testResults.passedCount}/${testResults.totalCount} test cases passed. Review errors below.`}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`text-2xl font-black ${isQualified ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {Math.round((testResults.passedCount / testResults.totalCount) * 100)}%
                  </div>
                </div>
              </div>

              {/* View Final Report Button */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  <strong className="text-white block">Coding Round Completed!</strong>
                  Proceed now to view your complete final student placement scorecard & feedback report.
                </div>
                <button
                  onClick={() => setCurrentPage('result')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-primary-500 to-cyan-500 hover:brightness-110 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 shrink-0 transition-all"
                >
                  View Final Student Feedback & Report <Award className="w-4 h-4" />
                </button>
              </div>

              {testResults.error ? (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs">
                  {testResults.error}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {testResults.results.map((r, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                        r.passed ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>Test Case {r.testCaseIndex}</span>
                        <span>{r.passed ? "PASSED ✓" : "FAILED ✗"}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">Input: {r.input}</div>
                      <div className="text-[10px] text-slate-300">Expected: {r.expected}</div>
                      <div className="text-[10px] text-slate-300">Actual: {r.actual}</div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
