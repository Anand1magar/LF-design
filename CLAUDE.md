# LF Studio — Project Index

AI-augmented design agency portfolio. Next.js 16 App Router · React 18 · Tailwind CSS v4 · Motion (Framer v12) · TypeScript.

> **For LLMs**: Read this file first. Jump directly to the section you need — no need to scan `src/` broadly.

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Homepage — composes all homepage sections in order |
| `/about` | [src/app/about/page.tsx](src/app/about/page.tsx) | About page |
| `/project/[slug]` | [src/app/project/[slug]/page.tsx](src/app/project/[slug]/page.tsx) | Portfolio case study detail |
| `/project/[slug]` (404) | [src/app/project/[slug]/not-found.tsx](src/app/project/[slug]/not-found.tsx) | Not-found fallback for missing projects |

---

## Layout (always rendered)

| Component | File | Description |
|---|---|---|
| Root layout | [src/app/layout.tsx](src/app/layout.tsx) | Fonts (Figtree + Syne), metadata, wraps every page |
| Navbar | [src/components/layout/Navbar.tsx](src/components/layout/Navbar.tsx) | Fixed top nav — nav items from `siteConfig` |
| ContactSection | [src/components/layout/ContactSection.tsx](src/components/layout/ContactSection.tsx) | Footer contact block with social links |
| ElasticDivider | [src/components/layout/ElasticDivider.tsx](src/components/layout/ElasticDivider.tsx) | Animated divider between main and footer |
| GifPreloader | [src/components/layout/GifPreloader.tsx](src/components/layout/GifPreloader.tsx) | Full-screen GIF preloader — fades out on `hero-video-ready` event or 6s fallback |

---

## Homepage Sections (top → bottom)

| Order | Component | File | Data source |
|---|---|---|---|
| 1 | HeroSection | [src/components/sections/HeroSection.tsx](src/components/sections/HeroSection.tsx) | Inline (YouTube embed, scroll progress) |
| 2 | WhatWeDoSection | [src/components/sections/WhatWeDoSection.tsx](src/components/sections/WhatWeDoSection.tsx) | Inline (word-by-word animated text) |
| 3 | ServiceDetailCards | [src/components/sections/ServiceDetailCards.tsx](src/components/sections/ServiceDetailCards.tsx) | **[src/data/servicesData.ts](src/data/servicesData.ts)** |
| 4 | TestimonialsSection | [src/components/sections/TestimonialsSection.tsx](src/components/sections/TestimonialsSection.tsx) | **[src/data/testimonialsData.ts](src/data/testimonialsData.ts)** |
| 5 | ProcessSection | [src/components/sections/ProcessSection.tsx](src/components/sections/ProcessSection.tsx) | **[src/data/processData.ts](src/data/processData.ts)** (icon SVGs stay in component) |
| 6 | ImpactSection | [src/components/sections/ImpactSection.tsx](src/components/sections/ImpactSection.tsx) | Inline (stat values 60%, 3×) |
| 7 | AiEfficiencySection | [src/components/sections/AiEfficiencySection.tsx](src/components/sections/AiEfficiencySection.tsx) | **[src/data/efficiencyData.ts](src/data/efficiencyData.ts)** |
| 8 | PortfolioShowcase | [src/components/sections/PortfolioShowcase.tsx](src/components/sections/PortfolioShowcase.tsx) | **[src/data/portfolioData.ts](src/data/portfolioData.ts)** |
| 9 | PortfolioSection | [src/components/sections/PortfolioSection.tsx](src/components/sections/PortfolioSection.tsx) | Inline + portfolioData |

---

## Data Layer — Single Source of Truth

Edit content here, not inside components.

| File | Exports | Used by |
|---|---|---|
| [src/data/portfolioData.ts](src/data/portfolioData.ts) | `portfolioItems`, `PortfolioItem` | PortfolioShowcase, PortfolioSection, `/api/portfolio` |
| [src/data/servicesData.ts](src/data/servicesData.ts) | `serviceDetails`, `ServiceDetail` | ServiceDetailCards, `/api/services` |
| [src/data/testimonialsData.ts](src/data/testimonialsData.ts) | `carouselTestimonials`, `featuredTestimonials` | TestimonialsSection, `/api/testimonials` |
| [src/data/processData.ts](src/data/processData.ts) | `processStepsData`, `ProcessStep` | ProcessSection, `/api/config?section=process` |
| [src/data/efficiencyData.ts](src/data/efficiencyData.ts) | `featureTabs`, `Variant` | AiEfficiencySection, `/api/config?section=efficiency` |
| [src/data/siteConfig.ts](src/data/siteConfig.ts) | `siteConfig`, `navItems`, `NavItem` | Navbar, ContactSection, `/api/config?section=nav` |

---

## API Routes (Mock API)

All routes are GET-only, return `{ success, count?, data }`.

| Endpoint | File | Query params |
|---|---|---|
| `/api/portfolio` | [src/app/api/portfolio/route.ts](src/app/api/portfolio/route.ts) | `?slug=`, `?category=` |
| `/api/services` | [src/app/api/services/route.ts](src/app/api/services/route.ts) | `?title=` |
| `/api/testimonials` | [src/app/api/testimonials/route.ts](src/app/api/testimonials/route.ts) | `?type=carousel\|featured` |
| `/api/config` | [src/app/api/config/route.ts](src/app/api/config/route.ts) | `?section=nav\|brand\|process\|efficiency` |
| `/api/team` | [src/app/api/team/route.ts](src/app/api/team/route.ts) | — |
| `/api/snap-config` | [src/app/api/snap-config/route.ts](src/app/api/snap-config/route.ts) | POST — dev-only, patches PortfolioShowcase source |

---

## Page Components (full-page wrappers)

| Component | File | Used by |
|---|---|---|
| AboutPage | [src/components/pages/AboutPage.tsx](src/components/pages/AboutPage.tsx) | `/about` route |
| ProjectDetailPage | [src/components/pages/ProjectDetailPage.tsx](src/components/pages/ProjectDetailPage.tsx) | `/project/[slug]` route |

---

## Utilities & Hooks

| File | Export | Purpose |
|---|---|---|
| [src/lib/utils.ts](src/lib/utils.ts) | `cn()` | Merge Tailwind classes (clsx + tailwind-merge) |
| [src/lib/img.ts](src/lib/img.ts) | `imgSrc()` | Normalise Figma/Next.js image imports to plain URL strings |
| [src/hooks/useInView.ts](src/hooks/useInView.ts) | `useInView()` | IntersectionObserver hook for scroll-triggered animations |

---

## Styling

| File | Purpose |
|---|---|
| [src/app/globals.css](src/app/globals.css) | Tailwind v4 base, `@theme inline` brand tokens, font CSS vars |
| [tailwind.config.ts](tailwind.config.ts) or `@theme` block | Brand tokens: `--lf-cream #fffcf8`, `--lf-green #79b231`, `--lf-ink #030213` |

**Fonts:** `font-sans` = Figtree · `font-display` = Syne (loaded via `next/font/google` in layout).

> Note: `@theme`, `@source`, `@custom-variant`, `@apply` in CSS files are valid **Tailwind v4** syntax. VS Code CSS linter may flag them as errors — these are false positives.

---

## Key Patterns

- **Figma assets**: Import with `import img from "figma:asset/..."`, then `imgSrc(img)` for the URL.
- **Sticky card stack**: ServiceDetailCards — all cards are sibling direct children of one `<section>` (required for CSS sticky to work across the full scroll range).
- **Tab auto-cycling**: AiEfficiencySection and TestimonialsSection both use a `setTimeout` in a `useEffect` to advance tabs; click resets the timer.
- **File naming**: All public folders and image files use kebab-case. No spaces allowed anywhere in filenames or folder names.
- **`src/imports/` is semi-live**: The large `.tsx` layout files (LandingPage, Frame40108, etc.) are dead legacy code — do not use. The `svg-*.ts` files ARE imported by active components (Navbar, ProcessSection, ImpactSection, etc.) — do not delete the folder.
- **Portfolio slug routing**: `portfolioItems[].slug` must match the URL segment in `/project/[slug]`.
- **`src/imports/`**: Auto-generated from Figma (SVG path data, asset references). Do not edit manually.

---

## Assets

| Location | Contents |
|---|---|
| [public/images/service-images/](public/images/service-images/) | 5 service card images (kebab-case) |
| [public/images/efficiency/](public/images/efficiency/) | 3 efficiency section product images |
| [public/images/faster-section/](public/images/faster-section/) | 6 faster section card images |
| [public/portfolio/portfolio_section/](public/portfolio/portfolio_section/) | Portfolio card thumbnails (.webp) |
| [public/portfolio/antaranga-details/](public/portfolio/antaranga-details/) | Antaranga.ai case study gallery |
| [public/portfolio/frogtoberfest-details/](public/portfolio/frogtoberfest-details/) | Frogtoberfest case study gallery |
| [public/portfolio/minimeals-details/](public/portfolio/minimeals-details/) | Minimeals case study gallery |
| [public/portfolio/second-look-details/](public/portfolio/second-look-details/) | SecondLook Health case study gallery |
| [src/assets/efficiency/](src/assets/efficiency/) | 4 efficiency section feature images (imported, kebab-case) |
| [src/assets/hero-video/](src/assets/hero-video/) | LF showreel .webm (not currently used in HeroSection) |
| [src/assets/](src/assets/) | Hash-named Figma-exported PNGs — **DO NOT rename** |
