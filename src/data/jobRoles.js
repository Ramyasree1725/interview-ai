export const JOB_ROLES = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Engineering",
    icon: "Layers",
    color: "from-blue-500 to-indigo-600",
    description: "Build end-to-end web applications combining modern frontend frameworks and robust backend services.",
    popular: true,
    avgSalary: "₹8 - ₹24 LPA",
    requiredSkills: ["React", "Node.js", "JavaScript", "TypeScript", "REST APIs", "SQL", "MongoDB", "Git", "Docker", "System Design"],
    interviewTypes: ["Technical", "System Design", "HR", "Live Coding", "Resume Based"],
    sampleQuestionsCount: 45
  },
  {
    id: "python-developer",
    title: "Python Developer",
    category: "Backend & Scripting",
    icon: "Code2",
    color: "from-amber-500 to-yellow-600",
    description: "Design APIs, microservices, automation scripts, and scalable backend pipelines using Python.",
    popular: true,
    avgSalary: "₹6 - ₹20 LPA",
    requiredSkills: ["Python", "Django", "Flask", "FastAPI", "PostgreSQL", "OOPs", "Multithreading", "Celery", "Redis", "Unit Testing"],
    interviewTypes: ["Technical", "Data Structures", "HR", "Coding", "Resume Based"],
    sampleQuestionsCount: 40
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Web Development",
    icon: "Layout",
    color: "from-cyan-500 to-blue-600",
    description: "Craft responsive, interactive, high-performance user interfaces with clean architecture and modern UX.",
    popular: true,
    avgSalary: "₹6 - ₹18 LPA",
    requiredSkills: ["React", "JavaScript (ES6+)", "HTML5/CSS3", "Tailwind CSS", "Redux/Zustand", "Next.js", "Web Performance", "TypeScript"],
    interviewTypes: ["Technical", "UI Machine Coding", "HR", "Resume Based"],
    sampleQuestionsCount: 38
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Engineering",
    icon: "Server",
    color: "from-emerald-500 to-teal-600",
    description: "Architect high-throughput database systems, distributed microservices, and secure APIs.",
    popular: true,
    avgSalary: "₹7 - ₹22 LPA",
    requiredSkills: ["Java / Node.js / Go", "Microservices", "PostgreSQL", "Kafka", "Redis", "Docker", "Kubernetes", "Authentication (JWT/OAuth)"],
    interviewTypes: ["Technical", "System Design", "Coding", "HR"],
    sampleQuestionsCount: 36
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    category: "Data & Analytics",
    icon: "BarChart3",
    color: "from-purple-500 to-pink-600",
    description: "Transform complex business datasets into actionable insights, dashboards, and growth metrics.",
    popular: false,
    avgSalary: "₹5 - ₹16 LPA",
    requiredSkills: ["SQL", "Python", "Power BI", "Tableau", "Excel / Sheets", "Statistics", "Pandas", "Data Cleaning"],
    interviewTypes: ["Technical", "SQL Live Coding", "Case Study", "HR"],
    sampleQuestionsCount: 32
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "AI & Data Science",
    icon: "BrainCircuit",
    color: "from-violet-500 to-purple-600",
    description: "Build predictive models, machine learning algorithms, and deep analytics pipelines.",
    popular: true,
    avgSalary: "₹9 - ₹28 LPA",
    requiredSkills: ["Python", "Scikit-Learn", "Machine Learning", "Deep Learning", "TensorFlow/PyTorch", "NLP", "Feature Engineering", "Math & Probability"],
    interviewTypes: ["Technical", "ML Theory & Math", "Coding", "HR"],
    sampleQuestionsCount: 35
  },
  {
    id: "java-developer",
    title: "Java Developer",
    category: "Enterprise Software",
    icon: "Coffee",
    color: "from-orange-500 to-red-600",
    description: "Develop enterprise-grade, multi-threaded enterprise backends using Java and Spring Boot ecosystem.",
    popular: true,
    avgSalary: "₹6 - ₹20 LPA",
    requiredSkills: ["Java (8/11/17)", "Spring Boot", "Hibernate/JPA", "Microservices", "Multithreading", "Design Patterns", "SQL", "Kafka"],
    interviewTypes: ["Technical", "OOP & Multithreading", "Coding", "HR"],
    sampleQuestionsCount: 35
  },
  {
    id: "devops-cloud-engineer",
    title: "DevOps & Cloud Engineer",
    category: "Cloud Infrastructure",
    icon: "CloudCog",
    color: "from-sky-500 to-indigo-600",
    description: "Automate CI/CD pipelines, container orchestration, and cloud infrastructure monitoring.",
    popular: false,
    avgSalary: "₹8 - ₹25 LPA",
    requiredSkills: ["AWS / Azure", "Docker", "Kubernetes", "Terraform", "CI/CD (GitHub Actions / Jenkins)", "Linux Shell", "Prometheus", "Nginx"],
    interviewTypes: ["Technical", "Architecture & Debugging", "HR"],
    sampleQuestionsCount: 30
  },
  {
    id: "hr-behavioral-all",
    title: "HR & Behavioral Master",
    category: "General Interview",
    icon: "Users2",
    color: "from-rose-500 to-pink-600",
    description: "Master STAR method storytelling, behavioral scenarios, conflict resolution, leadership, and culture fit.",
    popular: true,
    avgSalary: "Applicable to all roles",
    requiredSkills: ["Communication", "STAR Method", "Conflict Management", "Leadership", "Teamwork", "Career Vision", "Work Ethic"],
    interviewTypes: ["HR", "Behavioral", "Situational", "Leadership"],
    sampleQuestionsCount: 50
  }
];

export const INTERVIEW_TYPES = [
  { id: "technical", label: "Technical Deep Dive", icon: "Cpu", desc: "Core computer science, syntax, frameworks, and architecture." },
  { id: "hr", label: "HR & Behavioral", icon: "UserCheck", desc: "Behavioral questions, culture fit, situation handling (STAR format)." },
  { id: "mixed", label: "Comprehensive (Mixed)", icon: "Compass", desc: "Balanced mix of technical knowledge, problem-solving, and HR." },
  { id: "resume-based", label: "Resume-Driven", icon: "FileText", desc: "Questions drilled specifically into your listed projects and skills." },
  { id: "coding", label: "Live Coding Sandbox", icon: "Terminal", desc: "Data structures, algorithms, and practical problem solving." }
];

export const DIFFICULTY_LEVELS = [
  { id: "beginner", label: "Entry Level / Fresher", badge: "0 - 1 Years", color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" },
  { id: "intermediate", label: "Mid-Level Professional", badge: "2 - 4 Years", color: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
  { id: "advanced", label: "Senior / Lead Architect", badge: "5+ Years", color: "text-rose-400 border-rose-500/30 bg-rose-500/10" }
];

export const DURATION_OPTIONS = [
  { minutes: 10, questions: 4, label: "Quick Warmup (10m • 4 Qs)" },
  { minutes: 20, questions: 7, label: "Standard Round (20m • 7 Qs)" },
  { minutes: 30, questions: 10, label: "Full Simulation (30m • 10 Qs)" },
  { minutes: 45, questions: 14, label: "Intensive Panel (45m • 14 Qs)" }
];
