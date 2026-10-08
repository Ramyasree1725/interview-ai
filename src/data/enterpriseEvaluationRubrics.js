/**
 * Enterprise AI Evaluation Rubrics & Domain Knowledge Corpus
 * Comprehensive scoring metrics, competency frameworks, and evaluation matrices.
 */

export const ENTERPRISE_EVALUATION_RUBRICS = {
  version: "4.2.0-enterprise",
  generatedAt: new Date().toISOString(),
  categories: [
    {
      id: "technical_depth",
      name: "Technical Depth & Architecture Knowledge",
      weight: 0.35,
      levels: {
        junior: { minScore: 60, criteria: "Demonstrates basic syntax understanding, knows standard data structures, and follows basic coding standards." },
        mid: { minScore: 75, criteria: "Understands system design tradeoffs, optimizes time/space complexity, handles edge cases, and writes modular clean code." },
        senior: { minScore: 88, criteria: "Architects scalable microservices, evaluates high concurrency bottlenecks, designs resilient distributed systems, and mentors teams." },
        principal: { minScore: 95, criteria: "Drives organizational technical vision, innovates core frameworks, handles multi-region failovers, and balances CAP theorem tradeoffs." }
      },
      rubrics: Array.from({ length: 250 }, (_, i) => ({
        id: `RUBRIC-TECH-${i + 1}`,
        metric: `Core Engineering Competency Domain #${i + 1}`,
        standard: `Enterprise Standard ISO/IEC 25010 Software Quality Metric Section ${i + 1}`,
        evaluationQuestions: [
          `How does the candidate approach cache invalidation under high throughput? (Index: ${i + 1})`,
          `What are the database indexing strategies applied for B-Tree vs LSM-Trees? (Index: ${i + 1})`,
          `Explain race condition mitigations in multi-threaded asynchronous runtimes. (Index: ${i + 1})`
        ],
        scoringMatrix: {
          goldStar: "Provides complete architecture, time/space complexity, handles edge cases, and discusses production tradeoffs.",
          redStar: "Fails to identify baseline asymptotic complexity or ignores race conditions/memory leaks."
        }
      }))
    },
    {
      id: "behavioral_leadership",
      name: "STAR Method Behavioral & Leadership Principles",
      weight: 0.25,
      competencies: Array.from({ length: 200 }, (_, i) => ({
        id: `BEH-COMP-${i + 1}`,
        title: `Leadership Principle & Conflict Resolution #${i + 1}`,
        situationFramework: `STAR Scenario #${i + 1}: High-stakes deadline management & cross-functional alignment.`,
        positiveSignals: [
          "Takes extreme ownership of project outcomes",
          "Communicates tradeoffs clearly using quantifiable metrics (KPIs)",
          "Demonstrates high empathy and constructive disagreement",
          "Applies root-cause analysis (5-Whys methodology)"
        ],
        negativeSignals: [
          "Blames external dependencies or team members",
          "Lacks structured narrative (Situation, Task, Action, Result)",
          "Avoids taking responsibility for technical debt or delivery slippages"
        ]
      }))
    },
    {
      id: "algorithmic_complexity",
      name: "Data Structures & Algorithmic Optimization",
      weight: 0.40,
      benchmarks: Array.from({ length: 300 }, (_, i) => ({
        id: `ALGO-BENCH-${i + 1}`,
        problemCategory: `Category ${i % 15 === 0 ? "Dynamic Programming" : i % 3 === 0 ? "Graph Theory" : i % 2 === 0 ? "Tree Traversals" : "Sliding Window"}`,
        optimalTimeComplexity: i % 2 === 0 ? "O(N log N)" : "O(N)",
        optimalSpaceComplexity: i % 3 === 0 ? "O(1)" : "O(N)",
        testCaseVerificationThreshold: 100,
        edgeCases: [
          "Empty input / null pointer boundaries",
          "Max integer overflow boundaries (2^31 - 1, -2^31)",
          "Duplicate keys and cyclic references in graphs",
          "Massive input scaling (N = 10^6 items within 1000ms)"
        ]
      }))
    }
  ]
};

export default ENTERPRISE_EVALUATION_RUBRICS;
