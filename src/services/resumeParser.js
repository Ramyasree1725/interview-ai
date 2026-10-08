// Resume Parser & ATS Matching Service

export class ResumeParser {
  static ALL_KNOWN_SKILLS = [
    "Python", "JavaScript", "TypeScript", "React", "Node.js", "Django", "FastAPI",
    "Flask", "Java", "Spring Boot", "C++", "SQL", "PostgreSQL", "MySQL", "MongoDB",
    "Redis", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "GitHub",
    "REST APIs", "GraphQL", "Microservices", "System Design", "HTML5", "CSS3",
    "Tailwind CSS", "Redux", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow",
    "Machine Learning", "Deep Learning", "NLP", "Power BI", "Tableau", "Linux",
    "CI/CD", "Kafka", "RabbitMQ", "Elasticsearch", "Next.js", "Express.js"
  ];

  /**
   * Parse resume plain text or file extraction
   */
  static parseResumeText(rawText, targetRole = "Full Stack Developer") {
    if (!rawText || rawText.trim().length === 0) {
      return null;
    }

    const text = rawText;
    const lowerText = text.toLowerCase();

    // 1. Skill Extraction
    const detectedSkills = [];
    this.ALL_KNOWN_SKILLS.forEach(skill => {
      // Regex check with word boundary
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(text)) {
        detectedSkills.push(skill);
      }
    });

    // 2. Experience Extraction
    let experienceYears = 1;
    const expMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s*)?experience/i) ||
                     text.match(/experience\s*:\s*(\d+)/i);
    if (expMatch && expMatch[1]) {
      experienceYears = parseInt(expMatch[1], 10);
    } else if (lowerText.includes("senior") || lowerText.includes("lead")) {
      experienceYears = 5;
    } else if (lowerText.includes("intern") || lowerText.includes("fresher") || lowerText.includes("student")) {
      experienceYears = 0;
    }

    // 3. Project Extraction heuristic
    const projectKeywords = ["project", "developed", "built", "implemented", "designed", "created", "architected"];
    const detectedProjects = [];
    const lines = text.split('\n');
    lines.forEach(line => {
      const trimLine = line.trim();
      if (trimLine.length > 20 && trimLine.length < 180) {
        if (projectKeywords.some(kw => trimLine.toLowerCase().includes(kw))) {
          if (detectedProjects.length < 4 && !detectedProjects.includes(trimLine)) {
            detectedProjects.push(trimLine.replace(/^[-*•\d.]\s*/, ''));
          }
        }
      }
    });

    // 4. Education Extraction
    let education = "Bachelor of Technology / Computer Science";
    if (lowerText.includes("master") || lowerText.includes("m.tech") || lowerText.includes("ms")) {
      education = "Master of Science / M.Tech in CS";
    } else if (lowerText.includes("bca") || lowerText.includes("mca")) {
      education = "BCA / MCA Computer Applications";
    } else if (lowerText.includes("b.tech") || lowerText.includes("b.e") || lowerText.includes("bachelor")) {
      education = "B.Tech / B.E in Engineering";
    }

    // 5. Target Role Matching & Missing Skills
    const targetSkillRequirements = {
      "Full Stack Developer": ["React", "Node.js", "REST APIs", "SQL", "MongoDB", "Git", "Docker"],
      "Python Developer": ["Python", "Django", "FastAPI", "SQL", "Git", "REST APIs", "Docker"],
      "Frontend Developer": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Git"],
      "Backend Developer": ["Node.js", "Java", "Python", "SQL", "PostgreSQL", "Docker", "REST APIs", "Microservices"],
      "Data Scientist": ["Python", "Machine Learning", "Pandas", "NumPy", "SQL", "Scikit-Learn", "Deep Learning"],
      "Data Analyst": ["SQL", "Python", "Power BI", "Tableau", "Pandas"],
      "Java Developer": ["Java", "Spring Boot", "SQL", "Microservices", "Git", "Docker"]
    };

    const targetList = targetSkillRequirements[targetRole] || targetSkillRequirements["Full Stack Developer"];
    const matchedTargetSkills = targetList.filter(req => detectedSkills.some(s => s.toLowerCase() === req.toLowerCase()));
    const missingSkills = targetList.filter(req => !detectedSkills.some(s => s.toLowerCase() === req.toLowerCase()));

    const skillsMatchPercent = Math.min(100, Math.round((matchedTargetSkills.length / targetList.length) * 100));
    
    // Calculate ATS Score Components
    const formattingScore = 92;
    const projectScore = detectedProjects.length >= 2 ? 88 : 70;
    const experienceScore = Math.min(95, 70 + (experienceYears * 5));
    const overallResumeScore = Math.round(
      (skillsMatchPercent * 0.40) +
      (projectScore * 0.25) +
      (formattingScore * 0.20) +
      (experienceScore * 0.15)
    );

    // Custom tailored interview questions based on parsed resume
    const generatedQuestions = [
      {
        id: `custom-res-1`,
        question: `I noticed you have experience with ${detectedSkills.slice(0, 3).join(", ") || "core web technologies"}. Can you walk me through an architectural challenge you solved using them?`,
        category: "Resume Deep Dive",
        keywords: detectedSkills.slice(0, 4),
        rubric: {
          technical: "Demonstrates deep hands-on mastery of claimed technologies.",
          clarity: "Explains architecture trade-offs clearly."
        },
        modelAnswer: `In my project, I utilized ${detectedSkills[0] || "modern frameworks"} to handle asynchronous data streaming, optimizing client-server latency by 35% through connection pooling and caching.`
      },
      {
        id: `custom-res-2`,
        question: `In your projects, how did you ensure test coverage, CI/CD integration, and zero-downtime deployment?`,
        category: "DevOps & Quality",
        keywords: ["testing", "CI/CD", "docker", "pipeline", "unit tests"],
        rubric: {
          technical: "Discusses unit testing (Jest/PyTest) and automated deployment pipelines.",
          clarity: "Clear explanation of release safety."
        },
        modelAnswer: "We set up automated GitHub Actions running unit and integration test suites on every pull request, deploying containerized Docker images to cloud servers with blue-green rolling deployments."
      }
    ];

    if (detectedProjects.length > 0) {
      generatedQuestions.unshift({
        id: `custom-res-0`,
        question: `Could you give an in-depth breakdown of your project: "${detectedProjects[0]}"? What was your specific architectural contribution and what tech trade-offs did you make?`,
        category: "Project Deep Dive",
        keywords: ["architecture", "scale", "database", "contribution", "challenges"],
        rubric: {
          technical: "Clearly defines individual role, system topology, and lessons learned.",
          clarity: "High impact technical narrative."
        },
        modelAnswer: "In this project, I owned the backend service architecture and database schema design, selecting a distributed cache to handle burst traffic while maintaining strict ACID compliance for user records."
      });
    }

    return {
      rawText,
      detectedSkills,
      detectedProjects,
      experienceYears,
      education,
      skillsMatchPercent,
      missingSkills,
      matchedTargetSkills,
      scores: {
        overall: overallResumeScore,
        skillsMatch: skillsMatchPercent,
        projects: projectScore,
        experience: experienceScore,
        formatting: formattingScore
      },
      generatedQuestions,
      parsedAt: new Date().toISOString()
    };
  }

  static getSampleResume() {
    return `JOHN DOE
Full Stack Software Engineer | Hyderabad, India | johndoe@example.com | +91 9876543210
GitHub: github.com/johndoe | LinkedIn: linkedin.com/in/johndoe

SUMMARY:
Results-driven Full Stack Developer with 2+ years of experience in designing, building, and deploying scalable web applications using React, Node.js, Python, PostgreSQL, and Docker.

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, SQL, HTML5, CSS3
- Frontend: React.js, Next.js, Redux, Tailwind CSS
- Backend: Node.js, Express.js, FastAPI, REST APIs, GraphQL
- Databases: PostgreSQL, MongoDB, Redis
- Tools & Cloud: Docker, Git, GitHub, AWS (S3, EC2), Linux, CI/CD

EXPERIENCE:
Software Engineer | TechNova Solutions | 2023 - Present
- Developed high-throughput microservices using Node.js and PostgreSQL, serving 500k+ monthly active users.
- Built reusable React components and improved web vitals, reducing page load time by 42%.
- Integrated Redis caching layer for top queried API routes, slashing database latency from 240ms to 18ms.

PROJECTS:
1. Real-Time Collaborative Workspace: Developed a WebSocket-powered collaborative document editor using React, Node.js, and Redis Pub/Sub with live cursor tracking.
2. AI-Powered Smart Analytics Dashboard: Implemented predictive charts using Python, FastAPI, and PostgreSQL with JWT-based RBAC authentication.

EDUCATION:
Bachelor of Technology in Computer Science & Engineering (2019 - 2023)
CGPA: 8.8 / 10`;
  }
}
