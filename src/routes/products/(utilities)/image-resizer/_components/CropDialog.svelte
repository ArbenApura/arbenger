<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import type { CropData, ImageEntry } from '../_lib/store';
	import { getImageCrop } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Crop, RotateCcw, Check, X } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let open: boolean = false;
	export let image: ImageEntry | null = null;

	export function show(img: ImageEntry) {
		image = img;
		open = true;
		initCrop();
		tick().then(() => calcDisplayScale());
	}

	// -- STATES -- //

	let containerEl: HTMLDivElement;
	let isDragging = false;
	let isResizing = false;
	let resizeHandle = '';
	let dragStartX = 0;
	let dragStartY = 0;
	let cropStartX = 0;
	let cropStartY = 0;
	let cropStartW = 0;
	let cropStartH = 0;

	let displayScale = 1;
	let offsetX = 0;
	let offsetY = 0;

	let cropX = 0;
	let cropY = 0;
	let cropW = 0;
	let cropH = 0;

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ apply: CropData; cancel: void }>();

	function initCrop() {
		if (!image) return;
		const currentCrop = getImageCrop(image.id);
		if (currentCrop) {
			cropX = currentCrop.x;
			cropY = currentCrop.y;
			cropW = currentCrop.width;
			cropH = currentCrop.height;
		} else {
			cropX = 0;
			cropY = 0;
			cropW = image.originalWidth;
			cropH = image.originalHeight;
		}
	}

	function calcDisplayScale() {
		if (!containerEl || !image) return;
		const rect = containerEl.getBoundingClientRect();
		const pad = 24;
		const maxW = rect.width - pad;
		const maxH = rect.height - pad;
		displayScale = Math.min(maxW / image.originalWidth, maxH / image.originalHeight, 1);
		offsetX = (rect.width - image.originalWidth * displayScale) / 2;
		offsetY = (rect.height - image.originalHeight * displayScale) / 2;
	}

	function toOriginal(v: number): number { return v / displayScale; }
	function clampVal(val: number, min: number, max: number): number { return Math.max(min, Math.min(max, val)); }

	function handlePointerDown(e: PointerEvent, type: string) {
		e.preventDefault();
		e.stopPropagation();
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		dragStartX = e.clientX;
		dragStartY = e.clientY;
		cropStartX = cropX;
		cropStartY = cropY;
		cropStartW = cropW;
		cropStartH = cropH;

		if (type === 'move') { isDragging = true; }
		else { isResizing = true; resizeHandle = type; }
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging && !isResizing) return;
		if (!image) return;
		const dx = toOriginal(e.clientX - dragStartX);
		const dy = toOriginal(e.clientY - dragStartY);

		if (isDragging) {
			cropX = clampVal(cropStartX + dx, 0, image.originalWidth - cropW);
			cropY = clampVal(cropStartY + dy, 0, image.originalHeight - cropH);
		} else if (isResizing) {
			const h = resizeHandle;
			let newX = cropStartX, newY = cropStartY, newW = cropStartW, newH = cropStartH;
			if (h.includes('e')) newW = clampVal(cropStartW + dx, 40, image.originalWidth - cropStartX);
			if (h.includes('w')) { newW = clampVal(cropStartW - dx, 40, cropStartX + cropStartW); newX = cropStartX + cropStartW - newW; }
			if (h.includes('s')) newH = clampVal(cropStartH + dy, 40, image.originalHeight - cropStartY);
			if (h.includes('n')) { newH = clampVal(cropStartH - dy, 40, cropStartY + cropStartH); newY = cropStartY + cropStartH - newH; }
			cropX = newX; cropY = newY; cropW = newW; cropH = newH;
		}
	}

	function handlePointerUp() { isDragging = false; isResizing = false; }

	function handleApply() {
		if (!image) return;
		dispatch('apply', { x: Math.round(cropX), y: Math.round(cropY), width: Math.round(cropW), height: Math.round(cropH) });
		open = false;
	}

	function handleReset() {
		if (!image) return;
		cropX = 0; cropY = 0; cropW = image.originalWidth; cropH = image.originalHeight;
	}

	function handleCancel() { open = false; dispatch('cancel'); }

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') handleCancel();
		if (e.key === 'Enter') handleApply();
	}

	function lockScroll() { document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }
	function unlockScroll() { document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }

	// -- REACTIVE STATEMENTS -- //

	$: if (typeof document !== 'undefined') { if (open) lockScroll(); else unlockScroll(); }
	$: dCropX = offsetX + cropX * displayScale;
	$: dCropY = offsetY + cropY * displayScale;
	$: dCropW = cropW * displayScale;
	$: dCropH = cropH * displayScale;
	$: isFullImage = image ? (cropX === 0 && cropY === 0 && cropW === image.originalWidth && cropH === image.originalHeight) : true;
	$: overlayShadow = '0 0 0 9999px rgba(0,0,0,0.6)';

	// -- CONSTANTS -- //

	const handles = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
	const cursors: Record<string, string> = { nw: 'nwse-resize', ne: 'nesw-resize', sw: 'nesw-resize', se: 'nwse-resize', n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize' };

	function dotStyle(h: string): string {
		const half = 7;
		let left = '', top = '';
		if (h.includes('w')) left = `left:${-half}px;`;
		else if (h.includes('e')) left = `right:${-half}px;`;
		else left = `left:calc(50% - ${half}px);`;
		if (h.includes('n')) top = `top:${-half}px;`;
		else if (h.includes('s')) top = `bottom:${-half}px;`;
		else top = `top:calc(50% - ${half}px);`;
		return `${left}${top}`;
	}

	function handleHitArea(h: string): string {
		const s = 16;
		let css = `width:${s}px;height:${s}px;cursor:${cursors[h]};`;
		if (h.includes('n')) css += 'top:-8px;'; else if (h.includes('s')) css += 'bottom:-8px;'; else css += 'top:calc(50% - 8px);';
		if (h.includes('w')) css += 'left:-8px;'; else if (h.includes('e')) css += 'right:-8px;'; else css += 'left:calc(50% - 8px);';
		return css;
	}
</script>

<svelte:window on:keydown={handleKeydown} on:resize={() => open && calcDisplayScale()} />

{#if open && image}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<!-- BACKDROP -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
		on:click={(e) => e.target === e.currentTarget && handleCancel()}
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 150 }}
	>
		<!-- DIALOG -->
		<div
			class="mx-3 flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl sm:mx-4 dark:border-[#2A2578] dark:bg-[#161446]"
			transition:fly={{ y: 20, duration: 250, easing: cubicOut }}
		>
			<!-- HEADER -->
			<div class="flex items-center justify-between border-b border-[#E2E8F0] px-3 py-2.5 sm:px-5 sm:py-3 dark:border-white/10">
				<div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
					<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0891B2]/10 sm:h-8 sm:w-8 dark:bg-[#22D3EE]/15">
						<Crop size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<div class="min-w-0">
						<p class="text-sm font-semibold text-[#0F172A] dark:text-white">Crop Image</p>
						<p class="truncate text-[11px] text-[#94A3B8] dark:text-slate-400">{image.file.name}</p>
					</div>
				</div>

				<div class="flex shrink-0 items-center gap-1">
					<button
						class="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] sm:p-2 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
						title="Reset crop"
						on:click={handleReset}
					>
						<RotateCcw size={15} />
					</button>

					<button
						class="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A] sm:p-2 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
						title="Cancel"
						on:click={handleCancel}
					>
						<X size={15} />
					</button>
				</div>
			</div>

			<!-- CANVAS AREA -->
			<div
				bind:this={containerEl}
				class="relative overflow-hidden bg-[#F1F5F9] dark:bg-[#0B0A23]"
				style="height: min(50vh, 500px);"
				on:pointermove={handlePointerMove}
				on:pointerup={handlePointerUp}
			>
				<!-- IMAGE -->
				<img
					src={image.thumbnailUrl}
					alt=""
					class="absolute select-none rounded border border-[#CBD5E1] dark:border-white/10"
					style="left:{offsetX}px;top:{offsetY}px;width:{image.originalWidth * displayScale}px;height:{image.originalHeight * displayScale}px;"
					on:load={calcDisplayScale}
					draggable="false"
				/>

				<!-- CROP FRAME -->
				<div
					class="absolute border border-white/80"
					style="left:{dCropX}px;top:{dCropY}px;width:{dCropW}px;height:{dCropH}px;cursor:move;box-shadow:{overlayShadow};"
					on:pointerdown={(e) => handlePointerDown(e, 'move')}
				>
					<!-- GRID -->
					<div class="pointer-events-none absolute inset-0">
						<div class="absolute left-1/3 h-full w-px bg-white/20" />
						<div class="absolute left-2/3 h-full w-px bg-white/20" />
						<div class="absolute top-1/3 h-px w-full bg-white/20" />
						<div class="absolute top-2/3 h-px w-full bg-white/20" />
					</div>

					<!-- CENTER CROSSHAIR -->
					<div class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div class="absolute left-1/2 -translate-x-px" style="width:2px;height:16px;top:-8px;background:rgba(255,255,255,0.5);" />
						<div class="absolute top-1/2 -translate-y-px" style="height:2px;width:16px;left:-8px;background:rgba(255,255,255,0.5);" />
					</div>

					<!-- HANDLE DOTS + HIT AREAS -->
					{#each handles as h}
						<div class="pointer-events-none absolute h-3.5 w-3.5 rounded-full border-2 border-white bg-[#0891B2] shadow dark:bg-[#22D3EE]" style={dotStyle(h)} />
						<div
							class="absolute z-10"
							style={handleHitArea(h)}
							on:pointerdown={(e) => handlePointerDown(e, h)}
						/>
					{/each}
				</div>
			</div>

			<!-- FOOTER -->
			<div class="flex flex-col gap-2 border-t border-[#E2E8F0] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3 dark:border-white/10">
				<!-- INFO -->
				<div class="flex items-center gap-3 text-[11px] sm:gap-4">
					<span class="tabular-nums text-[#334155] dark:text-slate-200">{Math.round(cropW)}×{Math.round(cropH)}</span>
					<span class="text-[#CBD5E1] dark:text-slate-600">at</span>
					<span class="tabular-nums text-[#334155] dark:text-slate-200">{Math.round(cropX)},{Math.round(cropY)}</span>
					{#if !isFullImage}
						<span class="rounded-full bg-[#0891B2]/10 px-2 py-0.5 text-[10px] font-medium text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">Cropped</span>
					{/if}
				</div>

				<!-- ACTIONS -->
				<div class="flex items-center gap-2">
					<button
						class="flex-1 rounded-lg border border-[#E2E8F0] px-4 py-2 text-xs font-medium text-[#64748B] transition-all hover:border-[#CBD5E1] hover:text-[#334155] sm:flex-none dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-200"
						on:click={handleCancel}
					>
						Cancel
					</button>
					<button
						class="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#0891B2] px-4 py-2 text-xs font-semibold text-white transition-all hover:brightness-110 sm:flex-none dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						on:click={handleApply}
					>
						<Check size={13} />
						Apply
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
