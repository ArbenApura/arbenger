# Image Resizer Tool Design Spec

**Date:** 2026-05-09
**Status:** Approved
**Author:** Arben Apura

---

## 1. Overview

A fully client-side image resizer tool — the first Misc Tool on Arbenger. Users can resize single or batch images with custom dimensions, presets, aspect ratio lock, format conversion, and quality control. All processing happens in the browser via OffscreenCanvas in a Web Worker. Images never leave the user's device.

### Goals

- Practical, tool-first page — no marketing fluff, immediate interaction
- Full-featured resizer competitive with standalone tools
- Zero server-side image processing — complete client-side privacy
- Fast, non-blocking UI via Web Worker architecture
- Matches "Terminal Meets Luxury" brand aesthetic
- Clear loading states for every async operation

### Non-Goals

- Image editing (crop, rotate, filters, color adjustments)
- Server-side processing or storage
- User accounts or saved history
- Watermarking or branding on output

---

## 2. Route & Page Structure

**Route:** `/products/misc/image-resizer`

**Files:**
- `src/routes/products/misc/image-resizer/+page.svelte` — Tool page
- `src/routes/products/misc/image-resizer/+page.ts` — Prerender config

**Page structure (top to bottom):**
1. Breadcrumbs (small): Home > Products > Misc > Image Resizer
2. Privacy note: One-line terminal-styled text — `> Your images never leave your browser. All processing happens locally.`
3. Upload zone (initial state) — replaced by workspace after upload
4. Tool workspace — thumbnail strip + editor panel

**SEO:**
- Title: `Image Resizer — Resize Images Online Free | Arbenger`
- Description: ~155 chars emphasizing free, private, client-side, no upload
- JSON-LD: `WebApplication` schema with `operatingSystem: "Any"`, `applicationCategory: "UtilitiesApplication"`
- Canonical: `https://arbenger.com/products/misc/image-resizer`

---

## 3. Upload Zone

**Initial state (no images loaded):**
- Large dashed-border drop area, full width
- Styled: navy-800 bg, navy-700 dashed border, rounded-xl
- Center content: Upload icon + "Drop images here, paste, or" + file picker button (primary cyan)
- Accepts: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.bmp`, `.svg`
- Multi-file select enabled
- Global `Ctrl+V` / `Cmd+V` paste listener on the page

**After upload:**
- Upload zone collapses — replaced by workspace
- To add more images: "+ Add" button in the thumbnail strip

**Validation:**
- Reject non-image files with toast (svelte-sonner): "Unsupported file type"
- Warn via toast if single file exceeds 50MB: "Large file — processing may be slow"
- Toast confirmation on paste: "Image pasted"

---

## 4. Tool Workspace Layout

### Desktop (lg+)

```
┌─────────────────────────────────────────────────┐
│ [thumb1] [thumb2] [thumb3] [+ Add]              │  Thumbnail strip
├────────────────────────────┬────────────────────┤
│                            │ Resize             │
│                            │ W [____] × H [____]│
│                            │ 🔗 Lock aspect      │
│     Preview Canvas         │ ↔ Swap              │
│     (slider overlay        │ Scale: [dropdown]   │
│      for before/after)     │ Presets: [dropdown] │
│                            │ Fit max: [____]     │
│                            ├────────────────────┤
│                            │ Output             │
│                            │ Format: [PNG ▾]    │
│                            │ Quality: [===●──]  │
│                            │ Algorithm: [▾]     │
│                            │ Fill color: [■]    │
│                            │ Filename: [____]   │
│                            ├────────────────────┤
│                            │ Info               │
│                            │ Original: 1920×1080│
│                            │ New: 1280×720      │
│                            │ Size: ~245 KB      │
│                            │ Reduction: ↓ 89%   │
├────────────────────────────┤                    │
│  [◀ Original | Resized ▶]  │ [Download]         │
│  ← slider drag handle     │ [Download All ZIP]  │
└────────────────────────────┴────────────────────┘
```

- Preview: 60% width, Controls: 40% width

### Mobile

- Stacked: preview on top, controls below, scrollable
- Thumbnail strip remains horizontal-scrollable at top

---

## 5. Resize Controls

### Custom Dimensions
- Two number inputs (W × H) with "px" suffix label
- Populated with original dimensions on load
- Typing in one auto-calculates the other when aspect lock is on

### Aspect Ratio Lock
- Toggle button between W and H inputs — link/unlink icon (lucide)
- Locked by default on load
- Cyan-400 when locked, slate-400 when unlocked

### Swap Button
- Small `↔` icon button below dimensions — swaps W and H values instantly

### Scale by Percentage
- Dropdown: 25%, 50%, 75%, 100%, 125%, 150%, 200%, 300%, Custom
- Custom opens inline number input with `%` suffix
- Selecting a preset updates W/H inputs

### Presets (Grouped Dropdown)
- Three groups with dividers:
  - **Social Media:** Instagram (1080×1080), Twitter/X (1600×900), YouTube (1280×720), LinkedIn (1200×627), Facebook (1200×630)
  - **Screens:** HD (1280×720), Full HD (1920×1080), 4K (3840×2160)
  - **App Icons:** 16×16, 32×32, 64×64, 128×128, 256×256, 512×512
- Selecting a preset fills W/H and unlocks aspect ratio

### Fit to Max Dimension
- Number input with label "Longest side"
- Auto-calculates both W/H maintaining aspect ratio, constraining the larger dimension

### Interconnection Rule
All controls are interconnected — changing one updates the others. Scale % ↔ W/H ↔ Presets ↔ Fit max. Preview updates in real-time (debounced 300ms).

---

## 6. Output Controls

### Format Selection
- Dropdown: PNG (default), JPEG, WebP
- Changing format updates estimated file size in info panel

### Quality Slider
- Range input, 1–100, default 92
- Only visible when format is JPEG or WebP (hidden for PNG)
- Shows current numeric value beside slider
- Updates estimated file size (debounced 300ms)

### Resize Algorithm
- Dropdown:
  - **Smooth** (default) — `imageSmoothingQuality: 'high'`
  - **Pixelated** — `imageSmoothingEnabled: false`
- Hint text below: "Use Pixelated for pixel art" (text-xs, slate-400)

### Background Fill Color
- Only visible when resize creates empty space (letterboxing)
- Native `<input type="color">` + hex text input
- Default: transparent (checkerboard) for PNG/WebP, white (#FFFFFF) for JPEG
- Transparent option shown as checkerboard swatch

### Filename
- Text input, pre-filled with `{original-name}-{W}x{H}`
- Extension auto-appended based on format
- User can edit freely

### Download
- **"Download"** — Primary button (cyan bg), downloads active image
- **"Download All as ZIP"** — Secondary button, visible when 2+ images loaded
- ZIP uses JSZip (~45KB gzipped), dynamically imported on click

---

## 7. Preview & Comparison

### Preview Canvas
- Renders resized image in real-time as controls change
- Fits within container maintaining aspect ratio (`object-fit: contain`)
- Checkerboard background to show transparency
- Shows original when no resize applied yet

### Slider Overlay (Before/After)
- Vertical divider: 2px line, cyan-400, with draggable circular handle
- Left side: original, right side: resized
- Handle: circular grab indicator with cyan glow
- Drag or click anywhere to move divider
- Default position: 50%
- Labels above: "Original" (left) / "Resized" (right) in Satoshi, text-xs, slate-400

### Info Panel
- Three rows, label + value in Satoshi with tabular-nums:
  - `Original` — `1920 × 1080 · PNG · 2.4 MB`
  - `Resized` — `1280 × 720 · JPEG · ~245 KB`
  - `Reduction` — `↓ 89%` in teal-400 (or `↑ 150%` in slate-400 if larger)
- File size recalculates on every resize/quality/format change

### Thumbnail Strip (Batch)
- Horizontal scrollable row, fixed height ~72px
- Each thumbnail: 56×56px square crop preview, rounded-lg, navy-700 border
- Active: cyan-400 border + subtle glow
- Hover: slight scale up
- "✕" remove button on hover (top-right corner)
- "+ Add" button at end: dashed border square, 56×56px

---

## 8. Loading States

Every async operation has explicit visual feedback:

| Operation | Loading State |
|-----------|--------------|
| File reading | Skeleton placeholder in thumbnail strip with pulse animation |
| Resize processing | Spinner overlay on preview canvas + "Resizing..." label |
| Export/download | Button shows spinner + "Preparing..." text, disabled |
| Batch ZIP | Progress bar + "Processing 3 / 7..." text |
| Paste detection | Toast: "Image pasted" |
| Error | Toast with specific message, never silent fail |

- All spinners/skeletons use cyan-400
- Interactive elements disabled during their processing state

---

## 9. Web Worker Architecture

### Worker File
`src/lib/workers/image-resize.worker.ts`

### Flow
1. Main thread reads file → creates `ImageBitmap` via `createImageBitmap()`
2. Transfers `ImageBitmap` to worker (zero-copy via transferable)
3. Worker creates `OffscreenCanvas` at target dimensions
4. Worker draws bitmap with specified smoothing settings
5. Worker fills background color if letterboxing needed
6. Worker converts to blob via `offscreenCanvas.convertToBlob()`
7. Worker sends blob back to main thread

### Message Protocol

```typescript
// Main → Worker
type ResizeRequest = {
  type: 'resize';
  id: string;
  bitmap: ImageBitmap;
  width: number;
  height: number;
  format: 'image/png' | 'image/jpeg' | 'image/webp';
  quality: number; // 0-1
  smoothing: boolean;
  smoothingQuality: 'low' | 'medium' | 'high';
  bgColor: string | null; // null = transparent
};

// Worker → Main
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

type BatchProgress = {
  type: 'progress';
  current: number;
  total: number;
};
```

### Batch Processing
- "Download All as ZIP" triggers sequential worker calls (one at a time to manage memory)
- Progress reported per image
- User sees progress bar + count

### Fallback
- If `OffscreenCanvas` unavailable (older Safari): fall back to main-thread `<canvas>`
- Same API surface, synchronous execution
- Console warning logged

### Worker Lifecycle
- Single worker instance, reused across all operations
- Terminated on page navigation (`onDestroy`)

---

## 10. Privacy

- One-line text at top with lock icon: "Your images never leave your browser. All processing happens locally." — Satoshi, text-xs, slate-400
- Zero network requests from the tool (verifiable in DevTools Network tab)
- No analytics on image content, dimensions, or filenames
- Images held in memory only — released on page navigation or "Clear all"
- No cookies or localStorage used by the tool

---

## 11. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+V` / `Cmd+V` | Paste image from clipboard |
| `Enter` | Download active image |
| `Escape` | Clear all images / return to upload zone |
| `Delete` | Remove active image from batch |

---

## 12. Dependencies

| Package | Size | Purpose |
|---------|------|---------|
| JSZip | ~45KB gzipped | Batch ZIP download, dynamically imported |

No other new dependencies. Canvas API, Web Workers, and OffscreenCanvas are all browser-native.

---

## 13. Styling

Tool pages use a clean, practical design — not the "Terminal Meets Luxury" aesthetic used on marketing pages. No terminal-style section labels, no monospaced labels, no `>` prompt prefixes.

- **Section headings:** Satoshi, text-sm, font-semibold, simple heading text
- **Labels:** Satoshi, text-xs, font-medium, slate colors
- **Cards/panels:** rounded-xl, subtle borders, themed bg
- **Inputs:** rounded-lg, border, proper focus rings with brand accent
- **Buttons:** Primary (cyan bg, navy/white text), Secondary (cyan border)
- **Effects:** Glow on active thumbnail, hover transitions
- **Dark/light:** Full theme support via Tailwind `dark:` variants
- **Layout:** min-h-screen with pt-24 to clear fixed navbar, flex-col to fill viewport

---

## 14. Sitemap & Navigation Updates

- Add `/products/misc/image-resizer` to sitemap.xml with priority 0.7, changefreq weekly
- Update products data to include this tool under Misc category with status "Live" (not "Coming soon")
- Link from products page grid
