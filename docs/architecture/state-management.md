# State Management

**Last updated:** 2026-05-09

This document defines how state is managed across arbenger.com. The base site has minimal state requirements — theme preference is the primary concern.

---

## 1. Strategy

**Svelte 4 stores** (`writable`, `readable`, `derived`) for all shared state. No external state management library. No runes (Svelte 5).

### Guiding Principles

1. **Minimal global state.** Most state lives in individual components as local `let` variables.
2. **Stores for shared state only.** Only use a store when multiple unrelated components need the same value.
3. **Persist only what matters.** Only theme preference is persisted to `localStorage`. All other state is ephemeral.
4. **Typed stores.** All stores have explicit TypeScript types.

---

## 2. Store Inventory

### Launch Stores

| Store | File | Type | Persisted | Purpose |
|-------|------|------|-----------|---------|
| `isDark` | `src/lib/stores/theme.ts` | `Writable<boolean>` | Yes (`localStorage`) | Theme preference |

### Future Stores (planned, not implemented)

| Store | File | Type | Persisted | Purpose |
|-------|------|------|-----------|---------|
| `activeCategory` | `src/lib/stores/products.ts` | `Writable<ProductCategory \| 'all'>` | No | Product catalog filter state |
| `isMobileMenuOpen` | `src/lib/stores/ui.ts` | `Writable<boolean>` | No | Mobile menu visibility |
| `toastQueue` | N/A (svelte-sonner manages) | N/A | No | Toast notifications |

---

## 3. Theme Store (Detailed)

### Implementation

```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// PERSISTED TO localStorage KEY: arbenger-theme

function createThemeStore() {
  const initial = browser
    ? localStorage.getItem('arbenger-theme') !== 'light'
    : true;

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
      update(current => {
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

### Initialization Flow

1. `app.html` includes inline script to set `dark` class before paint (prevents FOUC):
   ```html
   <script>
     if (localStorage.getItem('arbenger-theme') === 'dark') {
       document.documentElement.classList.add('dark');
     }
   </script>
   ```
2. The `isDark` store initializes from `localStorage` on creation (browser-safe via `$app/environment`)
3. `ThemeToggle.svelte` calls `isDark.toggle()` on click
4. Cookie consent is stored separately via `localStorage` key `arbenger-cookies-consent` (managed by `CookieBanner.svelte`)

### Usage in Components

**Preferred — Tailwind `dark:` variants (use this 95% of the time):**

```svelte
<div class="bg-white text-slate-900 dark:bg-[#0B0A23] dark:text-white">
```

**Exception — `isDark` store (only for `style=""` values):**

```svelte
<script lang="ts">
// IMPORTED MODULES
import { isDark } from '$lib/stores/theme';
</script>

<!-- FADE GRADIENT — linear-gradient() WITH THEME-DEPENDENT COLOR REQUIRES isDark STORE -->
<div style="background: linear-gradient(to bottom, transparent, {$isDark ? '#0B0A23' : '#F8FAFC'});">
```

---

## 4. Local Component State

Most state is local to individual components using `let` variables:

```svelte
<script lang="ts">
// -- STATES -- //

let isHovered = false;

let isMenuOpen = false;

let scrollY = 0;
</script>
```

### When to Use Local State vs Store

| Scenario | Use |
|----------|-----|
| Hover state on a card | Local `let` |
| Scroll position for navbar | Local `let` (via `svelte:window`) |
| Mobile menu open/close | Local `let` in Navbar (or store if triggered from elsewhere) |
| Theme preference | Store (shared + persisted) |
| Product filter selection | Store (shared between filter UI and product grid) |
| Form input values | Local `let` |
| Loading/error states | Local `let` |

---

## 5. Reactive Patterns

### Reactive Declarations (`$:` assignment)

For computed values derived from other state:

```svelte
// -- REACTIVE STATES -- //

$: visibleProducts = products.filter(p => 
  activeCategory === 'all' || p.category === activeCategory
);

$: isScrolled = scrollY > 50;
```

### Reactive Statements (`$:` side-effect)

For side effects that run when dependencies change:

```svelte
// -- REACTIVE STATEMENTS -- //

$: if (isMenuOpen) {
  document.body.style.overflow = 'hidden';
} else {
  document.body.style.overflow = '';
}
```

### Rules

1. Reactive declarations before reactive statements (per svelte-guidelines section order)
2. Each reactive block in its own `$:` statement — no combining unrelated logic
3. Avoid expensive computations in reactive blocks — use functions for complex logic

---

## 6. Data Loading

### Current (Base Site)

All data is static imports. No load functions needed:

```svelte
<script lang="ts">
// IMPORTED MODULES
import { products, categories } from '$lib/data/products';
</script>
```

### Future (Dynamic Data)

When products need dynamic data (from a database or API):

```typescript
// src/routes/products/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const products = await fetchProducts();
  return { products };
};
```

```svelte
<!-- src/routes/products/+page.svelte -->
<script lang="ts">
// IMPORTED TYPES
import type { PageData } from './$types';

// -- REQUIRED PROPS -- //

export let data: PageData;
</script>
```

The component interface stays the same — only the data source changes. This is the advantage of SvelteKit's load function pattern.
