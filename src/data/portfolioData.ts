export type ProjectCategory = 'All' | 'Web Apps' | 'Interactive UI' | 'Open Source';

export interface ProjectItem {
  id: string;
  title: string;
  repoName: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  role: string;
  summary: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  previewType: 'jhofinalproj' | 'jhoweather' | 'jhowebsite' | 'queenoftears';
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    detail: string;
    level: string;
  }[];
}

export interface CapstoneMilestone {
  number: string;
  title: string;
  courseContext: string;
  description: string;
  deliverable: string;
}

export const PROFILE = {
  name: 'Jhonalie Jotajero',
  shortName: 'Jhonalie',
  title: 'Information Technology Student',
  location: 'Janiuay, Iloilo',
  email: 'jhonaliejotajero76@gmail.com',
  githubHandle: 'jhonali3',
  githubUrl: 'https://github.com/jhonali3',
  linkedinUrl: 'https://www.linkedin.com/in/jhonalie-jotajero-812b10443/',
  avatarUrl: './assets/aistudio/926648734_1198488222506559_8844870312850443232_n_0b713d9c.jpg',
  bio: 'I am an Information Technology student who enjoys building clean, responsive, and easy-to-use websites.',
  careerGoal:
    'I am looking forward to learning with a supportive team through IT internships and hands-on web projects.',
  availability: 'Open to IT internships, academic collaborations, and entry-level web projects.',
};

export const HERO_HIGHLIGHTS = [
  { value: '4+', label: 'Public GitHub Repositories' },
  { value: 'CIT 240', label: 'Open Source Programming' },
  { value: '100%', label: 'Semantic & Mobile-First' },
  { value: '@jhonali3', label: 'GitHub Portfolio Profile' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    subtitle: 'Core syntax for web logic and scripting',
    items: [
      { name: 'Python', detail: 'CLI utilities, file automation & data parsing', level: 'Intermediate' },
      { name: 'HTML', detail: 'Semantic tags, landmarks & accessible forms', level: 'Proficient' },
      { name: 'JavaScript', detail: 'DOM manipulation, fetch APIs & state handling', level: 'Intermediate' },
      { name: 'PHP', detail: 'Server-side form handling & session auth', level: 'Intermediate' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Web',
    subtitle: 'Design systems & responsive interfaces',
    items: [
      { name: 'Responsive Design', detail: 'Mobile-first breakpoints across all screens', level: 'Proficient' },
    ],
  },
  {
    id: 'tools',
    title: 'Open Source & Tools',
    subtitle: 'Collaboration, versioning & deployment',
    items: [
      { name: 'Git', detail: 'Branching, version history & structured commits', level: 'Proficient' },
      { name: 'GitHub', detail: 'Remote repositories, pull requests & collaboration', level: 'Proficient' },
      { name: 'Netlify', detail: 'Continuous deployment & live web hosting', level: 'Proficient' },
    ],
  },
  {
    id: 'databases',
    title: 'Database',
    subtitle: 'Structured storage & relational queries',
    items: [
      { name: 'MySQL', detail: 'Schema design, joins & CRUD queries', level: 'Intermediate' },
      { name: 'SQLite', detail: 'Lightweight embedded storage for prototypes', level: 'Intermediate' },
      { name: 'JSON & REST APIs', detail: 'Structured payloads & client-side rendering', level: 'Proficient' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'jhofinalproj',
    title: 'Jho Final Project — Web Capstone App',
    repoName: 'jhofinalproj',
    category: 'Web Apps',
    year: '2026',
    role: 'Lead Developer',
    summary:
      'My culminating web development project bringing together semantic HTML5 structure, responsive CSS layouts, and interactive JavaScript functionality.',
    description:
      'Built as my final course application on GitHub, combining clean navigation, organized content sections, and mobile-first styling so visitors can explore every feature smoothly on any screen size.',
    highlights: [
      'Structured semantic HTML5 sections for clear accessibility',
      'Responsive Flexbox and Grid layouts tested across phone and desktop widths',
      'Clean repository organization published on GitHub under jhonali3/jhofinalproj',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub'],
    githubUrl: 'https://github.com/jhonali3/jhofinalproj',
    liveUrl: 'https://jhofinalproject.netlify.app/',
    featured: true,
    previewType: 'jhofinalproj',
  },
  {
    id: 'jho-weather',
    title: 'Jho Weather — Forecast Dashboard',
    repoName: 'jho-weather',
    category: 'Web Apps',
    year: '2026',
    role: 'Sole Developer',
    summary:
      'A clean, easy-to-read weather lookup application displaying current temperature, humidity, wind conditions, and city forecasts.',
    description:
      'Designed for quick everyday checks without visual clutter. Users can search or switch cities to view live-styled weather conditions, temperature metrics, and daily outlooks.',
    highlights: [
      'City lookup and instant metric switching (°C / °F)',
      'Clear weather condition cards with humidity and wind indicators',
      'Mobile-friendly layout built with vanilla JavaScript and CSS',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Weather API'],
    githubUrl: 'https://github.com/jhonali3/jho-weather',
    liveUrl: 'https://weather-91.netlify.app/',
    featured: false,
    previewType: 'jhoweather',
  },
  {
    id: 'jho-website',
    title: 'Jho Website — Personal Web Hub',
    repoName: 'jho-website',
    category: 'Open Source',
    year: '2025',
    role: 'Designer & Developer',
    summary:
      'A personal multi-section static website crafted with clean typography, smooth anchor navigation, and live Netlify hosting.',
    description:
      'Focused on practicing core client-side web standards: semantic markup, custom CSS variables, responsive breakpoints, and straightforward visitor navigation.',
    highlights: [
      'Lightweight zero-framework HTML, CSS, and JavaScript architecture',
      'Smooth-scrolling section navigation and responsive mobile view',
      'Deployed live on Netlify and open-sourced at github.com/jhonali3/jho-website',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Netlify'],
    githubUrl: 'https://github.com/jhonali3/jho-website',
    liveUrl: 'https://jhonali3.netlify.app/',
    featured: false,
    previewType: 'jhowebsite',
  },
  {
    id: 'queen-of-tears',
    title: 'Queen of Tears — Interactive Tribute Page',
    repoName: '-QUEEN-OF-TEARS',
    category: 'Interactive UI',
    year: '2025',
    role: 'Front-End Creator',
    summary:
      'An editorial fan showcase dedicated to the series Queen of Tears, featuring character profiles, episode highlights, and styled visual cards.',
    description:
      'Created to practice expressive visual storytelling, typography pairing, and interactive card layouts using clean HTML and CSS styling.',
    highlights: [
      'Curated cast and episode highlight cards with responsive grid framing',
      'Expressive editorial typography and balanced color contrast',
      'Interactive scene & character switcher in the live preview',
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    githubUrl: 'https://github.com/jhonali3/-QUEEN-OF-TEARS',
    featured: false,
    previewType: 'queenoftears',
  },
];

export const CAPSTONE_MILESTONES: CapstoneMilestone[] = [
  {
    number: '01.',
    title: 'Semantic HTML5 & Accessible Structure',
    courseContext: 'CIT 240 Core Standard',
    description:
      'Every page is organized with meaningful landmarks (<header>, <nav>, <main>, <section>, <article>, and <footer>), descriptive alt text, keyboard focus states, and balanced reading measures.',
    deliverable: 'WCAG AA contrast and keyboard-navigable portfolio architecture',
  },
  {
    number: '02.',
    title: 'Responsive Flexbox & Grid Engineering',
    courseContext: 'Mobile-First Layout System',
    description:
      'Layouts adapt smoothly from compact smartphone screens to wide 1440px desktop monitors using CSS Grid, Flexbox, fluid spacing, and thoughtful touch targets.',
    deliverable: 'Zero horizontal overflow across mobile, tablet, and desktop',
  },
  {
    number: '03.',
    title: 'Open Source Git Discipline & Documentation',
    courseContext: 'GitHub Pages Deployment',
    description:
      'Projects follow structured commit histories, modular file organization, clear README setup guides, and verified public deployment workflows.',
    deliverable: 'Reproducible repositories under github.com/jhonali3',
  },
];
