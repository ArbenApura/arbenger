# Routing Architecture

**Last updated:** 2026-05-19

This document defines the URL structure, rendering strategy, and route planning for arbenger.com.

---

## 1. Routing Strategy

SvelteKit file-based routing. All routes live under `src/routes/`. The adapter is `@sveltejs/adapter-cloudflare`, which supports both pre-rendered and server-rendered routes.

### Rendering Modes

| Mode | When to Use | Config |
|------|-------------|--------|
| Pre-rendered (SSG) | Static content, no user-specific data | `export const prerender = true` in `+layout.ts` or `+page.ts` |
| Server-rendered (SSR) | Dynamic content, personalization, API routes | `export const prerender = false` in `+page.ts` |

**Default:** Pre-render is enabled at the layout level (`src/routes/+layout.ts`). All base pages are pre-rendered. Individual routes opt out when they need SSR.

---

## 2. Route Map

### Launch Routes (Pre-rendered)

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/` | `src/routes/+page.svelte` | Homepage | "Tools that do the job" (+ typewriter) |
| `/about` | `src/routes/about/+page.svelte` | About page | "About Arbenger" |
| `/products` | `src/routes/products/+page.svelte` | Product catalog | "Products" |
| `/contact` | `src/routes/contact/+page.svelte` | Contact info | "Say Hello" |
| `/privacy` | `src/routes/privacy/+page.svelte` | Privacy policy | "Privacy Policy" |
| `/terms` | `src/routes/terms/+page.svelte` | Terms of service | "Terms of Service" |
| `/cookies` | `src/routes/cookies/+page.svelte` | Cookie policy | "Cookie Policy" |

### Product Routes (Pre-rendered, Group Routes)

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/products/image-resizer` | `src/routes/products/(utilities)/image-resizer/+page.svelte` | Image resizer tool | "Free Online Image Resizer — Resize, Crop & Convert" (sr-only) |
| `/products/image-compressor` | `src/routes/products/(utilities)/image-compressor/+page.svelte` | Image compressor tool | "Free Online Image Compressor — Reduce File Size Without Quality Loss" (sr-only) |
| `/products/color-picker` | `src/routes/products/(chrome-plugins)/color-picker/+page.svelte` | Color picker landing page | "Pick any color. Check if it's accessible." (visible H1) |

Product tool routes use SvelteKit **group routes**. Utilities use `(utilities)/`, Chrome extensions use `(chrome-plugins)/`. The group name is excluded from the URL — e.g., `products/(chrome-plugins)/color-picker/` renders at `/products/color-picker`. Each product tool route contains:
- `+page.svelte` — page component
- `+page.ts` — prerender config (`export const prerender = true`)
- `_components/` — route-local components (underscore prefix tells SvelteKit to ignore for routing)
- `_lib/` — route-local store and worker files

### Blog Routes (Pre-rendered, Dynamic)

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/blog` | `src/routes/blog/+page.svelte` | Blog listing with category filters and pagination | "Tutorials" |
| `/blog/[slug]` | `src/routes/blog/[slug]/+page.svelte` | Blog post shell (loads content via `import.meta.glob`) | Post title (dynamic) |

Blog post routes use a dynamic `[slug]` parameter with `entries()` export in `+page.ts` to enumerate all slugs at build time for prerendering. Post content lives in `_posts/*.svelte` files inside the `[slug]` route directory, loaded eagerly via `import.meta.glob('./_posts/*.svelte', { eager: true })`.

### API Routes (Server-Rendered)

| Route | File | Methods | Purpose |
|-------|------|---------|---------|
| `/api/stats/` | `src/routes/api/stats/+server.ts` | GET, POST | Usage stats — GET returns `{ totalProcessed }`, POST atomically increments count via upsert |

API routes are server-rendered (not prerendered). They run as Cloudflare Worker functions and access platform bindings (Hyperdrive) via `platform.env`. They are excluded from the sitemap and have no SEO concerns.

### Other Server Routes

| Route | File | Rendering | Purpose |
|-------|------|-----------|---------|
| `/sitemap.xml` | `src/routes/sitemap.xml/+server.ts` | Pre-rendered | XML sitemap (generated at build time) |

### Future Routes

| Route | File | Rendering | Purpose |
|-------|------|-----------|---------|
| `/products/[slug]` | `src/routes/products/[slug]/+page.svelte` | Pre-rendered (from product data) | Individual product pages |

### Static Files

| URL | Source | Purpose |
|-----|--------|---------|
| `/robots.txt` | `static/robots.txt` | Search engine directives |
| `/arbenger.svg` | `static/arbenger.svg` | Logo (SVG) |
| `/arbenger.png` | `static/arbenger.png` | Logo (PNG) |
| `/site.webmanifest` | `static/site.webmanifest` | Web app manifest |

---

## 3. Layout Hierarchy

```
src/routes/
  +layout.svelte          ← Root layout (Navbar + Footer + CookieBanner + Toaster + JSON-LD)
  +layout.ts              ← prerender = true (default for all child routes)
  +page.svelte            ← Homepage
  +error.svelte           ← Custom error page (404, 500)
  about/
    +page.svelte          ← About page (inherits root layout)
  products/
    +page.svelte          ← Product catalog (inherits root layout)
    (utilities)/           ← SvelteKit group route (excluded from URL)
      image-resizer/
        +page.svelte      ← Image resizer tool
        +page.ts          ← prerender = true
        _components/       ← Route-local components
          PreviewCanvas.svelte
          ThumbnailStrip.svelte
          ResizeControls.svelte
          InfoPanel.svelte
          BatchImageList.svelte
          CropDialog.svelte
        _lib/              ← Route-local store and worker
          store.ts
          worker.ts
      image-compressor/
        +page.svelte      ← Image compressor tool
        +page.ts          ← prerender = true
        _components/       ← Route-local components
          CompareSlider.svelte
          CompressControls.svelte
          CompressInfoPanel.svelte
          BatchImageList.svelte
          ThumbnailStrip.svelte
        _lib/              ← Route-local store and worker
          store.ts
          worker.ts
    (chrome-plugins)/      ← SvelteKit group route for Chrome extensions
      color-picker/
        +page.svelte      ← Color picker landing page
        +page.ts          ← prerender = true
    [slug]/
      +page.svelte        ← Individual product (inherits root layout) — future
  blog/
    +page.svelte          ← Blog listing (tutorials only)
    [slug]/
      +page.ts            ← entries() + load() for prerendering
      +page.svelte        ← Post shell (SEO, header, content loader)
      _posts/             ← Blog post content files
        how-to-use-image-resizer.svelte
        how-to-use-image-compressor.svelte
        introducing-color-picker.svelte
  contact/
    +page.svelte          ← Contact page (inherits root layout)
  privacy/
    +page.svelte          ← Privacy policy (inherits root layout)
  terms/
    +page.svelte          ← Terms of service (inherits root layout)
  cookies/
    +page.svelte          ← Cookie policy (inherits root layout)
  api/
    stats/
      +server.ts          ← Usage stats API (GET + POST, server-rendered)
  sitemap.xml/
    +server.ts            ← XML sitemap (pre-rendered at build time)
```

The root layout provides:
- Navbar component (sticky, transparent → blur on scroll)
- `<main>` wrapper with skip-to-content accessibility link
- Footer component (4-column: logo/tagline, navigation, legal, social)
- CookieBanner component (localStorage-persisted consent)
- Toaster component (`svelte-sonner`) — positioned bottom-right, rich colors, close button
- Sitewide JSON-LD (WebSite schema)

Note: Theme initialization (dark class on `<html>`) happens in `app.html` via an inline script to prevent FOUC. Font preloading is also in `app.html`.

---

## 4. Navigation Structure

### Primary Navigation (Navbar)

| Label | Route | Visible On |
|-------|-------|------------|
| Home | `/` | Always (logo click) |
| Products | `/products` | Always |
| Blog | `/blog` | Always |
| About | `/about` | Always |
| Contact | `/contact` | Always |

### Footer Navigation

Same links as navbar, plus:
- Legal links: Privacy Policy, Terms of Service, Cookie Policy
- Social links: GitHub

### Internal Links (In-Page)

| From | To | Context |
|------|----|---------|
| Homepage hero CTA | `/products` | "See What's Available" button |
| Homepage FeaturedTool CTA | `/products/image-resizer` | "Open Image Resizer" button |
| Homepage about teaser | `/about` | "Learn more" link |
| Homepage bottom CTA | `/contact` | "Get in Touch" button |
| Homepage product cards | `/products` | Category card clicks |
| Products live spotlight | `/products/image-resizer` | Live product card "Open tool" link |
| Products category grid | `/products/image-resizer` | Nested product link in Utilities category |
| Image resizer breadcrumb | `/`, `/products` | Visual breadcrumb navigation |
| Image resizer Guide link | `/blog/how-to-use-image-resizer` | "Guide" link in top bar + "New here? Read the guide" in upload zone |
| Blog listing cards | `/blog/[slug]` | Blog post card links |
| Blog post back link | `/blog` | "Back to all posts" link |
| Blog post CTA | `/products/image-resizer` | "Open Image Resizer" button in guide post |
| Product catalog cards | `/products/[slug]` | Individual product links (future) |

---

## 5. URL Conventions

| Rule | Example |
|------|---------|
| Lowercase only | `/products/ai-wiki-reader` not `/Products/AI-Wiki-Reader` |
| Hyphen-separated | `/products/ai-wiki-reader` not `/products/ai_wiki_reader` |
| No trailing slash | `/about` not `/about/` |
| Descriptive slugs | `/products/ai-wiki-reader` not `/products/1` |
| No file extensions | `/about` not `/about.html` |
| No query parameters for content | `/products` not `/?page=products` |

---

## 6. Error Pages

| Route | Purpose |
|-------|---------|
| `src/routes/+error.svelte` | Custom error page (404, 500, etc.) |

The error page should:
- Match site design (dark futuristic theme)
- Show the error code prominently
- Provide a "Go home" button
- Include navbar and footer (via layout)

---

## 7. Adding New Routes

When adding a new page:

1. Create `src/routes/[path]/+page.svelte`
2. Add `MetaTags` component with unique title, description, canonical URL
3. Add page to sitemap data
4. Add internal links from relevant existing pages
5. Verify heading hierarchy (one H1, logical nesting)
6. Test on both dark and light themes
7. Test responsive layout (mobile, tablet, desktop)
8. Run `yarn check` for TypeScript errors
