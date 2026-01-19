// Translation strings for all supported languages

import { LanguageCode } from './locales';

export interface Translations {
  // Meta tags
  metaTitle: string;
  metaDescription: string;
  
  // Header
  annualOverview: string;
  wrapped: string;
  heroDescription: string;
  
  // GlobalReach
  globalReach: string;
  marketsActive: string;
  countries: string;
  harmonizingSpaces: string;
  
  // Country names for GlobalReach
  countryNames: {
    [key: string]: string;
  };
  
  // VisitorStats
  somavedicImpact: string;
  // Imperial units (US)
  sqFtProtected: string;
  sqFtNote: string;
  gallonUnit: string;
  // Metric units (EU/UK/etc)
  sqMProtected: string;
  sqMNote: string;
  literUnit: string;
  // Shared
  waterStructured: string;
  waterNote: string;
  totalHoursHarmony: string;
  giftedSomavedics: string;
  
  // ImpactCounter (Research Highlights)
  researchHighlights: string;
  cellProtection: string;
  cellRecoveryDesc: string;
  inflammation: string;
  inflammationDesc: string;
  airQuality: string;
  airQualityDesc: string;
  ionLevels: string;
  ionLevelsDesc: string;
  seeScience: string;
  
  // TopProduct
  yourFavorite: string;
  communityChoice: string;
  bestSellingDesc: string;
  viewProduct: string;
  
  // TopProductsList
  topPerformers: string;
  mostPopularProducts: string;
  popularProductsDesc: string;
  topSomavedics: string;
  topAccessories: string;
  
  // CustomerTestimonial
  testimonialBadge: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  testimonialDate: string;
  testimonialHeadline: string;
  testimonialText: string;
  testimonialAuthor: string;
  testimonialAuthorInitial: string;
  testimonialLocation: string;
  seeReviews: string;
  
  // CustomerMetrics
  customerMetricsBadge: string;
  customerSatisfaction: string;
  customerSatisfactionDesc: string;
  returns: string;
  returnsDesc: string;
  supportTickets: string;
  supportTicketsDesc: string;
  day: string;

  // FutureDevice
  futureDeviceTitle: string;
  futureDeviceSubtitle: string;
  emailPlaceholder: string;
  notifyMe: string;
  formSubmitting: string;
  formSuccess: string;
  formError: string;
  
  // Footer
  shareWithFriend: string;
  linkCopied: string;
}

const en: Translations = {
  // Meta tags
  metaTitle: 'Join the First Wave - Somavedic Elaura',
  metaDescription: 'A year of harmony, growth, and global impact. See how Somavedic protected spaces across the world in 2025.',
  
  // Header
  annualOverview: 'Somavedic Annual Overview',
  wrapped: 'Wrapped',
  heroDescription: "A year of harmony, growth, and global impact. Let's look back at how we protected spaces across the world in 2025.",
  
  // GlobalReach
  globalReach: 'Global Reach',
  marketsActive: 'Markets Active',
  countries: 'Countries',
  harmonizingSpaces: 'Harmonizing spaces across every continent.',
  
  // Country/region names
  countryNames: {
    // Regions/Continents
    'Europe': 'Europe',
    'North America': 'North America',
    'Asia': 'Asia',
    // Countries
    'United States': 'United States',
    'Canada': 'Canada',
    'Germany': 'Germany',
    'United Kingdom': 'United Kingdom',
    'Austria': 'Austria',
    'France': 'France',
    'Netherlands': 'Netherlands',
    'Switzerland': 'Switzerland',
    'Australia': 'Australia',
    'Spain': 'Spain',
    'Italy': 'Italy',
    'Belgium': 'Belgium',
    'Czech Republic': 'Czech Republic',
    'Poland': 'Poland',
    'Sweden': 'Sweden',
    'Norway': 'Norway',
    'Denmark': 'Denmark',
    'Finland': 'Finland',
    'Ireland': 'Ireland',
    'Portugal': 'Portugal',
    'Singapore': 'Singapore',
    'Japan': 'Japan',
    'South Korea': 'South Korea',
    'China': 'China',
    'India': 'India',
    'Brazil': 'Brazil',
    'Mexico': 'Mexico',
    'New Zealand': 'New Zealand',
    'South Africa': 'South Africa',
    'UAE': 'UAE',
    'Israel': 'Israel',
    'Greece': 'Greece',
    'Slovakia': 'Slovakia',
    'Hungary': 'Hungary',
    'Romania': 'Romania',
    'Croatia': 'Croatia',
    'Slovenia': 'Slovenia',
  },
  
  // VisitorStats
  somavedicImpact: 'Somavedic Impact',
  // Imperial
  sqFtProtected: 'Sq. Ft. Protected in 2025',
  sqFtNote: '*Est. based on avg 2,800 sq. ft. coverage',
  gallonUnit: 'Gal',
  // Metric
  sqMProtected: 'Sq. M. Protected in 2025',
  sqMNote: '*Est. based on avg 260 m² coverage',
  literUnit: 'L',
  // Shared
  waterStructured: 'Water Structured in 2025',
  waterNote: '*Est. based on 5L daily usage per unit',
  totalHoursHarmony: 'Total Hours of Harmony in 2025',
  giftedSomavedics: 'Gifted Somavedics for greater good',
  
  // ImpactCounter
  researchHighlights: 'Research Highlights',
  cellProtection: 'Cell Protection',
  cellRecoveryDesc: 'Improved cell recovery',
  inflammation: 'Inflammation',
  inflammationDesc: 'Of users showed reduced inflammation markers',
  airQuality: 'Air Quality',
  airQualityDesc: 'Negative ion concentration increase in tested spaces',
  ionLevels: 'Ion Levels',
  ionLevelsDesc: 'Above typical building ion concentration',
  seeScience: 'See the science',
  
  // TopProduct
  yourFavorite: 'Your Favorite',
  communityChoice: 'The Community Choice',
  bestSellingDesc: 'The #1 best-selling model of 2025.',
  viewProduct: 'View Product',
  
  // TopProductsList
  topPerformers: 'Top Performers',
  mostPopularProducts: 'Most Popular Products',
  popularProductsDesc: 'The models that brought harmony to the most homes in 2025.',
  topSomavedics: 'Top 4 Somavedics',
  topAccessories: 'Top 3 Accessories',
  
  // CustomerTestimonial
  testimonialBadge: 'Customer Love',
  testimonialTitle: 'True Love = Somavedic!',
  testimonialSubtitle: 'Real stories from our community.',
  testimonialDate: 'January 18, 2026',
  testimonialHeadline: 'True Love = Somavedic!',
  testimonialText: "I wholeheartedly recommend Somavedic. We have Rosalin and Vedic at home, and both create harmony, peace, relaxation, and make us feel great. We also use Vedic to structure our drinking water for the whole family. Anyone considering buying a Somavedic, don't hesitate – just buy it! :-)",
  testimonialAuthor: 'Zuzana Klinková',
  testimonialAuthorInitial: 'Z',
  testimonialLocation: 'Prague, Czech Republic',
  seeReviews: 'See reviews',
  
  // CustomerMetrics
  customerMetricsBadge: 'Customer Experience',
  customerSatisfaction: 'Customer Satisfaction',
  customerSatisfactionDesc: 'Of customers rate us 5 stars',
  returns: 'Returns',
  returnsDesc: 'Return rate across all products',
  supportTickets: 'Support Response',
  supportTicketsDesc: 'Average time to resolve tickets by a real human',
  day: 'day',

  // FutureDevice
  futureDeviceTitle: 'The New Somavedic Will Be A Blast',
  futureDeviceSubtitle: 'Q1 2026. Be the first to know.',
  emailPlaceholder: 'Enter your email',
  notifyMe: 'Notify Me',
  formSubmitting: 'Sending...',
  formSuccess: 'Subscribed!',
  formError: 'Something went wrong. Please try again.',
  
  // Footer
  shareWithFriend: 'Share With A Friend',
  linkCopied: 'Link Copied!',
};

const de: Translations = {
  // Meta tags
  metaTitle: 'Join the First Wave - Somavedic Elaura',
  metaDescription: 'Ein Jahr voller Harmonie, Wachstum und globaler Wirkung. Sehen Sie, wie Somavedic 2025 Räume auf der ganzen Welt geschützt hat.',
  
  // Header
  annualOverview: 'Somavedic Jahresübersicht',
  wrapped: 'Wrapped',
  heroDescription: 'Ein Jahr voller Harmonie, Wachstum und globaler Wirkung. Lassen Sie uns zurückblicken, wie wir 2025 Räume auf der ganzen Welt geschützt haben.',
  
  // GlobalReach
  globalReach: 'Globale Reichweite',
  marketsActive: 'Aktive Märkte',
  countries: 'Länder',
  harmonizingSpaces: 'Harmonisierung von Räumen auf allen Kontinenten.',
  
  // Country/region names
  countryNames: {
    // Regions/Continents
    'Europe': 'Europa',
    'North America': 'Nordamerika',
    'Asia': 'Asien',
    // Countries
    'United States': 'Vereinigte Staaten',
    'Canada': 'Kanada',
    'Germany': 'Deutschland',
    'United Kingdom': 'Vereinigtes Königreich',
    'Austria': 'Österreich',
    'France': 'Frankreich',
    'Netherlands': 'Niederlande',
    'Switzerland': 'Schweiz',
    'Australia': 'Australien',
    'Spain': 'Spanien',
    'Italy': 'Italien',
    'Belgium': 'Belgien',
    'Czech Republic': 'Tschechische Republik',
    'Poland': 'Polen',
    'Sweden': 'Schweden',
    'Norway': 'Norwegen',
    'Denmark': 'Dänemark',
    'Finland': 'Finnland',
    'Ireland': 'Irland',
    'Portugal': 'Portugal',
    'Singapore': 'Singapur',
    'Japan': 'Japan',
    'South Korea': 'Südkorea',
    'China': 'China',
    'India': 'Indien',
    'Brazil': 'Brasilien',
    'Mexico': 'Mexiko',
    'New Zealand': 'Neuseeland',
    'South Africa': 'Südafrika',
    'UAE': 'VAE',
    'Israel': 'Israel',
    'Greece': 'Griechenland',
    'Slovakia': 'Slowakei',
    'Hungary': 'Ungarn',
    'Romania': 'Rumänien',
    'Croatia': 'Kroatien',
    'Slovenia': 'Slowenien',
  },
  
  // VisitorStats
  somavedicImpact: 'Somavedic Wirkung',
  // Imperial (not used for DE but included for interface)
  sqFtProtected: 'Geschützte Quadratfuß in 2025',
  sqFtNote: '*Geschätzt basierend auf durchschnittlich 2.800 sq. ft. Abdeckung',
  gallonUnit: 'Gal',
  // Metric
  sqMProtected: 'Geschützte m² in 2025',
  sqMNote: '*Geschätzt basierend auf durchschnittlich 260 m² Abdeckung',
  literUnit: 'L',
  // Shared
  waterStructured: 'Strukturiertes Wasser in 2025',
  waterNote: '*Geschätzt basierend auf 5L täglicher Nutzung pro Gerät',
  totalHoursHarmony: 'Gesamtstunden der Harmonie in 2025',
  giftedSomavedics: 'Geschenkte Somavedics für das Gemeinwohl',
  
  // ImpactCounter
  researchHighlights: 'Forschungsergebnisse',
  cellProtection: 'Zellschutz',
  cellRecoveryDesc: 'Verbesserte Zellregeneration',
  inflammation: 'Entzündung',
  inflammationDesc: 'Der Nutzer zeigten reduzierte Entzündungsmarker',
  airQuality: 'Luftqualität',
  airQualityDesc: 'Erhöhung der negativen Ionenkonzentration in getesteten Räumen',
  ionLevels: 'Ionenwerte',
  ionLevelsDesc: 'Über der typischen Gebäude-Ionenkonzentration',
  seeScience: 'Zur Wissenschaft',
  
  // TopProduct
  yourFavorite: 'Ihr Favorit',
  communityChoice: 'Die Wahl der Community',
  bestSellingDesc: 'Das meistverkaufte Modell 2025.',
  viewProduct: 'Produkt ansehen',
  
  // TopProductsList
  topPerformers: 'Top-Performer',
  mostPopularProducts: 'Beliebteste Produkte',
  popularProductsDesc: 'Die Modelle, die 2025 die meiste Harmonie in die Häuser brachten.',
  topSomavedics: 'Top 4 Somavedics',
  topAccessories: 'Top 3 Zubehör',
  
  // CustomerTestimonial
  testimonialBadge: 'Kundenliebe',
  testimonialTitle: 'Wahre Liebe = Somavedic!',
  testimonialSubtitle: 'Echte Geschichten aus unserer Community.',
  testimonialDate: '18. Januar 2026',
  testimonialHeadline: 'Wahre Liebe = Somavedic!',
  testimonialText: 'Ich empfehle Somavedic von ganzem Herzen. Wir haben Rosalin und Vedic zu Hause, und beide schaffen Harmonie, Ruhe, Entspannung und ein tolles Wohlbefinden. Wir nutzen Vedic auch, um unser Trinkwasser für die ganze Familie zu strukturieren. Wer überlegt, sich einen Somavedic zu kaufen – zögert nicht, kauft ihn einfach! :-)',
  testimonialAuthor: 'Zuzana Klinková',
  testimonialAuthorInitial: 'Z',
  testimonialLocation: 'Prag, Tschechische Republik',
  seeReviews: 'Bewertungen ansehen',
  
  // CustomerMetrics
  customerMetricsBadge: 'Kundenerfahrung',
  customerSatisfaction: 'Kundenzufriedenheit',
  customerSatisfactionDesc: 'Der Kunden bewerten uns mit 5 Sternen',
  returns: 'Rücksendungen',
  returnsDesc: 'Rücksendequote bei allen Produkten',
  supportTickets: 'Support-Reaktionszeit',
  supportTicketsDesc: 'Durchschnittliche Zeit zur Lösung von Tickets durch einen echten Menschen',
  day: 'Tag',

  // FutureDevice
  futureDeviceTitle: 'Der neue Somavedic wird der Hammer',
  futureDeviceSubtitle: 'Q1 2026. Erfahren Sie es als Erster.',
  emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
  notifyMe: 'Benachrichtigen',
  formSubmitting: 'Senden...',
  formSuccess: 'Angemeldet!',
  formError: 'Etwas ist schief gelaufen. Bitte versuchen Sie es erneut.',
  
  // Footer
  shareWithFriend: 'Mit Freunden teilen',
  linkCopied: 'Link kopiert!',
};

const cs: Translations = {
  // Meta tags
  metaTitle: 'Join the First Wave - Somavedic Elaura',
  metaDescription: 'Rok plný harmonie, růstu a celosvětového dopadu. Podívejte se, jak Somavedic v roce 2025 chránil prostory po celém světě.',
  
  // Header
  annualOverview: 'Somavedic Roční přehled',
  wrapped: 'Wrapped',
  heroDescription: 'Rok plný harmonie, růstu a celosvětového dopadu. Podívejme se, jak jsme v roce 2025 chránili prostory po celém světě.',
  
  // GlobalReach
  globalReach: 'Globální dosah',
  marketsActive: 'Aktivních trhů',
  countries: 'Zemí',
  harmonizingSpaces: 'Harmonizace prostor na všech kontinentech.',
  
  // Country/region names
  countryNames: {
    // Regions/Continents
    'Europe': 'Evropa',
    'North America': 'Severní Amerika',
    'Asia': 'Asie',
    // Countries
    'United States': 'Spojené státy',
    'Canada': 'Kanada',
    'Germany': 'Německo',
    'United Kingdom': 'Spojené království',
    'Austria': 'Rakousko',
    'France': 'Francie',
    'Netherlands': 'Nizozemsko',
    'Switzerland': 'Švýcarsko',
    'Australia': 'Austrálie',
    'Spain': 'Španělsko',
    'Italy': 'Itálie',
    'Belgium': 'Belgie',
    'Czech Republic': 'Česká republika',
    'Poland': 'Polsko',
    'Sweden': 'Švédsko',
    'Norway': 'Norsko',
    'Denmark': 'Dánsko',
    'Finland': 'Finsko',
    'Ireland': 'Irsko',
    'Portugal': 'Portugalsko',
    'Singapore': 'Singapur',
    'Japan': 'Japonsko',
    'South Korea': 'Jižní Korea',
    'China': 'Čína',
    'India': 'Indie',
    'Brazil': 'Brazílie',
    'Mexico': 'Mexiko',
    'New Zealand': 'Nový Zéland',
    'South Africa': 'Jižní Afrika',
    'UAE': 'SAE',
    'Israel': 'Izrael',
    'Greece': 'Řecko',
    'Slovakia': 'Slovensko',
    'Hungary': 'Maďarsko',
    'Romania': 'Rumunsko',
    'Croatia': 'Chorvatsko',
    'Slovenia': 'Slovinsko',
  },
  
  // VisitorStats
  somavedicImpact: 'Dopad Somavedicu',
  // Imperial (not used for CS but included for interface)
  sqFtProtected: 'Chráněných čtverečních stop v 2025',
  sqFtNote: '*Odhad na základě průměrného pokrytí 2 800 sq. ft.',
  gallonUnit: 'Gal',
  // Metric
  sqMProtected: 'Chráněných m² v 2025',
  sqMNote: '*Odhad na základě průměrného pokrytí 260 m²',
  literUnit: 'L',
  // Shared
  waterStructured: 'Strukturované vody v 2025',
  waterNote: '*Odhad na základě 5L denního použití na jednotku',
  totalHoursHarmony: 'Celkových hodin harmonie v 2025',
  giftedSomavedics: 'Darovaných Somavedic pro dobrou věc',
  
  // ImpactCounter
  researchHighlights: 'Výsledky výzkumu',
  cellProtection: 'Ochrana buněk',
  cellRecoveryDesc: 'Zlepšená regenerace buněk',
  inflammation: 'Zánět',
  inflammationDesc: 'Uživatelů vykázalo snížené markery zánětu',
  airQuality: 'Kvalita vzduchu',
  airQualityDesc: 'Zvýšení koncentrace záporných iontů v testovaných prostorách',
  ionLevels: 'Hladiny iontů',
  ionLevelsDesc: 'Nad typickou koncentrací iontů v budovách',
  seeScience: 'Zobrazit výzkum',
  
  // TopProduct
  yourFavorite: 'Váš oblíbenec',
  communityChoice: 'Volba komunity',
  bestSellingDesc: 'Nejprodávanější model roku 2025.',
  viewProduct: 'Zobrazit produkt',
  
  // TopProductsList
  topPerformers: 'Nejúspěšnější',
  mostPopularProducts: 'Nejoblíbenější produkty',
  popularProductsDesc: 'Modely, které v roce 2025 přinesly harmonii do nejvíce domovů.',
  topSomavedics: 'Top 4 Somavediců',
  topAccessories: 'Top 3 příslušenství',
  
  // CustomerTestimonial
  testimonialBadge: 'Láska zákazníků',
  testimonialTitle: 'Pravá láska = Somavedic!',
  testimonialSubtitle: 'Skutečné příběhy z naší komunity.',
  testimonialDate: '18. ledna 2026',
  testimonialHeadline: 'Pravá láska = Somavedic!',
  testimonialText: 'Somavedic doporučuji vřele. Máme Rosalin a Vedic a oba vytvářejí v našem domově harmonii, klid, uvolnění a cítíme se ve svém domově hezky. Přes Vedic také aktivujeme vodu, kterou pije celá rodina. Kdokoliv se rozhodne, koupit si Somavedic, ať neváhá a kupuje... :-)',
  testimonialAuthor: 'Zuzana Klinková',
  testimonialAuthorInitial: 'Z',
  testimonialLocation: 'Praha 5, Česká republika',
  seeReviews: 'Zobrazit recenze',
  
  // CustomerMetrics
  customerMetricsBadge: 'Zákaznická zkušenost',
  customerSatisfaction: 'Spokojenost zákazníků',
  customerSatisfactionDesc: 'Zákazníků nás hodnotí 5 hvězdičkami',
  returns: 'Vrácení zboží',
  returnsDesc: 'Míra vrácení u všech produktů',
  supportTickets: 'Doba odezvy podpory',
  supportTicketsDesc: 'Průměrná doba vyřešení požadavků skutečným člověkem',
  day: 'den',

  // FutureDevice
  futureDeviceTitle: 'Nový Somavedic bude jízda',
  futureDeviceSubtitle: 'Q1 2026. Buďte první, kdo se to dozví.',
  emailPlaceholder: 'Zadejte svůj e-mail',
  notifyMe: 'Upozornit mě',
  formSubmitting: 'Odesílání...',
  formSuccess: 'Přihlášeno!',
  formError: 'Něco se pokazilo. Zkuste to prosím znovu.',
  
  // Footer
  shareWithFriend: 'Sdílet s přítelem',
  linkCopied: 'Odkaz zkopírován!',
};

export const translations: Record<LanguageCode, Translations> = {
  en,
  de,
  cs,
};

export function getTranslations(language: LanguageCode): Translations {
  return translations[language] || translations.en;
}
