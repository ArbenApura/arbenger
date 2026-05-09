# SEO Standards

**Last updated:** 2026-05-09

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
    "https://github.com/arbenger",
    "https://twitter.com/arbenger"
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
| `/products` | "Our Products" | Products, tools |
| `/contact` | "Say Hello" | Contact |
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
| `/products/[slug]` | Individual product (future) |
| `/contact` | Contact page |
| `/blog` | Blog listing (future) |
| `/blog/[slug]` | Blog post (future) |
| `/tools/[slug]` | Online tools (future) |
| `/sitemap.xml` | XML sitemap |

---

## 5. Sitemap

### Implementation

Server-rendered SvelteKit route at `/sitemap.xml` that returns XML content type.

### Requirements

- Lists all indexable pages with absolute URLs
- Includes `<lastmod>` dates (ISO 8601 format)
- Updates automatically when pages are added
- Referenced in `robots.txt`

### Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://arbenger.com</loc>
    <lastmod>2026-05-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://arbenger.com/products</loc>
    <lastmod>2026-05-08</lastmod>
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

## 7. Internal Linking

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
  ├── /about (via navbar + about teaser section)
  ├── /contact (via navbar + footer)
  └── /products/[slug] (via product cards — future)

All pages → All pages (via navbar + footer)
```

---

## 8. Images

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

## 9. Performance Targets (SEO-Adjacent)

Google uses Core Web Vitals as ranking signals. These targets must be met:

| Metric | Target | Measurement Tool |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.0s | PageSpeed Insights |
| INP (Interaction to Next Paint) | < 100ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.05 | PageSpeed Insights |
| TTFB (Time to First Byte) | < 200ms | WebPageTest |

---

## 10. E-E-A-T Signals

For a company/product site, these trust signals must be present:

| Signal | Implementation |
|--------|---------------|
| **Experience** | Product descriptions showing real usage, screenshots, demos |
| **Expertise** | About page with company overview and product category information |
| **Authoritativeness** | Links to published products on official platforms (VS Code Marketplace, Chrome Web Store) |
| **Trustworthiness** | Contact information, HTTPS, privacy policy, terms of service, cookie policy, professional design |

---

## 11. Pre-Launch SEO Checklist

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
