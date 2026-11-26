import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, ExternalLink, Github, Monitor, Smartphone, Wind, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectDemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const WEATHER_CITIES: Record<string, { tempC: number; condition: string; humidity: string; wind: string }> = {
  Manila: { tempC: 30, condition: 'Partly Cloudy', humidity: '68%', wind: '14 km/h' },
  Cebu: { tempC: 29, condition: 'Warm Breeze', humidity: '72%', wind: '18 km/h' },
  Baguio: { tempC: 19, condition: 'Cool & Misty', humidity: '82%', wind: '11 km/h' },
  Seoul: { tempC: 12, condition: 'Clear Sky', humidity: '45%', wind: '9 km/h' },
};

const QOT_CHARACTERS = [
  {
    name: 'Hong Hae-in',
    role: 'Queens Department Store CEO',
    note: 'Sharp, resilient, and fiercely loyal beneath a composed exterior.',
  },
  {
    name: 'Baek Hyun-woo',
    role: 'Legal Director, Queens Group',
    note: 'Warm-hearted attorney from Yongdu-ri who rediscovers love through adversity.',
  },
  {
    name: 'Episode Spotlight',
    role: '16-Episode Romantic Drama',
    note: 'Follows a married couple navigating family pressure and second chances.',
  },
];

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  // jhofinalproj state
  const [finalTab, setFinalTab] = useState<'overview' | 'checklist' | 'structure'>('overview');

  // jho-weather state
  const [selectedCity, setSelectedCity] = useState<string>('Manila');
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  // jho-website state
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('desktop');

  // -QUEEN-OF-TEARS state
  const [qotIndex, setQotIndex] = useState(0);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const weatherData = WEATHER_CITIES[selectedCity] || WEATHER_CITIES.Manila;
  const displayTemp =
    unit === 'C' ? `${weatherData.tempC}°C` : `${Math.round((weatherData.tempC * 9) / 5 + 32)}°F`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {project.category} <span aria-hidden="true">·</span> {project.year}{' '}
              <span aria-hidden="true">·</span> jhonali3/{project.repoName}
            </p>
            <h3
              id="project-modal-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-1"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="h-10 w-10 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus-visible:outline-2 focus-visible:outline-pink-700 shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Interactive Live Preview
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Try clicking controls below
              </span>
            </div>

            {project.previewType === 'jhofinalproj' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'overview', label: 'Project Overview' },
                    { id: 'checklist', label: 'Quality Checklist' },
                    { id: 'structure', label: 'Repository Files' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFinalTab(tab.id as 'overview' | 'checklist' | 'structure')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        finalTab === tab.id
                          ? 'bg-pink-700 text-white'
                          : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-700 dark:text-zinc-300">
                  {finalTab === 'overview' && (
                    <p>
                      Final capstone web build stored at <span className="font-mono-code">jhonali3/jhofinalproj</span>, focusing on clean layout flow, intuitive navigation, and responsive design.
                    </p>
                  )}
                  {finalTab === 'checklist' && (
                    <ul className="space-y-1.5 text-xs sm:text-sm">
                      <li>✓ Semantic HTML5 header, main, section, and footer landmarks</li>
                      <li>✓ Mobile-first responsive CSS Grid & Flexbox layout</li>
                      <li>✓ Interactive JavaScript controls and clear typography</li>
                    </ul>
                  )}
                  {finalTab === 'structure' && (
                    <pre className="font-mono-code text-xs text-zinc-600 dark:text-zinc-300 overflow-x-auto">
{`jhofinalproj/
├── index.html
├── style.css
├── script.js
└── assets/`}
                    </pre>
                  )}
                </div>
              </div>
            )}

            {project.previewType === 'jhoweather' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.keys(WEATHER_CITIES).map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                          selectedCity === city
                            ? 'bg-pink-700 text-white'
                            : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setUnit((prev) => (prev === 'C' ? 'F' : 'C'))}
                    className="px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
                  >
                    Switch to °{unit === 'C' ? 'F' : 'C'}
                  </button>
                </div>

                <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CloudSun className="h-9 w-9 text-pink-700 dark:text-pink-400 shrink-0" />
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedCity}</p>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">{displayTemp}</p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300">{weatherData.condition}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 text-xs text-zinc-600 dark:text-zinc-300">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Droplets className="h-4 w-4 text-pink-700 dark:text-pink-400" />
                      {weatherData.humidity} Humidity
                    </span>
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <Wind className="h-4 w-4 text-pink-700 dark:text-pink-400" />
                      {weatherData.wind} Wind
                    </span>
                  </div>
                </div>
              </div>
            )}

            {project.previewType === 'jhowebsite' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewportMode('desktop')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      viewportMode === 'desktop'
                        ? 'bg-pink-700 text-white'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Desktop View
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewportMode('mobile')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      viewportMode === 'mobile'
                        ? 'bg-pink-700 text-white'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    Mobile View
                  </button>
                </div>

                <div
                  className={`mx-auto rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-all ${
                    viewportMode === 'mobile' ? 'max-w-[260px]' : 'w-full'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2 text-xs">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">Jhonalie</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {viewportMode === 'mobile' ? 'Menu ☰' : 'Home · About · Projects · Contact'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-3 leading-relaxed">
                    {viewportMode === 'mobile'
                      ? 'Compact single-column stack with touch-friendly spacing for smartphones.'
                      : 'Balanced multi-column web layout designed for comfortable desktop reading.'}
                  </p>
                </div>
              </div>
            )}

            {project.previewType === 'queenoftears' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {QOT_CHARACTERS.map((item, idx) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setQotIndex(idx)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        qotIndex === idx
                          ? 'bg-pink-700 text-white'
                          : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
                  <p className="text-xs text-pink-700 dark:text-pink-400 font-medium">
                    {QOT_CHARACTERS[qotIndex].role}
                  </p>
                  <p className="font-serif-editorial text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                    {QOT_CHARACTERS[qotIndex].name}
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                    {QOT_CHARACTERS[qotIndex].note}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.description}
            </p>
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                Key Implementation Highlights
              </h4>
              <ul className="space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-pink-700 dark:text-pink-400 mt-1" aria-hidden="true">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Stack: {project.techStack.join(' · ')}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-pink-700 text-white hover:bg-pink-800 transition-colors whitespace-nowrap"
                  >
                    Visit Live Site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap"
                >
                  <Github className="h-4 w-4" />
                  Open Repository on GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
