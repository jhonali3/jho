import React from 'react';
import { CloudSun, Droplets, Wind } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';

interface ProjectMockupPreviewProps {
  type: ProjectItem['previewType'];
  compact?: boolean;
}

export const ProjectMockupPreview: React.FC<ProjectMockupPreviewProps> = ({ type, compact = false }) => {
  if (type === 'jhofinalproj') {
    return (
      <div className="w-full h-full bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-5 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <span className="text-[11px] font-mono-code text-zinc-500 dark:text-zinc-400 ml-1">
              github.com/jhonali3/jhofinalproj
            </span>
          </div>
          <span className="text-[11px] font-semibold text-pink-700 dark:text-pink-400">Final Build</span>
        </div>

        <div className={`grid ${compact ? 'grid-cols-1 gap-2.5 mt-3' : 'grid-cols-1 sm:grid-cols-2 gap-3 mt-4'} flex-1`}>
          <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-medium text-pink-700 dark:text-pink-400">Module 01 · Semantic Layout</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                Responsive Capstone Interface
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                Mobile-first grid with clean navigation & accessible contrast
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">HTML5 · CSS3 · JS</span>
              <span className="px-2 py-0.5 rounded bg-pink-700 text-white text-[10px] font-medium">Active</span>
            </div>
          </div>

          {!compact && (
            <div className="rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Module 02 · Interactive State</p>
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
                  User-Friendly Task Flow
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Clean form validation, live filtering & keyboard support
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 tabular-nums">100% Responsive</span>
                <span className="px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] font-medium">
                  Verified
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'jhoweather') {
    return (
      <div className="w-full h-full bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
          <span className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-400">jho-weather</span>
          <span className="text-[11px] font-medium text-pink-700 dark:text-pink-400">Manila, PH</span>
        </div>
        <div className="mt-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">30°C</p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Partly Cloudy</p>
            </div>
            <CloudSun className="h-8 w-8 text-pink-700 dark:text-pink-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <Droplets className="h-3.5 w-3.5 text-pink-700 dark:text-pink-400" />
              <span className="tabular-nums">68% Humidity</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <Wind className="h-3.5 w-3.5 text-pink-700 dark:text-pink-400" />
              <span className="tabular-nums">14 km/h Wind</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'jhowebsite') {
    return (
      <div className="w-full h-full bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-between select-none overflow-hidden">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
          <span className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-400">jho-website / index.html</span>
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Static Web</span>
        </div>
        <div className="mt-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3 flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Jhonalie</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">About · Works · Contact</span>
          </div>
          <div className="py-2 space-y-1.5">
            <div className="h-2.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800/70" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px]">
            <span className="text-zinc-500 dark:text-zinc-400">Responsive Breakpoints</span>
            <span className="font-semibold text-pink-700 dark:text-pink-400">GitHub Pages Ready</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-950 p-4 flex flex-col justify-between select-none overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
        <span className="text-[11px] font-mono-code text-zinc-600 dark:text-zinc-400">-QUEEN-OF-TEARS</span>
        <span className="text-[11px] font-medium text-pink-700 dark:text-pink-400">Series Showcase</span>
      </div>
      <div className="mt-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">Editorial Drama Feature · 16 Episodes</p>
          <p className="font-serif-editorial text-base font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
            Queen of Tears
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Cast spotlight, storyline guide & favorite moments
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[10px]">
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">Hong Hae-in · Baek Hyun-woo</span>
          <span className="text-pink-700 dark:text-pink-400 font-semibold">Interactive</span>
        </div>
      </div>
    </div>
  );
};
