# Changelog

All notable decisions, changes, and milestones for arbenger.com are documented here.

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
