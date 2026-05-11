# Image Resizer

**Last updated:** 2026-05-11

Comprehensive documentation for the Arbenger Image Resizer — a fully client-side image resizing, cropping, and format conversion tool.

---

## 1. Overview

The Image Resizer is one of Arbenger's live products. It allows users to resize, crop, and convert images entirely in the browser with no server uploads, no signups, and no tracking.

| Property | Value |
|----------|-------|
| URL | `/products/image-resizer` |
| Route file | `src/routes/products/(utilities)/image-resizer/+page.svelte` |
| Category | Utilities (`misc-tools`) |
| Status | Live |
| Platform | Web (any modern browser) |
| Pre-rendered | Yes |
| Privacy | 100% client-side — images never leave the browser |

### Key Features

- **Single image mode:** Upload one image, resize, crop, convert, download
- **Batch mode:** Upload multiple images, apply shared settings, download as ZIP
- **Drag and drop:** File upload via drag-and-drop zone
- **Clipboard paste:** Ctrl+V to paste images from clipboard
- **Interactive crop:** Visual crop dialog with drag handles
- **Format conversion:** PNG, JPEG, WebP output formats
- **Fit modes:** Stretch (distort to fit), Contain (letterbox), Cover (crop to fill)
- **Background fill:** Custom background color for contain mode or JPEG transparency
- **Quality control:** JPEG/WebP quality slider (0-100)
- **Scale presets:** 25%, 50%, 75%, 100%, 125%, 150%, 200%, 300%
- **Dimension presets:** Social media (Instagram, Twitter/X, YouTube, LinkedIn, Facebook), Screens (HD, FHD, 4K), App icons (16-512px)
- **Batch auto-naming:** Sequential, prefix-original, original-suffix, number-only, template patterns
- **Batch ZIP download:** All resized images exported as a single ZIP file via `jszip`
- **OffscreenCanvas Web Worker:** Resize operations run off the main thread for smooth UI

---

## 2. Architecture

### File Structure

```
src/routes/products/(utilities)/image-resizer/
  +page.svelte                    ← Main page component
  +page.ts                       ← export const prerender = true
  _components/
    PreviewCanvas.svelte          ← Image preview with resize result overlay
    ThumbnailStrip.svelte         ← Horizontal thumbnail strip for multi-image navigation
    ResizeControls.svelte         ← Width/height inputs, format, quality, fit mode, presets
    InfoPanel.svelte              ← File info display + resize/download actions
    BatchImageList.svelte         ← Batch mode image list with reorder, rename, crop
    CropDialog.svelte             ← Modal crop interface with drag handles
  _lib/
    store.ts                      ← All state management, types, constants, exported functions
    worker.ts                     ← OffscreenCanvas Web Worker for resize operations
```

### Why Route-Local?

All components, store, and worker are colocated inside the route directory (using `_` prefix to exclude from SvelteKit routing). This pattern is used because:

1. These components are only used by this one page
2. The store manages complex, page-specific state (image entries, per-image settings, crop data, worker lifecycle)
3. The worker is specific to this tool's resize operations
4. It keeps the shared `src/lib/` clean for truly reusable code

### Shared UI Components Used

The image resizer uses these components from `src/lib/components/ui/`:

| Component | Usage |
|-----------|-------|
| `UploadZone.svelte` | Drag-drop + click-to-upload zone (shared component) |
| `Select.svelte` | Format selector, fit mode selector, preset groups |
| `ColorPicker.svelte` | Background color picker for contain/JPEG modes |
| `ConfirmDialog.svelte` | Clear-all confirmation dialog, leave-page guard |

---

## 3. Store (`_lib/store.ts`)

The store module is the core of the image resizer. It exports types, constants, writable/derived stores, and all action functions.

### Exported Types

- `ImageFormat` — `'image/png' | 'image/jpeg' | 'image/webp'`
- `ResizeAlgorithm` — `'smooth' | 'pixelated'`
- `FitMode` — `'stretch' | 'contain' | 'cover'`
- `CropData` — `{ x, y, width, height }`
- `ImageEntry` — loaded image with id, file, dimensions, thumbnail URL, bitmap
- `ResizeSettings` — per-image resize configuration (dimensions, format, quality, fit, bg, filename)
- `ResizeResult` — resize output (blob, dimensions, size, object URL)
- `ProcessingState` — `'idle' | 'loading' | 'resizing' | 'downloading' | 'exporting'`
- `NamingPattern` — `'sequential' | 'prefix-original' | 'original-suffix' | 'number-only' | 'template'`
- `BatchResizeSettings` — shared resize settings for batch mode (no filename field)
- `PresetGroup` — preset dimension groups for the select dropdown

### Exported Constants

- `FORMAT_OPTIONS` — dropdown options for format select
- `SCALE_OPTIONS` — [25, 50, 75, 100, 125, 150, 200, 300]
- `PRESET_GROUPS` — Social Media, Screens, App Icons dimension presets

### Stores

| Store | Type | Description |
|-------|------|-------------|
| `images` | `Writable<ImageEntry[]>` | All loaded images |
| `activeImageId` | `Writable<string \| null>` | Selected image ID |
| `activeImage` | `Derived` | Current image entry (from images + activeImageId) |
| `settings` | `Writable<ResizeSettings>` | Active image's resize settings |
| `result` | `Writable<ResizeResult \| null>` | Active image's resize result |
| `processingState` | `Writable<ProcessingState>` | Global processing state |
| `batchProgress` | `Writable<{current, total} \| null>` | Batch export progress |
| `batchExported` | `Writable<boolean>` | Whether batch ZIP has been downloaded |
| `filenameRevision` | `Writable<number>` | Filename change counter for reactivity |
| `cropRevision` | `Writable<number>` | Crop change counter for reactivity |
| `hasImages` | `Derived<boolean>` | Whether images list is non-empty |
| `hasUnprocessedImages` | `Derived<boolean>` | True when images exist that haven't been resized or batch-exported |
| `imageCount` | `Derived<number>` | Number of loaded images |
| `isBatchMode` | `Derived<boolean>` | True when > 1 image loaded |
| `batchSettings` | `Writable<BatchResizeSettings>` | Shared batch resize config |

### Exported Functions

| Function | Purpose |
|----------|---------|
| `addImages(files)` | Validate files, create ImageBitmaps, add to images store |
| `selectImage(id)` | Switch active image, save/restore per-image settings |
| `removeImage(id)` | Remove image, revoke URLs, close bitmap, update active |
| `clearAll(silent?)` | Remove all images, revoke all URLs, reset state. Pass `silent=true` to suppress toast (used in teardown) |
| `reorderImages(from, to)` | Reorder images array (batch mode) |
| `updateImageFilename(id, name)` | Update per-image filename |
| `applyBatchNaming(pattern, prefix, template)` | Apply naming pattern to all images |
| `getImageFilename(id)` | Get filename for an image |
| `setImageCrop(id, crop)` | Set or clear crop region for an image |
| `getImageCrop(id)` | Get crop region for an image |
| `hasImageCrop(id)` | Check if image has a crop set |
| `updateWidth(w)` | Update width with aspect ratio lock |
| `updateHeight(h)` | Update height with aspect ratio lock |
| `swapDimensions()` | Swap width and height |
| `applyScale(percent)` | Scale from original dimensions |
| `applyPreset(w, h)` | Apply preset dimensions |
| `applyFitMax(maxDim)` | Fit longest side to max dimension |
| `performResize()` | Execute resize with toast feedback |
| `downloadResult()` | Download active image result |
| `downloadAllAsZip()` | Batch resize and ZIP download |
| `destroyWorker()` | Terminate Web Worker |
| `formatBytes(bytes)` | Human-readable file size |
| `formatName(format)` | Format display name (PNG, JPEG, WebP) |

### Per-Image State (Map-based, not stores)

The store maintains `Map` objects for per-image data that doesn't need global reactivity:

- `imageSettingsMap: Map<string, ResizeSettings>` — each image's resize settings (saved/restored on image switch)
- `imageCropMap: Map<string, CropData | null>` — each image's crop region
- `imageResultMap: Map<string, ResizeResult>` — each image's last resize result

The `filenameRevision`, `cropRevision`, and `resultCount` stores are increment-only counters used to trigger Svelte reactivity when Map data changes (since Maps are not reactive in Svelte). `resultCount` is bumped on every `imageResultMap` mutation so that `hasUnprocessedImages` re-evaluates correctly.

---

## 4. Worker (`_lib/worker.ts`)

The worker handles image resize operations off the main thread using `OffscreenCanvas`.

### Message Protocol

**Request (`ResizeRequest`):**
- `type: 'resize'`
- `id` — unique request ID for matching responses
- `bitmap` — transferred `ImageBitmap`
- `width`, `height` — target dimensions
- `format` — output MIME type
- `quality` — 0-1 quality value
- `smoothing`, `smoothingQuality` — interpolation settings
- `bgColor` — background fill color (or null for transparent)
- `fitMode` — stretch, contain, or cover
- `crop` — crop region (or null)

**Response (`ResizeResult`):**
- `type: 'result'`
- `id` — matching request ID
- `blob` — resized image blob
- `width`, `height`, `size` — result metadata

**Error (`ResizeError`):**
- `type: 'error'`
- `id` — matching request ID
- `message` — error description

### Processing Pipeline

1. If `crop` is set, create a cropped `OffscreenCanvas` and extract the region
2. Create target-size `OffscreenCanvas`
3. Fill background if `bgColor` is set
4. Apply `imageSmoothingEnabled` and `imageSmoothingQuality`
5. Draw source to target based on `fitMode`:
   - **stretch:** Direct draw to full canvas
   - **contain:** Calculate letterbox dimensions, center the image
   - **cover:** Calculate crop region from source, fill canvas
6. Convert canvas to blob via `canvas.convertToBlob()`
7. Post result back to main thread

### Fallback

If `OffscreenCanvas` is not supported (older browsers), the store falls back to main-thread `document.createElement('canvas')` operations using the same algorithm.

### Lifecycle

- Worker is lazily created on first resize
- Single worker instance is reused for all operations
- Worker is terminated in `onDestroy` when leaving the page

---

## 5. Components

### UploadZone (shared)

Shared component at `src/lib/components/ui/UploadZone.svelte`. Drop zone for initial image upload. Supports drag-and-drop, click-to-browse, and shows supported format info. Dispatches `files` event with `FileList | File[]`. Accepts `accept`, `formatHint`, `guideHref` props.

### PreviewCanvas

Displays the current image preview. Shows original image initially, switches to resize result after processing. Handles canvas scaling and theme-aware background.

### ThumbnailStrip

Horizontal strip showing thumbnails of all loaded images. Allows switching between images and adding more files. Shows "Add" button and "Clear all" action. Appears in single-image mode.

### ResizeControls

Control panel with:
- Width/height inputs with aspect ratio lock toggle
- Swap dimensions button
- Format select (PNG/JPEG/WebP) via `Select.svelte`
- Quality slider (JPEG/WebP only)
- Fit mode select (stretch/contain/cover) via `Select.svelte`
- Background color picker via `ColorPicker.svelte` (visible in contain mode or JPEG format)
- Background transparency toggle
- Scale percentage buttons
- Dimension presets grouped dropdown
- Accepts `batch` prop to switch between per-image and batch settings

### InfoPanel

Displays file information (name, dimensions, size, format) and action buttons (Resize, Download, Download ZIP). Shows processing state and batch progress. Accepts `batch` prop.

### BatchImageList

Full batch mode interface with:
- Image list with thumbnails, filenames (editable), original dimensions
- Drag-to-reorder support
- Per-image crop and remove buttons
- Batch naming controls (pattern select, prefix/template inputs)
- Add more images and clear all actions

### CropDialog

Modal dialog for interactive image cropping:
- Displays original image at scaled size
- Drag handles on all four corners and edges
- Minimum crop size enforced
- Shows crop dimensions in real-time
- Dispatches `apply` event with `CropData`
- Receives `initialCrop` prop to restore previous crop region

---

## 6. Data Flow

### Single Image Mode

```
User drops file → addImages() → fileToBitmap() → ImageEntry added to images store
                                                 → activeImageId set
                                                 → default ResizeSettings created

User adjusts settings → updateWidth/Height/Scale/Preset → settings store updated
                                                         → per-image settings saved in Map

User clicks Resize → performResize() → Worker receives bitmap + settings
                                      → Worker returns blob
                                      → ResizeResult saved in Map + result store

User clicks Download → downloadResult() → Creates <a> element, triggers download
```

### Batch Mode

```
User drops multiple files → addImages() → Multiple ImageEntries created
                                         → isBatchMode becomes true
                                         → UI switches to BatchImageList

User configures batch settings → batchSettings store updated
User applies naming pattern → applyBatchNaming() → All image filenames updated

User clicks Download ZIP → downloadAllAsZip() → For each image:
                                                   → Resize with batchSettings
                                                   → Add blob to JSZip
                                                → Generate ZIP blob
                                                → Trigger download
```

### Crop Flow

```
User clicks Crop → CropDialog opens with original image
User drags crop region → CropData calculated in real-time
User clicks Apply → setImageCrop(id, cropData)
                   → cropRevision incremented
                   → Next resize uses crop as source region
```

---

## 7. SEO

| Element | Value |
|---------|-------|
| Title | "Free Image Resizer — Resize, Crop & Convert Online \| Arbenger" |
| Meta description | "Resize, crop, and batch-convert images to PNG, JPEG, or WebP — directly in your browser. No uploads, no signups. 100% private and free." |
| H1 | "Free Online Image Resizer — Resize, Crop & Convert" (sr-only) |
| JSON-LD #1 | WebApplication schema |
| JSON-LD #2 | BreadcrumbList: Home → Products → Image Resizer |
| Visual breadcrumb | `Home / Products / Image Resizer` in top bar |
| Guide link | "Guide" link (BookOpen icon) in top bar → `/blog/how-to-use-image-resizer/` |
| UploadZone guide link | "New here? Read the guide" → `/blog/how-to-use-image-resizer/` |
| Blog post | "How to Use Arbenger Image Resizer — The Complete Guide" at `/blog/how-to-use-image-resizer/` |
| Canonical | `https://arbenger.com/products/image-resizer` |
| Sitemap | Priority 0.7, weekly changefreq |
| Cross-link | "Need to compress instead? Try Image Compressor" link at page bottom |
| Browser warning | Amber banner when `createImageBitmap`, `OffscreenCanvas`, or `Worker` is missing |

---

## 8. Supported File Formats

### Input

| Format | MIME Type | Max Size |
|--------|----------|----------|
| PNG | `image/png` | 50 MB |
| JPEG | `image/jpeg` | 50 MB |
| WebP | `image/webp` | 50 MB |
| SVG | `image/svg+xml` | 50 MB |

Files over 50 MB trigger a warning toast but are still processed. Unsupported formats are rejected with a warning count. Duplicate uploads (matched by `name + size + lastModified`) are automatically skipped with a toast notification.

### Output

| Format | Extension | Quality Control | Transparency |
|--------|-----------|----------------|--------------|
| PNG | `.png` | No (lossless) | Yes |
| JPEG | `.jpg` | Yes (0-100) | No (uses bgColor) |
| WebP | `.webp` | Yes (0-100) | Yes |

---

## 9. Keyboard & Paste Support

| Action | Trigger |
|--------|---------|
| Paste image from clipboard | `Ctrl+V` / `Cmd+V` anywhere on the page |
| Clear all images | `Escape` key when images are loaded |

Paste support is registered in `onMount` and removed in `onDestroy` to prevent memory leaks.

---

## 10. Navigation Guards

The image resizer protects against accidental data loss when the user has unprocessed images:

| Guard | Mechanism | UI |
|-------|-----------|-----|
| In-app navigation (SvelteKit links) | `beforeNavigate` from `$app/navigation` | Custom `ConfirmDialog` (warning variant, LogOut icon) |
| Browser refresh / close / back | `beforeunload` event | Native browser "Leave site?" prompt |

Both guards check the `$hasUnprocessedImages` derived store, which is `false` when:
- All individual images have been resized (results stored in `imageResultMap`), **or**
- A batch ZIP has been downloaded (`batchExported` is `true`)

The `clearAll()` function accepts an optional `silent` parameter. The `onDestroy` teardown calls `clearAll(true)` to clean up memory (revoke object URLs, close bitmaps) without showing a "All images cleared" toast on navigation.
