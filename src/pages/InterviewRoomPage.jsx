import React, { useState, useEffect, useRef } from 'react';
import { useInterview } from '../context/InterviewContext';
import { useAuth } from '../context/AuthContext';
import { speechService } from '../services/speechService';
import { InterviewAvatar } from '../components/InterviewAvatar';
import { WebcamSimulator } from '../components/WebcamSimulator';
import { StorageService } from '../services/storageService';
import { 
  Mic, 
  MicOff, 
  RotateCcw, 
  Clock, 
  Sparkles, 
  FileText, 
  Star, 
  ChevronRight,
  Code2,
  Zap,
  ArrowRight
} from 'lucide-react';

export function InterviewRoomPage({ setCurrentPage }) {
  const { 
    activeSession, 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    submitAnswer, 
    completeInterview 
  } = useInterview();

  const { user } = useAuth();
  const resumeData = StorageService.getResumeData();

  // 5 Resume-Driven Questions Pool
  const defaultResumeQuestions = [
    {
      id: "res-q1",
      question: `I see from your profile and resume that your core skills include ${user?.skills?.slice(0, 3)?.join(', ') || 'Python and React'}. Can you explain an architectural challenge you solved using these technologies?`,
      category: "Resume Skills Deep Dive",
      keywords: ["architecture", "api", "database", "latency", "scale", "performance", "component"],
      modelAnswer: "In my project, I designed a microservice architecture using connection pooling and Redis caching, which reduced average response latency by 40% and maintained high availability under load."
    },
    {
      id: "res-q2",
      question: "Walk me through one of the major projects listed on your resume. What was your individual contribution and how did you handle state or data management?",
      category: "Resume Project Architecture",
      keywords: ["project", "contribution", "state", "database", "redux", "context", "queries", "backend"],
      modelAnswer: "I owned the end-to-end backend and API integration, establishing normalized relational schemas and implementing global state management with automated error boundary recovery."
    },
    {
      id: "res-q3",
      question: "In your resume projects, how did you ensure security, input validation, and user authentication?",
      category: "Security & Validation",
      keywords: ["auth", "jwt", "cookie", "httponly", "validation", "sanitize", "csrf", "xss"],
      modelAnswer: "We implemented JWT authentication stored securely in HttpOnly SameSite cookies, combined with schema validation middleware (Pydantic/Joi) to sanitize payloads and prevent injection attacks."
    },
    {
      id: "res-q4",
      question: "Describe a technical obstacle or critical bug you encountered during development. How did you debug the root cause?",
      category: "Problem Solving & Debugging",
      keywords: ["bug", "logs", "debug", "root cause", "fix", "testing", "deadlock", "memory"],
      modelAnswer: "I isolated the issue using structured server logs, identified an asynchronous race condition in the database transaction, resolved it using optimistic locking, and added automated unit tests."
    },
    {
      id: "res-q5",
      question: "How did you manage CI/CD pipelines, automated testing, and deployment for your listed projects?",
      category: "DevOps & Quality",
      keywords: ["git", "github actions", "docker", "pipeline", "ci/cd", "unit test", "deploy", "cloud"],
      modelAnswer: "We configured GitHub Actions workflows that automatically executed test suites on pull requests and built containerized Docker images deployed to cloud environments with zero downtime."
    }
  ];

  const questionsList = (activeSession?.questions && activeSession.questions.length >= 5)
    ? activeSession.questions.slice(0, 5)
    : defaultResumeQuestions;

  const totalQuestions = 5;
  const currentQuestion = questionsList[currentQuestionIndex] || questionsList[0];

  const [userAnswerText, setUserAnswerText] = useState("");
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [avatarState, setAvatarState] = useState("idle");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentStarAwarded, setCurrentStarAwarded] = useState(null); // 'gold' or 'red'
  
  // 5-Star state tracking
  const [stars, setStars] = useState([null, null, null, null, null]);

  const timerRef = useRef(null);

  // Auto-speak question on index change
  useEffect(() => {
    setUserAnswerText("");
    setCurrentStarAwarded(null);
    setTimerSeconds(0);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);

    setIsAiSpeaking(true);
    setAvatarState("speaking");
    speechService.speak(
      currentQuestion.question,
      () => {
        setIsAiSpeaking(true);
        setAvatarState("speaking");
      },
      () => {
        setIsAiSpeaking(false);
        setAvatarState("idle");
      }
    );

    return () => {
      clearInterval(timerRef.current);
      speechService.stopSpeaking();
      speechService.stopListening();
    };
  }, [currentQuestionIndex]);

  const toggleRecording = () => {
    if (isRecordingMic) {
      speechService.stopListening();
      setIsRecordingMic(false);
      setAvatarState("idle");
    } else {
      speechService.stopSpeaking();
      setIsAiSpeaking(false);
      setAvatarState("listening");

      const success = speechService.startListening(
        (transcript) => {
          setUserAnswerText(transcript);
        },
        (status) => {
          setIsRecordingMic(status);
          if (!status) setAvatarState("idle");
        },
        (error) => {
          console.warn("STT Error:", error);
          setIsRecordingMic(false);
          setAvatarState("idle");
        }
      );

      if (success) setIsRecordingMic(true);
    }
  };

  const handleReplayQuestion = () => {
    speechService.stopSpeaking();
    speechService.speak(
      currentQuestion.question,
      () => {
        setIsAiSpeaking(true);
        setAvatarState("speaking");
      },
      () => {
        setIsAiSpeaking(false);
        setAvatarState("idle");
      }
    );
  };

  const handleSubmitAnswer = () => {
    if (!userAnswerText.trim()) return;

    if (isRecordingMic) {
      speechService.stopListening();
      setIsRecordingMic(false);
    }

    setIsEvaluating(true);
    setAvatarState("evaluating");

    setTimeout(() => {
      const lower = userAnswerText.toLowerCase();
      const kw = currentQuestion.keywords || ["architecture", "project", "code"];
      const matched = kw.filter(k => lower.includes(k));
      const wordCount = userAnswerText.split(/\s+/).filter(Boolean).length;
      
      const isCorrect = (matched.length >= 1 && wordCount >= 15) || wordCount >= 28;

      // Award Star: Gold Star if correct, Red Star if inadequate
      const starColor = isCorrect ? "gold" : "red";
      const updatedStars = [...stars];
      updatedStars[currentQuestionIndex] = starColor;
      setStars(updatedStars);
      setCurrentStarAwarded(starColor);

      // Submit to context
      submitAnswer(currentQuestion.id, userAnswerText, timerSeconds);

      setIsEvaluating(false);
      setAvatarState("idle");
    }, 600);
  };

  const handleNextOrProceedToCoding = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Completed all 5 questions -> PROCEED DIRECTLY TO CODING ROUND (Feedback comes after coding)
      completeInterview();
      setCurrentPage('coding');
    }
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top 5-Star Progress HUD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl">
        
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-extrabold text-xs">
            Question {currentQuestionIndex + 1} of 5
          </span>
          <span className="text-xs text-slate-300 font-semibold">
            Resume-Based AI Voice Round
          </span>
        </div>

        {/* 5 Stars Rating Indicator */}
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-white/10">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase">Star Score:</span>
          {stars.map((star, i) => {
            const isCurrent = i === currentQuestionIndex;
            return (
              <div key={i} className="flex flex-col items-center">
                <Star
                  className={`w-6 h-6 transition-all duration-300 ${
                    star === 'gold'
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] scale-110'
                      : star === 'red'
                      ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] scale-110'
                      : isCurrent
                      ? 'text-slate-500 animate-pulse'
                      : 'text-slate-700'
                  }`}
                />
                <span className="text-[9px] font-bold mt-0.5 text-slate-500">Q{i + 1}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 4: AI Avatar + Webcam */}
        <div className="lg:col-span-4 space-y-4">
          <InterviewAvatar 
            state={avatarState} 
            isSpeaking={isAiSpeaking} 
            isListening={isRecordingMic} 
          />
          <WebcamSimulator />
        </div>

        {/* Right 8: Question, Voice Recorder, Star Feedback */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Question Box */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                {currentQuestion.category}
              </span>
              <button
                onClick={handleReplayQuestion}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Replay Question
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              "{currentQuestion.question}"
            </h2>
          </div>

          {/* Answer Area */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Your Spoken / Written Answer:
              </span>

              <button
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
                  isRecordingMic
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {isRecordingMic ? <><MicOff className="w-4 h-4" /> Stop Mic</> : <><Mic className="w-4 h-4" /> Speak via Mic</>}
              </button>
            </div>

            <textarea
              value={userAnswerText}
              onChange={(e) => setUserAnswerText(e.target.value)}
              placeholder="Speak using your microphone or type your detailed response here..."
              rows={5}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-white/10 text-slate-100 text-xs sm:text-sm font-sans focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-[11px] text-slate-400">
                Word Count: <strong className="text-white">{userAnswerText.split(/\s+/).filter(Boolean).length} words</strong>
              </span>

              {!currentStarAwarded ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={isEvaluating || !userAnswerText.trim()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  {isEvaluating ? (
                    <><Sparkles className="w-3.5 h-3.5 animate-spin" /> Evaluating...</>
                  ) : (
                    <><Zap className="w-3.5 h-3.5" /> Submit Answer</>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleNextOrProceedToCoding}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:brightness-110 text-white font-bold text-xs shadow-md flex items-center gap-2"
                >
                  {currentQuestionIndex + 1 < totalQuestions ? (
                    <>Next Question ({currentQuestionIndex + 2}/5) <ChevronRight className="w-4 h-4" /></>
                  ) : (
                    <>Proceed to Live Coding Round (Step 4) <Code2 className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Star Awarded Alert */}
          {currentStarAwarded && (
            <div className={`p-4 rounded-2xl border flex items-center justify-between animate-fadeIn ${
              currentStarAwarded === 'gold' 
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' 
                : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs">
                <Star className={`w-5 h-5 ${currentStarAwarded === 'gold' ? 'text-amber-400 fill-amber-400' : 'text-rose-500 fill-rose-500'}`} />
                <span>
                  {currentStarAwarded === 'gold' 
                    ? "Gold Star Awarded! ⭐ (Good Answer)" 
                    : "Red Star Awarded 🔴 (Inadequate Detail)"}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {currentQuestionIndex + 1 < totalQuestions ? "Click 'Next Question' to continue" : "Click 'Proceed to Live Coding'"}
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
