import React from 'react';
import { Layers, Moon, Sun, Terminal } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onSelectTopic?: (topicId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  isDark,
  setIsDark,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'why-visual', label: 'Why Visual?' },
    { id: 'topics', label: 'Topics Library' },
    { id: 'complexity', label: 'Complexity Matrix' },
    { id: 'arena', label: 'Practice Arena' },
    { id: 'guide', label: 'Course Guide' },
  ];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${
      isDark ? 'bg-[#0b0f19]/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark / Brand */}
        <button
          onClick={() => setActiveView('overview')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/10">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-1.5">
              DATA STRUCTURE STUDIO
            </div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-500 font-semibold">
              Visual Learning Hub · C Edition
            </div>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Mode Indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono border border-cyan-500/20 bg-cyan-500/5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>C99 EDITION</span>
          </div>

          <button
            onClick={() => setActiveView('arena')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-sm shadow-cyan-500/25 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch</span> Arena
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-slate-800 hover:bg-slate-800 text-amber-400'
                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
