# arbenger.com

Personal portfolio and dev-log site for [Arben M. Apura](https://arbenger.com) — full-stack developer.

## Stack

- **Framework:** SvelteKit + Svelte 4
- **Styling:** Tailwind CSS v4
- **Hosting:** Cloudflare Pages (fully pre-rendered, no server-side bindings)
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
  routes/              # Pages: home, about, projects (+[slug]), blog (+[slug]), contact, resume
  routes/products/     # Client-side tools (image-resizer, image-compressor, html-editor, extension pages)
  lib/
    components/
      layout/          # Navbar, Footer, ThemeToggle
      home/            # Hero, AboutTeaser, ParticleBackground, FeaturedProjects, MinorTools, Skills
      projects/        # ProjectCard, MinorProjectCard, ProjectCover
      blog/            # BlogCard, BlogPagination, ReadingProgress
      ui/              # Button, Badge, Logo, Typewriter, Select, UploadZone, ColorPicker, ...
      seo/             # MetaTags, JsonLd, Breadcrumbs
    data/              # projects.ts, blog.ts, skills.ts, navigation.ts, products.ts
    stores/            # theme.ts, viewport.ts, layout.ts
    types/             # TypeScript interfaces
    utils/             # cn.ts (clsx + tailwind-merge)
    actions/           # reveal.ts, parallax.ts
  app.css              # Global styles, fonts, animations, scrollbar theming
  app.html             # HTML shell with theme init and font preloading
extensions/            # Chrome extensions (color-picker, sound-booster)
docs/                  # Guidelines, architecture, changelog, specs
```

## Documentation

Full documentation lives in `docs/`:

- `docs/guidelines/` -- Design system, component conventions, SEO standards, deployment
- `docs/architecture/` -- Routing, data models, state management
- `docs/changelog/` -- All changes and decisions
