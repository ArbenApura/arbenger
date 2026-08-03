# Data Models

**Last updated:** 2026-08-04

This document defines the TypeScript interfaces and data structures used across arbenger.com. All data types live in `src/lib/types/index.ts`.

---

## 1. Product Data

### Interfaces

```typescript
// src/lib/types/index.ts

export type ProductCategory =
  | 'vscode-extensions'
  | 'chrome-plugins'
  | 'ai-tools'
  | 'misc-tools'
  | 'saas';

export type ProductStatus = 'coming-soon' | 'live' | 'beta' | 'deprecated';

export type ProductPlatform =
  | 'vscode-marketplace'
  | 'chrome-web-store'
  | 'web'
  | 'desktop'
  | 'mobile';

export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  category: ProductCategory;
  status: ProductStatus;
  platform: ProductPlatform;
  externalUrl?: string;
  icon?: string;
  screenshot?: string;
  tags: string[];
  launchDate?: string;
  featured: boolean;
}

export interface ProductCategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}
```

### Category Display Data

```typescript
// src/lib/data/products.ts

import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
  {
    id: 'misc-tools',
    name: 'Utilities',
    description: 'Image tools, code editors, converters, and other browser-based utilities.',
    icon: 'wrench',
    productCount: 3
  },
  {
    id: 'vscode-extensions',
    name: 'VS Code Extensions',
    description: 'Tools and add-ons for Visual Studio Code.',
    icon: 'code',
    productCount: 0
  },
  {
    id: 'chrome-plugins',
    name: 'Chrome Plugins',
    description: 'Browser extensions that work inside Chrome.',
    icon: 'chrome',
    productCount: 2
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'Software that uses AI to get things done.',
    icon: 'brain',
    productCount: 0
  },
  {
    id: 'saas',
    name: 'SaaS Products',
    description: 'Web apps you can use from anywhere.',
    icon: 'rocket',
    productCount: 0
  }
];

export const products: Product[] = [
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize, crop, and convert images in your browser. Batch processing, presets, and zero uploads.',
    category: 'misc-tools',
    status: 'live',
    platform: 'web',
    externalUrl: '/products/image-resizer',
    tags: ['image', 'resize', 'converter', 'free'],
    featured: false
  },
  {
    slug: 'image-compressor',
    name: 'Image Compressor',
    description: 'Compress PNG, JPEG, and WebP images up to 90% smaller. Quality slider, target size mode, and live before/after preview.',
    category: 'misc-tools',
    status: 'live',
    platform: 'web',
    externalUrl: '/products/image-compressor',
    tags: ['image', 'compress', 'optimize', 'free'],
    featured: false
  },
  {
    slug: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors from any webpage. HEX, RGB, HSL, OKLCH formats. Color harmonies, WCAG contrast checker, color blindness simulation, and shade generator.',
    category: 'chrome-plugins',
    status: 'live',
    platform: 'chrome-web-store',
    externalUrl: '/products/color-picker',
    tags: ['color', 'eyedropper', 'design', 'free'],
    featured: false
  },
  {
    slug: 'sound-booster',
    name: 'Sound Booster',
    description: 'Boost audio beyond 100% on any tab. Per-tab volume up to 600%, 5-band equalizer, presets, keyboard shortcuts.',
    category: 'chrome-plugins',
    status: 'live',
    platform: 'chrome-web-store',
    externalUrl: '/products/sound-booster',
    tags: ['audio', 'volume', 'equalizer', 'free'],
    featured: true
  },
  {
    slug: 'html-editor',
    name: 'HTML Editor',
    description: 'Write HTML, CSS, and JavaScript with live preview, Prettier formatting, inline error detection, Emmet support, and responsive device preview. 100% client-side.',
    category: 'misc-tools',
    status: 'live',
    platform: 'web',
    externalUrl: '/products/html-editor',
    tags: ['html', 'css', 'javascript', 'editor', 'code', 'free'],
    featured: true
  }
];
```

Note: The `misc-tools` category is sorted first because it has live products (3 utilities). The `chrome-plugins` category has two live products (Color Picker and Sound Booster). The category `id` remains `misc-tools` for backwards compatibility, but the display `name` is "Utilities".

### Adding a New Product

To add a product to the site:

1. Add the product object to the `products` array in `src/lib/data/products.ts`
2. Update the `productCount` in the relevant category
3. If the product has `status: 'live'`, add an `externalUrl` pointing to its platform page
4. If `featured: true`, the product appears on the homepage
5. The product automatically appears on the `/products` page grid
6. Create `/products/[slug]` page content when ready

---

## 2. SEO Data

### Interfaces

```typescript
export interface PageMeta {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
}

export interface JsonLdSchema {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}
```

### Per-Page Meta Data

Each page defines its own meta data inline via the `MetaTags` component props. There is no central meta data file — this keeps meta content co-located with the page it describes.

---

## 3. Navigation Data

### Interface

```typescript
export interface NavLink {
  label: string;
  href: string;
}
```

### Data

```typescript
// src/lib/data/navigation.ts

export const navLinks: NavLink[] = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];
```

Navigation data is shared between `Navbar.svelte` and `Footer.svelte` to maintain consistency.

---

## 4. Social Links

### Interface

```typescript
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

### Data

```typescript
export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/ArbenApura', icon: 'github' },
  { platform: 'Facebook', url: 'https://www.facebook.com/arbenapura.official', icon: 'facebook' },
];
```

Social links are used in the Footer and Contact page.

---

## 5. Locale Data

The locale layer (LanguageSelector, locales data, locale store) was removed on 2026-08-04 — the site is English-only.

---

## 6. Blog Data

### Interfaces

```typescript
// src/lib/types/index.ts

export type BlogCategory = 'tutorial';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;           // ISO 8601: '2026-05-10'
  updatedDate?: string;   // ISO 8601, for Article schema dateModified
  category: BlogCategory;
  tags: string[];
  readTime: number;       // minutes, integer
  coverImage?: string;    // absolute URL or /path from static/
  featured: boolean;
}

export interface BlogCategoryInfo {
  id: BlogCategory;
  label: string;
}
```

### Data

```typescript
// src/lib/data/blog.ts

export const POSTS_PER_PAGE = 9;

export const blogCategories: BlogCategoryInfo[] = [
  { id: 'tutorial', label: 'Tutorials' },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'html-css-js-editor-in-browser',
    title: 'Write HTML, CSS & JS with Live Preview — No Signup, No Server',
    description: 'Prettier formatting, inline error detection, Emmet abbreviations, responsive device preview...',
    date: '2026-05-25',
    category: 'tutorial',
    tags: ['html-editor', 'guide', 'tools'],
    readTime: 6,
    featured: true,
  },
  {
    slug: 'browser-volume-beyond-100',
    title: 'Browser Volume Stops at 100%. Ours Goes to 600%.',
    description: 'Volume boost, 5-band EQ, seven presets, keyboard shortcuts, and a live peak meter...',
    date: '2026-05-21',
    category: 'tutorial',
    tags: ['sound-booster', 'chrome-extension', 'guide'],
    readTime: 7,
    featured: true,
  },
  {
    slug: 'color-picker-without-tracking',
    title: "Your Color Picker Extension Probably Reads Your Browsing Data. Ours Doesn't.",
    description: 'Eyedropper, WCAG contrast checker, color blindness simulation...',
    date: '2026-05-19',
    updatedDate: '2026-05-21',
    category: 'tutorial',
    tags: ['color-picker', 'chrome-extension', 'guide'],
    readTime: 8,
    featured: true,
  },
  {
    slug: 'resize-crop-convert-in-browser',
    title: 'Resize, Crop, and Batch-Convert Images Without Uploading Anything',
    description: 'Single image or 50 at once — resize, crop, rotate, and convert...',
    date: '2026-05-10',
    updatedDate: '2026-05-21',
    category: 'tutorial',
    tags: ['image-resizer', 'guide', 'tools'],
    readTime: 8,
    featured: true,
  },
  {
    slug: 'compress-images-90-smaller',
    title: 'Compress Images 90% Smaller Without Visible Quality Loss',
    description: 'Quality slider, target file size mode, before/after comparison...',
    date: '2026-05-11',
    updatedDate: '2026-05-21',
    category: 'tutorial',
    tags: ['image-compressor', 'guide', 'tools'],
    readTime: 7,
    featured: true,
  },
];
```

### Helper Functions

| Function | Purpose |
|----------|---------|
| `sortedPosts` | Pre-sorted array (newest first) |
| `getPostBySlug(slug)` | Find a post by its slug |
| `getCategoryLabel(id)` | Get display label for a category ID |
| `formatPostDate(iso)` | Format ISO date as "Month Day, Year" (en-US locale) |

### Adding a New Blog Post

1. Add the post object to `blogPosts` array in `src/lib/data/blog.ts`
2. Create content file at `src/routes/blog/[slug]/_posts/{slug}.svelte`
3. Sitemap, listing page, and `[slug]` route auto-update from the registry

---

## 7. Portfolio Project Data

### Interface

```typescript
// src/lib/types/index.ts

export interface PortfolioProject {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  category: string;
  role: string;
  status: string;
  recognition?: string;
  summary: string;
  problem?: string;
  solution?: string;
  features: string[];
  stack: string[];
  links: { label: string; url: string }[];
  cover?: string;
  screenshots?: string[];
  video?: { embedUrl: string; title: string };
  pdf?: { path: string; label: string };
}
```

### Data

```typescript
// src/lib/data/projects.ts

export const projects: PortfolioProject[] = [
  {
    slug: 'door-lock-module',
    name: 'Door Lock Module',
    tagline: 'Smart door lock with RFID and face recognition for a university faculty room.',
    year: '2026',
    category: 'IoT · Web App',
    role: 'Proponent · full-stack & hardware',
    status: 'Completed',
    recognition: 'Registered with IPOPHL · Feb 2026',
    summary: 'Capstone for Bulacan State University: an Arduino-powered smart door lock...',
    features: ['RFID authentication from two readers', 'Face recognition through the web interface', '...'],
    stack: ['SvelteKit', 'Supabase', 'Face API JS', 'Arduino Mega 2560', 'ESP8266 NodeMCU', 'RFID RC522', 'Vercel'],
    links: [{ label: 'Video demo', url: 'https://drive.google.com/...' }],
    video: { embedUrl: 'https://drive.google.com/.../preview', title: 'Door Lock Module demo' },
    pdf: { path: '/projects/door-lock-module/IMRAD-...-SC.pdf', label: 'Research paper (IMRAD)' },
  },
  // ... top-one-uwu, calculus-courseware, exemplary-league-portal
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return projects.find((p) => p.slug === slug);
}
```

The `projects` array is the single source of truth for the `/projects` listing and the `/projects/[slug]` detail pages (which enumerate all slugs via `entries()` for prerendering). Covers, screenshots, and PDFs are served from `static/projects/<slug>/`.

### Skills Data

```typescript
// src/lib/data/skills.ts

export interface SkillGroup {
  name: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { name: 'Frontend', skills: ['JavaScript / TypeScript', 'SvelteKit', 'Svelte', 'Next.js', 'React', 'Tailwind CSS', 'SCSS / CSS', 'HTML'] },
  { name: 'Backend', skills: ['Node.js', 'Supabase', 'Firebase', 'PocketBase', 'MySQL', 'PHP', 'ORM'] },
  { name: 'Mobile', skills: ['Capacitor', 'Progressive Web Apps', 'Google Play deployment'] },
  { name: 'Hosting & DevOps', skills: ['Vercel', 'Render', 'Cloudflare Pages', 'Plesk', 'Webuzo', 'Nginx', 'VPS'] },
  { name: 'AI & APIs', skills: ['OpenAI API', 'LLM prompt engineering', 'REST APIs'] },
];
```

`skillGroups` feeds the skills sections on the home and about pages.

---

## 8. Image Resizer Data (Route-Local)

These types are defined in `src/routes/products/(utilities)/image-resizer/_lib/store.ts`, not in the shared `src/lib/types/` file, because they are only used by the image resizer tool.

### Core Types

```typescript
export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';
export type ResizeAlgorithm = 'smooth' | 'pixelated';
export type FitMode = 'stretch' | 'contain' | 'cover';
export type ProcessingState = 'idle' | 'loading' | 'resizing' | 'downloading' | 'exporting';
export type NamingPattern = 'sequential' | 'prefix-original' | 'original-suffix' | 'number-only' | 'template';
```

### Interfaces

```typescript
export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageEntry {
  id: string;
  file: File;
  originalWidth: number;
  originalHeight: number;
  originalSize: number;
  thumbnailUrl: string;
  bitmap: ImageBitmap | null;
}

export interface ResizeSettings {
  width: number;
  height: number;
  lockAspect: boolean;
  fitMode: FitMode;
  format: ImageFormat;
  quality: number;
  algorithm: ResizeAlgorithm;
  bgColor: string;
  bgTransparent: boolean;
  filename: string;
}

export interface ResizeResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface BatchResizeSettings {
  width: number;
  height: number;
  lockAspect: boolean;
  fitMode: FitMode;
  format: ImageFormat;
  quality: number;
  algorithm: ResizeAlgorithm;
  bgColor: string;
  bgTransparent: boolean;
}
```

### Preset Data

```typescript
export interface PresetGroup {
  label: string;
  presets: { label: string; width: number; height: number }[];
}
```

Preset groups: Social Media (Instagram, Twitter/X, YouTube, LinkedIn, Facebook), Screens (HD, Full HD, 4K), App Icons (16-512px).

Scale options: 25%, 50%, 75%, 100%, 125%, 150%, 200%, 300%.

### Worker Message Types

The worker (`_lib/worker.ts`) uses its own local types for the message protocol:

```typescript
type ResizeRequest = {
  type: 'resize';
  id: string;
  bitmap: ImageBitmap;
  width: number;
  height: number;
  format: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number;
  smoothing: boolean;
  smoothingQuality: 'low' | 'medium' | 'high';
  bgColor: string | null;
  fitMode: FitMode;
  crop: CropData | null;
};

type ResizeResult = {
  type: 'result';
  id: string;
  blob: Blob;
  width: number;
  height: number;
  size: number;
};

type ResizeError = {
  type: 'error';
  id: string;
  message: string;
};
```

---

## 9. Stats Data (Server-Side)

These types are defined in `src/lib/server/db/schema.ts` using Drizzle ORM. They represent the database schema, not client-side TypeScript interfaces.

### Drizzle Schema

```typescript
// src/lib/server/db/schema.ts
import { pgTable, text, bigint, timestamp } from 'drizzle-orm/pg-core';

export const toolStats = pgTable('tool_stats', {
  toolId: text('tool_id').primaryKey(),
  totalProcessed: bigint('total_processed', { mode: 'number' }).notNull().default(0),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
```

### Database Client

```typescript
// src/lib/server/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export function createDb(connectionString: string) {
  const sql = postgres(connectionString, { prepare: false });
  return drizzle(sql, { schema });
}
```

The `prepare: false` option is required because Cloudflare Hyperdrive pools connections across Worker invocations, and prepared statements are connection-specific.

### API Response Shape

```typescript
// GET /api/stats/
{ totalProcessed: number }

// POST /api/stats/ (request body)
{ toolId?: string; count?: number }

// POST /api/stats/ (response)
{ success: boolean }
```

### Security

- **`toolId` allowlist** — POST rejects any `toolId` not in `ALLOWED_TOOL_IDS` (`Set(['image-resizer', 'image-compressor'])`) with 400. GET also accepts `?toolId=` query param (defaults to `'image-resizer'`)
- **Count cap** — `count` is clamped to `[1, 10000]` server-side
- **Error handling** — Both GET and POST wrap DB calls in try/catch, returning generic `{ error: 'Service unavailable' }` (503) on failure
- **Rate limiting** — Cloudflare WAF rule: 10 requests per 10 seconds per IP on `POST /api/stats/`

### Client-Side Tracking

The image resizer exports `totalProcessed` (a `Writable<number | null>` store) and `fetchStats()` from `store.ts`. On mount, the page calls `fetchStats()` to populate the store. After each resize, `trackStats(count)` POSTs the increment then calls `fetchStats()` to refresh the displayed count.

---

## 10. Theme Data

### Type

```typescript
export type Theme = 'dark' | 'light';
```

### Store Shape

The theme store is a simple `writable<boolean>` (`isDark`). See `src/lib/stores/theme.ts` and the state-management architecture doc for details.

---

## 11. Data Flow

```
STATIC (build time):
src/lib/data/projects.ts    → Portfolio projects (listing + detail pages)
src/lib/data/products.ts    → Product tool catalog (5 tools at /products/<slug>)
src/lib/data/blog.ts        → Blog post registry
src/lib/data/skills.ts      → Skill groups (home, about)
src/lib/data/navigation.ts  → Nav links + social links (Projects, GitHub ArbenApura, Facebook)
       ↓
src/lib/types/index.ts      → TypeScript interfaces
       ↓
src/routes/+page.svelte     → Homepage (featured projects + minor tools)
src/routes/projects/+page.svelte  → Project listing grid
src/routes/projects/[slug]/ → Project detail (entries() from projects.ts)
src/routes/blog/+page.svelte → Blog listing (filtered, paginated)
src/routes/blog/[slug]/     → Blog post (loaded via import.meta.glob)
       ↓
src/lib/components/          → UI components receive typed props

DYNAMIC (runtime):
Client (store.ts trackStats)  → POST /api/stats/  → Hyperdrive → Neon PostgreSQL
Client (page onMount fetch)   → GET /api/stats/   → Hyperdrive → Neon PostgreSQL
```

Most data is **static at build time**. Products and blog posts are defined in TypeScript files and imported directly into route components.

The stats system is the first **dynamic data path**: the image resizer page fetches the lifetime count on mount via `GET /api/stats/` and tracks each resize via `POST /api/stats/`. Both requests flow through Cloudflare Hyperdrive to Neon PostgreSQL. The API endpoint (`src/routes/api/stats/+server.ts`) uses Drizzle ORM for type-safe queries.
