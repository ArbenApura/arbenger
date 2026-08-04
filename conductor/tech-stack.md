# Tech Stack — Arbenger

## Languages

| Language | Version | Usage |
|----------|---------|-------|
| TypeScript | 5.9+ (strict) | All application code |

## Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| SvelteKit | 2.x | Meta-framework (file-based routing, SSR/SSG, adapters) |
| Svelte | 4.x | UI framework — **Svelte 4 syntax only** (export let, $:, stores, slots, onMount/onDestroy). No runes. |
| TailwindCSS | 4.x | Utility-first styling via `@tailwindcss/vite` plugin |
| Vite | 5.x | Build tool and dev server |

### Frontend Libraries

| Package | Purpose |
|---------|---------|
| `clsx` + `tailwind-merge` | Dynamic class composition via `cn()` utility |
| `lucide-svelte` | Icon library |
| `svelte-sonner` | Toast notifications |
| `tippy.js` | Tooltips |
| `jszip` | Batch ZIP export |
| `upng-js` | PNG compression via color quantization |
| `nanoid` | Unique ID generation |

## Infrastructure

| Service | Purpose |
|---------|---------|
| Cloudflare Pages | Edge deployment (300+ locations), auto-SSL, preview deploys |
| Wrangler | CLI deployment and local dev |

## Package Manager

Yarn Classic (1.x) — `yarn.lock` tracked in git. Always use `yarn` commands, never `npm`.

## Dev Tools

| Tool | Purpose |
|------|---------|
| Prettier | Code formatting (`prettier-plugin-svelte` + `prettier-plugin-tailwindcss`) |
| svelte-check | TypeScript + Svelte type checking |
| GitHub CLI (`gh`) | PR and issue management |

## Key Conventions

- Dev server on **port 8000** (not default 5173)
- Default pre-rendering at layout level (`export const prerender = true`)
- Route-local `_components/` and `_lib/` for tool-specific code
- SvelteKit group routes `(utilities)/` for product tools
- Self-hosted fonts (Space Mono, Satoshi, JetBrains Mono)
- Domain: `arbenger.com` (Hostinger → Cloudflare DNS)
