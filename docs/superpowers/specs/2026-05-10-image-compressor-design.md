# Image Compressor — Design Spec

**Date:** 2026-05-10
**Route:** `/products/image-compressor/`
**Status:** Ready for implementation

---

## 1. Core Concept

A pure file-size reduction tool. No dimension changes — that's the resizer's job. The compressor is laser-focused on making images smaller while preserving visual quality. Fully client-side — images never leave the browser.

## 2. Compression Modes

| Mode | Description | Use case |
|------|-------------|----------|
| **Lossy** | Maximum compression, some visible quality loss | Web images, thumbnails, social media |
| **Glossy** | Near-lossless, aggressive compression with imperceptible quality loss | Default mode — the sweet spot for most users |
| **Lossless** | Zero quality loss, moderate compression, reorganizes pixel data | Photography, print, archival |

## 3. Quality Control

Two modes, toggled via UI:

### Quality Slider Mode
- Range: 1–100
- Live side-by-side preview updates as user drags
- Shows compressed file size and % reduction in real time

### Target File Size Mode
- User enters max file size (e.g., "200 KB")
- Tool binary-searches for optimal quality to hit target
- Shows achieved quality level and actual resulting size

## 4. Format Support

| Format | Input | Output | Notes |
|--------|-------|--------|-------|
| PNG | Yes | Yes | Lossless compression via canvas re-encoding |
| JPEG | Yes | Yes | Lossy/glossy via quality parameter |
| WebP | Yes | Yes | Best all-round compression, wide browser support |
| AVIF | No (browser-dependent) | Yes (where supported) | Best compression ratios, differentiator over resizer |
| GIF | Yes | No | Accept as input, suggest converting to WebP |
| BMP | Yes | No | Accept as input, convert to modern format |
| SVG | No | No | Not applicable to bitmap compression |

AVIF output availability depends on browser support for `canvas.toBlob('image/avif')`. Feature-detect at runtime. Show/hide AVIF option accordingly.

## 5. Metadata Handling

- **Strip by default** — removes EXIF, GPS, IPTC, XMP, ICC profiles
- Toggle to **keep metadata** for photographers/professionals
- Metadata stripping happens naturally through canvas re-encoding (canvas output never includes EXIF)
- When "keep metadata" is selected AND the output format matches the input format, copy metadata from original file to output. For cross-format conversion, metadata is always stripped (canvas limitation).

Note: Since we use canvas-based compression, metadata is stripped automatically. The "keep" toggle is a future enhancement — for v1, we simply document that metadata is always stripped via canvas re-encoding.

## 6. UI Architecture

### Page Modes (same pattern as resizer)

1. **No images** — centered UploadZone (shared component extracted to `src/lib/components/ui/`)
2. **Single image** — side-by-side preview slider + controls sidebar
3. **Batch mode** — image list table + controls sidebar

### Single Image Mode Layout

```
┌─────────────────────────────────────────────┬──────────────┐
│                                             │  CONTROLS    │
│   ┌────────────────┬────────────────┐       │              │
│   │   ORIGINAL     │   COMPRESSED   │       │ Mode: Glossy │
│   │                │                │       │ Quality: 75  │
│   │   ← slider →   │               │       │ Format: WebP │
│   │                │                │       │ Strip EXIF ✓ │
│   └────────────────┴────────────────┘       │              │
│                                             │  INFO PANEL  │
│   Original: 2.4 MB  →  Compressed: 340 KB  │  [Compress]  │
│   Reduction: 86%                            │  [Download]  │
└─────────────────────────────────────────────┴──────────────┘
```

### Side-by-Side Slider Component (CompareSlider)
- Draggable vertical divider splits the preview
- Left = original, Right = compressed
- File size labels on each side
- Divider has a grip handle with left/right arrows
- Works with mouse drag and touch

### Batch Mode Layout
Same as resizer: image list on left (with per-image compression stats), controls sidebar on right. Mobile: stacked.

Batch table columns: thumbnail, filename, original size, compressed size, reduction %, status indicator.

## 7. Controls Panel (CompressControls)

### Compression Mode Selector
Three-option toggle group (Lossy / Glossy / Lossless). Default: Glossy.

Each mode sets a default quality range:
- Lossy: quality 60
- Glossy: quality 80
- Lossless: quality 100 (format-dependent behavior)

### Quality Control
- Toggle between "Quality" and "Target Size" modes
- Quality mode: slider 1–100 with numeric input
- Target size mode: numeric input with unit selector (KB / MB)

### Output Format
- Dropdown: Same as original / PNG / JPEG / WebP / AVIF (if supported)
- "Same as original" is the default

### Metadata
- Toggle: "Strip metadata" (on by default)
- Small info text: "Removes EXIF, GPS, camera data"

## 8. Info Panel (CompressInfoPanel)

### Single Mode
| Field | Value |
|-------|-------|
| Original | 2.4 MB (PNG, 1920×1080) |
| Compressed | 340 KB (WebP) |
| Reduction | 86% ↓ |
| Quality | 80 |

Buttons: "Compress" (primary) → "Download" (appears after compression)

### Batch Mode
| Field | Value |
|-------|-------|
| Images | 12 |
| Total original | 28.4 MB |
| Total compressed | 4.2 MB |
| Avg. reduction | 85% ↓ |

Button: "Compress & Download ZIP"

## 9. Processing Architecture

### Worker (`_lib/worker.ts`)
Handles compression via OffscreenCanvas (same pattern as resizer worker).

Message types:
- `compress` — receives ImageBitmap + settings, returns compressed Blob
- Crop is NOT supported (no dimension changes)

Compression logic:
1. Create OffscreenCanvas at original dimensions
2. Draw ImageBitmap to canvas
3. Call `canvas.convertToBlob({ type: format, quality: quality/100 })`
4. Return blob with size metadata

For "target size" mode, the binary search runs in the worker:
1. Start with quality bounds [1, 100]
2. Binary search: compress at midpoint quality
3. Check if blob.size <= target
4. Narrow bounds, repeat (max 8 iterations)
5. Return the best result that fits

### Fallback
Main-thread canvas path for browsers without OffscreenCanvas (same as resizer).

## 10. Live Preview

The side-by-side slider requires compressing the image as the user adjusts settings. To avoid lag:

- **Debounce** quality slider changes by 150ms before triggering compression
- Compress a **preview-sized** version (max 1200px longest side) for the live preview
- Full-resolution compression happens only when user clicks "Compress"
- Show a subtle loading indicator on the compressed side during preview generation

## 11. Stats Integration

Same pattern as resizer:
- `trackStats(count)` after each compression (single or batch)
- `toolId: 'image-compressor'` — separate counter from resizer
- Stats UI section at page bottom (same design as resizer)
- Add `'image-compressor'` to `ALLOWED_TOOL_IDS` in `/api/stats/+server.ts`

## 12. File Structure

```
src/routes/products/(utilities)/image-compressor/
  +page.svelte              — Page orchestrator (3 modes)
  +page.ts                  — export const prerender = true
  _components/
    CompareSlider.svelte    — Side-by-side before/after with draggable divider
    CompressControls.svelte — Mode selector, quality, format, metadata toggle
    CompressInfoPanel.svelte — Stats + action buttons
    BatchImageList.svelte   — Batch table (adapted from resizer, simpler columns)
    ThumbnailStrip.svelte   — Image switcher (can reuse from resizer or re-implement)
  _lib/
    store.ts                — All state + business logic
    worker.ts               — OffscreenCanvas compression engine

src/lib/components/ui/
  UploadZone.svelte         — Extracted from resizer (shared)
```

## 13. Shared Component Extraction

Extract `UploadZone.svelte` from `src/routes/products/(utilities)/image-resizer/_components/` to `src/lib/components/ui/UploadZone.svelte`. Update the resizer's import. The component is already generic — it dispatches `files` events and accepts a `class` prop.

## 14. Product Registry

Add to `src/lib/data/products.ts`:
```typescript
{
  slug: 'image-compressor',
  name: 'Image Compressor',
  description: 'Compress images up to 90% smaller without visible quality loss. Lossy, glossy, and lossless modes with live preview.',
  category: 'misc-tools',
  status: 'live',
  platform: 'web',
  externalUrl: '/products/image-compressor',
  tags: ['image', 'compress', 'optimize', 'free'],
  featured: false
}
```

Update `misc-tools` category `productCount` from 1 to 2.

## 15. SEO

- Title: "Free Image Compressor — Compress PNG, JPEG, WebP Online | Arbenger"
- Meta description: "Compress images up to 90% smaller with lossy, glossy, or lossless modes. Live before/after preview. No uploads — 100% private and free."
- H1 (sr-only): "Free Online Image Compressor — Reduce File Size Without Quality Loss"
- JSON-LD: WebApplication schema (same pattern as resizer)
- Breadcrumbs: Home > Products > Image Compressor
- Add to sitemap

## 16. Privacy & Legal

No policy updates needed — the stats tracking is already disclosed in the privacy policy for all tools. The "anonymous usage statistics" bullet covers any tool using the same `/api/stats/` endpoint.

## 17. Non-Goals (v1)

- No resize/crop — that's the resizer
- No metadata preservation (canvas strips it; documented as always-stripped in v1)
- No animated GIF compression
- No PDF compression
- No CLI/API access
