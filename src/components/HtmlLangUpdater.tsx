"use client";

import { useEffect } from 'react';
import { useLocale } from './LocaleContext';

export function HtmlLangUpdater() {
  const { region } = useLocale();

  useEffect(() => {
    // Update the html lang attribute when region changes
    document.documentElement.lang = region.language;
  }, [region.language]);

  return null;
}
