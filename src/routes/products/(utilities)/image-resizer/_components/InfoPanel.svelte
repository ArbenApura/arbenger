<script lang="ts">
	// IMPORTED MODULES
	import {
		activeImage,
		result,
		settings,
		batchSettings,
		processingState,
		batchProgress,
		imageCount,
		formatBytes,
		formatName,
		performResize,
		downloadResult,
		downloadAllAsZip
	} from '../_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Download, Archive, Loader2, Play } from 'lucide-svelte';

	// -- OPTIONAL PROPS -- //

	export let batch: boolean = false;

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
</script>

{#if batch}
	<!-- BATCH MODE -->
	<div class="space-y-3">
		<h3 class="text-xs font-semibold uppercase tracking-wide text-[#94A3B8] dark:text-slate-500">Batch Export</h3>

		<div class="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#2A2578] dark:bg-[#0B0A23]/30">
			<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
				<span class="text-[#94A3B8] dark:text-slate-500">Images</span>
				<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">{$imageCount}</span>

				<span class="text-[#94A3B8] dark:text-slate-500">Target</span>
				<span class="text-right tabular-nums text-[#334155] dark:text-slate-300">
					{$batchSettings.width}×{$batchSettings.height} · {formatName($batchSettings.format)}
				</span>
			</div>
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

		<button
			class={cn(
				'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
				'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]',
				isProcessing && 'pointer-events-none opacity-70'
			)}
			disabled={isProcessing}
			on:click={downloadAllAsZip}
		>
			{#if $processingState === 'exporting'}
				<Loader2 size={16} class="animate-spin" />
				Preparing ZIP...
			{:else}
				<Archive size={16} />
				Resize & Download ZIP
			{/if}
		</button>
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
		{#if !$result}
			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
					'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]',
					isProcessing && 'pointer-events-none opacity-70'
				)}
				disabled={isProcessing || !$activeImage}
				on:click={performResize}
			>
				{#if $processingState === 'resizing'}
					<Loader2 size={16} class="animate-spin" />
					Resizing...
				{:else}
					<Play size={16} />
					Resize
				{/if}
			</button>
		{:else}
			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
					'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]',
					isProcessing && 'pointer-events-none opacity-70'
				)}
				disabled={isProcessing}
				on:click={performResize}
			>
				{#if $processingState === 'resizing'}
					<Loader2 size={16} class="animate-spin" />
					Resizing...
				{:else}
					<Play size={16} />
					Re-resize
				{/if}
			</button>

			<button
				class={cn(
					'flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200',
					'border-[#E2E8F0] text-[#64748B] hover:border-[#0891B2] hover:text-[#0891B2]',
					'dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE] dark:hover:text-[#22D3EE]',
					isProcessing && 'pointer-events-none opacity-70'
				)}
				disabled={isProcessing}
				on:click={downloadResult}
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
