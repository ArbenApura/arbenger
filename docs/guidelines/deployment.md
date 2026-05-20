# Deployment Guide

**Last updated:** 2026-05-21

This document covers the complete deployment pipeline for arbenger.com: from local development to production on Cloudflare Pages. For the Color Picker Chrome extension, see `extensions/color-picker/store/PUBLISHING.md`.

---

## 1. Prerequisites

| Requirement | Version / Detail |
|-------------|-----------------|
| Node.js | 20 LTS |
| Package manager | Yarn 1.x (Classic) |
| Git | Latest |
| GitHub account | Repository: `Arbenger/arbenger.com` (private) |
| GitHub CLI | `gh` (installed via `winget install GitHub.cli`) |
| SSH key | ed25519 key at `~/.ssh/id_ed25519`, added to GitHub |
| Cloudflare account | Free tier sufficient for launch |
| Domain | arbenger.com (purchased on Hostinger) |

---

## 2. Local Development

### Setup

```bash
git clone git@github.com:Arbenger/arbenger.com.git
cd arbenger.com
yarn install
yarn dev
```

### Commands

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start development server on port 8000 |
| `yarn build` | Production build |
| `yarn preview` | Preview production build locally |
| `yarn check` | Run svelte-check for type errors |
| `yarn format` | Run Prettier across all files |
| `yarn deploy` | Build and deploy to Cloudflare Pages (production) |

### Dev Server Port

The dev server is configured to always run on **port 8000** (not the Vite default 5173). This is set in the `dev` script in `package.json`: `"dev": "vite dev --port 8000"`.

### Key Dependencies

| Package | Purpose |
|---------|---------|
| `jszip` | Batch ZIP download in image resizer and compressor tools |
| `upng-js` | PNG compression via color quantization in image compressor |
| `tippy.js` | Tooltip library for download-ready notifications |
| `svelte-sonner` | Toast notification library (`<Toaster>` in root layout) |
| `lucide-svelte` | Icon library |
| `clsx` + `tailwind-merge` | Dynamic class composition (`cn()` utility) |
| `drizzle-orm` | Type-safe ORM for PostgreSQL |
| `postgres` | PostgreSQL client (postgres.js) for Cloudflare Hyperdrive |
| `@neondatabase/serverless` | Neon serverless driver (used by drizzle-kit for migrations) |
| `nanoid` | Unique ID generation |

### Key Dev Dependencies

| Package | Purpose |
|---------|---------|
| `@sveltejs/adapter-cloudflare` | Cloudflare Pages deployment adapter |
| `wrangler` | Required peer dependency of adapter-cloudflare |
| `@types/node` | Node.js type definitions for TypeScript |
| `tailwindcss` + `@tailwindcss/vite` | Tailwind CSS v4 with Vite plugin |
| `svelte-check` | TypeScript + Svelte type checking |
| `drizzle-kit` | Schema migrations and Drizzle Studio |
| `dotenv` | Load `.env` in `drizzle.config.ts` |

### Environment Variables

| Variable | File | Purpose | Required |
|----------|------|---------|----------|
| `DATABASE_URL` | `.env` | Neon PostgreSQL connection string (used by `drizzle-kit` for migrations/studio) | Yes (for db commands) |
| `DATABASE_URL` | `.dev.vars` | Same connection string (used by Cloudflare's local dev platform proxy) | Yes (for local dev) |

Both `.env` and `.dev.vars` are gitignored. Production uses the Hyperdrive binding configured in `wrangler.toml`.

### Database Commands

| Command | Purpose |
|---------|---------|
| `yarn db:generate` | Generate Drizzle migration files from schema changes |
| `yarn db:migrate` | Apply pending migrations to the database |
| `yarn db:studio` | Open Drizzle Studio (visual database browser) |

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
        exclude: ['<build>', '<files>', '<prerendered>']
      }
    })
  }
};

export default config;
```

The `exclude` list ensures pre-rendered pages are served as static assets while non-prerendered routes (like `/api/stats/`) are handled by the Cloudflare Worker runtime.

### Pre-rendering

Base pages are pre-rendered at build time for maximum performance:

```typescript
// src/routes/+layout.ts
export const prerender = true;
```

Individual routes can opt out of pre-rendering by setting `export const prerender = false` when they need SSR. Server endpoints (`+server.ts`) without an explicit `prerender = true` are automatically server-rendered.

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

## 5. Wrangler Configuration

The project includes a `wrangler.toml` for Cloudflare Pages configuration:

```toml
name = "arbenger"
compatibility_date = "2026-05-09"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".svelte-kit/cloudflare"

[[hyperdrive]]
binding = "HYPERDRIVE"
id = "<hyperdrive-config-id>"
localConnectionString = "<neon-connection-string-for-local-dev>"
```

Key settings:
- **`nodejs_compat`** — Required because SvelteKit uses `node:async_hooks` internally. Without this flag, the Worker throws runtime errors.
- **`pages_build_output_dir`** — Points Wrangler to the adapter-cloudflare output directory.
- **`[[hyperdrive]]`** — Cloudflare Hyperdrive binding for PostgreSQL connection pooling. The `id` references the Hyperdrive config created via `npx wrangler hyperdrive create`. The `localConnectionString` is used during local dev/builds (production uses the Hyperdrive-managed connection).

### Database Infrastructure

| Service | Purpose |
|---------|---------|
| **Neon PostgreSQL** | Serverless Postgres database (AWS Singapore) |
| **Cloudflare Hyperdrive** | Connection pooling proxy between Workers and Neon |
| **Drizzle ORM** | Type-safe query builder and migration tool |

The database client (`src/lib/server/db/index.ts`) uses `postgres` (postgres.js) with `prepare: false` (required for Hyperdrive since prepared statements are connection-specific). The schema is defined in `src/lib/server/db/schema.ts` and migrations live in `drizzle/`.

---

## 6. Cloudflare Pages Setup

### Option A: CLI Deploy (Current Setup)

The project is configured for direct CLI deployment via Wrangler:

```bash
yarn deploy
```

This runs `vite build && wrangler pages deploy .svelte-kit/cloudflare --project-name arbenger --branch main`.

The `--branch main` flag is required because the local branch name may differ from Cloudflare's production branch. Without it, deployments go to preview instead of production.

### Option B: Git Integration

1. Log into Cloudflare Dashboard → Workers & Pages → Create → Import an existing Git repository
2. Select the GitHub repository and choose **SvelteKit** as the framework preset
3. Cloudflare auto-detects the build command and output directory
4. Every push to `main` triggers automatic production deployment
5. Pull requests generate preview deployments with unique URLs

### Verify

After deploy:
1. Visit `https://arbenger.com` to verify the site works
2. Check the `*.pages.dev` preview URL as well
3. Check all pages render correctly
4. Test dark/light theme toggle
5. Verify responsive design on mobile

---

## 7. DNS Configuration

### Nameservers (Completed)

The domain `arbenger.com` is registered on Hostinger with nameservers pointed to Cloudflare:

| Nameserver |
|------------|
| `celeste.ns.cloudflare.com` |
| `jack.ns.cloudflare.com` |

The Hostinger nameservers (`artemis.dns-parking.com`, `hermes.dns-parking.com`) were replaced during initial setup.

### DNS Records

Cloudflare manages DNS. The Pages custom domain creates a CNAME record automatically:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `arbenger.com` | `arbenger.pages.dev` | Proxied |

### Custom Domain in Cloudflare Pages

Custom domain `arbenger.com` is attached to the `arbenger` Pages project. Cloudflare created the DNS record automatically — do not manually add CNAME records for `*.pages.dev` before associating in the Pages dashboard (causes 522 errors).

---

## 8. SSL & Security

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

## 9. Domain Redirects

| From | To | Type |
|------|-----|------|
| `www.arbenger.com` | `arbenger.com` | 301 (permanent) |
| `http://arbenger.com` | `https://arbenger.com` | 301 (automatic via "Always Use HTTPS") |
| `http://www.arbenger.com` | `https://arbenger.com` | 301 (chained) |

Configured via Cloudflare Page Rules or Redirect Rules.

---

## 10. Deployment Pipeline

### Production (CLI)

```
yarn deploy → vite build → wrangler pages deploy → Live at arbenger.com
```

Typical build time: 20-35 seconds.

### Production (Git Integration — if configured)

```
Push to main → Cloudflare detects → yarn install → yarn build → Deploy to edge (300+ locations)
```

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

## 11. Monitoring

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

## 12. Post-Launch Checklist

After the first production deployment:

- [ ] Site loads at `https://arbenger.com`
- [ ] `www.arbenger.com` redirects to `arbenger.com`
- [ ] HTTP redirects to HTTPS
- [ ] All 16 pages render correctly (home, about, products, contact, privacy, terms, cookies, products/image-resizer, products/image-compressor, products/color-picker, products/sound-booster, blog, blog/browser-volume-beyond-100, blog/color-picker-without-tracking, blog/resize-crop-convert-in-browser, blog/compress-images-90-smaller)
- [ ] `/api/stats/` returns JSON (GET returns `{ totalProcessed: N }`, accepts `?toolId=` param)
- [ ] Image resizer and compressor stats counters display at page bottom
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
