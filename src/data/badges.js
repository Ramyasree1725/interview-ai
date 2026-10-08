export const BADGES_LIST = [
  {
    id: "first_interview",
    title: "First Step Taken",
    description: "Completed your first AI interview session.",
    icon: "Rocket",
    color: "from-blue-500 to-indigo-600",
    unlockedAt: "1st Interview",
    xpReward: 100
  },
  {
    id: "streak_3",
    title: "On Fire (3 Days)",
    description: "Maintained a 3-day continuous practice streak.",
    icon: "Flame",
    color: "from-amber-500 to-orange-600",
    unlockedAt: "3 Days",
    xpReward: 250
  },
  {
    id: "score_90",
    title: "Elite Performer (90%+)",
    description: "Achieved an overall interview score of 90 or above.",
    icon: "Trophy",
    color: "from-emerald-500 to-teal-600",
    unlockedAt: "Score >= 90",
    xpReward: 500
  },
  {
    id: "tech_master",
    title: "Technical Titan",
    description: "Scored 95%+ in technical knowledge round.",
    icon: "Cpu",
    color: "from-purple-500 to-pink-600",
    unlockedAt: "Tech Score >= 95",
    xpReward: 350
  },
  {
    id: "voice_champion",
    title: "Voice Orator",
    description: "Completed an entire interview using speech voice input.",
    icon: "Mic",
    color: "from-rose-500 to-red-600",
    unlockedAt: "100% Voice Mode",
    xpReward: 300
  },
  {
    id: "code_ninja",
    title: "Algorithm Ninja",
    description: "Passed all test cases on first submission in Live Coding.",
    icon: "Terminal",
    color: "from-cyan-500 to-blue-600",
    unlockedAt: "100% Testcases Pass",
    xpReward: 400
  }
];

export const USER_LEVELS = [
  { level: 1, title: "Aspiring Candidate", minXp: 0, maxXp: 300 },
  { level: 2, title: "Interview Apprentice", minXp: 300, maxXp: 800 },
  { level: 3, title: "Skilled Practitioner", minXp: 800, maxXp: 1500 },
  { level: 4, title: "Senior Interviewee", minXp: 1500, maxXp: 3000 },
  { level: 5, title: "Staff Tech Master", minXp: 3000, maxXp: 6000 }
];
