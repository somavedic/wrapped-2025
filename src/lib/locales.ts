// Region and locale configuration

export type RegionCode = 'US-CA' | 'SG' | 'EU' | 'UK' | 'DE' | 'CH' | 'AT' | 'CZ';
export type LanguageCode = 'en' | 'de' | 'cs';

export interface Region {
  code: RegionCode;
  slug: string;           // URL parameter value
  country: string;        // Country/region name
  languageName: string;   // Native language name
  flag: string;
  language: LanguageCode;
  domain: string;
  usesMetric: boolean;    // true = metric (m², L), false = imperial (sq ft, gal)
}

export const REGIONS: Region[] = [
  { code: 'US-CA', slug: 'us-ca', country: 'USA & Canada', languageName: 'English', flag: '🇺🇸', language: 'en', domain: 'somavedic.com', usesMetric: false },
  { code: 'SG', slug: 'sg', country: 'Singapore', languageName: 'English', flag: '🇸🇬', language: 'en', domain: 'somavedic.sg', usesMetric: true },
  { code: 'EU', slug: 'eu', country: 'Europe', languageName: 'English', flag: '🇪🇺', language: 'en', domain: 'somavedic.eu', usesMetric: true },
  { code: 'UK', slug: 'uk', country: 'United Kingdom', languageName: 'English', flag: '🇬🇧', language: 'en', domain: 'somavedic.uk', usesMetric: true },
  { code: 'DE', slug: 'de', country: 'Germany', languageName: 'Deutsch', flag: '🇩🇪', language: 'de', domain: 'somavedic.de', usesMetric: true },
  { code: 'CH', slug: 'ch', country: 'Switzerland', languageName: 'Deutsch', flag: '🇨🇭', language: 'de', domain: 'somavedic.ch', usesMetric: true },
  { code: 'AT', slug: 'at', country: 'Austria', languageName: 'Deutsch', flag: '🇦🇹', language: 'de', domain: 'somavedic.at', usesMetric: true },
  { code: 'CZ', slug: 'cz', country: 'Czech Republic', languageName: 'Čeština', flag: '🇨🇿', language: 'cs', domain: 'somavedic.cz', usesMetric: true },
];

export const DEFAULT_REGION: Region = REGIONS[0]; // US-CA

export function getRegionByCode(code: RegionCode): Region {
  return REGIONS.find(r => r.code === code) || DEFAULT_REGION;
}

export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find(r => r.slug === slug.toLowerCase());
}

export function getProductUrl(region: Region, handle: string): string {
  return `https://${region.domain}/products/${handle}`;
}
