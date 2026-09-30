import React from 'react';
import { Layers } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView, isDark }) => {
  return (
    <footer className={`border-t py-12 ${
      isDark ? 'bg-[#080c14] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-200">
                DATA STRUCTURE STUDIO
              </div>
              <div className="text-[10px] font-mono text-cyan-500">
                Visual Learning Hub · C Edition
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <button
              onClick={() => setActiveView('overview')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => setActiveView('topics')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Topics Library
            </button>
            <button
              onClick={() => setActiveView('complexity')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Complexity Matrix
            </button>
            <button
              onClick={() => setActiveView('arena')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Practice Arena
            </button>
            <button
              onClick={() => setActiveView('guide')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Course Guide
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Standard C99 / C11 Architecture · Built for CS Learners
          </div>
        </div>
      </div>
    </footer>
  );
};
