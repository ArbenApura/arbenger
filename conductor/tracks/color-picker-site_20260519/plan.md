# Implementation Plan: Color Picker Site Integration

**Track ID:** color-picker-site_20260519
**Spec:** [spec.md](./spec.md)
**Created:** 2026-05-19
**Status:** [ ] Not Started

## Overview

Add Color Picker to all customer-facing surfaces on arbenger.com. Follows existing patterns from Image Resizer/Compressor for consistency. Creates a product landing page, blog post, homepage feature, and updates data/sitemap.

## Phase 1: Product Data & Routing Setup

Fix product data and create route structure.

### Tasks

- [ ] Task 1.1: Fix `src/lib/data/products.ts` — add `externalUrl` to color-picker entry (Chrome Web Store link or placeholder `/products/color-picker`)
- [ ] Task 1.2: Create route directory `src/routes/products/(chrome-plugins)/color-picker/` with `+page.svelte` and `+page.ts` (prerender)
- [ ] Task 1.3: Update `src/routes/sitemap.xml/+server.ts` — add `/products/color-picker/` entry

### Verification

- [ ] Color picker appears correctly on `/products` page in Chrome Plugins category
- [ ] `/products/color-picker` route resolves without 404

## Phase 2: Product Landing Page

Build the `/products/color-picker` page following image tool page patterns.

### Tasks

- [ ] Task 2.1: Create `+page.svelte` with MetaTags, JSON-LD (WebApplication + BreadcrumbList), sr-only H1
- [ ] Task 2.2: Build hero section — product name, tagline, feature highlights, Chrome Web Store CTA button
- [ ] Task 2.3: Build features grid — 6 key features (eyedropper, formats, harmonies, contrast checker, color blindness sim, history) with icons and descriptions
- [ ] Task 2.4: Build "How it works" section — 3-step flow (Install → Pick → Use)
- [ ] Task 2.5: Add cross-links to other products ("Also check out Image Resizer, Image Compressor")
- [ ] Task 2.6: Add browser compatibility note and privacy statement (zero permissions, no data collection)

### Verification

- [ ] Page renders correctly in dark and light mode
- [ ] Responsive at mobile, tablet, desktop
- [ ] SEO: correct title, description, JSON-LD, canonical URL

## Phase 3: Homepage FeaturedTool Update

Add Color Picker to homepage showcase.

### Tasks

- [ ] Task 3.1: Read existing `FeaturedTool.svelte` and understand hardcoded structure
- [ ] Task 3.2: Add Color Picker as third featured tool — adapt layout for 3 cards (may need grid adjustment)
- [ ] Task 3.3: Write feature pills and CTA for Color Picker card (matching existing card style)

### Verification

- [ ] Homepage shows 3 featured tools
- [ ] Layout balanced at all breakpoints
- [ ] Links work correctly (color picker goes to `/products/color-picker`)

## Phase 4: Blog Post

Write and register an announcement blog post.

### Tasks

- [ ] Task 4.1: Add blog post entry to `src/lib/data/blog.ts` — slug `introducing-color-picker`, category `release`
- [ ] Task 4.2: Create `src/routes/blog/[slug]/_posts/introducing-color-picker.svelte` with announcement content
- [ ] Task 4.3: Include: what it does, key features, why it's different (zero permissions, contrast checker, color blindness sim), install CTA
- [ ] Task 4.4: Update sitemap if needed (blog posts auto-added via `sortedPosts`)

### Verification

- [ ] Blog post renders at `/blog/introducing-color-picker`
- [ ] Appears in blog listing with correct category badge
- [ ] MetaTags and Article JSON-LD correct

## Phase 5: Final Polish

Cross-check all integration points.

### Tasks

- [ ] Task 5.1: Verify all internal links work (homepage → product page → Chrome Web Store, blog → product page)
- [ ] Task 5.2: Run `yarn check` for TypeScript errors
- [ ] Task 5.3: Test both themes on all new/modified pages
- [ ] Task 5.4: Update docs (product docs, changelog)

### Verification

- [ ] All acceptance criteria met
- [ ] Zero TypeScript errors
- [ ] All pages render correctly in both themes
- [ ] Internal link graph complete (no dead links)

## Final Verification

- [ ] `/products/color-picker` page live with correct SEO
- [ ] Homepage features Color Picker
- [ ] Blog post live at `/blog/introducing-color-picker`
- [ ] Products page shows Color Picker in Chrome Plugins category
- [ ] Sitemap updated
- [ ] Documentation updated
