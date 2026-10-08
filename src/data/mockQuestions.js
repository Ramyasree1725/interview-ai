export const QUESTION_BANK = {
  "python-developer": {
    beginner: [
      {
        id: "py-b-1",
        question: "What is the primary difference between a list and a tuple in Python, and when would you choose one over the other?",
        category: "Data Structures",
        keywords: ["mutable", "immutable", "memory", "hashable", "tuple", "list", "performance"],
        rubric: {
          technical: "Mentions mutability vs immutability, memory efficiency of tuples, and hashability for dictionary keys.",
          clarity: "Clearly structured definition followed by real-world use cases."
        },
        modelAnswer: "In Python, lists are mutable (`[1, 2, 3]`), meaning items can be modified, appended, or removed in-place. Tuples are immutable (`(1, 2, 3)`), meaning contents cannot be changed once created. Tuples are faster, consume less memory, and can be used as dictionary keys because they are hashable. Use lists for dynamic collections and tuples for fixed records (e.g., database coordinates).",
        followUp: "Since tuples are immutable, what happens if a tuple contains a mutable list inside it?"
      },
      {
        id: "py-b-2",
        question: "How does exception handling work in Python, and what is the specific role of the `finally` and `else` blocks in a `try-except` construct?",
        category: "Core Concepts",
        keywords: ["try", "except", "finally", "else", "clean up", "resource", "error"],
        rubric: {
          technical: "Defines try, except, else (runs when no exception occurred), and finally (runs guaranteed regardless of exceptions).",
          clarity: "Clean explanation of flow of control."
        },
        modelAnswer: "Exception handling catches runtime errors gracefully. `try` executes risky code, `except` catches specific exceptions, `else` runs only if NO exception occurred, and `finally` runs unconditionally (ideal for closing files or database connections).",
        followUp: "What is the difference between `except Exception:` and `except BaseException:`?"
      },
      {
        id: "py-b-3",
        question: "Explain the four core Object-Oriented Programming (OOP) principles in Python with a brief real-world example.",
        category: "OOPs Concepts",
        keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "classes", "methods"],
        rubric: {
          technical: "Accurately covers Encapsulation, Abstraction, Inheritance, and Polymorphism.",
          clarity: "Concise definitions with quick examples."
        },
        modelAnswer: "The 4 pillars are: 1) Encapsulation (bundling data and methods, hiding internal state), 2) Abstraction (hiding implementation details via interfaces/abc), 3) Inheritance (child class inheriting properties from parent class), and 4) Polymorphism (methods having same name but different behaviors in child classes).",
        followUp: "How does Python resolve method calls in multiple inheritance using MRO (Method Resolution Order)?"
      },
      {
        id: "py-b-4",
        question: "What is the difference between `is` and `==` in Python, and how does Python's small integer caching work?",
        category: "Memory & Identity",
        keywords: ["identity", "equality", "value", "memory address", "id()", "interning", "cache"],
        rubric: {
          technical: "Differentiates `==` (equality of values) vs `is` (identity of memory address `id()`). Mentions small integer caching (-5 to 256).",
          clarity: "Clear distinction between memory references and content comparison."
        },
        modelAnswer: "`==` checks for value equality (whether the two objects have the same content), whereas `is` checks for object identity (whether both variables point to the exact same memory address using `id()`). Python pre-allocates and caches small integers between -5 and 256 in memory for performance, so `a = 250; b = 250; a is b` is True, while larger numbers might create separate objects depending on execution scope.",
        followUp: "Why should you always use `if x is None:` instead of `if x == None:`?"
      },
      {
        id: "py-b-5",
        question: "What are Python Generators and the `yield` keyword? How do they help with memory efficiency when processing large datasets?",
        category: "Iterators & Generators",
        keywords: ["generator", "yield", "lazy evaluation", "iterator", "memory", "streaming", "next()"],
        rubric: {
          technical: "Explains lazy evaluation, state suspension via `yield`, and memory savings over storing entire lists.",
          clarity: "Practical streaming comparison."
        },
        modelAnswer: "Generators are functions that return an iterator using the `yield` keyword instead of `return`. Unlike normal functions that compute all values upfront and store them in memory as a list, generators produce one item at a time on demand (lazy evaluation). This enables processing massive multi-gigabyte log files or infinite data streams with constant $O(1)$ memory footprint.",
        followUp: "What is the difference between a generator function and a generator expression?"
      },
      {
        id: "py-b-6",
        question: "How do `*args` and `**kwargs` work in Python function definitions, and when would you use them?",
        category: "Function Arguments",
        keywords: ["args", "kwargs", "positional", "keyword arguments", "tuple", "dictionary", "unpacking"],
        rubric: {
          technical: "Explains `*args` collects extra positional arguments into a tuple, and `**kwargs` collects keyword arguments into a dictionary.",
          clarity: "Shows practical use in wrappers and flexible APIs."
        },
        modelAnswer: "`*args` allows a function to accept any number of positional arguments, which are packed into a tuple. `**kwargs` allows accepting arbitrary keyword arguments, which are packed into a dictionary. They are commonly used when writing function decorators, subclassing, or building reusable utility functions with variable parameters.",
        followUp: "Can you pass both `*args` and `**kwargs` together, and what must their parameter ordering be?"
      },
      {
        id: "py-b-7",
        question: "What are Python Dunder (Magic) methods like `__init__`, `__str__`, and `__repr__`? How do they customize class behavior?",
        category: "Object Internals",
        keywords: ["dunder", "magic methods", "__init__", "__str__", "__repr__", "operator overloading"],
        rubric: {
          technical: "Explains double-underscore methods that hook into Python's built-in operators and string representations.",
          clarity: "Contrasts `__str__` (user-facing) with `__repr__` (developer debugging)."
        },
        modelAnswer: "Dunder (double underscore) methods are special built-in methods that allow custom classes to integrate seamlessly with Python syntax. `__init__` initializes newly created objects, `__str__` provides a readable string representation for end-users (`print(obj)`), and `__repr__` provides an unambiguous developer representation for debugging (`repr(obj)`). Other dunders allow operator overloading like `__add__` for `+` and `__len__` for `len()`.",
        followUp: "What happens if a class defines `__repr__` but does not define `__str__`?"
      }
    ],
    intermediate: [
      {
        id: "py-i-1",
        question: "Explain Python's Global Interpreter Lock (GIL). How does it impact multithreading vs multiprocessing for CPU-bound vs I/O-bound tasks?",
        category: "Concurrency & Internals",
        keywords: ["GIL", "CPython", "multithreading", "multiprocessing", "CPU-bound", "I/O-bound", "asyncio"],
        rubric: {
          technical: "Explains GIL mutex in CPython preventing simultaneous bytecode execution across cores. Compares threading for I/O and multiprocessing for CPU tasks.",
          clarity: "Crisp strategy breakdown."
        },
        modelAnswer: "The Global Interpreter Lock (GIL) is a mutex in CPython ensuring only one native thread executes Python bytecode at a time, protecting reference-counting memory management. For I/O-bound tasks (network, disk), multithreading or `asyncio` works great because the GIL is released during I/O waits. For CPU-bound tasks (math, data compression), multithreading yields no speedup, so `multiprocessing` must be used to spawn separate OS processes with independent interpreters.",
        followUp: "How does Python 3.12+ / 3.13 free-threaded (nogil) mode change this architecture?"
      },
      {
        id: "py-i-2",
        question: "How do Python decorators work under the hood? Write or explain how you would create a custom decorator to measure execution time.",
        category: "Metaprogramming",
        keywords: ["first-class functions", "closure", "functools.wraps", "wrapper", "decorator", "time"],
        rubric: {
          technical: "Explains functions as first-class objects, closures, `functools.wraps`, and wrapper logic.",
          clarity: "Logical explanation of wrapper structure."
        },
        modelAnswer: "In Python, functions are first-class objects. A decorator is a function that takes another function, wraps it inside an inner function to add behavior (such as logging or timing), and returns the wrapped callable. Using `@functools.wraps(func)` preserves original function metadata. For timing, the wrapper records `time.perf_counter()` before and after calling the original function and prints elapsed duration.",
        followUp: "How do you write a decorator that takes arguments like `@retry(max_attempts=3)`?"
      },
      {
        id: "py-i-3",
        question: "What is the difference between Shallow Copy and Deep Copy in Python? Give an example of where a shallow copy causes unintended side effects.",
        category: "Memory Management",
        keywords: ["shallow copy", "deep copy", "copy module", "nested objects", "references", "mutability"],
        rubric: {
          technical: "Explains shallow copy copies outer container only, copying references to nested elements. Deep copy recursively duplicates all nested objects.",
          clarity: "Highlights the nested mutation bug scenario."
        },
        modelAnswer: "A shallow copy (`copy.copy()` or `list.copy()`) creates a new outer collection, but inserts references to the existing child objects. If the collection contains nested mutable lists/dicts, mutating a nested object modifies it in both copies! In contrast, a deep copy (`copy.deepcopy()`) recursively clones the collection and all objects referenced by it, ensuring complete isolation.",
        followUp: "How can you implement custom copy behavior inside your own class using `__copy__` and `__deepcopy__`?"
      },
      {
        id: "py-i-4",
        question: "How does `asyncio` work in Python? What is the event loop, coroutines, and how does non-blocking I/O compare with traditional threads?",
        category: "Asynchronous Programming",
        keywords: ["asyncio", "event loop", "coroutine", "async def", "await", "non-blocking", "cooperative multitasking"],
        rubric: {
          technical: "Explains cooperative multitasking via single-threaded event loop, tasks yielding control at `await` points without OS thread context-switch overhead.",
          clarity: "Clear distinction from preemptive OS threading."
        },
        modelAnswer: "`asyncio` provides concurrent execution using a single-threaded **Event Loop** and cooperative multitasking. Coroutines defined with `async def` yield execution back to the event loop whenever they hit an `await` on an I/O operation. The event loop then switches to other pending tasks. Because there are no OS kernel thread context switches or locking overhead, a single `asyncio` process can easily handle 10,000+ concurrent WebSockets or HTTP connections.",
        followUp: "What happens if you run a blocking synchronous call like `time.sleep(5)` or a heavy CPU loop inside an async function?"
      },
      {
        id: "py-i-5",
        question: "Explain Python Context Managers and the `with` statement. How would you build a custom context manager class using `__enter__` and `__exit__`?",
        category: "Resource Management",
        keywords: ["context manager", "with statement", "__enter__", "__exit__", "contextlib", "cleanup"],
        rubric: {
          technical: "Explains deterministic resource acquisition and release, handling exceptions gracefully in `__exit__`.",
          clarity: "Shows DB connection or file handling pattern."
        },
        modelAnswer: "Context managers manage resource setup and teardown automatically using the `with` statement. When entering the block, `__enter__()` is called (e.g., opening a DB transaction or file). When exiting the block (even if an exception occurs), `__exit__(exc_type, exc_val, exc_tb)` is guaranteed to run, closing the resource or rolling back the transaction. Alternatively, `contextlib.contextmanager` decorator allows creating them with a simple generator.",
        followUp: "How can `__exit__` suppress an exception so that it does not propagate up the call stack?"
      }
    ],
    advanced: [
      {
        id: "py-a-1",
        question: "How does Python's Generational Garbage Collector work alongside Reference Counting? How are cyclic references resolved?",
        category: "Memory Management",
        keywords: ["reference counting", "cyclic gc", "generations 0 1 2", "gc module", "weakref", "memory leaks"],
        rubric: {
          technical: "Covers reference count drops to 0 for instant deallocation, cyclic references tracked across 3 generations, and heuristic collection thresholds.",
          clarity: "Structured architectural breakdown."
        },
        modelAnswer: "Python uses reference counting as its primary memory mechanism: when an object's reference count reaches 0, it is deallocated immediately. To resolve cyclic references (where Object A references B and B references A, but both are unreachable), Python runs a cyclic generational garbage collector dividing container objects into Generations 0, 1, and 2. It detects cycles by tentatively decrementing internal reference counts among tracked objects.",
        followUp: "In high-throughput microservices, when and why would you tune or disable automatic GC during request bursts?"
      },
      {
        id: "py-a-2",
        question: "Explain Python Metaclasses (`type`). How do metaclasses intercept class creation, and what are real-world use cases (like Django ORM or Pydantic)?",
        category: "Metaprogramming",
        keywords: ["metaclass", "type", "__new__", "__init__", "class factory", "Django ORM", "validation"],
        rubric: {
          technical: "Explains classes are instances of metaclasses (`type`), `__new__` inspects attributes/annotations during class creation.",
          clarity: "Connects to ORM model declarations or schema validators."
        },
        modelAnswer: "In Python, classes themselves are objects, and their type is a **metaclass** (default is `type`). A metaclass allows customizing class creation by defining `__new__(cls, name, bases, attrs)`. Real-world frameworks like Django ORM and Pydantic use metaclasses or `__init_subclass__` to inspect declared class attributes, validate field schemas, and dynamically inject database query methods.",
        followUp: "How does `__init_subclass__` provide a simpler alternative to metaclasses in modern Python?"
      }
    ]
  },
  "full-stack-developer": {
    beginner: [
      {
        id: "fs-b-1",
        question: "What happens from the moment you type a URL into the browser and press Enter until the web page is fully rendered on screen?",
        category: "Web Fundamentals",
        keywords: ["DNS", "TCP handshake", "TLS", "HTTP GET", "DOM", "CSSOM", "Render Tree", "Layout", "Paint"],
        rubric: {
          technical: "Covers DNS lookup, TCP 3-way handshake, TLS encryption, HTTP request/response, HTML parsing to DOM, CSS parsing to CSSOM, layout, and painting.",
          clarity: "Chronological step-by-step clarity."
        },
        modelAnswer: "1) DNS lookup resolves domain to IP. 2) TCP 3-way handshake (SYN, SYN-ACK, ACK) + TLS negotiation establishes encrypted HTTPS connection. 3) Browser sends HTTP GET request and receives HTML. 4) Browser parses HTML to build the DOM tree and CSS to build CSSOM. 5) DOM + CSSOM combine into Render Tree. 6) Layout/Reflow calculates geometry, and GPU Paints pixels onto the screen.",
        followUp: "What is the difference between `async` and `defer` script tags?"
      },
      {
        id: "fs-b-2",
        question: "What is the difference between SQL and NoSQL databases? When would you choose PostgreSQL vs MongoDB for a production application?",
        category: "Databases",
        keywords: ["SQL", "NoSQL", "ACID", "relational", "document", "PostgreSQL", "MongoDB", "scaling", "schema"],
        rubric: {
          technical: "Contrasts structured tabular ACID relational databases with flexible JSON document stores.",
          clarity: "Practical decision heuristic."
        },
        modelAnswer: "SQL (PostgreSQL) is relational, enforces structured schemas, supports complex multi-table JOINs, and guarantees strong ACID transactions. It is ideal for transactional financial systems, e-commerce orders, and relational data. NoSQL (MongoDB) stores polymorphic JSON documents, offers flexible schemas, and excels at rapid horizontal partitioning, real-time logging, or nested content catalogs.",
        followUp: "How does database indexing improve query performance, and what is the write overhead?"
      },
      {
        id: "fs-b-3",
        question: "Explain the Virtual DOM in React. How does the reconciliation and diffing algorithm make UI updates fast?",
        category: "Frontend Architecture",
        keywords: ["Virtual DOM", "reconciliation", "diffing", "fiber", "batching", "real DOM", "state"],
        rubric: {
          technical: "Explains lightweight in-memory representation, tree diffing heuristics, and batching DOM mutations.",
          clarity: "Contrasts slow real DOM manipulation with memory diffing."
        },
        modelAnswer: "The Virtual DOM is a lightweight JavaScript representation of the actual DOM. When component state changes, React creates a new Virtual DOM tree, compares it with the previous snapshot using a heuristic $O(N)$ diffing algorithm (reconciliation), computes the minimal set of changes needed, and batches updates to the real DOM. This avoids expensive layout recalculations and repaints.",
        followUp: "Why is the `key` prop required when rendering dynamic lists in React?"
      },
      {
        id: "fs-b-4",
        question: "What are RESTful APIs and what are the main HTTP methods (GET, POST, PUT, PATCH, DELETE) and status codes (200, 201, 400, 401, 403, 404, 500)?",
        category: "API Design",
        keywords: ["REST", "HTTP methods", "GET", "POST", "PUT", "PATCH", "DELETE", "status codes", "idempotent"],
        rubric: {
          technical: "Differentiates PUT (full replace) vs PATCH (partial update). Explains 2xx, 4xx client errors, and 5xx server errors.",
          clarity: "Clean API semantics."
        },
        modelAnswer: "REST is an architectural style based on stateless client-server resource modeling. HTTP verbs define operations: `GET` (read, idempotent), `POST` (create new resource), `PUT` (replace entire resource), `PATCH` (partial update), and `DELETE` (remove resource). Key status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized/No Token), 403 (Forbidden/No Permission), 404 (Not Found), and 500 (Internal Server Error).",
        followUp: "What makes an HTTP method 'idempotent'?"
      },
      {
        id: "fs-b-5",
        question: "How does CORS (Cross-Origin Resource Sharing) work in web browsers, and how do you resolve CORS errors on the backend?",
        category: "Web Security",
        keywords: ["CORS", "Same-Origin Policy", "preflight", "OPTIONS", "Access-Control-Allow-Origin", "headers"],
        rubric: {
          technical: "Explains browser Same-Origin Policy, preflight OPTIONS requests, and backend `Access-Control-Allow-Origin` response headers.",
          clarity: "Emphasizes CORS is a browser security mechanism, not a backend limitation."
        },
        modelAnswer: "CORS is a browser security feature based on Same-Origin Policy (protocol, domain, port). When frontend requests an API on a different origin with custom headers or non-GET methods, the browser sends an HTTP `OPTIONS` preflight request. The server must respond with `Access-Control-Allow-Origin: https://myapp.com`, allowed methods, and headers. On the backend, you configure CORS middleware to whitelist trusted domains.",
        followUp: "Why does an API request work in Postman or curl but fail with a CORS error in the browser?"
      }
    ],
    intermediate: [
      {
        id: "fs-i-1",
        question: "How do you securely handle user authentication and session management in a React + Node.js Single Page Application?",
        category: "Security & Auth",
        keywords: ["JWT", "HttpOnly cookies", "XSS", "CSRF", "refresh token", "access token", "SameSite"],
        rubric: {
          technical: "Recommends storing JWT in HttpOnly SameSite cookies rather than localStorage to prevent XSS. Discusses refresh token rotation.",
          clarity: "Explains attack vectors clearly."
        },
        modelAnswer: "Best practice is issuing short-lived JWT access tokens and long-lived refresh tokens. Tokens should never be stored in `localStorage` due to XSS vulnerability; instead, store them in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Use anti-CSRF tokens for mutating requests, enforce token rotation on refresh, and maintain server-side token blacklists for instant logout.",
        followUp: "What is OAuth 2.0 PKCE and why is it recommended for client-side applications?"
      },
      {
        id: "fs-i-2",
        question: "How do you optimize frontend web performance to achieve high Google Lighthouse / Core Web Vitals scores?",
        category: "Web Performance",
        keywords: ["LCP", "FID", "CLS", "code splitting", "lazy loading", "image optimization", "CDN", "tree shaking"],
        rubric: {
          technical: "Discusses Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), route-based dynamic `React.lazy()` code splitting, modern WebP images, and CDN caching.",
          clarity: "Actionable performance metrics."
        },
        modelAnswer: "Key Core Web Vitals optimizations: 1) **LCP**: Preload hero images, use CDN caching, enable Brotli/Gzip compression, and optimize server response times. 2) **CLS**: Reserve explicit width/height on images and dynamic ads to prevent layout jumps. 3) **INP/FID**: Code-split routes with `React.lazy()`, defer non-critical JS scripts, minimize main thread blocking time, and tree-shake heavy dependencies.",
        followUp: "How does Server-Side Rendering (SSR) in Next.js improve initial page load compared to client-side SPAs?"
      },
      {
        id: "fs-i-3",
        question: "Explain database transactions, ACID properties, and how you prevent Race Conditions in high-concurrency systems.",
        category: "Databases & Concurrency",
        keywords: ["ACID", "Atomicity", "Consistency", "Isolation", "Durability", "race conditions", "optimistic locking", "pessimistic locking"],
        rubric: {
          technical: "Defines ACID, explains race conditions in concurrent balance updates, compares Optimistic Locking (version column) with Pessimistic Locking (`SELECT FOR UPDATE`).",
          clarity: "Clear banking or booking concurrency example."
        },
        modelAnswer: "ACID guarantees: **Atomicity** (all-or-nothing), **Consistency** (schema constraints valid), **Isolation** (transactions don't interfere), and **Durability** (committed data persists). To prevent race conditions (e.g., two users booking the last seat simultaneously), use **Pessimistic Locking** (`SELECT ... FOR UPDATE` row locks) for high contention or **Optimistic Locking** (checking a `version` number on update) for lower contention.",
        followUp: "What are the 4 standard SQL Transaction Isolation levels, and what anomalies do they prevent?"
      }
    ],
    advanced: [
      {
        id: "fs-a-1",
        question: "How would you design a distributed real-time chat application (like Slack or WhatsApp Web) supporting millions of active users?",
        category: "System Design",
        keywords: ["WebSockets", "Redis Pub/Sub", "Kafka", "Cassandra", "horizontal scaling", "load balancer", "connection gateway"],
        rubric: {
          technical: "Covers WebSocket gateways, Redis Pub/Sub for cross-server message routing, Kafka for durable message persistence, and Cassandra/ScyllaDB for chat history storage.",
          clarity: "End-to-end architecture topology."
        },
        modelAnswer: "1) **Client Gateway**: Load balancer routes clients to a cluster of stateful WebSocket servers using sticky sessions or token handshake. 2) **Realtime Message Distribution**: WebSocket nodes publish messages to a distributed **Redis Pub/Sub** or Kafka cluster so that recipient connected to another server receives the packet instantly. 3) **Persistence & History**: Ingest worker saves messages asynchronously to a NoSQL column-store (Cassandra/PostgreSQL) partitioned by `channel_id` + `timestamp`. 4) **Media**: Stored in S3 with presigned URLs and distributed via CloudFront CDN.",
        followUp: "How do you handle read receipts and online presence indicators without overwhelming the database?"
      }
    ]
  },
  "hr-behavioral-all": {
    beginner: [
      {
        id: "hr-b-1",
        question: "Tell me about yourself. Walk me through your technical journey, top project achievements, and why you are targeting this role.",
        category: "Introduction & Pitch",
        keywords: ["Present-Past-Future", "skills", "projects", "passion", "career goals"],
        rubric: {
          technical: "Uses structured Present-Past-Future elevator pitch. Highlights recent achievements and enthusiasm for the role.",
          clarity: "Concise (60-90 seconds), confident, and engaging."
        },
        modelAnswer: "Using Present-Past-Future: Currently, I am a software engineer focused on building responsive, scalable applications with React, Python, and cloud APIs. In my past projects, I optimized backend APIs cutting latency by 40% and built real-time WebSocket tools. I am targeting this role because your engineering team solves challenging high-scale problems where I can contribute immediately and grow.",
        followUp: "What is one technical challenge you recently tackled outside your regular coursework or job?"
      },
      {
        id: "hr-b-2",
        question: "What are your greatest strengths, and what is one real area of improvement you are actively working on?",
        category: "Self-Awareness",
        keywords: ["strengths", "weakness", "growth mindset", "concrete examples", "self-improvement"],
        rubric: {
          technical: "Presents a genuine, non-cliché weakness with concrete self-correction steps. Backs strengths with evidence.",
          clarity: "Honest, self-aware, and professional."
        },
        modelAnswer: "My greatest strength is rapid technical debugging and system ownership. When encountering unfamiliar legacy bugs, I isolate root causes systematically using logs rather than applying surface patches. An area I am actively improving is delegating tasks earlier during high-pressure deadlines: I used to try to do everything myself, but I now break tasks into clear agile tickets and empower teammates through peer code reviews.",
        followUp: "Can you give an example of constructive feedback you received from a peer and how you acted on it?"
      },
      {
        id: "hr-b-3",
        question: "Describe a situation where you had a disagreement with a teammate on an architectural choice. How did you resolve it?",
        category: "Conflict Resolution (STAR)",
        keywords: ["STAR method", "Situation", "Task", "Action", "Result", "empathy", "data-driven", "collaboration"],
        rubric: {
          technical: "Follows STAR framework. Focuses on data-driven decision making, mutual respect, and positive project delivery.",
          clarity: "Diplomatic and collaborative mindset."
        },
        modelAnswer: "Situation: During a hackathon, a teammate wanted to use a niche framework while the team was concerned about rapid delivery. Task: Align on tech stack without hurting team morale. Action: I scheduled a 15-minute whiteboard session to benchmark documentation support and build a rapid proof-of-concept. We objectively chose FastAPI, and assigned that teammate lead on the core algorithm module. Result: Delivered on time and won 2nd place.",
        followUp: "If a senior engineer insists on a design you disagree with, how would you approach the discussion?"
      },
      {
        id: "hr-b-4",
        question: "Why do you want to join our company specifically, and where do you see your career progression in the next 3 to 5 years?",
        category: "Motivation & Vision",
        keywords: ["company mission", "growth", "career vision", "impact", "mentorship", "leadership"],
        rubric: {
          technical: "Demonstrates research on company culture, product scale, and shows ambition to progress from individual contributor to technical lead.",
          clarity: "Passionate, aligned, and authentic."
        },
        modelAnswer: "I have been following your engineering culture and product innovations in distributed cloud tooling. Over the next 3 to 5 years, my goal is to evolve from writing clean feature code into designing scalable distributed microservices, mentoring junior engineers, and owning core system architecture from conception to global production scale.",
        followUp: "What kind of work environment enables you to perform at your absolute best?"
      },
      {
        id: "hr-b-5",
        question: "Describe a time when you were assigned a task with vague requirements or had to learn a completely new tech stack under tight deadlines.",
        category: "Adaptability & Ambiguity",
        keywords: ["STAR", "ambiguity", "rapid learning", "documentation", "proactive communication"],
        rubric: {
          technical: "Highlights proactive requirement gathering, breaking problems into MVPs, and rapid documentation review.",
          clarity: "Demonstrates high self-starter independence."
        },
        modelAnswer: "Situation: I was tasked with integrating a third-party payment gateway with minimal legacy documentation. Task: Deliver the checkout flow in 4 days. Action: I read raw SDK code, created a sandbox test harness to map API request-response structures, and maintained a shared question doc for the team. Result: Delivered the integration a day ahead of schedule with 100% test coverage.",
        followUp: "How do you decide when to keep researching independently vs when to escalate and ask for help?"
      }
    ]
  }
};
