# Portfolio Projects — Content Collection

Working source-of-truth for portfolio project content (Arben Apura / Arbenger). Each entry becomes a card on `/projects` and optionally a detail page.

**Two tiers:**

- **Featured projects** — major, individually detailed works (capstone, client work, bigger builds). One folder per project under `projects/<slug>/`, containing `project.md` + images.
- **Minor projects** — the 5 live tools from arbenger.com (Image Resizer, Image Compressor, HTML Editor, Color Picker, Sound Booster — the latter two are Chrome extensions). These already exist at `src/routes/products/` and are driven by `src/lib/data/products.ts`; they get a compact "Minor projects" grid on `/projects` and stay live as working tools.

## Folder structure

```
docs/content/projects/
  _template/               # copy this to add a new project
    project.md
  door-lock-module/
    project.md
    cover.png              # card image on /projects grid (16:9, ~1200px wide)
    screenshot-1.png       # detail-page gallery (optional, up to 4)
    screenshot-2.png
```

Image naming is fixed so the build script can find them:

| File | Used for |
|------|----------|
| `cover.png` | Project card on `/projects` + homepage feature (optional — an auto-generated SVG placeholder in the site's design language is used when missing) |
| `screenshot-1.png` … `screenshot-4.png` | Detail-page gallery (optional) |

JPEG/WebP with the same names work too.

## Adding a project

1. Copy `_template/project.md` into a new folder `projects/<slug>/`
2. Fill in the fields
3. Drop `cover.png` (required) and optional `screenshot-N.png` images into the same folder
4. Add a "Featured projects" card entry to `/projects` page data during implementation

---

## Featured projects index

| Slug | Name | Year | Category | Status |
|------|------|------|----------|--------|
| `door-lock-module` | Door Lock Module (ITDS Smart Door Lock System) | 2026 | IoT / Web App | Completed |
| `top-one-uwu` | Top One Uwu (AI study tools directory, featured in Inquirer.net) | 2022 | Web App | Completed |
| `calculus-courseware` | Basic Calculus Courseware (doctoral client, LMS) | 2022 | Web App (e-learning) | Completed |
| `exemplary-league-portal` | ELITS Membership Portal (BulSU SC, built as VP) | 2023 | Web App | Completed |

### Pending

User is compiling more featured projects to add.
