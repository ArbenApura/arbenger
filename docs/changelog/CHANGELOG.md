# Changelog

All notable decisions, changes, and milestones for arbenger.com are documented here.

---

## 2026-05-09 — Content Rewrite & Performance Cleanup

### Content Rewrite

Rewrote all page copy to be neutral, general-audience, and claim-free. The site previously targeted developers specifically and included founder-personal content. All copy is now welcoming to any type of user.

#### Homepage

- **Hero heading:** "Building the tools" → "Tools that do the job"
- **Typewriter phrases:** Replaced developer-targeted phrases ("developers need", "for the modern stack") with neutral ones ("and do it well", "without the bloat", "worth your time")
- **Subtitle:** "Developer tools, AI products, and SaaS platforms built for speed, quality, and real-world use." → "Extensions, plugins, AI tools, and web apps. Take a look around."
- **CTA button:** "Explore Products" → "See What's Available"
- **Product categories heading:** "What we're building" → "What's here"
- **About teaser heading:** "Built by developers, for developers." → "Less noise, more function."
- **About teaser body:** Removed developer-targeting language
- **Roadmap section:** Removed entirely (contained specific unreleased product names)
- **Bottom CTA:** "Have a project in mind? We'd love to hear about it." → "Got a question? We're around."
- **Meta title:** "AI Tools & Developer Products | Arbenger" → "Arbenger — Extensions, Plugins, AI Tools & Web Apps"
- **JSON-LD description:** Updated to match

#### About Page

- **Founder section removed:** "Arben Apura / Founder & Developer" heading, personal backstory paragraphs, and terminal card (whoami, cat role.txt) all removed
- **Replaced with company section:** "What we do" heading with neutral description + category info card listing all 5 product types with icons
- **"How We Work" → "What to expect":** Reduced from 4 cards to 3, removed opinionated cards ("We use what we build", "Build in public", "Ship small, ship often", "Every line has intent") and replaced with neutral ones ("Does what it says", "Kept up to date", "Feedback welcome")
- **Subtitle:** "Quality software, shipped fast." → "We make software tools. Here's what that looks like."
- **CTA:** "Have a question or want to collaborate?" → "Got a question?"

#### Products Page

- **Subtitle:** "More products coming soon." → "Everything in one place. More on the way."
- **Category descriptions:** Replaced opinionated descriptions with plain language (e.g., "Full apps for specific problems. No feature bloat." → "Web apps you can use from anywhere.")

#### Contact Page

- **Heading:** "Get in Touch" → "Say Hello"
- **Subtitle:** "Bug report, feature idea, or collaboration pitch" → "Question, idea, or just want to talk — we're here."
- **Email response time:** "We'll get back to you within a day or two." → "We'll get back to you as soon as we can."

#### Footer

- **Tagline:** "Developer tools, AI products, and SaaS platforms." → "Extensions, plugins, AI tools, and web apps."

### Visual Changes

- **About teaser floating icons:** Replaced tech-specific logos (SvelteKit flame, TypeScript badge, AI brain circuit) with abstract geometric shapes (faceted gem, stacked rings, constellation triangle) — theme-aware, neutral
- **Typewriter component:** Removed `whitespace-nowrap` from visible text to fix layout shift when cycling between short and long phrases

### Performance

- **Removed unused dependencies:** `tsparticles-slim` and `@tsparticles/svelte` (~2MB on disk) were listed in package.json but never imported — the particle background uses a custom canvas implementation
- **Scrollbar theming:** Added theme-aware scrollbar styles (both `scrollbar-color` for Firefox and `::-webkit-scrollbar` for Chrome/Edge/Safari) in `app.css`
- **Font preloading:** Already in place (verified)
- **Build output:** ~95 KB gzipped total JS across all routes, 8.3 KB CSS

### Files Changed

- `src/lib/components/home/Hero.svelte` — heading, typewriter phrases, subtitle, CTA
- `src/lib/components/home/ProductCategories.svelte` — section heading
- `src/lib/components/home/AboutTeaser.svelte` — heading, body, floating icons
- `src/lib/components/ui/Typewriter.svelte` — layout shift fix
- `src/lib/components/layout/Footer.svelte` — tagline
- `src/lib/data/products.ts` — category descriptions
- `src/routes/+page.svelte` — meta, JSON-LD, remove Roadmap, CTA
- `src/routes/about/+page.svelte` — full rewrite (founder → company, 4 cards → 3)
- `src/routes/products/+page.svelte` — subtitle, meta
- `src/routes/contact/+page.svelte` — heading, subtitle, response text, meta
- `src/app.css` — scrollbar theming
- `package.json` — removed tsparticles dependencies

### Documents Created

- `docs/superpowers/specs/2026-05-09-content-rewrite-design.md` — Content rewrite design spec
- `docs/superpowers/plans/2026-05-09-content-rewrite.md` — Implementation plan

---

## 2026-05-08 — Initial Design Spec

### Decisions Made

- **Framework:** SvelteKit 2 + Svelte 4 (mandatory Svelte 4 syntax, no runes)
- **Styling:** TailwindCSS v4, Tailwind-only (no style blocks, no CSS variables)
- **Adapter:** `@sveltejs/adapter-cloudflare` (SSR-ready from day one)
- **Deployment:** Cloudflare Pages, connected to GitHub, auto-deploy on push to main
- **Domain:** arbenger.com purchased on Hostinger, nameservers to be transferred to Cloudflare
- **Design direction:** "Terminal meets luxury" — dark futuristic aesthetic with monospaced headings, glow effects, grid backgrounds
- **Typography:** Space Mono (headings), Satoshi (body), JetBrains Mono (accents) — all self-hosted
- **Color palette:** Derived from logo color `#161446` (navy), with cyan-400 and teal-400 accents
- **Routing:** Nested routes under arbenger.com (no subdomains), all base pages pre-rendered
- **Formatter:** Prettier with prettier-plugin-svelte + prettier-plugin-tailwindcss

### Scope

Base site with 4 pages: Homepage, About, Products (catalog), Contact. No dynamic features, no database, no user accounts. Product data defined in static TypeScript files.

### Documents Created

- `docs/specs/2026-05-08-arbenger-website-design.md` — Full design specification
- `docs/guidelines/design-system.md` — Visual identity, colors, typography, effects
- `docs/guidelines/component-conventions.md` — Component patterns, Svelte 4 rules
- `docs/guidelines/seo-standards.md` — Meta tags, JSON-LD, heading hierarchy, checklist
- `docs/guidelines/deployment.md` — Cloudflare Pages setup, DNS, SSL, build config
- `docs/architecture/routing.md` — URL structure, rendering strategy, route planning
- `docs/architecture/data-models.md` — TypeScript interfaces, product data structure
- `docs/architecture/state-management.md` — Stores, theme management, reactive patterns
