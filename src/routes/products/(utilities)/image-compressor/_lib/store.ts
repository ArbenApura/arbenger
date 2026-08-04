import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { toast } from 'svelte-sonner';

// -- TYPES -- //

export type ImageFormat = 'image/png' | 'image/jpeg' | 'image/webp';
export type QualityMode = 'quality' | 'target-size';
export type ProcessingState = 'idle' | 'loading' | 'compressing' | 'exporting';
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

export interface CompressSettings {
	qualityMode: QualityMode;
	quality: number;
	targetSize: number;
	targetUnit: 'KB' | 'MB';
	format: 'original' | ImageFormat;
	filename: string;
}

export interface CompressResult {
	blob: Blob;
	width: number;
	height: number;
	size: number;
	url: string;
	quality: number;
}

// -- CONSTANTS -- //

const ACCEPTED_TYPES = new Set([
	'image/png',
	'image/jpeg',
	'image/webp',
]);

// -- STORES -- //

export const images = writable<ImageEntry[]>([]);
export const activeImageId = writable<string | null>(null);
export const settings = writable<CompressSettings>({
	qualityMode: 'quality',
	quality: 80,
	targetSize: 200,
	targetUnit: 'KB',
	format: 'original',
	filename: ''
});
export const result = writable<CompressResult | null>(null);
export const processingState = writable<ProcessingState>('idle');
let cancelled = false;
export const batchProgress = writable<{ current: number; total: number } | null>(null);
export const batchExported = writable(false);
export const batchResultSize = writable<number | null>(null);
export const filenameRevision = writable(0);

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

const imageResultMap = new Map<string, CompressResult>();
const imageSettingsMap = new Map<string, CompressSettings>();


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
	return map[format] || '.bin';
}

export function getOutputFormat(entry: ImageEntry, s: CompressSettings): string {
	if (s.format === 'original') {
		const t = entry.file.type;
		if (ACCEPTED_TYPES.has(t)) return t;
		return 'image/webp';
	}
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

async function fileToBitmap(file: File): Promise<ImageBitmap> {
	return createImageBitmap(file);
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
			const bitmap = await fileToBitmap(file);
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
			imageSettingsMap.set(entry.id, { ...s, filename: `${baseName}-compressed` });
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
	images.set([]);
	activeImageId.set(null);
	result.set(null);
	batchProgress.set(null);
	batchExported.set(false);
	batchResultSize.set(null);

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
	prefix: string = 'image',
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

// -- COMPRESSION ENGINE -- //

function qualityToCnum(quality: number): number {
	if (quality >= 100) return 0;
	return Math.max(2, Math.round(quality * 256 / 100));
}

async function compressPng(bitmap: ImageBitmap, width: number, height: number, cnum: number): Promise<Blob> {
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(bitmap, 0, 0);
	const rgba = ctx.getImageData(0, 0, width, height).data.buffer;
	const UPNG = await import('upng-js');
	const pngBuffer = UPNG.encode([rgba], width, height, cnum);
	return new Blob([pngBuffer], { type: 'image/png' });
}

async function doCompress(img: ImageEntry, s: CompressSettings): Promise<CompressResult> {
	const bitmap = await fileToBitmap(img.file);
	const format = getOutputFormat(img, s);
	const quality = s.quality / 100;

	const w = getWorker();

	if (w) {
		return new Promise((resolve, reject) => {
			const requestId = generateId();

			const handler = (e: MessageEvent) => {
				if (e.data.id !== requestId) return;
				w.removeEventListener('message', handler);

				if (e.data.type === 'result') {
					const url = URL.createObjectURL(e.data.blob);
					resolve({
						blob: e.data.blob,
						width: img.originalWidth,
						height: img.originalHeight,
						size: e.data.size,
						url,
						quality: s.quality
					});
				} else if (e.data.type === 'error') {
					reject(new Error(e.data.message));
				}
			};

			w.addEventListener('message', handler);

			if (format === 'image/png') {
				const cnum = qualityToCnum(s.quality);
				w.postMessage({ type: 'compress-png', id: requestId, bitmap, cnum }, [bitmap]);
			} else {
				w.postMessage({ type: 'compress', id: requestId, bitmap, format, quality }, [bitmap]);
			}
		});
	}

	if (format === 'image/png') {
		const cnum = qualityToCnum(s.quality);
		const blob = await compressPng(bitmap, img.originalWidth, img.originalHeight, cnum);
		bitmap.close();
		const url = URL.createObjectURL(blob);
		return { blob, width: img.originalWidth, height: img.originalHeight, size: blob.size, url, quality: s.quality };
	}

	const canvas = document.createElement('canvas');
	canvas.width = img.originalWidth;
	canvas.height = img.originalHeight;
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(bitmap, 0, 0);
	bitmap.close();

	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (!blob) return reject(new Error('Compression failed'));
				const url = URL.createObjectURL(blob);
				resolve({
					blob,
					width: img.originalWidth,
					height: img.originalHeight,
					size: blob.size,
					url,
					quality: s.quality
				});
			},
			format,
			quality
		);
	});
}

async function doTargetSize(img: ImageEntry, s: CompressSettings): Promise<CompressResult> {
	const bitmap = await fileToBitmap(img.file);
	const format = getOutputFormat(img, s);
	const targetBytes = s.targetSize * (s.targetUnit === 'MB' ? 1024 * 1024 : 1024);

	const w = getWorker();

	if (w) {
		return new Promise((resolve, reject) => {
			const requestId = generateId();

			const handler = (e: MessageEvent) => {
				if (e.data.id !== requestId) return;
				w.removeEventListener('message', handler);

				if (e.data.type === 'target-result') {
					const url = URL.createObjectURL(e.data.blob);
					resolve({
						blob: e.data.blob,
						width: img.originalWidth,
						height: img.originalHeight,
						size: e.data.size,
						url,
						quality: e.data.quality
					});
				} else if (e.data.type === 'error') {
					reject(new Error(e.data.message));
				}
			};

			w.addEventListener('message', handler);

			if (format === 'image/png') {
				w.postMessage({ type: 'target-size-png', id: requestId, bitmap, targetBytes }, [bitmap]);
			} else {
				w.postMessage({ type: 'target-size', id: requestId, bitmap, format, targetBytes }, [bitmap]);
			}
		});
	}

	if (format === 'image/png') {
		const lossless = await compressPng(bitmap, img.originalWidth, img.originalHeight, 0);
		if (lossless.size <= targetBytes) {
			bitmap.close();
			const url = URL.createObjectURL(lossless);
			return { blob: lossless, width: img.originalWidth, height: img.originalHeight, size: lossless.size, url, quality: 100 };
		}

		let lo = 2;
		let hi = 256;
		let bestBlob: Blob | null = null;
		let bestCnum = hi;

		for (let i = 0; i < 8; i++) {
			const mid = Math.round((lo + hi) / 2);
			const blob = await compressPng(bitmap, img.originalWidth, img.originalHeight, mid);

			if (blob.size <= targetBytes) {
				bestBlob = blob;
				bestCnum = mid;
				lo = mid;
			} else {
				hi = mid;
			}
			if (hi - lo <= 1) break;
		}

		if (!bestBlob) {
			bestBlob = await compressPng(bitmap, img.originalWidth, img.originalHeight, 2);
			bestCnum = 2;
		}

		bitmap.close();
		const url = URL.createObjectURL(bestBlob);
		return { blob: bestBlob, width: img.originalWidth, height: img.originalHeight, size: bestBlob.size, url, quality: Math.round(bestCnum * 100 / 256) };
	}

	let lo = 0.01;
	let hi = 1.0;
	let bestBlob: Blob | null = null;
	let bestQuality = hi;

	for (let i = 0; i < 8; i++) {
		const mid = (lo + hi) / 2;
		const canvas = document.createElement('canvas');
		canvas.width = img.originalWidth;
		canvas.height = img.originalHeight;
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(bitmap, 0, 0);

		const blob = await new Promise<Blob | null>((resolve) => {
			canvas.toBlob((b) => resolve(b), format, mid);
		});

		if (blob && blob.size <= targetBytes) {
			bestBlob = blob;
			bestQuality = mid;
			lo = mid;
		} else {
			hi = mid;
		}
	}

	if (!bestBlob) {
		const canvas = document.createElement('canvas');
		canvas.width = img.originalWidth;
		canvas.height = img.originalHeight;
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(bitmap, 0, 0);
		bestBlob = await new Promise<Blob>((resolve) => {
			canvas.toBlob((b) => resolve(b!), format, 0.01);
		});
		bestQuality = 0.01;
	}

	bitmap.close();

	const url = URL.createObjectURL(bestBlob);
	return {
		blob: bestBlob,
		width: img.originalWidth,
		height: img.originalHeight,
		size: bestBlob.size,
		url,
		quality: Math.round(bestQuality * 100)
	};
}

export async function performCompress(): Promise<void> {
	const img = get(activeImage);
	const s = get(settings);
	if (!img) return;

	saveCurrentSettings();
	processingState.set('compressing');
	cancelled = false;

	const prevResult = imageResultMap.get(img.id);
	if (prevResult) {
		URL.revokeObjectURL(prevResult.url);
		imageResultMap.delete(img.id);
		result.set(null);
	}

	const compressPromise = minDelay(
		s.qualityMode === 'target-size' ? doTargetSize(img, s) : doCompress(img, s)
	).finally(() => {
		processingState.set('idle');
	});

	toast.promise(compressPromise, {
		loading: 'Compressing...',
		success: (r: CompressResult) => {
			const format = getOutputFormat(img, s);
			const sameFormat = format === img.file.type;

			if (r.size >= img.originalSize && sameFormat) {
				URL.revokeObjectURL(r.url);
				const url = URL.createObjectURL(img.file);
				r = { ...r, blob: img.file, size: img.originalSize, url };
			}

			imageResultMap.set(img.id, r);
			if (get(activeImageId) === img.id) result.set(r);

			if (s.qualityMode === 'target-size') {
				const targetBytes = s.targetSize * (s.targetUnit === 'MB' ? 1024 * 1024 : 1024);
				if (r.size > targetBytes) {
					setTimeout(() => {
						toast.warning(`Couldn't reach ${s.targetSize} ${s.targetUnit} — smallest possible is ${formatBytes(r.size)}. Try WebP or JPEG for better compression.`);
					}, 300);
				}
			}

			const reduction = Math.round((1 - r.size / img.originalSize) * 100);
			if (reduction <= 0 && sameFormat) {
				return `Already optimized — kept original (${formatBytes(img.originalSize)})`;
			}
			if (reduction < 0) {
				return `Compressed — ${formatBytes(r.size)} (${Math.abs(reduction)}% larger due to format change)`;
			}
			return `Compressed — ${formatBytes(r.size)} (${reduction}% smaller)`;
		},
		error: 'Compression failed'
	});

	return compressPromise.then(() => {});
}

export async function downloadResult(): Promise<void> {
	const r = get(result);
	const img = get(activeImage);
	if (!r || !img) return;

	const s = get(settings);
	const format = getOutputFormat(img, s);
	const ext = getExtension(format);
	const name = s.filename || 'compressed';

	const a = document.createElement('a');
	a.href = r.url;
	a.download = `${name}${ext}`;
	a.click();

	await new Promise((r) => setTimeout(r, 500));
	toast.success(`Downloaded · ${formatBytes(r.size)}`);
}

const batchBlobs = new Map<string, { blob: Blob; filename: string; ext: string }>();

export async function performBatchCompress(): Promise<void> {
	const list = get(images);
	if (list.length < 2) return;

	processingState.set('compressing');
	cancelled = false;
	batchResultSize.set(null);
	const s = get(settings);
	batchBlobs.clear();

	const compressPromise = minDelay((async () => {
		batchProgress.set({ current: 0, total: list.length });
		let totalSize = 0;

		for (let i = 0; i < list.length; i++) {
			if (cancelled) { toast.info('Cancelled'); return; }
			batchProgress.set({ current: i + 1, total: list.length });
			const img = list[i];
			const perImageSettings = imageSettingsMap.get(img.id);
			const format = getOutputFormat(img, s);
			const ext = getExtension(format);
			const filename = perImageSettings?.filename || img.file.name.replace(/\.[^.]+$/, '');

			let r: CompressResult;
			if (s.qualityMode === 'target-size') {
				r = await doTargetSize(img, s);
			} else {
				r = await doCompress(img, s);
			}

			const sameFormat = format === img.file.type;
			if (r.size >= img.originalSize && sameFormat) {
				URL.revokeObjectURL(r.url);
				batchBlobs.set(img.id, { blob: img.file, filename, ext });
				totalSize += img.originalSize;
			} else {
				batchBlobs.set(img.id, { blob: r.blob, filename, ext });
				totalSize += r.size;
				URL.revokeObjectURL(r.url);
			}
		}

		batchResultSize.set(totalSize);
	})()).finally(() => {
		processingState.set('idle');
		batchProgress.set(null);
	});

	toast.promise(compressPromise, {
		loading: `Compressing ${list.length} images...`,
		success: `${list.length} images compressed`,
		error: 'Compression failed'
	});

	return compressPromise;
}

export async function downloadBatchZip(zipName = 'compressed-images'): Promise<void> {
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
