# Image Compressor

**Last updated:** 2026-05-11

Comprehensive documentation for the Arbenger Image Compressor — a fully client-side image compression tool with quality control, target size mode, and before/after comparison.

---

## 1. Overview

The Image Compressor allows users to compress PNG, JPEG, and WebP images entirely in the browser with no server uploads, no signups, and no tracking.

| Property | Value |
|----------|-------|
| URL | `/products/image-compressor` |
| Route file | `src/routes/products/(utilities)/image-compressor/+page.svelte` |
| Category | Utilities (`misc-tools`) |
| Status | Live |
| Platform | Web (any modern browser) |
| Pre-rendered | Yes |
| Privacy | 100% client-side — images never leave the browser |

### Key Features

- **Single image mode:** Upload one image, compress, compare before/after, download
- **Batch mode:** Upload multiple images, apply shared settings, download as ZIP
- **Quality slider:** Controls JPEG/WebP quality (0-100) and PNG color quantization
- **Target size mode:** Specify a maximum file size — binary search finds the highest quality that fits
- **Before/after comparison:** Zoomable slider (up to 2000%) with pinch-to-zoom on mobile
- **Format conversion:** Keep original, or convert to JPEG, PNG, or WebP
- **Smart result capping:** If compression produces a larger file (same format), keeps the original
- **Batch auto-naming:** Sequential, prefix-original, original-suffix, number-only, template patterns
- **Batch ZIP download:** All compressed images exported as a single ZIP file via `jszip`
- **Web Worker:** All compression (JPEG/WebP via OffscreenCanvas, PNG via UPNG) runs off the main thread
- **Duplicate detection:** Re-uploading the same file is automatically skipped
- **Drag and drop, clipboard paste, keyboard shortcuts** (Ctrl+V, Escape)

---

## 2. Architecture

### File Structure

```
src/routes/products/(utilities)/image-compressor/
  +page.svelte                    <- Main page component
  +page.ts                       <- export const prerender = true
  _components/
    CompareSlider.svelte          <- Before/after comparison slider with zoom/pan
    CompressControls.svelte       <- Quality slider, target size, format, filename
    CompressInfoPanel.svelte      <- File info display + compress/download actions
    BatchImageList.svelte         <- Batch mode image list with reorder, rename
    ThumbnailStrip.svelte         <- Horizontal thumbnail strip for multi-image navigation
  _lib/
    store.ts                      <- All state management, types, constants, exported functions
    worker.ts                     <- Web Worker for compression (canvas + UPNG)
```

### Shared UI Components Used

| Component | Usage |
|-----------|-------|
| `UploadZone.svelte` | Drag-drop + click-to-upload zone (shared component) |
| `Select.svelte` | Format selector, target unit selector, naming pattern |
| `ConfirmDialog.svelte` | Clear-all confirmation dialog, leave-page guard |

---

## 3. Store (`_lib/store.ts`)

### Exported Types

- `ImageFormat` — `'image/png' | 'image/jpeg' | 'image/webp'`
- `QualityMode` — `'quality' | 'target-size'`
- `ProcessingState` — `'idle' | 'loading' | 'compressing' | 'exporting'`
- `NamingPattern` — `'sequential' | 'prefix-original' | 'original-suffix' | 'number-only' | 'template'`
- `ImageEntry` — loaded image with id, file, dimensions, size, thumbnail URL, bitmap
- `CompressSettings` — compression configuration (qualityMode, quality, targetSize, targetUnit, format, filename)
- `CompressResult` — compression output (blob, dimensions, size, object URL, quality)

### Stores

| Store | Type | Description |
|-------|------|-------------|
| `images` | `Writable<ImageEntry[]>` | All loaded images |
| `activeImageId` | `Writable<string \| null>` | Selected image ID |
| `activeImage` | `Derived` | Current image entry |
| `settings` | `Writable<CompressSettings>` | Active image's compression settings |
| `result` | `Writable<CompressResult \| null>` | Active image's compression result |
| `processingState` | `Writable<ProcessingState>` | Global processing state |
| `batchProgress` | `Writable<{current, total} \| null>` | Batch export progress |
| `batchExported` | `Writable<boolean>` | Whether batch ZIP has been downloaded |
| `filenameRevision` | `Writable<number>` | Filename change counter for reactivity |
| `totalProcessed` | `Writable<number \| null>` | Lifetime stats count |
| `hasImages` | `Derived<boolean>` | Whether images list is non-empty |
| `hasUnprocessedImages` | `Derived<boolean>` | True when images exist and batch not exported |
| `imageCount` | `Derived<number>` | Number of loaded images |
| `isBatchMode` | `Derived<boolean>` | True when > 1 image loaded |

### Exported Functions

| Function | Purpose |
|----------|---------|
| `addImages(files)` | Validate files, detect duplicates, create ImageBitmaps, add to store |
| `selectImage(id)` | Switch active image, save/restore per-image settings |
| `removeImage(id)` | Remove image, revoke URLs, close bitmap |
| `clearAll(silent?)` | Remove all images, revoke URLs, reset state |
| `reorderImages(from, to)` | Reorder images array (batch mode) |
| `updateImageFilename(id, name)` | Update per-image filename |
| `applyBatchNaming(pattern, prefix, template)` | Apply naming pattern to all images |
| `getImageFilename(id)` | Get filename for an image |
| `performCompress()` | Execute compression with toast feedback |
| `downloadResult()` | Download active image result |
| `downloadAllAsZip()` | Batch compress and ZIP download |
| `destroyWorker()` | Terminate Web Worker |
| `formatBytes(bytes)` | Human-readable file size |
| `formatName(format)` | Format display name |
| `getOutputFormat(entry, settings)` | Resolve output format from settings |
| `fetchStats()` | Fetch stats from `/api/stats/?toolId=image-compressor` |

### Per-Image State (Map-based)

- `imageResultMap: Map<string, CompressResult>` — per-image compression results
- `imageSettingsMap: Map<string, CompressSettings>` — per-image settings (including filename)

---

## 4. Worker (`_lib/worker.ts`)

The worker handles compression off the main thread. It supports four message types:

### Message Protocol

| Request Type | Purpose | Key Fields |
|-------------|---------|------------|
| `compress` | JPEG/WebP compression via OffscreenCanvas | `bitmap`, `format`, `quality` |
| `compress-png` | PNG compression via UPNG color quantization | `bitmap`, `cnum` |
| `target-size` | Binary search for target size (JPEG/WebP) | `bitmap`, `format`, `targetBytes` |
| `target-size-png` | Binary search for target size (PNG) | `bitmap`, `targetBytes` |

**Response types:** `result` (blob + metadata), `target-result` (blob + quality + metadata), `error` (message)

### PNG Compression

PNG compression uses `upng-js` (imported directly in the worker). The quality slider maps to a color count (`cnum`):
- Quality 100 → `cnum = 0` (lossless re-encoding)
- Quality < 100 → `cnum = max(2, round(quality * 256 / 100))` (color quantization)

### Target Size Mode

Binary search algorithm (8 iterations max):
- **JPEG/WebP:** Search over quality 0.01-1.0
- **PNG:** Try lossless first; if too large, search over cnum 2-256

### Fallback

If Web Workers are unavailable, the store falls back to main-thread compression using `document.createElement('canvas')` and direct UPNG calls.

---

## 5. Components

### CompareSlider

Before/after comparison slider with:
- Original image (full width) and compressed image (clipped by slider position)
- Drag handle with 40px touch target for mobile
- Scroll wheel zoom (up to 2000%) anchored to cursor position
- Pinch-to-zoom on mobile via touch events
- Pan when zoomed (click-drag on desktop, touch-drag on mobile)
- `touch-pan-y` when not zoomed (allows page scroll), `touch-none` when zoomed
- Zoom controls (zoom in, zoom out, reset) in top-right corner
- Zoom level indicator in top-left
- Labels showing original size and compressed size with reduction percentage
- Resets slider/zoom on each new compression result and on image switch

### CompressControls

Control panel with:
- Quality mode toggle (Quality / Target Size)
- Quality slider (1-100) with numeric input
- Target size input with KB/MB unit selector
- Target size validation (cannot exceed original, amber warning + disabled compress button)
- Output format select (Same as original, JPEG, PNG, WebP)
- PNG info note (explains color quantization behavior)
- Target size PNG info note (explains lossless-first, then quantization)
- Filename input (single mode only, hidden in batch)
- Accepts `batch` prop to hide filename in batch mode

### CompressInfoPanel

Displays file information and action buttons:
- Stats grid: original size/format, dimensions, compressed size/format, reduction percentage
- Reduction display: green "X% smaller", amber "X% larger", or "Already optimized"
- Compress button (disabled when target exceeds original)
- Download button (visible after compression)
- Batch mode: image count, total size, quality, Compress & Download ZIP button
- Accepts `batch` prop

### BatchImageList

Batch mode interface matching the image resizer's layout:
- Toolbar: image count, Auto-name toggle (Wand2 icon), Add button, Clear button
- Naming panel: pattern select (5 patterns), prefix/suffix/template inputs, Apply button
- Header row: #, Output name, Orig. size, Orig. dims columns
- Image rows: drag handle, number, thumbnail, editable filename input, original size, dimensions, hover-to-reveal delete button
- No item selection (unlike single mode) — all images share settings from sidebar

### ThumbnailStrip

Horizontal thumbnail strip for single-image mode with multiple images loaded. Shows thumbnails, allows switching between images, adding more files, and clearing all.

---

## 6. Data Flow

### Single Image Mode

```
User drops file -> addImages() -> fileToBitmap() -> ImageEntry added to images store
                                                  -> activeImageId set
                                                  -> default filename set ({baseName}-compressed)

User adjusts settings -> settings store updated
                       -> per-image settings saved in Map

User clicks Compress -> performCompress() -> Worker receives bitmap + settings
                                          -> Worker returns blob
                                          -> If result >= original (same format): keeps original
                                          -> CompressResult saved in Map + result store

User clicks Download -> downloadResult() -> Uses filename from settings + format extension
```

### Batch Mode

```
User drops multiple files -> addImages() -> Multiple ImageEntries created
                                          -> isBatchMode becomes true
                                          -> UI switches to BatchImageList + sidebar controls

User configures settings -> settings store updated (shared for all)
User applies naming pattern -> applyBatchNaming() -> All image filenames updated

User clicks Compress & Download ZIP -> downloadAllAsZip() -> For each image:
                                                              -> Compress with shared settings
                                                              -> Add blob to JSZip with per-image filename
                                                           -> Generate ZIP blob
                                                           -> Trigger download
```

### Target Size Flow

```
User selects Target Size mode -> Target size input appears with original size reference
User enters target (e.g. 200 KB) -> Validation checks against original size
User clicks Compress -> doTargetSize() -> PNG: try lossless first, then binary search cnum 2-256
                                       -> JPEG/WebP: binary search quality 0.01-1.0 (8 iterations)
                                       -> If result still exceeds target: warning toast with achievable minimum
```

---

## 7. SEO

| Element | Value |
|---------|-------|
| Title | "Free Image Compressor — Compress PNG, JPEG, WebP Online \| Arbenger" |
| Meta description | "Compress PNG, JPEG, and WebP images up to 90% smaller. Quality slider, target size mode, and live before/after preview. No uploads — 100% private and free." |
| H1 | "Free Online Image Compressor — Reduce File Size Without Quality Loss" (sr-only) |
| JSON-LD #1 | WebApplication schema |
| JSON-LD #2 | BreadcrumbList: Home -> Products -> Image Compressor |
| Visual breadcrumb | `Home / Products / Image Compressor` in top bar |
| Guide link | "Guide" link (BookOpen icon) in top bar -> `/blog/how-to-use-image-compressor/` |
| Blog post | "How to Use Arbenger Image Compressor — The Complete Guide" at `/blog/how-to-use-image-compressor/` |
| Canonical | `https://arbenger.com/products/image-compressor` |
| Sitemap | Priority 0.7, weekly changefreq |
| Cross-link | "Need to resize instead? Try Image Resizer" link at page bottom |
| Browser warning | Amber banner when `createImageBitmap`, `OffscreenCanvas`, or `Worker` is missing |

---

## 8. Supported File Formats

### Input

| Format | MIME Type | Max Size |
|--------|----------|----------|
| PNG | `image/png` | 50 MB |
| JPEG | `image/jpeg` | 50 MB |
| WebP | `image/webp` | 50 MB |

Files over 50 MB trigger a warning toast but are still processed. Unsupported formats are rejected with a warning count. Duplicate uploads (matched by `name + size + lastModified`) are automatically skipped with a toast notification.

### Output

| Format | Extension | Quality Control | Compression Method |
|--------|-----------|----------------|-------------------|
| JPEG | `.jpg` | Quality slider (0-100) | Canvas `toBlob` (lossy) |
| WebP | `.webp` | Quality slider (0-100) | Canvas `toBlob` (lossy) |
| PNG | `.png` | Quality slider (0-100) | UPNG color quantization (100 = lossless, lower = fewer colors) |

---

## 9. Keyboard & Paste Support

| Action | Trigger |
|--------|---------|
| Paste image from clipboard | `Ctrl+V` / `Cmd+V` anywhere on the page |
| Clear all images | `Escape` key when images are loaded |

---

## 10. Navigation Guards

Same pattern as image resizer:

| Guard | Mechanism | UI |
|-------|-----------|-----|
| In-app navigation | `beforeNavigate` from `$app/navigation` | Custom `ConfirmDialog` (warning variant, LogOut icon) |
| Browser refresh / close | `beforeunload` event | Native browser prompt |

Both guards check `$hasUnprocessedImages`, which is `true` when images exist and `batchExported` is `false`.

---

## 11. Dependencies

| Package | Purpose |
|---------|---------|
| `upng-js` | PNG compression via color quantization (imported in worker and main-thread fallback) |
| `jszip` | Batch ZIP export (dynamically imported) |
| `svelte-sonner` | Toast notifications |

---

## 12. Stats Tracking

The compressor tracks usage via `/api/stats/?toolId=image-compressor`:

- `trackStats(count)` — POST after each single compress or batch ZIP, with `keepalive: true`
- `fetchStats()` — GET on mount, refreshes `totalProcessed` store
- Stats UI section at page bottom shows lifetime count with trust badges (when count > 0)
