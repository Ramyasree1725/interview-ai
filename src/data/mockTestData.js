// Mock Online Test Question Bank: Technical (Role-Based) + Aptitude / Logical Reasoning

export const MOCK_TEST_QUESTIONS = {
  "Full Stack Developer": [
    // Technical Section
    {
      id: "t1",
      section: "Technical (Role-Based)",
      question: "In React, which hook is used to perform side effects such as data fetching or subscriptions?",
      options: ["useState", "useEffect", "useReducer", "useCallback"],
      correctIndex: 1,
      explanation: "`useEffect` is designed specifically for side-effects like API calls, DOM subscriptions, and timers."
    },
    {
      id: "t2",
      section: "Technical (Role-Based)",
      question: "Which HTTP status code indicates that the requested resource was successfully created on the server?",
      options: ["200 OK", "201 Created", "204 No Content", "400 Bad Request"],
      correctIndex: 1,
      explanation: "HTTP 201 Created is returned when a new resource is successfully created (e.g. via POST)."
    },
    {
      id: "t3",
      section: "Technical (Role-Based)",
      question: "In relational databases, what does the 'I' stand for in ACID properties?",
      options: ["Integrity", "Isolation", "Indexing", "Inheritance"],
      correctIndex: 1,
      explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability."
    },
    {
      id: "t4",
      section: "Technical (Role-Based)",
      question: "Which of the following data structures operates on a Last-In, First-Out (LIFO) order?",
      options: ["Queue", "Array", "Stack", "Binary Tree"],
      correctIndex: 2,
      explanation: "A Stack operates on LIFO (Last-In, First-Out) principle using push and pop operations."
    },
    {
      id: "t5",
      section: "Technical (Role-Based)",
      question: "What is the primary function of Docker in modern software engineering?",
      options: [
        "To manage database transactions",
        "To package applications and dependencies into standardized containers",
        "To compile JavaScript code into machine bytecode",
        "To monitor network firewall traffic"
      ],
      correctIndex: 1,
      explanation: "Docker containers package code and runtime dependencies for consistent cross-environment execution."
    },
    // Aptitude & Logical Section
    {
      id: "a1",
      section: "Aptitude & Quantitative",
      question: "A train running at a speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
      options: ["120 metres", "150 metres", "180 metres", "324 metres"],
      correctIndex: 1,
      explanation: "Speed in m/s = 60 * (5/18) = 50/3 m/s. Length = Speed * Time = (50/3) * 9 = 150 metres."
    },
    {
      id: "a2",
      section: "Aptitude & Quantitative",
      question: "If a shopkeeper buys an article for ₹200 and sells it for ₹250, what is the profit percentage?",
      options: ["20%", "25%", "30%", "15%"],
      correctIndex: 1,
      explanation: "Profit = ₹50. Profit % = (50 / 200) * 100 = 25%."
    },
    {
      id: "a3",
      section: "Logical Reasoning",
      question: "Find the next number in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "48"],
      correctIndex: 1,
      explanation: "Differences are +4, +6, +8, +10, +12. So, 30 + 12 = 42 (or n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42)."
    },
    {
      id: "a4",
      section: "Logical Reasoning",
      question: "If CODING is coded as DPEJOH in a certain language, how will PYTHON be coded?",
      options: ["QZUIPO", "QZUIOP", "QZVJPO", "PZUIPO"],
      correctIndex: 0,
      explanation: "Each letter is shifted forward by +1: P->Q, Y->Z, T->U, H->I, O->P, N->O = QZUIPO."
    },
    {
      id: "a5",
      section: "Aptitude & Quantitative",
      question: "A and B together can complete a work in 6 days. A alone can do it in 10 days. In how many days can B alone complete the work?",
      options: ["12 days", "15 days", "18 days", "20 days"],
      correctIndex: 1,
      explanation: "B's 1-day work = (1/6) - (1/10) = (5 - 3)/30 = 2/30 = 1/15. So, B alone takes 15 days."
    }
  ],

  "Python Developer": [
    {
      id: "py1",
      section: "Technical (Python)",
      question: "Which of the following data types in Python is IMMUTABLE?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      correctIndex: 3,
      explanation: "Tuples in Python are immutable; once created, their elements cannot be modified."
    },
    {
      id: "py2",
      section: "Technical (Python)",
      question: "What is the output of `bool([])` in Python?",
      options: ["True", "False", "None", "IndexError"],
      correctIndex: 1,
      explanation: "Empty sequences (lists, strings, tuples, dictionaries) evaluate to `False` in boolean context."
    },
    {
      id: "py3",
      section: "Technical (Python)",
      question: "Which keyword is used to define an anonymous (inline) function in Python?",
      options: ["def", "lambda", "inline", "func"],
      correctIndex: 1,
      explanation: "`lambda` creates small anonymous one-line functions in Python."
    },
    {
      id: "py4",
      section: "Technical (Python)",
      question: "What does the Global Interpreter Lock (GIL) in CPython prevent?",
      options: [
        "Memory leaks",
        "Multiple native OS threads from executing Python bytecode simultaneously",
        "Writing to disk",
        "Network socket connections"
      ],
      correctIndex: 1,
      explanation: "CPython's GIL ensures only one native thread executes Python bytecode at any moment."
    },
    {
      id: "py5",
      section: "Technical (Python)",
      question: "What is the time complexity of looking up a key in a Python dictionary on average?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
      correctIndex: 0,
      explanation: "Python dictionaries are implemented as hash tables with average-case O(1) key lookup."
    },
    // Aptitude Section
    {
      id: "py-a1",
      section: "Aptitude & Quantitative",
      question: "A car travels 300 km in 5 hours. What is its speed in metres per second?",
      options: ["16.67 m/s", "20 m/s", "25 m/s", "15 m/s"],
      correctIndex: 0,
      explanation: "Speed in km/h = 300 / 5 = 60 km/h. Speed in m/s = 60 * (5/18) = 16.67 m/s."
    },
    {
      id: "py-a2",
      section: "Aptitude & Quantitative",
      question: "What is the average of first 5 prime numbers (2, 3, 5, 7, 11)?",
      options: ["5.6", "5.8", "6.0", "5.4"],
      correctIndex: 0,
      explanation: "Sum = 2 + 3 + 5 + 7 + 11 = 28. Average = 28 / 5 = 5.6."
    },
    {
      id: "py-a3",
      section: "Logical Reasoning",
      question: "Look at the pattern: 3, 9, 27, 81, ?. What comes next?",
      options: ["162", "243", "324", "180"],
      correctIndex: 1,
      explanation: "Each term is multiplied by 3 (Powers of 3: 3^1, 3^2, 3^3, 3^4, 3^5 = 243)."
    },
    {
      id: "py-a4",
      section: "Logical Reasoning",
      question: "Pointing to a photograph, a man says 'He is the only son of my father'. Who is the man in the photo?",
      options: ["His brother", "Himself", "His father", "His nephew"],
      correctIndex: 1,
      explanation: "The only son of his father is the man himself."
    },
    {
      id: "py-a5",
      section: "Aptitude & Quantitative",
      question: "A pipe can fill a tank in 4 hours and another can empty it in 6 hours. If both are opened together, in how many hours will the tank be full?",
      options: ["10 hours", "12 hours", "15 hours", "8 hours"],
      correctIndex: 1,
      explanation: "Net fill rate per hour = (1/4) - (1/6) = (3 - 2)/12 = 1/12. So tank fills in 12 hours."
    }
  ]
};
