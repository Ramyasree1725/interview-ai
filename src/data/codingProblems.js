export const CODING_PROBLEMS = [
  {
    id: "reverse-string",
    title: "Reverse a String in Place",
    difficulty: "Easy",
    category: "Strings & Two Pointers",
    description: `Write a function that reverses a string or array of characters in-place with $O(1)$ extra memory.\n\nYou must do this by modifying the input array in-place with extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: "The character array is reversed in-place."
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    languages: {
      python: {
        starter: `def reverse_string(s: list[str]) -> None:\n    # Do not return anything, modify s in-place instead.\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s\n`,
        solution: `def reverse_string(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s`
      },
      javascript: {
        starter: `function reverseString(s) {\n    // Modify s in-place\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        let temp = s[left];\n        s[left] = s[right];\n        s[right] = temp;\n        left++;\n        right--;\n    }\n    return s;\n}`,
        solution: `function reverseString(s) {\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        [s[left], s[right]] = [s[right], s[left]];\n        left++;\n        right--;\n    }\n    return s;\n}`
      }
    },
    testCases: [
      { input: ["h","e","l","l","o"], expected: ["o","l","l","e","h"] },
      { input: ["H","a","n","n","a","h"], expected: ["h","a","n","n","a","H"] },
      { input: ["a"], expected: ["a"] },
      { input: ["c","o","d","e"], expected: ["e","d","o","c"] }
    ],
    hints: [
      "Try using a Two-Pointer technique: one pointer at the start and one pointer at the end.",
      "Swap characters at the two pointers, then move left pointer forward and right pointer backward."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)"
  },
  {
    id: "two-sum",
    title: "Two Sum Target",
    difficulty: "Easy",
    category: "Arrays & Hash Maps",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    languages: {
      python: {
        starter: `def two_sum(nums: list[int], target: int) -> list[int]:\n    # Write your solution here using Hash Map for O(N) time\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []\n`,
        solution: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`
      },
      javascript: {
        starter: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
        solution: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`
      }
    },
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] }
    ],
    hints: [
      "Can we do better than $O(N^2)$ brute force checking all pairs?",
      "Use a hash map to remember numbers you have already visited and their indices in $O(1)$ lookup."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)"
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses String",
    difficulty: "Medium",
    category: "Stack & Parsing",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' },
      { input: 's = "([)]"', output: 'false' }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    languages: {
      python: {
        starter: `def is_valid_parentheses(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return False\n        else:\n            stack.append(char)\n    return len(stack) == 0\n`,
        solution: `def is_valid_parentheses(s):\n    stack = []\n    lookup = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in lookup:\n            if not stack or stack.pop() != lookup[char]:\n                return False\n        else:\n            stack.append(char)\n    return not stack`
      },
      javascript: {
        starter: `function isValidParentheses(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (let ch of s) {\n        if (pairs[ch]) {\n            if (stack.pop() !== pairs[ch]) return false;\n        } else {\n            stack.push(ch);\n        }\n    }\n    return stack.length === 0;\n}`,
        solution: `function isValidParentheses(s) {\n    const stack = [];\n    const pairs = { ')': '(', '}': '{', ']': '[' };\n    for (let ch of s) {\n        if (pairs[ch]) {\n            if (stack.pop() !== pairs[ch]) return false;\n        } else {\n            stack.push(ch);\n        }\n    }\n    return stack.length === 0;\n}`
      }
    },
    testCases: [
      { input: "()[]{}", expected: true },
      { input: "(]", expected: false },
      { input: "([)]", expected: false },
      { input: "{[]}", expected: true }
    ],
    hints: [
      "Use a Last-In, First-Out (LIFO) Stack data structure.",
      "Push opening brackets onto stack. For closing brackets, pop and verify type match."
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)"
  }
];
