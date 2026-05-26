# SEO Standards

**Last updated:** 2026-05-27

This document defines the SEO requirements for every page on arbenger.com. All pages must meet these standards before deployment. No page ships without proper meta tags, structured data, and heading hierarchy.

---

## 1. Meta Tags (Every Page)

### Required Tags

Every page must use the `MetaTags.svelte` component with these props:

| Tag | Requirement | Example |
|-----|-------------|---------|
| `<title>` | Unique, 50-60 chars, primary keyword near start, brand at end | `Arbenger — Extensions, Plugins, AI Tools & Web Apps` |
| `<meta name="description">` | Unique, 150-160 chars, includes keyword, has value proposition | `Extensions, plugins, AI tools, and web apps. Browse what's available at Arbenger.` |
| `<link rel="canonical">` | Self-referencing absolute URL | `https://arbenger.com/products` |

### OpenGraph Tags

| Tag | Requirement |
|-----|-------------|
| `og:title` | Same as `<title>` or slightly shorter |
| `og:description` | Same as meta description or tailored for social |
| `og:image` | Absolute URL to OG image (min 1200x630px) |
| `og:url` | Canonical URL |
| `og:type` | `website` for homepage, `article` for blog posts |
| `og:site_name` | `Arbenger` |

### Twitter Card Tags

| Tag | Requirement |
|-----|-------------|
| `twitter:card` | `summary_large_image` |
| `twitter:site` | `@arbenger` (hardcoded in MetaTags component) |
| `twitter:title` | Same as og:title |
| `twitter:description` | Same as og:description |
| `twitter:image` | Same as og:image |

### MetaTags Component Usage

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
</script>

<MetaTags
  title="Arbenger — Extensions, Plugins, AI Tools & Web Apps"
  description="Extensions, plugins, AI tools, and web apps. Browse what's available at Arbenger."
  url="https://arbenger.com"
  image="https://arbenger.com/og-image.png"
/>
```

---

## 2. Structured Data (JSON-LD)

### Organization (Homepage Only)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Arbenger",
  "url": "https://arbenger.com",
  "logo": "https://arbenger.com/arbenger.svg",
  "description": "Extensions, plugins, AI tools, and web applications.",
  "sameAs": [
    "https://github.com/arbenger"
  ]
}
```

### WebSite (Sitewide, in Layout)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Arbenger",
  "url": "https://arbenger.com"
}
```

### WebApplication (Product Tool Pages)

Used on interactive tool pages like the image resizer:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Arbenger Image Resizer",
  "url": "https://arbenger.com/products/image-resizer",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Free browser-based image resizer with crop, batch processing, and format conversion. No uploads — 100% private."
}
```

### Article (Blog Post Pages)

Used on individual blog post pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Use Arbenger Image Resizer — The Complete Guide",
  "description": "Learn how to resize, crop, and batch-convert images...",
  "datePublished": "2026-05-10",
  "dateModified": "2026-05-10",
  "author": { "@type": "Organization", "name": "Arbenger", "url": "https://arbenger.com" },
  "publisher": {
    "@type": "Organization", "name": "Arbenger", "url": "https://arbenger.com",
    "logo": { "@type": "ImageObject", "url": "https://arbenger.com/arbenger.svg" }
  },
  "url": "https://arbenger.com/blog/how-to-use-image-resizer/",
  "timeRequired": "PT8M"
}
```

Blog post pages also include a 3-level `BreadcrumbList` (Home > Blog > Post Title) using the `Breadcrumbs.svelte` component with the `items` array prop.

### FAQPage (Product Pages with FAQ Content)

Used on product pages that include FAQ sections for rich snippet eligibility:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is my code sent to a server?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Everything runs in your browser..."
      }
    }
  ]
}
```

Currently used on: HTML Editor (`/products/html-editor/`) with 5 Q&A pairs.

### SoftwareApplication (Per Product Page — Future)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Product Name",
  "url": "https://arbenger.com/products/product-slug",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "description": "Product description",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### BreadcrumbList (All Inner Pages)

Every page except the homepage must include a BreadcrumbList using the `Breadcrumbs.svelte` component:

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
</script>

<Breadcrumbs pageName="About" pageUrl="https://arbenger.com/about" />

<!-- FOR 3-LEVEL BREADCRUMBS (e.g. BLOG POSTS) -->
<Breadcrumbs items={[
  { name: 'Blog', url: 'https://arbenger.com/blog/' },
  { name: 'Post Title', url: 'https://arbenger.com/blog/post-slug/' },
]} />
```

This renders JSON-LD structured data that helps Google display breadcrumb trails in search results:

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://arbenger.com" },
    { "@type": "ListItem", "position": 2, "name": "About", "item": "https://arbenger.com/about" }
  ]
}
```

### JsonLd Component Usage

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import JsonLd from '$lib/components/seo/JsonLd.svelte';
</script>

<JsonLd schema={{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Arbenger",
  "url": "https://arbenger.com"
}} />
```

---

## 3. Heading Hierarchy

### Rules

1. **Exactly one `<h1>` per page** — the main page title
2. **Logical nesting:** `<h1>` → `<h2>` → `<h3>`. Never skip levels (no `<h1>` → `<h3>`)
3. **H1 contains primary keyword** for the page
4. **Headings describe content** — never used for styling alone. Use Tailwind classes for visual size

### Per-Page H1 Targets

| Page | H1 Content | Primary Keyword |
|------|-----------|-----------------|
| `/` | "Tools that do the job" (with typewriter extension) | Arbenger, tools |
| `/about` | "About Arbenger" | Arbenger, company |
| `/products` | "Products" | Products, tools |
| `/contact` | "Say Hello" | Contact |
| `/products/image-resizer` | "Free Online Image Resizer — Resize, Crop & Convert" (sr-only) | Image resizer, resize, crop, convert |
| `/products/image-compressor` | "Free Online Image Compressor — Reduce File Size Without Quality Loss" (sr-only) | Image compressor, compress, optimize |
| `/blog` | "Tutorials & Dev Logs" | Blog, tutorials, guides |
| `/blog/[slug]` | Post title (dynamic) | Post-specific keywords |
| `/products/color-picker` | "Pick any color. Check if it's accessible." | Color picker, eyedropper, contrast |
| `/products/sound-booster` | "Your browser stops at 100%. This goes to 600%." | Sound booster, volume, equalizer |
| `/products/html-editor` | "Free Online HTML Editor — Write HTML, CSS & JavaScript with Live Preview" (sr-only) | HTML editor, code editor, live preview |
| `/products/[slug]` | Product name | Product-specific keyword |

---

## 4. URL Structure

### Rules

1. **Lowercase only** — never uppercase in URLs
2. **Hyphen-separated** — never underscores or camelCase
3. **Descriptive** — URL should indicate content (`/products/ai-wiki-reader`, not `/products/p123`)
4. **No trailing slashes** — canonical URLs omit trailing slash
5. **No parameters for content** — no `?page=products` or `?lang=en`

### Defined Routes

| URL | Content |
|-----|---------|
| `/` | Homepage |
| `/about` | About page |
| `/products` | Product catalog |
| `/products/image-resizer` | Image Resizer tool |
| `/products/image-compressor` | Image Compressor tool |
| `/products/color-picker` | Color Picker extension landing |
| `/products/sound-booster` | Sound Booster extension landing |
| `/products/html-editor` | HTML/CSS/JS Editor tool |
| `/products/[slug]` | Individual product (future) |
| `/contact` | Contact page |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post |
| `/sitemap.xml` | XML sitemap |

---

## 5. Sitemap

### Implementation

Server-rendered SvelteKit route at `/sitemap.xml` that returns XML content type.

### Requirements

- Lists all indexable pages with absolute URLs
- Includes static `<lastmod>` dates (ISO 8601 format) — update per-page when content changes
- New pages must be added to the `PAGES` array in `src/routes/sitemap.xml/+server.ts`
- Referenced in `robots.txt`

### Current Pages

| Path | Priority | Changefreq | Last Modified |
|------|----------|------------|---------------|
| `/` | 1.0 | weekly | 2026-05-21 |
| `/products` | 0.8 | weekly | 2026-05-21 |
| `/about` | 0.6 | monthly | 2026-05-21 |
| `/contact` | 0.5 | monthly | 2026-05-09 |
| `/privacy` | 0.3 | yearly | 2026-05-08 |
| `/terms` | 0.3 | yearly | 2026-05-08 |
| `/cookies` | 0.3 | yearly | 2026-05-08 |
| `/products/image-resizer` | 0.7 | weekly | 2026-05-21 |
| `/products/image-compressor` | 0.7 | weekly | 2026-05-21 |
| `/products/color-picker` | 0.7 | weekly | 2026-05-21 |
| `/products/sound-booster` | 0.7 | weekly | 2026-05-21 |
| `/products/html-editor` | 0.8 | weekly | 2026-05-25 |
| `/blog` | 0.8 | weekly | 2026-05-21 |
| `/blog/resize-crop-convert-in-browser` | 0.7 | monthly | 2026-05-10 |
| `/blog/compress-images-90-smaller` | 0.7 | monthly | 2026-05-11 |
| `/blog/color-picker-without-tracking` | 0.7 | monthly | 2026-05-19 |
| `/blog/browser-volume-beyond-100` | 0.7 | monthly | 2026-05-21 |
| `/blog/html-css-js-editor-in-browser` | 0.7 | monthly | 2026-05-25 |

Note: Blog post URLs are auto-generated in the sitemap from `sortedPosts` in `src/lib/data/blog.ts`. New posts appear in the sitemap automatically.

### Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://arbenger.com</loc>
    <lastmod>2026-05-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arbenger.com/products</loc>
    <lastmod>2026-05-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

---

## 6. robots.txt

Located at `static/robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://arbenger.com/sitemap.xml
```

---

## 7. Per-Page SEO Reference

### Image Resizer (`/products/image-resizer`)

| Element | Value |
|---------|-------|
| Title | "Free Image Resizer — Resize, Crop & Convert Online \| Arbenger" |
| Meta description | "Resize, crop, and batch-convert images to PNG, JPEG, or WebP — directly in your browser. No uploads, no signups. 100% private and free." |
| H1 | "Free Online Image Resizer — Resize, Crop & Convert" (sr-only) |
| JSON-LD #1 | `WebApplication` — name, url, applicationCategory, operatingSystem, offers, description |
| JSON-LD #2 | `BreadcrumbList` — Home → Products → Image Resizer (3-level) |
| Breadcrumb nav | Visual breadcrumb in top bar: Home / Products / Image Resizer |
| Canonical URL | `https://arbenger.com/products/image-resizer` |
| Sitemap priority | 0.7, weekly changefreq |

Notes:
- The H1 uses `sr-only` class because the tool UI itself serves as the primary visual heading
- Uses `WebApplication` instead of `SoftwareApplication` since it runs entirely in the browser
- BreadcrumbList is rendered via inline `JsonLd` component (not the `Breadcrumbs.svelte` helper) to support a 3-level hierarchy (Home → Products → Image Resizer)

### Image Compressor (`/products/image-compressor`)

| Element | Value |
|---------|-------|
| Title | "Free Image Compressor — Compress PNG, JPEG, WebP Online \| Arbenger" |
| Meta description | "Compress PNG, JPEG, and WebP images up to 90% smaller. Quality slider, target size mode, and live before/after preview. No uploads — 100% private and free." |
| H1 | "Free Online Image Compressor — Reduce File Size Without Quality Loss" (sr-only) |
| JSON-LD #1 | `WebApplication` — name, url, applicationCategory, operatingSystem, offers, description |
| JSON-LD #2 | `BreadcrumbList` — Home → Products → Image Compressor (3-level) |
| Breadcrumb nav | Visual breadcrumb in top bar: Home / Products / Image Compressor |
| Canonical URL | `https://arbenger.com/products/image-compressor` |
| Sitemap priority | 0.7, weekly changefreq |

Notes:
- Same sr-only H1 and WebApplication JSON-LD pattern as image resizer
- Cross-links to image resizer at page bottom ("Need to resize instead?")

### Color Picker (`/products/color-picker`)

| Element | Value |
|---------|-------|
| Title | "Free Color Picker Chrome Extension — Eyedropper, Contrast Checker \| Arbenger" |
| Meta description | "Pick any color from any webpage. Check WCAG contrast ratios instantly. Eyedropper, palette history, and accessibility scoring. No tracking. Free." |
| H1 | "Pick any color. Check if it's accessible." (visible H1) |
| JSON-LD #1 | `WebApplication` — name, url, applicationCategory, operatingSystem, offers, description |
| JSON-LD #2 | `BreadcrumbList` — Home → Products → Color Picker (3-level) |
| Canonical URL | `https://arbenger.com/products/color-picker/` |
| Sitemap priority | 0.7, weekly changefreq |

Notes:
- Same WebApplication + BreadcrumbList JSON-LD pattern as Image Resizer
- Cross-links to other extensions only (category-scoped)

### Sound Booster (`/products/sound-booster`)

| Element | Value |
|---------|-------|
| Title | "Free Sound Booster Chrome Extension — Volume up to 600%, Equalizer \| Arbenger" |
| Meta description | "Boost audio beyond 100% on any tab. Per-tab volume up to 600%, 5-band equalizer, presets, keyboard shortcuts. Minimal permissions. Free." |
| H1 | "Your browser stops at 100%. This goes to 600%." (visible H1) |
| JSON-LD #1 | `WebApplication` — name, url, applicationCategory, operatingSystem, offers, description |
| JSON-LD #2 | `BreadcrumbList` — Home → Products → Sound Booster (3-level) |
| Canonical URL | `https://arbenger.com/products/sound-booster/` |
| Sitemap priority | 0.7, weekly changefreq |

Notes:
- Same WebApplication + BreadcrumbList JSON-LD pattern as Color Picker
- Cross-links to Color Picker only (category-scoped)

### HTML Editor (`/products/html-editor`)

| Element | Value |
|---------|-------|
| Title | "Free Online HTML Editor — Live Preview & Formatting \| Arbenger" |
| Meta description | "Write HTML, CSS, and JavaScript with live preview, Prettier formatting, and inline error detection. No signup, no uploads. 100% private and free." |
| H1 | "Free Online HTML Editor — Write HTML, CSS & JavaScript with Live Preview" (sr-only) |
| JSON-LD #1 | `WebApplication` — name, url, applicationCategory (`DeveloperApplication`), offers, description, featureList, browserRequirements, publisher |
| JSON-LD #2 | `BreadcrumbList` — Home → Products → HTML Editor (3-level) |
| JSON-LD #3 | `FAQPage` — 5 Q&A pairs covering privacy, languages, offline use, formatting, export |
| Canonical URL | `https://arbenger.com/products/html-editor/` |
| Sitemap priority | 0.8, weekly changefreq |

Notes:
- Same sr-only H1 and WebApplication pattern as image tools
- Uses `DeveloperApplication` as applicationCategory (vs `UtilitiesApplication` for image tools)
- Includes `FAQPage` JSON-LD for rich snippet eligibility
- Full-screen layout (hideChrome) — no navbar/footer, only minimal header with back link

---

## 8. Internal Linking

### Rules

1. **All pages reachable within 2 clicks** from the homepage
2. **Descriptive anchor text** — never "click here" or "learn more" alone
3. **No broken internal links** — verify all `href` values point to valid routes
4. **Navbar and footer** provide sitewide navigation (every page links to every other page)
5. **Contextual links** within page content (e.g., about teaser links to /about, product cards link to /products)

### Link Structure

```
Homepage (/)
  ├── /products (via navbar + product categories section)
  ├── /products/image-resizer (via FeaturedTool card CTA)
  ├── /products/image-compressor (via FeaturedTool card CTA)
  ├── /products/color-picker (via FeaturedTool card CTA)
  ├── /products/sound-booster (via FeaturedTool card CTA)
  ├── /products/html-editor (via FeaturedTool card CTA)
  ├── /about (via navbar + about teaser section)
  ├── /contact (via navbar + footer)
  └── /products/[slug] (via product cards — future)

Products (/products)
  ├── /products/image-resizer (via live products spotlight + category nested link)
  ├── /products/image-compressor (via live products spotlight + category nested link)
  ├── /products/color-picker (via live products spotlight + category nested link)
  ├── /products/sound-booster (via live products spotlight + category nested link)
  ├── /products/html-editor (via live products spotlight + category nested link)
  └── /products/[slug] (via category nested links — future)

Image Resizer (/products/image-resizer)
  ├── / (via breadcrumb nav)
  ├── /products (via breadcrumb nav)
  ├── /blog/how-to-use-image-resizer (via Guide link + UploadZone link)
  └── /products/image-compressor (via cross-link at page bottom)

Image Compressor (/products/image-compressor)
  ├── / (via breadcrumb nav)
  ├── /products (via breadcrumb nav)
  ├── /blog/how-to-use-image-compressor (via Guide link)
  └── /products/image-resizer (via cross-link at page bottom)

Blog (/blog)
  ├── /blog/[slug] (via post cards)
  └── /blog/browser-volume-beyond-100 (via blog listing)

Blog Post (/blog/[slug])
  ├── /blog (via category link + back link)
  ├── /products/image-resizer (via CTA in resizer guide post)
  └── /products/image-compressor (via CTA in compressor guide post)

All pages → All pages (via navbar + footer)
```

---

## 9. Images

### SEO Requirements

| Requirement | Rule |
|-------------|------|
| Alt text | `alt=""` on all images (per svelte-guidelines — empty string, not descriptive) |
| File names | Descriptive, hyphenated (e.g., `ai-wiki-reader-screenshot.webp`) |
| Format | WebP preferred, PNG fallback for logos/icons |
| Compression | Optimized file sizes, no uncompressed images |
| Dimensions | Explicit `width` and `height` attributes to prevent CLS |
| Lazy loading | `loading="lazy"` on below-fold images |
| OG Image | Default 1200x630px image at `/og-image.png` |

---

## 10. Performance Targets (SEO-Adjacent)

Google uses Core Web Vitals as ranking signals. These targets must be met:

| Metric | Target | Measurement Tool |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.0s | PageSpeed Insights |
| INP (Interaction to Next Paint) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.05 | PageSpeed Insights |
| TTFB (Time to First Byte) | < 200ms | WebPageTest |

---

## 11. E-E-A-T Signals

For a company/product site, these trust signals must be present:

| Signal | Implementation |
|--------|---------------|
| **Experience** | Product descriptions showing real usage, screenshots, demos |
| **Expertise** | About page with company overview and product category information |
| **Authoritativeness** | Links to published products on official platforms (VS Code Marketplace, Chrome Web Store) |
| **Trustworthiness** | Contact information, HTTPS, privacy policy, terms of service, cookie policy, professional design |

---

## 12. Pre-Launch SEO Checklist

Before deploying any page, verify:

- [ ] Unique `<title>` tag, 50-60 characters, keyword near start
- [ ] Unique `<meta description>`, 150-160 characters, includes CTA
- [ ] Canonical URL set and correct
- [ ] OpenGraph tags complete (title, description, image, url, type)
- [ ] Twitter Card tags complete
- [ ] JSON-LD structured data valid (test at Google Rich Results Test)
- [ ] Exactly one `<h1>` per page
- [ ] Heading hierarchy logical (no skipped levels)
- [ ] All internal links working
- [ ] All images have `alt=""` and explicit dimensions
- [ ] Page loads in < 2s (test at PageSpeed Insights)
- [ ] No CLS issues (test at PageSpeed Insights)
- [ ] Mobile-friendly (responsive, no horizontal scroll)
- [ ] URL is lowercase and hyphen-separated
