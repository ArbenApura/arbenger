<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		settings,
		activeImage,
		images,
		getOutputFormat,
		formatBytes,
		processingState
	} from '../_lib/store';
	import type { QualityMode } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Gauge, Target, AlertTriangle, Info } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import Select from '$lib/components/ui/Select.svelte';

	// -- OPTIONAL PROPS -- //

	export let batch = false;

	// -- REACTIVE STATES -- //

	$: formatItems = [
		{ value: 'original', label: 'Same as original' },
		{ value: 'image/jpeg', label: 'JPEG' },
		{ value: 'image/png', label: 'PNG' },
		{ value: 'image/webp', label: 'WebP' }
	];

	$: outputFormat = $activeImage ? getOutputFormat($activeImage, $settings) : '';
	$: isPng = outputFormat === 'image/png';
	$: targetBytes = $settings.targetSize * ($settings.targetUnit === 'MB' ? 1024 * 1024 : 1024);
	$: smallestOriginal = $images.length > 0 ? Math.min(...$images.map((img) => img.originalSize)) : 0;
	$: largestOriginal = $images.length > 0 ? Math.max(...$images.map((img) => img.originalSize)) : 0;
	$: targetExceedsOriginal = !batch && $activeImage !== null && targetBytes >= $activeImage.originalSize;
	$: isProcessing = $processingState !== 'idle';

	// -- FUNCTIONS -- //

	function handleQualityChange(e: Event) {
		const val = parseInt((e.target as HTMLInputElement).value);
		settings.update((s) => ({ ...s, quality: val }));
	}

	function handleQualityInput(e: Event) {
		const val = parseInt((e.target as HTMLInputElement).value);
		if (!isNaN(val) && val >= 1 && val <= 100) {
			settings.update((s) => ({ ...s, quality: val }));
		}
	}

	function handleFormatChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, format: e.detail as typeof $settings.format }));
	}

	function handleQualityModeToggle(mode: QualityMode) {
		settings.update((s) => ({ ...s, qualityMode: mode }));
	}

	function handleTargetSizeChange(e: Event) {
		const val = parseFloat((e.target as HTMLInputElement).value);
		if (!isNaN(val) && val > 0) {
			settings.update((s) => ({ ...s, targetSize: val }));
		}
	}

	function handleTargetUnitChange(e: CustomEvent<string>) {
		settings.update((s) => ({ ...s, targetUnit: e.detail as 'KB' | 'MB' }));
	}

	function handleFilenameChange(e: Event) {
		const filename = (e.target as HTMLInputElement).value;
		settings.update((s) => ({ ...s, filename }));
	}
</script>

<div class={cn('flex flex-col gap-4 transition-opacity', isProcessing && 'pointer-events-none opacity-50')}>
	<!-- QUALITY MODE TOGGLE -->
	<div>
		<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
			Quality Control
		</p>
		<div class="flex rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
			<button
				class={cn(
					'flex flex-1 items-center justify-center gap-1.5 rounded-l-lg px-3 py-2 text-xs font-medium transition-colors',
					$settings.qualityMode === 'quality'
						? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
						: 'text-[#64748B] hover:bg-[#F8FAFC] dark:text-slate-400 dark:hover:bg-[#1E1A5E]/30'
				)}
				on:click={() => handleQualityModeToggle('quality')}
			>
				<Gauge size={12} />
				Quality
			</button>
			<button
				class={cn(
					'flex flex-1 items-center justify-center gap-1.5 rounded-r-lg px-3 py-2 text-xs font-medium transition-colors',
					$settings.qualityMode === 'target-size'
						? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
						: 'text-[#64748B] hover:bg-[#F8FAFC] dark:text-slate-400 dark:hover:bg-[#1E1A5E]/30'
				)}
				on:click={() => handleQualityModeToggle('target-size')}
			>
				<Target size={12} />
				Target Size
			</button>
		</div>
	</div>

	<!-- QUALITY SLIDER -->
	{#if $settings.qualityMode === 'quality'}
		<div>
			<div class="mb-2 flex items-center justify-between">
				<span class="text-xs font-medium text-[#64748B] dark:text-slate-400">Quality</span>
				<input
					type="number"
					min="1"
					max="100"
					value={$settings.quality}
					on:input={handleQualityInput}
					class="w-14 rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-center text-xs text-[#0F172A] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:text-white"
				/>
			</div>
			<input
				type="range"
				min="1"
				max="100"
				value={$settings.quality}
				on:input={handleQualityChange}
				class="w-full accent-[#0891B2] dark:accent-[#22D3EE]"
			/>
			<div class="mt-1 flex justify-between text-[10px] text-[#94A3B8] dark:text-slate-500">
				<span>Smaller file</span>
				<span>Better quality</span>
			</div>
		</div>
	{/if}

	<!-- TARGET SIZE INPUT -->
	{#if $settings.qualityMode === 'target-size'}
		<div>
			<div class="mb-2 flex items-center justify-between">
				<p class="text-xs font-medium text-[#64748B] dark:text-slate-400">
					Maximum file size
				</p>
				{#if batch && $images.length > 0}
					<span class="text-[10px] text-[#94A3B8] dark:text-slate-500">
						Largest: {formatBytes(largestOriginal)}
					</span>
				{:else if $activeImage}
					<span class="text-[10px] text-[#94A3B8] dark:text-slate-500">
						Original: {formatBytes($activeImage.originalSize)}
					</span>
				{/if}
			</div>
			<div class="flex gap-2">
				<input
					type="number"
					min="1"
					step="1"
					value={$settings.targetSize}
					on:input={handleTargetSizeChange}
					class={cn(
						'flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-[#0F172A] dark:bg-[#1E1A5E]/30 dark:text-white',
						targetExceedsOriginal
							? 'border-[#F59E0B] dark:border-[#F59E0B]/60'
							: 'border-[#E2E8F0] dark:border-[#2A2578]'
					)}
				/>
				<Select
					items={[
						{ value: 'KB', label: 'KB' },
						{ value: 'MB', label: 'MB' }
					]}
					value={$settings.targetUnit}
					on:change={handleTargetUnitChange}
				/>
			</div>

			<!-- TARGET SIZE WARNING -->
			{#if targetExceedsOriginal}
				<div class="mt-2 flex items-start gap-1.5 text-[11px] text-[#F59E0B]">
					<AlertTriangle size={12} class="mt-px shrink-0" />
					<span>Target size exceeds the original file size ({$activeImage ? formatBytes($activeImage.originalSize) : ''}). Set a smaller target.</span>
				</div>
			{/if}
		</div>
	{/if}

	<!-- PNG INFO -->
	{#if isPng && $settings.qualityMode === 'quality'}
		<div class="flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
			<Info size={14} class="mt-0.5 shrink-0 text-[#0891B2] dark:text-[#22D3EE]" />
			<p class="text-[11px] leading-relaxed text-[#64748B] dark:text-slate-400">
				PNG compression reduces colors to shrink file size. Quality 100 = lossless, lower = fewer colors = smaller file.
			</p>
		</div>
	{:else if isPng && $settings.qualityMode === 'target-size'}
		<div class="flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
			<Info size={14} class="mt-0.5 shrink-0 text-[#0891B2] dark:text-[#22D3EE]" />
			<p class="text-[11px] leading-relaxed text-[#64748B] dark:text-slate-400">
				Uses lossless encoding if the target fits, otherwise reduces colors to meet the target size.
			</p>
		</div>
	{/if}

	<!-- OUTPUT FORMAT -->
	<div>
		<p class="mb-2 text-xs font-medium text-[#64748B] dark:text-slate-400">
			Output Format
		</p>
		<Select
			items={formatItems}
			value={$settings.format}
			on:change={handleFormatChange}
		/>
	</div>

	<!-- FILENAME (SINGLE MODE ONLY) -->
	{#if !batch}
		<div>
			<label for="output-filename" class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Filename</label>
			<input
				id="output-filename"
				type="text"
				value={$settings.filename}
				on:input={handleFilenameChange}
				class={cn(
					'w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
					'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
					'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
				)}
			/>
		</div>
	{/if}
</div>
