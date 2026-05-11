# Arbenger Design System

**Last updated:** 2026-05-11

This document defines the complete visual language for arbenger.com. All components, pages, and future additions must follow these specifications. When in doubt, refer back to the aesthetic direction and verify against the color, typography, and spacing tokens defined here.

---

## 1. Aesthetic Direction

**"Clean, Dark-First, Typographic"**

The site uses monospaced display headings for structure and character, smooth sans-serif body text for readability, and dark mode as the default with a carefully paired light mode. Subtle cyan accents, restrained glow effects, and generous whitespace create a modern, confident aesthetic without being flashy.

### Key Principles

1. **Dark-first**: Navy-950 backgrounds with elevated navy-800 surfaces. Light mode is the alternate, not the default.
2. **Glow, not glow-y**: Cyan accents should feel like subtle screen light, not neon signs. Low opacity, soft spread.
3. **Monospace for structure, sans for reading**: Space Mono gives headings their technical character. Satoshi keeps body text comfortable.
4. **Motion with purpose**: Every animation serves a function — drawing attention, providing feedback, or creating atmosphere. No animation for decoration alone.
5. **Density through depth**: Use layered surfaces (navy-950 → navy-800 → navy-700 borders) to create depth without cluttering with extra elements.

---

## 2. Color Palette

### Dark Mode (Default)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| navy-950 | `#0B0A23` | 11, 10, 35 | Page backgrounds, deepest layer |
| navy-900 | `#161446` | 22, 20, 70 | Logo fill, primary brand color |
| navy-800 | `#1E1A5E` | 30, 26, 94 | Card backgrounds, elevated surfaces, navbar on scroll |
| navy-700 | `#2A2578` | 42, 37, 120 | Borders, subtle dividers, inactive states |
| cyan-400 | `#22D3EE` | 34, 211, 238 | Primary accent: links, CTAs, glow effects, active states |
| cyan-300 | `#67E8F9` | 103, 232, 249 | Hover states, highlights, secondary glow |
| teal-400 | `#2DD4BF` | 45, 212, 191 | Secondary accent: success states, category tags, badges |
| slate-300 | `#CBD5E1` | 203, 213, 225 | Body text on dark backgrounds |
| slate-400 | `#94A3B8` | 148, 163, 184 | Muted text, placeholders, secondary descriptions |
| white | `#FFFFFF` | 255, 255, 255 | High-emphasis headings, important text |

### Light Mode

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| background | `#F8FAFC` | 248, 250, 252 | Page background |
| surface | `#FFFFFF` | 255, 255, 255 | Cards, elevated surfaces |
| text-primary | `#161446` | 22, 20, 70 | Headings (brand navy) |
| text-body | `#334155` | 51, 65, 85 | Body text |
| text-muted | `#64748B` | 100, 116, 139 | Secondary text, descriptions |
| border | `#E2E8F0` | 226, 232, 240 | Card borders, dividers |
| accents | Same cyan/teal values | — | Consistent across both themes |

### Color Usage Rules

1. **Never use pure black** (`#000000`) as a background. Always use navy-950 (`#0B0A23`).
2. **Non-standard colors** must use arbitrary Tailwind syntax: `bg-[#0B0A23]`, `text-[#22D3EE]`. Never invent Tailwind color names.
3. **Accent colors are constant** across dark and light modes. Only backgrounds, surfaces, and text colors change.
4. **Glow effects** use cyan-400 at low opacity: `rgba(34, 211, 238, 0.15)` for subtle glow, `rgba(34, 211, 238, 0.25)` for hover-intensified glow.
5. **Gradient borders** transition from navy-700 to cyan-400. Never use gradients between two accent colors.
6. **Theme-dependent colors** that cannot be expressed with Tailwind `dark:` variants must use the `isDark` store. See svelte-guidelines section 3.

---

## 3. Typography

### Font Stack

| Role | Font Family | Source | Fallback |
|------|-------------|--------|----------|
| Display/Headings | Space Mono | Self-hosted | `'Courier New', monospace` |
| Body | Satoshi | Fontshare (self-hosted) | `system-ui, -apple-system, sans-serif` |
| Mono/Accents | JetBrains Mono | Self-hosted | `'Courier New', monospace` |

### Font Loading

All fonts are self-hosted in `static/fonts/` to eliminate third-party round-trips.

```html
<link rel="preload" href="/fonts/SpaceMono-Bold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

Use `font-display: swap` with calculated `size-adjust` on fallback fonts to prevent CLS.

### Type Scale

| Name | Tailwind Class | Size | Line Height | Font | Weight | Usage |
|------|----------------|------|-------------|------|--------|-------|
| hero | `text-4xl md:text-6xl` | 36px / 60px | 1.1 | Space Mono | 700 | Homepage hero headline |
| h1 | `text-3xl md:text-4xl` | 30px / 36px | 1.2 | Space Mono | 700 | Page titles |
| h2 | `text-2xl md:text-3xl` | 24px / 30px | 1.2 | Space Mono | 700 | Section headings |
| h3 | `text-xl` | 20px | 1.3 | Space Mono | 700 | Subsection headings |
| body-lg | `text-lg` | 18px | 1.6 | Satoshi | 400 | Lead paragraphs, descriptions |
| body | `text-base` | 16px | 1.6 | Satoshi | 400 | Default body text |
| body-sm | `text-sm` | 14px | 1.5 | Satoshi | 400 | Captions, secondary text |
| label | `text-sm` | 14px | 1.4 | JetBrains Mono | 500 | Mono labels, badges, stats |
| code | `text-sm` | 14px | 1.5 | JetBrains Mono | 400 | Inline code, technical values |

### Typography Rules

1. **Headings** always use Space Mono bold. No exceptions.
2. **Body text** always uses Satoshi. No exceptions.
3. **Mono labels** (section eyebrows like `Blog`, `About`, `Legal`) use JetBrains Mono at `text-sm` with `font-mono`.
4. **Never mix font roles.** A heading in Satoshi or body text in Space Mono is incorrect.
5. **Letter spacing:** Headings use `tracking-tight` (-0.025em). Mono labels use `tracking-widest` (0.1em). Body text uses default tracking.

---

## 4. Spacing System

### Page-Level Spacing

| Property | Value | Tailwind |
|----------|-------|----------|
| Max content width | 1280px | `max-w-7xl` |
| Content centering | auto margins | `mx-auto` |
| Page horizontal padding | 16px / 24px / 32px | `px-4 sm:px-6 lg:px-8` |
| Section vertical padding | 80px / 128px | `py-20 lg:py-32` |
| Section gap | 48px | `space-y-12` or margin |

### Component-Level Spacing

| Property | Value | Tailwind |
|----------|-------|----------|
| Card padding | 24px | `p-6` |
| Card gap (grid) | 24px | `gap-6` |
| Button padding | 12px 24px | `px-6 py-3` |
| Input padding | 12px 16px | `px-4 py-3` |
| Icon + text gap | 8px / 12px | `gap-2` / `gap-3` |
| Stack item gap | 16px / 24px | `gap-4` / `gap-6` |

### Border Radius

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cards | 12px | `rounded-xl` |
| Buttons | 8px | `rounded-lg` |
| Badges | 9999px (pill) | `rounded-full` |
| Inputs | 8px | `rounded-lg` |
| Images | 12px | `rounded-xl` |

---

## 5. Visual Effects

### Glow

Used on interactive elements to create the futuristic atmosphere.

| State | Shadow Value | Tailwind Arbitrary |
|-------|-------------|-------------------|
| Default (no glow) | none | — |
| Hover glow | `0 0 20px rgba(34,211,238,0.15)` | `shadow-[0_0_20px_rgba(34,211,238,0.15)]` |
| Active/focus glow | `0 0 30px rgba(34,211,238,0.25)` | `shadow-[0_0_30px_rgba(34,211,238,0.25)]` |
| Card hover glow | `0 0 40px rgba(34,211,238,0.1)` | `shadow-[0_0_40px_rgba(34,211,238,0.1)]` |

### Gradient Borders

Cards and section dividers use a gradient border effect. Implementation uses a wrapper element with a gradient background and inner element with the card background, creating a border effect via padding.

- Gradient direction: `to right` or `to bottom right`
- From: `#2A2578` (navy-700)
- To: `#22D3EE` (cyan-400)
- Border width: 1px (via `p-px` on wrapper)
- On hover: gradient opacity increases

### Grid Background (Hero)

- Pattern: Dot grid or line grid at low opacity
- Base color: navy-700 at 20% opacity
- Glow points: Cyan-400 at intersections, pulsing outward from center
- Implementation: CSS `background-image` with `radial-gradient` for dots, or SVG pattern
- Grid cell size: 40-60px

### Noise Texture

- SVG-based noise filter at 2-3% opacity
- Applied as `background-image` overlay on hero section
- Blended with `mix-blend-mode: overlay`
- Adds subtle texture without impacting readability

### Cursor Blink

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

- Duration: 1s
- Applied to a small rectangular element after hero headline
- Color: cyan-400

### Scrollbar Theming

Custom scrollbar styles adapt to the current theme. Both standard (`scrollbar-color` for Firefox) and WebKit (`::-webkit-scrollbar` for Chrome/Edge/Safari) properties are defined in `src/app.css`.

| Property | Light Mode | Dark Mode |
|----------|-----------|-----------|
| Track | `#F1F5F9` | `#0B0A23` |
| Thumb | `#CBD5E1` | `#312E81` |
| Thumb hover | `#94A3B8` | `#4338CA` |
| Width | 8px | 8px |

### Scroll Reveal

- Animation: fade in + translate up 20px
- Duration: 600ms
- Easing: `ease-out`
- Stagger: Each child delayed by 100ms (`animation-delay`)
- Triggered by `IntersectionObserver` when element enters viewport
- Runs once only (no re-trigger on scroll back up)

### Floating Orbital Logo (About Teaser)

The About teaser section features an animated Arbenger logo (210px) inside a large circular container (`h-120 w-120` / 480px), surrounded by orbital rings. The container has a frosted glass appearance with `backdrop-blur-sm` and themed borders/backgrounds. The logo uses `animate-float` for gentle vertical movement. Two orbital ring divs animate with `spin` at 20s and 30s infinite durations, with an orbital dot following the outer ring's path.

---

## 6. Transitions

| Property | Duration | Easing | Tailwind |
|----------|----------|--------|----------|
| Color, opacity, background | 200ms | ease-in-out | `transition-colors duration-200` |
| Transform, shadow, border | 300ms | ease-out | `transition-all duration-300` |
| Width, height, max-height | 300ms | ease-in-out | `transition-all duration-300` |

### Rules

1. **Every interactive element** must have a transition. No abrupt state changes.
2. **Hover effects** should feel responsive but not jarring: 200-300ms range.
3. **Never exceed 500ms** for UI transitions. Longer durations feel sluggish.
4. **Scroll-triggered animations** can be up to 800ms since they are atmospheric, not interactive.

---

## 7. Component Visual Specs

### Buttons

**Primary:**
- Background: `bg-[#22D3EE]`
- Text: `text-[#0B0A23]` (navy-950, high contrast)
- Font: Satoshi, 500 weight
- Hover: glow shadow + slightly lighter background
- Active: scale(0.98)
- Border radius: `rounded-lg`
- Padding: `px-6 py-3`

**Secondary:**
- Background: transparent
- Border: `border border-[#22D3EE]`
- Text: `text-[#22D3EE]`
- Hover: `bg-[#22D3EE]/10` (cyan at 10% opacity)
- Active: scale(0.98)

**Ghost:**
- Background: transparent
- Text: `text-slate-300`
- Hover: `bg-white/5`
- No border

### Cards

- Background: `bg-[#1E1A5E]` (navy-800)
- Border: `border border-[#2A2578]` (navy-700)
- Border radius: `rounded-xl`
- Padding: `p-4 sm:p-6` (tighter on mobile)
- Hover: `translate-y-[-2px]` + glow shadow + border brightens toward cyan
- Transition: `transition-all duration-300`

### Badges

- Background: `bg-[#2DD4BF]/10` (teal at 10%)
- Text: `text-[#2DD4BF]` (teal-400)
- Font: JetBrains Mono, `text-sm`
- Padding: `px-3 py-1`
- Border radius: `rounded-full`

### Section Eyebrow Labels

- Text: JetBrains Mono, `text-sm`, `font-mono`
- Color: `text-[#0891B2] dark:text-[#22D3EE]`
- No prefix character — plain text only (e.g. `Blog`, `About`, `Legal`)

Example markup:
```svelte
<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Blog</p>
```

### Select (`Select.svelte`)

- **Trigger:** Button with selected item label, optional leading icon, `ChevronDown` suffix
- **Dropdown:** `fly` transition with `cubicOut` easing, positioned below trigger
- **Options:** Flat list (`SelectOption[]`) or grouped (`SelectGroup[]`) with group labels
- **Per-option features:** Optional icon, hint text, disabled state, checkmark on selected
- **Keyboard:** Click-outside and Escape to close
- **Styling:** `rounded-xl` dropdown panel, white bg (`dark:bg-[#1E1A5E]`), border + shadow
- **Exported types:** `SelectOption`, `SelectGroup`, `SelectItems` (via `context="module"`)
- **Used in:** Image resizer controls (format, fit mode, presets), image compressor controls (format, target unit, naming pattern)

### ColorPicker (`ColorPicker.svelte`)

- **Trigger:** Color swatch button showing current value
- **Popover:** Portal-based positioning, `fly` transition, click-outside to close
- **Canvas controls:** Saturation-value canvas (2D gradient), hue slider canvas (1D rainbow)
- **Input modes:** HEX, RGB, HSV — toggle between modes
- **Presets:** 16 default color swatches (customizable via `presets` prop)
- **Events:** Dispatches `change` with hex string value
- **Styling:** `rounded-xl` popover, themed backgrounds
- **Used in:** Image resizer background color selection

### ConfirmDialog (`ConfirmDialog.svelte`)

- **Trigger:** Controlled by `open` prop (bind:open)
- **Variants:** `danger` (red), `warning` (amber), `default` (cyan/brand)
- **Content:** Customizable icon, title, message, confirm/cancel labels
- **Transitions:** Backdrop `fade`, dialog `fly` (from bottom), `cubicOut` easing
- **Behavior:** Backdrop click to cancel, scroll lock when open
- **Events:** Dispatches `confirm` and `cancel`
- **Styling:** Centered modal, `rounded-2xl`, themed backgrounds, variant-colored confirm button
- **Used in:** Image resizer and image compressor clear-all confirmation

### Language Selector

- **Trigger button:** Inline SVG flag (20×14px, `rounded-[2px]`) + `ChevronDown` icon (3.5 size)
- **Button styling:** Same as ThemeToggle — `rounded-lg p-2`, same hover/dark colors
- **Dropdown panel:** `w-52 rounded-xl`, white bg (`dark:bg-[#1E1A5E]`), border + shadow, `fly` transition
- **Active locale:** Checkmark icon in `#0891B2` / `#22D3EE`
- **Disabled locales:** Muted text (`#94A3B8`), "Soon" pill badge, `cursor-default`
- **Flags:** Inline SVG, no emoji, no library — stored as path strings in the component
- **Close behavior:** Click outside or Escape key
- **Placement:** Navbar (desktop controls + mobile controls), footer (copyright bar)

### Navbar

- **Default (at top):** Transparent background, no border
- **On scroll:** `bg-[#0B0A23]/80 backdrop-blur-lg border-b border-[#2A2578]`
- Height: `h-16`
- Logo: SVG, 32px height
- Wordmark: Space Mono, `text-lg`, `tracking-tight`, white
- Nav links: Satoshi, `text-sm`, slate-300, hover cyan-400
- Active link: cyan-400, underline offset
- Language selector: Flag + chevron button, `rounded-lg`, ghost style, opens dropdown
- Theme toggle: Icon button, `rounded-lg`, ghost style
- Mobile: Hamburger icon, opens slide-in drawer from right

### Footer

- Background: `bg-[#0B0A23]` with `border-t border-[#2A2578]`
- Padding: `py-12 lg:py-16`
- Four-column grid on desktop, stacked on mobile
- Text: slate-400 for body, white for headings
- Social icons: slate-400, hover cyan-400
- Copyright: `text-sm`, slate-400

---

## 8. Logo Usage

### Files

| Format | File | Usage |
|--------|------|-------|
| SVG | `arbenger.svg` | Primary web usage (navbar, footer, OG images) |
| PNG | `arbenger.png` | Fallback, social media, favicon source |

### Logo Colors

| Context | Color |
|---------|-------|
| On dark backgrounds | White (`#FFFFFF`) — requires white version of SVG |
| On light backgrounds | Brand navy (`#161446`) — original SVG |
| Accent usage | Cyan-400 (`#22D3EE`) — for special decorative use only |

### Clear Space

Minimum clear space around the logo: equal to the height of the "A" peak divided by 4, on all sides.

### Minimum Size

- Web: 24px height minimum
- Print: 12mm height minimum

### Don'ts

- Don't stretch, skew, or rotate the logo
- Don't apply drop shadows or outer glows to the logo itself
- Don't place the logo on busy backgrounds without a container
- Don't use colors outside the defined set

---

## 9. Responsive Breakpoints

Following TailwindCSS defaults:

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| (default) | 0px | Mobile-first base styles |
| `sm` | 640px | Small tablets, landscape phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra-large screens |

### Responsive Patterns

- **Grids:** 1 col → 2 col (md) → 3 col (lg) for product cards
- **Typography:** Scale up headings at `md` breakpoint (e.g., `text-3xl md:text-4xl`)
- **Navbar:** Full nav links on `lg`+, hamburger menu below `lg`
- **Section padding:** `py-20 lg:py-32` for vertical spacing
- **Content width:** Always constrained to `max-w-7xl` with responsive horizontal padding

---

## 10. Dark/Light Theme Implementation

### Default

Dark mode is the default theme. The site loads in dark mode and respects user preference via `localStorage`.

### Toggle

The `ThemeToggle.svelte` component toggles a `dark` class on `<html>`. Tailwind's `darkMode: 'class'` strategy is used.

### Store

```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';

export const isDark = writable(true);
```

Persisted to `localStorage` under key `arbenger-theme`. Initialized from `localStorage` on mount, falling back to `prefers-color-scheme` media query, falling back to dark.

### Usage Rules

1. Use Tailwind `dark:` variants for all theme-dependent styles. Example: `bg-white dark:bg-[#0B0A23]`
2. Only import `isDark` store when `dark:` cannot express the value (e.g., theme-dependent gradients in `style=""` attributes). See svelte-guidelines section 3.
3. All colors must work on both themes. Test both before shipping any component.
