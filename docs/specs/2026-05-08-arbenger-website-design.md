# Arbenger Website Design Spec

**Date:** 2026-05-08
**Status:** Approved
**Author:** Arben Apura

---

## 1. Overview

Arbenger.com is the company hub for Arbenger, a tech company building and shipping products across multiple platforms: VS Code extensions, Chrome plugins, AI tools, miscellaneous online tools, and heavy SaaS products. The website serves as both a showcase/portfolio and a commercial landing page, driving visitors to explore products and convert (signups, downloads, waitlists).

### Goals

- Ship a polished base site quickly so arbenger.com is live
- Establish a strong, distinctive brand identity (dark futuristic "terminal meets luxury" aesthetic)
- Build a scalable foundation that grows as products launch
- Achieve excellent SEO and Core Web Vitals scores from day one
- Maintain extremely detailed documentation for all design decisions and conventions

### Non-Goals (for launch scope)

- User accounts or authentication
- Backend API or database
- Contact forms with server-side processing
- Individual product pages (placeholder structure only)
- Blog content
- Payment or billing

---

## 2. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | SvelteKit 2 + Svelte 4 | Fast, lightweight, SSR-ready. Svelte 4 syntax (export let, $: reactivity, stores). No runes. |
| Language | TypeScript (strict) | Type safety across components and data |
| Styling | TailwindCSS v4 | Utility-first, purged in production, follows svelte-guidelines (no style blocks, cn() for dynamic classes) |
| Build | Vite | SvelteKit default, fast HMR and optimized production builds |
| Adapter | @sveltejs/adapter-cloudflare | Pre-renders base pages, SSR-ready per-route for future dynamic features |
| Deployment | Cloudflare Pages | Edge-deployed, auto-build from git, free SSL, preview deploys on PRs |
| Formatting | Prettier | prettier-plugin-svelte + prettier-plugin-tailwindcss for class sorting |
| Notifications | svelte-sonner | Toast notifications per svelte-guidelines |
| Class merging | clsx + tailwind-merge | Wrapped in cn() utility per svelte-guidelines |
| Icons | lucide-svelte | Consistent line-art icon set |
| DNS/Domain | Hostinger (purchased) → Cloudflare DNS | arbenger.com domain, nameservers transferred to Cloudflare |

### Svelte 4 Syntax (mandatory)

- `export let` for component props (no `$props()`)
- `$:` for reactive declarations and statements (no `$derived`/`$effect`)
- `writable`/`readable`/`derived` stores (no `$state` rune)
- Slots for component composition
- `onMount`/`onDestroy` lifecycle functions
- Snippets only for complex highly-reused markup (3+ uses, non-trivial) per svelte-guidelines

---

## 3. Site Structure

### Base Pages (launch scope)

| Route | Purpose | Prerendered |
|-------|---------|-------------|
| `/` | Homepage: hero, product categories, about teaser, CTA | Yes |
| `/about` | Founder story, company mission, credentials (E-E-A-T) | Yes |
| `/products` | Product catalog grid with category filters | Yes |
| `/contact` | Email, social links, location info | Yes |

### Future Routes (structure prepared, not implemented)

| Route | Purpose |
|-------|---------|
| `/products/[slug]` | Individual product landing pages |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog posts |
| `/tools/[slug]` | Lightweight online tools (image converter, etc.) |

### Product Categories

1. **VS Code Extensions** — Published to Microsoft marketplace
2. **Chrome Plugins** — Published to Chrome Web Store
3. **AI Tools** — Online AI-powered utilities
4. **Misc Tools** — Image converters, formatters, utilities
5. **SaaS Products** — Full applications (e.g., AI Wiki Reader)

---

## 4. Design System

### Aesthetic Direction: "Terminal Meets Luxury"

The site feels like a high-end developer terminal. Not a literal CLI, but borrowing that visual language: monospaced headings, cursor-blink animations, code-block styled cards, section labels styled like terminal prompts, and subtle noise/scanline textures. The result is a dark futuristic interface that is unmistakably tech-oriented but refined enough to feel premium.

### Color Palette

#### Dark Mode (default)

| Token | Hex | Usage |
|-------|-----|-------|
| navy-950 | `#0B0A23` | Page backgrounds, deepest layer |
| navy-900 | `#161446` | Logo color, primary brand, headings on light mode |
| navy-800 | `#1E1A5E` | Card backgrounds, elevated surfaces |
| navy-700 | `#2A2578` | Borders, subtle dividers |
| cyan-400 | `#22D3EE` | Primary accent, links, CTAs, glow effects |
| cyan-300 | `#67E8F9` | Hover states, highlights |
| teal-400 | `#2DD4BF` | Secondary accent, success states, tags |
| slate-300 | `#CBD5E1` | Body text on dark backgrounds |
| slate-400 | `#94A3B8` | Muted/secondary text |
| white | `#FFFFFF` | High-emphasis headings, text on dark |

#### Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| background | `#F8FAFC` | Page background |
| surface | `#FFFFFF` | Cards, elevated surfaces |
| text-primary | `#161446` | Headings (brand navy) |
| text-body | `#334155` | Body text |
| text-muted | `#64748B` | Secondary text, descriptions |
| border | `#E2E8F0` | Card borders, dividers |
| accents | Same cyan/teal | Consistent across themes |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display/Headings | Space Mono | 700 | Page titles, hero text, section headers. Monospaced, angular, technical. |
| Body | Satoshi (Fontshare) | 400, 500, 700 | Paragraphs, descriptions, UI text. Geometric sans with personality. |
| Mono/Accents | JetBrains Mono | 400, 500 | Code snippets, terminal-style labels, stats, badges. |

All fonts self-hosted (no Google Fonts round-trip). Preloaded with `<link rel="preload">`. `font-display: swap` with fallback size-adjust to prevent CLS.

### Spacing & Layout

| Property | Value | Notes |
|----------|-------|-------|
| Max content width | `max-w-7xl` (1280px) | Centered with `mx-auto` |
| Section padding | `py-20 lg:py-32` | Generous vertical breathing room |
| Card border radius | `rounded-xl` | Consistent across all card-like elements |
| Gap scale | `gap-4`, `gap-6`, `gap-8` | Used consistently in grids and flex layouts |
| Page horizontal padding | `px-4 sm:px-6 lg:px-8` | Responsive edge padding |

### Visual Effects

| Effect | Spec | Usage |
|--------|------|-------|
| Card glow on hover | `shadow-[0_0_20px_rgba(34,211,238,0.15)]` | Interactive cards, buttons |
| Gradient border | navy-700 → cyan-400 at low opacity | Card borders, section dividers |
| Grid background | Dot/line grid pattern, cyan glow at intersections | Hero section background |
| Noise texture | SVG noise overlay at 2-3% opacity | Hero section, subtle depth |
| Cursor blink | CSS `@keyframes` blink animation | Hero heading accent |
| Scroll reveals | CSS fade-up with `animation-delay` stagger | Section content on first view |
| Hover lift | `translate-y` + glow intensify | Cards, interactive elements |
| Stroke-draw icons | CSS `stroke-dashoffset` animation | Category icons on first view |

### Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Color/opacity | `duration-200` | `ease-in-out` |
| Transform/shadow | `duration-300` | `ease-out` |
| Page transitions | `duration-200` | `ease-in-out` |

### Component Styles

**Buttons:**
- Primary: cyan-400 background, navy-950 text, glow on hover
- Secondary: transparent background, cyan-400 border, cyan-400 text
- Ghost: transparent, slate-300 text, subtle background on hover

**Cards:**
- Background: navy-800
- Border: 1px navy-700, gradient to cyan-400 on hover
- Hover: translate-y-[-2px] + glow shadow
- Border radius: rounded-xl

**Badges/Tags:**
- Small rounded pills (rounded-full)
- Teal/cyan tinted backgrounds at low opacity
- Used for product categories

**Links:**
- Color: cyan-400
- Underline on hover
- Transition on color

**Section labels (terminal prompt style):**
- Prefix: `>` character in cyan-400
- Text: JetBrains Mono, uppercase, letter-spacing wide
- Example: `> PRODUCTS`

---

## 5. Page Designs

### Homepage (`/`)

**Section 1 — Hero:**
- Full viewport height, centered content
- Animated grid background (CSS-only where possible, IntersectionObserver for scroll triggers)
- Headline in Space Mono: company tagline (bold, large `text-4xl md:text-6xl`)
- Subtitle in Satoshi: one-sentence description of what Arbenger builds
- Cursor-blink animation on a terminal-style accent element
- Primary CTA button: "Explore Products" → /products
- Secondary CTA: "About Us" → /about
- Subtle noise texture overlay

**Section 2 — Product Categories:**
- Terminal-style section label: `> PRODUCTS`
- Grid of 5 category cards (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
- Each card: line-art icon (stroke-draw animated on view), category name in Space Mono, short description in Satoshi, "Coming soon" badge in teal
- Cards have gradient border hover effect + glow
- Links to /products with category filter (future)

**Section 3 — About Teaser:**
- Terminal-style section label: `> ABOUT`
- Brief founder intro (2-3 sentences)
- "Learn more" link to /about
- Asymmetric layout: text on one side, decorative element on other

**Section 4 — CTA / Stay Updated:**
- Terminal-style section label: `> CONNECT`
- Simple message: "Stay updated on new launches"
- Social links and/or email link
- No form (future addition)

### About Page (`/about`)

- Hero with page title in Space Mono
- Founder section: name, role, brief bio, credentials (E-E-A-T signals for SEO)
- Company mission/values section
- Tech stack or approach section (what technologies Arbenger works with)
- Social links

### Products Page (`/products`)

- Hero with page title
- Category filter tabs (all, VS Code, Chrome, AI Tools, Misc, SaaS)
- Product grid: same card style as homepage but larger, with more detail space
- All items show "Coming soon" state initially
- Each card structured to accommodate: name, description, category badge, platform icon, status, link

### Contact Page (`/contact`)

- Hero with page title
- Email address (mailto link)
- Social links (GitHub, Twitter/X, LinkedIn, etc.)
- Location (optional, general region)
- Simple, clean layout — no form for now

---

## 6. Shared Layout

### Navbar

- Fixed/sticky at top
- Left: Logo (SVG) + "ARBENGER" wordmark in Space Mono
- Center/Right: Nav links (Home, Products, About, Contact) in Satoshi
- Right: Theme toggle button (sun/moon icon)
- Background: transparent on hero, navy-950 with blur backdrop on scroll
- Mobile: hamburger menu with slide-in drawer

### Footer

- Background: navy-950 (slightly lighter border-top)
- Left column: Logo + short tagline
- Center column: Nav links repeated
- Right column: Social links (icon buttons)
- Bottom row: Copyright "2026 Arbenger. All rights reserved."

---

## 7. Project Structure

```
src/
  lib/
    components/
      layout/
        Navbar.svelte
        Footer.svelte
        ThemeToggle.svelte
        MobileMenu.svelte
      ui/
        Button.svelte
        Card.svelte
        Badge.svelte
        GlowBorder.svelte
        SectionLabel.svelte
      home/
        Hero.svelte
        ProductCategories.svelte
        AboutTeaser.svelte
        GridBackground.svelte
      seo/
        MetaTags.svelte
        JsonLd.svelte
    stores/
      theme.ts
    utils/
      cn.ts
    data/
      products.ts
    types/
      index.ts
  routes/
    +layout.svelte
    +layout.ts
    +page.svelte
    about/
      +page.svelte
    products/
      +page.svelte
      [slug]/
        +page.svelte
    contact/
      +page.svelte
  app.html
  app.css
  app.d.ts
static/
  arbenger.svg
  arbenger.png
  favicon.ico
  robots.txt
  og-image.png
docs/
  specs/
  guidelines/
    design-system.md
    component-conventions.md
    seo-standards.md
    deployment.md
  architecture/
    routing.md
    data-models.md
    state-management.md
  changelog/
    CHANGELOG.md
```

---

## 8. SEO Implementation

### Per-Page Meta

Every page uses the `MetaTags.svelte` component with:
- `<title>` — Unique, primary keyword near beginning, 50-60 chars, brand at end
- `<meta name="description">` — Unique, 150-160 chars, includes keyword, has CTA
- `<link rel="canonical">` — Self-referencing canonical URL
- OpenGraph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

### Structured Data (JSON-LD)

**Homepage:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Arbenger",
  "url": "https://arbenger.com",
  "logo": "https://arbenger.com/arbenger.svg",
  "sameAs": ["https://github.com/arbenger", "https://twitter.com/arbenger", "https://linkedin.com/company/arbenger"]
}
```

**Sitewide:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Arbenger",
  "url": "https://arbenger.com"
}
```

**Product pages (future):**
- `SoftwareApplication` schema per product

### Technical SEO

- `/sitemap.xml` — Server-rendered route listing all pages with `lastmod` dates
- `/robots.txt` — Static file, allows all crawlers, references sitemap
- Heading hierarchy: One `<h1>` per page, logical `<h2>` → `<h3>` nesting
- URL structure: Lowercase, hyphen-separated, descriptive (`/products/ai-wiki-reader`)
- Internal linking: All pages reachable within 2 clicks from homepage

---

## 9. Performance

### Targets

| Metric | Target | Technique |
|--------|--------|-----------|
| LCP | < 2.0s | Pre-rendered HTML at Cloudflare edge, self-hosted fonts with preload |
| INP | < 100ms | Minimal client JS, CSS-only animations, no heavy libraries |
| CLS | < 0.05 | Font swap with size-adjust, explicit image dimensions, reserved layout space |

### Techniques

- **Fonts:** Self-hosted in `static/fonts/`, preloaded via `<link rel="preload">`, `font-display: swap` with fallback metrics
- **Images:** WebP format, lazy-loaded below fold (`loading="lazy"`), explicit `width`/`height` attributes, `use:imgLoad` per svelte-guidelines
- **CSS:** TailwindCSS purge removes unused classes in production
- **JS:** Minimal client-side JavaScript. Hero animations in pure CSS. Scroll-triggered reveals via lightweight `IntersectionObserver` (no animation library)
- **Pre-rendering:** All base pages rendered at build time (`export const prerender = true`)
- **Edge delivery:** Cloudflare Pages serves from 300+ edge locations globally

### Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- `aria-label` on icon-only buttons (theme toggle, social links, hamburger menu)
- Keyboard navigation: visible focus rings via `ring-*` Tailwind classes
- Color contrast: WCAG AA compliance on both dark and light themes
- Skip-to-content link for screen readers

---

## 10. Deployment & DNS

### Cloudflare Pages

- Repository connected: GitHub → Cloudflare Pages
- Build command: `yarn build`
- Build output: `.svelte-kit/cloudflare`
- Node.js version: 20 LTS (set via `.node-version`)
- Auto-deploy: push to `main` triggers production build
- Preview deploys: pull requests get preview URLs

### DNS Configuration

- Transfer nameservers from Hostinger to Cloudflare (recommended for full CDN/proxy benefits)
- Custom domain: `arbenger.com`
- Redirect: `www.arbenger.com` → `arbenger.com` (non-www canonical)
- SSL: Full (strict), auto-provisioned by Cloudflare
- HSTS: Enabled

### Environment

- No environment variables needed for base site
- Future additions (API keys, contact email) configured via Cloudflare Pages dashboard
