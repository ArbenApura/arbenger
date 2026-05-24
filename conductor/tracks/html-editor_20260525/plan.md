# Implementation Plan: Live HTML Preview Editor

**Track ID:** html-editor_20260525
**Spec:** [spec.md](./spec.md)
**Created:** 2026-05-25
**Status:** [x] Complete

## Overview

Build a three-pane HTML/CSS/JS editor with live preview at `/products/html-editor`. Implementation progresses from editor foundation → preview engine → developer tooling (lint/format/emmet) → console → export → PWA → site integration. Each phase is independently verifiable.

## Phase 1: Project Setup & Editor Foundation

Install CodeMirror 6 packages, create route structure, build three-pane editor layout with syntax highlighting and theme support.

### Tasks

- [x] Task 1.1: Install CodeMirror 6 dependencies (`@codemirror/view`, `@codemirror/state`, `@codemirror/lang-html`, `@codemirror/lang-css`, `@codemirror/lang-javascript`, `@codemirror/autocomplete`, `@codemirror/theme-one-dark`, `@codemirror/lint`)
- [x] Task 1.2: Create route structure at `src/routes/products/(utilities)/html-editor/` with `+page.svelte`, `+page.ts`, `_components/`, `_lib/`
- [x] Task 1.3: Build `EditorPane.svelte` — reusable CodeMirror 6 wrapper component (language prop, theme binding to isDark store, placeholder text, reactive value get/set)
- [x] Task 1.4: Build `EditorLayout.svelte` — three-pane layout (HTML/CSS/JS tabs or side-by-side) with resizable panels, responsive collapse on mobile
- [x] Task 1.5: Create `store.ts` — editor state store (htmlCode, cssCode, jsCode, activeTab, layout preferences, preview settings)
- [x] Task 1.6: Build custom CodeMirror theme matching Arbenger design system (navy-950 background, cyan-400 accents, JetBrains Mono font)
- [x] Task 1.7: Wire up `+page.svelte` with EditorLayout, navbar integration, page metadata

### Verification

- [ ] Three editor panes render with syntax highlighting, theme toggles between dark/light, code is editable with autocomplete

## Phase 2: Live Preview Engine

Build sandboxed iframe preview that updates as user types, with debounce and manual run toggle.

### Tasks

- [x] Task 2.1: Build `PreviewPane.svelte` — sandboxed iframe with `srcdoc` rendering, border/background matching theme
- [x] Task 2.2: Implement preview update engine — debounced (300ms) compilation of HTML + CSS + JS into single document, injected via srcdoc
- [x] Task 2.3: Add auto-run toggle — switch between live auto-update and manual "Run" button mode
- [x] Task 2.4: Add preview toolbar — Run button, auto-run toggle, clear preview, open in new tab
- [x] Task 2.5: Handle iframe errors — catch runtime JS errors via `window.onerror` / `unhandledrejection` inside iframe, surface to parent

### Verification

- [ ] Typing in any pane updates preview after debounce, manual run mode works, JS errors caught and surfaced

## Phase 3: Prettier Integration

Add format-on-click for HTML, CSS, and JavaScript using Prettier standalone browser build.

### Tasks

- [x] Task 3.1: Install Prettier standalone (`prettier`) and configure dynamic ESM import for browser parsers (`prettier/plugins/html`, `prettier/plugins/postcss`, `prettier/plugins/babel`, `prettier/plugins/estree`)
- [x] Task 3.2: Build `formatter.ts` utility — async format functions for HTML, CSS, JS with error handling (return unformatted on parse failure)
- [x] Task 3.3: Add Format button to each editor pane toolbar (or single "Format All" button)
- [x] Task 3.4: Add keyboard shortcut (Shift+Alt+F) for format current pane
- [x] Task 3.5: Show toast notification on format success/failure

### Verification

- [ ] Clicking Format on messy code produces clean output, handles malformed code gracefully, keyboard shortcut works

## Phase 4: Inline Error Detection (Error Lens)

Add real-time linting with inline error/warning display using HTMLHint, CSSTree, and a lightweight JS linter.

### Tasks

- [x] Task 4.1: Install linting dependencies (`htmlhint`, `csstree-validator` or `csstree`)
- [x] Task 4.2: Build `linter-worker.ts` — Web Worker that runs HTMLHint (HTML), CSSTree (CSS), and basic JS syntax checking (try/catch `new Function()`) off main thread
- [x] Task 4.3: Build `linting.ts` — bridge between worker results and CodeMirror `@codemirror/lint` diagnostics API
- [x] Task 4.4: Implement Error Lens-style inline display — show error/warning message text at end of offending line using CodeMirror decorations (red for errors, yellow for warnings)
- [x] Task 4.5: Add lint gutter with severity icons (error/warning/info)
- [x] Task 4.6: Add toggle to enable/disable linting per pane

### Verification

- [ ] Typing invalid HTML/CSS/JS shows inline error messages at line ends, gutter icons appear, linting runs without UI jank

## Phase 5: Emmet Support

Add Emmet abbreviation expansion in HTML and CSS panes.

### Tasks

- [x] Task 5.1: Install `@emmetio/codemirror6-plugin`
- [x] Task 5.2: Integrate Emmet plugin into HTML and CSS EditorPane instances
- [x] Task 5.3: Configure Tab-to-expand behavior (with proper fallback when cursor is not in an Emmet abbreviation)
- [x] Task 5.4: Test common abbreviations (`div.container>ul>li*5`, `m10`, `bgc`, etc.)

### Verification

- [ ] Typing Emmet abbreviations and pressing Tab expands them correctly in both HTML and CSS panes

## Phase 6: Responsive Preview

Add device preset buttons to preview pane for testing at different viewport sizes.

### Tasks

- [x] Task 6.1: Build `DevicePresets.svelte` — toolbar with preset buttons (Mobile 375x667, Tablet 768x1024, Desktop 1440x900, Custom, Full Width)
- [x] Task 6.2: Implement iframe resizing with device frame styling (rounded corners, device chrome optional)
- [x] Task 6.3: Add orientation toggle (portrait/landscape) for mobile and tablet presets
- [x] Task 6.4: Show current viewport dimensions label

### Verification

- [ ] Clicking device presets resizes preview iframe correctly, orientation toggle works, dimensions label updates

## Phase 7: Built-in Console

Capture and display console output and runtime errors from preview iframe.

### Tasks

- [x] Task 7.1: Build `ConsolePane.svelte` — log display panel with color-coded entries (log=white, warn=yellow, error=red, info=blue)
- [x] Task 7.2: Inject console override script into iframe srcdoc — intercept `console.log/warn/error/info/clear`, serialize arguments, `postMessage` to parent
- [x] Task 7.3: Handle object/array serialization (JSON.stringify with circular reference handling, truncation for large objects)
- [x] Task 7.4: Add console toolbar — clear button, filter by level (log/warn/error/info), entry count badges
- [x] Task 7.5: Capture runtime errors (`window.onerror`, `unhandledrejection`) and display as error entries with stack trace
- [x] Task 7.6: Add collapsible console panel (drag to resize height, toggle open/closed)

### Verification

- [ ] `console.log("test")` in JS pane shows in console panel, errors display with red styling, clear and filter work

## Phase 8: Export

Add export as ZIP (separate files) and standalone HTML (single file with inlined CSS/JS).

### Tasks

- [x] Task 8.1: Build `exporter.ts` — two export modes: ZIP (html + style.css + script.js via JSZip) and standalone HTML (CSS in `<style>`, JS in `<script>`, single .html file)
- [x] Task 8.2: Add Export button to toolbar with dropdown (Export as ZIP, Export as HTML)
- [x] Task 8.3: Generate clean filenames (index.html, style.css, script.js)
- [x] Task 8.4: Trigger browser download via Blob URL
- [x] Task 8.5: Show toast on export success

### Verification

- [ ] Export ZIP contains 3 files with correct content, standalone HTML opens in browser and works, download triggers correctly

## Phase 9: PWA & Offline Support

Add Service Worker caching and IndexedDB session persistence for offline usage.

### Tasks

- [x] Task 9.1: Create Service Worker for editor route — cache CodeMirror bundles, Prettier parsers, app shell assets
- [x] Task 9.2: Implement IndexedDB storage for editor state — save current HTML/CSS/JS on every change (debounced), restore on page load
- [x] Task 9.3: Add "Last saved" indicator in toolbar
- [x] Task 9.4: Add manifest.json entries for HTML Editor (PWA installable)
- [x] Task 9.5: Test offline flow — load page, disconnect, verify editor still works with cached assets

### Verification

- [ ] Editor loads and functions fully offline after first visit, code persists across page refreshes, PWA install prompt appears

## Phase 10: Site Integration & Polish

Add product page entry, blog post, update product catalog, sitemap, SEO metadata, navigation.

### Tasks

- [x] Task 10.1: Add HTML Editor to product data in `src/lib/data/products.ts` with description, features, icon, category
- [x] Task 10.2: Update products page to display HTML Editor in utilities category
- [x] Task 10.3: Add SEO metadata — MetaTags, JSON-LD (SoftwareApplication), Open Graph
- [x] Task 10.4: Add to sitemap.xml generation
- [x] Task 10.5: Update homepage FeaturedTool or ProductCategories if applicable
- [x] Task 10.6: Write blog post tutorial (`_posts/` entry) — "How to Use Arbenger's Free HTML Editor"
- [x] Task 10.7: Add navigation link in navbar product dropdown
- [x] Task 10.8: Final responsive testing — mobile, tablet, desktop, both themes
- [x] Task 10.9: Performance audit — ensure LCP < 2.0s, lazy-load CodeMirror if needed

### Verification

- [ ] Product appears in catalog, blog post renders correctly, SEO metadata valid, navigation works, responsive on all viewports, performance targets met

## Final Verification

- [ ] All 10 acceptance criteria met
- [ ] Both dark and light themes tested across all components
- [ ] Mobile/tablet/desktop responsive layout verified
- [ ] `yarn check` passes with no errors
- [ ] `yarn build` succeeds
- [ ] Documentation updated (product docs, architecture, changelog)
- [ ] Ready for deploy

---

_Generated by Conductor. Tasks will be marked [~] in progress and [x] complete._
