import { Experience, Project, SkillCategory, Certificate, Education, OpenSourceContribution } from './types';
import { Github, Linkedin, Mail, Globe } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Mudipa Kishan",
  initials: "MK",
  role: "Fullstack Software Engineer",
  subtitle: "Fullstack Software Engineer | NestJS · React/Next.js · Spring Boot · AWS",
  location: "Tangalle, Sri Lanka",
  profile:
    "Software Engineer with professional experience developing and delivering production web applications across frontend and backend environments. Experienced in building user-focused interfaces, integrating APIs, implementing authentication and business workflows, and contributing to cloud-based deployments. Strong problem-solving and debugging skills, with a track record of collaborating with technical and product teams to deliver reliable software solutions.",
  taglines: [
    "Fullstack Software Engineer",
    "NestJS · React/Next.js · Spring Boot",
    "Cloud & DevSecOps Solutions"
  ],
  contact: {
    email: "mudipakishanimayanga@gmail.com",
    phone: "+94 71 241 6779",
    location: "Tangalle, Sri Lanka",
    address: "Tangalle, Sri Lanka",
    website: "https://mudipakishan.online",
    github: "https://github.com/mk1shan",
    linkedin: "https://www.linkedin.com/in/mudipa-kishan/"
  },
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/mk1shan" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/mudipa-kishan/" },
    { name: "Email", icon: Mail, url: "mailto:mudipakishanimayanga@gmail.com" },
    { name: "Website", icon: Globe, url: "https://mudipakishan.online" }
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    id: "pixelx-se",
    role: "Software Engineer",
    company: "PixelX Solutions",
    period: "Jan 2026 – Present",
    description: [
      "Implemented Google, Apple, and Facebook OAuth and Stripe payments for a multi-user healthcare SaaS platform.",
      "Developed NestJS REST APIs and business workflows for invoicing, attendance tracking, orders, and payments.",
      "Worked directly with clients and technical teams to gather requirements and deliver features."
    ],
    tech: ["NestJS", "React.js", "OAuth", "Stripe", "REST APIs", "PostgreSQL", "Prisma"]
  },
  {
    id: "pixelx-ase",
    role: "Associate Software Engineer",
    company: "PixelX Solutions",
    period: "Jan 2025 – Jan 2026",
    description: [
      "Developed frontend features using Next.js, React.js, and Material UI across healthcare, workforce, bakery, and invoicing SaaS products.",
      "Integrated frontend interfaces with NestJS REST APIs to support business workflows.",
      "Built invoice management features supporting paid, unpaid, partially paid, and overdue payment statuses."
    ],
    tech: ["Next.js", "React.js", "Material UI", "NestJS", "REST APIs", "MySQL"]
  },
  {
    id: "avantrio-intern",
    role: "Intern Software Engineer",
    company: "Avantrio",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Developed React.js and Material UI components for multiple application modules.",
      "Integrated frontend components with backend APIs and MySQL data.",
      "Worked on search and data-retrieval features using NestJS.",
      "Assisted with debugging, performance improvements, and production issue resolution."
    ],
    tech: ["React.js", "Material UI", "NestJS", "MySQL", "REST APIs"]
  }
];

export const COMPANY_PROJECTS: Project[] = [
  {
    id: "cpbakers",
    title: "CPBakers — Bakery Operations & Delivery Platform",
    category: "Operations & Delivery SaaS",
    year: "2025",
    company: "PixelX Solutions",
    projectType: "company",
    description: "Built an internal operations system for managing bakery products, orders, employees, and deliveries with real-time tracking.",
    highlights: [
      "Built an internal operations system for managing bakery products, orders, employees, and deliveries.",
      "Developed order tracking so staff could follow each order from creation through to delivery.",
      "Built delivery management features to record and update delivery details for every order.",
      "Implemented employee assignment so orders and deliveries could be allocated to specific staff.",
      "Added payment-status tracking for orders to keep operations and finance in sync.",
      "Built NestJS REST APIs with Prisma ORM on PostgreSQL and a React.js frontend for daily operations."
    ],
    tech: ["NestJS", "React.js", "PostgreSQL", "Prisma"],
    link: "https://github.com/mk1shan",
    featured: true
  },
  {
    id: "compreli",
    title: "compreli — Workforce Attendance & Invoicing Platform",
    category: "Workforce & Finance Platform",
    year: "2025",
    company: "PixelX Solutions",
    projectType: "company",
    description: "Comprehensive multi-branch workforce management and financial invoicing platform with detailed status tracking.",
    highlights: [
      "Developed features for managing employee attendance, working hours, and lunch/break details.",
      "Built invoice creation and management features for multiple branches from a single platform.",
      "Implemented payment tracking for paid, unpaid, partial, and overdue invoices, including due balances.",
      "Built React.js and Material UI interfaces for workforce, invoice, and payment workflows.",
      "Developed REST APIs supporting HR and business workflows."
    ],
    tech: ["NestJS", "React.js", "Material UI", "MySQL"],
    link: "https://github.com/mk1shan",
    featured: true
  },
  {
    id: "dentiverse",
    title: "Dentiverse — Multi-User Healthcare SaaS Platform",
    category: "Healthcare SaaS Platform",
    year: "2026",
    company: "PixelX Solutions",
    projectType: "company",
    description: "Multi-user healthcare SaaS platform for patient appointments, multi-provider workflows, OAuth authentication, and Stripe payments.",
    highlights: [
      "Developed frontend interfaces for patient management, appointments, and healthcare workflows.",
      "Integrated Next.js components with NestJS REST APIs, documented with Swagger.",
      "Implemented Google, Apple, and Facebook OAuth authentication.",
      "Integrated Stripe payments and multi-user SaaS functionality."
    ],
    tech: ["NestJS", "Next.js", "PostgreSQL", "Prisma", "Swagger", "Stripe", "OAuth"],
    link: "https://github.com/mk1shan",
    featured: true
  }
];

export const PERSONAL_PROJECTS: Project[] = [
  {
    id: "behavdiff",
    title: "BehavDiff — Open-Source npm Package",
    category: "Developer Tooling",
    year: "2025",
    projectType: "personal",
    description: "Published open-source tool that flags missing, added, or reordered behavior in changed functions using existing code evidence.",
    highlights: [
      "Built and published a tool that flags missing, added, or reordered behavior in changed functions.",
      "Compares similar functions and shows the existing code used as evidence.",
      "Supports common patterns in validation, database access, email, HTTP, payments, and queues."
    ],
    tech: ["TypeScript", "Node.js", "NestJS"],
    link: "https://github.com/mk1shan",
    github: "https://github.com/mk1shan",
    npm: "https://www.npmjs.com/search?q=behavdiff",
    featured: true
  },
  {
    id: "ai-interview-prep",
    title: "AI Interview Preparation Platform",
    category: "AI & EdTech Platform",
    year: "2025",
    projectType: "personal",
    description: "Secure interview-prep platform with JWT authentication, role-based access control, and dynamic Groq AI question scoring.",
    highlights: [
      "Built a secure interview-prep platform with JWT auth and role-based access control (USER/ADMIN).",
      "Integrated the Groq API to generate AI interview questions by topic and difficulty, with automated scoring.",
      "Developed question management, interview session, and answer submission flows; documented all endpoints via Swagger/OpenAPI."
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Swagger/OpenAPI", "Groq API"],
    link: "https://github.com/mk1shan",
    github: "https://github.com/mk1shan",
    featured: true
  },
  {
    id: "emocare",
    title: "EmoCare — Mental Health Platform for Youth",
    category: "AI & Health Platform",
    year: "2024",
    projectType: "personal",
    description: "Mental health chatbot platform combining RASA conversational AI and Cohere LLM for personalized self-care recommendations.",
    highlights: [
      "Built a chatbot delivering mood-based self-care recommendations using RASA + Cohere LLM.",
      "Implemented mood tracking to monitor mood trends over time.",
      "Added a stress-relief game and an emotional diary for day-to-day self-care."
    ],
    tech: ["RASA Framework", "Python", "React.js", "Firebase", "Cohere LLM"],
    link: "https://github.com/mk1shan",
    github: "https://github.com/mk1shan",
    featured: true
  },
  {
    id: "devsecops-pipeline",
    title: "Three-Tier Cloud DevSecOps Pipeline",
    category: "Cloud & DevSecOps",
    year: "2024",
    projectType: "personal",
    description: "Automated end-to-end CI/CD GitOps pipeline using Jenkins and ArgoCD deploying containerized tiers to Amazon EKS with full observability.",
    highlights: [
      "Designed an automated, end-to-end CI/CD GitOps pipeline using Jenkins and ArgoCD for a scalable three-tier student system.",
      "Containerized the application tiers with Docker and deployed them to Amazon EKS.",
      "Enforced shift-left security with SonarQube and Trivy scans.",
      "Configured Prometheus and Grafana for full cluster observability."
    ],
    tech: ["Docker", "Jenkins", "Amazon EKS", "ArgoCD", "SonarQube", "Trivy", "MongoDB Atlas", "Prometheus", "Grafana"],
    link: "https://github.com/mk1shan/Devsecops-project-global-insights",
    github: "https://github.com/mk1shan/Devsecops-project-global-insights",
    featured: true
  }
];

export const PROJECTS: Project[] = [
  ...COMPANY_PROJECTS,
  ...PERSONAL_PROJECTS
];

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: "soroban-state-lens",
    project: "Soroban-state-lens",
    description: "Integrated validation into the Discovery feature for architectural consistency.",
    link: "https://github.com/mk1shan"
  },
  {
    id: "devimpact",
    project: "DevImpact",
    description: "Applied submit-button animation to reset and swap buttons.",
    link: "https://github.com/mk1shan"
  },
  {
    id: "cursor-boston",
    project: "cursor-boston",
    description: "Added missing JSDoc documentation for rate-limit.ts.",
    link: "https://github.com/mk1shan"
  }
];

export const EDUCATION: Education[] = [
  {
    id: "kdu",
    institution: "General Sir John Kotelawala Defence University",
    degree: "BSc (Hons) Software Engineering",
    period: "2021 – 2024"
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "aws-solutions-architect",
    title: "AWS Solutions Architect Associate — Exam Prep Course",
    issuer: "Udemy",
    link: "https://www.udemy.com/",
    date: "2026"
  },
  {
    id: "decoding-devops-ai",
    title: "Decoding DevOps: From Basics to Advanced Projects with AI",
    issuer: "Udemy",
    link: "https://www.udemy.com/certificate/UC-b0d556de-f602-45c7-b5cd-ec9012891939/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com",
    date: "2024"
  },
  {
    id: "aws-services-overview",
    title: "AWS Services Overview for IT Professionals",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/certificate/H4XPVFV8DAJR",
    date: "2024"
  },
  {
    id: "linux-beginners-kodekloud",
    title: "Linux for Beginners with Hands-On Labs",
    issuer: "KodeKloud",
    link: "https://www.coursera.org/account/accomplishments/verify/768HITNDLH1U?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    date: "2024"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["NestJS", "Node.js", "REST APIs", "Prisma", "Java (Spring Boot)", "Spring Security", "Swagger/OpenAPI"]
  },
  {
    name: "Frontend",
    skills: ["React.js", "Next.js", "Material UI"]
  },
  {
    name: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    name: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "ArgoCD", "SonarQube", "Trivy", "Prometheus", "Grafana"]
  },
  {
    name: "Auth & Payments",
    skills: ["Firebase Auth", "OAuth", "JWT", "Stripe"]
  },
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "SQL", "Java", "Python"]
  }
];
