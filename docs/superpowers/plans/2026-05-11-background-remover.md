# Background Remover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully client-side background remover tool at `/products/background-remover/` using Transformers.js with the U-2-Netp model (~4.7 MB) for ML segmentation, supporting transparent, solid color, gradient, and custom image background replacement, with batch processing and ZIP download.

**Architecture:** Web Worker loads the U-2-Netp model via `AutoModel`/`AutoProcessor` from Transformers.js, runs inference to produce a segmentation mask, upscales the mask to original dimensions, applies it as alpha to the source image, then composites onto the chosen background. Foreground RGBA data is cached per image in the worker for instant re-compositing when background settings change. UI follows the same three-state pattern (upload → single → batch) as the existing compressor/resizer tools.

**Tech Stack:** SvelteKit, Svelte 4, Tailwind CSS v4, @huggingface/transformers (AutoModel + AutoProcessor), BritishWerewolf/U-2-Netp (Apache 2.0, ~4.7 MB), JSZip (already installed), lucide-svelte, svelte-sonner, tippy.js.

**Model note:** The spec names U2-Net. We use `BritishWerewolf/U-2-Netp` — the lightweight variant (1.13M params, ~4.7 MB download) rather than the full U2-Net (~170 MB) or BEN2-ONNX (~223 MB). This is critical for mobile users on cellular data. Quality is slightly lower on complex edges but the download is ~50x smaller. The model ID is a constant in the worker, easy to swap if a better small model appears. The lower-level `AutoModel`/`AutoProcessor` API is used instead of the `background-removal` pipeline since U-2-Netp outputs a raw mask tensor that needs manual post-processing (resize mask → apply as alpha → composite).

---

## File Structure

**New files:**

| File | Responsibility |
|------|----------------|
| `src/routes/products/(utilities)/background-remover/+page.ts` | Prerender config |
| `src/routes/products/(utilities)/background-remover/+page.svelte` | Main page: three-state layout, SEO, breadcrumbs |
| `src/routes/products/(utilities)/background-remover/_lib/worker.ts` | Web Worker: model loading, ML inference, compositing |
| `src/routes/products/(utilities)/background-remover/_lib/store.ts` | State management, image lifecycle, processing orchestration |
| `src/routes/products/(utilities)/background-remover/_components/CompareSlider.svelte` | Before/after slider with checkerboard + processing overlays |
| `src/routes/products/(utilities)/background-remover/_components/RemoverControls.svelte` | Background type controls, format, quality, filename |
| `src/routes/products/(utilities)/background-remover/_components/RemoverInfoPanel.svelte` | Stats display, action buttons, batch ZIP dialog |
| `src/routes/products/(utilities)/background-remover/_components/BatchImageList.svelte` | Batch image list with drag reorder and naming |
| `src/routes/products/(utilities)/background-remover/_components/ThumbnailStrip.svelte` | Thumbnail strip for single-image mode |

**Modified files:**

| File | Change |
|------|--------|
| `src/routes/api/stats/+server.ts` | Add `'background-remover'` to `ALLOWED_TOOL_IDS` |
| `src/routes/products/(utilities)/image-resizer/+page.svelte` | Add background-remover cross-link |
| `src/routes/products/(utilities)/image-compressor/+page.svelte` | Add background-remover cross-link |

---

## Task 1: Install Dependency & Update Stats API

**Files:**
- Modify: `package.json` (via yarn add)
- Modify: `src/routes/api/stats/+server.ts:7`

- [ ] **Step 1: Install @huggingface/transformers**

Run:
```bash
yarn add @huggingface/transformers
```
Expected: Package added to `dependencies` in `package.json`, `yarn.lock` updated.

- [ ] **Step 2: Add background-remover to stats API allowlist**

In `src/routes/api/stats/+server.ts`, change line 7 from:
```typescript
const ALLOWED_TOOL_IDS = new Set(['image-resizer', 'image-compressor']);
```
to:
```typescript
const ALLOWED_TOOL_IDS = new Set(['image-resizer', 'image-compressor', 'background-remover']);
```

- [ ] **Step 3: Commit**

```bash
git add package.json yarn.lock src/routes/api/stats/+server.ts
git commit -m "feat(products): add transformers.js dep and background-remover stats allowlist"
```

---

## Task 2: Create the Web Worker

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_lib/worker.ts`

- [ ] **Step 1: Write worker.ts**

```typescript
import { AutoModel, AutoProcessor, RawImage, env } from '@huggingface/transformers';

env.allowLocalModels = false;

const MODEL_ID = 'BritishWerewolf/U-2-Netp';

type BackgroundType = 'transparent' | 'color' | 'gradient' | 'image';
type GradientDirection = 'right' | 'left' | 'down' | 'up' | 'down-right' | 'down-left' | 'up-right' | 'up-left';

interface RemoveBgRequest {
	type: 'remove-bg';
	id: string;
	bitmap: ImageBitmap;
	bgType: BackgroundType;
	bgColor: string;
	gradientStart: string;
	gradientEnd: string;
	gradientDirection: GradientDirection;
	bgBitmap: ImageBitmap | null;
	format: string;
	quality: number;
}

interface RecompositeRequest {
	type: 'recomposite';
	id: string;
	bgType: BackgroundType;
	bgColor: string;
	gradientStart: string;
	gradientEnd: string;
	gradientDirection: GradientDirection;
	bgBitmap: ImageBitmap | null;
	format: string;
	quality: number;
}

let model: Awaited<ReturnType<typeof AutoModel.from_pretrained>> | null = null;
let processor: Awaited<ReturnType<typeof AutoProcessor.from_pretrained>> | null = null;

const fgCache = new Map<string, { data: Uint8ClampedArray; width: number; height: number }>();

function gradientCoords(dir: GradientDirection, w: number, h: number): [number, number, number, number] {
	switch (dir) {
		case 'right': return [0, 0, w, 0];
		case 'left': return [w, 0, 0, 0];
		case 'down': return [0, 0, 0, h];
		case 'up': return [0, h, 0, 0];
		case 'down-right': return [0, 0, w, h];
		case 'down-left': return [w, 0, 0, h];
		case 'up-right': return [0, h, w, 0];
		case 'up-left': return [w, h, 0, 0];
	}
}

function coverDraw(ctx: OffscreenCanvasRenderingContext2D, bgBitmap: ImageBitmap, w: number, h: number) {
	const scale = Math.max(w / bgBitmap.width, h / bgBitmap.height);
	const sw = bgBitmap.width * scale;
	const sh = bgBitmap.height * scale;
	ctx.drawImage(bgBitmap, (w - sw) / 2, (h - sh) / 2, sw, sh);
}

function extractForeground(
	originalData: ImageData,
	maskTensor: Float32Array,
	maskW: number,
	maskH: number,
	origW: number,
	origH: number
): Uint8ClampedArray {
	// Render mask to a small canvas, then resize to original dimensions
	const maskCanvas = new OffscreenCanvas(maskW, maskH);
	const maskCtx = maskCanvas.getContext('2d')!;
	const maskImageData = maskCtx.createImageData(maskW, maskH);
	for (let i = 0; i < maskTensor.length; i++) {
		const val = Math.round(Math.max(0, Math.min(1, maskTensor[i])) * 255);
		maskImageData.data[i * 4] = val;
		maskImageData.data[i * 4 + 1] = val;
		maskImageData.data[i * 4 + 2] = val;
		maskImageData.data[i * 4 + 3] = 255;
	}
	maskCtx.putImageData(maskImageData, 0, 0);

	// Upscale mask to original dimensions with smooth interpolation
	const fullMaskCanvas = new OffscreenCanvas(origW, origH);
	const fullMaskCtx = fullMaskCanvas.getContext('2d')!;
	fullMaskCtx.imageSmoothingEnabled = true;
	fullMaskCtx.imageSmoothingQuality = 'high';
	fullMaskCtx.drawImage(maskCanvas, 0, 0, origW, origH);
	const fullMaskData = fullMaskCtx.getImageData(0, 0, origW, origH);

	// Apply mask as alpha channel to original image
	const fgData = new Uint8ClampedArray(originalData.data);
	for (let i = 0; i < origW * origH; i++) {
		fgData[i * 4 + 3] = fullMaskData.data[i * 4]; // R channel of grayscale mask → alpha
	}

	return fgData;
}

async function composite(
	fgData: Uint8ClampedArray,
	width: number,
	height: number,
	bgType: BackgroundType,
	bgColor: string,
	gradientStart: string,
	gradientEnd: string,
	gradientDirection: GradientDirection,
	bgBitmap: ImageBitmap | null,
	format: string,
	quality: number
): Promise<Blob> {
	const canvas = new OffscreenCanvas(width, height);
	const ctx = canvas.getContext('2d')!;

	if (bgType === 'color') {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, width, height);
	} else if (bgType === 'gradient') {
		const [x0, y0, x1, y1] = gradientCoords(gradientDirection, width, height);
		const grad = ctx.createLinearGradient(x0, y0, x1, y1);
		grad.addColorStop(0, gradientStart);
		grad.addColorStop(1, gradientEnd);
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, width, height);
	} else if (bgType === 'image' && bgBitmap) {
		coverDraw(ctx, bgBitmap, width, height);
	}

	const fgCanvas = new OffscreenCanvas(width, height);
	const fgCtx = fgCanvas.getContext('2d')!;
	fgCtx.putImageData(new ImageData(new Uint8ClampedArray(fgData), width, height), 0, 0);
	ctx.drawImage(fgCanvas, 0, 0);

	const outputFormat = bgType === 'transparent' ? 'image/png' : format;
	const outputQuality = outputFormat === 'image/png' ? undefined : quality;
	return canvas.convertToBlob({ type: outputFormat, quality: outputQuality });
}

self.onmessage = async (e: MessageEvent) => {
	const data = e.data;

	if (data.type === 'load') {
		try {
			model = await AutoModel.from_pretrained(MODEL_ID, {
				progress_callback: (progress: { status: string; progress?: number }) => {
					if (progress.status === 'progress') {
						self.postMessage({ type: 'download-progress', progress: Math.round(progress.progress ?? 0) });
					}
				}
			});
			processor = await AutoProcessor.from_pretrained(MODEL_ID);
			self.postMessage({ type: 'loaded' });
		} catch (err) {
			self.postMessage({ type: 'error', message: err instanceof Error ? err.message : 'Failed to load model' });
		}
	} else if (data.type === 'remove-bg') {
		const req = data as RemoveBgRequest;
		try {
			if (!model || !processor) {
				self.postMessage({ type: 'error', id: req.id, message: 'Model not loaded' });
				return;
			}

			const { width, height } = req.bitmap;

			// Get original image data
			const origCanvas = new OffscreenCanvas(width, height);
			const origCtx = origCanvas.getContext('2d')!;
			origCtx.drawImage(req.bitmap, 0, 0);
			req.bitmap.close();
			const originalData = origCtx.getImageData(0, 0, width, height);

			// Prepare input for model
			const rawImage = new RawImage(originalData.data, width, height, 4);
			const { pixel_values } = await processor(rawImage);

			// Run inference — output shape is [1, 1, H, W] where H,W = model input size (320x320)
			const { output } = await model({ input: pixel_values });
			const maskData = output.data as Float32Array;
			const maskH = output.dims[2];
			const maskW = output.dims[3];

			// Extract foreground with mask applied as alpha
			const fgData = extractForeground(originalData, maskData, maskW, maskH, width, height);

			fgCache.set(req.id, { data: fgData, width, height });

			const blob = await composite(
				fgData, width, height,
				req.bgType, req.bgColor,
				req.gradientStart, req.gradientEnd, req.gradientDirection,
				req.bgBitmap, req.format, req.quality
			);
			if (req.bgBitmap) req.bgBitmap.close();

			self.postMessage({ type: 'result', id: req.id, blob, width, height, size: blob.size });
		} catch (err) {
			req.bitmap?.close();
			req.bgBitmap?.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'Background removal failed' });
		}
	} else if (data.type === 'recomposite') {
		const req = data as RecompositeRequest;
		try {
			const cached = fgCache.get(req.id);
			if (!cached) {
				self.postMessage({ type: 'error', id: req.id, message: 'No cached data — remove background first' });
				return;
			}

			const blob = await composite(
				cached.data, cached.width, cached.height,
				req.bgType, req.bgColor,
				req.gradientStart, req.gradientEnd, req.gradientDirection,
				req.bgBitmap, req.format, req.quality
			);
			if (req.bgBitmap) req.bgBitmap.close();

			self.postMessage({ type: 'result', id: req.id, blob, width: cached.width, height: cached.height, size: blob.size });
		} catch (err) {
			req.bgBitmap?.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'Re-compositing failed' });
		}
	} else if (data.type === 'clear-cache') {
		fgCache.delete(data.id);
	} else if (data.type === 'clear-all-cache') {
		fgCache.clear();
	}
};
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_lib/worker.ts
git commit -m "feat(products): add background-remover web worker with ML inference and compositing"
```

---

## Task 3: Create the Store

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_lib/store.ts`

- [ ] **Step 1: Write store.ts**

```typescript
import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';

// -- TYPES -- //

export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';
export type BackgroundType = 'transparent' | 'color' | 'gradient' | 'image';
export type GradientDirection = 'right' | 'left' | 'down' | 'up' | 'down-right' | 'down-left' | 'up-right' | 'up-left';
export type ProcessingState = 'idle' | 'loading' | 'downloading' | 'removing' | 'exporting';
export type NamingPattern = 'sequential' | 'prefix-original' | 'original-suffix' | 'number-only' | 'template';

export interface ImageEntry {
	id: string;
	file: File;
	originalWidth: number;
	originalHeight: number;
	originalSize: number;
	thumbnailUrl: string;
	bitmap: ImageBitmap | null;
}

export interface RemoverSettings {
	bgType: BackgroundType;
	bgColor: string;
	gradientStart: string;
	gradientEnd: string;
	gradientDirection: GradientDirection;
	format: ImageFormat;
	quality: number;
	filename: string;
}

export interface RemoveResult {
	blob: Blob;
	width: number;
	height: number;
	size: number;
	url: string;
}

// -- CONSTANTS -- //

const ACCEPTED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp']);

// -- STORES -- //

export const images = writable<ImageEntry[]>([]);
export const activeImageId = writable<string | null>(null);
export const settings = writable<RemoverSettings>({
	bgType: 'transparent',
	bgColor: '#ffffff',
	gradientStart: '#ffffff',
	gradientEnd: '#000000',
	gradientDirection: 'down',
	format: 'image/png',
	quality: 92,
	filename: ''
});
export const bgImageFile = writable<File | null>(null);
export const result = writable<RemoveResult | null>(null);
export const processingState = writable<ProcessingState>('idle');
export const downloadProgress = writable<number>(0);
export const modelLoaded = writable(false);
let cancelled = false;
export const batchProgress = writable<{ current: number; total: number } | null>(null);
export const batchExported = writable(false);
export const batchResultSize = writable<number | null>(null);
export const totalProcessed = writable<number | null>(null);
export const filenameRevision = writable(0);
export const processingTime = writable<number | null>(null);

export const activeImage = derived(
	[images, activeImageId],
	([$images, $id]) => $images.find((i) => i.id === $id) ?? null
);

export const hasImages = derived(images, ($i) => $i.length > 0);
export const imageCount = derived(images, ($i) => $i.length);
export const isBatchMode = derived(images, ($i) => $i.length > 1);

export const hasUnprocessedImages = derived(
	[images, batchExported],
	([$images, $exported]) => $images.length > 0 && !$exported
);

// -- PER-IMAGE MAPS -- //

const imageResultMap = new Map<string, RemoveResult>();
const imageSettingsMap = new Map<string, RemoverSettings>();

// -- WORKER -- //

let worker: Worker | null = null;
let useOffscreen = browser && typeof OffscreenCanvas !== 'undefined';

function getWorker(): Worker | null {
	if (!browser || !useOffscreen) return null;
	if (!worker) {
		try {
			worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
		} catch {
			useOffscreen = false;
			return null;
		}
	}
	return worker;
}

export function destroyWorker(): void {
	if (worker) {
		worker.terminate();
		worker = null;
	}
}

export function cancelProcessing(): void {
	cancelled = true;
}

// -- UTILITY -- //

function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getExtension(format: string): string {
	const map: Record<string, string> = {
		'image/png': '.png',
		'image/jpeg': '.jpg',
		'image/webp': '.webp'
	};
	return map[format] || '.png';
}

export function getOutputFormat(s: RemoverSettings): string {
	if (s.bgType === 'transparent') return 'image/png';
	return s.format;
}

export function formatName(format: string): string {
	const map: Record<string, string> = {
		'image/png': 'PNG',
		'image/jpeg': 'JPEG',
		'image/webp': 'WebP'
	};
	return map[format] || format.split('/')[1]?.toUpperCase() || 'Unknown';
}

function minDelay<T>(promise: Promise<T>, ms = 1000): Promise<T> {
	return Promise.all([promise, new Promise((r) => setTimeout(r, ms))]).then(([result]) => result);
}

// -- IMAGE MANAGEMENT -- //

function fileKey(f: File): string {
	return `${f.name}:${f.size}:${f.lastModified}`;
}

export async function addImages(files: FileList | File[]): Promise<void> {
	const fileArray = Array.from(files);
	const valid: File[] = [];
	let skipped = 0;
	let duplicates = 0;

	const existing = new Set(get(images).map((img) => fileKey(img.file)));

	for (const file of fileArray) {
		if (!ACCEPTED_TYPES.has(file.type)) {
			skipped++;
			continue;
		}
		if (existing.has(fileKey(file))) {
			duplicates++;
			continue;
		}
		if (file.size > 50 * 1024 * 1024) {
			toast.info(`${file.name} is large (${formatBytes(file.size)}) — may take a moment`);
		}
		existing.add(fileKey(file));
		valid.push(file);
	}

	if (skipped > 0) {
		toast.warning(`${skipped} unsupported file${skipped > 1 ? 's' : ''} skipped`);
	}
	if (duplicates > 0) {
		toast.info(`${duplicates} duplicate${duplicates > 1 ? 's' : ''} skipped`);
	}

	if (valid.length === 0) {
		if (fileArray.length > 0 && skipped === 0 && duplicates === 0) toast.error('No supported images found');
		return;
	}

	processingState.set('loading');

	const entries: ImageEntry[] = [];
	for (const file of valid) {
		try {
			const bitmap = await createImageBitmap(file);
			const entry: ImageEntry = {
				id: generateId(),
				file,
				originalWidth: bitmap.width,
				originalHeight: bitmap.height,
				originalSize: file.size,
				thumbnailUrl: URL.createObjectURL(file),
				bitmap
			};
			entries.push(entry);

			const s = get(settings);
			const baseName = file.name.replace(/\.[^.]+$/, '');
			imageSettingsMap.set(entry.id, { ...s, filename: `${baseName}-nobg` });
		} catch {
			toast.error(`Failed to load ${file.name}`);
		}
	}

	if (entries.length > 0) {
		images.update((list) => [...list, ...entries]);
		batchExported.set(false);

		const currentActive = get(activeImageId);
		if (!currentActive) {
			activateImage(entries[0].id);
		}

		toast.success(`${entries.length} image${entries.length > 1 ? 's' : ''} loaded`);
	}

	processingState.set('idle');
}

function activateImage(id: string): void {
	saveCurrentSettings();
	activeImageId.set(id);

	const saved = imageSettingsMap.get(id);
	if (saved) settings.set({ ...saved });

	const savedResult = imageResultMap.get(id);
	result.set(savedResult ?? null);
}

function saveCurrentSettings(): void {
	const id = get(activeImageId);
	if (id) {
		imageSettingsMap.set(id, { ...get(settings) });
	}
}

export function selectImage(id: string): void {
	if (get(processingState) !== 'idle') return;
	activateImage(id);
}

export function removeImage(id: string): void {
	const entry = get(images).find((i) => i.id === id);
	if (!entry) return;

	URL.revokeObjectURL(entry.thumbnailUrl);
	if (entry.bitmap) entry.bitmap.close();

	const r = imageResultMap.get(id);
	if (r) {
		URL.revokeObjectURL(r.url);
		imageResultMap.delete(id);
	}
	imageSettingsMap.delete(id);

	const w = getWorker();
	if (w) w.postMessage({ type: 'clear-cache', id });

	images.update((list) => list.filter((i) => i.id !== id));

	if (get(activeImageId) === id) {
		const remaining = get(images);
		if (remaining.length > 0) {
			activateImage(remaining[0].id);
		} else {
			activeImageId.set(null);
			result.set(null);
		}
	}

	toast.info('Image removed');
}

export function clearAll(silent = false): void {
	const list = get(images);
	for (const entry of list) {
		URL.revokeObjectURL(entry.thumbnailUrl);
		if (entry.bitmap) entry.bitmap.close();
	}
	for (const r of imageResultMap.values()) {
		URL.revokeObjectURL(r.url);
	}
	imageResultMap.clear();
	imageSettingsMap.clear();

	const w = getWorker();
	if (w) w.postMessage({ type: 'clear-all-cache' });

	images.set([]);
	activeImageId.set(null);
	result.set(null);
	batchProgress.set(null);
	batchExported.set(false);
	batchResultSize.set(null);
	processingTime.set(null);

	if (!silent) toast.success('All images cleared');
}

export function reorderImages(from: number, to: number): void {
	images.update((list) => {
		const item = list[from];
		const updated = [...list];
		updated.splice(from, 1);
		updated.splice(to, 0, item);
		return updated;
	});
}

export function updateImageFilename(id: string, filename: string): void {
	const s = imageSettingsMap.get(id);
	if (s) {
		s.filename = filename;
		imageSettingsMap.set(id, { ...s });
	}
	if (get(activeImageId) === id) {
		settings.update((curr) => ({ ...curr, filename }));
	}
}

export function getImageFilename(id: string): string {
	return imageSettingsMap.get(id)?.filename ?? '';
}

export function applyBatchNaming(
	pattern: NamingPattern,
	prefix: string = 'nobg',
	template: string = '{name}_{n}'
): void {
	const list = get(images);

	list.forEach((img, i) => {
		const n = i + 1;
		const baseName = img.file.name.replace(/\.[^.]+$/, '');
		let filename: string;

		switch (pattern) {
			case 'sequential':
				filename = `${prefix}-${n}`;
				break;
			case 'prefix-original':
				filename = `${prefix}-${baseName}`;
				break;
			case 'original-suffix':
				filename = `${baseName}_${prefix}`;
				break;
			case 'number-only':
				filename = String(n);
				break;
			case 'template':
				filename = template
					.replace(/\{name\}/g, baseName)
					.replace(/\{n\}/g, String(n));
				break;
		}

		const s = imageSettingsMap.get(img.id);
		if (s) {
			s.filename = filename;
			imageSettingsMap.set(img.id, { ...s });
		}
	});

	filenameRevision.update((n) => n + 1);
	toast.success('Filenames updated');
}

// -- REMOVAL ENGINE -- //

async function ensureModel(): Promise<boolean> {
	const w = getWorker();
	if (!w) {
		toast.error('Your browser does not support background removal. Try Chrome or Edge.');
		return false;
	}

	if (get(modelLoaded)) return true;

	processingState.set('downloading');
	downloadProgress.set(0);

	return new Promise((resolve) => {
		const handler = (e: MessageEvent) => {
			if (e.data.type === 'download-progress') {
				downloadProgress.set(e.data.progress);
			} else if (e.data.type === 'loaded') {
				w.removeEventListener('message', handler);
				modelLoaded.set(true);
				processingState.set('idle');
				resolve(true);
			} else if (e.data.type === 'error') {
				w.removeEventListener('message', handler);
				processingState.set('idle');
				toast.error('Failed to download model. Check your connection and try again.');
				resolve(false);
			}
		};

		w.addEventListener('message', handler);
		w.postMessage({ type: 'load' });
	});
}

async function getBgBitmap(): Promise<ImageBitmap | null> {
	const file = get(bgImageFile);
	if (!file) return null;
	return createImageBitmap(file);
}

async function doRemoveBg(img: ImageEntry, s: RemoverSettings): Promise<RemoveResult> {
	const w = getWorker()!;
	const bitmap = await createImageBitmap(img.file);
	const bgBitmap = s.bgType === 'image' ? await getBgBitmap() : null;
	const format = getOutputFormat(s);
	const quality = s.quality / 100;

	return new Promise((resolve, reject) => {
		const requestId = generateId();

		const handler = (e: MessageEvent) => {
			if (e.data.id !== requestId) return;
			w.removeEventListener('message', handler);

			if (e.data.type === 'result') {
				const url = URL.createObjectURL(e.data.blob);
				resolve({
					blob: e.data.blob,
					width: e.data.width,
					height: e.data.height,
					size: e.data.size,
					url
				});
			} else if (e.data.type === 'error') {
				reject(new Error(e.data.message));
			}
		};

		w.addEventListener('message', handler);

		const transferables: Transferable[] = [bitmap];
		if (bgBitmap) transferables.push(bgBitmap);

		w.postMessage({
			type: 'remove-bg',
			id: requestId,
			bitmap,
			bgType: s.bgType,
			bgColor: s.bgColor,
			gradientStart: s.gradientStart,
			gradientEnd: s.gradientEnd,
			gradientDirection: s.gradientDirection,
			bgBitmap,
			format,
			quality
		}, transferables);
	});
}

export async function performRemoveBg(): Promise<void> {
	const img = get(activeImage);
	const s = get(settings);
	if (!img) return;

	saveCurrentSettings();

	const loaded = await ensureModel();
	if (!loaded) return;

	processingState.set('removing');
	cancelled = false;

	const prevResult = imageResultMap.get(img.id);
	if (prevResult) {
		URL.revokeObjectURL(prevResult.url);
		imageResultMap.delete(img.id);
		result.set(null);
	}

	const startTime = performance.now();

	const removePromise = minDelay(doRemoveBg(img, s)).finally(() => {
		processingState.set('idle');
	});

	toast.promise(removePromise, {
		loading: 'Removing background...',
		success: (r: RemoveResult) => {
			imageResultMap.set(img.id, r);
			if (get(activeImageId) === img.id) result.set(r);
			processingTime.set(Math.round(performance.now() - startTime));
			trackStats(1);

			const reduction = Math.round((1 - r.size / img.originalSize) * 100);
			return `Background removed — ${formatBytes(r.size)} (${Math.abs(reduction)}% ${reduction >= 0 ? 'smaller' : 'larger'})`;
		},
		error: 'Background removal failed'
	});

	return removePromise.then(() => {});
}

let recomposeTimer: ReturnType<typeof setTimeout>;

export function recompositeIfNeeded(): void {
	const img = get(activeImage);
	const r = imageResultMap.get(img?.id ?? '');
	if (!img || !r) return;

	clearTimeout(recomposeTimer);
	recomposeTimer = setTimeout(() => performRecomposite(), 200);
}

async function performRecomposite(): Promise<void> {
	const img = get(activeImage);
	const s = get(settings);
	if (!img) return;

	const w = getWorker();
	if (!w) return;

	const prevResult = imageResultMap.get(img.id);
	if (!prevResult) return;

	const bgBitmap = s.bgType === 'image' ? await getBgBitmap() : null;
	const format = getOutputFormat(s);
	const quality = s.quality / 100;

	const requestId = generateId();

	const handler = (e: MessageEvent) => {
		if (e.data.id !== requestId) return;
		w.removeEventListener('message', handler);

		if (e.data.type === 'result') {
			URL.revokeObjectURL(prevResult.url);
			const url = URL.createObjectURL(e.data.blob);
			const newResult: RemoveResult = {
				blob: e.data.blob,
				width: e.data.width,
				height: e.data.height,
				size: e.data.size,
				url
			};
			imageResultMap.set(img.id, newResult);
			if (get(activeImageId) === img.id) result.set(newResult);
		}
	};

	w.addEventListener('message', handler);

	const transferables: Transferable[] = [];
	if (bgBitmap) transferables.push(bgBitmap);

	w.postMessage({
		type: 'recomposite',
		id: requestId,
		bgType: s.bgType,
		bgColor: s.bgColor,
		gradientStart: s.gradientStart,
		gradientEnd: s.gradientEnd,
		gradientDirection: s.gradientDirection,
		bgBitmap,
		format,
		quality
	}, transferables);
}

export async function downloadResult(): Promise<void> {
	const r = get(result);
	const img = get(activeImage);
	if (!r || !img) return;

	const s = get(settings);
	const format = getOutputFormat(s);
	const ext = getExtension(format);
	const name = s.filename || 'nobg';

	const a = document.createElement('a');
	a.href = r.url;
	a.download = `${name}${ext}`;
	a.click();

	await new Promise((r) => setTimeout(r, 500));
	toast.success(`Downloaded · ${formatBytes(r.size)}`);
}

const batchBlobs = new Map<string, { blob: Blob; filename: string; ext: string }>();

export async function performBatchRemove(): Promise<void> {
	const list = get(images);
	if (list.length < 2) return;

	const loaded = await ensureModel();
	if (!loaded) return;

	processingState.set('removing');
	cancelled = false;
	batchResultSize.set(null);
	const s = get(settings);
	batchBlobs.clear();

	const removePromise = minDelay((async () => {
		batchProgress.set({ current: 0, total: list.length });
		let totalSize = 0;

		for (let i = 0; i < list.length; i++) {
			if (cancelled) { toast.info('Cancelled'); return; }
			batchProgress.set({ current: i + 1, total: list.length });
			const img = list[i];
			const perImageSettings = imageSettingsMap.get(img.id);
			const format = getOutputFormat(s);
			const ext = getExtension(format);
			const filename = perImageSettings?.filename || img.file.name.replace(/\.[^.]+$/, '');

			const r = await doRemoveBg(img, s);
			batchBlobs.set(img.id, { blob: r.blob, filename, ext });
			totalSize += r.size;
			URL.revokeObjectURL(r.url);
		}

		batchResultSize.set(totalSize);
		trackStats(list.length);
	})()).finally(() => {
		processingState.set('idle');
		batchProgress.set(null);
	});

	toast.promise(removePromise, {
		loading: `Removing backgrounds from ${list.length} images...`,
		success: `${list.length} backgrounds removed`,
		error: 'Background removal failed'
	});

	return removePromise;
}

export async function downloadBatchZip(zipName = 'background-removed'): Promise<void> {
	if (batchBlobs.size === 0) return;

	processingState.set('exporting');

	const zipPromise = minDelay((async () => {
		const { default: JSZip } = await import('jszip');
		const zip = new JSZip();

		for (const [, { blob, filename, ext }] of batchBlobs) {
			zip.file(`${filename}${ext}`, blob);
		}

		const zipBlob = await zip.generateAsync({ type: 'blob' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(zipBlob);
		a.download = `${zipName}.zip`;
		a.click();
		URL.revokeObjectURL(a.href);
		batchExported.set(true);
	})());

	zipPromise.finally(() => processingState.set('idle'));
	return zipPromise;
}

// -- STATS -- //

export function fetchStats(): void {
	if (!browser) return;
	fetch('/api/stats/?toolId=background-remover')
		.then((r) => r.json())
		.then((d) => totalProcessed.set(d.totalProcessed ?? null))
		.catch(() => {});
}

function trackStats(count: number): void {
	if (!browser) return;
	fetch('/api/stats/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ toolId: 'background-remover', count }),
		keepalive: true
	})
		.then(() => fetchStats())
		.catch(() => {});
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_lib/store.ts
git commit -m "feat(products): add background-remover store with removal, compositing, and batch support"
```

---

## Task 4: Create RemoverControls Component

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_components/RemoverControls.svelte`

- [ ] **Step 1: Write RemoverControls.svelte**

```svelte
<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		settings,
		activeImage,
		bgImageFile,
		result,
		processingState,
		getOutputFormat,
		recompositeIfNeeded
	} from '../_lib/store';
	import type { BackgroundType, GradientDirection } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Image as ImageIcon, Upload } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import ColorPicker from '$lib/components/ui/ColorPicker.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	// -- OPTIONAL PROPS -- //

	export let batch = false;

	// -- STATES -- //

	let bgFileInput: HTMLInputElement;

	// -- REACTIVE STATES -- //

	$: outputFormat = getOutputFormat($settings);
	$: isTransparent = $settings.bgType === 'transparent';
	$: showQuality = !isTransparent && outputFormat !== 'image/png';
	$: isProcessing = $processingState !== 'idle';
	$: hasResult = $result !== null;

	// -- CONSTANTS -- //

	const bgTypes: { value: BackgroundType; label: string }[] = [
		{ value: 'transparent', label: 'Transparent' },
		{ value: 'color', label: 'Color' },
		{ value: 'gradient', label: 'Gradient' },
		{ value: 'image', label: 'Image' }
	];

	const directions: { value: GradientDirection; label: string }[] = [
		{ value: 'down', label: '↓' },
		{ value: 'up', label: '↑' },
		{ value: 'right', label: '→' },
		{ value: 'left', label: '←' },
		{ value: 'down-right', label: '↘' },
		{ value: 'down-left', label: '↙' },
		{ value: 'up-right', label: '↗' },
		{ value: 'up-left', label: '↖' }
	];

	const formatItems = [
		{ value: 'image/png', label: 'PNG' },
		{ value: 'image/jpeg', label: 'JPEG' },
		{ value: 'image/webp', label: 'WebP' }
	];

	// -- FUNCTIONS -- //

	function handleBgTypeChange(type: BackgroundType) {
		settings.update((s) => ({ ...s, bgType: type }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleBgColorChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, bgColor: e.detail }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleGradientStartChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, gradientStart: e.detail }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleGradientEndChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, gradientEnd: e.detail }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleDirectionChange(dir: GradientDirection) {
		settings.update((s) => ({ ...s, gradientDirection: dir }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleBgImageUpload(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		bgImageFile.set(file);
		input.value = '';
		if (hasResult) recompositeIfNeeded();
	}

	function handleFormatChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, format: e.detail as typeof $settings.format }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleQualityChange(e: Event) {
		const val = parseInt((e.target as HTMLInputElement).value);
		settings.update((s) => ({ ...s, quality: val }));
		if (hasResult) recompositeIfNeeded();
	}

	function handleQualityInput(e: Event) {
		const val = parseInt((e.target as HTMLInputElement).value);
		if (!isNaN(val) && val >= 1 && val <= 100) {
			settings.update((s) => ({ ...s, quality: val }));
			if (hasResult) recompositeIfNeeded();
		}
	}

	function handleFilenameChange(e: Event) {
		const filename = (e.target as HTMLInputElement).value;
		settings.update((s) => ({ ...s, filename }));
	}
</script>

<div class={cn('flex flex-col gap-4 transition-opacity', isProcessing && 'pointer-events-none opacity-50')}>
	<!-- BACKGROUND TYPE -->
	<div>
		<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
			Background
		</p>
		<div class="grid grid-cols-4 rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
			{#each bgTypes as bg, i}
				<button
					class={cn(
						'px-2 py-2 text-xs font-medium transition-colors',
						i === 0 && 'rounded-l-lg',
						i === bgTypes.length - 1 && 'rounded-r-lg',
						$settings.bgType === bg.value
							? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
							: 'text-[#64748B] hover:bg-[#F8FAFC] dark:text-slate-400 dark:hover:bg-[#1E1A5E]/30'
					)}
					on:click={() => handleBgTypeChange(bg.value)}
				>
					{bg.label}
				</button>
			{/each}
		</div>
	</div>

	<!-- COLOR PICKER -->
	{#if $settings.bgType === 'color'}
		<div>
			<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">Background Color</p>
			<ColorPicker value={$settings.bgColor} on:input={handleBgColorChange} />
		</div>
	{/if}

	<!-- GRADIENT CONTROLS -->
	{#if $settings.bgType === 'gradient'}
		<div class="flex flex-col gap-3">
			<div>
				<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">Start Color</p>
				<ColorPicker value={$settings.gradientStart} on:input={handleGradientStartChange} />
			</div>
			<div>
				<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">End Color</p>
				<ColorPicker value={$settings.gradientEnd} on:input={handleGradientEndChange} />
			</div>
			<div>
				<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">Direction</p>
				<div class="grid grid-cols-4 gap-1">
					{#each directions as dir}
						<button
							class={cn(
								'rounded-lg border py-1.5 text-sm transition-colors',
								$settings.gradientDirection === dir.value
									? 'border-[#0891B2] bg-[#0891B2]/10 text-[#0891B2] dark:border-[#22D3EE] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
									: 'border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-slate-500'
							)}
							on:click={() => handleDirectionChange(dir.value)}
						>
							{dir.label}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- IMAGE UPLOAD -->
	{#if $settings.bgType === 'image'}
		<div>
			<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">Background Image</p>
			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-xs font-medium transition-colors',
					$bgImageFile
						? 'border-[#0891B2] text-[#0891B2] dark:border-[#22D3EE] dark:text-[#22D3EE]'
						: 'border-[#CBD5E1] text-[#64748B] hover:border-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]'
				)}
				on:click={() => bgFileInput.click()}
			>
				{#if $bgImageFile}
					<ImageIcon size={12} />
					{$bgImageFile.name}
				{:else}
					<Upload size={12} />
					Choose background image
				{/if}
			</button>
			<input
				bind:this={bgFileInput}
				type="file"
				accept=".png,.jpg,.jpeg,.webp"
				class="hidden"
				on:change={handleBgImageUpload}
			/>
		</div>
	{/if}

	<!-- OUTPUT FORMAT -->
	{#if !isTransparent}
		<div>
			<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
				Output Format
			</p>
			<Select
				items={formatItems}
				value={$settings.format}
				on:change={handleFormatChange}
			/>
		</div>
	{/if}

	<!-- QUALITY SLIDER -->
	{#if showQuality}
		<div>
			<div class="mb-2 flex items-center justify-between">
				<span class="text-xs font-medium text-[#64748B] dark:text-slate-400">Quality</span>
				<input
					type="number"
					min="1"
					max="100"
					value={$settings.quality}
					on:input={handleQualityInput}
					class="w-14 rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-center text-xs text-[#0F172A] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:text-white"
				/>
			</div>
			<input
				type="range"
				min="1"
				max="100"
				value={$settings.quality}
				on:input={handleQualityChange}
				class="w-full accent-[#0891B2] dark:accent-[#22D3EE]"
			/>
			<div class="mt-1 flex justify-between text-[10px] text-[#94A3B8] dark:text-slate-500">
				<span>Smaller file</span>
				<span>Better quality</span>
			</div>
		</div>
	{/if}

	<!-- FILENAME (SINGLE MODE ONLY) -->
	{#if !batch}
		<div>
			<label for="output-filename" class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Filename</label>
			<input
				id="output-filename"
				type="text"
				value={$settings.filename}
				on:input={handleFilenameChange}
				class={cn(
					'w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
					'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
					'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
				)}
			/>
		</div>
	{/if}
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_components/RemoverControls.svelte
git commit -m "feat(products): add RemoverControls with background type, gradient, image upload"
```

---

## Task 5: Create RemoverInfoPanel Component

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_components/RemoverInfoPanel.svelte`

- [ ] **Step 1: Write RemoverInfoPanel.svelte**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import tippyJs from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		activeImage,
		result,
		processingState,
		processingTime,
		imageCount,
		batchProgress,
		batchResultSize,
		settings,
		formatBytes,
		formatName,
		getOutputFormat,
		performRemoveBg,
		downloadResult,
		performBatchRemove,
		downloadBatchZip,
		cancelProcessing,
		images
	} from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Download, Loader2, Archive, Play, Sparkles } from 'lucide-svelte';

	// -- OPTIONAL PROPS -- //

	export let batch = false;

	// -- STATES -- //

	let zipDialogOpen = false;
	let zipFilename = 'background-removed';
	let zipTippyInstance: any;
	let singleTippyInstance: any;
	let tippyTimeout: ReturnType<typeof setTimeout>;
	let tooltipShownForResult = false;

	function singleTippy(node: HTMLElement) {
		const instance = tippyJs(node, {
			content: 'Your file is ready to download!',
			placement: 'bottom',
			arrow: true,
			trigger: 'manual',
			appendTo: () => document.body
		});
		singleTippyInstance = instance;
		return { destroy: () => { instance.destroy(); singleTippyInstance = null; } };
	}

	function showSingleTooltip() {
		if (!singleTippyInstance || tooltipShownForResult) return;
		const ref = singleTippyInstance.reference as HTMLElement;
		if (!ref || ref.offsetParent === null) return;
		tooltipShownForResult = true;
		singleTippyInstance.show();
		clearTimeout(tippyTimeout);
		tippyTimeout = setTimeout(() => { singleTippyInstance?.hide(); }, 4000);
	}

	function zipTippy(node: HTMLElement) {
		const instance = tippyJs(node, {
			content: 'Your files are ready to download!',
			placement: 'bottom',
			arrow: true,
			trigger: 'manual',
			appendTo: () => document.body
		});
		zipTippyInstance = instance;
		return { destroy: () => { instance.destroy(); zipTippyInstance = null; } };
	}

	// -- FUNCTIONS -- //

	function showZipTooltip() {
		if (!zipTippyInstance || tooltipShownForResult) return;
		const ref = zipTippyInstance.reference as HTMLElement;
		if (!ref || ref.offsetParent === null) return;
		tooltipShownForResult = true;
		zipTippyInstance.show();
		clearTimeout(tippyTimeout);
		tippyTimeout = setTimeout(() => { zipTippyInstance?.hide(); }, 4000);
	}

	function openZipDialog() {
		zipFilename = 'background-removed';
		zipDialogOpen = true;
	}

	function handleZipConfirm() {
		zipDialogOpen = false;
		downloadBatchZip(zipFilename || 'background-removed');
	}

	function handleZipCancel() {
		zipDialogOpen = false;
	}

	function handleZipKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleZipConfirm();
		if (e.key === 'Escape') handleZipCancel();
	}

	// -- REACTIVE STATEMENTS -- //

	$: if (typeof document !== 'undefined') {
		if (zipDialogOpen) {
			document.documentElement.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = '';
			document.body.style.overflow = '';
		}
	}

	$: if ($batchResultSize === null && $result === null) { tooltipShownForResult = false; }
	$: if ($batchResultSize !== null && $processingState === 'idle' && batch) {
		setTimeout(showZipTooltip, 300);
	}
	$: if ($result !== null && $processingState === 'idle' && !batch) {
		setTimeout(showSingleTooltip, 300);
	}

	// -- REACTIVE STATES -- //

	$: outputFormat = getOutputFormat($settings);
	$: reduction = $result && $activeImage
		? Math.round((1 - $result.size / $activeImage.originalSize) * 100)
		: 0;
	$: isProcessing = $processingState !== 'idle';
	$: isRemoving = $processingState === 'removing' || $processingState === 'downloading';
	$: totalOriginalSize = $images.reduce((sum, img) => sum + img.originalSize, 0);
	$: batchReduction = $batchResultSize !== null && totalOriginalSize > 0
		? Math.round((1 - $batchResultSize / totalOriginalSize) * 100)
		: null;
</script>

{#if !batch}
	<!-- SINGLE MODE INFO -->
	<div class="flex flex-col gap-3">
		{#if $activeImage}
			<!-- STATS GRID -->
			<div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-xs">
				<span class="text-[#94A3B8] dark:text-slate-500">Original</span>
				<span class="text-right font-medium text-[#0F172A] dark:text-white">
					{formatBytes($activeImage.originalSize)} · {formatName($activeImage.file.type)}
				</span>

				<span class="text-[#94A3B8] dark:text-slate-500">Dimensions</span>
				<span class="text-right font-medium text-[#0F172A] dark:text-white">
					{$activeImage.originalWidth}×{$activeImage.originalHeight}
				</span>

				{#if $result}
					<span class="text-[#94A3B8] dark:text-slate-500">Result</span>
					<span class="text-right font-medium text-[#0891B2] dark:text-[#22D3EE]">
						{formatBytes($result.size)} · {formatName(outputFormat)}
					</span>

					{#if $processingTime !== null}
						<span class="text-[#94A3B8] dark:text-slate-500">Time</span>
						<span class="text-right font-medium text-[#0F172A] dark:text-white">
							{($processingTime / 1000).toFixed(1)}s
						</span>
					{/if}
				{/if}
			</div>
		{/if}

		<!-- PROGRESS BAR -->
		{#if $batchProgress}
			<div class="overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]/50">
				<div
					class="h-1 rounded-full bg-[#0891B2] transition-all duration-300 dark:bg-[#22D3EE]"
					style="width: {($batchProgress.current / $batchProgress.total) * 100}%;"
				/>
			</div>
		{/if}

		<!-- ACTION BUTTONS -->
		<div class="flex flex-col gap-2">
			{#if isRemoving}
				<div class="flex gap-2">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						disabled
					>
						<Loader2 size={14} class="animate-spin" />
						{$processingState === 'downloading' ? 'Loading model...' : 'Removing...'}
					</button>
					<button
						class="flex items-center justify-center rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-xs font-medium text-[#64748B] transition-all hover:border-[#EF4444] hover:text-[#EF4444] dark:border-[#2A2578] dark:text-slate-400"
						on:click={cancelProcessing}
					>
						Cancel
					</button>
				</div>
			{:else}
				<button
					class={cn(
						'flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
						'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
					)}
					disabled={!$activeImage}
					on:click={performRemoveBg}
				>
					<Sparkles size={14} />
					{#if $result}
						Re-process
					{:else}
						Remove Background
					{/if}
				</button>
			{/if}

			{#if $result}
				<button
					class="flex items-center justify-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-all hover:bg-[#F8FAFC] dark:border-[#2A2578] dark:text-white dark:hover:bg-[#1E1A5E]/30"
					use:singleTippy
					on:click={() => { singleTippyInstance?.hide(); downloadResult(); }}
				>
					<Download size={14} />
					Download
				</button>
			{/if}
		</div>
	</div>
{:else}
	<!-- BATCH MODE INFO -->
	<div class="flex flex-col gap-3">
		<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
			<span class="text-[#94A3B8] dark:text-slate-500">Images</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">{$imageCount}</span>

			<span class="text-[#94A3B8] dark:text-slate-500">Original</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">{formatBytes(totalOriginalSize)}</span>

			{#if $batchResultSize !== null}
				<span class="text-[#94A3B8] dark:text-slate-500">Result</span>
				<span class="text-right tabular-nums text-[#0891B2] dark:text-[#22D3EE]">{formatBytes($batchResultSize)}</span>

				<span class="text-[#94A3B8] dark:text-slate-500">Change</span>
				<span class={cn(
					'text-right font-semibold tabular-nums',
					batchReduction !== null && batchReduction > 0 ? 'text-[#10B981]' : 'text-[#94A3B8] dark:text-slate-500'
				)}>
					{#if batchReduction !== null && batchReduction > 0}
						{batchReduction}% smaller
					{:else if batchReduction !== null && batchReduction < 0}
						{Math.abs(batchReduction)}% larger
					{:else}
						Same size
					{/if}
				</span>
			{/if}
		</div>

		<!-- PROGRESS BAR -->
		{#if $batchProgress}
			<div class="space-y-1.5">
				<div class="flex justify-between text-xs text-[#94A3B8] dark:text-slate-500">
					<span>Processing</span>
					<span class="tabular-nums">{$batchProgress.current} / {$batchProgress.total}</span>
				</div>
				<div class="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]/50">
					<div
						class="h-full rounded-full bg-[#0891B2] transition-[width] duration-75 dark:bg-[#22D3EE]"
						style="width: {($batchProgress.current / $batchProgress.total) * 100}%;"
					/>
				</div>
			</div>
		{/if}

		<!-- ACTION BUTTONS -->
		<div class="space-y-2">
			{#if isRemoving}
				<div class="flex gap-2">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						disabled
					>
						<Loader2 size={14} class="animate-spin" />
						{$batchProgress ? `${$batchProgress.current}/${$batchProgress.total}` : 'Processing...'}
					</button>
					<button
						class="flex items-center justify-center rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-xs font-medium text-[#64748B] transition-all hover:border-[#EF4444] hover:text-[#EF4444] dark:border-[#2A2578] dark:text-slate-400"
						on:click={cancelProcessing}
					>
						Cancel
					</button>
				</div>
			{:else}
				<button
					class={cn(
						'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all',
						'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
					)}
					on:click={performBatchRemove}
				>
					{#if $batchResultSize !== null}
						<Play size={14} />
						Re-process All
					{:else}
						<Sparkles size={14} />
						Remove All Backgrounds
					{/if}
				</button>
			{/if}

			{#if $batchResultSize !== null && !isProcessing}
				<button
					class={cn(
						'animate-glow-border flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-[#0891B2] transition-all hover:brightness-110',
						'dark:text-[#22D3EE]'
					)}
					use:zipTippy
					on:click={() => { zipTippyInstance?.hide(); openZipDialog(); }}
				>
					<Archive size={14} />
					Download ZIP
				</button>
			{/if}
		</div>
	</div>
{/if}

<!-- ZIP DOWNLOAD DIALOG -->
{#if zipDialogOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
		on:click={(e) => { if (e.target === e.currentTarget) handleZipCancel(); }}
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 150 }}
	>
		<div
			class="mx-4 w-full max-w-sm rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-2xl dark:border-[#2A2578] dark:bg-[#161446]"
			transition:fly={{ y: 16, duration: 220, easing: cubicOut }}
		>
			<div class="flex items-start gap-4">
				<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
					<Archive size={20} class="text-[#0891B2] dark:text-[#22D3EE]" />
				</div>
				<div class="min-w-0 flex-1">
					<h3 class="text-sm font-semibold text-[#0F172A] dark:text-white">Download ZIP</h3>
					<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
						{$imageCount} images · {$batchResultSize !== null ? formatBytes($batchResultSize) : ''}
					</p>
				</div>
			</div>

			<div class="mt-4">
				<label for="zip-filename" class="mb-1.5 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Filename</label>
				<div class="flex items-center gap-0">
					<input
						id="zip-filename"
						type="text"
						bind:value={zipFilename}
						on:keydown={handleZipKeydown}
						class={cn(
							'min-w-0 flex-1 rounded-l-lg border bg-white px-3 py-2 text-sm transition-colors focus:relative focus:z-10',
							'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
							'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
						)}
					/>
					<span class="-ml-px rounded-r-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm text-[#94A3B8] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:text-slate-500">
						.zip
					</span>
				</div>
			</div>

			<div class="mt-5 flex justify-end gap-2">
				<button
					class="rounded-lg border border-[#E2E8F0] px-4 py-2 text-xs font-medium text-[#64748B] transition-all hover:border-[#CBD5E1] hover:text-[#334155] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300"
					on:click={handleZipCancel}
				>
					Cancel
				</button>
				<button
					class="rounded-lg bg-[#0891B2] px-4 py-2 text-xs font-medium text-white transition-all hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
					on:click={handleZipConfirm}
				>
					<span class="flex items-center gap-1.5">
						<Download size={12} />
						Download
					</span>
				</button>
			</div>
		</div>
	</div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_components/RemoverInfoPanel.svelte
git commit -m "feat(products): add RemoverInfoPanel with stats, actions, and batch ZIP dialog"
```

---

## Task 6: Create CompareSlider Component

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_components/CompareSlider.svelte`

- [ ] **Step 1: Write CompareSlider.svelte**

This is adapted from the compressor's CompareSlider. Key changes: the processing overlay shows model download progress or "Removing background..." instead of "Compressing...", and labels say "Original" / "Result" instead of "Compressed".

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { activeImage, result, processingState, downloadProgress, formatBytes } from '../_lib/store';
	import { isDark } from '$lib/stores/theme';
	// IMPORTED DEP-COMPONENTS
	import { Loader2, ImageIcon, GripVertical, ZoomIn, ZoomOut, RotateCcw } from 'lucide-svelte';

	// -- CONSTANTS -- //

	const MIN_ZOOM = 1;
	const MAX_ZOOM = 20;
	const ZOOM_STEP = 0.15;

	// -- STATES -- //

	let containerEl: HTMLDivElement;
	let sliderPosition = 50;
	let isDragging = false;
	let zoom = 1;
	let panX = 0;
	let panY = 0;
	let isPanning = false;
	let panStartX = 0;
	let panStartY = 0;
	let panOriginX = 0;
	let panOriginY = 0;

	// -- REACTIVE STATES -- //

	$: checkerColor = $isDark ? '#1E1A5E' : '#E2E8F0';
	$: checkerBg = $isDark ? '#0B0A23' : '#F8FAFC';
	$: displayResult = $result;
	$: if ($result) { sliderPosition = 50; zoom = 1; panX = 0; panY = 0; }
	$: originalSrc = $activeImage?.thumbnailUrl ?? '';
	$: resultSrc = displayResult?.url ?? '';
	$: imageTransform = `scale(${zoom}) translate(${panX}px, ${panY}px)`;
	$: isZoomed = zoom > 1;
	$: isDownloading = $processingState === 'downloading';
	$: isRemoving = $processingState === 'removing';

	// -- FUNCTIONS -- //

	function handleSliderDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		e.stopPropagation();
		e.preventDefault();
		isDragging = true;
		document.addEventListener('pointermove', handleDocMove);
		document.addEventListener('pointerup', handleDocUp);
		document.addEventListener('pointercancel', handleDocUp);
	}

	function handleContainerPointerDown(e: PointerEvent) {
		if (e.pointerType === 'mouse' && e.button !== 0) return;
		const target = e.target as HTMLElement;
		if (target.closest('[data-slider-handle]')) return;

		if (isZoomed) {
			e.preventDefault();
			isPanning = true;
			panStartX = e.clientX;
			panStartY = e.clientY;
			panOriginX = panX;
			panOriginY = panY;
			document.addEventListener('pointermove', handleDocMove);
			document.addEventListener('pointerup', handleDocUp);
			document.addEventListener('pointercancel', handleDocUp);
		}
	}

	function handleDocMove(e: PointerEvent) {
		if (isDragging) {
			updatePosition(e);
			return;
		}
		if (isPanning) {
			panX = panOriginX + (e.clientX - panStartX) / zoom;
			panY = panOriginY + (e.clientY - panStartY) / zoom;
			clampPan();
		}
	}

	function handleDocUp() {
		isDragging = false;
		isPanning = false;
		document.removeEventListener('pointermove', handleDocMove);
		document.removeEventListener('pointerup', handleDocUp);
		document.removeEventListener('pointercancel', handleDocUp);
	}

	function updatePosition(e: PointerEvent) {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const x = e.clientX - rect.left;
		sliderPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
	}

	let lastPinchDist = 0;

	function handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 2) {
			e.preventDefault();
			lastPinchDist = getTouchDist(e.touches);
		}
	}

	function handleTouchMove(e: TouchEvent) {
		if (e.touches.length === 2) {
			e.preventDefault();
			const dist = getTouchDist(e.touches);
			if (lastPinchDist > 0) {
				const scale = dist / lastPinchDist;
				applyZoomSimple(zoom * scale);
			}
			lastPinchDist = dist;
		}
	}

	function handleTouchEnd(e: TouchEvent) {
		if (e.touches.length < 2) lastPinchDist = 0;
	}

	function getTouchDist(touches: TouchList): number {
		const dx = touches[0].clientX - touches[1].clientX;
		const dy = touches[0].clientY - touches[1].clientY;
		return Math.sqrt(dx * dx + dy * dy);
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
		applyZoomAtPoint(zoom * (1 + delta), e.clientX, e.clientY);
	}

	function applyZoomSimple(newZoom: number) {
		const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
		if (clamped === zoom) return;
		zoom = clamped;
		if (zoom <= 1) { panX = 0; panY = 0; }
		clampPan();
	}

	function applyZoomAtPoint(newZoom: number, clientX: number, clientY: number) {
		const clamped = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
		if (clamped === zoom) return;

		if (containerEl) {
			const rect = containerEl.getBoundingClientRect();
			const cx = (clientX - rect.left) / rect.width - 0.5;
			const cy = (clientY - rect.top) / rect.height - 0.5;
			const scaleFactor = clamped / zoom;
			panX = panX - cx * rect.width * (scaleFactor - 1) / clamped;
			panY = panY - cy * rect.height * (scaleFactor - 1) / clamped;
		}

		zoom = clamped;
		if (zoom <= 1) { panX = 0; panY = 0; }
		clampPan();
	}

	function zoomIn() {
		applyZoomSimple(zoom * (1 + ZOOM_STEP * 3));
	}

	function zoomOut() {
		applyZoomSimple(zoom * (1 - ZOOM_STEP * 3));
	}

	function resetZoom() {
		zoom = 1;
		panX = 0;
		panY = 0;
	}

	function clampPan() {
		if (!containerEl) return;
		const rect = containerEl.getBoundingClientRect();
		const maxPanX = Math.max(0, (rect.width * (zoom - 1)) / (2 * zoom));
		const maxPanY = Math.max(0, (rect.height * (zoom - 1)) / (2 * zoom));
		panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
		panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
	}

	// -- REACTIVE STATEMENTS -- //

	$: if ($activeImage) {
		zoom = 1;
		panX = 0;
		panY = 0;
		sliderPosition = 50;
	}

	// -- LIFECYCLES -- //

	onDestroy(() => {
		document.removeEventListener('pointermove', handleDocMove);
		document.removeEventListener('pointerup', handleDocUp);
		document.removeEventListener('pointercancel', handleDocUp);
	});
</script>

{#if $activeImage}
	<div
		bind:this={containerEl}
		class={cn(
			'relative flex flex-1 select-none overflow-hidden rounded-xl border',
			isZoomed ? 'touch-none' : 'touch-pan-y',
			'border-[#E2E8F0] dark:border-[#2A2578]',
			'min-h-[320px] lg:min-h-[460px]',
			isZoomed && !isDragging ? 'cursor-grab' : '',
			isPanning ? 'cursor-grabbing' : ''
		)}
		style="background-color: {checkerBg}; background-image: linear-gradient(45deg, {checkerColor} 25%, transparent 25%), linear-gradient(-45deg, {checkerColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, {checkerColor} 75%), linear-gradient(-45deg, transparent 75%, {checkerColor} 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px;"
		on:pointerdown={handleContainerPointerDown}
		on:wheel={handleWheel}
		on:touchstart|nonpassive={handleTouchStart}
		on:touchmove|nonpassive={handleTouchMove}
		on:touchend={handleTouchEnd}
	>
		<!-- LOADING / PROCESSING OVERLAY -->
		{#if isDownloading}
			<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
				<div class="mb-3 h-1.5 w-48 overflow-hidden rounded-full bg-white/20">
					<div
						class="h-full rounded-full bg-[#22D3EE] transition-all duration-300"
						style="width: {$downloadProgress}%;"
					/>
				</div>
				<span class="text-xs font-medium text-white/80">Downloading model... {$downloadProgress}%</span>
			</div>
		{:else if isRemoving}
			<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
				<Loader2 size={28} class="animate-spin text-[#22D3EE]" />
				<span class="mt-2 text-xs font-medium text-white/80">Removing background...</span>
			</div>
		{/if}

		<!-- ORIGINAL IMAGE (FULL WIDTH) -->
		<img
			src={originalSrc}
			alt=""
			class="absolute inset-0 h-full w-full object-contain p-3"
			style="transform: {imageTransform}; transform-origin: center center;"
		/>

		<!-- RESULT IMAGE (CLIPPED BY SLIDER) -->
		{#if resultSrc}
			<div
				class="absolute inset-0"
				style="clip-path: inset(0 0 0 {sliderPosition}%);"
			>
				<img
					src={resultSrc}
					alt=""
					class="h-full w-full object-contain p-3"
					style="transform: {imageTransform}; transform-origin: center center;"
				/>
			</div>
		{/if}

		<!-- SLIDER DIVIDER -->
		{#if resultSrc}
			<div
				class="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
				style="left: {sliderPosition}%;"
			/>
			<div
				data-slider-handle
				class="absolute top-0 bottom-0 z-20 w-10 -translate-x-1/2 cursor-col-resize"
				style="left: {sliderPosition}%;"
				on:pointerdown={handleSliderDown}
			>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white p-2 shadow-lg">
					<GripVertical size={16} class="text-[#64748B]" />
				</div>
			</div>
		{/if}

		<!-- ZOOM CONTROLS -->
		<div class="absolute top-3 right-3 z-10 flex items-center gap-1">
			<button
				class="rounded-md bg-black/50 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
				on:click={zoomIn}
				title="Zoom in"
			>
				<ZoomIn size={14} />
			</button>
			<button
				class="rounded-md bg-black/50 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
				on:click={zoomOut}
				title="Zoom out"
			>
				<ZoomOut size={14} />
			</button>
			{#if isZoomed}
				<button
					class="rounded-md bg-black/50 p-1.5 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
					on:click={resetZoom}
					title="Reset zoom"
				>
					<RotateCcw size={14} />
				</button>
			{/if}
		</div>

		<!-- ZOOM LEVEL INDICATOR -->
		{#if isZoomed}
			<div class="pointer-events-none absolute top-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium tabular-nums text-white backdrop-blur-sm">
				{Math.round(zoom * 100)}%
			</div>
		{/if}

		<!-- LABELS -->
		<div class="pointer-events-none absolute bottom-3 left-3 z-10 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
			Original · {$activeImage ? formatBytes($activeImage.originalSize) : ''}
		</div>

		{#if displayResult}
			<div class="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-[#0891B2]/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm dark:bg-[#22D3EE]/80 dark:text-[#0B0A23]">
				Result · {formatBytes(displayResult.size)}
			</div>
		{/if}
	</div>
{:else}
	<!-- EMPTY STATE -->
	<div
		class={cn(
			'flex flex-1 flex-col items-center justify-center rounded-xl border',
			'border-[#E2E8F0] dark:border-[#2A2578]',
			'min-h-[320px] lg:min-h-[460px]'
		)}
		style="background-color: {checkerBg};"
	>
		<ImageIcon size={32} class="text-[#CBD5E1] dark:text-slate-600" />
		<p class="mt-2 text-xs text-[#94A3B8] dark:text-slate-500">No image selected</p>
	</div>
{/if}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_components/CompareSlider.svelte
git commit -m "feat(products): add CompareSlider with checkerboard and model download overlay"
```

---

## Task 7: Create BatchImageList and ThumbnailStrip

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/_components/BatchImageList.svelte`
- Create: `src/routes/products/(utilities)/background-remover/_components/ThumbnailStrip.svelte`

These are copies of the compressor's components with import paths changed from `'../_lib/store'` to point to the background-remover store. The code is identical in structure.

- [ ] **Step 1: Write BatchImageList.svelte**

Copy from `src/routes/products/(utilities)/image-compressor/_components/BatchImageList.svelte` with these changes:
- All imports from `'../_lib/store'` already point to the correct local store (the import path `'../_lib/store'` is relative and resolves to the background-remover store when this file lives in the background-remover `_components/` directory).
- Change the default naming prefix on line 47 from `'compressed'` to `'nobg'`:

```
let namingPrefix: string = 'nobg';
```

No other changes needed — the file is otherwise identical. Copy the full file, then change only that one line.

- [ ] **Step 2: Write ThumbnailStrip.svelte**

Copy from `src/routes/products/(utilities)/image-compressor/_components/ThumbnailStrip.svelte` with no changes. The import path `'../_lib/store'` already resolves correctly.

- [ ] **Step 3: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/_components/BatchImageList.svelte src/routes/products/(utilities)/background-remover/_components/ThumbnailStrip.svelte
git commit -m "feat(products): add BatchImageList and ThumbnailStrip for background-remover"
```

---

## Task 8: Create Main Page

**Files:**
- Create: `src/routes/products/(utilities)/background-remover/+page.ts`
- Create: `src/routes/products/(utilities)/background-remover/+page.svelte`

- [ ] **Step 1: Write +page.ts**

```typescript
export const prerender = true;
```

- [ ] **Step 2: Write +page.svelte**

```svelte
<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy, onMount } from 'svelte';
	// IMPORTED MODULES
	import { beforeNavigate, goto } from '$app/navigation';
	import {
		activeImage,
		addImages,
		clearAll,
		destroyWorker,
		fetchStats,
		hasImages,
		hasUnprocessedImages,
		isBatchMode,
		processingState,
		totalProcessed,
	} from './_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { AlertTriangle, BookOpen, Globe, LogOut, Shield, Zap } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import UploadZone from '$lib/components/ui/UploadZone.svelte';
	import BatchImageList from './_components/BatchImageList.svelte';
	import CompareSlider from './_components/CompareSlider.svelte';
	import RemoverControls from './_components/RemoverControls.svelte';
	import RemoverInfoPanel from './_components/RemoverInfoPanel.svelte';
	import ThumbnailStrip from './_components/ThumbnailStrip.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- STATES -- //

	let leaveDialogOpen = false;
	let pendingLeaveUrl = '';
	let browserWarnings: string[] = [];

	// -- FUNCTIONS -- //

	async function handleFiles(e: CustomEvent<FileList | File[]>) {
		await addImages(e.detail);
	}

	function handlePaste(e: ClipboardEvent) {
		const items = e.clipboardData?.items;
		if (!items) return;

		const imageFiles: File[] = [];
		for (const item of items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (file) imageFiles.push(file);
			}
		}

		if (imageFiles.length > 0) {
			e.preventDefault();
			addImages(imageFiles);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && $hasImages) {
			clearAll();
		}
	}

	// -- LIFECYCLES -- //

	function handleBeforeUnload(e: BeforeUnloadEvent) {
		if ($hasUnprocessedImages) {
			e.preventDefault();
		}
	}

	beforeNavigate(({ cancel, to }) => {
		if ($hasUnprocessedImages && !leaveDialogOpen) {
			cancel();
			pendingLeaveUrl = to?.url?.pathname ?? '/';
			leaveDialogOpen = true;
		}
	});

	function handleLeaveConfirm() {
		clearAll(true);
		goto(pendingLeaveUrl);
	}

	onMount(() => {
		document.addEventListener('paste', handlePaste);
		document.addEventListener('keydown', handleKeydown);
		window.addEventListener('beforeunload', handleBeforeUnload);
		fetchStats();

		const warnings: string[] = [];
		if (typeof createImageBitmap === 'undefined') warnings.push('Image decoding (createImageBitmap)');
		if (typeof OffscreenCanvas === 'undefined') warnings.push('Background processing (OffscreenCanvas)');
		if (typeof Worker === 'undefined') warnings.push('Web Workers');
		browserWarnings = warnings;
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('paste', handlePaste);
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		}
		clearAll(true);
		destroyWorker();
	});
</script>

<MetaTags
	title="Free Background Remover — Remove Image Backgrounds Online | Arbenger"
	description="Remove backgrounds from images instantly in your browser. Replace with transparent, solid color, gradient, or custom image. No uploads — 100% private and free."
	url="{SITE_URL}/products/background-remover/"
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Arbenger Background Remover',
		url: `${SITE_URL}/products/background-remover/`,
		applicationCategory: 'DesignApplication',
		operatingSystem: 'Any',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description: 'Free browser-based background remover with AI-powered segmentation, background replacement, and batch processing. No uploads — 100% private.',
	}}
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products/` },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Background Remover',
				item: `${SITE_URL}/products/background-remover/`,
			},
		],
	}}
/>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-20 pb-8 sm:px-6 lg:px-8">
	<!-- TOP BAR -->
	<div class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
		<nav class="text-xs text-[#94A3B8] dark:text-slate-500">
			<a href="/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Home</a>
			<span class="mx-1">/</span>
			<a href="/products/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Products</a>
			<span class="mx-1">/</span>
			<span class="text-[#0F172A] dark:text-white">Background Remover</span>
		</nav>

		<div class="flex items-center gap-3">
			<span class="flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
				<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
				100% local — images never leave your browser
			</span>
		</div>
	</div>

	<!-- BROWSER COMPATIBILITY WARNING -->
	{#if browserWarnings.length > 0}
		<div class="mb-4 flex items-start gap-2.5 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 px-4 py-3">
			<AlertTriangle size={16} class="mt-0.5 shrink-0 text-[#F59E0B]" />
			<div class="text-xs text-[#92400E] dark:text-[#FDE68A]">
				<p class="font-medium">Your browser is missing features needed for full functionality:</p>
				<p class="mt-1">{browserWarnings.join(', ')}. Some features may not work. Try updating your browser or switching to Chrome/Edge.</p>
			</div>
		</div>
	{/if}

	<h1 class="sr-only">Free Online Background Remover — Remove & Replace Image Backgrounds</h1>

	{#if !$hasImages}
		<!-- UPLOAD ZONE -->
		<div class="flex flex-1 items-center justify-center py-6 lg:py-10">
			<UploadZone
				on:files={handleFiles}
				class="w-full max-w-2xl lg:min-h-[560px]"
				accept=".png,.jpg,.jpeg,.webp"
				formatHint="PNG, JPG, WebP"
			/>
		</div>
	{:else if !$isBatchMode}
		<!-- SINGLE IMAGE MODE -->
		<div class="flex flex-1 flex-col gap-4">
			<div class={cn($processingState !== 'idle' && 'pointer-events-none opacity-50')}>
				<ThumbnailStrip
					on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
					on:clearAll={() => clearAll()}
				/>
			</div>

			<div class="flex flex-1 gap-4">
				<!-- COMPARE SLIDER PREVIEW -->
				<div class="relative flex min-w-0 flex-1 flex-col">
					<CompareSlider />
				</div>

				<!-- DESKTOP SIDEBAR -->
				<div
					class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
				>
					<div class="flex flex-col gap-4 p-4">
						<RemoverControls />
						<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
						<RemoverInfoPanel />
					</div>
				</div>
			</div>

			<!-- MOBILE CONTROLS -->
			<div
				class="rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4">
					<RemoverControls />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<RemoverInfoPanel />
				</div>
			</div>
		</div>
	{:else}
		<!-- BATCH MODE -->
		<div class="flex gap-4 max-lg:flex-col">
			<div
				class={cn(
					'flex min-h-[420px] min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#1E1A5E]/20',
					$processingState !== 'idle' && 'pointer-events-none opacity-50'
				)}
			>
				<BatchImageList
					on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
					on:clearAll={() => clearAll()}
				/>
			</div>

			<div
				class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4 p-4">
					<RemoverControls batch />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<RemoverInfoPanel batch />
				</div>
			</div>
		</div>

		<!-- MOBILE BATCH CONTROLS -->
		<div
			class="mt-3 rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
		>
			<div class="flex flex-col gap-4">
				<RemoverControls batch />
				<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
				<RemoverInfoPanel batch />
			</div>
		</div>
	{/if}

	<!-- LIFETIME STATS -->
	{#if $totalProcessed !== null && $totalProcessed > 0}
		<div class="relative mt-4 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-10 text-center sm:p-14 dark:border-[#2A2578] dark:bg-[#0B0A23]">
			<div class="pointer-events-none absolute inset-0">
				<div class="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/[0.07] blur-[100px]" />
			</div>

			<div class="relative">
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">
					Backgrounds removed worldwide
				</p>

				<p class="mt-5 font-display text-7xl font-bold tabular-nums tracking-tight text-[#0F172A] sm:text-8xl dark:text-white">
					{$totalProcessed.toLocaleString()}
				</p>

				<p class="mt-3 font-display text-lg font-bold tracking-tight text-[#0F172A] sm:text-xl dark:text-white">
					and growing every day
				</p>

				<p class="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#64748B] dark:text-slate-400">
					Every single one processed right in the browser. No uploads, no servers, no compromises.
				</p>

				<div class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Shield size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						Zero images stored
					</span>
					<span class="hidden h-3.5 w-px bg-[#E2E8F0] sm:block dark:bg-[#2A2578]" />
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Zap size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						AI-powered segmentation
					</span>
					<span class="hidden h-3.5 w-px bg-[#E2E8F0] sm:block dark:bg-[#2A2578]" />
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Globe size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						Works everywhere, no account
					</span>
				</div>
			</div>
		</div>
	{/if}

	<!-- RELATED TOOLS -->
	<div class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#94A3B8] dark:text-slate-500">
		<span class="flex items-center gap-2">
			<span>Need to resize?</span>
			<a href="/products/image-resizer/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Image Resizer
			</a>
		</span>
		<span class="hidden sm:inline">·</span>
		<span class="flex items-center gap-2">
			<span>Need to compress?</span>
			<a href="/products/image-compressor/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Image Compressor
			</a>
		</span>
	</div>
</div>

<!-- LEAVE PAGE CONFIRMATION -->
<ConfirmDialog
	bind:open={leaveDialogOpen}
	title="Leave Background Remover?"
	message="You have images that haven't been processed yet. They'll be lost if you leave."
	confirmLabel="Leave"
	cancelLabel="Stay"
	variant="warning"
	icon={LogOut}
	on:confirm={handleLeaveConfirm}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/products/(utilities)/background-remover/+page.ts src/routes/products/(utilities)/background-remover/+page.svelte
git commit -m "feat(products): add background-remover page with three-state layout, SEO, and cross-links"
```

---

## Task 9: Update Cross-Tool Links on Existing Tools

**Files:**
- Modify: `src/routes/products/(utilities)/image-resizer/+page.svelte:362-368`
- Modify: `src/routes/products/(utilities)/image-compressor/+page.svelte:329-335`

- [ ] **Step 1: Update image-resizer cross-tool link**

In `src/routes/products/(utilities)/image-resizer/+page.svelte`, find the related tool section (around line 362):

```svelte
	<!-- RELATED TOOL -->
	<div class="mt-4 flex items-center justify-center gap-2 text-xs text-[#94A3B8] dark:text-slate-500">
		<span>Need to compress instead?</span>
		<a href="/products/image-compressor/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
			Try Image Compressor
		</a>
	</div>
```

Replace with:

```svelte
	<!-- RELATED TOOLS -->
	<div class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#94A3B8] dark:text-slate-500">
		<span class="flex items-center gap-2">
			<span>Need to compress?</span>
			<a href="/products/image-compressor/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Image Compressor
			</a>
		</span>
		<span class="hidden sm:inline">·</span>
		<span class="flex items-center gap-2">
			<span>Remove backgrounds?</span>
			<a href="/products/background-remover/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Background Remover
			</a>
		</span>
	</div>
```

- [ ] **Step 2: Update image-compressor cross-tool link**

In `src/routes/products/(utilities)/image-compressor/+page.svelte`, find the related tool section (around line 330):

```svelte
	<!-- RELATED TOOL -->
	<div class="mt-4 flex items-center justify-center gap-2 text-xs text-[#94A3B8] dark:text-slate-500">
		<span>Need to resize instead?</span>
		<a href="/products/image-resizer/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
			Try Image Resizer
		</a>
	</div>
```

Replace with:

```svelte
	<!-- RELATED TOOLS -->
	<div class="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#94A3B8] dark:text-slate-500">
		<span class="flex items-center gap-2">
			<span>Need to resize?</span>
			<a href="/products/image-resizer/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Image Resizer
			</a>
		</span>
		<span class="hidden sm:inline">·</span>
		<span class="flex items-center gap-2">
			<span>Remove backgrounds?</span>
			<a href="/products/background-remover/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
				Try Background Remover
			</a>
		</span>
	</div>
```

- [ ] **Step 3: Commit**

```bash
git add src/routes/products/(utilities)/image-resizer/+page.svelte src/routes/products/(utilities)/image-compressor/+page.svelte
git commit -m "feat(products): add background-remover cross-links to resizer and compressor"
```

---

## Task 10: Build Check and Manual Smoke Test

- [ ] **Step 1: Run the build**

```bash
yarn build
```

Expected: Build completes without errors. If there are TypeScript errors related to `@huggingface/transformers` types in the worker, add a `// @ts-ignore` on the problematic line or adjust the type. Common issue: the `pipeline` return type may need `as any`.

If the build fails due to Vite trying to bundle `@huggingface/transformers` during SSR, add to `vite.config.ts`:

```typescript
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	ssr: {
		noExternal: [],
		external: ['@huggingface/transformers']
	}
});
```

- [ ] **Step 2: Start dev server and test**

```bash
yarn dev --port 8000
```

Open `http://localhost:8000/products/background-remover/` in Chrome/Edge.

**Test checklist:**
1. Upload zone appears, accepts drag-drop and paste
2. Loading an image shows preview in CompareSlider
3. Clicking "Remove Background" starts model download (first time), shows progress
4. After model loads, inference runs, result appears in slider
5. Changing background type (transparent → color → gradient → image) re-composites immediately
6. Color picker works for solid color and gradient start/end
7. Gradient direction buttons change the gradient direction
8. Background image upload works and scales to cover
9. Format dropdown shows for non-transparent backgrounds
10. Quality slider shows for JPEG/WebP formats
11. Download produces correct file
12. Loading 2+ images enters batch mode
13. "Remove All Backgrounds" processes all images
14. Download ZIP dialog works
15. Cross-tool links work on resizer, compressor, and this tool
16. Browser back/forward with unsaved images shows confirmation dialog

- [ ] **Step 3: Commit any fixes from testing**

```bash
git add -A
git commit -m "fix(products): address issues found during background-remover smoke test"
```

Only create this commit if there were fixes needed. Skip if everything passed.
