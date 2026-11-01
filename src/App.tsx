import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Real Badge Data including AI for Bharat & crisp vector Microsoft Certified Fundamentals
const BADGES = [
  {
    id: 'gcp-arcade',
    title: 'Google Cloud Arcade',
    subtitle: 'GDP Arcade Milestone',
    issuer: 'Google Cloud',
    file: '/assets/badges/badge-google-cloud-arcade.png'
  },
  {
    id: 'aws-ccp',
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'Foundational Certification',
    issuer: 'Amazon Web Services',
    file: '/assets/badges/badge-aws.png'
  },
  {
    id: 'aviatrix-ace',
    title: 'Aviatrix ACE Associate',
    subtitle: 'Multi-Cloud Networking',
    issuer: 'Aviatrix Systems',
    file: '/assets/badges/badge-aviatrix.png'
  },
  {
    id: 'azure-ai',
    title: 'Microsoft Azure AI Fundamentals',
    subtitle: 'AI-900 Credential',
    issuer: 'Microsoft',
    file: '/assets/badges/badge-microsoft-azure.svg'
  },
  {
    id: 'ai-for-bharat',
    title: 'AI for Bharat Hackathon',
    subtitle: 'Top Innovator · One of 36 Teams',
    issuer: 'AWS & Hack2Skill',
    file: '/assets/badges/badge-ai-for-bharat.png'
  }
];

const SECTIONS = [
  { id: 'hero', label: 'Top' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [headerScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [activeModalDiagram, setActiveModalDiagram] = useState<{
    title: string;
    src: string;
    description: string;
    tags: string[];
    githubUrl?: string;
  } | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Scrollspy & Header shadow listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setHeaderScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Bottom edge detection
      if (scrollY + windowHeight >= docHeight - 120) {
        setActiveSection('contact');
        return;
      }

      const sectionIds = ['hero', 'about', 'projects', 'certifications', 'contact'];
      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 80) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  // Section index helper for Back Arrow / Next Arrow controls
  const currentSectionIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const safeIndex = currentSectionIndex === -1 ? 0 : currentSectionIndex;

  const navigateSection = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && safeIndex > 0) {
      scrollTo(SECTIONS[safeIndex - 1].id);
    } else if (direction === 'next' && safeIndex < SECTIONS.length - 1) {
      scrollTo(SECTIONS[safeIndex + 1].id);
    }
  };

  // Carousel manual controls
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setFormState({ name: '', email: '', message: '' });
        setFormStatus('idle');
      }, 3500);
    }, 800);
  };

  return (
    <div className="bg-[#FAF8F0] text-[#111111] min-h-screen antialiased selection:bg-[#EA533D] selection:text-white relative">
      {/* Background Vertical Ambient Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-7xl mx-auto px-6 opacity-35">
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
        <div className="w-px h-full bg-black/5"></div>
      </div>

      {/* Navigation Bar */}
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 border-b border-black/5 ${
          headerScrolled
            ? 'bg-[#FAF8F0]/98 backdrop-blur-md shadow-xs'
            : 'bg-[#FAF8F0]/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('hero');
            }}
            className="font-display font-extrabold text-2xl tracking-tight text-[#111111] hover:text-[#EA533D] transition-colors"
          >
            Pokuri Lahari
          </a>

          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#333333]"
          >
            {[
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' }
            ].map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`nav-link py-1 cursor-pointer transition-colors ${
                    isActive ? 'active-nav-link text-[#EA533D] font-semibold' : 'hover:text-[#EA533D]'
                  }`}
                >
                  {label}
                  <span className={`nav-indicator ${isActive ? 'w-full opacity-100' : ''}`} />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                scrollTo('contact');
                setTimeout(() => {
                  document.querySelector<HTMLInputElement>('#contact input')?.focus();
                }, 600);
              }}
              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full btn-variant-1 font-semibold text-sm cursor-pointer shadow-xs transition-all duration-300 ${
                activeSection === 'contact' ? 'nav-btn-active' : ''
              }`}
            >
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 pt-8 md:pt-14 pb-24 relative z-10">
        
        {/* HERO SECTION - Single Line Upright Heading matching user upload reference */}
        <section className="pt-4 pb-14 scroll-mt-24" id="hero" data-purpose="hero-banner">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Highlight: AWS Student Builder Group Leader Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/40 text-[#9A3412] font-semibold text-xs md:text-sm shadow-xs select-none">
              <span className="w-2 h-2 rounded-full bg-[#EA533D] animate-ping" />
              <span className="font-bold text-[#EA533D]">AWS Student Builder Group Leader</span>
              <span className="text-black/30">|</span>
              <span className="text-[#555555]">KLH University · 2024–2027</span>
            </div>

            {/* Giant Single-Line Name Heading (As shown in user reference image) */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.25rem] font-black tracking-tight text-[#111111] leading-none select-none">
              Pokuri Lahari
            </h1>

            {/* Bio & Action Buttons on grid/flex row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-8">
                <p className="text-base sm:text-lg md:text-xl text-[#333333] font-normal leading-relaxed max-w-2xl">
                  Computer Science and Engineering student at KLH University · 2024–2028. Exploring programming, problem-solving, and software development through hands-on projects.
                </p>
              </div>

              <div className="lg:col-span-4 flex items-center gap-3 flex-wrap lg:justify-end">
                <button
                  onClick={() => scrollTo('projects')}
                  className="px-6 py-2.5 rounded-full btn-variant-1 font-semibold text-sm cursor-pointer inline-flex items-center justify-center shadow-xs"
                >
                  View Projects
                </button>
                <a
                  className="px-6 py-2.5 rounded-full btn-variant-2 font-medium text-sm cursor-pointer inline-flex items-center justify-center bg-white"
                  href="https://www.linkedin.com/in/pokuri-lahari/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="px-6 py-2.5 rounded-full btn-variant-2 font-medium text-sm cursor-pointer inline-flex items-center justify-center bg-white"
                  href="https://github.com/PokuriLahari"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONTINUOUS MARQUEE CAROUSEL WITH REAL BADGES & ARROW CONTROLS */}
        <section className="mb-28" data-purpose="certification-badges">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
              Verified Badges &amp; Recognitions ({BADGES.length})
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Previous Badges"
                className="w-8 h-8 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                title="Scroll Left"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Next Badges"
                className="w-8 h-8 rounded-full border border-black/20 bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                title="Scroll Right"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden marquee-container marquee-mask py-4 -my-4"
          >
            <div className="marquee-track flex gap-5">
              {/* Loop badges twice for seamless infinite marquee scroll */}
              {[...BADGES, ...BADGES].map((badge, idx) => (
                <div
                  key={`${badge.id}-${idx}`}
                  className="badge-card flex-shrink-0 w-64 md:w-72 bg-white rounded-xl md:rounded-2xl p-5 md:p-6 card-border flex flex-col items-center justify-center min-h-[260px] md:min-h-[290px] shadow-xs cursor-pointer select-none group"
                >
                  <div className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center">
                    <img
                      src={badge.file}
                      alt={badge.title}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-xs font-bold text-[#111111] font-heading">
                      {badge.title}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      {badge.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="py-12 mb-32 scroll-mt-24" id="about" data-purpose="about-me">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center max-w-5xl mx-auto"
          >
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111111] italic font-display">
                About Me
              </h2>

              <p className="text-lg text-[#333333] leading-relaxed font-normal">
                I'm Pokuri Lahari, pursuing Computer Science and Engineering at KLH University (2024–2028). I'm interested in programming, problem-solving, and exploring how software can turn ideas into useful solutions. Here, I share my projects and learning journey.
              </p>

              {/* Dedicated AWS Student Builder Group Leader Highlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF9F2] to-white border-2 border-[#EA533D]/30 shadow-xs relative overflow-hidden">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#EA533D] text-white flex items-center justify-center flex-shrink-0 font-bold shadow-xs">
                    ⭐
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base md:text-lg text-[#111111]">
                      AWS Student Builder Group Leader (2024–2027)
                    </h3>
                    <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                      Leading student cloud initiatives, authoring technical walkthroughs on the official AWS Builder Center, and fostering hands-on serverless, multi-agent AI, and cloud architectures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="portrait-card-wrapper">
                <div className="relative w-64 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden border-[2.5px] border-[#EA533D] portrait-glow cursor-pointer bg-white">
                  <img
                    alt="Pokuri Lahari Portrait"
                    className="w-full h-full object-cover object-center rounded-3xl transition-transform duration-500 hover:scale-105"
                    src="/assets/images/portrait.jpg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section className="py-12 mb-32 scroll-mt-24" id="projects" data-purpose="featured-projects">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111111] mb-4 italic font-display">
              Featured Projects
            </h2>
            <p className="text-[#333333] text-base md:text-lg max-w-2xl mx-auto">
              A space for my academic projects, experiments, and hands-on learning.
            </p>
          </motion.div>

          <div className="space-y-14 max-w-5xl mx-auto">
            {/* Project 1: SAGE (Student Academic Guidance Engine) */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="project-card bg-white rounded-2xl p-7 md:p-8 card-border"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 14px 34px -8px, rgba(234, 83, 61, 0.12) 0px 6px 20px -4px'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 flex flex-col justify-between h-full space-y-5">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-3">
                      <a
                        className="hover:text-[#EA533D] transition-colors inline-flex items-center gap-2 group/link cursor-pointer"
                        href="https://github.com/PokuriLahari/SAGE"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        SAGE (Student Academic Guidance Engine)
                        <svg className="w-5 h-5 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                      </a>
                    </h3>
                    <p className="text-base text-[#333333] leading-relaxed font-normal">
                      An intelligent student productivity and academic workspace featuring grounded AI assistance, task management, JWT validation, and automated reminder scheduling.
                    </p>
                  </div>

                  {/* High contrast tags strictly in Orange, Cream, and Charcoal */}
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono-tag text-xs font-semibold bg-[#FAF8F0] text-[#111111] border border-black">
                      Academic Workspace
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D]/10 text-[#EA533D] border border-[#EA533D]/40">
                      Grounded AI
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-white text-[#111111] border border-black">
                      PostgreSQL
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D] text-white border border-black">
                      Full Stack AI
                    </span>
                  </div>

                  {/* Clean Action Buttons: GitHub Button & Full Architecture Inspector */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <a
                      href="https://github.com/PokuriLahari/SAGE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full btn-variant-1 font-semibold text-sm cursor-pointer inline-flex items-center gap-2 shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                      View on GitHub
                    </a>

                    <button
                      onClick={() =>
                        setActiveModalDiagram({
                          title: 'SAGE — System Architecture',
                          src: '/assets/images/sage-architecture-diagram.svg',
                          description:
                            'High-contrast layered system architecture showing FastAPI routing, JWT security, RAG retrieval engine, PostgreSQL persistence, and student guidance generation.',
                          tags: ['FastAPI Gateway', 'JWT Guard', 'PostgreSQL', 'Context RAG Engine'],
                          githubUrl: 'https://github.com/PokuriLahari/SAGE'
                        })
                      }
                      className="px-4 py-2 rounded-full border border-black/30 hover:border-black text-xs font-semibold text-[#111111] hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-[#EA533D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Inspect Architecture ↗
                    </button>
                  </div>
                </div>

                {/* Right Architecture Diagram (High Contrast Cyber-Retro Frame inspired by TeamForge.AI) */}
                <div className="md:col-span-6 overflow-hidden rounded-xl border-2 border-black bg-[#0B0F19] shadow-md flex items-center justify-center group relative cursor-pointer"
                  onClick={() =>
                    setActiveModalDiagram({
                      title: 'SAGE — System Architecture',
                      src: '/assets/images/sage-architecture-diagram.svg',
                      description:
                        'High-contrast layered system architecture showing FastAPI routing, JWT security, RAG retrieval engine, PostgreSQL persistence, and student guidance generation.',
                      tags: ['FastAPI Gateway', 'JWT Guard', 'PostgreSQL', 'Context RAG Engine'],
                      githubUrl: 'https://github.com/PokuriLahari/SAGE'
                    })
                  }
                >
                  <img
                    alt="SAGE System Architecture Diagram"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    src="/assets/images/sage-architecture-diagram.svg"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/85 text-[10px] text-[#FAF8F0] font-mono border border-[#EA533D]/40 opacity-90 group-hover:opacity-100 flex items-center gap-1">
                    <span>🔍 Click to expand</span>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Project 2: Multi-Agent AI Document System */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="project-card bg-white rounded-2xl p-7 md:p-8 card-border"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 14px 34px -8px, rgba(234, 83, 61, 0.12) 0px 6px 20px -4px'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 flex flex-col justify-between h-full space-y-5">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight mb-3">
                      <a
                        className="hover:text-[#EA533D] transition-colors inline-flex items-center gap-2 group/link cursor-pointer"
                        href="https://github.com/PokuriLahari/Multi-Agent-AI-Document-System"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Multi-Agent AI Document System
                        <svg className="w-5 h-5 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                        </svg>
                      </a>
                    </h3>
                    <p className="text-base text-[#333333] leading-relaxed font-normal">
                      An in-development document intelligence platform with a FastAPI backend, Streamlit frontend, and SQLite foundation. Planned agents handle ingestion, retrieval, and evidence-grounded answers.
                    </p>
                  </div>

                  {/* Tags strictly in Orange, Cream, and Charcoal */}
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono-tag text-xs font-semibold bg-[#FAF8F0] text-[#111111] border border-black">
                      FastAPI + Streamlit
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D]/10 text-[#EA533D] border border-[#EA533D]/40">
                      Multi-Agent AI
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-white text-[#111111] border border-black">
                      Vector Store
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D] text-white border border-black">
                      Autonomous Pipeline
                    </span>
                  </div>

                  {/* Clean Action Buttons: GitHub Button & Full Architecture Inspector */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <a
                      href="https://github.com/PokuriLahari/Multi-Agent-AI-Document-System"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full btn-variant-1 font-semibold text-sm cursor-pointer inline-flex items-center gap-2 shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                      View on GitHub
                    </a>

                    <button
                      onClick={() =>
                        setActiveModalDiagram({
                          title: 'Multi-Agent AI Document System Architecture',
                          src: '/assets/images/multi-agent-architecture-diagram.svg',
                          description:
                            'High-contrast autonomous multi-agent pipeline: Ingestion Agent parses documents, RAG Retrieval Agent queries the Vector Memory Lake, and Evidence Synthesizer validates answers without hallucinations.',
                          tags: ['Ingestion Agent', 'Vector Memory Lake', 'Evidence Synthesizer', 'FastAPI'],
                          githubUrl: 'https://github.com/PokuriLahari/Multi-Agent-AI-Document-System'
                        })
                      }
                      className="px-4 py-2 rounded-full border border-black/30 hover:border-black text-xs font-semibold text-[#111111] hover:bg-black/5 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-[#EA533D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      Inspect Architecture ↗
                    </button>
                  </div>
                </div>

                {/* Right Architecture Diagram (High Contrast Cyber-Retro Frame inspired by TeamForge.AI) */}
                <div className="md:col-span-6 overflow-hidden rounded-xl border-2 border-black bg-[#0A0E1A] shadow-md flex items-center justify-center group relative cursor-pointer"
                  onClick={() =>
                    setActiveModalDiagram({
                      title: 'Multi-Agent AI Document System Architecture',
                      src: '/assets/images/multi-agent-architecture-diagram.svg',
                      description:
                        'High-contrast autonomous multi-agent pipeline: Ingestion Agent parses documents, RAG Retrieval Agent queries the Vector Memory Lake, and Evidence Synthesizer validates answers without hallucinations.',
                      tags: ['Ingestion Agent', 'Vector Memory Lake', 'Evidence Synthesizer', 'FastAPI'],
                      githubUrl: 'https://github.com/PokuriLahari/Multi-Agent-AI-Document-System'
                    })
                  }
                >
                  <img
                    alt="Multi-Agent AI Document System Architecture Diagram"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    src="/assets/images/multi-agent-architecture-diagram.svg"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/85 text-[10px] text-[#FAF8F0] font-mono border border-[#EA533D]/40 opacity-90 group-hover:opacity-100 flex items-center gap-1">
                    <span>🔍 Click to expand</span>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Project 3: AWS Builder Center Articles */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="project-card bg-white rounded-2xl p-7 md:p-8 card-border"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.08) 0px 14px 34px -8px, rgba(234, 83, 61, 0.12) 0px 6px 20px -4px'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 flex flex-col justify-between h-full space-y-5">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        alt="AWS Builder Account Avatar"
                        className="w-10 h-10 rounded-xl card-border object-cover bg-black flex-shrink-0"
                        src="/assets/images/aws-builder-avatar.png"
                      />
                      <h3 className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight">
                        <a
                          className="hover:text-[#EA533D] transition-colors inline-flex items-center gap-2 group/link cursor-pointer"
                          href="https://builder.aws.com/content/3LGJ9OADvLus28lQQiWyhVzuz3X/build-a-serverless-daily-quote-emailer-with-aws-lambda-eventbridge-scheduler-and-amazon-ses"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          AWS Builder Center Articles
                          <svg className="w-5 h-5 opacity-70 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                          </svg>
                        </a>
                      </h3>
                    </div>
                    <p className="text-base text-[#333333] leading-relaxed font-normal">
                      Technical articles and serverless architecture walkthroughs authored as AWS Student Builder Group Leader, including "Build a Serverless Daily Quote Emailer with AWS Lambda, EventBridge Scheduler, and Amazon SES."
                    </p>
                  </div>

                  {/* Tags strictly in Orange, Cream, and Charcoal */}
                  <div className="flex flex-wrap gap-2">
                    <span className="font-mono-tag text-xs font-semibold bg-[#FAF8F0] text-[#111111] border border-black">
                      Serverless
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D]/10 text-[#EA533D] border border-[#EA533D]/40">
                      AWS Lambda + SES
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-white text-[#111111] border border-black">
                      EventBridge
                    </span>
                    <span className="font-mono-tag text-xs font-semibold bg-[#EA533D] text-white border border-black">
                      AWS Student Builder Group Leader
                    </span>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="pt-2 flex items-center gap-3 flex-wrap">
                    <a
                      className="px-5 py-2.5 rounded-full btn-variant-1 font-semibold text-sm cursor-pointer inline-flex items-center gap-2 shadow-xs"
                      href="https://builder.aws.com/content/3LGJ9OADvLus28lQQiWyhVzuz3X/build-a-serverless-daily-quote-emailer-with-aws-lambda-eventbridge-scheduler-and-amazon-ses"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>View the Article</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </a>
                    <a
                      className="px-4 py-2.5 rounded-full btn-variant-2 font-medium text-xs cursor-pointer inline-flex items-center gap-1.5 bg-white"
                      href="https://github.com/PokuriLahari"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                      </svg>
                      GitHub
                    </a>
                    <a
                      className="px-4 py-2 rounded-full text-xs font-semibold text-[#111111] hover:text-[#EA533D] transition-colors"
                      href="https://builder.aws.com?inviteId=2ef74eb5-e90a-4394-89d7-266295bd1372"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Join via Builder Invite ↗
                    </a>
                  </div>
                </div>

                {/* Right Hero Preview */}
                <div className="md:col-span-5 overflow-hidden rounded-xl border border-black/30 h-56 md:h-64 bg-slate-900 shadow-inner flex items-center justify-center group relative">
                  <a
                    className="w-full h-full block overflow-hidden relative bg-[#121316] flex items-center justify-center p-6"
                    href="https://builder.aws.com/content/3LGJ9OADvLus28lQQiWyhVzuz3X/build-a-serverless-daily-quote-emailer-with-aws-lambda-eventbridge-scheduler-and-amazon-ses"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt="AWS Builder Center Article"
                      className="w-40 h-40 md:w-44 md:h-44 object-contain rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-105 border border-black/30"
                      src="/assets/images/aws-builder-hero.png"
                    />
                  </a>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS SECTION (WITH VIBRANT DISTINCT BRAND COLORS) */}
        <section className="py-12 mb-28 scroll-mt-24" id="certifications" data-purpose="certifications-achievements">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#111111] mb-3 italic font-display">
              Certifications and Achievements
            </h2>
            <p className="text-[#333333] text-base md:text-lg">
              Building my foundation in cloud computing, artificial intelligence, and competitive innovation.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-4">
            {/* 1. AWS Certified Cloud Practitioner - Signature Warm Orange/Coral */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="cert-banner bg-gradient-to-r from-[#EA533D] to-[#FF6E40] text-white rounded-xl px-7 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-black/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0 border border-white/20">
                  <img src="/assets/badges/badge-aws.png" alt="AWS Cloud Practitioner Badge" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl md:text-2xl tracking-wide text-white block">
                    AWS Certified Cloud Practitioner
                  </span>
                  <span className="text-sm md:text-base font-normal text-white/95">
                    Amazon Web Services · Foundational Cloud Architecture
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 sm:pl-4">
                <a
                  href="https://cp.certmetrics.com/amazon/en/public/verify/credential/7cb9c287aa6e4b2ca286e356632db900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#EA533D] hover:bg-[#FAF8F0] transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* 2. Microsoft Azure AI Fundamentals - Signature Warm Orange/Coral */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="cert-banner bg-gradient-to-r from-[#EA533D] to-[#FF6E40] text-white rounded-xl px-7 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-black/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0 border border-white/20">
                  <img src="/assets/badges/badge-microsoft-azure.svg" alt="Microsoft Azure AI Badge" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl md:text-2xl tracking-wide text-white block">
                    Microsoft Azure AI Fundamentals
                  </span>
                  <span className="text-sm md:text-base font-normal text-white/95">
                    AI-900 · Artificial Intelligence &amp; Machine Learning Fundamentals
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 sm:pl-4">
                <a
                  href="https://learn.microsoft.com/api/credentials/share/en-us/LahariPokuri-1310/202AB5D73FA9A59D?sharingId=2F295B1E1BD603CE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#EA533D] hover:bg-[#FAF8F0] transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* 3. Aviatrix Certified Engineer (ACE) - Signature Warm Orange/Coral */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="cert-banner bg-gradient-to-r from-[#EA533D] to-[#FF6E40] text-white rounded-xl px-7 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-black/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0 border border-white/20">
                  <img src="/assets/badges/badge-aviatrix.png" alt="Aviatrix ACE Associate Badge" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <span className="font-heading font-bold text-xl md:text-2xl tracking-wide text-white block">
                    Aviatrix Certified Engineer (ACE)
                  </span>
                  <span className="text-sm md:text-base font-normal text-white/95">
                    ACE Associate · Multi-Cloud Networking &amp; Security Architecture
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 sm:pl-4">
                <a
                  href="https://www.credly.com/badges/a667b9c4-c324-4aa4-9069-5577f8d28273/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#EA533D] hover:bg-[#FAF8F0] transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <span>Verify Credential</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* 4. AI for Bharat Hackathon — Signature Warm Orange/Coral */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="cert-banner bg-gradient-to-r from-[#EA533D] to-[#FF6E40] text-white rounded-xl px-7 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm border border-black/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center flex-shrink-0 border border-white/20">
                  <img src="/assets/badges/badge-ai-for-bharat.png" alt="AI for Bharat Hackathon Badge" className="w-9 h-9 object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-heading font-bold text-xl md:text-2xl tracking-wide text-white">
                      AI for Bharat Hackathon — Top Innovator
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-[#EA533D] shadow-2xs">
                      One of 36 Teams
                    </span>
                  </div>
                  <span className="text-sm md:text-base font-normal text-white/95">
                    Shortlisted for Prototype Development Phase (Powered by AWS, Hack2Skill &amp; YourStory)
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0 sm:pl-4">
                <a
                  href="https://certificate.hack2skill.com/verify/2026H2S04AIFB-P01365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-[#EA533D] hover:bg-[#FAF8F0] transition-all shadow-xs hover:scale-105 active:scale-95"
                >
                  <span>Verify Certificate</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Decorative Scalloped Orange & Cream Tab Dividers */}
      <div className="w-full border-t border-[#111111] relative select-none" data-purpose="decorative-tab-divider">
        <div className="max-w-5xl mx-auto flex justify-around px-8">
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#EA533D] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Signature Orange"></div>
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#FAF8F0] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Cream"></div>
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#EA533D] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Signature Orange"></div>
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#FAF8F0] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Cream"></div>
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#EA533D] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Signature Orange"></div>
          <div className="scalloped-tab w-12 md:w-14 h-8 bg-[#FAF8F0] rounded-b-full -mt-px shadow-xs border-b border-x border-black/20 cursor-pointer" title="Cream"></div>
        </div>
      </div>

      {/* FOOTER & CONNECT SECTION (Instagram and Twitter removed as requested) */}
      <footer className="pt-16 pb-14 bg-[#FAF8F0] scroll-mt-24" id="contact" data-purpose="contact-and-footer">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
            {/* Left: Contact Info & Interactive Form */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-xl font-heading font-semibold text-[#111111] leading-snug">
                Let's connect! I'd love to discuss technology, collaborate on projects, and explore learning opportunities.
              </h3>
              <p className="text-sm md:text-base text-[#333333] font-mono">
                <a
                  className="hover:underline hover:text-[#EA533D] transition-colors cursor-pointer"
                  href="mailto:pokurilahri16@gmail.com"
                >
                  pokurilahri16@gmail.com
                </a>
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 pt-2" id="contact-form">
                <div>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Full Name"
                    className="input-interactive w-full rounded-full bg-white px-5 py-3 text-sm card-border outline-none placeholder-gray-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@example.com"
                    className="input-interactive w-full rounded-full bg-white px-5 py-3 text-sm card-border outline-none placeholder-gray-400"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Let's talk about a project, collaboration, or opportunity..."
                    className="input-interactive w-full rounded-2xl bg-white px-5 py-3 text-sm card-border outline-none resize-none placeholder-gray-400"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className={`w-full py-3 rounded-full text-sm font-semibold cursor-pointer transition-all duration-300 ${
                      formStatus === 'sent'
                        ? 'bg-emerald-500 text-white'
                        : 'btn-variant-1'
                    }`}
                  >
                    {formStatus === 'sending'
                      ? 'Sending...'
                      : formStatus === 'sent'
                      ? 'Message Sent! ✓'
                      : 'Send'}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Navigation & Professional Connect */}
            <div className="md:col-span-5 md:pl-8 space-y-8">
              <div>
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3 font-mono">
                  Navigation
                </h4>
                <ul className="space-y-2 text-sm text-[#333333] font-medium">
                  {['about', 'projects', 'certifications'].map((id) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollTo(id)}
                        className={`footer-nav-link hover:text-[#EA533D] transition-colors hover:underline inline-block cursor-pointer ${
                          activeSection === id ? 'active-nav-link text-[#EA533D]' : ''
                        }`}
                      >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect - Clean Professional Links (Instagram and Twitter removed) */}
              <div>
                <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3 font-mono">
                  Connect
                </h4>
                <div className="flex items-center space-x-3 text-[#111111]">
                  {/* LinkedIn */}
                  <a
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="social-btn w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white"
                    href="https://www.linkedin.com/in/pokuri-lahari/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    aria-label="GitHub"
                    title="GitHub"
                    className="social-btn w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white"
                    href="https://github.com/PokuriLahari"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    aria-label="Email"
                    title="Send Email"
                    className="social-btn w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#EA533D] hover:border-[#EA533D] hover:text-white"
                    href="mailto:pokurilahri16@gmail.com"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>

                  {/* AWS Builder Center */}
                  <a
                    aria-label="AWS Builder Center"
                    title="AWS Builder Center Profile"
                    className="social-btn w-9 h-9 rounded-full border border-[#111111] flex items-center justify-center hover:bg-[#FF9900] hover:border-[#FF9900] hover:text-white"
                    href="https://builder.aws.com/content/3LGJ9OADvLus28lQQiWyhVzuz3X/build-a-serverless-daily-quote-emailer-with-aws-lambda-eventbridge-scheduler-and-amazon-ses"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-[10px] font-black">AWS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Giant Bottom Brand Wordmark */}
          <div className="text-center pt-8 border-t border-black/10">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-[#111111] select-none font-display">
              Pokuri Lahari
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-4 font-mono">
              © {new Date().getFullYear()} Pokuri Lahari · AWS Student Builder Group Leader
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING SCROLL NAVIGATION CONTROLS ([Back Arrow] / [Next Arrow]) */}
      <aside aria-label="Section Navigation" className="fixed bottom-6 right-6 z-40 select-none">
        <div className="bg-[#111111]/95 text-white backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-white/10 flex items-center gap-2">
          {/* Back Arrow button */}
          <button
            onClick={() => navigateSection('prev')}
            disabled={safeIndex === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              safeIndex === 0 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'hover:bg-white/20 text-white'
            }`}
            title="Previous Section (Back Arrow)"
            aria-label="Previous Section"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
            </svg>
          </button>

          {/* Current Section pill */}
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-gray-200 capitalize">
            {SECTIONS[safeIndex].label} · {safeIndex + 1}/{SECTIONS.length}
          </span>

          {/* Next Arrow button */}
          <button
            onClick={() => navigateSection('next')}
            disabled={safeIndex === SECTIONS.length - 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              safeIndex === SECTIONS.length - 1 ? 'opacity-30 cursor-not-allowed text-gray-500' : 'hover:bg-white/20 text-white'
            }`}
            title="Next Section (Next Arrow)"
            aria-label="Next Section"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </aside>

      {/* FULLSCREEN / HIGH-CONTRAST ARCHITECTURE DIAGRAM MODAL */}
      <AnimatePresence>
        {activeModalDiagram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveModalDiagram(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B0F19] border-2 border-[#EA533D] text-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#EA533D]/30 flex items-center justify-between bg-[#141012]">
                <div>
                  <div className="text-xs font-mono text-[#EA533D] font-bold uppercase tracking-wider">
                    High-Contrast Architecture Inspector
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {activeModalDiagram.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalDiagram(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Close Inspector"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body / Image */}
              <div className="p-4 md:p-6 overflow-auto flex-1 flex items-center justify-center bg-[#070A11]">
                <img
                  src={activeModalDiagram.src}
                  alt={activeModalDiagram.title}
                  className="w-full h-auto max-h-[65vh] object-contain rounded-lg border border-[#EA533D]/25"
                />
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#EA533D]/30 bg-[#141012] flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  {activeModalDiagram.description}
                </p>
                <div className="flex items-center gap-3">
                  {activeModalDiagram.githubUrl && (
                    <a
                      href={activeModalDiagram.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full btn-variant-1 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <span>Repository on GitHub</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                      </svg>
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalDiagram(null)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
