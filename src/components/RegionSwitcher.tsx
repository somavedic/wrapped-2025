"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale, REGIONS } from './LocaleContext';
import { ChevronDown } from 'lucide-react';

export function RegionSwitcher() {
  const { region, setRegion } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      >
        <span className="text-lg">{region.flag}</span>
        <span className="font-medium">{region.languageName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 shadow-xl z-50 overflow-hidden">
          <div className="py-1 max-h-80 overflow-y-auto">
            {REGIONS.map((r) => (
              <button
                key={r.code}
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).umami) {
                    (window as any).umami.track('change-region', { region: r.code });
                  }
                  setRegion(r);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 flex items-center gap-3 text-left hover:bg-white/10 transition-colors ${
                  region.code === r.code ? 'bg-white/5 text-somavedic-amber' : 'text-white/80'
                }`}
              >
                <span className="text-lg">{r.flag}</span>
                <div className="flex-1">
                  <span className="font-medium text-sm">{r.country}</span>
                  <span className="text-white/40 text-sm">: {r.languageName}</span>
                </div>
                {region.code === r.code && (
                  <div className="w-2 h-2 rounded-full bg-somavedic-amber" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
