// COMPRESSION WORKER — RUNS IN WEB WORKER CONTEXT

import UPNG from 'upng-js';

interface CompressRequest {
	type: 'compress';
	id: string;
	bitmap: ImageBitmap;
	format: string;
	quality: number;
}

interface CompressPngRequest {
	type: 'compress-png';
	id: string;
	bitmap: ImageBitmap;
	cnum: number;
}

interface TargetSizeRequest {
	type: 'target-size';
	id: string;
	bitmap: ImageBitmap;
	format: string;
	targetBytes: number;
}

interface TargetSizePngRequest {
	type: 'target-size-png';
	id: string;
	bitmap: ImageBitmap;
	targetBytes: number;
}

function bitmapToRgba(bitmap: ImageBitmap): ArrayBuffer {
	const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(bitmap, 0, 0);
	return ctx.getImageData(0, 0, bitmap.width, bitmap.height).data.buffer;
}

function compressPng(bitmap: ImageBitmap, cnum: number): Blob {
	const rgba = bitmapToRgba(bitmap);
	const pngBuffer = UPNG.encode([rgba], bitmap.width, bitmap.height, cnum);
	return new Blob([pngBuffer], { type: 'image/png' });
}

function compressBitmap(bitmap: ImageBitmap, format: string, quality: number): Promise<Blob> {
	const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	const ctx = canvas.getContext('2d')!;
	ctx.drawImage(bitmap, 0, 0);
	return canvas.convertToBlob({ type: format, quality });
}

self.onmessage = async (e: MessageEvent) => {
	const data = e.data;

	if (data.type === 'compress') {
		const req = data as CompressRequest;
		try {
			const { width, height } = req.bitmap;
			const blob = await compressBitmap(req.bitmap, req.format, req.quality);
			req.bitmap.close();
			self.postMessage({ type: 'result', id: req.id, blob, width, height, size: blob.size });
		} catch (err) {
			req.bitmap.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'Compression failed' });
		}
	} else if (data.type === 'compress-png') {
		const req = data as CompressPngRequest;
		try {
			const blob = compressPng(req.bitmap, req.cnum);
			req.bitmap.close();
			self.postMessage({ type: 'result', id: req.id, blob, width: 0, height: 0, size: blob.size });
		} catch (err) {
			req.bitmap.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'PNG compression failed' });
		}
	} else if (data.type === 'target-size') {
		const req = data as TargetSizeRequest;
		try {
			let lo = 0.01;
			let hi = 1.0;
			let bestBlob: Blob | null = null;
			let bestQuality = hi;

			for (let i = 0; i < 8; i++) {
				const mid = (lo + hi) / 2;
				const canvas = new OffscreenCanvas(req.bitmap.width, req.bitmap.height);
				const ctx = canvas.getContext('2d')!;
				ctx.drawImage(req.bitmap, 0, 0);
				const blob = await canvas.convertToBlob({ type: req.format, quality: mid });

				if (blob.size <= req.targetBytes) {
					bestBlob = blob;
					bestQuality = mid;
					lo = mid;
				} else {
					hi = mid;
				}
			}

			if (!bestBlob) {
				const canvas = new OffscreenCanvas(req.bitmap.width, req.bitmap.height);
				const ctx = canvas.getContext('2d')!;
				ctx.drawImage(req.bitmap, 0, 0);
				bestBlob = await canvas.convertToBlob({ type: req.format, quality: 0.01 });
				bestQuality = 0.01;
			}

			req.bitmap.close();
			self.postMessage({ type: 'target-result', id: req.id, blob: bestBlob, quality: Math.round(bestQuality * 100), size: bestBlob.size });
		} catch (err) {
			req.bitmap.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'Target size compression failed' });
		}
	} else if (data.type === 'target-size-png') {
		const req = data as TargetSizePngRequest;
		try {
			const lossless = compressPng(req.bitmap, 0);
			if (lossless.size <= req.targetBytes) {
				req.bitmap.close();
				self.postMessage({ type: 'target-result', id: req.id, blob: lossless, quality: 100, size: lossless.size });
				return;
			}

			let lo = 2;
			let hi = 256;
			let bestBlob: Blob | null = null;
			let bestCnum = hi;

			for (let i = 0; i < 8; i++) {
				const mid = Math.round((lo + hi) / 2);
				const blob = compressPng(req.bitmap, mid);

				if (blob.size <= req.targetBytes) {
					bestBlob = blob;
					bestCnum = mid;
					lo = mid;
				} else {
					hi = mid;
				}
				if (hi - lo <= 1) break;
			}

			if (!bestBlob) {
				bestBlob = compressPng(req.bitmap, 2);
				bestCnum = 2;
			}

			req.bitmap.close();
			self.postMessage({ type: 'target-result', id: req.id, blob: bestBlob, quality: Math.round(bestCnum * 100 / 256), size: bestBlob.size });
		} catch (err) {
			req.bitmap.close();
			self.postMessage({ type: 'error', id: req.id, message: err instanceof Error ? err.message : 'PNG target size compression failed' });
		}
	}
};
