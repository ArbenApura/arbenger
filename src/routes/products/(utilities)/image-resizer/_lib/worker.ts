type FitMode = 'stretch' | 'contain' | 'cover';

type CropData = {
	x: number;
	y: number;
	width: number;
	height: number;
} | null;

type ResizeRequest = {
	type: 'resize';
	id: string;
	bitmap: ImageBitmap;
	width: number;
	height: number;
	format: 'image/png' | 'image/jpeg' | 'image/webp';
	quality: number;
	smoothing: boolean;
	smoothingQuality: 'low' | 'medium' | 'high';
	bgColor: string | null;
	fitMode: FitMode;
	crop: CropData;
};

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

self.onmessage = async (e: MessageEvent<ResizeRequest>) => {
	const { type, id, bitmap, width, height, format, quality, smoothing, smoothingQuality, bgColor, fitMode, crop } =
		e.data;

	if (type !== 'resize') return;

	try {
		let src = bitmap;

		if (crop) {
			const cropCanvas = new OffscreenCanvas(crop.width, crop.height);
			const cropCtx = cropCanvas.getContext('2d')!;
			cropCtx.drawImage(bitmap, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
			bitmap.close();
			src = await createImageBitmap(cropCanvas);
		}

		const canvas = new OffscreenCanvas(width, height);
		const ctx = canvas.getContext('2d')!;

		if (bgColor) {
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, width, height);
		}

		ctx.imageSmoothingEnabled = smoothing;
		if (smoothing) {
			ctx.imageSmoothingQuality = smoothingQuality;
		}

		const srcRatio = src.width / src.height;
		const dstRatio = width / height;

		if (fitMode === 'cover' && Math.abs(srcRatio - dstRatio) > 0.01) {
			let sx = 0, sy = 0, sw = src.width, sh = src.height;
			if (srcRatio > dstRatio) {
				sw = src.height * dstRatio;
				sx = (src.width - sw) / 2;
			} else {
				sh = src.width / dstRatio;
				sy = (src.height - sh) / 2;
			}
			ctx.drawImage(src, sx, sy, sw, sh, 0, 0, width, height);
		} else if (fitMode === 'contain' && Math.abs(srcRatio - dstRatio) > 0.01) {
			let drawX = 0, drawY = 0, drawW = width, drawH = height;
			if (srcRatio > dstRatio) {
				drawH = width / srcRatio;
				drawY = (height - drawH) / 2;
			} else {
				drawW = height * srcRatio;
				drawX = (width - drawW) / 2;
			}
			ctx.drawImage(src, drawX, drawY, drawW, drawH);
		} else {
			ctx.drawImage(src, 0, 0, width, height);
		}

		src.close();

		const blob = await canvas.convertToBlob({ type: format, quality });

		const response: ResizeResult = {
			type: 'result',
			id,
			blob,
			width,
			height,
			size: blob.size
		};

		self.postMessage(response);
	} catch (err) {
		const response: ResizeError = {
			type: 'error',
			id,
			message: err instanceof Error ? err.message : 'Unknown resize error'
		};
		self.postMessage(response);
	}
};
