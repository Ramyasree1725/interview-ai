/**
 * Unit Test Suite for Resume Parser Service
 */

import { parseResumeText, computeAtsScore } from '../src/services/resumeParser.js';

describe('ResumeParser Service', () => {
  const sampleResume = `
    Ramya Sri - Senior Software Engineer
    Email: ramyasri@example.com
    Phone: +91 9876543210
    Skills: JavaScript, React, Node.js, Python, Tailwind CSS, Git, Docker, REST APIs
    Experience: 3 years of building full stack applications and microservices.
    Education: B.Tech in Computer Science and Engineering
    Projects: AI Interview Coach Platform, E-Commerce Distributed Gateway
  `;

  test('should extract detected skills correctly', () => {
    const result = parseResumeText(sampleResume);
    expect(result).toBeDefined();
    expect(result.skills).toBeInstanceOf(Array);
    expect(result.skills.length).toBeGreaterThan(0);
    expect(result.skills).toContain('React');
    expect(result.skills).toContain('Python');
  });

  test('should compute realistic ATS match score', () => {
    const score = computeAtsScore(sampleResume, 'Full Stack Developer');
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test('should gracefully handle empty or invalid resume input', () => {
    const result = parseResumeText('');
    expect(result.skills).toEqual([]);
    expect(result.score).toBeLessThanOrEqual(40);
  });
});
