/**
 * Unit Test Suite for AI Scoring & Evaluation Engine
 */

import { evaluateCandidateAnswer, determineStarRating } from '../src/services/aiEngine.js';

describe('AIEngine Evaluation Suite', () => {
  const mockQuestion = {
    id: 1,
    question: "Explain the difference between list and tuple in Python.",
    role: "Python Developer",
    keywords: ["mutable", "immutable", "syntax", "hashable", "memory"]
  };

  test('should award Gold Star for comprehensive technical answers', () => {
    const answer = "In Python, lists are mutable while tuples are immutable. Lists use square brackets and tuples use parentheses. Tuples can be used as dictionary keys because they are hashable, and tuples are more memory efficient.";
    const rating = determineStarRating(answer, mockQuestion);
    expect(rating.star).toBe('gold');
    expect(rating.score).toBeGreaterThanOrEqual(75);
  });

  test('should award Red Star for brief or inadequate responses', () => {
    const answer = "I don't know the exact difference.";
    const rating = determineStarRating(answer, mockQuestion);
    expect(rating.star).toBe('red');
    expect(rating.score).toBeLessThan(50);
  });

  test('should generate structured feedback with actionable strengths and improvements', () => {
    const evaluation = evaluateCandidateAnswer("Lists are mutable and tuples are immutable.", mockQuestion);
    expect(evaluation.technicalDepth).toBeDefined();
    expect(evaluation.strengths).toBeInstanceOf(Array);
    expect(evaluation.improvements).toBeInstanceOf(Array);
  });
});
