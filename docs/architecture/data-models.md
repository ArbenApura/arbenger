# Data Models

**Last updated:** 2026-05-08

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
    id: 'vscode-extensions',
    name: 'VS Code Extensions',
    description: 'Developer tools and productivity extensions for Visual Studio Code.',
    icon: 'code',
    productCount: 0
  },
  {
    id: 'chrome-plugins',
    name: 'Chrome Plugins',
    description: 'Browser extensions that enhance your web experience.',
    icon: 'chrome',
    productCount: 0
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'Intelligent tools powered by artificial intelligence.',
    icon: 'brain',
    productCount: 0
  },
  {
    id: 'misc-tools',
    name: 'Misc Tools',
    description: 'Converters, formatters, and everyday utilities.',
    icon: 'wrench',
    productCount: 0
  },
  {
    id: 'saas',
    name: 'SaaS Products',
    description: 'Full-featured applications for teams and individuals.',
    icon: 'rocket',
    productCount: 0
  }
];

export const products: Product[] = [
  // PRODUCTS ADDED HERE AS THEY LAUNCH
  // {
  //   slug: 'ai-wiki-reader',
  //   name: 'AI Wiki Reader',
  //   description: 'An AI-powered tool for reading and summarizing wiki content.',
  //   category: 'saas',
  //   status: 'coming-soon',
  //   platform: 'web',
  //   tags: ['ai', 'reading', 'wiki'],
  //   featured: true
  // }
];
```

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
  { platform: 'Twitter', url: 'https://twitter.com/arbenger', icon: 'twitter' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/arbenger', icon: 'linkedin' }
];
```

Social links are used in the Footer and Contact page.

---

## 5. Theme Data

### Type

```typescript
export type Theme = 'dark' | 'light';
```

### Store Shape

The theme store is a simple `writable<boolean>` (`isDark`). See `src/lib/stores/theme.ts` and the state-management architecture doc for details.

---

## 6. Data Flow

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
