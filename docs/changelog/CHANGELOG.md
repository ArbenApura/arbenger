# Changelog

All notable decisions, changes, and milestones for arbenger.com are documented here.

---

## 2026-05-09 — GitHub Setup & Profile

### GitHub Repository

- **Repo created:** `Arbenger/arbenger.com` (private) via `gh repo create`
- **Authentication:** SSH with ed25519 key (`~/.ssh/id_ed25519`)
- **GitHub CLI:** Installed via `winget install GitHub.cli`, added to user PATH
- **Remote:** `git@github.com:Arbenger/arbenger.com.git` (SSH protocol)
- **Branch:** `main` (renamed from `master`)
- **History cleanup:** Stripped all `Co-Authored-By` trailer lines from commit history via `git filter-branch`

### GitHub Profile

- **Profile repo:** `Arbenger/Arbenger` (special README repo)
- **Profile fields:** Name: "Arben Apura", Bio: "Founder of Arbenger", Company: "@Arbenger", Website: arbenger.com
- **README:** Company-focused (not personal) with social link badges in brand colors (#0B0A23 bg, #22D3EE accent)

---

## 2026-05-09 — Cloudflare Pages Deployment & Domain Setup

### Deployment

- **Site deployed** to Cloudflare Pages at `arbenger.com`
- **Cloudflare Pages project** created as `arbenger` with production URL `arbenger.pages.dev`
- **Domain connected:** Nameservers changed from Hostinger (`artemis.dns-parking.com`, `hermes.dns-parking.com`) to Cloudflare (`celeste.ns.cloudflare.com`, `jack.ns.cloudflare.com`)
- **Custom domain** `arbenger.com` attached to Pages project with proxied CNAME
- **Deploy script added:** `yarn deploy` — builds and deploys to production in one command
- **`wrangler.toml` created** with `nodejs_compat` compatibility flag (required for SvelteKit's `node:async_hooks` usage) and `pages_build_output_dir`
- **`--branch main` flag** added to deploy command — without it, deployments went to preview instead of production because the local branch name didn't match Cloudflare's production branch setting

### Files Changed

- `package.json` — added `deploy` script, added `@types/node` dev dependency
- `wrangler.toml` — created with `nodejs_compat` flag, updated from `[pages]` section to `pages_build_output_dir` top-level key

---

## 2026-05-09 — Content Rewrite, Language Selector & Performance Cleanup

### Language Selector

Added a language/locale selector with country flag icons to the navbar and footer.

- **Placement:** Navbar (desktop + mobile controls, next to theme toggle) and footer (copyright bar, right-aligned)
- **Active locale:** English (US) with US flag — sets `<html lang="en-US">`
- **Coming soon locales:** Spanish, French, Japanese — shown in dropdown with "Soon" badge, disabled
- **Dropdown behavior:** Opens on click, closes on click-outside or Escape key
- **Persistence:** Locale preference saved to `localStorage` key `arbenger-locale`
- **Flags:** Inline SVG country flags (US, Spain, France, Japan) — no external library
- **Store:** `src/lib/stores/locale.ts` — mirrors `theme.ts` pattern (custom writable, SSR-safe, sets `<html lang="">` attribute)

#### Files Created
- `src/lib/components/layout/LanguageSelector.svelte` — dropdown component with flags, click-outside, keyboard support
- `src/lib/stores/locale.ts` — locale store persisted to localStorage
- `src/lib/data/locales.ts` — locale definitions (code, label, flag key, enabled status)

#### Files Modified
- `src/lib/types/index.ts` — added `Locale` interface
- `src/lib/components/layout/Navbar.svelte` — added `<LanguageSelector />` in desktop and mobile controls
- `src/lib/components/layout/Footer.svelte` — added `<LanguageSelector />` in copyright bar (flex layout)
- `src/app.html` — changed `lang="en"` to `lang="en-US"`

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

### Performance & Tooling

- **Removed unused dependencies:** `tsparticles-slim` and `@tsparticles/svelte` (~2MB on disk) were listed in package.json but never imported — the particle background uses a custom canvas implementation
- **Scrollbar theming:** Added theme-aware scrollbar styles (both `scrollbar-color` for Firefox and `::-webkit-scrollbar` for Chrome/Edge/Safari) in `app.css`
- **Font preloading:** Already in place (verified)
- **Build output:** ~95 KB gzipped total JS across all routes, 8.3 KB CSS
- **Package manager:** Migrated from npm to Yarn Classic (1.x). `package-lock.json` removed, `yarn.lock` added. All docs and commands updated to use `yarn`.
- **Added `@types/node`:** Installed as dev dependency to fix "Cannot find type definition file for 'node'" TypeScript error
- **Added `wrangler`:** Installed as dev dependency (required peer dependency of `@sveltejs/adapter-cloudflare`)

### Files Changed

- `src/lib/components/home/Hero.svelte` — heading, typewriter phrases, subtitle, CTA
- `src/lib/components/home/ProductCategories.svelte` — section heading
- `src/lib/components/home/AboutTeaser.svelte` — heading, body, floating icons
- `src/lib/components/ui/Typewriter.svelte` — layout shift fix
- `src/lib/components/layout/Footer.svelte` — tagline, language selector in copyright bar
- `src/lib/components/layout/Navbar.svelte` — language selector in desktop and mobile controls
- `src/lib/components/layout/LanguageSelector.svelte` — new component
- `src/lib/stores/locale.ts` — new store
- `src/lib/data/locales.ts` — new data file
- `src/lib/data/products.ts` — category descriptions
- `src/lib/types/index.ts` — added Locale interface
- `src/routes/+page.svelte` — meta, JSON-LD, remove Roadmap, CTA
- `src/routes/about/+page.svelte` — full rewrite (founder → company, 4 cards → 3)
- `src/routes/products/+page.svelte` — subtitle, meta
- `src/routes/contact/+page.svelte` — heading, subtitle, response text, meta
- `src/app.css` — scrollbar theming
- `src/app.html` — lang attribute changed to `en-US`
- `package.json` — removed tsparticles, added wrangler + @types/node, using yarn

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
