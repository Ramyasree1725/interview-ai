export const LEARNING_ROADMAPS = {
  "rest-apis": {
    skill: "REST APIs & Backend Architecture",
    category: "Backend Development",
    targetRole: "Full Stack & Backend Developer",
    days: [
      {
        day: 1,
        title: "HTTP Protocol & RESTful Verbs",
        topics: ["HTTP Methods (GET, POST, PUT, PATCH, DELETE)", "Idempotency", "Status Codes (2xx, 3xx, 4xx, 5xx)", "Headers & Payloads"],
        exercise: "Design endpoint URIs for an e-commerce order management system following REST naming conventions.",
        estimatedTime: "2 Hours"
      },
      {
        day: 2,
        title: "CRUD Operations & Data Validation",
        topics: ["Request Body Parsing", "Pydantic / Joi Validation Schema", "Handling 400 Bad Request & 422 Unprocessable Entity"],
        exercise: "Create a complete CRUD resource with input validation and custom error formatting.",
        estimatedTime: "2.5 Hours"
      },
      {
        day: 3,
        title: "Authentication & Authorization (JWT)",
        topics: ["Bearer Tokens", "JWT Sign/Verify Algorithm", "Middleware & Route Guards", "Role-Based Access Control (RBAC)"],
        exercise: "Implement secure login route that issues short-lived JWT access tokens and verify them in protected routes.",
        estimatedTime: "3 Hours"
      },
      {
        day: 4,
        title: "Pagination, Filtering, Sorting & Search",
        topics: ["Offset-based vs Cursor-based Pagination", "Query Params parsing", "Database indexing for search filters"],
        exercise: "Build a high-performance paginated API endpoint with sorting and keyword search filtering.",
        estimatedTime: "2.5 Hours"
      },
      {
        day: 5,
        title: "API Security, Rate Limiting & Swagger Docs",
        topics: ["Rate Limiting (Token Bucket)", "CORS & Helmet headers", "OpenAPI / Swagger automated documentation"],
        exercise: "Integrate Redis-based rate limiting (100 req/min) and generate interactive OpenAPI documentation.",
        estimatedTime: "3 Hours"
      }
    ]
  },
  "docker-containers": {
    skill: "Docker & Containerization",
    category: "DevOps & Cloud",
    targetRole: "Full Stack & DevOps Engineer",
    days: [
      {
        day: 1,
        title: "Container Fundamentals & Docker CLI",
        topics: ["Virtual Machines vs Containers", "Images vs Containers", "Docker Pull, Run, Exec, Stop commands"],
        exercise: "Run Nginx, PostgreSQL and Redis containers locally with port forwarding.",
        estimatedTime: "2 Hours"
      },
      {
        day: 2,
        title: "Writing Efficient Dockerfiles",
        topics: ["Dockerfile syntax (FROM, WORKDIR, COPY, RUN, CMD)", "Multi-stage builds for small image size", ".dockerignore"],
        exercise: "Containerize a React/Node or Python app reducing image size below 100MB using multi-stage build.",
        estimatedTime: "2.5 Hours"
      },
      {
        day: 3,
        title: "Docker Compose & Multi-Service Stacks",
        topics: ["docker-compose.yml configuration", "Services, Volumes & Network bridge", "Environment variable injection"],
        exercise: "Spin up an entire Full-Stack app + Database + Cache with a single `docker compose up` command.",
        estimatedTime: "3 Hours"
      },
      {
        day: 4,
        title: "Volume Mounts & Data Persistence",
        topics: ["Named Volumes vs Bind Mounts", "Database data persistence", "Live code hot-reloading inside container"],
        exercise: "Configure persistent PostgreSQL storage volume and test data survival across container restarts.",
        estimatedTime: "2 Hours"
      },
      {
        day: 5,
        title: "Container Security & CI/CD Deployment",
        topics: ["Running as non-root user", "Vulnerability scanning with Trivy", "Pushing to Docker Hub/ECR in GitHub Actions"],
        exercise: "Create a GitHub Actions workflow that builds, tests, and publishes container image on git push.",
        estimatedTime: "2.5 Hours"
      }
    ]
  },
  "system-design": {
    skill: "System Design & High-Scale Architecture",
    category: "Architecture",
    targetRole: "Senior & Staff Engineer",
    days: [
      {
        day: 1,
        title: "Load Balancing & Horizontal Scaling",
        topics: ["Vertical vs Horizontal Scaling", "L4 vs L7 Load Balancers", "Round Robin, Least Connections, IP Hash algorithms"],
        exercise: "Sketch load balancer architecture with health checks and SSL termination.",
        estimatedTime: "2 Hours"
      },
      {
        day: 2,
        title: "Caching Strategies & Eviction Policies",
        topics: ["Cache-Aside, Write-Through, Write-Back", "Redis cluster", "Cache Stampede & Cache Penetration solutions"],
        exercise: "Design a caching layer for a news feed with TTL and LRU eviction.",
        estimatedTime: "2.5 Hours"
      },
      {
        day: 3,
        title: "Database Sharding & Replication",
        topics: ["Master-Slave Replication", "Consistent Hashing", "CAP Theorem", "ACID vs BASE properties"],
        exercise: "Partition a 50-million user table across 4 database shards using consistent hashing.",
        estimatedTime: "3 Hours"
      },
      {
        day: 4,
        title: "Message Queues & Asynchronous Pipelines",
        topics: ["Kafka vs RabbitMQ", "Pub/Sub architecture", "Consumer groups", "Dead letter queues & Idempotency"],
        exercise: "Design video transcoding pipeline processing uploads asynchronously.",
        estimatedTime: "3 Hours"
      },
      {
        day: 5,
        title: "End-to-End System Design Mock",
        topics: ["URL Shortener (Bitly) or Instagram Feed Design", "Back-of-envelope calculations", "SPOF elimination"],
        exercise: "Conduct a 45-minute timed system design simulation with capacity estimation.",
        estimatedTime: "3.5 Hours"
      }
    ]
  }
};
