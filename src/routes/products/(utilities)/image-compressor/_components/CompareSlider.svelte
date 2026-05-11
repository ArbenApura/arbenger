<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { activeImage, result, processingState, formatBytes } from '../_lib/store';
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
	$: compressedSrc = displayResult?.url ?? '';
	$: reduction = displayResult && $activeImage
		? Math.round((1 - displayResult.size / $activeImage.originalSize) * 100)
		: 0;
	$: imageTransform = `scale(${zoom}) translate(${panX}px, ${panY}px)`;
	$: isZoomed = zoom > 1;

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

<!-- COMPARE SLIDER PREVIEW -->
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
		<!-- LOADING OVERLAY -->
		{#if $processingState === 'compressing'}
			<div class="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
				<Loader2 size={28} class="animate-spin text-[#22D3EE]" />
				<span class="mt-2 text-xs font-medium text-white/80">Compressing...</span>
			</div>
		{/if}

		<!-- ORIGINAL IMAGE (FULL WIDTH) -->
		<!-- IMAGE transform REQUIRES DYNAMIC SCALE AND TRANSLATE VALUES -->
		<img
			src={originalSrc}
			alt=""
			class="absolute inset-0 h-full w-full object-contain p-3"
			style="transform: {imageTransform}; transform-origin: center center;"
		/>

		<!-- COMPRESSED IMAGE (CLIPPED BY SLIDER) -->
		{#if compressedSrc}
			<!-- COMPRESSED SIDE — clip-path AND transform REQUIRE DYNAMIC VALUES -->
			<div
				class="absolute inset-0"
				style="clip-path: inset(0 0 0 {sliderPosition}%);"
			>
				<img
					src={compressedSrc}
					alt=""
					class="h-full w-full object-contain p-3"
					style="transform: {imageTransform}; transform-origin: center center;"
				/>
			</div>
		{/if}

		<!-- SLIDER DIVIDER -->
		{#if compressedSrc}
			<!-- SLIDER POSITION — left REQUIRES DYNAMIC PERCENTAGE VALUE -->
			<!-- SLIDER LINE — left REQUIRES DYNAMIC PERCENTAGE VALUE -->
			<div
				class="absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
				style="left: {sliderPosition}%;"
			/>
			<!-- SLIDER TOUCH TARGET — left REQUIRES DYNAMIC PERCENTAGE VALUE -->
			<div
				data-slider-handle
				class="absolute top-0 bottom-0 z-20 w-10 -translate-x-1/2 cursor-col-resize"
				style="left: {sliderPosition}%;"
				on:pointerdown={handleSliderDown}
			>
				<!-- GRIP HANDLE -->
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
				Compressed · {formatBytes(displayResult.size)} · {reduction}% smaller
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
