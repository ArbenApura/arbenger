# Personal Portfolio Redesign — arbenger.com

- **Date:** 2026-08-04
- **Status:** Approved design (pending user review)
- **Scope:** Convert the company website (arbenger.com) into a personal portfolio for Arben M. Apura, keeping the Arbenger brand as the studio/tool identity.

## 1. Goals & Success Criteria

1. The site reads as a personal portfolio, not a company site: "Arben M. Apura — Full-Stack Web Developer".
2. Arbenger remains the brand behind the 5 live tools (logo, wordmark, tool pages untouched in identity).
3. All 4 featured projects are present with their images; minor tools grid links to the 5 live tools.
4. All company-era surfaces removed: newsletter, language selector, cookie banner, legal pages, products catalog.
5. `yarn check` and `yarn build` pass; site deploys to Cloudflare Pages without error.
6. Every page updated: home, about, projects (new), blog, contact, project detail pages (new).

## 2. Branding & Identity

| Element | Change |
|---|---|
| Hero name | "Arben M. Apura" (Space Mono, largest H1) |
| Hero headline | "Full-Stack Web Developer" + typewriter phrases (e.g. "SvelteKit & Next.js", "Clean, efficient web apps", "Tools that do the job") |
| Navbar | Unchanged: Arbenger logo + wordmark (studio brand). Nav links become Home, Projects, Blog, About, Contact |
| Meta titles | `Arben Apura — Full-Stack Web Developer` pattern; per-page suffixes |
| JSON-LD | Organization → **Person** (name, url, jobTitle, email, telephone, address/city, sameAs: GitHub + Facebook) |
| Twitter meta | Remove `twitter:site @arbenger` (no X account provided); keep Twitter Card tags without handle |
| Social links | GitHub `github.com/ArbenApura` (was `github.com/arbenger`), add Facebook `facebook.com/arbenapura.official` |
| Contact data | `arbenapura.official@gmail.com`, phone `+63 976 430 4619`, San Jose Del Monte, Bulacan, Philippines |
| Availability | "Available for freelance work" badge/CTA on hero and contact |

## 3. Site Map

```
/                              Home
/about                         Personal about
/projects                      Featured + minor project grids  (NEW page)
/projects/door-lock-module     Featured project detail         (NEW)
/projects/top-one-uwu          Featured project detail         (NEW)
/projects/calculus-courseware  Featured project detail         (NEW)
/projects/exemplary-league-portal  Featured project detail     (NEW)
/products/<tool-slug>          Existing 5 tool pages — UNCHANGED routes (SEO preserved)
/blog, /blog/[slug]            Kept; intro reframed as dev log
/contact                       Contact cards (mailto, phone, socials)
/sitemap.xml                   Updated (removed legal, products; added projects)
/api/stats                     Kept (powers tool counters)
```

### Home (`/`)

1. **Hero** — particle background kept. Name + headline + typewriter + "Available for work" badge + CTAs (View Projects / Get in Touch)
2. **Featured Projects** — 4 cards (cover image, year, category badge, short description, link to detail page)
3. **Minor tools strip** — "Small tools I've shipped" — 5 compact cards linking to live tool pages (reuses existing FeaturedTool visual style, simplified)
4. **Skills** — grouped skill strip (from skills list; frontend / backend / mobile / hosting / AI)
5. **About teaser** — personal summary excerpt + "More about me" → /about
6. **Contact CTA** — existing GeometricDivider + "Let's build something" + Get in Touch

### About (`/about`)

- H1 "About Me" + professional summary (verbatim from user)
- **Work timeline** — UniStar.BG Ltd, Remote Full-Stack Web Developer, 01/2025–06/2026, 4 bullet responsibilities
- **Education** — Bulacan State University (BS IT, Magna Cum Laude, 2025); San Jose del Monte National Trade School (HS, 2021)
- **Accomplishment** — IPOPHL-registered "Door Lock Module" capstone (Feb 2026) — cross-link to project
- **Languages** — Filipino (Native), English (Proficient)
- **Skills detail** — full grouped list (HTML, CSS, TypeScript, Node.js, PHP, MySQL, Next.js, SvelteKit, Tailwind, Git, ORM; back-end: Supabase, Firebase, PocketBase; mobile: Capacitor, PWA, Play Store; hosting: Vercel, Render, Plesk, Webuzo, Nginx, VPS; AI: OpenAI API, LLM prompt engineering)

### Projects (`/projects`, NEW)

- Hero "Projects" + intro
- **Featured Projects** grid — 4 cards from `docs/content/projects/*` data (cover, title, year, category, role, short description, links: press/article where present)
- **Minor Projects** — "Small tools I've shipped (still live)" — 5 compact cards → `/products/<slug>`; note which are Chrome extensions
- CollectionPage + ItemList JSON-LD

### Project detail pages (`/projects/<slug>`, NEW)

Shared template with sections per project data: problem, solution, key features, tech stack, gallery, links, recognition. Route-level data from `src/lib/data/projects.ts`.

- **door-lock-module** — placeholder cover; gallery none; video via Google Drive iframe embed (`/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/preview`); downloadable research paper PDF (IMRAD); IPOPHL badge; links: TBD GitHub
- **top-one-uwu** — cover + 1 screenshot (TopOneUwu-1/2.png); press section quoting Inquirer.net article (link); 7 features; stack
- **calculus-courseware** — cover + 1 screenshot; client work; stack Next.js/React/Firebase
- **exemplary-league-portal** — cover + 2 screenshots; VP role note

### Contact (`/contact`)

- H1 "Say Hello" / "Let's build something"
- Cards: Email (mailto), Phone (tel:), GitHub, Facebook — matches existing card style
- Location line: San Jose Del Monte, Bulacan, Philippines (Remote-friendly)
- "Available for freelance work" note
- ContactPage JSON-LD (Person-based, email/telephone)

### Blog

- Intro copy: dev log / lessons learned ("Writing about building things")
- 5 existing posts untouched. Category label stays "Tutorials" (posts remain tutorials; new posts can be dev-log style)

## 4. Data Layer

**New `src/lib/data/projects.ts`** — featured projects array (slug, name, year, category, role, status, description, features[], stack[], links{}, recognition, images{cover, screenshots[], video, pdf}). Populated from the content collection (`docs/content/projects/*/project.md` + images in `static/projects/<slug>/`).

**Images:** copy project images to `static/projects/<slug>/cover.png` + `screenshot-N.png` during implementation (renaming the as-uploaded filenames per the docs/content/projects.md convention). Missing covers use an inline SVG placeholder generated in the site's design language (navy bg, cyan glow, Space Mono monogram/initials).

**`products.ts`** — unchanged (minor tools). Category labels for the minor grid map to current product categories; Chrome extension badge derives from `category === 'chrome-plugins'`.

**Stores:** remove `locale.ts` (language selector removed). Keep `theme.ts`, `viewport.ts`, `layout.ts`.

## 5. Removals & Cleanup

| Removed | Notes |
|---|---|
| Newsletter.svelte + homepage section | Non-functional form |
| LanguageSelector.svelte + locale store | en-US only |
| CookieBanner.svelte + consent key | No tracking on site |
| /privacy /terms /cookies routes | Company legal; not needed for personal site |
| /products catalog page | Redirect `/products/` → `/projects/` via `_redirects` |
| Products mega menu | Replace with a plain "Projects" nav link → /projects (dropdown removed) |
| Roadmap.svelte / TechStack.svelte / GridBackground.svelte | Dead components; remove while touching home components |
| twitter:site meta | No X account |

**Kept:** stats API (`/api/stats` + Neon/Drizzle), theme toggle, particle background, GeometricDivider, reveal/parallax actions, blog infra, error page, sitemap infra, _redirects (update).

## 6. Copy Style

All new copy first-person ("I build…", "I developed…"). Tone matches existing: concise, confident, no hype. Professional summary used verbatim on About.

## 7. SEO

- Person JSON-LD sitewide replacements (Organization → Person for pages that had it; Article author already Organization-based → Person)
- Per-page: meta titles/descriptions updated; canonical unchanged pattern
- sitemap.xml: static pages array updated (remove legal/products, add projects + project details)
- og:image: keep existing for now; note that a new "Arben Apura" og-image can be generated later

## 8. Verification

1. `yarn check` — type errors
2. `yarn build` — production build succeeds (prerender all pages incl. project detail pages)
3. Dev server manual pass: nav, theme toggle, all links, tool pages still functional, video embed + PDF download on door-lock page
4. Confirm /products redirects to /projects

## 9. Out of Scope

- i18n / multi-language
- Newsletter or contact-form backend
- New blog posts (structure only)
- New major projects (added later via `docs/content/projects/<slug>/` + data file)
- New og-image / favicon refresh (follow-up)
- Chrome extension code in `extensions/` (unchanged)

## 10. Open Items (resolved during implementation)

- GitHub repo links for door-lock-module (TBD) → omit link if not provided
- Top One Uwu GitHub link (TBD) → omit if not provided
- Courseware screenshots: 1.7 MB cover — resize/compress to web-friendly (~300 KB) during implementation
