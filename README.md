# arbenger.com

Company website for [Arbenger](https://arbenger.com).

## Stack

- **Framework:** SvelteKit + Svelte 4
- **Styling:** Tailwind CSS v4
- **Hosting:** Cloudflare Pages
- **Package manager:** Yarn

## Setup

```bash
git clone git@github.com:Arbenger/arbenger.com.git
cd arbenger.com
yarn install
yarn dev
```

Dev server runs on [localhost:8000](http://localhost:8000).

## Scripts

| Command | Purpose |
|---------|---------|
| `yarn dev` | Start dev server on port 8000 |
| `yarn build` | Production build |
| `yarn preview` | Preview production build locally |
| `yarn check` | TypeScript + Svelte type checking |
| `yarn format` | Format with Prettier |
| `yarn deploy` | Build and deploy to Cloudflare Pages |

## Project Structure

```
src/
  routes/              # Pages (home, about, products, contact, privacy, terms, cookies)
  lib/
    components/
      layout/          # Navbar, Footer, ThemeToggle, LanguageSelector, CookieBanner
      home/            # Hero, ProductCategories, AboutTeaser, ParticleBackground, Newsletter
      ui/              # Button, Card, Badge, Logo, Typewriter, SectionLabel
      seo/             # MetaTags, JsonLd
    stores/            # theme.ts, locale.ts
    data/              # products.ts, navigation.ts, locales.ts
    types/             # TypeScript interfaces
    utils/             # cn.ts (clsx + tailwind-merge)
    actions/           # reveal.ts, parallax.ts
  app.css              # Global styles, fonts, animations, scrollbar theming
  app.html             # HTML shell with theme init and font preloading
docs/                  # Guidelines, architecture, changelog, specs
```

## Documentation

Full documentation lives in `docs/`:

- `docs/guidelines/` -- Design system, component conventions, SEO standards, deployment
- `docs/architecture/` -- Routing, data models, state management
- `docs/changelog/` -- All changes and decisions
