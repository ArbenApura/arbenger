# Routing Architecture

**Last updated:** 2026-08-05

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
| `/` | `src/routes/+page.svelte` | Homepage | "Arben M. Apura" (+ typewriter) |
| `/about` | `src/routes/about/+page.svelte` | About page | "About Me" |
| `/projects` | `src/routes/projects/+page.svelte` | Portfolio project listing | "Projects" |
| `/contact` | `src/routes/contact/+page.svelte` | Contact info | "Say Hello" |

### Project Routes (Pre-rendered, Dynamic)

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/projects/[slug]` | `src/routes/projects/[slug]/+page.svelte` | Project detail page (cover, features, stack, links, video, PDF) | Project name (dynamic) |

Project detail routes use a dynamic `[slug]` parameter with an `entries()` export in `+page.ts` to enumerate all slugs from `src/lib/data/projects.ts` at build time for prerendering. Static assets (covers, screenshots, PDFs) live in `static/projects/`.

### Product Tool Routes (Pre-rendered, Group Routes)

Note: The `/products` catalog page was removed in the portfolio revision. Only the individual tool pages remain at `/products/<slug>`.

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/products/image-resizer` | `src/routes/products/(utilities)/image-resizer/+page.svelte` | Image resizer tool | "Free Online Image Resizer — Resize, Crop & Convert" (sr-only) |
| `/products/image-compressor` | `src/routes/products/(utilities)/image-compressor/+page.svelte` | Image compressor tool | "Free Online Image Compressor — Reduce File Size Without Quality Loss" (sr-only) |
| `/products/color-picker` | `src/routes/products/(chrome-plugins)/color-picker/+page.svelte` | Color picker landing page | "Pick any color. Check if it's accessible." (visible H1) |
| `/products/sound-booster` | `src/routes/products/(chrome-plugins)/sound-booster/+page.svelte` | Sound booster landing page | "Your browser stops at 100%. This goes to 600%." (visible H1) |
| `/products/html-editor` | `src/routes/products/(utilities)/html-editor/+page.svelte` | HTML/CSS/JS editor tool | "Free Online HTML Editor — Write HTML, CSS & JavaScript with Live Preview" (sr-only) |

Product tool routes use SvelteKit **group routes**. Utilities use `(utilities)/`, Chrome extensions use `(chrome-plugins)/`. The group name is excluded from the URL — e.g., `products/(chrome-plugins)/color-picker/` renders at `/products/color-picker`. Each product tool route contains:
- `+page.svelte` — page component
- `+page.ts` — prerender config (`export const prerender = true`)
- `_components/` — route-local components (underscore prefix tells SvelteKit to ignore for routing)
- `_lib/` — route-local store and worker files

### Blog Routes (Pre-rendered, Dynamic)

| Route | File | Purpose | H1 |
|-------|------|---------|-----|
| `/blog` | `src/routes/blog/+page.svelte` | Blog listing with category filters and pagination | "Tutorials & Dev Logs" |
| `/blog/[slug]` | `src/routes/blog/[slug]/+page.svelte` | Blog post shell (loads content via `import.meta.glob`) | Post title (dynamic) |

Blog post routes use a dynamic `[slug]` parameter with `entries()` export in `+page.ts` to enumerate all slugs at build time for prerendering. Post content lives in `_posts/*.svelte` files inside the `[slug]` route directory, loaded eagerly via `import.meta.glob('./_posts/*.svelte', { eager: true })`.

### Other Server Routes

| Route | File | Rendering | Purpose |
|-------|------|-----------|---------|
| `/sitemap.xml` | `src/routes/sitemap.xml/+server.ts` | Pre-rendered | XML sitemap (generated at build time) |

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
  +layout.svelte          ← Root layout (Navbar + Footer + Toaster + JSON-LD)
  +layout.ts              ← prerender = true (default for all child routes)
  +page.svelte            ← Homepage
  +error.svelte           ← Custom error page (404, 500)
  about/
    +page.svelte          ← About page (inherits root layout)
  projects/
    +page.svelte          ← Project listing (inherits root layout)
    [slug]/
      +page.ts            ← entries() + load() for prerendering
      +page.svelte        ← Project detail page (cover, video, PDF, links)
  products/
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
      html-editor/
        +page.svelte      ← HTML/CSS/JS editor tool (full-screen layout)
        +page.ts          ← prerender = true
        _components/       ← Route-local components
          EditorLayout.svelte
          EditorPane.svelte
          PreviewPane.svelte
          ConsolePane.svelte
          DevicePresets.svelte
          DeviceFrame.svelte
        _lib/              ← Route-local store and utilities
          store.ts
          persistence.ts
          linting.ts
          formatter.ts
          exporter.ts
          codemirror-theme.ts
    (chrome-plugins)/      ← SvelteKit group route for Chrome extensions
      color-picker/
        +page.svelte      ← Color picker landing page
        +page.ts          ← prerender = true
      sound-booster/
        +page.svelte      ← Sound booster landing page
        +page.ts          ← prerender = true
  blog/
    +page.svelte          ← Blog listing (tutorials + dev logs)
    [slug]/
      +page.ts            ← entries() + load() for prerendering
      +page.svelte        ← Post shell (SEO, header, content loader)
      _posts/             ← Blog post content files
        resize-crop-convert-in-browser.svelte
        compress-images-90-smaller.svelte
        color-picker-without-tracking.svelte
        browser-volume-beyond-100.svelte
        html-css-js-editor-in-browser.svelte
  contact/
    +page.svelte          ← Contact page (inherits root layout)
  sitemap.xml/
    +server.ts            ← XML sitemap (pre-rendered at build time)
```

The root layout provides:
- Navbar component (sticky, transparent → blur on scroll)
- `<main>` wrapper with skip-to-content accessibility link
- Footer component (4-column: logo/tagline, navigation, connect, available-for-work)
- Toaster component (`svelte-sonner`) — positioned bottom-right, rich colors, close button
- Sitewide JSON-LD (WebSite schema)

Note: Theme initialization (dark class on `<html>`) happens in `app.html` via an inline script to prevent FOUC. Font preloading is also in `app.html`.

---

## 4. Navigation Structure

### Primary Navigation (Navbar)

| Label | Route | Visible On |
|-------|-------|------------|
| Home | `/` | Always (logo click) |
| Projects | `/projects` | Always |
| Blog | `/blog` | Always |
| About | `/about` | Always |
| Contact | `/contact` | Always |

### Footer Navigation

Same links as navbar, plus:
- Connect column with social links: GitHub, Facebook

### Internal Links (In-Page)

| From | To | Context |
|------|----|---------|
| Homepage hero CTA | `/projects` | "View my work" button |
| Homepage featured projects | `/projects/door-lock-module`, `/projects/top-one-uwu`, `/projects/calculus-courseware`, `/projects/exemplary-league-portal` | Featured project card links |
| Homepage minor tools grid | `/products/image-resizer`, `/products/image-compressor`, `/products/color-picker`, `/products/sound-booster`, `/products/html-editor` | Minor tool card links |
| Homepage about teaser | `/about` | "Learn more" link |
| Homepage bottom CTA | `/contact` | Contact CTA button |
| Projects listing cards | `/projects/[slug]` | Project card links |
| Project detail back link | `/projects` | "Back to projects" link |
| Project detail links | `/projects/[slug]` | Video demo, PDF download, external links |
| Blog listing cards | `/blog/[slug]` | Blog post card links |
| Blog post back link | `/blog` | "Back to all posts" link |

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
