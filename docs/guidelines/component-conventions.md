# Component Conventions

**Last updated:** 2026-05-09

This document defines how to build Svelte components for arbenger.com. It supplements the svelte-guidelines skill (which covers syntax rules) with project-specific patterns and architectural decisions.

---

## 1. Svelte Version

All components use **Svelte 4 syntax**. This is mandatory, no exceptions.

| Pattern | Correct (Svelte 4) | Incorrect (Svelte 5) |
|---------|--------------------|--------------------|
| Props | `export let title` | `let { title } = $props()` |
| Reactive declarations | `$: doubled = count * 2` | `const doubled = $derived(count * 2)` |
| Reactive statements | `$: console.log(count)` | `$effect(() => console.log(count))` |
| State | `let count = 0` | `let count = $state(0)` |
| Stores | `import { writable } from 'svelte/store'` | N/A |
| Store access | `$storeName` | Same |
| Lifecycle | `onMount(() => {})` | Same |
| Composition | `<slot />` | `{@render children()}` |

---

## 2. File Organization

### Component Location

| Type | Path | Example |
|------|------|---------|
| Layout components | `src/lib/components/layout/` | Navbar.svelte, Footer.svelte, ThemeToggle.svelte, LanguageSelector.svelte, CookieBanner.svelte |
| Reusable UI primitives | `src/lib/components/ui/` | Button.svelte, Card.svelte |
| Page-specific sections | `src/lib/components/[page]/` | home/Hero.svelte, home/ProductCategories.svelte, home/AboutTeaser.svelte |
| SEO utilities | `src/lib/components/seo/` | MetaTags.svelte, JsonLd.svelte, Breadcrumbs.svelte |
| Stores | `src/lib/stores/` | theme.ts, locale.ts, viewport.ts |
| Utilities | `src/lib/utils/` | cn.ts |
| Data | `src/lib/data/` | products.ts, navigation.ts, locales.ts |
| Types | `src/lib/types/` | index.ts |

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `ProductCard.svelte` |
| Stores | camelCase | `theme.ts` |
| Utilities | camelCase | `cn.ts` |
| Data files | camelCase | `products.ts` |
| Type files | camelCase | `index.ts` |
| Route files | SvelteKit convention | `+page.svelte`, `+layout.svelte` |

---

## 3. Script Structure

Follow the svelte-guidelines section header order strictly. Here is the full pattern for an arbenger.com component:

```svelte
<script lang="ts">
// IMPORTED TYPES
import type { Product } from '$lib/types';

// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// IMPORTED COMPONENTS
import Badge from '$lib/components/ui/Badge.svelte';

// -- REQUIRED PROPS -- //

export let title: string;
export let products: Product[];

// -- OPTIONAL PROPS -- //

export let variant: 'default' | 'compact' = 'default';

// -- TYPES -- //

type CardState = 'idle' | 'hovered';

// -- CONSTANTS -- //

const MAX_VISIBLE = 6;

// -- STATES -- //

let isHovered = false;

let cardState: CardState = 'idle';

// -- REACTIVE STATES -- //

$: visibleProducts = products.slice(0, MAX_VISIBLE);

$: hasMore = products.length > MAX_VISIBLE;

// -- FUNCTIONS -- //

function handleHover() {
  isHovered = true;
  cardState = 'hovered';
}

// -- LIFECYCLES -- //

onMount(() => {
  // INITIALIZATION LOGIC
});
</script>
```

### Rules (from svelte-guidelines, repeated for emphasis)

1. Each section header appears **at most once** — no duplicates.
2. Sections appear in **exactly the prescribed order** — never rearranged.
3. **Omit** sections with no content — no empty sections.
4. One blank line below each section header, one blank line between items within a section.

---

## 4. Props Conventions

### Required Props

```svelte
// -- REQUIRED PROPS -- //

export let title: string;
export let href: string;
```

- Always typed explicitly
- No default value
- Document purpose via the prop name (descriptive naming, not comments)

### Optional Props

```svelte
// -- OPTIONAL PROPS -- //

export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
export let disabled: boolean = false;
export let class: string = '';
```

- Always have a default value
- Use union types for variant props
- Accept a `class` prop for external styling overrides (merged via `cn()`)

### Class Prop Pattern

Every visual component should accept a `class` prop for composition:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

export let class: string = '';
</script>

<div class={cn('base-classes here', class)}>
  <slot />
</div>
```

---

## 5. Styling Rules

### Tailwind Only

- **No `<style>` blocks** — zero exceptions
- **No CSS variables** — zero exceptions
- **No inline `style=""`** unless it's `linear-gradient()` or runtime-dynamic values (must include explanatory UPPERCASE comment)

### Dynamic Classes

Always use `cn()` from `$lib/utils/cn`:

```svelte
<!-- CORRECT -->
<div class={cn('flex items-center', isActive ? 'text-[#22D3EE]' : 'text-slate-400')}>

<!-- INCORRECT -->
<div class="flex items-center {isActive ? 'text-[#22D3EE]' : 'text-slate-400'}">
```

### Non-Standard Colors

All arbenger brand colors use arbitrary Tailwind syntax:

```svelte
<!-- CORRECT -->
<div class="bg-[#0B0A23] text-[#22D3EE]">

<!-- INCORRECT — never invent Tailwind color names -->
<div class="bg-navy-950 text-cyan-400">
```

Exception: Standard Tailwind colors (slate-300, slate-400, white, etc.) use their normal class names.

### Border vs Outline

Use `border-*` for all visible boundaries. Only use `outline` for `outline-none` + `ring-*` focus patterns.

---

## 6. Component Patterns

### Card Component

```svelte
<script lang="ts">
// IMPORTED MODULES
import { cn } from '$lib/utils/cn';

// -- OPTIONAL PROPS -- //

export let href: string = '';
export let class: string = '';

// -- STATES -- //

let isHovered = false;
</script>

<!-- CARD WRAPPER -->
<div
  class={cn(
    'rounded-xl border border-[#2A2578] bg-[#1E1A5E] p-6 transition-all duration-300',
    isHovered && 'translate-y-[-2px] shadow-[0_0_40px_rgba(34,211,238,0.1)]',
    class
  )}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <slot />
</div>
```

### Button Component

Accepts `variant`, `size`, `disabled`, `href` (renders `<a>` if provided, `<button>` otherwise).

### Badge Component

Small pill with teal tint, JetBrains Mono font.

### Section Label Component

Terminal-prompt style label with cyan `>` prefix.

---

## 7. Comments

### Script Comments

- All UPPERCASE (technical terms exempt)
- Section headers: `// -- NAME -- //`
- Import group headers: `// IMPORTED [GROUP]`

### Template Comments

- All UPPERCASE
- Label every major template block
- Note mobile/desktop context when relevant

```svelte
<!-- HERO SECTION -->
<!-- PRODUCT GRID: 1 COL MOBILE, 2 COL TABLET, 3 COL DESKTOP -->
<!-- MOBILE MENU DRAWER -->
```

---

## 8. Images

- All `<img>` elements must have `alt=""`
- Network images must use `use:imgLoad` action
- Use WebP format where possible
- Include explicit `width` and `height` attributes to prevent CLS
- Lazy-load images below the fold: `loading="lazy"`

---

## 9. Notifications

Use `svelte-sonner` toast for all user-facing notifications:

```typescript
import { toast } from 'svelte-sonner';

toast.success('Link copied!');
toast.error('Something went wrong. Try again.');
```

Messages must be user-friendly, specific, and human. See svelte-guidelines section 8 for examples.

---

## 10. Store Conventions

### Theme Store

```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';

export const isDark = writable(true);
```

- Persisted to `localStorage` key `arbenger-theme`
- Only imported in components where `dark:` Tailwind variants cannot express the value
- Most components should use `dark:` variants instead

### Removed Components

The following components were part of the original build but have been removed:

| Component | Removed On | Reason |
|-----------|-----------|--------|
| `Roadmap.svelte` | 2026-05-09 | Roadmap section removed from homepage; component file still exists but is unused and not imported anywhere |

### Typewriter Component Notes

`Typewriter.svelte` uses an `inline-grid` overlay technique to prevent layout shift. The hidden sizer reserves the width/height of the longest phrase. The visible text must NOT use `whitespace-nowrap` — both sizer and visible text must wrap identically so the container height stays constant as phrases cycle.

### Future Stores

- Keep stores in `src/lib/stores/`
- One store per concern (theme, auth, ui-state, etc.)
- Use `writable` for mutable state, `derived` for computed values
- Prefix persisted stores with a comment noting the localStorage key
