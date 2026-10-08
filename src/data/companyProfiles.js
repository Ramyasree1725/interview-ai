export const COMPANY_PROFILES = [
  {
    id: "google",
    name: "Google",
    logoText: "G",
    tagline: "Organizing world's information with high-scale algorithms & engineering excellence.",
    color: "from-blue-500 via-red-500 to-yellow-500",
    focusAreas: ["Algorithms & Data Structures", "Distributed Systems", "Googleyness & Leadership", "Scalability"],
    rounds: [
      { name: "Online Assessment", desc: "2 Complex DSA questions (90 mins)" },
      { name: "Technical Round 1 & 2", desc: "Data structures, dynamic programming, graph traversal" },
      { name: "System Design", desc: "Scalable architecture (YouTube, Google Drive, Rate Limiter)" },
      { name: "Googleyness & Leadership", desc: "Ethical ambiguity, collaboration, working in scale" }
    ],
    typicalQuestions: [
      "Given a stream of words, find top K frequent elements in real-time.",
      "How would you design a distributed cache like Memcached?",
      "Tell me about a time you made an engineering decision under ambiguity."
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logoText: "A",
    tagline: "Customer obsession and 16 Leadership Principles (LPs).",
    color: "from-amber-500 to-orange-600",
    focusAreas: ["16 Leadership Principles", "Object Oriented Design (LLD)", "High Throughput Microservices", "Data Structures"],
    rounds: [
      { name: "Online Coding Test", desc: "DSA + Amazon LP Work Style Assessment" },
      { name: "Technical Rounds", desc: "Low Level Design (Parking Lot, Vending Machine) + DSA" },
      { name: "System Design", desc: "E-Commerce checkout, flash sale, package delivery tracker" },
      { name: "The Bar Raiser Round", desc: "Deep STAR evaluation against Leadership Principles" }
    ],
    typicalQuestions: [
      "Tell me about a time when you had to make a trade-off between speed and quality (Bias for Action vs High Standards).",
      "Design an Amazon Locker Delivery System.",
      "Given a binary tree, serialize and deserialize it efficiently."
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logoText: "MS",
    tagline: "Growth mindset, cloud-native services (Azure), and robust engineering.",
    color: "from-sky-500 to-blue-700",
    focusAreas: ["Clean Code & Edge Cases", "Concurrency & Threading", "Growth Mindset", "Cloud Architecture"],
    rounds: [
      { name: "Codility Assessment", desc: "Arrays, Trees, Strings" },
      { name: "Technical Round 1 & 2", desc: "Tree traversals, matrix manipulation, OOP refactoring" },
      { name: "System Design", desc: "Designing MS Teams chat, OneDrive sync engine" },
      { name: "As Appropriate (AA / Hiring Manager)", desc: "Cultural fit, architectural philosophies" }
    ],
    typicalQuestions: [
      "Design a real-time collaborative document editor like MS Word Online.",
      "Implement LRU Cache with $O(1)$ get and put operations.",
      "Tell me about a time you handled a critical bug in production."
    ]
  },
  {
    id: "tcs-infosys",
    name: "TCS / Infosys (Digital & Prime)",
    logoText: "TI",
    tagline: "Core technical aptitude, foundational programming, OOPs, DBMS, and communication.",
    color: "from-teal-500 to-emerald-600",
    focusAreas: ["Java / Python Fundamentals", "SQL Queries & Normalization", "OOP Principles", "Project Architecture Walkthrough"],
    rounds: [
      { name: "National Qualifier Test (NQT)", desc: "Quantitative Aptitude, Logical Reasoning & Coding" },
      { name: "Technical Interview", desc: "Core subjects: OS, DBMS, Networks, Final Year Project deep-dive" },
      { name: "Managerial & HR Round", desc: "Relocation readiness, shift flexibility, communication clarity" }
    ],
    typicalQuestions: [
      "Explain 3NF Normalization in DBMS with an example.",
      "What is the difference between `abstract class` and `interface` in Java?",
      "Walk me through your academic project architecture and your individual contribution."
    ]
  }
];
