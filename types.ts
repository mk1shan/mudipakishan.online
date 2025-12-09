export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  link?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech?: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  link: string;
  date?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
}