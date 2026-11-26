import React, { useEffect } from 'react';
import { Mail, Printer, X } from 'lucide-react';
import { CAPSTONE_MILESTONES, PROFILE, PROJECTS, SKILL_GROUPS } from '../data/portfolioData';

interface ResumeSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeSummaryModal: React.FC<ResumeSummaryModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/70 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h3 id="resume-modal-title" className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Curriculum Vitae Summary
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {PROFILE.name} · {PROFILE.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume summary"
              className="h-9 w-9 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[78vh] overflow-y-auto text-sm">
          <div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{PROFILE.name}</h4>
            <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">{PROFILE.title}</p>
            <p className="text-zinc-700 dark:text-zinc-300 mt-3 leading-relaxed">{PROFILE.careerGoal}</p>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <h5 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              Technical Skills Overview
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.id} className="space-y-1">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs">{group.title}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {group.items.map((item) => item.name).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <h5 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              Selected Projects
            </h5>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                    {proj.title} ({proj.year})
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">{proj.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4">
            <h5 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              Coursework & Open Source Focus
            </h5>
            <div className="space-y-2">
              {CAPSTONE_MILESTONES.map((m) => (
                <p key={m.number} className="text-xs text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{m.number} {m.title}:</span>{' '}
                  {m.deliverable}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center justify-between gap-4">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{PROFILE.availability}</span>
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              <Mail className="h-3.5 w-3.5" />
              Email Jhonalie
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
