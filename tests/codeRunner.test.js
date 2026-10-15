/**
 * Unit Test Suite for In-Browser Code Runner & Sandbox Evaluator
 */

import { executeSandboxCode, validateTestCases } from '../src/services/codeRunner.js';

describe('CodeRunner Sandbox Execution Suite', () => {
  test('should execute valid JavaScript algorithm and return output', async () => {
    const code = `
      function twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
          const comp = target - nums[i];
          if (map.has(comp)) return [map.get(comp), i];
          map.set(nums[i], i);
        }
        return [];
      }
      return twoSum([2, 7, 11, 15], 9);
    `;
    const result = await executeSandboxCode(code, 'javascript');
    expect(result.success).toBe(true);
    expect(result.output).toEqual([0, 1]);
  });

  test('should safely catch syntax errors and exceptions', async () => {
    const brokenCode = `function invalid() { return ;;; `;
    const result = await executeSandboxCode(brokenCode, 'javascript');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('should accurately qualify candidate only when 100% test cases pass', () => {
    const testCases = [
      { input: [1, 2], expected: 3, actual: 3, passed: true },
      { input: [5, -2], expected: 3, actual: 3, passed: true }
    ];
    const evaluation = validateTestCases(testCases);
    expect(evaluation.isQualified).toBe(true);
    expect(evaluation.passedCount).toBe(2);
    expect(evaluation.totalCount).toBe(2);
  });

  test('should fail qualification when any test case fails', () => {
    const testCases = [
      { input: [1, 2], expected: 3, actual: 3, passed: true },
      { input: [5, 2], expected: 7, actual: 6, passed: false }
    ];
    const evaluation = validateTestCases(testCases);
    expect(evaluation.isQualified).toBe(false);
    expect(evaluation.passedCount).toBe(1);
  });
});
