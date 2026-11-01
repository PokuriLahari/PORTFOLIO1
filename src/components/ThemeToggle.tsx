import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../utils/theme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={onToggle}
      className={`relative inline-flex items-center h-9 w-[70px] rounded-full p-1 cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EA533D] focus-visible:ring-offset-2 select-none ${
        isDark
          ? 'bg-[#181330] border border-[#8B5CF6]/50 shadow-[0_0_12px_rgba(139,92,246,0.3)]'
          : 'bg-[#F2ECE1] border border-black/15 shadow-inner'
      }`}
    >
      {/* Background Icon Track */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none text-xs">
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-300 ${
            !isDark ? 'opacity-0' : 'text-amber-300/80 opacity-70'
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-300 ${
            isDark ? 'opacity-0' : 'text-slate-500 opacity-60'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Sliding Thumb */}
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ease-out z-10 ${
          isDark
            ? 'translate-x-[34px] bg-[#2C2156] border border-[#A78BFA] text-[#DDD6FE] shadow-[0_0_10px_rgba(167,139,250,0.4)]'
            : 'translate-x-0 bg-white border border-black/10 text-amber-500 shadow-sm'
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 fill-current text-[#C4B5FD]" aria-hidden="true" />
        ) : (
          <Sun className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
        )}
      </span>
    </button>
  );
};
