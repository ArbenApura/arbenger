<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import tippyJs from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	// IMPORTED MODULES
	import {
		activeImage,
		result,
		settings,
		batchSettings,
		processingState,
		batchProgress,
		batchResultSize,
		imageCount,
		images,
		formatBytes,
		formatName,
		performResize,
		downloadResult,
		performBatchResize,
		downloadBatchZip,
		cancelProcessing
	} from '../_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Download, Archive, Loader2, Play } from 'lucide-svelte';

	// -- OPTIONAL PROPS -- //

	export let batch: boolean = false;

	// -- STATES -- //

	let zipDialogOpen = false;
	let zipFilename = 'resized-images';
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

	function openZipDialog() {
		zipFilename = 'resized-images';
		zipDialogOpen = true;
	}

	function showZipTooltip() {
		if (!zipTippyInstance || tooltipShownForResult) return;
		const ref = zipTippyInstance.reference as HTMLElement;
		if (!ref || ref.offsetParent === null) return;
		tooltipShownForResult = true;
		zipTippyInstance.show();
		clearTimeout(tippyTimeout);
		tippyTimeout = setTimeout(() => { zipTippyInstance?.hide(); }, 4000);
	}

	function handleZipConfirm() {
		zipDialogOpen = false;
		downloadBatchZip(zipFilename || 'resized-images');
	}

	function handleZipCancel() {
		zipDialogOpen = false;
	}

	function handleZipKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') handleZipConfirm();
		if (e.key === 'Escape') handleZipCancel();
	}

	// -- REACTIVE STATEMENTS -- //

	$: if ($batchResultSize === null && $result === null) { tooltipShownForResult = false; }
	$: if ($batchResultSize !== null && $processingState === 'idle' && batch) {
		setTimeout(showZipTooltip, 300);
	}
	$: if ($result !== null && $processingState === 'idle' && !batch) {
		setTimeout(showSingleTooltip, 300);
	}

	$: if (typeof document !== 'undefined') {
		if (zipDialogOpen) {
			document.documentElement.style.overflow = 'hidden';
			document.body.style.overflow = 'hidden';
		} else {
			document.documentElement.style.overflow = '';
			document.body.style.overflow = '';
		}
	}

	// -- REACTIVE STATES -- //

	$: reduction = !batch && $activeImage && $result
		? Math.round((1 - $result.size / $activeImage.originalSize) * 100)
		: null;

	$: reductionLabel = reduction !== null
		? reduction > 0
			? `↓ ${reduction}%`
			: `↑ ${Math.abs(reduction)}%`
		: null;

	$: isProcessing = $processingState !== 'idle';
	$: totalOriginalSize = $images.reduce((sum, img) => sum + img.originalSize, 0);
	$: batchReduction = $batchResultSize !== null && totalOriginalSize > 0
		? Math.round((1 - $batchResultSize / totalOriginalSize) * 100)
		: null;
</script>

{#if batch}
	<!-- BATCH MODE -->
	<div class="space-y-3">
		<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
			<span class="text-[#94A3B8] dark:text-slate-500">Images</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">{$imageCount}</span>

			<span class="text-[#94A3B8] dark:text-slate-500">Target</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">
				{$batchSettings.width}×{$batchSettings.height} · {formatName($batchSettings.format)}
			</span>

			<span class="text-[#94A3B8] dark:text-slate-500">Original</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">{formatBytes(totalOriginalSize)}</span>

			{#if $batchResultSize !== null}
				<span class="text-[#94A3B8] dark:text-slate-500">Resized</span>
				<span class="text-right tabular-nums text-[#0891B2] dark:text-[#22D3EE]">{formatBytes($batchResultSize)}</span>

				<span class="text-[#94A3B8] dark:text-slate-500">Change</span>
				<span class={cn(
					'text-right font-semibold tabular-nums',
					batchReduction !== null && batchReduction > 0 ? 'text-[#2DD4BF]' : 'text-[#94A3B8] dark:text-slate-500'
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

		{#if $batchProgress}
			<div class="space-y-1.5">
				<div class="flex justify-between text-xs text-[#94A3B8] dark:text-slate-500">
					<span>Processing</span>
					<span class="tabular-nums">{$batchProgress.current} / {$batchProgress.total}</span>
				</div>
				<div class="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
					<div
						class="h-full rounded-full bg-[#0891B2] transition-[width] duration-75 dark:bg-[#22D3EE]"
						style="width: {($batchProgress.current / $batchProgress.total) * 100}%"
					/>
				</div>
			</div>
		{/if}

		<div class="space-y-2">
			{#if $processingState === 'resizing'}
				<div class="flex gap-2">
					<button
						class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
						disabled
					>
						<Loader2 size={16} class="animate-spin" />
						{$batchProgress ? `${$batchProgress.current}/${$batchProgress.total}` : 'Resizing...'}
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
						'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
						'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
					)}
					on:click={performBatchResize}
				>
					{#if $batchResultSize !== null}
						<Play size={16} />
						Re-resize All
					{:else}
						<Play size={16} />
						Resize All
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
{:else}
	<!-- SINGLE MODE -->
	{#if $activeImage}
		<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
			<span class="text-[#94A3B8] dark:text-slate-500">Original</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">
				{$activeImage.originalWidth}×{$activeImage.originalHeight} · {formatBytes($activeImage.originalSize)}
			</span>

			<span class="text-[#94A3B8] dark:text-slate-500">New</span>
			<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">
				{$settings.width}×{$settings.height} · {formatName($settings.format)}
				{#if $result} · {formatBytes($result.size)}{/if}
			</span>

			{#if reductionLabel}
				<span class="text-[#94A3B8] dark:text-slate-500">Change</span>
				<span class={cn(
					'text-right text-xs font-semibold tabular-nums',
					reduction !== null && reduction > 0 ? 'text-[#2DD4BF]' : 'text-[#94A3B8]'
				)}>
					{reductionLabel}
				</span>
			{/if}
		</div>
	{/if}

	{#if $batchProgress}
		<div class="space-y-1.5">
			<div class="flex justify-between text-xs text-[#94A3B8] dark:text-slate-500">
				<span>Processing</span>
				<span class="tabular-nums">{$batchProgress.current} / {$batchProgress.total}</span>
			</div>
			<div class="h-1.5 overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]">
				<div
					class="h-full rounded-full bg-[#0891B2] transition-[width] duration-75 dark:bg-[#22D3EE]"
					style="width: {($batchProgress.current / $batchProgress.total) * 100}%"
				/>
			</div>
		</div>
	{/if}

	<div class="space-y-2">
		{#if $processingState === 'resizing'}
			<div class="flex gap-2">
				<button
					class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-4 py-2.5 text-sm font-medium text-white pointer-events-none opacity-70 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
					disabled
				>
					<Loader2 size={16} class="animate-spin" />
					Resizing...
				</button>
				<button
					class="flex items-center justify-center rounded-lg border border-[#E2E8F0] px-3 py-2.5 text-xs font-medium text-[#64748B] transition-all hover:border-[#EF4444] hover:text-[#EF4444] dark:border-[#2A2578] dark:text-slate-400"
					on:click={cancelProcessing}
				>
					Cancel
				</button>
			</div>
		{:else if !$result}
			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
					'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
				)}
				disabled={!$activeImage}
				on:click={performResize}
			>
				<Play size={16} />
				Resize
			</button>
		{:else}
			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
					'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
				)}
				on:click={performResize}
			>
				<Play size={16} />
				Re-resize
			</button>

			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200',
					'border-[#E2E8F0] text-[#64748B] hover:border-[#0891B2] hover:text-[#0891B2]',
					'dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE] dark:hover:text-[#22D3EE]',
					isProcessing && 'pointer-events-none opacity-70'
				)}
				disabled={isProcessing}
				use:singleTippy
				on:click={() => { singleTippyInstance?.hide(); downloadResult(); }}
			>
				{#if $processingState === 'downloading'}
					<Loader2 size={14} class="animate-spin" />
					Downloading...
				{:else}
					<Download size={14} />
					Download
				{/if}
			</button>
		{/if}
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
				<label for="zip-filename-resizer" class="mb-1.5 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Filename</label>
				<div class="flex items-center gap-0">
					<input
						id="zip-filename-resizer"
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


