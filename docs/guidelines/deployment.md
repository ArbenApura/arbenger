# Deployment Guide

**Last updated:** 2026-05-08

This document covers the complete deployment pipeline for arbenger.com: from local development to production on Cloudflare Pages.

---

## 1. Prerequisites

| Requirement | Version / Detail |
|-------------|-----------------|
| Node.js | 20 LTS |
| npm | 10+ (bundled with Node 20) |
| Git | Latest |
| GitHub account | Repository for arbenger.com |
| Cloudflare account | Free tier sufficient for launch |
| Domain | arbenger.com (purchased on Hostinger) |

---

## 2. Local Development

### Setup

```bash
git clone <repo-url>
cd arbenger
npm install
npm run dev
```

### Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run check` | Run svelte-check for type errors |
| `npm run format` | Run Prettier across all files |
| `npm run lint` | Run linting (if configured) |

### Environment Variables

No environment variables are needed for the base site. Future variables will be documented here as they are added.

| Variable | Purpose | Required |
|----------|---------|----------|
| (none for launch) | — | — |

---

## 3. Build Configuration

### SvelteKit Config

```typescript
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
};

export default config;
```

### Pre-rendering

Base pages are pre-rendered at build time for maximum performance:

```typescript
// src/routes/+layout.ts
export const prerender = true;
```

Individual routes can opt out of pre-rendering by setting `export const prerender = false` when they need SSR.

### Vite Config

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()]
});
```

### Node Version

Set via `.node-version` file in project root:

```
20
```

---

## 4. Prettier Configuration

### Config File

```json
// .prettierrc
{
  "useTabs": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "plugins": [
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss"
  ],
  "overrides": [
    {
      "files": "*.svelte",
      "options": {
        "parser": "svelte"
      }
    }
  ]
}
```

### What It Does

- `prettier-plugin-svelte` — formats Svelte files correctly (script, markup, style ordering)
- `prettier-plugin-tailwindcss` — auto-sorts Tailwind classes in recommended order

---

## 5. Cloudflare Pages Setup

### Step 1: Connect Repository

1. Log into Cloudflare Dashboard → Pages
2. Click "Create a project" → "Connect to Git"
3. Select the GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `.svelte-kit/cloudflare`
   - **Root directory:** `/` (default)
   - **Node.js version:** Set `NODE_VERSION` environment variable to `20`

### Step 2: Deploy

- Push to `main` branch triggers automatic production deployment
- Pull requests generate preview deployments with unique URLs
- Build logs visible in Cloudflare Dashboard

### Step 3: Verify

After first deploy:
1. Visit the `*.pages.dev` URL to verify the site works
2. Check all pages render correctly
3. Test dark/light theme toggle
4. Verify responsive design on mobile

---

## 6. DNS Configuration

### Option A: Transfer Nameservers (Recommended)

This gives full Cloudflare proxy benefits: CDN, DDoS protection, analytics, SSL.

1. In Cloudflare Dashboard → add site `arbenger.com`
2. Cloudflare provides two nameservers (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`)
3. In Hostinger Dashboard → DNS/Nameservers → replace Hostinger nameservers with Cloudflare's
4. Wait for propagation (up to 24 hours, usually faster)
5. In Cloudflare Dashboard → verify domain is active

### Option B: CNAME (If Keeping Hostinger Nameservers)

1. In Hostinger DNS settings, add a CNAME record:
   - Name: `@` (or `arbenger.com`)
   - Target: `<project>.pages.dev`
2. Add another CNAME for `www`:
   - Name: `www`
   - Target: `<project>.pages.dev`

### Custom Domain in Cloudflare Pages

1. In Cloudflare Pages → project settings → Custom domains
2. Add `arbenger.com`
3. Add `www.arbenger.com` with redirect to `arbenger.com`

---

## 7. SSL & Security

| Setting | Value |
|---------|-------|
| SSL Mode | Full (strict) |
| Always Use HTTPS | On |
| HSTS | Enabled (max-age 6 months) |
| Minimum TLS Version | 1.2 |
| Auto-minify | HTML, CSS, JS enabled |
| Brotli compression | Enabled |

All configured in Cloudflare Dashboard → SSL/TLS and Speed settings.

---

## 8. Domain Redirects

| From | To | Type |
|------|-----|------|
| `www.arbenger.com` | `arbenger.com` | 301 (permanent) |
| `http://arbenger.com` | `https://arbenger.com` | 301 (automatic via "Always Use HTTPS") |
| `http://www.arbenger.com` | `https://arbenger.com` | 301 (chained) |

Configured via Cloudflare Page Rules or Redirect Rules.

---

## 9. Deployment Pipeline

### Production

```
Push to main → Cloudflare detects → npm install → npm run build → Deploy to edge (300+ locations)
```

Typical build time: 30-60 seconds.

### Preview

```
Open PR → Cloudflare detects → Build → Deploy to unique preview URL → Comment on PR with URL
```

### Rollback

Cloudflare Pages keeps deployment history. To rollback:
1. Go to Cloudflare Pages → Deployments
2. Find the previous working deployment
3. Click "Rollback to this deploy"

---

## 10. Monitoring

### Build Failures

- Check Cloudflare Pages → Deployments → Build logs
- Common issues: Node version mismatch, missing dependencies, TypeScript errors

### Performance

- Google PageSpeed Insights: Test after each deploy
- Cloudflare Analytics: Traffic, performance, security (free)
- Core Web Vitals: Monitor via Google Search Console (once indexed)

### Uptime

Cloudflare Pages has 99.99% uptime SLA. No additional monitoring needed for launch.

---

## 11. Post-Launch Checklist

After the first production deployment:

- [ ] Site loads at `https://arbenger.com`
- [ ] `www.arbenger.com` redirects to `arbenger.com`
- [ ] HTTP redirects to HTTPS
- [ ] All 4 pages render correctly
- [ ] Theme toggle works (dark/light)
- [ ] Mobile responsive (test on real device)
- [ ] Favicon displays correctly
- [ ] OG image works (test with https://opengraph.xyz)
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] PageSpeed Insights score > 90 on all pages
- [ ] No console errors in browser DevTools
