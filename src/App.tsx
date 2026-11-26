import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from 'lucide-react';
import { ProjectDemoModal } from './components/ProjectDemoModal';
import { ProjectMockupPreview } from './components/ProjectMockupPreview';
import { ResumeSummaryModal } from './components/ResumeSummaryModal';
import {
  HERO_HIGHLIGHTS,
  PROFILE,
  PROJECTS,
  ProjectCategory,
  ProjectItem,
  SKILL_GROUPS,
} from './data/portfolioData';

const PROJECT_CATEGORIES: ProjectCategory[] = ['All', 'Web Apps', 'Interactive UI', 'Open Source'];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('portfolio-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeSkillGroup, setActiveSkillGroup] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [topic, setTopic] = useState('Internship or Role Opportunity');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  const visibleSkillGroups =
    activeSkillGroup === 'all'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((group) => group.id === activeSkillGroup);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2400);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setFormError('Please fill in your name, email address, and message before sending.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      setFormError('Please enter a valid email address so I can reply to you.');
      return;
    }

    setFormError(null);
    setFormSubmitted(true);
  };

  const mailtoComposeHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    `[Portfolio Inquiry] ${topic} — from ${senderName || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Jhonalie,\n\n${message}\n\nBest regards,\n${senderName}\n${senderEmail}`
  )}`;

  const closeMobileMenuAndScroll = (hash: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 text-zinc-900 dark:bg-[#190A14] dark:text-zinc-100 transition-colors duration-200">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-pink-700 focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Strict 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-pink-100/90 dark:bg-[#190A14]/90 backdrop-blur-md border-b border-pink-200 dark:border-pink-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#about"
            className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-pink-700 rounded"
          >
            {PROFILE.name}
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700 dark:text-pink-100/80"
          >
            <a
              href="#about"
              className="hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
            >
              Get in Touch
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden h-11 w-11 rounded-lg border border-pink-200 dark:border-pink-900/60 bg-white/80 dark:bg-[#24111D] flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-pink-50 dark:hover:bg-[#2E1525] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-pink-200 dark:border-pink-900/50 bg-pink-50 dark:bg-[#24111D] px-4 py-4 space-y-2"
          >
            {[
              { label: 'About Me', href: '#about' },
              { label: 'Technical Skills', href: '#skills' },
              { label: 'Featured Projects', href: '#projects' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => closeMobileMenuAndScroll(item.href)}
                className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3 py-2">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Appearance</span>
              <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    theme === 'light'
                      ? 'bg-white text-zinc-900 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    theme === 'dark'
                      ? 'bg-zinc-900 text-zinc-100 shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </nav>
        )}
      </header>

      <main id="main-content">
        {/* About / Hero Section */}
        <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14 lg:pt-12 lg:pb-20">
          {/* Hero Utility Bar: Discipline Subtitle + Accessible Theme Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-pink-200 dark:border-pink-900/50">
            <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-pink-200/75">
              Information Technology <span aria-hidden="true">·</span> {PROFILE.location}
            </p>
            <div
              role="group"
              aria-label="Color theme toggle"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-pink-200/70 dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50"
            >
              <button
                type="button"
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'light'
                    ? 'bg-white text-zinc-900 shadow-xs'
                    : 'text-zinc-600 dark:text-pink-200/75 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  theme === 'dark'
                    ? 'bg-pink-700 text-white shadow-xs'
                    : 'text-zinc-700 dark:text-pink-200/75 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
            </div>
          </div>

          {/* 2-Column Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-8 lg:pt-12">
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="font-serif-editorial italic text-lg sm:text-xl text-pink-700 dark:text-pink-400">
                  Hello, I am {PROFILE.name}.
                </p>
                <h1
                  style={{ textWrap: 'balance' }}
                  className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.12]"
                >
                  Learning with curiosity, building with purpose.
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                  {PROFILE.bio}
                </p>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  {PROFILE.careerGoal}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
                  >
                    Explore My Projects
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold border border-pink-300 dark:border-pink-800 bg-white dark:bg-[#24111D] text-zinc-900 dark:text-zinc-100 hover:bg-pink-50 dark:hover:bg-[#2E1525] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-pink-700"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume Summary
                  </button>
                </div>

                {/* Direct Social & Profile Links */}
                <div className="flex flex-wrap items-center gap-6 pt-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
                  >
                    <Mail className="h-4 w-4" />
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Portrait Container at Matching Height */}
            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[360px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-pink-200 dark:border-pink-900/50 bg-pink-200 dark:bg-[#24111D]">
                {!avatarError ? (
                  <img
                    src={PROFILE.avatarUrl}
                    alt="Portrait of Jhonalie Jotajero smiling outdoors"
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarError(true)}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-pink-50 dark:bg-[#24111D]">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">JJ</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{PROFILE.name}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
                  <p className="text-sm font-semibold text-white">{PROFILE.name}</p>
                  <p className="text-xs text-zinc-200 mt-0.5">{PROFILE.title}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Highlights Strip Below Split */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-8 border-t border-pink-200 dark:border-pink-900/50">
            {HERO_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 px-4 py-4"
              >
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 tabular-nums">
                  {item.value}
                </p>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-pink-200/75 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="border-y border-pink-200 dark:border-pink-900/50 bg-pink-50/90 dark:bg-[#24111D]/70 overflow-hidden py-3"
        >
          <div className="flex whitespace-nowrap animate-marquee text-xs font-medium tracking-wide text-zinc-600 dark:text-pink-200/75">
            <span className="mx-4">
              selected works · open source programming · semantic html5 · responsive css grid · accessible ui · cit 240 capstone ·
            </span>
            <span className="mx-4">
              selected works · open source programming · semantic html5 · responsive css grid · accessible ui · cit 240 capstone ·
            </span>
          </div>
        </div>

        {/* Technical Skills Matrix */}
        <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-pink-200 dark:border-pink-900/50">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-semibold text-pink-700 dark:text-pink-400">Technical Capabilities</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                Technical Skills
              </h2>
            </div>

            {/* Interactive Skill Category Filter */}
            <div
              role="group"
              aria-label="Filter skills by category"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-pink-200/70 dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 self-start md:self-auto"
            >
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'languages', label: 'Languages' },
                { id: 'frameworks', label: 'Web' },
                { id: 'tools', label: 'Tools' },
                { id: 'databases', label: 'Database' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSkillGroup(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activeSkillGroup === tab.id
                      ? 'bg-white dark:bg-pink-700 text-zinc-900 dark:text-white shadow-xs'
                      : 'text-zinc-700 dark:text-pink-200/75 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              visibleSkillGroups.length === 1 ? 'md:grid-cols-1 max-w-2xl' : 'md:grid-cols-2'
            } gap-6 mt-8`}
          >
            {visibleSkillGroups.map((group) => (
              <article
                key={group.id}
                className="rounded-2xl bg-white dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 p-6"
              >
                <div className="pb-4 border-b border-pink-100 dark:border-pink-900/40">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{group.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-pink-200/70 mt-1">{group.subtitle}</p>
                </div>
                <dl className="divide-y divide-pink-100 dark:divide-pink-900/40 mt-2">
                  {group.items.map((skill) => (
                    <div key={skill.name} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <dt className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{skill.name}</dt>
                        <dd className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{skill.detail}</dd>
                      </div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section
          id="projects"
          className="bg-pink-50/90 dark:bg-[#23101C]/70 border-y border-pink-200 dark:border-pink-900/50 py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-pink-200 dark:border-pink-900/50">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold text-pink-700 dark:text-pink-400">Selected Works</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                  Featured Projects
                </h2>
                <p className="text-sm sm:text-base text-zinc-700 dark:text-pink-100/80">
                  Explore interactive previews or open each repository directly on GitHub.{' '}
                  <a
                    href={`${PROFILE.githubUrl}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-pink-700 dark:text-pink-400 hover:underline underline-offset-4"
                  >
                    Browse all GitHub repositories
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </p>
              </div>

              {/* Project Category Filter Tabs */}
              <div
                role="group"
                aria-label="Filter projects by type"
                className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-pink-200/70 dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 self-start md:self-auto"
              >
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedCategory === category
                        ? 'bg-white dark:bg-pink-700 text-zinc-900 dark:text-white shadow-xs'
                        : 'text-zinc-700 dark:text-pink-200/75 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredProjects.map((project, index) => {
                const isLeadBento = selectedCategory === 'All' && index === 0;
                return (
                  <article
                    key={project.id}
                    className={`rounded-2xl bg-white dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 p-5 sm:p-6 flex flex-col justify-between transition-colors hover:border-pink-300 dark:hover:border-pink-700 ${
                      isLeadBento ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    <div>
                      {/* Visual Preview Screenshot Container */}
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        aria-label={`Open live demo for ${project.title}`}
                        className={`w-full rounded-xl border border-pink-200 dark:border-pink-900/50 overflow-hidden text-left block group focus-visible:outline-2 focus-visible:outline-pink-700 ${
                          isLeadBento ? 'aspect-16/9 sm:aspect-21/10' : 'aspect-16/10'
                        }`}
                      >
                        <ProjectMockupPreview type={project.previewType} compact={!isLeadBento} />
                      </button>

                      {/* Unboxed Metadata Line */}
                      <p className="text-xs text-zinc-500 dark:text-pink-200/70 mt-5">
                        {project.category} <span aria-hidden="true">·</span> {project.year}{' '}
                        <span aria-hidden="true">·</span> {project.role}
                      </p>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1.5">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-pink-700 dark:hover:text-pink-400 transition-colors"
                        >
                          <span>{project.title}</span>
                          <ArrowUpRight className="h-4 w-4 shrink-0" />
                        </a>
                      </h3>

                      <p className="text-sm text-zinc-600 dark:text-pink-100/80 leading-relaxed mt-2">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-pink-100 dark:border-pink-900/40 space-y-4">
                      {/* Zero-Pill Tech Stack List */}
                      <p className="text-xs font-medium text-zinc-500 dark:text-pink-200/70">
                        {project.techStack.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-pink-700"
                          >
                            Live Demo
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setActiveProject(project)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-pink-700"
                          >
                            Live Demo
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-pink-300 dark:border-pink-800 bg-pink-50 dark:bg-[#190A14] text-zinc-800 dark:text-zinc-200 hover:bg-pink-100 dark:hover:bg-[#2E1525] transition-colors whitespace-nowrap shrink-0"
                        >
                          <Github className="h-3.5 w-3.5" />
                          View on GitHub
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-pink-100 dark:bg-[#190A14] py-16 lg:py-24"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              {/* Left Column: Direct Contact Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-pink-700 dark:text-pink-400">Contact</p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Let us connect and build something helpful.
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-700 dark:text-pink-100/80 leading-relaxed">
                    Whether you have a question about my CIT 240 projects, want to collaborate on an open-source idea, or have an internship opportunity, I would love to hear from you.
                  </p>
                </div>

                <div className="rounded-2xl bg-white dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 p-5 space-y-4">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-pink-200/70">Direct Email</p>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 hover:text-pink-700 dark:hover:text-pink-400 transition-colors break-all"
                    >
                      {PROFILE.email}
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-pink-300 dark:border-pink-800 bg-pink-50 dark:bg-[#190A14] text-zinc-800 dark:text-zinc-200 hover:bg-pink-100 dark:hover:bg-[#2E1525] transition-colors whitespace-nowrap"
                    >
                      {emailCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      {emailCopied ? 'Email Copied' : 'Copy Email'}
                    </button>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Open Email App
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-pink-100 dark:border-pink-900/40 text-xs font-medium text-zinc-700 dark:text-pink-100/80">
                    <a
                      href={PROFILE.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-pink-700 dark:hover:text-pink-400 transition-colors"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                      LinkedIn Profile
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <a
                      href={PROFILE.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-pink-700 dark:hover:text-pink-400 transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub (@{PROFILE.githubHandle})
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-pink-200/70 pt-2 border-t border-pink-100 dark:border-pink-900/40">
                    {PROFILE.availability}
                  </p>
                </div>
              </div>

              {/* Right Column: User-Friendly Contact Form */}
              <div className="lg:col-span-7">
                <form
                  onSubmit={handleContactSubmit}
                  noValidate
                  className="rounded-2xl bg-white dark:bg-[#24111D] border border-pink-200 dark:border-pink-900/50 p-6 sm:p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => {
                          setSenderName(e.target.value);
                          setFormSubmitted(false);
                        }}
                        placeholder="Maria Santos"
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-pink-50/60 dark:bg-[#190A14] border border-pink-200 dark:border-pink-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-2 focus:outline-pink-700"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => {
                          setSenderEmail(e.target.value);
                          setFormSubmitted(false);
                        }}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-pink-50/60 dark:bg-[#190A14] border border-pink-200 dark:border-pink-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-2 focus:outline-pink-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-pink-50/60 dark:bg-[#190A14] border border-pink-200 dark:border-pink-900/60 text-zinc-900 dark:text-zinc-100 focus:outline-2 focus:outline-pink-700"
                    >
                      <option value="Internship or Role Opportunity">Internship or Role Opportunity</option>
                      <option value="Open Source Collaboration">Open Source Collaboration</option>
                      <option value="CIT 240 Portfolio Feedback">CIT 240 Portfolio Feedback</option>
                      <option value="General Greeting">General Greeting</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        setFormSubmitted(false);
                      }}
                      placeholder="Write a brief note about your project, team, or question..."
                      className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-pink-50/60 dark:bg-[#190A14] border border-pink-200 dark:border-pink-900/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-2 focus:outline-pink-700 resize-y"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                      {formError}
                    </p>
                  )}

                  {formSubmitted && (
                    <div
                      role="status"
                      className="rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 space-y-2"
                    >
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                        Thank you, {senderName}! Your message is ready to send.
                      </p>
                      <p className="text-xs text-emerald-800 dark:text-emerald-300">
                        Click below to send it directly through your email app to {PROFILE.email}.
                      </p>
                      <a
                        href={mailtoComposeHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Send via Email App
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="text-xs text-zinc-500 dark:text-pink-200/70">
                      Usually replies within 1–2 business days.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
                    >
                      <Send className="h-4 w-4" />
                      Prepare Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-pink-200 dark:border-pink-900/50 bg-pink-100 dark:bg-[#190A14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-600 dark:text-pink-200/75">
          <p>© {new Date().getFullYear()} {PROFILE.name}. Built with semantic HTML, responsive layout & open-source care.</p>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Back to Top
            </a>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ProjectDemoModal project={activeProject} onClose={() => setActiveProject(null)} />
      <ResumeSummaryModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
