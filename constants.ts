import { Experience, Project, SkillCategory, Certificate, Education } from './types';
import { Github, Linkedin, Mail, MapPin, Phone, Globe, ExternalLink } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Mudipa Kishan",
  initials: "MK",
  role: "Associate Software Engineer",
  taglines: [
    "DevOps Engineer",
    "Software Engineer",
    "Creative Technologist"
  ],
  contact: {
    email: "mudipaimayangakdu@gmail.com",
    phone: "+94712416779",
    address: "No,147, Kasagala, Weeraketiya",
    website: "https://mudipakishan.me",
    github: "https://github.com/mk1shan",
    linkedin: "https://www.linkedin.com/in/mudipa-kishan/"
  },
  socials: [
    { name: "GitHub", icon: Github, url: "https://github.com/mk1shan" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/mudipa-kishan/" },
    { name: "Behance", icon: ExternalLink, url: "https://www.behance.net/mudipakishan" },
    { name: "Email", icon: Mail, url: "mailto:mudipaimayangakdu@gmail.com" }
  ]
};

export const EXPERIENCE: Experience[] = [
  {
    id: "axceera",
    role: "Associate Software Engineer",
    company: "Axceera",
    period: "Jan 2025 – Sep 2025",
    description: [
      "Work with React.js, Node.js, cloud services, backend APIs, and production-grade engineering practices.",
      "Contribute to scalable architectures, feature ownership, and performance improvements.",
      "Follow industry best practices: CI/CD, testing, code reviews, design systems."
    ],
    tech: ["React.js", "Node.js", "Cloud", "CI/CD"]
  },
  {
    id: "avantrio",
    role: "Trainee Software Engineer",
    company: "Avantrio (Pvt) Ltd",
    period: "Jul 2024 – Present",
    description: [
      "Built mental health tracking tools and emotion diary applications.",
      "Developed mood-based recommendations using LLMs (Cohere).",
      "Created stress-relief mini-games and depression-level analysis tools."
    ],
    tech: ["RASA", "Python", "React.js", "Firebase", "LLM (Cohere)"]
  }
];

export const EDUCATION: Education[] = [
  {
    id: "kdu",
    institution: "General Sir John Kotelawala Defence University",
    degree: "BSc (Hons) Software Engineering",
    period: "2021 - 2025"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "edureliefsl",
    title: "EduReliefSL",
    category: "Social Impact Platform",
    year: "2024",
    description: "A dedicated educational relief platform for flood-affected students in Sri Lanka. Provides direct access to study notes ranging from Grade 1 to A/L with live-updated resource links.",
    tech: ["React.js", "Web Platform", "Cloud Storage"],
    link: "https://www.edureliefsl.xyz/",
    featured: true
  },
  {
    id: "emocare",
    title: "EmoCare",
    category: "AI Mental Health Platform",
    year: "2024",
    description: "An AI-powered platform for depressed youth featuring mood-based recommendations, stress-relief games, and an emotion diary.",
    tech: ["RASA", "Python", "React.js", "Firebase", "LLM"],
    link: "#",
    featured: true
  },
  {
    id: "skillshare",
    title: "Skillshare Platform",
    category: "Knowledge Sharing",
    year: "2024",
    description: "A peer-to-peer knowledge sharing network with feed, profiles, article posting, and search capabilities.",
    tech: ["React.js", "Firebase", "Node.js", "Express"],
    link: "#"
  },
  {
    id: "stockwise",
    title: "StockWise",
    category: "Inventory System",
    year: "2024",
    description: "Comprehensive inventory management system handling categories, users, customers, and orders with role-based logic.",
    tech: ["Java", "MySQL"],
    link: "#"
  },
  {
    id: "tiny-teeth",
    title: "Tiny Teeth",
    category: "Hospital Management",
    year: "2022",
    description: "Dental hospital management system for patient, doctor, and user management.",
    tech: ["HTML", "CSS", "JS", "PHP"],
    link: "#"
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "coursera-1",
    title: "Professional Certification",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/768HITNDLH1U?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    date: "2023"
  },
  {
    id: "credly-1",
    title: "Professional Badge",
    issuer: "Credly",
    link: "https://www.credly.com/badges/97f52a33-0d5c-4219-b735-6624bb37b827/linked_in_profile",
    date: "2023"
  },
  {
    id: "coursera-2",
    title: "Specialization Certificate",
    issuer: "Coursera",
    link: "https://coursera.org/share/e4b7801f20f555e21b2a773c49768875",
    date: "2023"
  },
  {
    id: "credly-2",
    title: "Technical Achievement",
    issuer: "Credly",
    link: "https://www.credly.com/badges/36c76257-60f3-46e3-a3db-51efc2d281d2/linked_in_profile",
    date: "2023"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React.js", "Next.js", "Three.js", "Astro.js", "Gatsby.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    name: "Backend",
    skills: ["Node.js", "NestJS", "Express", "Python", "Java", "PHP"]
  },
  {
    name: "Data & AI",
    skills: ["SQL", "MySQL", "Firebase", "RASA", "LLM Integrations"]
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "AWS", "Git", "Figma", "CI/CD"]
  }
];
