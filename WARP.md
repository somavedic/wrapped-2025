# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands

### Install
- `npm ci`

### Dev server
- `npm run dev`
  - App runs on `http://localhost:3000`

### Production build / run
- `npm run build`
- `npm run start`

### Lint
- `npm run lint`
- Lint a single file (useful for debugging): `npx eslint src/app/page.tsx`

### Typecheck
- `npx tsc --noEmit`

### Tests
- No test runner is configured in `package.json` (no `test` script).

## Environment variables (Shopify)

This project reads Shopify credentials from environment variables (see `.env.local.example`).

Required for any Shopify calls:
- `SHOPIFY_STORE_DOMAIN`

Used by Storefront API (used by `src/lib/shopify.ts` and the `/test-shopify` route):
- `SHOPIFY_STORE_FRONT_ACCESS_TOKEN`

Used by Admin API (used by `src/lib/shopifyAdmin.ts` and the home dashboard):
- `SHOPIFY_ADMIN_ACCESS_TOKEN`

Notes:
- The Admin token needs scopes for orders/products/analytics (documented in `.env.local.example`).
- When credentials are missing, fetchers return `null` and UI falls back to mock/default values.

## High-level architecture

### Next.js App Router structure
- App Router lives under `src/app/`.
- `src/app/layout.tsx` defines the root HTML/body and loads fonts + `src/app/globals.css`.
- `src/app/page.tsx` is the main dashboard page. It is an async Server Component that fetches Shopify Admin stats and passes them into presentational components.
- `src/app/test-shopify/page.tsx` is a simple debugging page for verifying Storefront API connectivity.

### Data flow (Shopify)
- `src/lib/shopifyAdmin.ts`
  - Fetches all qualifying 2025 orders via Shopify Admin GraphQL with pagination.
  - Aggregates per-product quantities, sorts, and returns `topProducts`, `totalUnitsSold`, `totalOrders`.
  - Fetches visits via `shopifyqlQuery` (sessions) and returns `totalVisits`.
- `src/lib/shopify.ts`
  - Fetches products / best-sellers via Shopify Storefront GraphQL.
  - Used primarily by the `/test-shopify` route.
- `src/lib/mockData.ts`
  - Static fallback values and chart series used by the UI (`MOCK_DATA.salesTrends`, etc.).

### UI composition
- `src/components/` contains the “bento grid” dashboard cards.
  - `BentoGrid` / `BentoCard` provide the shared layout and “glass” styling.
  - Some components are Client Components (e.g. `TopProductsList.tsx` uses `framer-motion`), so avoid importing Server-only code into them.
- `src/lib/utils.ts` exports `cn(...)` (clsx + tailwind-merge) used throughout for class composition.

### Styling
- Global styling is in `src/app/globals.css`.
  - Tailwind v4 is enabled via `@import "tailwindcss"` and PostCSS (`postcss.config.mjs`).
  - Custom theme tokens are defined with `@theme`, and “glassmorphism” utilities are defined in `@layer utilities`.

## Configuration notes
- ESLint uses flat config in `eslint.config.mjs` and extends Next.js “core-web-vitals” + TypeScript presets.
- TypeScript is strict (`tsconfig.json`) and uses path alias `@/*` => `src/*`.
- `next.config.ts` is currently minimal (defaults).