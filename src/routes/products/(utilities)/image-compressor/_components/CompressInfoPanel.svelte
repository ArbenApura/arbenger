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
		imageCount,
		batchProgress,
		batchResultSize,
		settings,
		formatBytes,
		formatName,
		getOutputFormat,
		performCompress,
		downloadResult,
		performBatchCompress,
		downloadBatchZip,
		cancelProcessing,
		images
	} from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Download, Loader2, Archive, Play } from 'lucide-svelte';

	// -- OPTIONAL PROPS -- //

	export let batch = false;

	// -- STATES -- //

	let zipDialogOpen = false;
	let zipFilename = 'compressed-images';
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
		zipFilename = 'compressed-images';
		zipDialogOpen = true;
	}

	function handleZipConfirm() {
		zipDialogOpen = false;
		downloadBatchZip(zipFilename || 'compressed-images');
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

	// -- REACTIVE STATEMENTS -- //

	$: if ($batchResultSize === null && $result === null) { tooltipShownForResult = false; }
	$: if ($batchResultSize !== null && $processingState === 'idle' && batch) {
		setTimeout(showZipTooltip, 300);
	}
	$: if ($result !== null && $processingState === 'idle' && !batch) {
		setTimeout(showSingleTooltip, 300);
	}

	// -- REACTIVE STATES -- //

	$: outputFormat = $activeImage ? getOutputFormat($activeImage, $settings) : '';
	$: reduction = $result && $activeImage
		? Math.round((1 - $result.size / $activeImage.originalSize) * 100)
		: 0;
	$: isProcessing = $processingState !== 'idle';
	$: totalOriginalSize = $images.reduce((sum, img) => sum + img.originalSize, 0);
	$: batchReduction = $batchResultSize !== null && totalOriginalSize > 0
		? Math.round((1 - $batchResultSize / totalOriginalSize) * 100)
		: null;
	$: targetBytes = $settings.targetSize * ($settings.targetUnit === 'MB' ? 1024 * 1024 : 1024);
	$: targetExceedsOriginal = !batch && $settings.qualityMode === 'target-size' && $activeImage !== null && targetBytes >= $activeImage.originalSize;
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
					<span class="text-[#94A3B8] dark:text-slate-500">Compressed</span>
					<span class="text-right font-medium text-[#0891B2] dark:text-[#22D3EE]">
						{formatBytes($result.size)} · {formatName(outputFormat)}
					</span>

					<span class="text-[#94A3B8] dark:text-slate-500">Reduction</span>
					<span class={cn(
						'text-right font-semibold',
						reduction > 0 ? 'text-[#10B981]' : reduction < 0 ? 'text-[#F59E0B]' : 'text-[#94A3B8] dark:text-slate-500'
					)}>
						{#if reduction > 0}
							{reduction}% smaller
						{:else if reduction < 0}
							{Math.abs(reduction)}% larger
						{:else}
							Already optimized
						{/if}
					</span>
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
			{#if $processingState === 'compressing'}
				<div class="flex gap-2">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						disabled
					>
						<Loader2 size={14} class="animate-spin" />
						Compressing...
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
						'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]',
						targetExceedsOriginal && 'pointer-events-none opacity-50'
					)}
					disabled={!$activeImage || targetExceedsOriginal}
					on:click={performCompress}
				>
					{#if $result}
						Re-compress
					{:else}
						Compress
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
				<span class="text-[#94A3B8] dark:text-slate-500">Compressed</span>
				<span class="text-right tabular-nums text-[#0891B2] dark:text-[#22D3EE]">{formatBytes($batchResultSize)}</span>

				<span class="text-[#94A3B8] dark:text-slate-500">Reduction</span>
				<span class={cn(
					'text-right font-semibold tabular-nums',
					batchReduction !== null && batchReduction > 0 ? 'text-[#10B981]' : 'text-[#94A3B8] dark:text-slate-500'
				)}>
					{#if batchReduction !== null && batchReduction > 0}
						{batchReduction}% smaller
					{:else if batchReduction !== null && batchReduction < 0}
						{Math.abs(batchReduction)}% larger
					{:else}
						Already optimized
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
			{#if $processingState === 'compressing'}
				<div class="flex gap-2">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						disabled
					>
						<Loader2 size={14} class="animate-spin" />
						{$batchProgress ? `${$batchProgress.current}/${$batchProgress.total}` : 'Compressing...'}
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
					on:click={performBatchCompress}
				>
					{#if $batchResultSize !== null}
						<Play size={14} />
						Re-compress All
					{:else}
						<Play size={14} />
						Compress All
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


