import React, { createContext, useContext, useState } from 'react';
import { QUESTION_BANK } from '../data/mockQuestions';
import { AIEngine } from '../services/aiEngine';
import { StorageService } from '../services/storageService';

const InterviewContext = createContext();

export function InterviewProvider({ children }) {
  const [activeSession, setActiveSession] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [sessionResults, setSessionResults] = useState(null);

  /**
   * Start a new interview session with rich multi-question pool
   */
  const startSession = (config, customQuestions = null) => {
    let questions = [];

    if (customQuestions && customQuestions.length > 0) {
      questions = [...customQuestions];
    } else {
      const roleKey = config.jobRole || "python-developer";
      const diffKey = config.difficulty || "beginner";
      const targetCount = config.questionsCount || 5;

      // Gather questions from primary role pool
      const roleQuestions = [
        ...(QUESTION_BANK[roleKey]?.[diffKey] || []),
        ...(QUESTION_BANK[roleKey]?.beginner || []),
        ...(QUESTION_BANK[roleKey]?.intermediate || []),
        ...(QUESTION_BANK[roleKey]?.advanced || [])
      ];

      // Fallback full stack pool
      const fallbackTech = [
        ...(QUESTION_BANK["full-stack-developer"]?.beginner || []),
        ...(QUESTION_BANK["full-stack-developer"]?.intermediate || [])
      ];

      const hrPool = QUESTION_BANK["hr-behavioral-all"]?.beginner || [];

      if (config.interviewType === "hr") {
        questions = [...hrPool];
      } else if (config.interviewType === "mixed") {
        const techHalf = Math.ceil(targetCount / 2);
        const hrHalf = Math.floor(targetCount / 2);
        questions = [
          ...roleQuestions.slice(0, techHalf),
          ...hrPool.slice(0, hrHalf)
        ];
      } else {
        // Technical or default: combine role questions + fallback tech questions
        questions = [...roleQuestions, ...fallbackTech];
      }

      // De-duplicate questions by id
      const uniqueMap = new Map();
      questions.forEach(q => {
        if (!uniqueMap.has(q.id)) uniqueMap.set(q.id, q);
      });
      questions = Array.from(uniqueMap.values());
    }

    const sessionObj = {
      id: `int_${Date.now()}`,
      config,
      questions: questions.slice(0, Math.max(config.questionsCount || 5, 4)),
      startTime: new Date().toISOString(),
      status: "in-progress"
    };

    setActiveSession(sessionObj);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setEvaluations({});
    setSessionResults(null);
    return sessionObj.id;
  };

  /**
   * Submit answer for current question and get AI evaluation + dynamic follow-up
   */
  const submitAnswer = (questionId, userAnswerText, durationSeconds = 45) => {
    const currentQ = activeSession.questions[currentQuestionIndex];
    const evaluation = AIEngine.evaluateAnswer(currentQ, userAnswerText, durationSeconds);
    
    const updatedAnswers = {
      ...answers,
      [questionId]: {
        text: userAnswerText,
        durationSeconds,
        timestamp: new Date().toISOString()
      }
    };

    const updatedEvaluations = {
      ...evaluations,
      [questionId]: evaluation
    };

    setAnswers(updatedAnswers);
    setEvaluations(updatedEvaluations);

    return evaluation;
  };

  /**
   * Finalize the entire interview and compute final scorecard
   */
  const completeInterview = () => {
    if (!activeSession) return null;

    const totalQuestions = activeSession.questions.length;
    const answeredCount = Object.keys(evaluations).length;

    let sumTech = 0, sumComm = 0, sumConf = 0, sumRel = 0, sumClar = 0, sumComp = 0, sumOverall = 0;

    Object.values(evaluations).forEach(ev => {
      sumTech += ev.metrics.technical;
      sumComm += ev.metrics.communication;
      sumConf += ev.metrics.confidence;
      sumRel += ev.metrics.relevance;
      sumClar += ev.metrics.clarity;
      sumComp += ev.metrics.completeness;
      sumOverall += ev.overallScore;
    });

    const count = Math.max(answeredCount, 1);
    const avgOverall = Math.round(sumOverall / count);
    const avgTech = Math.round(sumTech / count);
    const avgComm = Math.round(sumComm / count);
    const avgConf = Math.round(sumConf / count);
    const avgRel = Math.round(sumRel / count);
    const avgClar = Math.round(sumClar / count);
    const avgComp = Math.round(sumComp / count);

    const resultObj = {
      id: activeSession.id,
      date: new Date().toISOString(),
      jobRole: activeSession.config.jobRoleTitle || "Software Engineer",
      interviewType: activeSession.config.interviewType || "technical",
      difficulty: activeSession.config.difficulty || "intermediate",
      duration: Math.round((Date.now() - new Date(activeSession.startTime).getTime()) / 60000) || 15,
      overallScore: avgOverall,
      metrics: {
        technical: avgTech,
        communication: avgComm,
        confidence: avgConf,
        relevance: avgRel,
        clarity: avgClar,
        completeness: avgComp
      },
      totalQuestions,
      answeredCount,
      questions: activeSession.questions,
      answers,
      evaluations,
      status: "Completed",
      feedbackSummary: avgOverall >= 85 
        ? "Superb overall performance! Ready for top tier tech interviews with outstanding technical depth."
        : avgOverall >= 70
        ? "Strong foundational competence with good communication. Polish framework edge cases."
        : "Good practice run! Follow the recommended 5-day study plan to reinforce technical fundamentals."
    };

    setSessionResults(resultObj);
    StorageService.saveInterviewResult(resultObj);
    return resultObj;
  };

  return (
    <InterviewContext.Provider value={{
      activeSession,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      answers,
      evaluations,
      isRecording,
      setIsRecording,
      sessionResults,
      setSessionResults,
      startSession,
      submitAnswer,
      completeInterview
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export function useInterview() {
  return useContext(InterviewContext);
}
