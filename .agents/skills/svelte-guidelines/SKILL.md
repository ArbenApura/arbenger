---
name: svelte-guidelines
description: >
  Enforces strict coding conventions for Svelte (.svelte) and TypeScript (.ts) files. Covers:
  UPPERCASE comments (technical terms exempt), Tailwind-only styling (no inline styles except
  linear-gradient or runtime-dynamic values), NO style blocks or CSS variables, cn() for dynamic
  classes, border over outline, isDark store for theme-dependent gradients, Svelte snippets only
  for complex highly-reused markup (not simple repetition), arbitrary [#HEX] values for
  non-standard colors (never invent Tailwind color names), imgLoad on network images with alt="",
  svelte-sonner toast for notifications, import groups in order (ASSETS, DEP-TYPES, TYPES, ENVS,
  CONSTANTS, DEP-MODULES, MODULES, DEP-COMPONENTS, COMPONENTS), section headers "// -- NAME -- //"
  in strict order (REQUIRED PROPS, OPTIONAL PROPS, DEBUGGING, TYPES, CONSTANTS, STATES, PERSISTED
  STORES, STORES, REACTIVE STATES, REACTIVE STATEMENTS, FUNCTIONS, SUBSCRIPTIONS, LIFECYCLES) with
  each section appearing at most once (no duplicates, order never rearranged), and full-file
  artifact output. Apply for ANY task touching Svelte or TypeScript — creating, editing,
  refactoring, or styling.
---

# Svelte Component Coding Guidelines

Every AI-assisted modification must follow these rules without exception.

---

## 1. COMMENTS
- All comments (script + template) must be **UPPERCASE**. Technical terms (variable/function/CSS/framework names) keep original casing.
- Template blocks: `<!-- LABEL -->`
- Any kept `style` attribute requires an explanatory uppercase comment.

```svelte
<!-- TIMELINE ITEMS -->   ✓        <!-- Timeline items -->   ✗
// FEATURE CARD DATA      ✓        // Feature card data      ✗
```

---

## 2. STYLING — TAILWIND ONLY

**Never** use `style=""` for anything a Tailwind class can express. **Never** add a `<style>` block. **No CSS variables** of any kind (component-scoped, `:global(:root)`, `:global(.dark)`).

Use arbitrary-value classes for one-off values: `text-[#2d7d7b]`, `w-[360px]`, `shadow-[0_2px_8px_rgba(0,0,0,0.1)]`.

**Non-standard colors:** If a color is not a default Tailwind palette color (e.g. `red-500`, `zinc-900`), always use `text-[#HEX]` / `bg-[#HEX]` etc. Never invent or guess a Tailwind color name mapping.

**Only 2 permitted `style` exceptions** (must include explanatory comment):
1. `linear-gradient()` with multiple color values
2. Runtime-dynamic per-item values (e.g. `item.color`)

```svelte
<!-- VERTICAL LINE — linear-gradient() WITH TWO COLORS CANNOT BE EXPRESSED AS A TAILWIND CLASS -->
<div style="background: linear-gradient(#2d7d7b, #4aa8a6);"></div>

<!-- BADGE COLOR IS DYNAMIC PER ITEM -->
<span style="background: {item.bgAlpha}; color: {item.color};">
```

### BORDER VS OUTLINE
Use `border-*` for all visible boundaries (buttons, inputs, cards, containers). Only use `outline` to suppress native rings (`outline-none` + `ring-*`) or for truly offset decorative strokes (rare — add comment).

---

## 3. DARK MODE
Prefer Tailwind `dark:` variants. Only import `isDark` store when `dark:` cannot express the value (e.g. theme-dependent gradients).

```svelte
import { isDark } from '$lib-multi/stores';

<!-- FADE GRADIENT — linear-gradient() WITH THEME-DEPENDENT COLOR REQUIRES isDark STORE -->
<div style="background: linear-gradient(to bottom, transparent, {$isDark ? '#1a2035' : 'white'});"></div>
```

---

## 4. SVELTE SNIPPETS
Only extract into `{#snippet}` when the markup is **both complex and highly reused** — meaning the block is non-trivial (3+ lines with logic or nested structure) and appears 3+ times. Do not use snippets for simple or moderately repeated markup; inline it instead.

```svelte
{#snippet card(title, description, icon)}
  <div class="flex items-center gap-3 rounded-lg bg-white dark:bg-slate-800 p-4">
    <svelte:component this={icon} class="size-5 text-teal-600" />
    <div><p class="font-semibold">{title}</p><p class="text-sm text-slate-500">{description}</p></div>
  </div>
{/snippet}
{@render card('Speed', 'Fast processing', BoltIcon)}
{@render card('Safety', 'Secure by default', ShieldIcon)}
```

---

## 5. IMAGES
Always use `use:imgLoad` on network `<img>` elements. All `<img>` elements must have `alt=""` (empty string, no exceptions).

```svelte
import { imgLoad } from '$lunona/actions';

<img src={photoUrl} alt="" class="h-full w-full object-cover" use:imgLoad />  ✓
<img src={photoUrl} alt="photo" class="h-full w-full object-cover" />          ✗
```

---

## 6. DYNAMIC CLASSES — `cn()` ONLY
Never use template-literal interpolation. Never construct class name fragments at runtime (`'text-' + color`, `` `bg-${size}` ``). All Tailwind class names must be complete literal strings.

```svelte
<div class={cn('flex flex-col', $isMobileView ? 'px-4' : 'px-6')}>  ✓
<div class="flex flex-col {$isMobileView ? 'px-4' : 'px-6'}">        ✗
```

---

## 7. SCRIPT STRUCTURE

### Import groups — in this order, no blank lines within block:

| # | Label | Contents |
|---|---|---|
| 1 | `// IMPORTED ASSETS` | Images, SVGs, fonts, static assets |
| 2 | `// IMPORTED DEP-TYPES` | `import type` from npm |
| 3 | `// IMPORTED TYPES` | `import type` from internal |
| 4 | `// IMPORTED ENVS` | `$env/...` |
| 5 | `// IMPORTED CONSTANTS` | Constant-only named imports |
| 6 | `// IMPORTED DEP-MODULES` | Runtime imports from npm |
| 7 | `// IMPORTED MODULES` | Runtime imports from internal/relative |
| 8 | `// IMPORTED DEP-COMPONENTS` | Svelte components from npm |
| 9 | `// IMPORTED COMPONENTS` | Svelte components from internal |

```typescript
// IMPORTED DEP-MODULES
import { updateProfile } from 'firebase/auth';
import { writable } from 'svelte/store';
// IMPORTED MODULES
import { cn, ripple } from '$lib-multi/utils';
// IMPORTED COMPONENTS
import Avatar from '$lib/components/Avatar.svelte';
```

### Section headers — format `// -- NAME -- //`, one blank line below, one blank line between items:

**Rules (strictly enforced):**
- Each section header may appear **at most once** — no duplicates ever.
- Sections must appear in **exactly this order** — never rearranged, never out of sequence.
- **Omit** any section that has no content — do not include empty sections.
- Never split a section's content across multiple blocks under the same header.

| # | Section | Contents |
|---|---|---|
| 1 | `// -- REQUIRED PROPS -- //` | `export let` with no default |
| 2 | `// -- OPTIONAL PROPS -- //` | `export let` with default |
| 3 | `// -- DEBUGGING -- //` | `FILE_PATH` and debug-only constants |
| 4 | `// -- TYPES -- //` | `type` / `interface` declarations |
| 5 | `// -- CONSTANTS -- //` | Immutable module-level `const` |
| 6 | `// -- STATES -- //` | Mutable local `let` variables |
| 7 | `// -- PERSISTED STORES -- //` | `persisted()` stores |
| 8 | `// -- STORES -- //` | `writable`, `readable`, `derived` |
| 9 | `// -- REACTIVE STATES -- //` | `$:` assignments |
| 10 | `// -- REACTIVE STATEMENTS -- //` | `$:` side-effect statements |
| 11 | `// -- FUNCTIONS -- //` | All function declarations |
| 12 | `// -- SUBSCRIPTIONS -- //` | Store subscriptions |
| 13 | `// -- LIFECYCLES -- //` | `onMount`, `onDestroy`, etc. |

**Example of correct usage** (only sections with content are included, in order):
```typescript
// -- TYPES -- //

type CardVariant = 'default' | 'outlined';

// -- CONSTANTS -- //

const MAX_ITEMS = 50;

// -- STATES -- //

let isOpen = false;
let count = 0;

// -- FUNCTIONS -- //

function toggle() { isOpen = !isOpen; }

// -- LIFECYCLES -- //

onMount(() => { /* ... */ });
```

**Common violations to avoid:**
```typescript
// -- STATES -- //
let x = 0;
// -- CONSTANTS -- //   ✗ WRONG ORDER — CONSTANTS must come before STATES
const Y = 10;

// -- FUNCTIONS -- //
function a() {}
// -- FUNCTIONS -- //   ✗ DUPLICATE — merge all functions under one header
function b() {}
```

---

## 8. NOTIFICATIONS
Use `svelte-sonner` toast unless a custom notification system already exists in the codebase (prefer consistency).

```typescript
import { toast } from 'svelte-sonner';

toast.success('Profile saved');
toast.error('Something went wrong');

// toast.promise IS FIRE-AND-FORMAT — DOES NOT RETURN A PROMISE, DO NOT AWAIT IT
// CORRECT PATTERN: ASSIGN AS ARROW FUNCTION EVENT HANDLER
const handleSubmit = () => toast.promise(saveProfile(data), { loading: 'Saving...', success: 'Saved!', error: 'Failed' });
```

**Toast messages must be user-friendly** — clear, human, and specific to the action. Avoid generic or technical wording.

| ✗ Bad | ✓ Good |
|---|---|
| `'Error'` | `'Couldn't save your profile. Try again.'` |
| `'Success'` | `'Profile updated!'` |
| `'Loading'` | `'Saving your changes...'` |
| `'Failed to fetch'` | `'Unable to load posts. Check your connection.'` |
| `'Done'` | `'Message sent!'` |

---

## 9. TEMPLATE COMMENTS
Label every major template block with uppercase HTML comments. Note mobile/desktop context when relevant.

```svelte
<!-- TOP SECTION: STACKED ON MOBILE, SIDE-BY-SIDE ON DESKTOP -->
<!-- GHOST PLACEHOLDER ITEM (SHOWN AT BOTTOM OF TIMELINE AS A TEASER) -->
```

---

## 10. STRUCTURE EFFICIENCY
Before outputting, audit the markup and script for redundancy. Collapse repeated wrappers, remove unnecessary nesting, and simplify where possible. Prefer fewer elements with well-composed Tailwind classes over deeply nested structures.

---

## CHECKLIST
- [ ] All comments UPPERCASE (technical terms exempt)
- [ ] Imports: correct group labels in order, no blank lines within import block, omit unused groups
- [ ] Section headers: `// -- NAME -- //` format, **strict order** (1–13), **each appears at most once** (no duplicates), one blank line below header, one blank line between items, omit unused
- [ ] No `style=""` where Tailwind works; every kept `style` has explanatory comment
- [ ] `border` for all visible boundaries; `outline` only for offset decorative strokes or `outline-none` + `ring-*`
- [ ] No `<style>` block anywhere — zero exceptions
- [ ] No CSS variables of any kind
- [ ] Dark mode via `dark:` variants; `isDark` store only for theme-dependent gradients
- [ ] Snippets only for complex, highly-reused markup (non-trivial block, 3+ uses) — never for simple repetition
- [ ] Non-standard colors use arbitrary syntax `bg-[#HEX]`, `text-[#HEX]` — never invent Tailwind color names
- [ ] Network `<img>` uses `use:imgLoad`; all `<img>` have `alt=""`
- [ ] One-off values use arbitrary Tailwind syntax: `bg-[#hex]`, `text-[13px]`
- [ ] Dynamic classes use `cn()` — no template-literal interpolation, no fragment construction
- [ ] Notifications use `svelte-sonner` toast (unless custom system exists)
- [ ] Structure is efficient — no redundant nesting, collapsed where possible
