<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { activeImage, result, processingState, getImageCrop, cropRevision } from '../_lib/store';
	import { isDark } from '$lib/stores/theme';
	// IMPORTED DEP-COMPONENTS
	import { Loader2, ImageIcon } from 'lucide-svelte';

	// -- STATES -- //

	let croppedPreviewUrl: string | null = null;

	// -- REACTIVE STATES -- //

	$: checkerColor = $isDark ? '#1E1A5E' : '#E2E8F0';
	$: checkerBg = $isDark ? '#0B0A23' : '#F8FAFC';
	$: activeCrop = $activeImage && $cropRevision >= 0 ? getImageCrop($activeImage.id) : null;

	$: if ($activeImage && activeCrop) {
		generateCroppedPreview($activeImage.thumbnailUrl, activeCrop);
	} else {
		if (croppedPreviewUrl) {
			URL.revokeObjectURL(croppedPreviewUrl);
			croppedPreviewUrl = null;
		}
	}

	$: previewSrc = croppedPreviewUrl || ($activeImage?.thumbnailUrl ?? '');
	$: resultSrc = $result?.url ?? '';

	// -- FUNCTIONS -- //

	async function generateCroppedPreview(src: string, crop: { x: number; y: number; width: number; height: number }) {
		const img = new Image();
		img.src = src;
		await new Promise<void>((resolve) => {
			if (img.complete) resolve();
			else img.onload = () => resolve();
		});

		const canvas = document.createElement('canvas');
		canvas.width = crop.width;
		canvas.height = crop.height;
		const ctx = canvas.getContext('2d')!;
		ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

		canvas.toBlob((blob) => {
			if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
			if (blob) croppedPreviewUrl = URL.createObjectURL(blob);
		});
	}

	// -- LIFECYCLES -- //

	onDestroy(() => {
		if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
	});
</script>

<div class="flex flex-1 flex-col gap-2">
	{#if $activeImage}
		{#if $result}
			<!-- RESULT PREVIEW -->
			<div
				class={cn(
					'relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border p-3',
					'border-[#E2E8F0] dark:border-[#2A2578]',
					'min-h-[320px] lg:min-h-[460px]'
				)}
				style="background-color: {checkerBg}; background-image: linear-gradient(45deg, {checkerColor} 25%, transparent 25%), linear-gradient(-45deg, {checkerColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, {checkerColor} 75%), linear-gradient(-45deg, transparent 75%, {checkerColor} 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px;"
			>
				{#if $processingState === 'resizing'}
					<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
						<Loader2 size={28} class="animate-spin text-[#22D3EE]" />
						<span class="mt-2 text-xs font-medium text-white/80">Resizing...</span>
					</div>
				{/if}
				<img src={resultSrc} alt="Resized" class="w-full border border-[#CBD5E1] dark:border-white/10" />
			</div>
		{:else}
			<!-- ORIGINAL PREVIEW -->
			<div
				class={cn(
					'relative flex flex-1 items-center justify-center overflow-hidden rounded-xl border p-3',
					'border-[#E2E8F0] dark:border-[#2A2578]',
					'min-h-[320px] lg:min-h-[460px]'
				)}
				style="background-color: {checkerBg}; background-image: linear-gradient(45deg, {checkerColor} 25%, transparent 25%), linear-gradient(-45deg, {checkerColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, {checkerColor} 75%), linear-gradient(-45deg, transparent 75%, {checkerColor} 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0px;"
			>
				{#if $processingState === 'resizing'}
					<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
						<Loader2 size={28} class="animate-spin text-[#22D3EE]" />
						<span class="mt-2 text-xs font-medium text-white/80">Resizing...</span>
					</div>
				{/if}
				<img src={previewSrc} alt="Preview" class="w-full border border-[#CBD5E1] dark:border-white/10" />
			</div>
		{/if}
	{:else}
		<!-- EMPTY -->
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
</div>
