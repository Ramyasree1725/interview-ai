// AI Evaluation & Dynamic Question Generation Engine

export class AIEngine {
  /**
   * Evaluates user's answer against question rubric and keywords
   */
  static evaluateAnswer(questionObj, userAnswer, durationSeconds = 60) {
    if (!userAnswer || userAnswer.trim().length < 10) {
      return {
        overallScore: 35,
        metrics: {
          technical: 30,
          communication: 40,
          confidence: 35,
          relevance: 40,
          clarity: 35,
          completeness: 25
        },
        strengths: ["Attempted to answer the question."],
        improvements: [
          "Answer was too brief. Try elaborating with foundational definitions and structured examples.",
          "Include concrete technical terminology and trade-offs."
        ],
        modelAnswer: questionObj?.modelAnswer || "A complete, structured response with clear definitions, practical examples, and architecture trade-offs.",
        aiInsight: "Aim to structure your answers using the **Definition → How it Works → Example/Trade-off** format."
      };
    }

    const text = userAnswer.toLowerCase();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    
    // Keyword Matching
    const expectedKeywords = questionObj?.keywords || ["concept", "example", "tradeoff", "performance"];
    let matchedKeywords = [];
    expectedKeywords.forEach(kw => {
      if (text.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      }
    });

    const keywordMatchRatio = matchedKeywords.length / Math.max(expectedKeywords.length, 1);
    
    // Length & depth heuristic
    const lengthScore = Math.min(100, Math.round((wordCount / 70) * 100));
    
    // Calculate Multi-dimensional Scores
    const technical = Math.min(98, Math.max(45, Math.round(50 + (keywordMatchRatio * 45) + (lengthScore * 0.05))));
    const communication = Math.min(96, Math.max(50, Math.round(55 + (Math.min(wordCount, 120) / 120) * 40)));
    const relevance = Math.min(98, Math.max(50, Math.round(50 + (keywordMatchRatio * 48))));
    const clarity = Math.min(95, Math.max(52, Math.round(60 + (keywordMatchRatio * 20) + (lengthScore > 40 ? 15 : 0))));
    const completeness = Math.min(96, Math.max(40, Math.round(40 + (keywordMatchRatio * 40) + (lengthScore * 0.2))));
    const confidence = Math.min(95, Math.max(60, Math.round(65 + (durationSeconds > 15 && durationSeconds < 180 ? 25 : 10))));

    const overallScore = Math.round(
      (technical * 0.35) + 
      (communication * 0.20) + 
      (relevance * 0.15) + 
      (completeness * 0.15) + 
      (clarity * 0.10) + 
      (confidence * 0.05)
    );

    // Generate Dynamic Strengths
    const strengths = [];
    if (keywordMatchRatio >= 0.5) {
      strengths.push(`Strong domain knowledge covering key terms: ${matchedKeywords.slice(0, 3).join(", ")}.`);
    } else {
      strengths.push("Addressed the core intent of the question.");
    }
    if (wordCount >= 50) {
      strengths.push("Good depth and articulation without unnecessary rambling.");
    }
    if (confidence >= 75) {
      strengths.push("Delivered with professional confidence and clarity.");
    }
    if (strengths.length === 0) {
      strengths.push("Clear starting premise and positive communication tone.");
    }

    // Generate Actionable Improvements
    const improvements = [];
    const missingKeywords = expectedKeywords.filter(k => !matchedKeywords.includes(k));
    if (missingKeywords.length > 0) {
      improvements.push(`Consider mentioning: ${missingKeywords.slice(0, 3).join(", ")} to demonstrate comprehensive depth.`);
    }
    if (wordCount < 40) {
      improvements.push("Elaborate further with a concrete production example or project experience.");
    }
    if (technical < 75) {
      improvements.push("Clarify underlying internal mechanisms rather than only surface-level definitions.");
    }
    if (improvements.length === 0) {
      improvements.push("Discuss potential performance edge-cases and scale trade-offs for senior role calibration.");
    }

    let aiInsight = "";
    if (overallScore >= 85) {
      aiInsight = "Excellent response! You demonstrated Senior-level grasp. To make it unforgettable, mention high-concurrency benchmarks or edge-cases.";
    } else if (overallScore >= 70) {
      aiInsight = "Solid answer! Good conceptual grasp. Bolster it by explicitly highlighting why this architectural choice beats alternative designs.";
    } else {
      aiInsight = "Good attempt! Structure your future answer: 1) 1-sentence definition, 2) 2-3 key technical points, 3) 1 real-world example.";
    }

    return {
      overallScore,
      metrics: {
        technical,
        communication,
        confidence,
        relevance,
        clarity,
        completeness
      },
      matchedKeywords,
      missingKeywords,
      strengths,
      improvements,
      modelAnswer: questionObj?.modelAnswer || "Detailed architectural answer illustrating best practices.",
      aiInsight
    };
  }

  /**
   * Generates a context-aware follow-up question
   */
  static generateFollowUp(questionObj, lastEvaluation) {
    if (questionObj?.followUp) {
      return questionObj.followUp;
    }
    if (lastEvaluation?.overallScore >= 80) {
      return `That was a solid breakdown. How would your approach change if this system needed to scale to 10 million concurrent requests per day?`;
    } else {
      return `Could you share a specific practical example or project where you implemented or debugged this?`;
    }
  }

  /**
   * AI Career Assistant response generator
   */
  static generateCareerAdvice(userMessage, userProfile) {
    const msg = userMessage.toLowerCase();
    const role = userProfile?.targetJob || "Full Stack Developer";

    if (msg.includes("tell me about yourself") || msg.includes("introduce")) {
      return {
        reply: `Here is a winning **Present-Past-Future Formula** tailored for your **${role}** target role:

1. **Present (Where you shine now)**:
   > *"Currently, I focus on building responsive, scalable applications with clean architecture and modern tooling."*
2. **Past (Key achievements & foundations)**:
   > *"I have built real-world projects involving API integrations, database optimization, and intuitive UI/UX."*
3. **Future (Why this company)**:
   > *"I'm excited about this opportunity because your team works on cutting-edge systems where I can deliver immediate value and grow into a high-impact contributor."*

💡 **Pro Tip**: Keep it between 60–90 seconds. Don't recite your entire resume; emphasize your problem-solving mindset!`
      };
    }

    if (msg.includes("star") || msg.includes("behavioral") || msg.includes("conflict")) {
      return {
        reply: `Master the **STAR Method** for behavioral questions:

- **S - Situation**: Set the scene in 1–2 concise sentences.
- **T - Task**: What was the specific goal or crisis you were responsible for?
- **A - Action** *(Spend 60% of your time here)*: Exactly what decisions did YOU make? Which tools/strategies did you employ?
- **R - Result**: Quantify the impact! (*"Reduced load time by 35%"*, *"Delivered 3 days ahead of deadline"*).

Would you like to simulate a behavioral question right now?`
      };
    }

    if (msg.includes("salary") || msg.includes("negotiat")) {
      return {
        reply: `### Top 3 Rules for Tech Salary Negotiation:

1. **Do not give a single rigid number first**: Say *"Based on my skills, market benchmarks for a ${role}, and the scope of this role, I am targeting ₹X to ₹Y LPA, but I am open to discussing the total compensation package."*
2. **Focus on Total Rewards**: Consider base salary, bonuses, stock options (ESOPs), learning allowances, and remote flexibility.
3. **Leverage Competing Offers or Value Delivered**: Highlight how your proven projects save onboarding time and accelerate team velocity.`
      };
    }

    // Default intelligent mentoring response
    return {
      reply: `For your target role as a **${role}**, top tech interviewers prioritize 3 things:

1. **Depth over syntax**: Knowing *why* a particular data structure or framework is chosen over another.
2. **Communication & Trade-offs**: Talking out loud through your thought process and acknowledging edge cases.
3. **Project Ownership**: Being able to explain every single line and architecture decision in your resume projects.

You can try our **Resume Analyzer** or start a **10-minute AI Voice Simulation** anytime to get instant diagnostic scoring!`
    };
  }
}
