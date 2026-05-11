# Data Models

**Last updated:** 2026-05-11

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
    description: 'Image tools, code formatters, converters, and other browser-based utilities.',
    icon: 'wrench',
    productCount: 2
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
    productCount: 0
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
  }
];
```

Note: The `misc-tools` category is sorted first because it has live products. The category `id` remains `misc-tools` for backwards compatibility, but the display `name` is "Utilities".

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
// src/lib/data/navigation.ts (or inline in layout)

export const navLinks: NavLink[] = [
  { label: 'Products', href: '/products/' },
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
  { platform: 'GitHub', url: 'https://github.com/arbenger', icon: 'github' },
];
```

Social links are used in the Footer and Contact page.

---

## 5. Locale Data

### Interface

```typescript
export interface Locale {
  code: string;
  label: string;
  flag: string;
  enabled: boolean;
}
```

### Data

```typescript
// src/lib/data/locales.ts

export const locales: Locale[] = [
  { code: 'en-US', label: 'English (US)', flag: 'us', enabled: true },
  { code: 'es', label: 'Español', flag: 'es', enabled: false },
  { code: 'fr', label: 'Français', flag: 'fr', enabled: false },
  { code: 'ja', label: '日本語', flag: 'jp', enabled: false },
];

export const defaultLocale = 'en-US';
```

Locale data is used by `LanguageSelector.svelte` (navbar + footer) and `locale` store. The `flag` field maps to inline SVG flag definitions inside the LanguageSelector component.

### Adding a New Locale

1. Add the locale object to the `locales` array in `src/lib/data/locales.ts`
2. Add the SVG flag paths to the `FLAGS` constant in `src/lib/components/layout/LanguageSelector.svelte`
3. Set `enabled: true` when translations are ready (or `false` with "Soon" badge)
4. The locale automatically appears in the dropdown on both navbar and footer

---

## 6. Blog Data

### Interfaces

```typescript
// src/lib/types/index.ts

export type BlogCategory = 'tutorial' | 'devlog' | 'release' | 'opinion';

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
  { id: 'devlog', label: 'Dev Logs' },
  { id: 'release', label: 'Releases' },
  { id: 'opinion', label: 'Opinion' },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-use-image-resizer',
    title: 'How to Use Arbenger Image Resizer — The Complete Guide',
    description: 'Learn how to resize, crop, and batch-convert images directly in your browser...',
    date: '2026-05-10',
    category: 'tutorial',
    tags: ['image-resizer', 'guide', 'tools'],
    readTime: 8,
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

## 7. Image Resizer Data (Route-Local)

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

## 8. Stats Data (Server-Side)

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

## 9. Theme Data

### Type

```typescript
export type Theme = 'dark' | 'light';
```

### Store Shape

The theme store is a simple `writable<boolean>` (`isDark`). See `src/lib/stores/theme.ts` and the state-management architecture doc for details.

---

## 10. Data Flow

```
STATIC (build time):
src/lib/data/products.ts     → Product catalog data
src/lib/data/blog.ts         → Blog post registry
       ↓
src/lib/types/index.ts       → TypeScript interfaces
       ↓
src/routes/+page.svelte      → Homepage (featured products)
src/routes/products/+page.svelte  → Full catalog grid
src/routes/blog/+page.svelte → Blog listing (filtered, paginated)
src/routes/blog/[slug]/      → Blog post (loaded via import.meta.glob)
       ↓
src/lib/components/           → UI components receive typed props

DYNAMIC (runtime):
Client (store.ts trackStats)  → POST /api/stats/  → Hyperdrive → Neon PostgreSQL
Client (page onMount fetch)   → GET /api/stats/   → Hyperdrive → Neon PostgreSQL
```

Most data is **static at build time**. Products and blog posts are defined in TypeScript files and imported directly into route components.

The stats system is the first **dynamic data path**: the image resizer page fetches the lifetime count on mount via `GET /api/stats/` and tracks each resize via `POST /api/stats/`. Both requests flow through Cloudflare Hyperdrive to Neon PostgreSQL. The API endpoint (`src/routes/api/stats/+server.ts`) uses Drizzle ORM for type-safe queries.
