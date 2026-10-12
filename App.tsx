import React, { Suspense, useEffect, useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, ContactShadows, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import {
  PERSONAL_INFO,
  EXPERIENCE,
  PROJECTS,
  COMPANY_PROJECTS,
  PERSONAL_PROJECTS,
  OPEN_SOURCE_CONTRIBUTIONS,
  SKILLS,
  CERTIFICATES,
  EDUCATION
} from './constants';
import { Project, Experience, Certificate, Education, OpenSourceContribution } from './types';
import {
  ArrowUpRight,
  Award,
  ExternalLink,
  GraduationCap,
  Menu,
  X,
  GitPullRequest,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import MediumArticles from './MediumArticles';

// --- 3D SCENE: LIQUID CHROME ---

const LiquidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport, size } = useThree();
  const isMobile = size.width < 768;

  useFrame(() => {
    if (meshRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;

      const lerpSpeed = isMobile ? 0.05 : 0.1;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.2, lerpSpeed);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.2, lerpSpeed);

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.1, lerpSpeed);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.1, lerpSpeed);
    }
  });

  const segments = isMobile ? 32 : 64;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={isMobile ? 1.4 : 1.8}>
        <sphereGeometry args={[1, segments, segments]} />
        <MeshDistortMaterial
          color={isMobile ? "#1a1a1a" : "#111"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={isMobile ? 0.05 : 0.1}
          metalness={1}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={isMobile ? 0.05 : 0.1}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

const BackgroundScene = () => {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={isMobile ? 0.6 : 0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isMobile ? 1.2 : 1} castShadow={!isMobile} />
      <LiquidSphere />
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 500 : 1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <ContactShadows
        resolution={isMobile ? 512 : 1024}
        scale={10}
        blur={2}
        opacity={isMobile ? 0.6 : 0.5}
        far={10}
        color="#000000"
      />
    </>
  );
};

// --- UI COMPONENTS ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (id: string, isPage: boolean) => {
    if (isPage) {
      navigate(id);
      setIsMenuOpen(false);
      window.scrollTo(0, 0);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'About', id: 'about', isPage: false },
    { label: 'Experience', id: 'experience', isPage: false },
    { label: 'Projects', id: 'projects', isPage: false },
    { label: 'Open Source', id: 'opensource', isPage: false },
    { label: 'Education', id: 'education', isPage: false },
    { label: 'Articles', id: '/medium', isPage: true },
    { label: 'Contact', id: 'contact', isPage: false }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('hero', false)}
            className="flex flex-col text-left hover:opacity-80 transition-opacity"
          >
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">
              MUDIPA KISHAN
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-dim mt-0.5">
              FULLSTACK ENGINEER
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end text-xs font-mono text-dim mr-4">
              <span>AVAILABLE FOR WORK</span>
              <span>TANGALLE, SRI LANKA</span>
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.id, item.isPage)}
                  className={`text-sm font-mono text-white/70 hover:text-accent transition-colors uppercase tracking-wider ${location.pathname === item.id ? 'text-accent' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-background/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.id, item.isPage)}
                className="block w-full text-left text-base font-mono text-white/70 hover:text-accent transition-colors uppercase tracking-wider py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-dim space-y-1">
              <div>AVAILABLE FOR WORK</div>
              <div>TANGALLE, SRI LANKA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-baseline gap-2 sm:gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-3 sm:pb-4">
    <span className="font-mono text-accent text-xs sm:text-sm">({number})</span>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold uppercase">{title}</h2>
  </div>
);

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 overflow-hidden pt-16 md:pt-0">
      {/* Huge Typography Background */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-15 sm:opacity-20 pointer-events-none select-none">
        <h1 className="text-[18vw] sm:text-[14vw] leading-none font-black text-stroke">FULLSTACK</h1>
      </div>

      <div className="relative z-10 text-center mix-blend-difference w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-accent text-xs sm:text-sm md:text-base tracking-widest uppercase mb-3">
            NestJS · React/Next.js · Spring Boot · AWS
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold uppercase leading-[0.95] tracking-tighter mb-4 sm:mb-6 px-2">
            Fullstack<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>Software Engineer</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto px-4 leading-relaxed">
            Developing and delivering production web applications across frontend and backend environments with robust APIs, authentication, and cloud-based deployments.
          </p>
          <div className="w-[1px] h-14 sm:h-20 bg-accent mt-4 sm:mt-6"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 font-mono text-[10px] sm:text-xs text-white/50">
        <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
        <span className="text-accent animate-pulse">● OPEN FOR OPPORTUNITIES · SRI LANKA</span>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="01" title="Profile & Skills" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        <div className="md:col-span-7 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
          <p className="mb-6 text-white font-normal">
            I am <span className="text-accent font-semibold">{PERSONAL_INFO.name}</span>. A Fullstack Software Engineer with professional experience developing and delivering production web applications across frontend and backend environments.
          </p>
          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            {PERSONAL_INFO.profile}
          </p>
          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-accent" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-accent" />
              <span>{PERSONAL_INFO.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-accent" />
              <span>{PERSONAL_INFO.contact.phone}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 font-mono space-y-6">
          <h3 className="text-white text-sm sm:text-base uppercase tracking-widest border-b border-white/10 pb-2 flex items-center justify-between">
            <span>Technical Skills</span>
            <span className="text-accent text-xs">CV Verified</span>
          </h3>

          <div className="space-y-4">
            {SKILLS.map((cat) => (
              <div key={cat.name} className="border border-white/5 bg-surface/40 p-3 sm:p-4 rounded-lg">
                <span className="text-accent text-xs tracking-wider block mb-2 uppercase font-bold">
                  {cat.name}
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10px] sm:text-xs border border-white/10 rounded bg-white/5 hover:border-accent hover:text-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceItem: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-xs sm:text-sm text-accent">
      <span className="inline-block px-2.5 py-1 border border-accent/20 bg-accent/5 rounded">
        {exp.period}
      </span>
    </div>
    <div className="md:col-span-9">
      <h3 className="text-xl sm:text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">
        {exp.role}
      </h3>
      <h4 className="text-base sm:text-lg text-white/90 font-medium mb-4">
        {exp.company}
      </h4>
      <ul className="space-y-2.5 text-sm sm:text-base text-white/70 font-light list-none mb-4">
        {exp.description.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {exp.tech && (
        <div className="flex flex-wrap gap-2 pt-2">
          {exp.tech.map((t) => (
            <span key={t} className="text-[10px] sm:text-xs font-mono border border-white/10 px-2 py-0.5 rounded text-white/50">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="02" title="Work Experience" />
      <div className="flex flex-col">
        {EXPERIENCE.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="border border-white/10 hover:border-accent/60 bg-surface/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl transition-all duration-300 flex flex-col justify-between group"
    >
      <div>
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded">
              {project.category}
            </span>
            {project.company && (
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-white/5 text-white/70 border border-white/10 rounded">
                {project.company}
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-white/40">{project.year}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-accent transition-colors mb-3">
          {project.title}
        </h3>

        <p className="text-sm sm:text-base text-white/70 font-light mb-4 leading-relaxed">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4 pt-3 border-t border-white/10 space-y-2">
            {(expanded ? project.highlights : project.highlights.slice(0, 3)).map((hl, i) => (
              <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/60">
                <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
            {project.highlights.length > 3 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs font-mono text-accent hover:underline pt-1"
              >
                {expanded ? "Show less" : `+${project.highlights.length - 3} more details`}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-white/10">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span key={t} className="text-[10px] sm:text-xs font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/60">
              {t}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-accent transition-colors uppercase tracking-wider"
          >
            <span>View Source / Details</span>
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState<'all' | 'company' | 'personal'>('all');

  const displayedProjects = filter === 'all'
    ? PROJECTS
    : filter === 'company'
      ? COMPANY_PROJECTS
      : PERSONAL_PROJECTS;

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="03" title="Projects & Platforms" />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 font-mono text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full border transition-all ${filter === 'all'
            ? 'bg-accent text-black font-bold border-accent'
            : 'border-white/10 text-white/70 hover:border-white/30'
            }`}
        >
          ALL PROJECTS ({PROJECTS.length})
        </button>
        <button
          onClick={() => setFilter('company')}
          className={`px-4 py-2 rounded-full border transition-all ${filter === 'company'
            ? 'bg-accent text-black font-bold border-accent'
            : 'border-white/10 text-white/70 hover:border-white/30'
            }`}
        >
          COMPANY PLATFORMS (PIXELX) ({COMPANY_PROJECTS.length})
        </button>
        <button
          onClick={() => setFilter('personal')}
          className={`px-4 py-2 rounded-full border transition-all ${filter === 'personal'
            ? 'bg-accent text-black font-bold border-accent'
            : 'border-white/10 text-white/70 hover:border-white/30'
            }`}
        >
          PERSONAL & OPEN-SOURCE ({PERSONAL_PROJECTS.length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {displayedProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const OpenSourceSection = () => {
  return (
    <section id="opensource" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="04" title="Open Source Contributions" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {OPEN_SOURCE_CONTRIBUTIONS.map((item) => (
          <a
            key={item.id}
            href={item.link || "https://github.com/mk1shan"}
            target="_blank"
            rel="noreferrer"
            className="group border border-white/10 p-6 rounded-xl hover:border-accent bg-surface/30 backdrop-blur-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent group-hover:text-black transition-colors">
                  <GitPullRequest size={18} />
                </div>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-accent transition-colors">
                {item.project}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-mono leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>CONTRIBUTION</span>
              <span className="text-accent group-hover:underline">VIEW ON GITHUB</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

const EducationItem: React.FC<{ edu: Education }> = ({ edu }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-xs sm:text-sm text-accent">
      <span className="inline-block px-2.5 py-1 border border-accent/20 bg-accent/5 rounded">
        {edu.period}
      </span>
    </div>
    <div className="md:col-span-9 flex flex-col gap-2">
      <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-accent transition-colors">
        {edu.institution}
      </h3>
      <h4 className="text-base sm:text-lg text-white/80 flex items-center gap-2">
        <GraduationCap size={18} className="text-accent shrink-0" />
        <span>{edu.degree}</span>
      </h4>
    </div>
  </div>
);

const EducationSection = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="05" title="Education & Credentials" />

      <div className="mb-12">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-4">Degree</h3>
        <div className="flex flex-col">
          {EDUCATION.map((edu) => (
            <EducationItem key={edu.id} edu={edu} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-6">Courses & Certificates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CERTIFICATES.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificateCard: React.FC<{ cert: Certificate }> = ({ cert }) => (
  <a
    href={cert.link}
    target="_blank"
    rel="noreferrer"
    className="group border border-white/10 p-6 flex flex-col justify-between hover:border-accent transition-all duration-300 bg-surface/30 backdrop-blur-sm min-h-[180px] rounded-xl"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 sm:p-2.5 bg-white/5 rounded-lg group-hover:bg-accent group-hover:text-black transition-colors duration-300">
        <Award size={20} />
      </div>
      <ExternalLink size={16} className="text-white/30 group-hover:text-accent transition-colors duration-300" />
    </div>

    <div>
      <h3 className="text-sm sm:text-base font-display font-bold uppercase leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
        {cert.title}
      </h3>
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/50 uppercase">
        <span className="text-accent">{cert.issuer}</span>
        {cert.date && <span>{cert.date}</span>}
      </div>
    </div>
  </a>
);

const Footer = () => {
  return (
    <footer id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-20 border-t border-white/10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="font-mono text-accent text-xs sm:text-sm tracking-widest uppercase mb-3">
          Get In Touch
        </div>
        <h2 className="text-[12vw] sm:text-[10vw] font-black uppercase leading-none mb-8 sm:mb-12 mix-blend-difference hover:text-stroke-accent transition-all duration-500">
          Let's Talk
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <a
            href={`mailto:${PERSONAL_INFO.contact.email}`}
            className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-bold tracking-widest uppercase text-xs sm:text-sm flex items-center gap-2"
          >
            <Mail size={16} />
            <span>{PERSONAL_INFO.contact.email}</span>
          </a>
          <a
            href={`tel:${PERSONAL_INFO.contact.phone.replace(/\s+/g, '')}`}
            className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-bold tracking-widest uppercase text-xs sm:text-sm flex items-center gap-2"
          >
            <Phone size={16} />
            <span>{PERSONAL_INFO.contact.phone}</span>
          </a>
        </div>

        <div className="flex justify-center gap-8 sm:gap-12 text-white/40 mb-12">
          {PERSONAL_INFO.socials.map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors" title={social.name}>
              <social.icon size={22} />
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs font-mono text-white/30 uppercase">
          <span>{new Date().getFullYear()} © Mudipa Kishan · Fullstack Software Engineer</span>
          <span>Tangalle, Sri Lanka</span>
        </div>
      </div>

      {/* Background Accent Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

// --- MAIN APP ---

const Home = () => (
  <>
    <Hero />
    <div className="bg-background/80 backdrop-blur-sm">
      <About />
      <ExperienceSection />
      <ProjectsSection />
      <OpenSourceSection />
      <EducationSection />
      <Footer />
    </div>
  </>
);

export default function App() {
  return (
    <Router>
      <div className="relative bg-background min-h-screen">
        <Navbar />

        {/* Fixed 3D Background - Visible on all devices with optimized settings */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            opacity: 0.7,
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: false,
              alpha: false,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
              stencil: false,
              depth: true
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 0
            }}
          >
            <Suspense fallback={null}>
              <BackgroundScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Scrollable Content */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medium" element={<MediumArticles />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
