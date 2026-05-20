# Arbenger Chrome Extension UI Guidelines

**Last updated:** 2026-05-21

Strict design rules for all Chrome extension popup UIs. Extracted from Color Picker and Sound Booster — the canonical references. Every future extension must follow these specs exactly.

---

## 1. Popup Dimensions & Layout

| Property | Value |
|----------|-------|
| Width | `310px` (fixed) |
| Max height | `480px` – `540px` (content-dependent) |
| Overflow | `overflow: hidden` on body, scrollable inner area |
| Layout | `display: flex; flex-direction: column` |
| Font size | `13px` base |

```
┌─────────────────────────────┐
│ Header (flex-shrink: 0)     │  8px 14px padding, border-bottom
├─────────────────────────────┤
│ Status bar (optional)       │  5px 14px padding, border-bottom
├─────────────────────────────┤
│ Primary content             │  12-14px padding, flex-shrink: 0
├─────────────────────────────┤
│ Scrollable area             │  flex: 1, overflow-y: auto
│  ├ Collapsible sections     │
│  └ History / lists          │
├─────────────────────────────┤
│ Toast (fixed bottom)        │  position: fixed, slides up
├─────────────────────────────┤
│ Footer (flex-shrink: 0)     │  6px 14px padding, border-top
└─────────────────────────────┘
```

---

## 2. Color Tokens (CSS Custom Properties)

Every extension uses these exact variables on `body`. No exceptions.

### Dark Mode (Default)

```css
body {
  --bg: #0B0A23;
  --surface: #1E1A5E;
  --border: #2A2578;
  --cyan: #22D3EE;
  --cyan-hover: #67E8F9;
  --teal: #2DD4BF;
  --text: #CBD5E1;
  --text-muted: #94A3B8;
  --text-heading: #FFFFFF;
  --red: #F87171;
  --green: #4ADE80;
  --amber: #FBBF24;
  --glow: rgba(34, 211, 238, 0.25);
  --glow-soft: rgba(34, 211, 238, 0.1);
}
```

### Light Mode

```css
body.light {
  --bg: #F1F5F9;
  --surface: #FFFFFF;
  --border: #CBD5E1;
  --text: #1E293B;
  --text-muted: #475569;
  --text-heading: #0F172A;
}
```

### Light Mode Accent Override

Cyan (`#22D3EE`) is too bright on light backgrounds. Override to `#0891B2` for any accent text, active indicators, or small UI elements on light mode.

```css
body.light .accent-element { color: #0891B2; }
```

**Do not** override `--cyan` globally — buttons and glows still use the original value.

### Semantic Colors

| Purpose | Token |
|---------|-------|
| Success / active | `--green` |
| Warning | `--amber` |
| Error / destructive | `--red` |
| Primary accent | `--cyan` |
| Confirm / copy feedback | `--teal` |

---

## 3. Typography

### Font Stack

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

No external fonts. Extensions must load instantly — no font preloads.

### Monospace

```css
.mono { font-family: 'Courier New', monospace; }
```

Used for: header title, format values, labels, slider values, frequency labels.

### Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Header title | 13px | 700 | mono |
| Body text | 13px | 400 | system |
| Status text | 11px | 400 | system |
| Section toggle label | 10px | 400 | mono, uppercase, `letter-spacing: 0.08em` |
| Value labels | 9px | 400 | mono |
| Footer | 10px | 400 | system |
| Large display (e.g. volume %) | 42-44px | 700 | mono |

---

## 4. Header

Exact structure — copy verbatim for new extensions:

```html
<div class="header">
  <div class="header-title mono">
    <svg class="header-logo" viewBox="0 0 1024 1024" aria-hidden="true">
      <circle cx="512" cy="512" r="512" class="logo-bg"/>
      <g class="logo-icon" transform="...">
        <!-- Extension-specific icon shape -->
      </g>
    </svg>
    Product Name
  </div>
  <div class="header-actions">
    <!-- Toggle switch, theme button, etc. -->
  </div>
</div>
```

### Logo Rules

- **Shape**: Extension's own icon inside a circle (not Arbenger "A")
- **Size**: `18px × 18px`
- **CSS classes**: `logo-bg` (circle fill) + `logo-icon` (icon fill/stroke)
- **Dark mode**: White circle bg, dark navy icon
- **Light mode**: Dark navy circle bg, white icon
- **Transition**: `transition: all 0.2s`

```css
.logo-bg { fill: #FFFFFF; }
.logo-icon { fill: rgb(7, 28, 56); stroke: rgb(7, 28, 56); }
body.light .logo-bg { fill: rgb(7, 28, 56); }
body.light .logo-icon { fill: rgb(241, 253, 253); stroke: rgb(241, 253, 253); }
```

### Header Title

- Product name in `--text-heading` color
- Optional: second word in `<span>` with `color: var(--cyan)` for brand accent
- `letter-spacing: -0.025em`

---

## 5. Buttons

### Icon Button (`.icon-btn`)

Small square button for toolbar actions (theme toggle, save, delete).

```css
.icon-btn {
  background: none;
  border: 1px solid transparent;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: all 0.15s;
}
.icon-btn:hover {
  color: var(--cyan);
  background: var(--glow-soft);
  border-color: var(--border);
}
.icon-btn:disabled { opacity: 0.4; cursor: default; pointer-events: none; }
.icon-btn svg { width: 14px; height: 14px; }
```

### Control Button (`.ctrl-btn`)

Full-width action buttons (Mute, Reset, etc).

```css
.ctrl-btn {
  flex: 1;
  padding: 7px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.15s;
}
.ctrl-btn:hover {
  border-color: var(--cyan);
  color: var(--text-heading);
  background: var(--glow-soft);
}
.ctrl-btn.active {
  border-color: var(--red);
  color: var(--red);
  background: rgba(248, 113, 113, 0.1);
}
```

### Small Control Button (`.ctrl-btn-sm`)

```css
.ctrl-btn-sm {
  flex: none;
  width: 100%;
  padding: 5px 8px;
  font-size: 11px;
  margin-top: 8px;
}
```

---

## 6. Collapsible Sections

Used for secondary content panels (EQ, Harmonies, Contrast, etc).

```html
<div class="section">
  <button class="section-toggle mono" id="toggle" aria-expanded="false">
    Section Name
    <svg viewBox="0 0 24 24" ...><polyline points="6 9 12 15 18 9"/></svg>
  </button>
  <div class="section-body" id="body">
    <!-- Content -->
  </div>
</div>
```

### CSS

```css
.section { border-top: 1px solid var(--border); }
.section-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 14px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: color 0.15s;
}
.section-toggle:hover { color: var(--text); }
.section-toggle svg { width: 11px; height: 11px; transition: transform 0.2s; }
.section-toggle.open svg { transform: rotate(180deg); }
.section-body { padding: 0 14px 10px; display: none; }
.section-body.open { display: block; }
```

### State Persistence

Collapse state persisted per section in `chrome.storage.local` with key like `panelEq`, `panelHarmonies`.

```typescript
function setupToggle(toggle: HTMLButtonElement, body: HTMLDivElement, storageKey: string) {
  chrome.storage.local.get(storageKey, (data) => {
    if (data[storageKey]) {
      toggle.classList.add('open');
      body.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    body.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    chrome.storage.local.set({ [storageKey]: isOpen });
  });
}
```

---

## 7. Custom Select Dropdown

Never use native `<select>`. Use custom dropdown for full theme control.

```html
<div class="custom-select" id="selectWrap" role="listbox">
  <button class="custom-select-btn" type="button">
    <span id="selectLabel">Current Value</span>
    <svg class="custom-select-arrow" viewBox="0 0 24 24" ...>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </button>
  <div class="custom-select-dropdown" id="dropdown">
    <div class="custom-select-group">
      <div class="custom-select-group-label">Group Name</div>
      <button class="custom-select-option" data-value="val">Label</button>
    </div>
  </div>
</div>
```

### Key Rules

- Toggle open via `.open` class on wrapper
- Close on click-outside (`document.addEventListener`)
- Arrow rotates 180° when open
- Active option gets `.active` class (cyan color + glow bg)
- Max dropdown height: `160px` with overflow scroll
- Shadow: `0 8px 24px rgba(0,0,0,0.3)` for depth
- Group labels: 9px uppercase, `--text-muted`
- Options: 11px mono, `5px 7px` padding, `border-radius: 4px`

---

## 8. Toast Notification

Fixed to bottom, slides up for 1.5s.

```css
.toast {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--teal);
  color: #0B0A23;
  text-align: center;
  padding: 7px 14px;
  font-weight: 600;
  font-size: 12px;
  z-index: 100;
  transform: translateY(100%);
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast.show { transform: translateY(0); }
```

Always teal background, dark text. 1.5s display duration.

---

## 9. Power Toggle (On/Off)

Pill-shaped toggle switch for enable/disable.

- Size: `34px × 18px`
- Knob: `14px` circle
- Off: `--border` bg, `--text-muted` knob
- On: `--cyan` bg with glow, `--bg` knob
- Body gets `.off` class → `#main { opacity: 0.35; pointer-events: none; }`

---

## 10. Status Bar

Optional bar below header showing extension state.

```html
<div class="status">
  <div class="status-dot active" id="statusDot"></div>
  <span class="status-text" id="statusText">Ready</span>
</div>
```

| State | Dot Color | Class |
|-------|-----------|-------|
| Active | `--green` | `.active` |
| Warning | `--amber` | `.warning` |
| Error | `--red` | `.error` |
| Off | `--text-muted` | `.off` |

---

## 11. Scrollbar

Custom WebKit scrollbar for scrollable areas.

```css
.scrollable::-webkit-scrollbar { width: 6px; }
.scrollable::-webkit-scrollbar-track { background: transparent; margin: 4px 0; }
.scrollable::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 3px;
  border: 1px solid var(--bg);
}
.scrollable::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
```

---

## 12. Footer

Always present. Links to arbenger.com.

```html
<div class="footer">
  <a href="https://arbenger.com" target="_blank" rel="noopener">
    <svg style="width:18px;height:18px" viewBox="0 0 1024 1024" aria-hidden="true">
      <!-- Arbenger "A" wordmark path -->
    </svg>
    Powered by Arbenger
  </a>
</div>
```

```css
.footer {
  padding: 6px 14px 8px;
  border-top: 1px solid var(--border);
  text-align: center;
  flex-shrink: 0;
}
.footer a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 10px;
  transition: color 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.footer a:hover { color: var(--cyan); }
```

---

## 13. Focus & Accessibility

```css
:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
```

### Required ARIA

| Element | Attributes |
|---------|-----------|
| Toggle buttons | `aria-expanded="true/false"` |
| Icon buttons | `aria-label="Action description"` |
| Sliders | `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Listbox/select | `role="listbox"`, `aria-label` |
| Clickable non-buttons | `role="button"`, `tabindex="0"` |

### Keyboard Support

- All interactive elements reachable via Tab
- Enter/Space activates buttons and options
- Escape closes dropdowns
- Arrow keys for slider adjustment (native)

---

## 14. Animations

```css
.fade-in { animation: fadeIn 0.3s ease; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Transition Defaults

| Element | Duration | Property |
|---------|----------|----------|
| Colors, borders | `0.15s` | `transition: all 0.15s` |
| Theme switch | `0.2s` | `transition: background 0.2s, color 0.2s` |
| Section expand | `0.2s` | chevron rotation |
| Toast | `0.25s` | `cubic-bezier(0.4, 0, 0.2, 1)` |

---

## 15. Theme Toggle

Always in header-actions. Uses sun/moon SVG icons.

```typescript
const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const SUN_SVG = '<circle cx="12" cy="12" r="5"/>...(rays)';
```

- Dark mode shows sun icon (to switch to light)
- Light mode shows moon icon (to switch to dark)
- Persisted to `chrome.storage.local` key `theme`
- Toolbar icon synced via `chrome.runtime.sendMessage({ type: 'set-icon-theme' })`
- Toolbar icon uses **system** `prefers-color-scheme`, not extension theme

---

## 16. Toolbar Icon Convention

Three SVG variants, all using the extension's own icon (not Arbenger "A"):

| File | Circle BG | Icon Color | Purpose |
|------|-----------|------------|---------|
| `{name}.svg` | `#FFFFFF` | `rgb(7,28,56)` | Store listing, default |
| `{name}-dark.svg` | `rgb(7,28,56)` | `rgb(241,253,253)` | Light Chrome toolbars |
| `{name}-light.svg` | `#FFFFFF` | `rgb(7,28,56)` | Dark Chrome toolbars |

Generated to PNG at 16, 32, 48, 128px via `generate-icons.js` using `@resvg/resvg-js`.

Runtime switching:

```typescript
function setIconForTheme(isDark: boolean) {
  const suffix = isDark ? '-light' : '';
  chrome.action.setIcon({ path: {
    16: `icons/icon${suffix}-16.png`,
    32: `icons/icon${suffix}-32.png`,
    48: `icons/icon${suffix}-48.png`,
    128: `icons/icon${suffix}-128.png`
  }});
}
```

---

## 17. Architecture Patterns

### File Structure

```
extensions/{name}/
├── src/
│   ├── popup.ts        # UI logic
│   ├── background.ts   # Service worker
│   └── content.ts      # Content script (if needed)
├── public/
│   ├── manifest.json   # Manifest V3
│   ├── popup.html      # Markup + embedded CSS
│   └── icons/          # SVG sources + generated PNGs
├── store/              # Store listing assets
├── build.js            # esbuild config
├── generate-icons.js   # SVG → PNG
├── package.js          # Zip packager
├── package.json
├── tsconfig.json
└── README.md
```

### Build Stack

- **Bundler**: esbuild, IIFE format, target `chrome95`
- **Language**: TypeScript, strict mode, ES2020
- **Framework**: None (vanilla TypeScript)
- **Styling**: Embedded `<style>` in popup.html, CSS custom properties
- **Icons**: `@resvg/resvg-js` for SVG → PNG rasterization

### Manifest V3

- Minimal permissions: `activeTab`, `storage`, plus `scripting` only if content script injection needed
- No host permissions unless absolutely required
- Background: service worker

### Message Passing

```
popup.ts ←→ background.ts (badge, state, injection)
popup.ts ←→ content.ts (real-time control, data)
background.ts → content.ts (keyboard shortcuts)
```

### Storage Keys

| Key | Store | Purpose |
|-----|-------|---------|
| `theme` | `local` | `'dark'` or `'light'` |
| `panel{Name}` | `local` | Section collapse state (boolean) |
| `customPresets` | `local` | User-saved presets (array) |
| Feature-specific | `local` | History, preferences |

---

## 18. Don'ts

1. **Don't use external fonts** — extensions must load instantly
2. **Don't use frameworks** — vanilla TS only, no React/Svelte/Vue
3. **Don't use native `<select>`** — always custom dropdown
4. **Don't use inline styles for theming** — CSS custom properties only
5. **Don't hardcode colors** — always use `var(--token)`
6. **Don't exceed 310px width** — popup must not scroll horizontally
7. **Don't use `border-radius` values outside the system** — 5px, 6px, or 8px for inputs/buttons
8. **Don't use animations longer than 300ms** for interactive feedback
9. **Don't request unnecessary permissions** — privacy is a selling point
10. **Don't add comments in CSS** — section headers only (`/* -- Name -- */`)
