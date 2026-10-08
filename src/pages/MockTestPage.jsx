import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MOCK_TEST_QUESTIONS } from '../data/mockTestData';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export function MockTestPage({ setCurrentPage }) {
  const { user } = useAuth();
  
  // Pick questions based on target job role or fallback
  const roleKey = user?.targetJob || "Full Stack Developer";
  const questions = MOCK_TEST_QUESTIONS[roleKey] || MOCK_TEST_QUESTIONS["Full Stack Developer"];
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const handleSelectOption = (qId, optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleSubmitTest = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const total = questions.length;
    const scorePercent = Math.round((correctCount / total) * 100);
    const passed = scorePercent > 50; // User requirement: >50% is PASS, <=50% is FAIL

    setTestResult({
      scorePercent,
      correctCount,
      total,
      passed,
      timeTaken: 600 - timeLeft
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(600);
    setIsSubmitted(false);
    setTestResult(null);
  };

  const currentQuestion = questions[currentQIndex];
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-1">
            <FileText className="w-3.5 h-3.5" /> Online Assessment & Aptitude Round
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Mock Online Test ({roleKey})
          </h1>
          <p className="text-xs text-slate-400">
            Resume-based Technical questions + Quantitative Aptitude & Logical Reasoning (Pass mark: &gt; 50%)
          </p>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-white font-mono text-sm">
              <Clock className={`w-4 h-4 ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={handleSubmitTest}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-md transition-all"
            >
              Submit Test
            </button>
          </div>
        )}
      </div>

      {/* Results View */}
      {isSubmitted && testResult ? (
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6 animate-fadeIn">
          
          {/* Result Banner */}
          <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
            testResult.passed
              ? 'bg-emerald-950/40 border-emerald-500/40'
              : 'bg-rose-950/40 border-rose-500/40'
          }`}>
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                testResult.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {testResult.passed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
              </div>
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  testResult.passed ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {testResult.passed ? "QUALIFIED / PASS (>50%)" : "FAILED / NOT QUALIFIED (≤50%)"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                  {testResult.passed ? "Congratulations! You Passed the Mock Test 🎉" : "Needs More Preparation ❌"}
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  {testResult.passed 
                    ? "You have demonstrated solid domain knowledge & aptitude skills! You can now proceed to the AI Voice Interview or Live Coding."
                    : "You scored 50% or below. Review the explanations below, practice your weak areas, and try again."}
                </p>
              </div>
            </div>

            <div className="text-center sm:text-right bg-slate-950/80 px-6 py-4 rounded-2xl border border-white/10 shrink-0">
              <div className={`text-4xl font-black ${
                testResult.passed ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {testResult.scorePercent}%
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {testResult.correctCount} / {testResult.total} Correct
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-b border-white/10 pb-4">
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" /> Retake Mock Test
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage('room')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-md flex items-center gap-2"
              >
                Go to 5-Star Voice Interview ⭐ <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('coding')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-bold text-xs flex items-center gap-2"
              >
                Live Coding Round 💻
              </button>
            </div>
          </div>

          {/* Question by Question Review */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Detailed Answers & Explanations:</h3>
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    isCorrect 
                      ? 'bg-emerald-950/10 border-emerald-500/20' 
                      : 'bg-rose-950/10 border-rose-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-300">Question {idx + 1} • {q.section}</span>
                    <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                      {isCorrect ? "✓ Correct (+10%)" : "✗ Incorrect (0%)"}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm">"{q.question}"</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      const isOptionSelected = oIdx === userAns;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                            isOptionCorrect
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-semibold'
                              : isOptionSelected
                              ? 'bg-rose-500/20 border-rose-500/40 text-rose-200 line-through'
                              : 'bg-slate-950 border-white/5 text-slate-400'
                          }`}
                        >
                          <span>{String.fromCharCode(65 + oIdx)}. {opt}</span>
                          {isOptionCorrect && <span className="text-[10px] text-emerald-400">Correct Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 text-[11px] text-slate-300">
                    <strong className="text-cyan-300">Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        // Active Test Question View
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left 8: Question Box */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  {currentQuestion.section}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Question {currentQIndex + 1} of {questions.length}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {currentQIndex + 1}. {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(currentQuestion.id, idx)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                          : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-white/30 hover:bg-slate-950'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm font-medium">{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                {currentQIndex + 1 < questions.length ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 text-white text-xs font-bold shadow-md"
                  >
                    Submit Test Now
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Right 4: Question Palette */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Question Navigator</h3>
              
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = currentQIndex === idx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-10 rounded-xl font-bold text-xs transition-all ${
                        isCurrent
                          ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white'
                          : isAnswered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-950 text-slate-400 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-950 border border-white/20" />
                  <span>Unanswered ({questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

              <button
                onClick={handleSubmitTest}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all mt-2"
              >
                Submit & Calculate Score
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
