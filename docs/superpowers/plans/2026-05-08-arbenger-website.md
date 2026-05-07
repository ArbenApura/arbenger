# Arbenger Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the arbenger.com base website — a dark futuristic company hub with 4 pages (Home, Products, About, Contact), deployed to Cloudflare Pages.

**Architecture:** SvelteKit 2 with Svelte 4 syntax (mandatory — no runes), TailwindCSS v4, `adapter-cloudflare` for SSR readiness. All base pages pre-rendered. Static product data defined in TypeScript. Theme toggle with localStorage persistence. "Terminal meets luxury" design language with monospaced headings, glow effects, and grid backgrounds.

**Tech Stack:** SvelteKit 2, Svelte 4, TypeScript (strict), TailwindCSS v4, Vite, adapter-cloudflare, clsx + tailwind-merge, lucide-svelte, svelte-sonner, Prettier (prettier-plugin-svelte + prettier-plugin-tailwindcss)

**Key docs to reference:**
- Design spec: `docs/specs/2026-05-08-arbenger-website-design.md`
- Design system: `docs/guidelines/design-system.md`
- Component conventions: `docs/guidelines/component-conventions.md`
- SEO standards: `docs/guidelines/seo-standards.md`
- Svelte guidelines: `.claude/skills/svelte-guidelines/SKILL.md`
- Data models: `docs/architecture/data-models.md`
- State management: `docs/architecture/state-management.md`

---

## File Map

### Files to Create

| File | Responsibility |
|------|---------------|
| `src/app.html` | HTML shell with dark-mode inline script, font preloads |
| `src/app.css` | Tailwind directives, font-face declarations, keyframe animations |
| `src/app.d.ts` | SvelteKit type declarations |
| `svelte.config.js` | SvelteKit config with adapter-cloudflare |
| `vite.config.ts` | Vite config with SvelteKit plugin |
| `tsconfig.json` | TypeScript configuration |
| `.node-version` | Node 20 LTS |
| `src/lib/utils/cn.ts` | clsx + tailwind-merge wrapper |
| `src/lib/types/index.ts` | All TypeScript interfaces |
| `src/lib/stores/theme.ts` | Theme store with localStorage persistence |
| `src/lib/data/products.ts` | Product categories and products array |
| `src/lib/data/navigation.ts` | Nav links and social links |
| `src/lib/components/seo/MetaTags.svelte` | Per-page meta, OG, Twitter cards |
| `src/lib/components/seo/JsonLd.svelte` | JSON-LD structured data |
| `src/lib/components/ui/Button.svelte` | Button with variants (primary/secondary/ghost) |
| `src/lib/components/ui/Card.svelte` | Card with hover glow and gradient border |
| `src/lib/components/ui/Badge.svelte` | Teal pill badge |
| `src/lib/components/ui/SectionLabel.svelte` | Terminal-prompt section label |
| `src/lib/components/layout/Navbar.svelte` | Sticky navbar with scroll blur, mobile menu |
| `src/lib/components/layout/Footer.svelte` | Three-column footer |
| `src/lib/components/layout/ThemeToggle.svelte` | Sun/moon toggle button |
| `src/lib/components/home/GridBackground.svelte` | Animated dot-grid hero background |
| `src/lib/components/home/Hero.svelte` | Hero section with tagline and CTAs |
| `src/lib/components/home/ProductCategories.svelte` | Category card grid |
| `src/lib/components/home/AboutTeaser.svelte` | About preview section |
| `src/routes/+layout.svelte` | Root layout with Navbar, Footer, Toaster, sitewide JSON-LD |
| `src/routes/+layout.ts` | prerender = true |
| `src/routes/+page.svelte` | Homepage |
| `src/routes/+error.svelte` | Custom error page |
| `src/routes/about/+page.svelte` | About page |
| `src/routes/products/+page.svelte` | Products catalog page |
| `src/routes/contact/+page.svelte` | Contact page |
| `src/routes/sitemap.xml/+server.ts` | Dynamic XML sitemap |
| `static/robots.txt` | Search engine directives |
| `static/fonts/` | Self-hosted font files (Space Mono, Satoshi, JetBrains Mono) |
| `static/arbenger.svg` | Logo SVG (copied from Downloads) |
| `static/arbenger.png` | Logo PNG (copied from Downloads) |

### Files to Modify

| File | Change |
|------|--------|
| `.prettierrc` | Already has correct Prettier config — keep as-is |
| `package.json` | Created by `npm create svelte`, then dependencies added |

---

## Task 1: Scaffold SvelteKit Project

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `.node-version`, `src/app.html`, `src/app.css`, `src/app.d.ts`
- Modify: `.prettierrc` (verify after scaffold)

- [ ] **Step 1: Create SvelteKit project**

Run from the project root. Since we already have files in the directory, we'll initialize manually. Create `package.json`:

```json
{
	"name": "arbenger",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write ."
	},
	"type": "module"
}
```

- [ ] **Step 2: Install core dependencies**

Run:
```bash
npm install @sveltejs/kit@^2 @sveltejs/vite-plugin-svelte@^3 svelte@^4 vite@^5 typescript@^5
npm install -D svelte-check @sveltejs/adapter-cloudflare tslib
```

Expected: packages install without errors. Verify `svelte` is version 4.x (not 5.x) in `node_modules/svelte/package.json`.

- [ ] **Step 3: Install styling and utility dependencies**

Run:
```bash
npm install -D tailwindcss@^4 @tailwindcss/vite
npm install clsx tailwind-merge lucide-svelte svelte-sonner
npm install -D prettier prettier-plugin-svelte prettier-plugin-tailwindcss
```

- [ ] **Step 4: Create svelte.config.js**

```javascript
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			}
		})
	}
};

export default config;
```

- [ ] **Step 5: Create vite.config.ts**

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
```

- [ ] **Step 6: Create tsconfig.json**

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
}
```

- [ ] **Step 7: Create .node-version**

```
20
```

- [ ] **Step 8: Create src/app.d.ts**

```typescript
/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Platform {
		env?: {
			[key: string]: string;
		};
	}
}
```

- [ ] **Step 9: Create src/app.html**

```html
<!doctype html>
<html lang="en" class="dark">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="%sveltekit.assets%/favicon.ico" />
		<link rel="preload" href="%sveltekit.assets%/fonts/SpaceMono-Bold.woff2" as="font" type="font/woff2" crossorigin />
		<link rel="preload" href="%sveltekit.assets%/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin />
		<link rel="preload" href="%sveltekit.assets%/fonts/JetBrainsMono-Regular.woff2" as="font" type="font/woff2" crossorigin />
		<script>
			if (localStorage.getItem('arbenger-theme') !== 'light') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		</script>
		%sveltekit.head%
	</head>
	<body class="bg-[#F8FAFC] text-[#334155] dark:bg-[#0B0A23] dark:text-slate-300">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

- [ ] **Step 10: Create src/app.css**

```css
@import 'tailwindcss';

@font-face {
	font-family: 'Space Mono';
	src: url('/fonts/SpaceMono-Bold.woff2') format('woff2');
	font-weight: 700;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'Satoshi';
	src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
	font-weight: 400 700;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'JetBrains Mono';
	src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
	font-weight: 400;
	font-style: normal;
	font-display: swap;
}

@font-face {
	font-family: 'JetBrains Mono';
	src: url('/fonts/JetBrainsMono-Medium.woff2') format('woff2');
	font-weight: 500;
	font-style: normal;
	font-display: swap;
}

@theme {
	--font-sans: 'Satoshi', system-ui, -apple-system, sans-serif;
	--font-mono: 'JetBrains Mono', 'Courier New', monospace;
	--font-display: 'Space Mono', 'Courier New', monospace;
}

@utility font-display {
	font-family: var(--font-display);
}

@keyframes blink {
	0%, 50% { opacity: 1; }
	51%, 100% { opacity: 0; }
}

@keyframes fade-up {
	from {
		opacity: 0;
		transform: translateY(20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@utility animate-blink {
	animation: blink 1s step-end infinite;
}

@utility animate-fade-up {
	animation: fade-up 0.6s ease-out both;
}
```

- [ ] **Step 11: Download and place font files**

Download these font files and place them in `static/fonts/`:

1. **Space Mono Bold** — from Google Fonts, download the woff2 file for weight 700
2. **Satoshi Variable** — from https://www.fontshare.com/fonts/satoshi, download the variable woff2
3. **JetBrains Mono Regular + Medium** — from https://www.jetbrains.com/lp/mono/, download woff2 for weights 400 and 500

Place them as:
```
static/fonts/SpaceMono-Bold.woff2
static/fonts/Satoshi-Variable.woff2
static/fonts/JetBrainsMono-Regular.woff2
static/fonts/JetBrainsMono-Medium.woff2
```

- [ ] **Step 12: Copy logo files to static/**

Run:
```powershell
Copy-Item "C:\Users\Admin\Downloads\arbenger.svg" -Destination "static/arbenger.svg"
Copy-Item "C:\Users\Admin\Downloads\arbenger.png" -Destination "static/arbenger.png"
```

- [ ] **Step 13: Create static/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://arbenger.com/sitemap.xml
```

- [ ] **Step 14: Verify the dev server starts**

Run: `npm run dev`

Expected: Server starts on `http://localhost:5173` (or similar). It will show a blank page since we have no routes yet — that's correct. Kill the server after verifying.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json svelte.config.js vite.config.ts tsconfig.json .node-version src/app.html src/app.css src/app.d.ts static/robots.txt static/fonts/ static/arbenger.svg static/arbenger.png
git commit -m "chore: scaffold SvelteKit project with TailwindCSS and adapter-cloudflare"
```

---

## Task 2: Core Utilities, Types, and Data

**Files:**
- Create: `src/lib/utils/cn.ts`, `src/lib/types/index.ts`, `src/lib/stores/theme.ts`, `src/lib/data/products.ts`, `src/lib/data/navigation.ts`

- [ ] **Step 1: Create cn() utility**

Create `src/lib/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create TypeScript types**

Create `src/lib/types/index.ts`:

```typescript
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

export interface NavLink {
	label: string;
	href: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}
```

- [ ] **Step 3: Create theme store**

Create `src/lib/stores/theme.ts`:

```typescript
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// PERSISTED TO localStorage KEY: arbenger-theme

function createThemeStore() {
	const initial = browser ? localStorage.getItem('arbenger-theme') !== 'light' : true;

	const { subscribe, set, update } = writable<boolean>(initial);

	return {
		subscribe,
		set: (value: boolean) => {
			if (browser) {
				localStorage.setItem('arbenger-theme', value ? 'dark' : 'light');
				document.documentElement.classList.toggle('dark', value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				const next = !current;
				if (browser) {
					localStorage.setItem('arbenger-theme', next ? 'dark' : 'light');
					document.documentElement.classList.toggle('dark', next);
				}
				return next;
			});
		}
	};
}

export const isDark = createThemeStore();
```

- [ ] **Step 4: Create product data**

Create `src/lib/data/products.ts`:

```typescript
// IMPORTED TYPES
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

export const products: Product[] = [];
```

- [ ] **Step 5: Create navigation data**

Create `src/lib/data/navigation.ts`:

```typescript
// IMPORTED TYPES
import type { NavLink, SocialLink } from '$lib/types';

export const navLinks: NavLink[] = [
	{ label: 'Products', href: '/products' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: '/contact' }
];

export const socialLinks: SocialLink[] = [
	{ platform: 'GitHub', url: 'https://github.com/arbenger', icon: 'github' },
	{ platform: 'Twitter', url: 'https://twitter.com/arbenger', icon: 'twitter' },
	{ platform: 'LinkedIn', url: 'https://linkedin.com/company/arbenger', icon: 'linkedin' }
];
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json`

Expected: No errors. If there are import resolution issues for `$lib/types`, ensure `svelte-kit sync` ran first.

- [ ] **Step 7: Commit**

```bash
git add src/lib/
git commit -m "feat: add core utilities, types, stores, and data modules"
```

---

## Task 3: SEO Components

**Files:**
- Create: `src/lib/components/seo/MetaTags.svelte`, `src/lib/components/seo/JsonLd.svelte`

- [ ] **Step 1: Create MetaTags component**

Create `src/lib/components/seo/MetaTags.svelte`:

```svelte
<script lang="ts">
// -- REQUIRED PROPS -- //

export let title: string;
export let description: string;
export let url: string;

// -- OPTIONAL PROPS -- //

export let image: string = 'https://arbenger.com/og-image.png';
export let type: 'website' | 'article' = 'website';
export let siteName: string = 'Arbenger';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- OPEN GRAPH -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteName} />

	<!-- TWITTER CARD -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
```

- [ ] **Step 2: Create JsonLd component**

Create `src/lib/components/seo/JsonLd.svelte`:

```svelte
<script lang="ts">
// IMPORTED TYPES
import type { JsonLdSchema } from '$lib/types';

// -- REQUIRED PROPS -- //

export let schema: JsonLdSchema;
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/seo/
git commit -m "feat: add MetaTags and JsonLd SEO components"
```

---

## Task 4: UI Primitive Components

**Files:**
- Create: `src/lib/components/ui/Button.svelte`, `src/lib/components/ui/Card.svelte`, `src/lib/components/ui/Badge.svelte`, `src/lib/components/ui/SectionLabel.svelte`

- [ ] **Step 1: Create Button component**

Create `src/lib/components/ui/Button.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
export let href: string = '';
export let disabled: boolean = false;
let className: string = '';
export { className as class };

// -- CONSTANTS -- //

const BASE = 'inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 active:scale-[0.98]';

const VARIANTS = {
	primary: 'bg-[#22D3EE] text-[#0B0A23] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:brightness-110',
	secondary: 'border border-[#22D3EE] text-[#22D3EE] hover:bg-[#22D3EE]/10',
	ghost: 'text-slate-300 hover:bg-white/5'
} as const;
</script>

{#if href}
	<!-- LINK BUTTON -->
	<a
		{href}
		class={cn(BASE, VARIANTS[variant], disabled && 'pointer-events-none opacity-50', className)}
	>
		<slot />
	</a>
{:else}
	<!-- STANDARD BUTTON -->
	<button
		{disabled}
		class={cn(BASE, VARIANTS[variant], disabled && 'pointer-events-none opacity-50', className)}
		on:click
	>
		<slot />
	</button>
{/if}
```

- [ ] **Step 2: Create Card component**

Create `src/lib/components/ui/Card.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

export let href: string = '';
let className: string = '';
export { className as class };

// -- STATES -- //

let isHovered = false;
</script>

<!-- CARD WRAPPER -->
<svelte:element
	this={href ? 'a' : 'div'}
	{...href ? { href } : {}}
	class={cn(
		'block rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6 transition-all duration-300',
		'dark:border-[#2A2578] dark:bg-[#1E1A5E]',
		'border-[#E2E8F0] bg-white',
		isHovered && 'translate-y-[-2px] shadow-[0_0_40px_rgba(34,211,238,0.1)]',
		href && 'cursor-pointer',
		className
	)}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role={href ? undefined : 'group'}
>
	<slot />
</svelte:element>
```

- [ ] **Step 3: Create Badge component**

Create `src/lib/components/ui/Badge.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

export let variant: 'teal' | 'cyan' = 'teal';
let className: string = '';
export { className as class };

// -- CONSTANTS -- //

const VARIANTS = {
	teal: 'bg-[#2DD4BF]/10 text-[#2DD4BF]',
	cyan: 'bg-[#22D3EE]/10 text-[#22D3EE]'
} as const;
</script>

<!-- BADGE PILL -->
<span
	class={cn(
		'inline-flex items-center rounded-full px-3 py-1 font-mono text-sm',
		VARIANTS[variant],
		className
	)}
>
	<slot />
</span>
```

- [ ] **Step 4: Create SectionLabel component**

Create `src/lib/components/ui/SectionLabel.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- REQUIRED PROPS -- //

export let label: string;

// -- OPTIONAL PROPS -- //

let className: string = '';
export { className as class };
</script>

<!-- TERMINAL-STYLE SECTION LABEL -->
<p class={cn('mb-8 font-mono text-sm uppercase tracking-widest text-slate-400', className)}>
	<span class="text-[#22D3EE]">{'>'}</span>
	{label}
</p>
```

- [ ] **Step 5: Verify dev server renders components**

Run: `npm run dev`

We can't see the components yet (no routes), but verify no build errors in the console.

- [ ] **Step 6: Commit**

```bash
git add src/lib/components/ui/
git commit -m "feat: add UI primitive components (Button, Card, Badge, SectionLabel)"
```

---

## Task 5: Layout Components (Navbar, Footer, ThemeToggle)

**Files:**
- Create: `src/lib/components/layout/ThemeToggle.svelte`, `src/lib/components/layout/Navbar.svelte`, `src/lib/components/layout/Footer.svelte`

- [ ] **Step 1: Create ThemeToggle component**

Create `src/lib/components/layout/ThemeToggle.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Sun, Moon } from 'lucide-svelte';

// IMPORTED MODULES
import { isDark } from '$lib/stores/theme';
</script>

<!-- THEME TOGGLE BUTTON -->
<button
	on:click={() => isDark.toggle()}
	class="rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#22D3EE]"
	aria-label="Toggle theme"
>
	{#if $isDark}
		<Sun class="size-5" />
	{:else}
		<Moon class="size-5 text-[#161446]" />
	{/if}
</button>
```

- [ ] **Step 2: Create Navbar component**

Create `src/lib/components/layout/Navbar.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Menu, X } from 'lucide-svelte';

// IMPORTED MODULES
import { cn } from '$lib/utils/cn';
import { navLinks } from '$lib/data/navigation';

// IMPORTED COMPONENTS
import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';

// -- STATES -- //

let scrollY = 0;

let isMobileMenuOpen = false;

// -- REACTIVE STATES -- //

$: isScrolled = scrollY > 50;

// -- FUNCTIONS -- //

function closeMobileMenu() {
	isMobileMenuOpen = false;
}
</script>

<svelte:window bind:scrollY />

<!-- NAVBAR -->
<nav
	class={cn(
		'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
		isScrolled
			? 'border-b border-[#2A2578] bg-[#0B0A23]/80 backdrop-blur-lg dark:border-[#2A2578] dark:bg-[#0B0A23]/80'
			: 'bg-transparent'
	)}
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- LOGO + WORDMARK -->
		<a href="/" class="flex items-center gap-3">
			<img src="/arbenger.svg" alt="" class="h-8 w-8" width="32" height="32" />
			<span class="font-display text-lg tracking-tight text-white dark:text-white text-[#161446]">
				ARBENGER
			</span>
		</a>

		<!-- DESKTOP NAV LINKS -->
		<div class="hidden items-center gap-8 lg:flex">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm text-slate-300 transition-colors duration-200 hover:text-[#22D3EE] dark:text-slate-300 dark:hover:text-[#22D3EE]"
				>
					{link.label}
				</a>
			{/each}
			<ThemeToggle />
		</div>

		<!-- MOBILE MENU BUTTON -->
		<div class="flex items-center gap-2 lg:hidden">
			<ThemeToggle />
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-lg p-2 text-slate-300 transition-colors duration-200 hover:bg-white/5"
				aria-label="Toggle menu"
			>
				{#if isMobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- MOBILE MENU DRAWER -->
	{#if isMobileMenuOpen}
		<div class="border-t border-[#2A2578] bg-[#0B0A23] px-4 py-4 lg:hidden dark:border-[#2A2578] dark:bg-[#0B0A23]">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-3 text-sm text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-[#22D3EE]"
					on:click={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>
```

- [ ] **Step 3: Create Footer component**

Create `src/lib/components/layout/Footer.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Github, Twitter, Linkedin } from 'lucide-svelte';

// IMPORTED MODULES
import { navLinks, socialLinks } from '$lib/data/navigation';

// -- CONSTANTS -- //

const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_ICONS: Record<string, typeof Github> = {
	github: Github,
	twitter: Twitter,
	linkedin: Linkedin
};
</script>

<!-- FOOTER -->
<footer class="border-t border-[#2A2578] bg-[#0B0A23] dark:border-[#2A2578] dark:bg-[#0B0A23]">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<!-- FOOTER GRID: STACKED ON MOBILE, 3 COLUMNS ON DESKTOP -->
		<div class="grid gap-8 md:grid-cols-3">
			<!-- LOGO + TAGLINE -->
			<div>
				<a href="/" class="flex items-center gap-3">
					<img src="/arbenger.svg" alt="" class="h-8 w-8" width="32" height="32" />
					<span class="font-display text-lg tracking-tight text-white">ARBENGER</span>
				</a>
				<p class="mt-4 text-sm text-slate-400">
					Building tools for developers and creators.
				</p>
			</div>

			<!-- NAV LINKS -->
			<div>
				<h3 class="font-display text-sm font-bold uppercase tracking-tight text-white">Navigation</h3>
				<ul class="mt-4 space-y-2">
					{#each navLinks as link}
						<li>
							<a
								href={link.href}
								class="text-sm text-slate-400 transition-colors duration-200 hover:text-[#22D3EE]"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- SOCIAL LINKS -->
			<div>
				<h3 class="font-display text-sm font-bold uppercase tracking-tight text-white">Connect</h3>
				<div class="mt-4 flex gap-4">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="text-slate-400 transition-colors duration-200 hover:text-[#22D3EE]"
							aria-label={social.platform}
						>
							<svelte:component this={SOCIAL_ICONS[social.icon]} class="size-5" />
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- COPYRIGHT -->
		<div class="mt-12 border-t border-[#2A2578] pt-8 dark:border-[#2A2578]">
			<p class="text-sm text-slate-400">
				&copy; {CURRENT_YEAR} Arbenger. All rights reserved.
			</p>
		</div>
	</div>
</footer>
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/layout/
git commit -m "feat: add layout components (Navbar, Footer, ThemeToggle)"
```

---

## Task 6: Root Layout and Prerender Config

**Files:**
- Create: `src/routes/+layout.svelte`, `src/routes/+layout.ts`

- [ ] **Step 1: Create +layout.ts**

Create `src/routes/+layout.ts`:

```typescript
export const prerender = true;
```

- [ ] **Step 2: Create +layout.svelte**

Create `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import '../app.css';

// IMPORTED COMPONENTS
import Navbar from '$lib/components/layout/Navbar.svelte';
import Footer from '$lib/components/layout/Footer.svelte';
import JsonLd from '$lib/components/seo/JsonLd.svelte';
</script>

<!-- SITEWIDE JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Arbenger',
		url: 'https://arbenger.com'
	}}
/>

<!-- SKIP TO CONTENT -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#22D3EE] focus:px-4 focus:py-2 focus:text-[#0B0A23]"
>
	Skip to content
</a>

<Navbar />

<!-- MAIN CONTENT -->
<main id="main-content">
	<slot />
</main>

<Footer />
```

- [ ] **Step 3: Verify the layout renders**

Run: `npm run dev`

Expected: The dev server starts. Visiting `http://localhost:5173` shows the Navbar at top and Footer at bottom with an empty main area. The dark theme should be active by default. If there is a 404, that's because we have no `+page.svelte` yet — that's fine.

- [ ] **Step 4: Commit**

```bash
git add src/routes/+layout.svelte src/routes/+layout.ts
git commit -m "feat: add root layout with Navbar, Footer, and sitewide JSON-LD"
```

---

## Task 7: Homepage Hero and Grid Background

**Files:**
- Create: `src/lib/components/home/GridBackground.svelte`, `src/lib/components/home/Hero.svelte`, `src/routes/+page.svelte`

- [ ] **Step 1: Create GridBackground component**

Create `src/lib/components/home/GridBackground.svelte`:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

let className: string = '';
export { className as class };
</script>

<!-- ANIMATED DOT-GRID BACKGROUND -->
<div
	class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
	aria-hidden="true"
>
	<!-- GRID PATTERN — background-image WITH RADIAL-GRADIENT DOTS CANNOT BE EXPRESSED AS A TAILWIND CLASS -->
	<div
		class="absolute inset-0 opacity-20"
		style="background-image: radial-gradient(circle, #2A2578 1px, transparent 1px); background-size: 50px 50px;"
	></div>

	<!-- CENTER GLOW -->
	<div
		class="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
		style="background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);"
	></div>
</div>
```

- [ ] **Step 2: Create Hero component**

Create `src/lib/components/home/Hero.svelte`:

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import Button from '$lib/components/ui/Button.svelte';
import GridBackground from '$lib/components/home/GridBackground.svelte';
</script>

<!-- HERO SECTION -->
<section class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<GridBackground />

	<!-- NOISE TEXTURE OVERLAY — SVG NOISE FILTER CANNOT BE EXPRESSED AS A TAILWIND CLASS -->
	<div
		class="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
		style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;);"
		aria-hidden="true"
	></div>

	<!-- HERO CONTENT -->
	<div class="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<!-- TAGLINE -->
		<h1 class="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
			Building the tools
			<br />
			of tomorrow
			<!-- BLINKING CURSOR -->
			<span class="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.05em] animate-blink bg-[#22D3EE]"></span>
		</h1>

		<!-- SUBTITLE -->
		<p class="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
			AI tools, developer extensions, and SaaS products crafted for developers and creators.
		</p>

		<!-- CTA BUTTONS -->
		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button href="/products" variant="primary">Explore Products</Button>
			<Button href="/about" variant="secondary">About Us</Button>
		</div>
	</div>
</section>
```

- [ ] **Step 3: Create homepage route**

Create `src/routes/+page.svelte`:

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
import JsonLd from '$lib/components/seo/JsonLd.svelte';
import Hero from '$lib/components/home/Hero.svelte';
</script>

<MetaTags
	title="AI Tools & Developer Products | Arbenger"
	description="Arbenger builds AI tools, VS Code extensions, Chrome plugins, and SaaS products for developers and creators."
	url="https://arbenger.com"
/>

<!-- ORGANIZATION JSON-LD (HOMEPAGE ONLY) -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Arbenger',
		url: 'https://arbenger.com',
		logo: 'https://arbenger.com/arbenger.svg',
		description: 'Building AI tools, developer extensions, and SaaS products.',
		sameAs: [
			'https://github.com/arbenger',
			'https://twitter.com/arbenger',
			'https://linkedin.com/company/arbenger'
		]
	}}
/>

<!-- HERO -->
<Hero />
```

- [ ] **Step 4: Verify hero renders in browser**

Run: `npm run dev`

Visit `http://localhost:5173`. Expected:
- Dark background with dot-grid pattern
- "Building the tools of tomorrow" headline in monospace font with blinking cursor
- Subtitle text below
- Two CTA buttons (Explore Products, About Us)
- Navbar visible at top
- Footer visible below hero

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/home/GridBackground.svelte src/lib/components/home/Hero.svelte src/routes/+page.svelte
git commit -m "feat: add homepage with hero section, grid background, and SEO meta"
```

---

## Task 8: Homepage Product Categories and About Teaser

**Files:**
- Create: `src/lib/components/home/ProductCategories.svelte`, `src/lib/components/home/AboutTeaser.svelte`
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Create ProductCategories component**

Create `src/lib/components/home/ProductCategories.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Code, Chrome, Brain, Wrench, Rocket } from 'lucide-svelte';

// IMPORTED MODULES
import { categories } from '$lib/data/products';

// IMPORTED COMPONENTS
import Card from '$lib/components/ui/Card.svelte';
import Badge from '$lib/components/ui/Badge.svelte';
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

// -- CONSTANTS -- //

const CATEGORY_ICONS: Record<string, typeof Code> = {
	code: Code,
	chrome: Chrome,
	brain: Brain,
	wrench: Wrench,
	rocket: Rocket
};
</script>

<!-- PRODUCT CATEGORIES SECTION -->
<section class="py-20 lg:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="PRODUCTS" />

		<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
			What we build
		</h2>

		<!-- CATEGORY GRID: 1 COL MOBILE, 2 COL TABLET, 3 COL DESKTOP -->
		<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each categories as category}
				<Card>
					<!-- CATEGORY ICON -->
					<div class="mb-4 text-[#22D3EE]">
						<svelte:component this={CATEGORY_ICONS[category.icon]} class="size-8" />
					</div>

					<!-- CATEGORY NAME -->
					<h3 class="font-display text-lg font-bold tracking-tight text-white dark:text-white text-[#161446]">
						{category.name}
					</h3>

					<!-- CATEGORY DESCRIPTION -->
					<p class="mt-2 text-sm text-slate-400">
						{category.description}
					</p>

					<!-- COMING SOON BADGE -->
					<div class="mt-4">
						<Badge>Coming soon</Badge>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
```

- [ ] **Step 2: Create AboutTeaser component**

Create `src/lib/components/home/AboutTeaser.svelte`:

```svelte
<script lang="ts">
// IMPORTED COMPONENTS
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
import Button from '$lib/components/ui/Button.svelte';
</script>

<!-- ABOUT TEASER SECTION -->
<section class="py-20 lg:py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="ABOUT" />

		<!-- ASYMMETRIC LAYOUT: TEXT LEFT, DECORATIVE RIGHT -->
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<!-- TEXT CONTENT -->
			<div>
				<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
					Meet Arbenger
				</h2>
				<p class="mt-4 text-lg text-slate-300 dark:text-slate-300 text-[#334155]">
					We build tools that solve real problems for developers and creators.
					From VS Code extensions to full SaaS platforms, every product is crafted
					with performance, usability, and quality in mind.
				</p>
				<div class="mt-8">
					<Button href="/about" variant="secondary">Learn more about us</Button>
				</div>
			</div>

			<!-- DECORATIVE ELEMENT -->
			<div class="hidden lg:flex lg:justify-center">
				<div class="relative h-64 w-64">
					<!-- DECORATIVE GLOW CIRCLE -->
					<div
						class="absolute inset-0 rounded-full opacity-20"
						style="background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%);"
					></div>
					<!-- LOGO MARK -->
					<div class="flex h-full w-full items-center justify-center">
						<img src="/arbenger.svg" alt="" class="h-32 w-32 opacity-60" width="128" height="128" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 3: Add Connect/CTA section and wire up homepage**

Update `src/routes/+page.svelte` to import and use all homepage sections:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { socialLinks } from '$lib/data/navigation';

// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
import JsonLd from '$lib/components/seo/JsonLd.svelte';
import Hero from '$lib/components/home/Hero.svelte';
import ProductCategories from '$lib/components/home/ProductCategories.svelte';
import AboutTeaser from '$lib/components/home/AboutTeaser.svelte';
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
</script>

<MetaTags
	title="AI Tools & Developer Products | Arbenger"
	description="Arbenger builds AI tools, VS Code extensions, Chrome plugins, and SaaS products for developers and creators."
	url="https://arbenger.com"
/>

<!-- ORGANIZATION JSON-LD (HOMEPAGE ONLY) -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Arbenger',
		url: 'https://arbenger.com',
		logo: 'https://arbenger.com/arbenger.svg',
		description: 'Building AI tools, developer extensions, and SaaS products.',
		sameAs: [
			'https://github.com/arbenger',
			'https://twitter.com/arbenger',
			'https://linkedin.com/company/arbenger'
		]
	}}
/>

<!-- HERO -->
<Hero />

<!-- PRODUCT CATEGORIES -->
<ProductCategories />

<!-- ABOUT TEASER -->
<AboutTeaser />

<!-- CONNECT / STAY UPDATED -->
<section class="py-20 lg:py-32">
	<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
		<SectionLabel label="CONNECT" class="text-center" />

		<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
			Stay updated on new launches
		</h2>

		<p class="mx-auto mt-4 max-w-lg text-slate-400">
			Follow us on social media or reach out directly to stay in the loop.
		</p>

		<!-- SOCIAL LINKS -->
		<div class="mt-8 flex justify-center gap-6">
			{#each socialLinks as social}
				<a
					href={social.url}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-[#22D3EE] transition-colors duration-200 hover:text-[#67E8F9]"
				>
					{social.platform}
				</a>
			{/each}
		</div>
	</div>
</section>
```

- [ ] **Step 4: Verify full homepage in browser**

Run: `npm run dev`

Visit `http://localhost:5173`. Expected:
- Hero section with grid background and blinking cursor
- Product categories grid with 5 cards and "Coming soon" badges
- About teaser with text and decorative logo element
- Connect section with social links
- Navbar at top, footer at bottom

- [ ] **Step 5: Commit**

```bash
git add src/lib/components/home/ src/routes/+page.svelte
git commit -m "feat: add product categories, about teaser, and connect sections to homepage"
```

---

## Task 9: About Page

**Files:**
- Create: `src/routes/about/+page.svelte`

- [ ] **Step 1: Create About page**

Create `src/routes/about/+page.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Github, Twitter, Linkedin } from 'lucide-svelte';

// IMPORTED MODULES
import { socialLinks } from '$lib/data/navigation';

// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

// -- CONSTANTS -- //

const SOCIAL_ICONS: Record<string, typeof Github> = {
	github: Github,
	twitter: Twitter,
	linkedin: Linkedin
};
</script>

<MetaTags
	title="About Arbenger | Company & Founder"
	description="Learn about Arbenger, a tech company building AI tools, VS Code extensions, Chrome plugins, and SaaS products for developers and creators."
	url="https://arbenger.com/about"
/>

<!-- ABOUT PAGE -->
<div class="pt-24">
	<!-- PAGE HERO -->
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="ABOUT" />
			<h1 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl dark:text-white text-[#161446]">
				About Arbenger
			</h1>
			<p class="mt-4 max-w-2xl text-lg text-slate-300 dark:text-slate-300 text-[#334155]">
				A tech company building tools that solve real problems for developers and creators.
			</p>
		</div>
	</section>

	<!-- FOUNDER SECTION -->
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="FOUNDER" />
			<div class="max-w-3xl">
				<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
					Arben Apura
				</h2>
				<p class="mt-1 font-mono text-sm text-[#22D3EE]">Founder & Developer</p>
				<p class="mt-6 text-lg leading-relaxed text-slate-300 dark:text-slate-300 text-[#334155]">
					Full-stack developer with a passion for building products that people actually use.
					From browser extensions to AI-powered platforms, every project starts with a problem
					worth solving and ships with the quality users deserve.
				</p>
			</div>
		</div>
	</section>

	<!-- MISSION SECTION -->
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="MISSION" />
			<div class="max-w-3xl">
				<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
					Why we build
				</h2>
				<p class="mt-6 text-lg leading-relaxed text-slate-300 dark:text-slate-300 text-[#334155]">
					We believe the best tools are the ones that get out of your way.
					Every product we ship is focused on doing one thing well — fast, reliable,
					and built with the developer experience in mind.
				</p>
			</div>
		</div>
	</section>

	<!-- SOCIAL LINKS SECTION -->
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="CONNECT" />
			<h2 class="font-display text-2xl font-bold tracking-tight text-white md:text-3xl dark:text-white text-[#161446]">
				Find us online
			</h2>
			<div class="mt-8 flex gap-6">
				{#each socialLinks as social}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-slate-400 transition-colors duration-200 hover:text-[#22D3EE]"
						aria-label={social.platform}
					>
						<svelte:component this={SOCIAL_ICONS[social.icon]} class="size-5" />
						<span class="text-sm">{social.platform}</span>
					</a>
				{/each}
			</div>
		</div>
	</section>
</div>
```

- [ ] **Step 2: Verify About page in browser**

Run: `npm run dev`

Visit `http://localhost:5173/about`. Expected:
- Navbar at top
- Page title "About Arbenger"
- Founder section with name and role
- Mission section
- Social links section
- Footer at bottom
- Proper spacing between sections

- [ ] **Step 3: Commit**

```bash
git add src/routes/about/
git commit -m "feat: add About page with founder, mission, and social sections"
```

---

## Task 10: Products Page

**Files:**
- Create: `src/routes/products/+page.svelte`

- [ ] **Step 1: Create Products page**

Create `src/routes/products/+page.svelte`:

```svelte
<script lang="ts">
// IMPORTED TYPES
import type { ProductCategory } from '$lib/types';

// IMPORTED DEP-MODULES
import { Code, Chrome, Brain, Wrench, Rocket } from 'lucide-svelte';

// IMPORTED MODULES
import { cn } from '$lib/utils/cn';
import { categories, products } from '$lib/data/products';

// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
import Card from '$lib/components/ui/Card.svelte';
import Badge from '$lib/components/ui/Badge.svelte';

// -- CONSTANTS -- //

const CATEGORY_ICONS: Record<string, typeof Code> = {
	code: Code,
	chrome: Chrome,
	brain: Brain,
	wrench: Wrench,
	rocket: Rocket
};

const FILTER_OPTIONS: Array<{ id: ProductCategory | 'all'; label: string }> = [
	{ id: 'all', label: 'All' },
	{ id: 'vscode-extensions', label: 'VS Code' },
	{ id: 'chrome-plugins', label: 'Chrome' },
	{ id: 'ai-tools', label: 'AI Tools' },
	{ id: 'misc-tools', label: 'Misc' },
	{ id: 'saas', label: 'SaaS' }
];

// -- STATES -- //

let activeFilter: ProductCategory | 'all' = 'all';

// -- REACTIVE STATES -- //

$: filteredCategories =
	activeFilter === 'all'
		? categories
		: categories.filter((c) => c.id === activeFilter);

$: filteredProducts =
	activeFilter === 'all'
		? products
		: products.filter((p) => p.category === activeFilter);
</script>

<MetaTags
	title="Products | Arbenger"
	description="Explore Arbenger's collection of AI tools, VS Code extensions, Chrome plugins, and SaaS products built for developers and creators."
	url="https://arbenger.com/products"
/>

<!-- PRODUCTS PAGE -->
<div class="pt-24">
	<!-- PAGE HERO -->
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="CATALOG" />
			<h1 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl dark:text-white text-[#161446]">
				Products
			</h1>
			<p class="mt-4 max-w-2xl text-lg text-slate-300 dark:text-slate-300 text-[#334155]">
				Tools and products across multiple platforms, built for developers and creators.
			</p>
		</div>
	</section>

	<!-- FILTER TABS + GRID -->
	<section class="pb-20 lg:pb-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- CATEGORY FILTER TABS -->
			<div class="flex flex-wrap gap-2">
				{#each FILTER_OPTIONS as option}
					<button
						class={cn(
							'rounded-lg px-4 py-2 font-mono text-sm transition-all duration-200',
							activeFilter === option.id
								? 'bg-[#22D3EE]/10 text-[#22D3EE]'
								: 'text-slate-400 hover:bg-white/5 hover:text-slate-300'
						)}
						on:click={() => (activeFilter = option.id)}
					>
						{option.label}
					</button>
				{/each}
			</div>

			<!-- CATEGORY CARDS GRID -->
			<div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredCategories as category}
					<Card>
						<!-- CATEGORY ICON -->
						<div class="mb-4 text-[#22D3EE]">
							<svelte:component this={CATEGORY_ICONS[category.icon]} class="size-10" />
						</div>

						<!-- CATEGORY NAME -->
						<h2 class="font-display text-xl font-bold tracking-tight text-white dark:text-white text-[#161446]">
							{category.name}
						</h2>

						<!-- CATEGORY DESCRIPTION -->
						<p class="mt-2 text-slate-400">{category.description}</p>

						<!-- STATUS -->
						<div class="mt-4 flex items-center justify-between">
							<Badge>Coming soon</Badge>
							<span class="font-mono text-sm text-slate-400">
								{category.productCount} products
							</span>
						</div>
					</Card>
				{/each}
			</div>

			<!-- EMPTY STATE FOR INDIVIDUAL PRODUCTS -->
			{#if filteredProducts.length === 0}
				<div class="mt-16 text-center">
					<p class="font-mono text-sm text-slate-400">
						Products launching soon. Stay tuned.
					</p>
				</div>
			{/if}
		</div>
	</section>
</div>
```

- [ ] **Step 2: Verify Products page in browser**

Run: `npm run dev`

Visit `http://localhost:5173/products`. Expected:
- Page title "Products"
- Filter tabs (All, VS Code, Chrome, AI Tools, Misc, SaaS)
- Clicking a filter shows only that category's card
- All 5 category cards visible when "All" is selected
- "Coming soon" badges on each card
- "Products launching soon" message below the grid

- [ ] **Step 3: Commit**

```bash
git add src/routes/products/
git commit -m "feat: add Products catalog page with category filters"
```

---

## Task 11: Contact Page

**Files:**
- Create: `src/routes/contact/+page.svelte`

- [ ] **Step 1: Create Contact page**

Create `src/routes/contact/+page.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { Mail, Github, Twitter, Linkedin } from 'lucide-svelte';

// IMPORTED MODULES
import { socialLinks } from '$lib/data/navigation';

// IMPORTED COMPONENTS
import MetaTags from '$lib/components/seo/MetaTags.svelte';
import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

// -- CONSTANTS -- //

const SOCIAL_ICONS: Record<string, typeof Github> = {
	github: Github,
	twitter: Twitter,
	linkedin: Linkedin
};
</script>

<MetaTags
	title="Contact | Arbenger"
	description="Get in touch with Arbenger. Reach out via email or connect on social media."
	url="https://arbenger.com/contact"
/>

<!-- CONTACT PAGE -->
<div class="pt-24">
	<section class="py-20 lg:py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<SectionLabel label="CONTACT" />
			<h1 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl dark:text-white text-[#161446]">
				Get in Touch
			</h1>
			<p class="mt-4 max-w-2xl text-lg text-slate-300 dark:text-slate-300 text-[#334155]">
				Have a question, idea, or want to collaborate? Reach out.
			</p>
		</div>
	</section>

	<section class="pb-20 lg:pb-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="grid gap-12 lg:grid-cols-2">
				<!-- EMAIL -->
				<div>
					<h2 class="font-display text-xl font-bold tracking-tight text-white dark:text-white text-[#161446]">
						Email
					</h2>
					<a
						href="mailto:contact@arbenger.com"
						class="mt-4 flex items-center gap-3 text-[#22D3EE] transition-colors duration-200 hover:text-[#67E8F9]"
					>
						<Mail class="size-5" />
						<span>contact@arbenger.com</span>
					</a>
				</div>

				<!-- SOCIAL -->
				<div>
					<h2 class="font-display text-xl font-bold tracking-tight text-white dark:text-white text-[#161446]">
						Social
					</h2>
					<div class="mt-4 space-y-4">
						{#each socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-3 text-slate-400 transition-colors duration-200 hover:text-[#22D3EE]"
								aria-label={social.platform}
							>
								<svelte:component this={SOCIAL_ICONS[social.icon]} class="size-5" />
								<span>{social.platform}</span>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
```

- [ ] **Step 2: Verify Contact page in browser**

Run: `npm run dev`

Visit `http://localhost:5173/contact`. Expected:
- Page title "Get in Touch"
- Email link with mail icon
- Social links with platform icons
- Clean two-column layout on desktop, stacked on mobile

- [ ] **Step 3: Commit**

```bash
git add src/routes/contact/
git commit -m "feat: add Contact page with email and social links"
```

---

## Task 12: Error Page

**Files:**
- Create: `src/routes/+error.svelte`

- [ ] **Step 1: Create custom error page**

Create `src/routes/+error.svelte`:

```svelte
<script lang="ts">
// IMPORTED DEP-MODULES
import { page } from '$app/stores';

// IMPORTED COMPONENTS
import Button from '$lib/components/ui/Button.svelte';
</script>

<!-- ERROR PAGE -->
<div class="flex min-h-[calc(100vh-4rem)] items-center justify-center pt-16">
	<div class="text-center">
		<!-- ERROR CODE -->
		<p class="font-display text-6xl font-bold text-[#22D3EE] md:text-8xl">
			{$page.status}
		</p>

		<!-- ERROR MESSAGE -->
		<p class="mt-4 font-display text-xl font-bold tracking-tight text-white dark:text-white text-[#161446]">
			{$page.error?.message || 'Something went wrong'}
		</p>

		<p class="mt-2 text-slate-400">
			The page you're looking for doesn't exist or has been moved.
		</p>

		<!-- GO HOME BUTTON -->
		<div class="mt-8">
			<Button href="/" variant="primary">Go home</Button>
		</div>
	</div>
</div>
```

- [ ] **Step 2: Verify error page**

Run: `npm run dev`

Visit `http://localhost:5173/nonexistent-page`. Expected:
- Shows "404" in large cyan text
- Error message below
- "Go home" button that links to /

- [ ] **Step 3: Commit**

```bash
git add src/routes/+error.svelte
git commit -m "feat: add custom error page with dark futuristic design"
```

---

## Task 13: Sitemap Route

**Files:**
- Create: `src/routes/sitemap.xml/+server.ts`

- [ ] **Step 1: Create sitemap server route**

Create `src/routes/sitemap.xml/+server.ts`:

```typescript
import type { RequestHandler } from './$types';

const SITE_URL = 'https://arbenger.com';

const PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/products', priority: '0.8', changefreq: 'weekly' },
	{ path: '/about', priority: '0.6', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.5', changefreq: 'monthly' }
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
	(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};

export const prerender = true;
```

- [ ] **Step 2: Verify sitemap**

Run: `npm run dev`

Visit `http://localhost:5173/sitemap.xml`. Expected: Valid XML with 4 URL entries.

- [ ] **Step 3: Commit**

```bash
git add src/routes/sitemap.xml/
git commit -m "feat: add auto-generated XML sitemap"
```

---

## Task 14: Build Verification and Formatting

**Files:**
- Modify: Various (Prettier formatting pass)

- [ ] **Step 1: Run Prettier across all files**

Run: `npx prettier --write .`

Expected: Files reformatted according to `.prettierrc` config. Tailwind classes sorted by `prettier-plugin-tailwindcss`.

- [ ] **Step 2: Run TypeScript check**

Run: `npx svelte-kit sync && npx svelte-check --tsconfig ./tsconfig.json`

Expected: No errors. Warnings are acceptable (unused exports, etc.) but no type errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Build succeeds. Output in `.svelte-kit/cloudflare/`. All 4 pages pre-rendered. No build errors.

- [ ] **Step 4: Preview production build**

Run: `npm run preview`

Visit `http://localhost:4173`. Test:
- Homepage loads with all sections
- Navigate to /products, /about, /contact via navbar
- Theme toggle works (dark ↔ light)
- Mobile responsive (resize browser)
- Navbar goes transparent → blur on scroll
- /sitemap.xml returns valid XML

- [ ] **Step 5: Commit formatting changes**

```bash
git add -A
git commit -m "chore: format all files with Prettier"
```

---

## Task 15: Final Verification and Tag

- [ ] **Step 1: Full page verification**

Open the dev server and verify each page against the spec:

| Page | Check |
|------|-------|
| `/` | Hero with grid background, blinking cursor, 2 CTA buttons, product categories grid (5 cards), about teaser, connect section |
| `/products` | Page title, filter tabs work, 5 category cards, "Coming soon" badges |
| `/about` | Page title, founder section, mission section, social links |
| `/contact` | Page title, email link, social links with icons |
| `/nonexistent` | Custom 404 error page with "Go home" button |
| `/sitemap.xml` | Valid XML with 4 URLs |
| All pages | Navbar (transparent → blur on scroll), Footer (3 columns), theme toggle works, mobile responsive |

- [ ] **Step 2: Check SEO meta tags**

Open browser DevTools on each page and verify:
- `<title>` is unique per page
- `<meta name="description">` is unique per page
- `<link rel="canonical">` points to correct URL
- OpenGraph and Twitter Card tags present
- JSON-LD scripts present (WebSite on all pages, Organization on homepage)
- Exactly one `<h1>` per page

- [ ] **Step 3: Commit any fixes**

If any issues found, fix and commit:

```bash
git add -A
git commit -m "fix: address final verification issues"
```

- [ ] **Step 4: Run final build**

Run: `npm run build`

Expected: Clean build, no errors.

---

Plan complete. 15 tasks, roughly 60 steps.

**Notes for the implementing engineer:**

1. **Svelte 4 only.** Do not use `$props()`, `$state()`, `$derived()`, `$effect()`, or any Svelte 5 rune syntax. Use `export let`, `$:`, `writable()`, and `onMount()`.

2. **Font files must be downloaded manually** in Task 1, Step 11. The build will fail without them. Sources:
   - Space Mono: Google Fonts
   - Satoshi: fontshare.com
   - JetBrains Mono: jetbrains.com/lp/mono/

3. **The existing `.prettierrc` has `tabWidth: 4` and `useTabs: true`** — use tabs for indentation, not spaces.

4. **All brand colors use arbitrary Tailwind syntax** (`bg-[#0B0A23]`, not `bg-navy-950`). Standard Tailwind colors (slate-300, slate-400, white) use normal class names.

5. **Follow svelte-guidelines strictly**: UPPERCASE comments, `cn()` for dynamic classes, section headers in order, import groups in order, no style blocks, no CSS variables.

6. **The logo SVG currently uses `fill="rgb(22,20,70)"` (navy)** — it will need a white fill variant for dark backgrounds. Either create a separate `arbenger-white.svg` or apply a CSS `brightness(0) invert(1)` filter in the Navbar/Footer. The implementing engineer should decide at Task 5 time.
