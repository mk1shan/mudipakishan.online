import React, { Suspense, useEffect, useState, useRef } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, ContactShadows, Text, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, CERTIFICATES, EDUCATION } from './constants';
import { Project, Experience, Certificate, Education } from './types';
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Twitter, Award, ExternalLink, GraduationCap } from 'lucide-react';

// --- 3D SCENE: LIQUID CHROME ---

const LiquidSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Subtle follow mouse
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 0.2, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 0.2, 0.1);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, y * 0.1, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.1, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#111"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={1}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={0.1}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

const BackgroundScene = () => {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <LiquidSphere />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
    </>
  );
};

// --- CUSTOM CURSOR ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 3 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />
    </>
  );
};

// --- UI COMPONENTS ---

const Header = () => {
  return (
    <header className="fixed top-0 w-full p-8 flex justify-between items-start z-50 mix-blend-difference text-white">
      <div className="flex flex-col">
        <span className="font-display font-bold text-xl tracking-tight">MUDIPA KISHAN</span>
        <span className="text-xs font-mono text-dim mt-1">PORTFOLIO '25</span>
      </div>
      <div className="hidden md:flex flex-col items-end text-xs font-mono text-dim">
        <span>AVAILABLE FOR WORK</span>
        <span>BASED IN SRI LANKA</span>
      </div>
      <div className="md:hidden">
        {/* Mobile placeholder */}
      </div>
    </header>
  );
};

const SectionHeader = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-baseline gap-4 mb-12 border-b border-white/10 pb-4">
    <span className="font-mono text-accent text-sm">({number})</span>
    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase">{title}</h2>
  </div>
);

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
      {/* Huge Typography Background */}
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-20 pointer-events-none select-none">
         <h1 className="text-[15vw] leading-none font-black text-stroke">DEVOPS</h1>
      </div>

      <div className="z-10 text-center mix-blend-difference">
         <motion.div
           initial={{ opacity: 0, y: 100 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
           <h1 className="text-6xl md:text-9xl font-display font-bold uppercase leading-[0.9] tracking-tighter mb-6">
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
           <p className="font-mono text-sm md:text-base text-white/70 max-w-md mx-auto">
             Blending architectural code with robust operations to build scalable digital ecosystems.
           </p>
           <div className="w-[1px] h-24 bg-accent mt-8"></div>
         </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end font-mono text-xs text-white/50">
         <span>SCROLL TO EXPLORE</span>
         <span className="text-accent animate-pulse">● OPEN FOR OPPORTUNITIES</span>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <SectionHeader number="01" title="The Engineer" />
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 text-xl md:text-3xl leading-relaxed font-light">
          <p className="mb-8">
            I am <span className="text-accent">Mudipa Kishan</span>. An Associate Software Engineer bridging the gap between <span className="italic font-serif">development</span> and <span className="italic font-serif">operations</span>.
          </p>
          <p className="text-white/60">
            With a background at Axceera and Avantrio, I now specialize in designing scalable cloud architectures, automating CI/CD pipelines, and building resilient full-stack applications. I don't just write code; I engineer reliable systems.
          </p>
        </div>
        
        <div className="md:col-span-4 font-mono text-sm text-white/50 space-y-8">
           <div>
             <h3 className="text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
               {SKILLS.flatMap(s => s.skills).map((skill, i) => (
                 <span key={i} className="px-2 py-1 border border-white/10 rounded-full hover:border-accent hover:text-accent transition-colors cursor-none">
                   {skill}
                 </span>
               ))}
             </div>
           </div>
           
           <div>
             <h3 className="text-white mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Focus</h3>
             <ul className="space-y-1">
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
      className="group relative block border-t border-white/10 py-12 hover:bg-white/5 transition-colors duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 px-4">
        <h3 className="text-4xl md:text-6xl font-display font-bold uppercase group-hover:translate-x-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {project.title}
        </h3>
        <div className="flex items-center gap-8 md:gap-16 group-hover:-translate-x-4 transition-transform duration-500">
           <span className="font-mono text-xs md:text-sm text-accent">{project.category}</span>
           <span className="font-mono text-xs text-white/40">{project.year}</span>
           <ArrowUpRight className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
      
      {/* Description Reveal */}
      <div className="max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-500 px-4">
         <p className="pt-4 text-white/60 max-w-2xl font-mono text-sm">{project.description}</p>
         <div className="flex gap-2 mt-4">
           {project.tech.map((t: string) => (
             <span key={t} className="text-[10px] border border-white/10 px-2 py-0.5 rounded-full text-white/40">{t}</span>
           ))}
         </div>
      </div>
    </motion.a>
  );
};

const Projects = () => {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
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
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-sm text-white/50">
      {exp.period}
    </div>
    <div className="md:col-span-9">
      <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">{exp.role}</h3>
      <h4 className="text-lg text-white/80 mb-6">{exp.company}</h4>
      <ul className="space-y-2 text-white/60 font-light list-none">
        {exp.description.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const ExperienceSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
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
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-white/10 group hover:border-accent/50 transition-colors">
    <div className="md:col-span-3 font-mono text-sm text-white/50">
      {edu.period}
    </div>
    <div className="md:col-span-9 flex flex-col gap-2">
      <h3 className="text-2xl font-display font-bold group-hover:text-accent transition-colors">{edu.institution}</h3>
      <h4 className="text-lg text-white/80 flex items-center gap-2">
        <GraduationCap size={20} className="text-accent" />
        {edu.degree}
      </h4>
    </div>
  </div>
);

const EducationSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
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
    className="group border border-white/10 p-8 flex flex-col justify-between hover:border-accent transition-all duration-300 bg-surface/30 backdrop-blur-sm min-h-[200px]"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-white/5 rounded-full group-hover:bg-accent group-hover:text-black transition-colors duration-300">
        <Award size={24} />
      </div>
      <ExternalLink size={20} className="text-white/30 group-hover:text-accent transition-colors duration-300" />
    </div>
    
    <div>
      <h3 className="text-xl font-display font-bold uppercase leading-tight mb-2 group-hover:text-accent transition-colors duration-300">
        {cert.title}
      </h3>
      <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase">
        <span className="text-accent">{cert.issuer}</span>
        {cert.date && <span>• {cert.date}</span>}
      </div>
    </div>
  </a>
);

const Certificates = () => {
  return (
    <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
      <SectionHeader number="05" title="Credentials" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATES.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-32 px-6 md:px-20 border-t border-white/10 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h2 className="text-[10vw] font-black uppercase leading-none mb-12 mix-blend-difference hover:text-stroke-accent transition-all duration-500 cursor-none">
          Let's Talk
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16">
          <a href={`mailto:${PERSONAL_INFO.contact.email}`} className="px-8 py-4 border border-white/20 rounded-full hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-bold tracking-widest uppercase text-sm">
            {PERSONAL_INFO.contact.email}
          </a>
        </div>

        <div className="flex justify-center gap-12 text-white/40">
           {PERSONAL_INFO.socials.map((social) => (
             <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
               <social.icon size={24} />
             </a>
           ))}
        </div>
        
        <div className="mt-32 flex justify-between text-xs font-mono text-white/20 uppercase">
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
        <CustomCursor />
        <Header />
        
        {/* Fixed 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
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