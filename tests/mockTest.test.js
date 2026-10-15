/**
 * Unit Test Suite for Role-based Mock Test & Aptitude Threshold Rules
 */

describe('Mock Test Passing Criteria (>50% Pass Rule)', () => {
  function evaluateMockTestResult(score, totalQuestions = 10) {
    const percentage = (score / totalQuestions) * 100;
    return {
      percentage,
      passed: percentage > 50,
      status: percentage > 50 ? 'PASS' : 'FAIL'
    };
  }

  test('should pass candidate when score is strictly greater than 50%', () => {
    const result = evaluateMockTestResult(6, 10);
    expect(result.percentage).toBe(60);
    expect(result.passed).toBe(true);
    expect(result.status).toBe('PASS');
  });

  test('should fail candidate when score is exactly 50% or below', () => {
    const resultExact50 = evaluateMockTestResult(5, 10);
    expect(resultExact50.percentage).toBe(50);
    expect(resultExact50.passed).toBe(false);
    expect(resultExact50.status).toBe('FAIL');

    const resultBelow50 = evaluateMockTestResult(4, 10);
    expect(resultBelow50.percentage).toBe(40);
    expect(resultBelow50.passed).toBe(false);
    expect(resultBelow50.status).toBe('FAIL');
  });
});
