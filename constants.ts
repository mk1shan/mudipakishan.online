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
    email: "mudipakishanimayanga@gmail.com",
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
    { name: "Email", icon: Mail, url: "mailto:mudipakishanimayanga@gmail.com" }
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
    period: "Jul 2024 – Dec 2024",
    description: [
      "Engineered backend solutions using NestJS and Neo4j for scalable graph-based data management.",
      "Developed full-stack features using the MERN stack, ensuring seamless integration between frontend and backend.",
      "Built dynamic, high-performance user interfaces with React, adhering to modern design principles."
    ],
    tech: ["NestJS", "Neo4j", "React.js", "MERN Stack", "TypeScript"]
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
    id: "frontend-eks-deploy",
    title: "Frontend Application Deployment on Amazon EKS",
    category: "Cloud Deployment",
    year: "2024",
    description: "Automated deployment pipeline for a frontend application on Amazon EKS using Jenkins or Terraform.",
    tech: ["AWS EKS", "Terraform", "Jenkins", "Docker", "Kubernetes"],
    link: "https://github.com/mk1shan/Frontend-Application-Deployment-on-Amazon-EKS"
  },
  {
    id: "global-insights-devsecops",
    title: "Global Insights DevSecOps",
    category: "DevSecOps Pipeline",
    year: "2024",
    description: "Comprehensive DevSecOps pipeline implementation featuring security scanning, continuous integration, and monitoring.",
    tech: ["Jenkins", "SonarQube", "Trivy", "Prometheus", "Grafana"],
    link: "https://github.com/mk1shan/Devsecops-project-global-insights"
  },
  {
    id: "wallpaper-app-devsecops",
    title: "Wallpaper App DevSecOps",
    category: "Secure CI/CD",
    year: "2024",
    description: "End-to-end DevSecOps pipeline for the Wallpaper App, integrating security checks and automated deployment.",
    tech: ["Jenkins", "OWASP ZAP", "Docker", "Kubernetes", "AWS"],
    link: "https://github.com/mk1shan/wallpaper-app-devscops-project"
  },
  {
    id: "three-tier-devops",
    title: "Three-Tier DevOps Project",
    category: "Infrastructure Architecture",
    year: "2024",
    description: "Deployment of a three-tier architecture application using modern DevOps practices and Infrastructure as Code.",
    tech: ["Terraform", "AWS", "Docker", "Kubernetes", "MySQL"],
    link: "https://github.com/mk1shan/Three-tier-devops-project"
  },
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
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "decoding-devops-ai",
    title: "Decoding DevOps From Basics to Advanced Projects with AI",
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
    title: "Linux for beginners with Hands on Labs",
    issuer: "Kodekloud",
    link: "https://www.coursera.org/account/accomplishments/verify/768HITNDLH1U?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
    date: "2024"
  },
  {
    id: "aws-cloud-101",
    title: "AWS Educate Introduction to Cloud 101",
    issuer: "AWS",
    link: "https://www.credly.com/badges/36c76257-60f3-46e3-a3db-51efc2d281d2/linked_in_profile",
    date: "2024"
  },
  {
    id: "aws-storage-started",
    title: "AWS Educate Getting Started with Storage",
    issuer: "AWS",
    link: "https://www.credly.com/badges/33b86046-9f07-4de1-902e-64b0e52fd515/linked_in_profile",
    date: "2024"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Cloud Platforms",
    skills: ["AWS (EC2, EKS, VPC, S3, IAM, ECR, Fargate)", "Azure"]
  },
  {
    name: "Containerization & Orchestration",
    skills: ["Kubernetes (EKS, Kind, Kubeadm)", "Docker (Multi-stage builds)"]
  },
  {
    name: "Infrastructure as Code (IaC)",
    skills: ["Terraform"]
  },
  {
    name: "CI/CD & GitOps",
    skills: ["Jenkins", "GitHub Actions", "Argo CD"]
  },
  {
    name: "Security & Quality",
    skills: ["SonarQube (Static Analysis)", "Trivy"]
  },
  {
    name: "Monitoring & Observability",
    skills: ["Prometheus", "Grafana", "Node Exporter"]
  },
  {
    name: "Programming & Scripting",
    skills: ["Python", "Java", "JavaScript", "Node.js", "Bash"]
  },
  {
    name: "Web & Frameworks",
    skills: ["React", "NestJS", "Vite", "Astro.js"]
  },
  {
    name: "Databases",
    skills: ["SQL", "MongoDB"]
  }
];
