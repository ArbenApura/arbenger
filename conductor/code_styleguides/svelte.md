# Svelte Style Guide — Arbenger

## Svelte Version

**Svelte 4 syntax only.** No runes, no Svelte 5 features.

| Feature | Use | Don't Use |
|---------|-----|-----------|
| Props | `export let` | `$props()` |
| Reactivity | `$:` | `$derived`, `$effect` |
| State | `writable`/`readable`/`derived` stores | `$state` rune |
| Composition | Slots | — |
| Lifecycle | `onMount`, `onDestroy` | — |
| Snippets | Only for complex, highly-reused markup (3+ uses) | Simple repetition |

## Styling Rules

- **Tailwind only** — No `<style>` blocks, no CSS variables, no inline `style=""` except `linear-gradient` or runtime-dynamic values
- Use `cn()` from `$lib/utils/cn.ts` for dynamic/conditional classes
- Use `border` over `outline`
- Use `isDark` store only when `dark:` Tailwind variant cannot express the value (e.g., theme-dependent gradients)
- Arbitrary `[#HEX]` values for non-standard colors — never invent Tailwind color names
- Image elements: use `use:imgLoad` action on network images, always include `alt=""`

## Notifications

Use `svelte-sonner` `toast` for all user notifications. Toaster is in root layout.

## Section Headers in Script Block

Script blocks use section headers in strict order. Each section appears **at most once**:

```
// -- REQUIRED PROPS -- //
// -- OPTIONAL PROPS -- //
// -- DEBUGGING -- //
// -- TYPES -- //
// -- CONSTANTS -- //
// -- STATES -- //
// -- PERSISTED STORES -- //
// -- STORES -- //
// -- REACTIVE STATES -- //
// -- REACTIVE STATEMENTS -- //
// -- FUNCTIONS -- //
// -- SUBSCRIPTIONS -- //
// -- LIFECYCLES -- //
```

Order must not be rearranged. Skip sections that don't apply.

## Component File Structure

```svelte
<script lang="ts">
  // Imports (grouped per TS style guide)
  // Section headers with code
</script>

<!-- Markup -->
```

No `<style>` block.

## Component Patterns

| Pattern | Usage |
|---------|-------|
| Shared components | `src/lib/components/ui/`, `src/lib/components/layout/`, `src/lib/components/home/` |
| Route-local components | `_components/` inside route directory |
| Route-local state | `_lib/store.ts` inside route directory |
| Shared stores | `src/lib/stores/` |
| Shared types | `src/lib/types/index.ts` |
| Shared data | `src/lib/data/` |

## Event Handling

- Use `on:click`, `on:input`, etc. (Svelte 4 syntax)
- Dispatch custom events with `createEventDispatcher`
- Use `bind:` for two-way binding on form inputs

## Accessibility in Components

- `aria-label` on icon-only buttons
- Keyboard event handlers alongside click handlers where appropriate
- Semantic HTML elements over generic `<div>`
- Focus management in modals and dialogs
