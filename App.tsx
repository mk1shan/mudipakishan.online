import React, { Suspense, useEffect, useState, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, ContactShadows, Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, CERTIFICATES, EDUCATION } from './constants';
import { Project, Experience, Certificate, Education } from './types';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Twitter, Award, ExternalLink, GraduationCap, Menu, X } from 'lucide-react';

// --- 3D SCENE: LIQUID CHROME ---

const LiquidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport, size } = useThree();
  const isMobile = size.width < 768;
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Subtle follow mouse (reduced on mobile for performance)
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      const lerpSpeed = isMobile ? 0.05 : 0.1;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.2, lerpSpeed);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.2, lerpSpeed);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.1, lerpSpeed);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.1, lerpSpeed);
    }
  });

  // Optimize geometry for mobile
  const segments = isMobile ? 64 : 128;

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
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isMobile ? 1.2 : 1} castShadow />
      <LiquidSphere />
      {/* Reduced star count on mobile for performance */}
      <Stars 
        radius={100} 
        depth={50} 
        count={isMobile ? 500 : 1000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      {/* Lower shadow resolution on mobile */}
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Education', id: 'education' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col hover:opacity-80 transition-opacity"
          >
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white">
              MUDIPA KISHAN
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-dim mt-0.5">
              PORTFOLIO '25
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="hidden lg:flex flex-col items-end text-xs font-mono text-dim mr-4">
              <span>AVAILABLE FOR WORK</span>
              <span>BASED IN SRI LANKA</span>
            </div>
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-mono text-white/70 hover:text-accent transition-colors uppercase tracking-wider"
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
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-base font-mono text-white/70 hover:text-accent transition-colors uppercase tracking-wider py-2"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 text-xs font-mono text-dim space-y-1">
              <div>AVAILABLE FOR WORK</div>
              <div>BASED IN SRI LANKA</div>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

const SectionHeader = ({ number, title }: { number: string, title: string }) => (
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
         <h1 className="text-[20vw] sm:text-[15vw] leading-none font-black text-stroke">DEVOPS</h1>
      </div>

      <div className="relative z-10 text-center mix-blend-difference w-full">
         <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
           <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-display font-bold uppercase leading-[0.9] tracking-tighter mb-4 sm:mb-6 px-2">
             Software<br />
             <span className="text-transparent" style={{ WebkitTextStroke: '2px #fff' }}>& DevOps</span>
           </h1>
         </motion.div>
         
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center gap-4"
         >
           <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 max-w-md mx-auto px-4">
             Blending architectural code with robust operations to build scalable digital ecosystems.
           </p>
           <div className="w-[1px] h-16 sm:h-24 bg-accent mt-4 sm:mt-8"></div>
         </motion.div>
      </div>
      
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 font-mono text-[10px] sm:text-xs text-white/50">
         <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
         <span className="text-accent animate-pulse">● OPEN FOR OPPORTUNITIES</span>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="01" title="The Engineer" />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12">
        <div className="md:col-span-8 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
          <p className="mb-6 sm:mb-8">
            I am <span className="text-accent">Mudipa Kishan</span>. An Associate Software Engineer bridging the gap between <span className="italic font-serif">development</span> and <span className="italic font-serif">operations</span>.
          </p>
          <p className="text-white/60 text-base sm:text-lg md:text-xl lg:text-2xl">
            With a background at Axceera and Avantrio, I now specialize in designing scalable cloud architectures, automating CI/CD pipelines, and building resilient full-stack applications. I don't just write code; I engineer reliable systems.
          </p>
        </div>
        
        <div className="md:col-span-4 font-mono text-xs sm:text-sm text-white/50 space-y-6 sm:space-y-8">
           <div>
             <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-widest border-b border-white/10 pb-2">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
               {SKILLS.flatMap(s => s.skills).map((skill, i) => (
                 <span key={i} className="px-2 py-1 text-[10px] sm:text-xs border border-white/10 rounded-full hover:border-accent hover:text-accent transition-colors">
                   {skill}
                 </span>
               ))}
             </div>
           </div>
           
           <div>
             <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-widest border-b border-white/10 pb-2">Focus</h3>
             <ul className="space-y-1 text-xs sm:text-sm">
               <li>DevOps Engineering</li>
               <li>Cloud Architecture</li>
               <li>Full Stack Development</li>
               <li>System Automation</li>
             </ul>
           </div>
        </div>
      </div>
    </section>
  );
};

const ProjectRow: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  return (
    <motion.a 
      href={project.link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative block border-t border-white/10 py-6 sm:py-8 md:py-12 hover:bg-white/5 transition-colors duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4 px-2 sm:px-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-display font-bold uppercase group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {project.title}
        </h3>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 group-hover:-translate-x-2 md:group-hover:-translate-x-4 transition-transform duration-500">
           <span className="font-mono text-[10px] sm:text-xs md:text-sm text-accent">{project.category}</span>
           <span className="font-mono text-[10px] sm:text-xs text-white/40">{project.year}</span>
           <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      {/* Description Reveal */}
      <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 px-2 sm:px-4">
         <p className="pt-3 sm:pt-4 text-white/60 max-w-2xl font-mono text-xs sm:text-sm">{project.description}</p>
         <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
           {project.tech.map((t: string) => (
             <span key={t} className="text-[9px] sm:text-[10px] border border-white/10 px-2 py-0.5 rounded-full text-white/40">{t}</span>
           ))}
         </div>
      </div>
    </motion.a>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="02" title="Selected Works" />
      <div className="flex flex-col">
        {PROJECTS.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="border-t border-white/10"></div>
    </section>
  );
};

const ExperienceItem: React.FC<{ exp: Experience }> = ({ exp }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-12 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-xs sm:text-sm text-white/50">
      {exp.period}
    </div>
    <div className="md:col-span-9">
      <h3 className="text-xl sm:text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">{exp.role}</h3>
      <h4 className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">{exp.company}</h4>
      <ul className="space-y-2 text-sm sm:text-base text-white/60 font-light list-none">
        {exp.description.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="03" title="Trajectory" />
      <div className="flex flex-col">
        {EXPERIENCE.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </div>
    </section>
  );
};

const EducationItem: React.FC<{ edu: Education }> = ({ edu }) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-xs sm:text-sm text-white/50">
      {edu.period}
    </div>
    <div className="md:col-span-9 flex flex-col gap-2">
      <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-accent transition-colors">{edu.institution}</h3>
      <h4 className="text-base sm:text-lg text-white/80 flex items-center gap-2">
        <GraduationCap size={18} className="sm:w-5 sm:h-5 text-accent shrink-0" />
        <span>{edu.degree}</span>
      </h4>
    </div>
  </div>
);

const EducationSection = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="04" title="Education" />
      <div className="flex flex-col">
        {EDUCATION.map((edu) => (
          <EducationItem key={edu.id} edu={edu} />
        ))}
      </div>
    </section>
  );
};

const CertificateCard: React.FC<{ cert: Certificate }> = ({ cert }) => (
  <a 
    href={cert.link}
    target="_blank"
    rel="noreferrer"
    className="group border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-accent transition-all duration-300 bg-surface/30 backdrop-blur-sm min-h-[180px] sm:min-h-[200px]"
  >
    <div className="flex justify-between items-start mb-4 sm:mb-6">
      <div className="p-2 sm:p-3 bg-white/5 rounded-full group-hover:bg-accent group-hover:text-black transition-colors duration-300">
        <Award size={20} className="sm:w-6 sm:h-6" />
      </div>
      <ExternalLink size={18} className="sm:w-5 sm:h-5 text-white/30 group-hover:text-accent transition-colors duration-300" />
    </div>
    
    <div>
      <h3 className="text-base sm:text-lg md:text-xl font-display font-bold uppercase leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
        {cert.title}
      </h3>
      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-white/50 uppercase">
        <span className="text-accent">{cert.issuer}</span>
        {cert.date && <span>• {cert.date}</span>}
      </div>
    </div>
  </a>
);

const Certificates = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 max-w-7xl mx-auto">
      <SectionHeader number="05" title="Credentials" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CERTIFICATES.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-20 border-t border-white/10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-[12vw] sm:text-[10vw] font-black uppercase leading-none mb-8 sm:mb-12 mix-blend-difference hover:text-stroke-accent transition-all duration-500">
          Let's Talk
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-16 mb-12 sm:mb-16">
          <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-bold tracking-widest uppercase text-xs sm:text-sm">
            {PERSONAL_INFO.contact.email}
          </a>
        </div>

        <div className="flex justify-center gap-8 sm:gap-12 text-white/40">
           {PERSONAL_INFO.socials.map((social) => (
             <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
               <social.icon size={20} className="sm:w-6 sm:h-6" />
             </a>
           ))}
        </div>
        
        <div className="mt-16 sm:mt-24 md:mt-32 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 text-[10px] sm:text-xs font-mono text-white/20 uppercase">
          <span>{new Date().getFullYear()} © Mudipa Kishan</span>
          <span>Designed & Engineered</span>
        </div>
      </div>
      
      {/* Background Accent Gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

// --- MAIN APP ---

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
            dpr={[0.5, 2]}
            performance={{ min: 0.5 }}
            gl={{ 
              antialias: true,
              alpha: false,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true
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
          <Hero />
          <div className="bg-background/80 backdrop-blur-sm">
            <About />
            <ExperienceSection />
            <Projects />
            <EducationSection />
            <Certificates />
            <Footer />
          </div>
        </main>
      </div>
    </Router>
  );
}

