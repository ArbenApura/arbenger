# Data Models

**Last updated:** 2026-05-10

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
    productCount: 1
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
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
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

## 6. Image Resizer Data (Route-Local)

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

## 7. Theme Data

### Type

```typescript
export type Theme = 'dark' | 'light';
```

### Store Shape

The theme store is a simple `writable<boolean>` (`isDark`). See `src/lib/stores/theme.ts` and the state-management architecture doc for details.

---

## 8. Data Flow

```
src/lib/data/products.ts     → Product catalog data (static)
       ↓
src/lib/types/index.ts       → TypeScript interfaces
       ↓
src/routes/+page.svelte      → Homepage (featured products)
src/routes/products/+page.svelte  → Full catalog grid
       ↓
src/lib/components/           → UI components receive typed props
```

Data is **static at build time** for the base site. No database, no API calls. Products are defined in TypeScript files and imported directly into route components.

When dynamic data is needed (future), the pattern extends:
- `+page.server.ts` load functions fetch from database/API
- Same TypeScript interfaces used for type safety
- Components receive data via the same props
