# Background Remover — Design Spec

**Date:** 2026-05-11
**Status:** Approved
**URL:** `/products/background-remover/`

## Overview

A fully client-side background remover that uses Transformers.js with the U2-Net model (Apache 2.0) for ML segmentation. Users can remove backgrounds and replace them with transparent, solid color, gradient, or a custom uploaded image. Supports batch processing with ZIP download. All processing happens in the browser — images never leave the device.

## ML Library & Model

**Library:** Transformers.js (Apache 2.0) — Hugging Face's in-browser inference library, runs ONNX models via ONNX Runtime Web/WASM.

**Model:** U2-Net (Apache 2.0) — general-purpose salient object detection. Handles people, products, animals, and arbitrary objects (not limited to portrait/selfie segmentation). ONNX-converted versions are available on Hugging Face.

**Why this choice:** All three initially considered options had licensing issues for commercial use:
- `@imgly/background-removal`: AGPL-3.0 (copyleft)
- RMBG-1.4 (BRIA): Non-commercial license
- MediaPipe: Apache 2.0 but limited to person segmentation only

Transformers.js + U2-Net is the only fully permissive option that handles general-purpose background removal.

## Route Structure & Files

```
src/routes/products/(utilities)/background-remover/
  +page.svelte              # Main page
  +page.ts                  # export const prerender = true
  _components/
    CompareSlider.svelte     # Route-local copy adapted from compressor; adds checkerboard rendering for transparency
    RemoverControls.svelte   # Background replacement options + output format
    RemoverInfoPanel.svelte  # Stats: dimensions, file sizes, processing time
    BatchImageList.svelte    # Reused from existing tools
    ThumbnailStrip.svelte    # Reused from existing tools
  _lib/
    store.ts                 # State management, image entries, processing orchestration
    worker.ts                # Web Worker: ML inference + compositing
```

Shared components imported from existing locations:
- `$lib/components/ui/`: UploadZone, Select, ColorPicker, ConfirmDialog
- `$lib/components/seo/`: MetaTags, JsonLd

## Processing Pipeline

### Step 1: Model Loading

- Lazy-loaded on first use (not at page load).
- Transformers.js caches the ONNX model in the browser's Cache API after the initial download (~40MB).
- A progress overlay shows download percentage during first-time download.
- Subsequent visits load from cache instantly.

### Step 2: Inference (Web Worker)

1. Input image decoded via `createImageBitmap(file)`.
2. Image transferred to Web Worker via `postMessage` with transferable bitmap.
3. Worker resizes input to model's expected resolution (320x320).
4. U2-Net inference produces a grayscale mask (white = foreground, black = background).
5. Mask is upscaled back to original image dimensions.
6. Mask is cached in the worker for re-compositing without re-inference.

### Step 3: Compositing (Web Worker)

After the mask is produced, compositing applies the chosen background:

- **Transparent:** Mask applied as alpha channel. Output as PNG.
- **Solid color:** Canvas filled with chosen color, masked foreground drawn on top.
- **Gradient:** Canvas filled with linear gradient (two colors, configurable direction), masked foreground drawn on top.
- **Custom image:** Uploaded background image scaled to cover canvas dimensions, masked foreground drawn on top.

### Step 4: Re-compositing

When the user changes background settings after initial removal, only the compositing step reruns. The mask is already cached — no re-inference needed. This makes background swapping near-instant.

### Step 5: Output

- Worker posts `{type: 'result', id, blob, width, height, size}` back to main thread.
- Main thread creates `URL.createObjectURL(blob)` for preview and download.
- If result is larger than original (same format), the original is silently substituted.

### Fallback

If `OffscreenCanvas` is not available, fall back to `document.createElement('canvas')` with identical drawing logic (same pattern as resizer/compressor).

Browser compatibility warning shown if `createImageBitmap`, `OffscreenCanvas`, or `Worker` is unavailable.

## UI Layout

### Three-State Page (matches resizer/compressor pattern)

#### State 1 — Upload (no images)

- Full-height centered `UploadZone` (max-w-2xl, lg:min-h-560px).
- Accepts: `.png, .jpg, .jpeg, .webp`.
- Privacy badge: "100% local — images never leave your browser."
- Guide link with BookOpen icon (to blog post, when written).
- Top bar: breadcrumb (Home / Products / Background Remover).

#### State 2 — Single Image

- **Left panel:** `CompareSlider` — original on left, result on right with checkerboard transparency indicator. Same capabilities as compressor: drag handle, scroll-wheel zoom (15% step, 1x–20x), pinch-to-zoom on mobile, pan when zoomed, zoom controls overlay, file size labels, reduction percentage.
- **Processing overlay:** During model download, shows progress bar with percentage. During inference, shows spinner with "Removing background..." text.
- **Right panel (360px sidebar):**
  - `RemoverControls`:
    - Background type — segmented button: Transparent | Color | Gradient | Image
    - Transparent: No additional controls
    - Color: ColorPicker (reused from resizer) with preset swatches (white, black, common colors)
    - Gradient: Two ColorPickers (start/end color), direction selector (→, ←, ↓, ↑, ↘, ↙, ↗, ↖)
    - Image: Upload button for background image, auto-scaled to cover canvas
    - Output format: Select — PNG (default for transparent), JPEG, WebP
    - Quality slider: Shown only for JPEG/WebP (1–100, default 92)
    - Filename pattern: Text input, default `{name}-nobg`
  - `RemoverInfoPanel`:
    - Original dimensions and file size
    - Result file size
    - Processing time
    - Reduction percentage
  - Download button with tooltip confirmation

#### State 3 — Batch Mode (2+ images)

- **Left:** `BatchImageList` — thumbnails with status indicators (pending, processing spinner, done checkmark).
- **Right:** Same 360px sidebar, shared settings applied to all images.
- Download ZIP button (JSZip, dynamically imported).
- Cancel support via module-level `cancelled` flag (same pattern as other tools).
- Batch naming: sequential (`image-1-nobg`), prefix-original, original-suffix, number-only, or template with `{name}`, `{n}`, `{w}`, `{h}` tokens.

### Bottom Sections

- **Lifetime stats:** Large centered number with trust badges (zero images stored, works everywhere, no account needed). Shown when `totalProcessed > 0`.
- **Cross-tool links:**
  - "Need to resize? Try Image Resizer" → `/products/image-resizer/`
  - "Need to compress? Try Image Compressor" → `/products/image-compressor/`

## SEO

- **Title:** "Free Background Remover — Remove Image Backgrounds Online | Arbenger"
- **Description:** "Remove backgrounds from images instantly in your browser. Replace with transparent, solid color, gradient, or custom image. No uploads — 100% private and free."
- **H1 (sr-only):** "Free Online Background Remover — Remove & Replace Image Backgrounds"
- **Canonical:** `https://arbenger.com/products/background-remover/`
- **JSON-LD:** Two blocks:
  - `WebApplication` schema — name, description, url, applicationCategory: "DesignApplication", offers: {price: "0", priceCurrency: "USD"}, operatingSystem: "Any"
  - `BreadcrumbList` — Home → Products → Background Remover
- **Visual breadcrumb** in top bar nav
- **Guide link** with BookOpen icon

## Stats API Integration

- Add `'background-remover'` to the `toolId` allowlist in `src/routes/api/stats/+server.ts`.
- GET: `/api/stats/?toolId=background-remover`
- POST: `{ toolId: 'background-remover', count: N }`
- Same `minDelay()` pattern for toast timing.
- `keepalive: true` on stats POST requests.

## Accepted Formats

- **Input:** PNG, JPEG, WebP (same as other tools)
- **Output:**
  - Transparent background → PNG only (transparency requires it)
  - Opaque background (color/gradient/image) → PNG, JPEG, or WebP (user-selectable)

## Error Handling

- **Browser incompatible:** Amber warning panel (same as other tools) if `createImageBitmap`, `OffscreenCanvas`, or `Worker` unavailable.
- **Model download failure:** Toast error with retry suggestion. The progress overlay stays visible with an error state.
- **File too large (>50MB):** Warning toast on upload (same as other tools).
- **Invalid format:** Rejected at upload with toast notification.
- **Target size exceeds original:** Original silently substituted as result.

## Blog Post

Deferred — will be written as a follow-up task after the tool ships. Same pattern as resizer/compressor blog posts. Will live at `/blog/how-to-use-background-remover/`.

## Dependencies

- `@huggingface/transformers` (Apache 2.0) — in-browser ML inference
- `jszip` (already installed) — batch ZIP download
- No new UI dependencies — reuses existing ColorPicker, Select, UploadZone, etc.

## Out of Scope

- Manual edge refinement (brush tool, eraser)
- Feathering/smoothing slider
- Multiple foreground subjects selection
- Video background removal
- GIF/BMP/SVG input support
