# Routing Architecture

**Last updated:** 2026-05-09

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
| `/products` | `src/routes/products/+page.svelte` | Product catalog | "Our Products" |
| `/contact` | `src/routes/contact/+page.svelte` | Contact info | "Say Hello" |
| `/privacy` | `src/routes/privacy/+page.svelte` | Privacy policy | "Privacy Policy" |
| `/terms` | `src/routes/terms/+page.svelte` | Terms of service | "Terms of Service" |
| `/cookies` | `src/routes/cookies/+page.svelte` | Cookie policy | "Cookie Policy" |

### Future Routes

| Route | File | Rendering | Purpose |
|-------|------|-----------|---------|
| `/products/[slug]` | `src/routes/products/[slug]/+page.svelte` | Pre-rendered (from product data) | Individual product pages |
| `/blog` | `src/routes/blog/+page.svelte` | Pre-rendered | Blog listing |
| `/blog/[slug]` | `src/routes/blog/[slug]/+page.svelte` | Pre-rendered | Blog posts |
| `/tools/[slug]` | `src/routes/tools/[slug]/+page.svelte` | SSR (interactive tools) | Online tools |
| `/api/*` | `src/routes/api/*/+server.ts` | SSR (API endpoints) | Backend API routes |
| `/sitemap.xml` | `src/routes/sitemap.xml/+server.ts` | SSR | Dynamic XML sitemap |

### Static Files

| URL | Source | Purpose |
|-----|--------|---------|
| `/robots.txt` | `static/robots.txt` | Search engine directives |
| `/arbenger.svg` | `static/arbenger.svg` | Logo (SVG) |
| `/arbenger.png` | `static/arbenger.png` | Logo (PNG) |
| `/favicon.ico` | `static/favicon.ico` | Browser tab icon |
| `/og-image.png` | `static/og-image.png` | Default OpenGraph image |

---

## 3. Layout Hierarchy

```
src/routes/
  +layout.svelte          ← Root layout (Navbar + Footer + CookieBanner + JSON-LD)
  +layout.ts              ← prerender = true (default for all child routes)
  +page.svelte            ← Homepage
  +error.svelte           ← Custom error page (404, 500)
  about/
    +page.svelte          ← About page (inherits root layout)
  products/
    +page.svelte          ← Product catalog (inherits root layout)
    [slug]/
      +page.svelte        ← Individual product (inherits root layout) — future
  contact/
    +page.svelte          ← Contact page (inherits root layout)
  privacy/
    +page.svelte          ← Privacy policy (inherits root layout)
  terms/
    +page.svelte          ← Terms of service (inherits root layout)
  cookies/
    +page.svelte          ← Cookie policy (inherits root layout)
  sitemap.xml/
    +server.ts            ← Dynamic XML sitemap (SSR)
```

The root layout provides:
- Navbar component (sticky, transparent → blur on scroll)
- `<main>` wrapper with skip-to-content accessibility link
- Footer component (4-column: logo/tagline, navigation, legal, social)
- CookieBanner component (localStorage-persisted consent)
- Sitewide JSON-LD (WebSite schema)

Note: Theme initialization (dark class on `<html>`) happens in `app.html` via an inline script to prevent FOUC. Font preloading is also in `app.html`.

---

## 4. Navigation Structure

### Primary Navigation (Navbar)

| Label | Route | Visible On |
|-------|-------|------------|
| Home | `/` | Always (logo click) |
| Products | `/products` | Always |
| About | `/about` | Always |
| Contact | `/contact` | Always |

### Footer Navigation

Same links as navbar, plus:
- Legal links: Privacy Policy, Terms of Service, Cookie Policy
- Social links: GitHub, Twitter/X, LinkedIn

### Internal Links (In-Page)

| From | To | Context |
|------|----|---------|
| Homepage hero CTA | `/products` | "See What's Available" button |
| Homepage about teaser | `/about` | "Learn more" link |
| Homepage bottom CTA | `/contact` | "Get in Touch" button |
| Homepage product cards | `/products` | Category card clicks |
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
