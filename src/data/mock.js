export const mockData = {
  hero: {
    name: "RAVI TEEJA K",
    role: "Forward Deployed Engineer",
    company: "Qdrant",
    companyLink: "https://qdrant.tech/",
    description: "I write code by day and night, play football and basketball in between, catch the odd Telugu movie, and never fully grew out of Power Rangers. Right now I help teams ship vector search and RAG systems that actually hold up in production."
  },

  beyondCode: "These days I'm building cool AI stuff, chasing goals on the football field, and getting lost in games where I get to be the hero. I live on late nights, big dreams, and that itch to always do something more.",
  
  about: {
    summary: "Currently serving as a Forward Deployed Engineer at Qdrant, where I work directly with enterprise customers to design and deploy production vector search and RAG systems. Previously, I was an AI Engineer at Lyzr AI, where I architected and built multi-agent systems and full-stack AI Agents using AI Agent Studio for enterprise organizations including Under Armour, Tiny's Construction, Uniqus, Finpact, and Firstsource.",
    experience: [
      {
        id: 1,
        title: "Forward Deployed Engineer",
        company: "Qdrant",
        link: "https://qdrant.tech/",
        ranger: "red",
        current: true,
        duration: "April 2026 – Present",
        location: "Remote",
        summary: "Embedding directly with enterprise customers to design and ship production vector search and RAG systems on Qdrant, turning real-world retrieval problems into scalable solutions.",
        description: [
          "Translate real-world retrieval and search problems into robust, production-ready solutions",
          "Work across hybrid search, indexing and scaling strategies for high-throughput workloads"
        ],
        tech: ["Qdrant", "Vector Search", "RAG", "Hybrid Search"]
      },
      {
        id: 2,
        title: "AI Engineer",
        company: "Lyzr AI",
        link: "https://www.lyzr.ai/",
        ranger: "blue",
        duration: "June 2025 – March 2026",
        location: "Remote, India",
        summary: "Architected and shipped multi-agent systems and full-stack AI agents on AI Agent Studio, including LLM fine-tuning for custom workflows and automation.",
        description: [
          "Designed tailored agent systems for Under Armour, Tiny's Construction, Uniqus, Finpact and Firstsource",
          "Built fast, responsive web apps and the APIs behind complex agent logic"
        ],
        tech: ["Next.js", "TypeScript", "FastAPI", "tRPC", "Prisma", "MongoDB", "PostgreSQL"]
      },
      {
        id: 3,
        title: "Founding Software Engineer",
        company: "GradeHive AI (Now Deepdocs)",
        link: "https://deepdocs.dev/",
        ranger: "green",
        duration: "August 2024 – June 2025",
        location: "Remote",
        summary: "Led the frontend and backend of an LLM-powered grading platform where educators set their own rubrics. The product later pivoted to Deepdocs.",
        description: [
          "Bulk assignment creation and AI auto-grading across 10+ languages, handwritten JPEGs, docs and PDFs via OCR",
          "Graded code, written, image and Jupyter notebook tests, with the AI explaining why each answer earned its score"
        ],
        tech: ["React", "Next.js", "OpenAI", "MongoDB", "AWS"]
      },
      {
        id: 4,
        title: "Software Engineer Intern",
        company: "Tooljet",
        link: "https://www.tooljet.ai/",
        ranger: "white",
        duration: "May 2024 – August 2024",
        location: "Open Source Platform",
        summary: "Led the revamp of Workflows, the backbone of the Tooljet platform, and took it from beta to production while fixing critical production issues.",
        description: [
          "The upgrade was pivotal in landing two major enterprise customers",
          "Turned customer feature requests into proofs of concept, shipped them, and fixed open-source issues"
        ],
        tech: ["React", "Redux", "TypeScript", "ReactFlow", "Python", "FastAPI"]
      },
      {
        id: 5,
        title: "Developer Intern",
        company: "Hoppscotch",
        link: "https://hoppscotch.com/",
        ranger: "black",
        duration: "Aug 2023 – Nov 2023",
        location: "Open Source Platform",
        summary: "Built the marketing website for Hoppscotch, the open-source API testing platform.",
        description: [
          "Represented Hoppscotch's DevRel at conferences and events in the API testing space"
        ],
        tech: ["React", "Vue.js", "Python"]
      }
    ]
  },

  skills: {
    languages: ["Python", "JavaScript", "TypeScript", "SQL"],
    ai: ["Vector Search", "Qdrant", "RAG", "AI agents", "LLM APIs", "Langchain", "MCP (Model Context Protocol)"],
    frameworks: ["ReactJS", "Redux", "VueJS", "NextJS", "NodeJS", "ExpressJS", "FastAPI", "Flask"],
    databases: ["Firebase", "Supabase", "MongoDB", "RDBMS (MySQL, PostgreSQL, SQLite)"],
    tools: ["Data Structures & Algorithms", "REST", "Linux", "Git & GitHub", "Kafka", "OpenAI API", "Gemini API", "Machine Learning & Deep Learning Frameworks"]
  },

  projects: [
    {
      id: 1,
      title: "Multiple AI Agents & Fullstack Applications",
      description: "Built comprehensive AI agent systems and full-stack applications for enterprises at Lyzr AI, focusing on intelligent automation and seamless user experiences.",
      tech: ["AI Agents", "Next.js", "Python", "FastAPI", "MongoDB"],
      link: "https://lyzr.ai",
      category: "AI/Enterprise"
    },
    {
      id: 2,
      title: "Chat System with MySQL Database",
      description: "Built a chat system that allows direct communication with MySQL Database using natural language, powered by LLMs for intelligent query processing.",
      tech: ["React", "Python", "LLMs", "MySQL"],
      link: "#",
      category: "AI/Database"
    },
    {
      id: 3,
      title: "Web Based SQL Query Interface",
      description: "Web-based SQL query interface designed to accept user-inputted SQL queries and display corresponding data tables with predefined query results for demonstration.",
      tech: ["ReactJS", "NestJS"],
      link: "https://github.com/ravirt7911/sturdy-disco",
      category: "Web Development"
    },
    {
      id: 4,
      title: "Tooljet Workflows Enhancement",
      description: "Led the complete revamp of Tooljet's internal workflow automation system, transitioning from beta to production with improved business outcomes.",
      tech: ["ReactJS", "ReactFlow", "ExpressJS", "SCSS", "Redux", "TypeScript"],
      link: "https://www.tooljet.com/workflows",
      category: "Open Source"
    },
    {
      id: 5,
      title: "Travalog - AI Travel Planner",
      description: "Automated generation of travel plans based on days/location/people using AI, integrating multiple APIs for comprehensive travel planning.",
      tech: ["ReactJS", "TailwindCSS", "Gemini API", "Google Places API", "Firebase", "Vercel"],
      link: "#",
      category: "AI/Travel"
    },
    {
      id: 6,
      title: "Poolpay - Fund Management System",
      description: "Application for managing pooled funds with features including pooling-loaning, pooling-spending, pooling-investing, and auto-documentation.",
      tech: ["ReactJS", "Node", "Express", "WebSockets", "Firebase", "Redux"],
      link: "#",
      category: "FinTech"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "1st Position",
      description: "Worthy Hack - India-Wide Hackathon",
      year: "2023"
    },
    {
      id: 2,
      title: "4th Position", 
      description: "Opin Hacks(MLH) - India Wide Hackathon",
      year: "2023"
    },
    {
      id: 3,
      title: "3rd Position",
      description: "GDSC WOW - India Wide Hackathon",
      year: "2023"
    },
    {
      id: 4,
      title: "5 Levels Completed",
      description: "Google Foobar Challenge",
      year: "2023"
    },
    {
      id: 5,
      title: "Global Rank 1402",
      description: "Round A Google Code Jam 2023",
      year: "2023"
    },
    {
      id: 6,
      title: "4 Star Rating",
      description: "CodeChef (1695 points)",
      year: "2023"
    },
    {
      id: 7,
      title: "Conference Speaker",
      description: "Google DevFest 2024, India FOSS, TestMu Conference",
      year: "2024"
    }
  ],

  contact: {
    email: "ravirt7911@gmail.com",
    phone: "+91 8919774630",
    linkedin: "linkedin.com/in/kamsu-ravi-teeja",
    location: "Remote, India",
    profiles: {
      github: "https://github.com/ravirt7911",
      linkedin: "https://linkedin.com/in/kamsu-ravi-teeja",
      codechef: "https://www.codechef.com/users/ravirt7911",
      leetcode: "https://leetcode.com/ravirt7911",
      codeforces: "https://codeforces.com/profile/ravirt7911"
    }
  }
};
