import { Experience, Project, SkillCategory, Certificate, Education } from './types';
import { Github, Linkedin, Mail, MapPin, Phone, Globe, ExternalLink } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Mudipa Kishan",
  initials: "MK",
  role: "Software Engineer",
  taglines: [
    "Fullstack Software Engineer",
    "Backend Specialist",
    "API Developer"
  ],
  contact: {
    email: "mudipakishanimayanga@gmail.com",
    phone: "+94 712416779",
    address: "NO/147 Janaudanagama/Kasagala/Weerekatiya",
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
    id: "pixelx",
    role: "Software Engineer",
    company: "PixelX Solutions",
    period: "Aug 2025 – Present",
    description: [
      "Developed backend services using NestJS and TypeScript.",
      "Built and integrated React components with backend APIs.",
      "Implemented Firebase authentication and Docker deployment.",
      "Improved system performance and stability in production."
    ],
    tech: ["NestJS", "TypeScript", "React", "Firebase", "Docker"]
  },
  {
    id: "axceera",
    role: "Associate Software Engineer",
    company: "Axceera",
    period: "Jan 2025 – Jul 2025",
    description: [
      "Built REST APIs using NestJS for SaaS platform features.",
      "Implemented JWT and OAuth (Google, Apple, Facebook) authentication.",
      "Integrated Stripe for payments and developed admin APIs.",
      "Participated in client discussions to define technical requirements."
    ],
    tech: ["NestJS", "JWT", "OAuth", "Stripe", "REST APIs"]
  },
  {
    id: "avantrio",
    role: "Intern Software Engineer",
    company: "Avantrio",
    period: "Jul 2024 – Jan 2025",
    description: [
      "Developed backend APIs for search and data retrieval using NestJS.",
      "Integrated MySQL databases and built React/Material UI components.",
      "Assisted in backend debugging to improve API functionality."
    ],
    tech: ["NestJS", "MySQL", "React", "Material UI", "Backend APIs"]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "kdu",
    institution: "General Sir John Kotelawala Defence University",
    degree: "BSc (Hons) Software Engineering",
    period: "2021 - 2024"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "oops",
    title: "SaaS Digital Event Card Platform (Oops)",
    category: "SaaS Application",
    year: "2025",
    description: "Developed over 25 REST APIs with NestJS; implemented subscription and coupon systems.",
    tech: ["NestJS", "REST APIs", "Subscriptions", "Coupons"],
    link: "#",
    featured: true
  },
  {
    id: "dentiverse",
    title: "Healthcare Management Platform (Dentiverse)",
    category: "Healthcare SaaS",
    year: "2025",
    description: "Built a multi-user SaaS system for patient management and appointments with OAuth and Stripe integration.",
    tech: ["OAuth", "Stripe", "SaaS", "Patient Management"],
    link: "#",
    featured: true
  },
  {
    id: "sinhala-space",
    title: "Sinhala Dictionary & Linguistic Search (sinhala space)",
    category: "Data & Search",
    year: "2024",
    description: "Integrated MySQL and Neo4j for relational data; implemented Singlish-to-Sinhala conversion.",
    tech: ["MySQL", "Neo4j", "Linguistic Search", "Singlish to Sinhala"],
    link: "#",
    featured: true
  },
  {
    id: "cloud-devsecops",
    title: "Cloud DevSecOps Pipeline",
    category: "DevSecOps Pipeline",
    year: "2024",
    description: "Built CI/CD pipelines using Jenkins and ArgoCD (GitOps) with SonarQube and Trivy security scanning.",
    tech: ["Jenkins", "ArgoCD", "GitOps", "SonarQube", "Trivy"],
    link: "https://github.com/mk1shan/Devsecops-project-global-insights",
    featured: true
  },
  {
    id: "edureliefsl",
    title: "EduReliefSL",
    category: "Social Impact Platform",
    year: "2024",
    description: "A dedicated educational relief platform for flood-affected students in Sri Lanka. Provides direct access to study notes ranging from Grade 1 to A/L with live-updated resource links.",
    tech: ["React.js", "Web Platform", "Cloud Storage"],
    link: "https://www.edureliefsl.xyz/",
    featured: false
  },
  {
    id: "emocare",
    title: "EmoCare",
    category: "AI Mental Health Platform",
    year: "2024",
    description: "An AI-powered platform for depressed youth featuring mood-based recommendations, stress-relief games, and an emotion diary.",
    tech: ["RASA", "Python", "React.js", "Firebase", "LLM"],
    link: "#",
    featured: false
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "aws-solutions-architect-2026",
    title: "Ultimate AWS Certified Solutions Architect Associate 2026",
    issuer: "Udemy",
    link: "#",
    date: "2026"
  },
  {
    id: "decoding-devops-ai",
    title: "Decoding DevOps: From Basics to Advanced Projects",
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
    title: "Linux for Beginners with Hands-on Labs",
    issuer: "Kodekloud",
    link: "https://www.coursera.org/account/accomplishments/verify/768HITNDLH1U?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    date: "2024"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Backend",
    skills: ["NestJS", "Node.js", "REST APIs", "Prisma"]
  },
  {
    name: "Frontend",
    skills: ["React js", "Next.js", "Material UI"]
  },
  {
    name: "Databases",
    skills: ["MySQL", "PostgreSQL", "Neo4j"]
  },
  {
    name: "Infrastructure",
    skills: ["Docker", "Kubernetes (EKS)", "AWS", "Jenkins", "ArgoCD"]
  },
  {
    name: "Auth & Payments",
    skills: ["Firebase Auth", "OAuth", "JWT", "Stripe"]
  },
  {
    name: "Languages",
    skills: ["JavaScript", "TypeScript", "SQL"]
  }
];
