# Agent Instructions for somavedic-wrapped-2025

## Commands

```bash
# Install dependencies (uses pnpm primarily, npm as fallback)
pnpm install
npm ci

# Development server
npm run dev        # Runs on http://localhost:3000

# Production build
npm run build      # Creates optimized production build
npm run start      # Starts production server

# Linting & Type Checking
npm run lint                    # Run ESLint
npx eslint src/app/page.tsx     # Lint single file
npx tsc --noEmit               # Type check without emitting

# Testing
# NOTE: No test runner configured in package.json
# If adding tests, follow Jest/Vitest patterns with `*.test.ts` files
```

## Code Style Guidelines

### Imports
- Use path alias `@/` for all project imports (e.g., `@/components/Button`, `@/lib/utils`)
- Group imports: React/Next → third-party → local aliases → relative imports
- External libraries: `lucide-react` (icons), `framer-motion` (animations), `cobe` (globe)

### Types
- Always use TypeScript strict mode - explicit types for function props and returns
- Export types/interfaces from files that define them (e.g., `export interface BentoGridProps`)
- Use `RegionCode`, `LanguageCode` from `@/lib/locales` for region/language types
- React.FC is not used; prefer direct function component declarations

### Naming Conventions
- Components: PascalCase (`BentoGrid.tsx`, `CustomerMetrics`)
- Utils/Hooks: camelCase (`useLocale.ts`, `cn()` function)
- Types/Interfaces: PascalCase with descriptive names (`BentoGridProps`, `RegionCode`)
- Constants: UPPER_SNAKE_CASE for true constants (`REGIONS`, `DEFAULT_REGION`)
- File extensions: `.tsx` for components with JSX, `.ts` for pure logic

### Component Patterns
- Server Components (default): Async functions that fetch data directly
- Client Components: Must include `"use client"` at top, use hooks/useState
- Use `cn()` from `@/lib/utils` for all className composition (clsx + tailwind-merge)
- Props destructuring in parameters: `({ children, className }: BentoGridProps)`
- Default exports for page components, named exports for reusable components

### Styling (Tailwind v4)
- Mobile-first responsive design: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Use design tokens: `somavedic-amber`, `somavedic-purple`, `glass` utilities
- Spacing scale: `gap-4 md:gap-8`, `p-4 md:p-8`
- Never use arbitrary Tailwind values; add to `@theme` in globals.css if needed

### Error Handling
- GraphQL errors: Return `null` and let UI fall back to mock data
- Client-side: Use try/catch with console.error for analytics/tracking failures
- Type guards: Always check for null/undefined before accessing nested properties
- Environment variables: Gracefully handle missing Shopify credentials

### Accessibility (WCAG 2.1 AA)
- All `<img>` must have descriptive `alt` text
- Form inputs need associated `<label>` or `aria-label`
- External links: `rel="noopener noreferrer"` + sr-only text "(opens in new tab)"
- Interactive elements: Minimum 44x44px touch targets
- ARIA attributes for complex UI (dropdowns: `role="listbox"`, `aria-expanded`)

### Project Structure
```
src/
  app/              # Next.js App Router pages
    page.tsx        # Main dashboard (async Server Component)
    layout.tsx      # Root layout with fonts, scripts
    api/            # API routes (e.g., subscribe)
  components/       # React components
    ui/             # Reusable UI primitives (StarBorder, TextType)
    *.tsx           # Feature components (BentoGrid, RegionSwitcher)
  lib/              # Utilities and business logic
    utils.ts        # cn() helper
    locales.ts      # Region/language config
    translations.ts # i18n translations
    shopify*.ts     # Shopify API clients
```

### Key Dependencies
- Next.js 16, React 19, TypeScript 5
- Tailwind CSS v4 with PostCSS
- Framer Motion for animations
- Shopify Admin + Storefront GraphQL APIs
- Lucide React for icons

### Environment Variables
See `.env.local` for required Shopify credentials:
- `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_ADMIN_ACCESS_TOKEN`, `SHOPIFY_STORE_FRONT_ACCESS_TOKEN`

### Notes
- No test runner currently configured
- Prefer pnpm over npm (pnpm-lock.yaml present)
- Supports 8 regions with i18n via `LocaleContext`
- Uses glassmorphism design system with custom theme tokens
