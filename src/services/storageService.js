// LocalStorage & Session State Persistence

const STORAGE_KEYS = {
  USER_PROFILE: "aic_user_profile",
  INTERVIEW_HISTORY: "aic_interview_history",
  RESUME_DATA: "aic_resume_data",
  USER_BADGES: "aic_user_badges",
  USER_STATS: "aic_user_stats",
  CUSTOM_QUESTIONS: "aic_custom_questions"
};

const DEFAULT_PROFILE = {
  id: "usr_demo_1",
  name: "Ramya Sri",
  email: "ramyasri@example.com",
  phone: "+91 98765 43210",
  targetJob: "Full Stack Developer",
  experienceLevel: "intermediate",
  education: "B.Tech Computer Science",
  college: "JNTU Hyderabad",
  skills: ["Python", "React", "JavaScript", "SQL", "REST APIs", "Git", "Docker"],
  github: "https://github.com/ramyasri",
  linkedin: "https://linkedin.com/in/ramyasri",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  streakDays: 4,
  xpPoints: 1250,
  level: 3
};

const DEFAULT_HISTORY = [
  {
    id: "int_sample_1",
    date: "2026-10-06T10:30:00Z",
    jobRole: "Python Developer",
    interviewType: "technical",
    difficulty: "intermediate",
    duration: 18,
    overallScore: 84,
    metrics: {
      technical: 88,
      communication: 79,
      confidence: 82,
      relevance: 91,
      clarity: 79,
      completeness: 83
    },
    totalQuestions: 5,
    status: "Completed",
    feedbackSummary: "Excellent grasp of Python memory internals, GIL, and OOPs. Can improve real-world decorator edge-case articulation."
  },
  {
    id: "int_sample_2",
    date: "2026-10-04T15:20:00Z",
    jobRole: "Full Stack Developer",
    interviewType: "mixed",
    difficulty: "intermediate",
    duration: 25,
    overallScore: 89,
    metrics: {
      technical: 91,
      communication: 86,
      confidence: 88,
      relevance: 93,
      clarity: 85,
      completeness: 87
    },
    totalQuestions: 7,
    status: "Completed",
    feedbackSummary: "Great system architecture explanation and clear STAR behavioral presentation."
  }
];

export class StorageService {
  static getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  static saveUserProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }

  static getHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INTERVIEW_HISTORY);
      return data ? JSON.parse(data) : DEFAULT_HISTORY;
    } catch (e) {
      return DEFAULT_HISTORY;
    }
  }

  static saveInterviewResult(resultObj) {
    try {
      const history = this.getHistory();
      const updated = [resultObj, ...history];
      localStorage.setItem(STORAGE_KEYS.INTERVIEW_HISTORY, JSON.stringify(updated));

      // Update XP and Stats
      const profile = this.getUserProfile();
      profile.xpPoints = (profile.xpPoints || 0) + (resultObj.overallScore * 3);
      profile.streakDays = (profile.streakDays || 1) + 1;
      this.saveUserProfile(profile);

      return updated;
    } catch (e) {
      console.warn("Storage error", e);
      return [];
    }
  }

  static getResumeData() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  static saveResumeData(resumeObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(resumeObj));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }
}
