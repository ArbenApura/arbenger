import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';

// -- TYPES -- //

export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';
export type ResizeAlgorithm = 'smooth' | 'pixelated';
export type FitMode = 'stretch' | 'contain' | 'cover';

export interface CropData {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface ImageEntry {
	id: string;
	file: File;
	originalWidth: number;
	originalHeight: number;
	originalSize: number;
	thumbnailUrl: string;
	bitmap: ImageBitmap | null;
}

export interface ResizeSettings {
	width: number;
	height: number;
	lockAspect: boolean;
	fitMode: FitMode;
	format: ImageFormat;
	quality: number;
	algorithm: ResizeAlgorithm;
	bgColor: string;
	bgTransparent: boolean;
	filename: string;
}

export interface ResizeResult {
	blob: Blob;
	width: number;
	height: number;
	size: number;
	url: string;
}

export type ProcessingState = 'idle' | 'loading' | 'resizing' | 'downloading' | 'exporting';

export type NamingPattern = 'sequential' | 'prefix-original' | 'original-suffix' | 'number-only' | 'template';

export interface BatchResizeSettings {
	width: number;
	height: number;
	lockAspect: boolean;
	fitMode: FitMode;
	format: ImageFormat;
	quality: number;
	algorithm: ResizeAlgorithm;
	bgColor: string;
	bgTransparent: boolean;
}

// -- CONSTANTS -- //

export const FORMAT_OPTIONS: { value: ImageFormat; label: string }[] = [
	{ value: 'image/png', label: 'PNG' },
	{ value: 'image/jpeg', label: 'JPEG' },
	{ value: 'image/webp', label: 'WebP' }
];

export const SCALE_OPTIONS = [25, 50, 75, 100, 125, 150, 200, 300];

export interface PresetGroup {
	label: string;
	presets: { label: string; width: number; height: number }[];
}

export const PRESET_GROUPS: PresetGroup[] = [
	{
		label: 'Social Media',
		presets: [
			{ label: 'Instagram', width: 1080, height: 1080 },
			{ label: 'Twitter / X', width: 1600, height: 900 },
			{ label: 'YouTube', width: 1280, height: 720 },
			{ label: 'LinkedIn', width: 1200, height: 627 },
			{ label: 'Facebook', width: 1200, height: 630 }
		]
	},
	{
		label: 'Screens',
		presets: [
			{ label: 'HD', width: 1280, height: 720 },
			{ label: 'Full HD', width: 1920, height: 1080 },
			{ label: '4K', width: 3840, height: 2160 }
		]
	},
	{
		label: 'App Icons',
		presets: [
			{ label: '16×16', width: 16, height: 16 },
			{ label: '32×32', width: 32, height: 32 },
			{ label: '64×64', width: 64, height: 64 },
			{ label: '128×128', width: 128, height: 128 },
			{ label: '256×256', width: 256, height: 256 },
			{ label: '512×512', width: 512, height: 512 }
		]
	}
];

// -- PER-IMAGE STATE -- //

const imageSettingsMap = new Map<string, ResizeSettings>();
const imageCropMap = new Map<string, CropData | null>();
const imageResultMap = new Map<string, ResizeResult>();
const resultCount = writable(0);

function defaultSettings(img: ImageEntry): ResizeSettings {
	const baseName = img.file.name.replace(/\.[^.]+$/, '');
	return {
		width: img.originalWidth,
		height: img.originalHeight,
		lockAspect: true,
		fitMode: 'stretch',
		format: 'image/png',
		quality: 92,
		algorithm: 'smooth',
		bgColor: '#ffffff',
		bgTransparent: true,
		filename: `${baseName}-${img.originalWidth}x${img.originalHeight}`
	};
}

function getSettingsForImage(id: string): ResizeSettings | null {
	return imageSettingsMap.get(id) ?? null;
}

function getResultForImage(id: string): ResizeResult | null {
	return imageResultMap.get(id) ?? null;
}

// -- STORES -- //

export const images = writable<ImageEntry[]>([]);
export const activeImageId = writable<string | null>(null);
export const settings = writable<ResizeSettings>({
	width: 0,
	height: 0,
	lockAspect: true,
	fitMode: 'stretch',
	format: 'image/png',
	quality: 92,
	algorithm: 'smooth',
	bgColor: '#ffffff',
	bgTransparent: true,
	filename: ''
});
export const result = writable<ResizeResult | null>(null);
export const processingState = writable<ProcessingState>('idle');
export const batchProgress = writable<{ current: number; total: number } | null>(null);
export const batchExported = writable(false);
export const filenameRevision = writable(0);
export const cropRevision = writable(0);

export const activeImage = derived([images, activeImageId], ([$images, $activeImageId]) => {
	return $images.find((img) => img.id === $activeImageId) ?? null;
});

export const hasImages = derived(images, ($images) => $images.length > 0);
export const hasUnprocessedImages = derived(
	[images, resultCount, batchExported],
	([$images, , $batchExported]) => $images.length > 0 && !$batchExported && $images.some((img) => !imageResultMap.has(img.id))
);
export const imageCount = derived(images, ($images) => $images.length);
export const isBatchMode = derived(images, ($images) => $images.length > 1);

export const batchSettings = writable<BatchResizeSettings>({
	width: 1280,
	height: 720,
	lockAspect: true,
	fitMode: 'stretch',
	format: 'image/png',
	quality: 92,
	algorithm: 'smooth',
	bgColor: '#ffffff',
	bgTransparent: true
});

// -- WORKER -- //

let worker: Worker | null = null;
let useOffscreen = true;

function getWorker(): Worker | null {
	if (!browser) return null;

	if (typeof OffscreenCanvas === 'undefined') {
		useOffscreen = false;
		return null;
	}

	if (!worker) {
		worker = new Worker(new URL('./worker.ts', import.meta.url), {
			type: 'module'
		});
	}
	return worker;
}

function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getExtension(format: ImageFormat): string {
	const map: Record<ImageFormat, string> = {
		'image/png': '.png',
		'image/jpeg': '.jpg',
		'image/webp': '.webp'
	};
	return map[format];
}

// -- FUNCTIONS -- //

function minDelay<T>(promise: Promise<T>, ms: number = 1000): Promise<T> {
	return Promise.all([promise, new Promise((r) => setTimeout(r, ms))]).then(([result]) => result);
}

async function fileToBitmap(file: File): Promise<ImageBitmap> {
	if (file.type !== 'image/svg+xml') {
		return createImageBitmap(file);
	}

	const url = URL.createObjectURL(file);
	try {
		const img = new Image();
		img.src = url;
		await new Promise<void>((resolve, reject) => {
			img.onload = () => resolve();
			img.onerror = () => reject(new Error('Failed to load SVG'));
		});

		const w = img.naturalWidth || 300;
		const h = img.naturalHeight || 150;
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(img, 0, 0, w, h);
		return createImageBitmap(canvas);
	} finally {
		URL.revokeObjectURL(url);
	}
}

export async function addImages(files: FileList | File[]): Promise<void> {
	batchExported.set(false);
	const fileArray = Array.from(files);
	const validTypes = [
		'image/png',
		'image/jpeg',
		'image/webp',
		'image/gif',
		'image/bmp',
		'image/svg+xml'
	];

	const results: { valid: ImageEntry[]; rejected: number; largeCount: number } = {
		valid: [],
		rejected: 0,
		largeCount: 0
	};

	for (const file of fileArray) {
		if (!validTypes.includes(file.type)) {
			results.rejected++;
			continue;
		}

		if (file.size > 50 * 1024 * 1024) {
			results.largeCount++;
		}

		try {
			const id = generateId();
			const bitmap = await fileToBitmap(file);
			const thumbnailUrl = URL.createObjectURL(file);

			const entry: ImageEntry = {
				id,
				file,
				originalWidth: bitmap.width,
				originalHeight: bitmap.height,
				originalSize: file.size,
				thumbnailUrl,
				bitmap
			};

			results.valid.push(entry);
			imageSettingsMap.set(id, defaultSettings(entry));
		} catch {
			results.rejected++;
		}
	}

	if (results.rejected > 0) {
		toast.warning(`${results.rejected} unsupported file${results.rejected > 1 ? 's' : ''} skipped`);
	}

	if (results.largeCount > 0) {
		toast.info('Large file detected — processing may be slow');
	}

	if (results.valid.length > 0) {
		images.update((list) => [...list, ...results.valid]);

		const currentActive = get(activeImageId);
		if (!currentActive) {
			const first = results.valid[0];
			activateImage(first.id);
		}

		const count = results.valid.length;
		toast.success(`${count} image${count > 1 ? 's' : ''} loaded`);
	} else if (results.rejected === 0) {
		toast.error('No images found');
	}
}

function saveCurrentSettings(): void {
	const id = get(activeImageId);
	if (!id) return;
	imageSettingsMap.set(id, { ...get(settings) });
}

function activateImage(id: string): void {
	saveCurrentSettings();

	activeImageId.set(id);

	const savedSettings = getSettingsForImage(id);
	const img = get(images).find((i) => i.id === id);

	if (savedSettings) {
		settings.set({ ...savedSettings });
	} else if (img) {
		const s = defaultSettings(img);
		imageSettingsMap.set(id, s);
		settings.set(s);
	}

	const savedResult = getResultForImage(id);
	result.set(savedResult ?? null);
}

export function selectImage(id: string): void {
	if (id === get(activeImageId)) return;
	activateImage(id);
}

export function removeImage(id: string): void {
	const list = get(images);
	const entry = list.find((i) => i.id === id);
	if (entry) {
		URL.revokeObjectURL(entry.thumbnailUrl);
		entry.bitmap?.close();
		toast.info('Image removed');
	}

	const r = imageResultMap.get(id);
	if (r) {
		URL.revokeObjectURL(r.url);
		imageResultMap.delete(id);
		resultCount.update((n) => n + 1);
	}
	imageSettingsMap.delete(id);
	imageCropMap.delete(id);

	const newList = list.filter((i) => i.id !== id);
	images.set(newList);

	if (get(activeImageId) === id) {
		if (newList.length > 0) {
			activateImage(newList[0].id);
		} else {
			activeImageId.set(null);
			result.set(null);
		}
	}
}

export function clearAll(silent = false): void {
	const list = get(images);
	const count = list.length;
	for (const entry of list) {
		URL.revokeObjectURL(entry.thumbnailUrl);
		entry.bitmap?.close();
	}
	for (const r of imageResultMap.values()) {
		URL.revokeObjectURL(r.url);
	}
	imageSettingsMap.clear();
	imageResultMap.clear();
	resultCount.update((n) => n + 1);
	imageCropMap.clear();
	images.set([]);
	activeImageId.set(null);
	result.set(null);
	processingState.set('idle');
	batchExported.set(false);
	if (count > 0 && !silent) {
		toast.success('All images cleared');
	}
}

// -- BATCH FUNCTIONS -- //

export function reorderImages(fromIndex: number, toIndex: number): void {
	images.update((list) => {
		const item = list[fromIndex];
		if (!item) return list;
		const newList = [...list];
		newList.splice(fromIndex, 1);
		newList.splice(toIndex, 0, item);
		return newList;
	});
}

export function updateImageFilename(id: string, filename: string): void {
	const s = imageSettingsMap.get(id);
	if (s) {
		s.filename = filename;
		imageSettingsMap.set(id, { ...s });
	}
	if (get(activeImageId) === id) {
		settings.update((current) => ({ ...current, filename }));
	}
	filenameRevision.update((n) => n + 1);
}

export function applyBatchNaming(
	pattern: NamingPattern,
	prefix: string = 'image',
	template: string = '{name}_{n}'
): void {
	const list = get(images);
	const bs = get(batchSettings);
	const ext = getExtension(bs.format);

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
					.replace(/\{n\}/g, String(n))
					.replace(/\{w\}/g, String(bs.width))
					.replace(/\{h\}/g, String(bs.height));
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

export function getImageFilename(id: string): string {
	return imageSettingsMap.get(id)?.filename ?? '';
}

export function setImageCrop(id: string, crop: CropData | null): void {
	imageCropMap.set(id, crop);
	cropRevision.update((n) => n + 1);

	const prevResult = imageResultMap.get(id);
	if (prevResult) {
		URL.revokeObjectURL(prevResult.url);
		imageResultMap.delete(id);
		resultCount.update((n) => n + 1);
		if (get(activeImageId) === id) {
			result.set(null);
		}
	}

	if (crop) {
		toast.success('Crop applied');
	} else {
		toast.info('Crop removed');
	}
}

export function getImageCrop(id: string): CropData | null {
	return imageCropMap.get(id) ?? null;
}

export function hasImageCrop(id: string): boolean {
	const crop = imageCropMap.get(id);
	return crop !== null && crop !== undefined;
}

export function updateWidth(w: number): void {
	settings.update((s) => {
		const newS = { ...s, width: w };
		if (s.lockAspect) {
			const img = get(activeImage);
			if (img) {
				newS.height = Math.round(w / (img.originalWidth / img.originalHeight));
			}
		}
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

export function updateHeight(h: number): void {
	settings.update((s) => {
		const newS = { ...s, height: h };
		if (s.lockAspect) {
			const img = get(activeImage);
			if (img) {
				newS.width = Math.round(h * (img.originalWidth / img.originalHeight));
			}
		}
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

export function swapDimensions(): void {
	settings.update((s) => {
		const newS = { ...s, width: s.height, height: s.width };
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

export function applyScale(percent: number): void {
	const img = get(activeImage);
	if (!img) return;
	settings.update((s) => {
		const newS = {
			...s,
			width: Math.round(img.originalWidth * (percent / 100)),
			height: Math.round(img.originalHeight * (percent / 100))
		};
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

export function applyPreset(width: number, height: number): void {
	settings.update((s) => {
		const newS = { ...s, width, height, lockAspect: false };
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

export function applyFitMax(maxDim: number): void {
	const img = get(activeImage);
	if (!img) return;
	const ratio = img.originalWidth / img.originalHeight;
	let w: number, h: number;
	if (img.originalWidth >= img.originalHeight) {
		w = maxDim;
		h = Math.round(maxDim / ratio);
	} else {
		h = maxDim;
		w = Math.round(maxDim * ratio);
	}
	settings.update((s) => {
		const newS = { ...s, width: w, height: h };
		newS.filename = updateFilename(newS);
		return newS;
	});
	saveCurrentSettings();
}

function updateFilename(s: ResizeSettings): string {
	const img = get(activeImage);
	if (!img) return s.filename;
	const baseName = img.file.name.replace(/\.[^.]+$/, '');
	return `${baseName}-${s.width}x${s.height}`;
}

export async function performResize(): Promise<void> {
	const img = get(activeImage);
	const s = get(settings);
	if (!img) return;

	saveCurrentSettings();

	processingState.set('resizing');

	const crop = getImageCrop(img.id);
	const resizePromise = minDelay(doResize(img, s, crop)).finally(() => {
		processingState.set('idle');
	});

	toast.promise(resizePromise, {
		loading: `Resizing to ${s.width}×${s.height}...`,
		success: () => {
			const r = get(result);
			return `Done — ${s.width}×${s.height}${r ? ` · ${formatBytes(r.size)}` : ''}`;
		},
		error: 'Resize failed'
	});

	return resizePromise;
}

async function doResize(img: ImageEntry, s: ResizeSettings, crop: CropData | null = null): Promise<void> {
	const prevResult = imageResultMap.get(img.id);
	if (prevResult) {
		URL.revokeObjectURL(prevResult.url);
		imageResultMap.delete(img.id);
		resultCount.update((n) => n + 1);
		result.set(null);
	}

	const bitmap = await fileToBitmap(img.file);

	const bgColor =
		s.format === 'image/jpeg' ? s.bgColor : s.bgTransparent ? null : s.bgColor;

	const w = getWorker();

	if (w && useOffscreen) {
		return new Promise((resolve, reject) => {
			const requestId = generateId();

			const handler = (e: MessageEvent) => {
				if (e.data.id !== requestId) return;
				w.removeEventListener('message', handler);

				if (e.data.type === 'result') {
					const url = URL.createObjectURL(e.data.blob);
					const r: ResizeResult = {
						blob: e.data.blob,
						width: e.data.width,
						height: e.data.height,
						size: e.data.size,
						url
					};
					imageResultMap.set(img.id, r);
					resultCount.update((n) => n + 1);
					if (get(activeImageId) === img.id) {
						result.set(r);
					}
					resolve();
				} else if (e.data.type === 'error') {
					reject(new Error(e.data.message));
				}
			};

			w.addEventListener('message', handler);
			w.postMessage(
				{
					type: 'resize',
					id: requestId,
					bitmap,
					width: s.width,
					height: s.height,
					format: s.format,
					quality: s.quality / 100,
					smoothing: s.algorithm === 'smooth',
					smoothingQuality: 'high',
					bgColor,
					fitMode: s.fitMode,
					crop
				},
				[bitmap]
			);
		});
	}

	let srcBitmap = bitmap;
	if (crop) {
		const cropCanvas = document.createElement('canvas');
		cropCanvas.width = crop.width;
		cropCanvas.height = crop.height;
		const cropCtx = cropCanvas.getContext('2d')!;
		cropCtx.drawImage(bitmap, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
		bitmap.close();
		srcBitmap = await createImageBitmap(cropCanvas);
	}

	const canvas = document.createElement('canvas');
	canvas.width = s.width;
	canvas.height = s.height;
	const ctx = canvas.getContext('2d')!;

	if (bgColor) {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, s.width, s.height);
	}

	ctx.imageSmoothingEnabled = s.algorithm === 'smooth';
	if (s.algorithm === 'smooth') {
		ctx.imageSmoothingQuality = 'high';
	}

	const srcRatio = srcBitmap.width / srcBitmap.height;
	const dstRatio = s.width / s.height;

	if (s.fitMode === 'cover' && Math.abs(srcRatio - dstRatio) > 0.01) {
		let sx = 0, sy = 0, sw = srcBitmap.width, sh = srcBitmap.height;
		if (srcRatio > dstRatio) {
			sw = srcBitmap.height * dstRatio;
			sx = (srcBitmap.width - sw) / 2;
		} else {
			sh = srcBitmap.width / dstRatio;
			sy = (srcBitmap.height - sh) / 2;
		}
		ctx.drawImage(srcBitmap, sx, sy, sw, sh, 0, 0, s.width, s.height);
	} else if (s.fitMode === 'contain' && Math.abs(srcRatio - dstRatio) > 0.01) {
		let drawX = 0, drawY = 0, drawW = s.width, drawH = s.height;
		if (srcRatio > dstRatio) {
			drawH = s.width / srcRatio;
			drawY = (s.height - drawH) / 2;
		} else {
			drawW = s.height * srcRatio;
			drawX = (s.width - drawW) / 2;
		}
		ctx.drawImage(srcBitmap, drawX, drawY, drawW, drawH);
	} else {
		ctx.drawImage(srcBitmap, 0, 0, s.width, s.height);
	}
	srcBitmap.close();

	const mimeType = s.format;
	const qualityArg = s.format === 'image/png' ? undefined : s.quality / 100;

	return new Promise((resolve) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					const r: ResizeResult = { blob, width: s.width, height: s.height, size: blob.size, url };
					imageResultMap.set(img.id, r);
					resultCount.update((n) => n + 1);
					if (get(activeImageId) === img.id) {
						result.set(r);
					}
				}
				resolve();
			},
			mimeType,
			qualityArg
		);
	});
}

export async function downloadResult(): Promise<void> {
	const r = get(result);
	const s = get(settings);
	if (!r) return;

	processingState.set('downloading');

	const ext = getExtension(s.format);
	const name = s.filename || 'resized';
	const a = document.createElement('a');
	a.href = r.url;
	a.download = `${name}${ext}`;
	a.click();

	await new Promise((resolve) => setTimeout(resolve, 1000));
	processingState.set('idle');
	toast.success(`Downloaded · ${formatBytes(r.size)}`);
}

export async function downloadAllAsZip(): Promise<void> {
	const list = get(images);
	if (list.length < 2) return;

	processingState.set('exporting');

	const zipPromise = minDelay(doBatchZip(list)).finally(() => {
		processingState.set('idle');
		batchProgress.set(null);
	});

	toast.promise(zipPromise, {
		loading: `Processing ${list.length} images...`,
		success: 'ZIP downloaded',
		error: 'Export failed'
	});

	return zipPromise;
}

async function doBatchZip(list: ImageEntry[]): Promise<void> {
	batchProgress.set({ current: 0, total: list.length });

	const { default: JSZip } = await import('jszip');
	const zip = new JSZip();
	const bs = get(batchSettings);

	for (let i = 0; i < list.length; i++) {
		batchProgress.set({ current: i + 1, total: list.length });
		const img = list[i];
		const perImageSettings = imageSettingsMap.get(img.id);
		const filename = perImageSettings?.filename ?? img.file.name.replace(/\.[^.]+$/, '');

		const resizeS: ResizeSettings = {
			...bs,
			filename
		};

		const bitmap = await fileToBitmap(img.file);

		const bgColor =
			bs.format === 'image/jpeg' ? bs.bgColor : bs.bgTransparent ? null : bs.bgColor;

		const imgCrop = getImageCrop(img.id);
		const blob = await resizeToBlob(bitmap, resizeS, bgColor, imgCrop);
		const ext = getExtension(bs.format);
		zip.file(`${filename}${ext}`, blob);
	}

	const zipBlob = await zip.generateAsync({ type: 'blob' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(zipBlob);
	a.download = `resized-images-${Date.now()}.zip`;
	a.click();
	URL.revokeObjectURL(a.href);
	batchExported.set(true);
}

async function resizeToBlob(
	bitmap: ImageBitmap,
	s: ResizeSettings,
	bgColor: string | null,
	crop: CropData | null = null
): Promise<Blob> {
	const w = getWorker();
	if (w && useOffscreen) {
		return new Promise((resolve) => {
			const requestId = generateId();
			const handler = (e: MessageEvent) => {
				if (e.data.id !== requestId) return;
				w.removeEventListener('message', handler);
				resolve(e.data.blob);
			};
			w.addEventListener('message', handler);
			w.postMessage(
				{
					type: 'resize',
					id: requestId,
					bitmap,
					width: s.width,
					height: s.height,
					format: s.format,
					quality: s.quality / 100,
					smoothing: s.algorithm === 'smooth',
					smoothingQuality: 'high',
					bgColor,
					fitMode: s.fitMode,
					crop
				},
				[bitmap]
			);
		});
	}

	const canvas = document.createElement('canvas');
	canvas.width = s.width;
	canvas.height = s.height;
	const ctx = canvas.getContext('2d')!;
	if (bgColor) {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, s.width, s.height);
	}
	ctx.imageSmoothingEnabled = s.algorithm === 'smooth';
	ctx.drawImage(bitmap, 0, 0, s.width, s.height);
	bitmap.close();

	return new Promise((resolve) => {
		canvas.toBlob(
			(blob) => resolve(blob!),
			s.format,
			s.format === 'image/png' ? undefined : s.quality / 100
		);
	});
}

export function destroyWorker(): void {
	if (worker) {
		worker.terminate();
		worker = null;
	}
}

export function formatBytes(bytes: number): string {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatName(format: ImageFormat): string {
	const map: Record<ImageFormat, string> = {
		'image/png': 'PNG',
		'image/jpeg': 'JPEG',
		'image/webp': 'WebP'
	};
	return map[format];
}
