# Changelog

All notable decisions, changes, and milestones for arbenger.com are documented here.

---

## 2026-05-10 — Blog System & Image Resizer Guide

### Blog System (NEW)

- **Scalable blog architecture** with dynamic `[slug]` route, `entries()` for prerendering, and `import.meta.glob` for eager content loading
- **Blog listing page** at `/blog/` with category filter pills, 3-column post grid, pagination component
- **Dynamic post route** at `/blog/[slug]/` with post shell (SEO header, reading progress bar, content loader, back link)
- **First blog post:** "How to Use Arbenger Image Resizer — The Complete Guide" — 8-section tutorial with SVG illustrations, CSS mockups, format comparison table, fit mode diagrams, batch workflow, presets reference, and pro tips

### Blog Data & Types

- **`src/lib/types/index.ts`:** Added `BlogPost`, `BlogCategory` (`'tutorial' | 'devlog' | 'release' | 'opinion'`), `BlogCategoryInfo` interfaces
- **`src/lib/data/blog.ts`:** Blog registry with `blogPosts` array, `blogCategories`, `sortedPosts`, `getPostBySlug()`, `getCategoryLabel()`, `formatPostDate()`, `POSTS_PER_PAGE = 9`

### Blog Components

- **`src/lib/components/blog/BlogCard.svelte`** — Post card for listing page with category badge, title, description, tags, date, read time, hover animation
- **`src/lib/components/blog/BlogPagination.svelte`** — Prev/next + numbered page controls with `cn()` dynamic styling
- **`src/lib/components/blog/ReadingProgress.svelte`** — Fixed 2px progress bar at top of viewport, tracks scroll position

### SEO Changes

- **Blog listing title:** "Blog — Tutorials, Guides & Dev Logs | Arbenger"
- **Blog listing meta description:** "Tutorials, deep dives, and behind-the-scenes on the tools we build. Learn how to use Arbenger products and follow our engineering journey."
- **Blog post title pattern:** "{post.title} | Arbenger Blog"
- **Blog post og:type:** `article`
- **Blog post JSON-LD:** `Article` schema with headline, description, datePublished, dateModified, author (Organization), publisher, timeRequired
- **Blog post breadcrumbs:** 3-level BreadcrumbList (Home > Blog > Post Title)
- **Breadcrumbs component extended:** Now accepts `items` array prop for N-level breadcrumbs (backward-compatible with `pageName`/`pageUrl`)
- **Sitemap:** Blog URLs auto-generated from `sortedPosts` import — `/blog/` (priority 0.8, weekly) and all post URLs (priority 0.7, monthly)

### Navigation Changes

- **"Blog" link added** to `navLinks` in `src/lib/data/navigation.ts` — appears in Navbar and Footer between Products and About
- **Image resizer top bar:** Added "Guide" link (BookOpen icon) pointing to `/blog/how-to-use-image-resizer/`
- **UploadZone:** Added "New here? Read the guide" link below format info

### Files Created

- `src/lib/data/blog.ts` — Blog data registry
- `src/lib/components/blog/BlogCard.svelte` — Post card component
- `src/lib/components/blog/BlogPagination.svelte` — Pagination controls
- `src/lib/components/blog/ReadingProgress.svelte` — Reading progress bar
- `src/routes/blog/+page.svelte` — Blog listing page
- `src/routes/blog/[slug]/+page.ts` — Dynamic route with `entries()` and `load()`
- `src/routes/blog/[slug]/+page.svelte` — Post shell (SEO, header, content loader)
- `src/routes/blog/[slug]/_posts/how-to-use-image-resizer.svelte` — First blog post content

### Files Modified

- `src/lib/types/index.ts` — Added blog types
- `src/lib/data/navigation.ts` — Added Blog link
- `src/lib/components/seo/Breadcrumbs.svelte` — Extended with `items` prop for N-level support
- `src/routes/sitemap.xml/+server.ts` — Auto-generates blog post URLs from registry
- `src/routes/products/(utilities)/image-resizer/+page.svelte` — Added Guide link in top bar
- `src/routes/products/(utilities)/image-resizer/_components/UploadZone.svelte` — Added guide link

### How to Add a New Blog Post

1. Add metadata object to `blogPosts` array in `src/lib/data/blog.ts`
2. Create content `.svelte` file in `src/routes/blog/[slug]/_posts/{slug}.svelte`
3. Sitemap, listing, and routing update automatically

---

## 2026-05-10 — Image Resizer Tool, New UI Components & Products Page Redesign

### Image Resizer Tool (NEW)

- **Full client-side image resizer** at `/products/image-resizer`
- **Route structure:** SvelteKit group route at `src/routes/products/(utilities)/image-resizer/`
- **Components (route-local):** `_components/UploadZone.svelte`, `PreviewCanvas.svelte`, `ThumbnailStrip.svelte`, `ResizeControls.svelte`, `InfoPanel.svelte`, `BatchImageList.svelte`, `CropDialog.svelte`
- **Store:** `_lib/store.ts` — manages image entries, resize settings, batch settings, crop data, processing state, worker lifecycle
- **Worker:** `_lib/worker.ts` — OffscreenCanvas-based Web Worker for non-blocking resize operations with crop, fit mode (stretch/contain/cover), and format conversion
- **Features:** Single and batch mode, drag-and-drop upload, clipboard paste, interactive crop dialog, resize with aspect lock, format conversion (PNG/JPEG/WebP), fit modes (stretch/contain/cover), background color fill, batch auto-naming with patterns (sequential/prefix/suffix/template), batch ZIP download via `jszip`, scale presets, dimension presets (social media, screens, app icons)
- **Privacy:** All processing happens client-side — no server uploads, no data leaves the browser
- **Pre-rendered:** `+page.ts` exports `prerender = true`

### New Reusable UI Components

- **`src/lib/components/ui/Select.svelte`** — Custom dropdown select with grouped options (`SelectGroup[]`), per-option icons, hint text, disabled options, fly animation, keyboard support, click-outside close. Exports `SelectOption`, `SelectGroup`, `SelectItems` types via `context="module"`.
- **`src/lib/components/ui/ColorPicker.svelte`** — HSV/RGB/HEX color picker with interactive saturation-value canvas, hue slider canvas, preset color swatches, portal-based popover positioning, hex/rgb/hsv input modes, fly animation. Uses `Pipette` icon from lucide-svelte.
- **`src/lib/components/ui/ConfirmDialog.svelte`** — Reusable confirmation modal with three variants (`danger`, `warning`, `default`), customizable title/message/labels/icon, fade+fly transitions, backdrop click to cancel, scroll lock, dispatches `confirm` and `cancel` events.

### Route & File Structure Changes

- **Category rename:** `misc-tools` display name changed from "Misc Tools" to "Utilities"
- **Route pattern:** Product routes use SvelteKit group routes — `src/routes/products/(utilities)/image-resizer/` renders at URL `/products/image-resizer` (no `/utilities/` in URL)
- **Route-local pattern adopted:** Image resizer components live in `_components/` and store/worker live in `_lib/` inside the route directory, not in shared `src/lib/` folders
- **Deleted directories:** `src/lib/components/tools/` (moved to route-local `_components/`), `src/lib/stores/image-resizer.ts` (moved to route-local `_lib/store.ts`), `src/lib/workers/` (moved to route-local `_lib/worker.ts`)

### Landing Page Changes

- **New `FeaturedTool.svelte` component** added to homepage between ProductCategories and AboutTeaser sections
- **Content:** "Now available" section intro, "Try our first tool" heading, Image Resizer card with description, feature pills (100% Local, Batch Processing, Crop & Resize, Format Conversion), UI miniature mockup, "Open Image Resizer" CTA
- **Homepage section order:** Hero → ProductCategories → FeaturedTool → AboutTeaser → Newsletter → Connect CTA

### Products Page Redesign

- **Live products spotlight:** New section at top showing cards for products with `status: 'live'` — card grid with status badge, description, tags, and "Open tool" link
- **Category grid:** 3-column grid with nested product links inside each category card
- **Filter pills:** Changed from `rounded-lg` to `rounded-full`
- **Empty categories:** Dashed borders, muted colors, "Coming soon" placeholder
- **Utilities category:** Sorted first in the categories array with `productCount: 1`
- **Removed dependencies:** `CategoryIllustration` and `EmptyStateIllustration` components no longer imported (still exist in `src/lib/components/ui/` but unused on products page)
- **Title updated:** "Products — Utilities, Extensions & AI Tools | Arbenger"
- **Description updated:** "Browse Arbenger's product catalog. Free browser-based utilities, VS Code extensions, Chrome plugins, AI tools, and web apps. Try what's live now."

### SEO Changes

- **Image resizer H1:** `<h1 class="sr-only">Free Online Image Resizer — Resize, Crop & Convert</h1>` (screen-reader only)
- **Image resizer title:** "Free Image Resizer — Resize, Crop & Convert Online | Arbenger"
- **Image resizer meta description:** "Resize, crop, and batch-convert images to PNG, JPEG, or WebP — directly in your browser. No uploads, no signups. 100% private and free."
- **WebApplication JSON-LD:** `@type: WebApplication`, `applicationCategory: UtilitiesApplication`, free offer
- **BreadcrumbList JSON-LD:** Home → Products → Image Resizer (3-level)
- **About page meta description:** "Arbenger builds extensions, plugins, AI tools, and web apps. Learn about our approach to clean, focused software."
- **Contact page meta description:** "Have a question, idea, or feedback? Get in touch with Arbenger via email or social. We'd love to hear from you."
- **Products page meta description:** Updated to reflect live products and utilities
- **Sitemap:** `/products/image-resizer` added with priority 0.7 and weekly changefreq

### UI Improvements

- **Navbar mobile menu:** Slide animation, solid background when menu is open
- **Language selector:** Fly animation on dropdown
- **Select dropdowns:** Fly animation (`svelte/transition`) with `cubicOut` easing
- **ConfirmDialog:** Fade + fly animation, scroll lock on body when open
- **Toaster:** `svelte-sonner` `<Toaster>` added to root `+layout.svelte` with `richColors`, `closeButton`, `position="bottom-right"`
- **Toast notifications:** All user feedback in image resizer centralized through `svelte-sonner` toast (success, error, warning, info, promise)

### Dependencies

- **`jszip` (^3.10.1)** — Added for batch ZIP download in image resizer
- **`svelte-sonner` (^0.3.28)** — Toast notification library, `<Toaster>` added to root layout

### Product Data Changes

- **`src/lib/data/products.ts`:** Utilities category moved to first position, `productCount` set to 1, description updated to "Image tools, code formatters, converters, and other browser-based utilities."
- **Image Resizer product entry added:** slug `image-resizer`, category `misc-tools`, status `live`, platform `web`, tags `['image', 'resize', 'converter', 'free']`

### Files Created

- `src/routes/products/(utilities)/image-resizer/+page.svelte` — Image resizer page
- `src/routes/products/(utilities)/image-resizer/+page.ts` — Prerender config
- `src/routes/products/(utilities)/image-resizer/_components/UploadZone.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/PreviewCanvas.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/ThumbnailStrip.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/ResizeControls.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/InfoPanel.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/BatchImageList.svelte`
- `src/routes/products/(utilities)/image-resizer/_components/CropDialog.svelte`
- `src/routes/products/(utilities)/image-resizer/_lib/store.ts`
- `src/routes/products/(utilities)/image-resizer/_lib/worker.ts`
- `src/lib/components/ui/Select.svelte`
- `src/lib/components/ui/ColorPicker.svelte`
- `src/lib/components/ui/ConfirmDialog.svelte`
- `src/lib/components/home/FeaturedTool.svelte`

### Files Modified

- `src/routes/+page.svelte` — Added FeaturedTool import and section
- `src/routes/+layout.svelte` — Added `svelte-sonner` Toaster component
- `src/routes/products/+page.svelte` — Full redesign with live products spotlight, category grid, filter pills, nested product links
- `src/routes/sitemap.xml/+server.ts` — Added `/products/image-resizer` entry
- `src/lib/data/products.ts` — Utilities category first, productCount updated, Image Resizer product added
- `src/lib/components/layout/Navbar.svelte` — Mobile menu slide animation, solid bg
- `src/lib/components/layout/LanguageSelector.svelte` — Fly animation on dropdown
- `package.json` — Added `jszip` and `svelte-sonner` dependencies

### Files Deleted

- `src/lib/components/tools/` — Entire directory (moved to route-local `_components/`)
- `src/lib/stores/image-resizer.ts` — Moved to route-local `_lib/store.ts`
- `src/lib/workers/` — Entire directory (moved to route-local `_lib/worker.ts`)

---

## 2026-05-09 — SEO Fixes, Mobile Responsiveness & Performance

### SEO Improvements

- **MetaTags component:** Added `twitter:site` meta tag (`@arbenger`)
- **Title tags expanded:** About → "About Arbenger — Who We Are & What We Build", Products → "Products — Extensions, Plugins & AI Tools | Arbenger", Contact → "Contact Arbenger — Questions, Ideas & Feedback"
- **Meta descriptions improved** on about, products, contact pages (expanded from 50-86 chars to 130-150 chars)
- **Error page:** Added `noindex` meta tag and dynamic `<title>` tag
- **Sitemap:** Changed from dynamic `new Date()` to static per-page `lastmod` dates
- **BreadcrumbList JSON-LD:** New `Breadcrumbs.svelte` component added to all 6 inner pages
- **Web app manifest:** Created `static/site.webmanifest`, added `apple-touch-icon` and manifest links to `app.html`

### Mobile Responsiveness

- **Global overflow fix:** Added `overflow-x: hidden` on `<html>` element
- **Section overflow:** Added `overflow-hidden` to all `<section>` elements across every page (fixes `revealSlide` animation overflow)
- **Mobile padding:** Increased from `px-4` (16px) to `px-6` (24px) site-wide
- **Card padding:** Changed from `px-8` to `px-4 sm:px-8` on category cards (ProductCategories, Products page)
- **About teaser section padding:** `py-32` → `py-16 md:py-32`
- **ProductCategories section padding:** `py-32` → `py-16 md:py-32`

### Performance

- **ParticleBackground:** Disabled canvas animation on mobile (< 768px) and when `prefers-reduced-motion` is set; reduced particle count from 60 to 30 on tablets (< 1024px); static gradient mesh + constellation fallback on mobile
- **Hero parallax:** Disabled scroll-bound `translateY` on mobile
- **Hero orbs:** Reduced from `h-72 w-72` / `h-96 w-96` to `h-48 w-48` / `h-56 w-56` on mobile
- **CSS animations:** Added global `prefers-reduced-motion` media query that kills all animations and transitions
- **Particle colors in light mode:** Bumped line opacity from 0.03 to 0.12, dot opacity from 0.3 to 0.6, changed color from near-black to brand cyan

### New Components & Stores

- **`src/lib/components/seo/Breadcrumbs.svelte`** — Reusable BreadcrumbList JSON-LD component (takes `pageName` and `pageUrl` props)
- **`src/lib/stores/viewport.ts`** — Reactive viewport stores using `matchMedia`: `isMobile` (max-width: 767px), `prefersReducedMotion` (prefers-reduced-motion: reduce)

### Visual Changes

- **Hero constellation graphic:** Redesigned as Arbenger logo-shaped constellation with dense line mesh, matching the `arbenger.svg` silhouette
- **Hero gradient contrast:** Increased light mode gradient visibility (orbs, grid dots, noise texture)
- **AboutTeaser logo:** Enlarged from h-72/w-72 (288px) to h-120/w-120 (480px), Logo size from 112px to 210px
- **Mobile menu:** Improved contrast — bolder text (`text-base font-medium`), stronger hover states, backdrop blur, shadow

### Other

- **Social links:** Removed Twitter and LinkedIn from navigation data and Organization JSON-LD; only GitHub remains
- **SEO standards doc:** Updated with Breadcrumbs component docs, twitter:site tag, static lastmod guidance

### Files Changed

- `src/app.css` — overflow-x:hidden, prefers-reduced-motion
- `src/app.html` — manifest + apple-touch-icon links
- `src/lib/components/seo/Breadcrumbs.svelte` — NEW
- `src/lib/components/seo/MetaTags.svelte` — twitter:site
- `src/lib/stores/viewport.ts` — NEW
- `src/lib/components/home/ParticleBackground.svelte` — mobile disable, viewport store, fallback
- `src/lib/components/home/Hero.svelte` — new constellation SVG, parallax/orb mobile fixes, viewport store
- `src/lib/components/home/AboutTeaser.svelte` — bigger logo, responsive padding
- `src/lib/components/home/ProductCategories.svelte` — responsive padding/gaps
- `src/lib/components/layout/Navbar.svelte` — mobile menu redesign
- `src/lib/components/layout/Footer.svelte` — padding update
- `src/lib/components/home/Newsletter.svelte` — padding update
- `src/routes/+page.svelte` — overflow-hidden, padding
- `src/routes/+error.svelte` — noindex + title
- `src/routes/about/+page.svelte` — title, description, breadcrumbs, overflow-hidden, padding, card padding
- `src/routes/products/+page.svelte` — title, description, breadcrumbs, overflow-hidden, padding, card padding
- `src/routes/contact/+page.svelte` — title, description, breadcrumbs, overflow-hidden, padding, card padding
- `src/routes/privacy/+page.svelte` — breadcrumbs, overflow-hidden, padding
- `src/routes/terms/+page.svelte` — breadcrumbs, overflow-hidden, padding
- `src/routes/cookies/+page.svelte` — breadcrumbs, overflow-hidden, padding
- `src/routes/sitemap.xml/+server.ts` — static lastmod dates
- `static/site.webmanifest` — NEW

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
