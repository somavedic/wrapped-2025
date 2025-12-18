"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Region, REGIONS, DEFAULT_REGION, RegionCode, getRegionByCode, getRegionBySlug, getProductUrl } from '@/lib/locales';
import { Translations, getTranslations } from '@/lib/translations';

interface LocaleContextType {
  region: Region;
  setRegion: (region: Region) => void;
  t: Translations;
  getProductLink: (handle: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = 'somavedic-region';
const URL_PARAM = 'lang';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>(DEFAULT_REGION);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load region: URL param takes priority, then localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get(URL_PARAM);
    
    if (langParam) {
      // URL parameter takes priority
      const urlRegion = getRegionBySlug(langParam);
      if (urlRegion) {
        setRegionState(urlRegion);
        localStorage.setItem(STORAGE_KEY, urlRegion.code);
        setIsHydrated(true);
        return;
      }
    }
    
    // Fall back to localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedRegion = getRegionByCode(saved as RegionCode);
      setRegionState(savedRegion);
      // Update URL to reflect saved preference
      updateUrlParam(savedRegion.slug);
    } else {
      // Set default in URL
      updateUrlParam(DEFAULT_REGION.slug);
    }
    setIsHydrated(true);
  }, []);

  // Update URL parameter without page reload
  const updateUrlParam = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(URL_PARAM, slug);
    window.history.replaceState({}, '', url.toString());
  };

  // Save region to localStorage and URL when changed
  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem(STORAGE_KEY, newRegion.code);
    updateUrlParam(newRegion.slug);
  };

  const t = getTranslations(region.language);
  
  const getProductLink = (handle: string) => getProductUrl(region, handle);

  // Prevent hydration mismatch by rendering with default until hydrated
  const value: LocaleContextType = {
    region: isHydrated ? region : DEFAULT_REGION,
    setRegion,
    t: isHydrated ? t : getTranslations(DEFAULT_REGION.language),
    getProductLink,
  };

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

// Re-export for convenience
export { REGIONS };
