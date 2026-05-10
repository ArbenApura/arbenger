<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		settings,
		batchSettings,
		activeImage,
		updateWidth,
		updateHeight,
		swapDimensions,
		applyScale,
		applyPreset,
		applyFitMax,
		SCALE_OPTIONS,
		PRESET_GROUPS,
		FORMAT_OPTIONS
	} from '../_lib/store';
	import type { ImageFormat, ResizeAlgorithm, FitMode } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Link, Unlink, ArrowLeftRight, Scaling, LayoutGrid, FileImage, Sparkles, Maximize, Minimize, Crop } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import Select from '$lib/components/ui/Select.svelte';
	import type { SelectGroup, SelectOption } from '$lib/components/ui/Select.svelte';
	import ColorPicker from '$lib/components/ui/ColorPicker.svelte';

	// -- OPTIONAL PROPS -- //

	export let batch: boolean = false;

	// -- CONSTANTS -- //

	const scaleItems: SelectOption[] = [
		...SCALE_OPTIONS.map((pct) => ({ value: String(pct), label: `${pct}%` })),
		{ value: 'custom', label: 'Custom' }
	];

	const presetItems: SelectGroup[] = PRESET_GROUPS.map((g) => ({
		label: g.label,
		options: g.presets.map((p) => ({
			value: `${p.width}x${p.height}`,
			label: p.label,
			hint: `${p.width}×${p.height}`
		}))
	}));

	const formatItems: SelectOption[] = FORMAT_OPTIONS.map((o) => ({
		value: o.value,
		label: o.label
	}));

	const algorithmItems: SelectOption[] = [
		{ value: 'smooth', label: 'Smooth' },
		{ value: 'pixelated', label: 'Pixelated', hint: 'pixel art' }
	];

	const fitModeItems: SelectOption[] = [
		{ value: 'stretch', label: 'Stretch', hint: 'fill exact size' },
		{ value: 'contain', label: 'Contain', hint: 'fit inside, letterbox' },
		{ value: 'cover', label: 'Cover', hint: 'fill, crop center' }
	];

	// -- STATES -- //

	let scaleValue = '';
	let presetValue = '';
	let fitMaxValue = '';
	let scaleSetByUser = false;
	let presetSetByUser = false;

	// -- REACTIVE STATES -- //

	$: currentSettings = batch ? $batchSettings : $settings;
	$: formatValue = currentSettings.format;
	$: algorithmValue = currentSettings.algorithm;
	$: showQuality = currentSettings.format !== 'image/png';
	$: widthValue = currentSettings.width;
	$: heightValue = currentSettings.height;
	$: lockAspect = batch ? $batchSettings.lockAspect : $settings.lockAspect;
	$: fitModeValue = currentSettings.fitMode;

	// -- FUNCTIONS -- //

	function updateStore(partial: Record<string, unknown>) {
		if (batch) {
			batchSettings.update((s) => ({ ...s, ...partial }));
		} else {
			settings.update((s) => ({ ...s, ...partial }));
		}
	}

	function handleWidthInput(e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value);
		if (v <= 0) return;

		scaleSetByUser = false;
		presetSetByUser = false;
		scaleValue = 'custom';
		presetValue = '';

		if (batch) {
			const ratio = $batchSettings.width / $batchSettings.height;
			const h = $batchSettings.lockAspect ? Math.round(v / ratio) : $batchSettings.height;
			batchSettings.update((s) => ({ ...s, width: v, height: h }));
		} else {
			updateWidth(v);
		}
	}

	function handleHeightInput(e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value);
		if (v <= 0) return;

		scaleSetByUser = false;
		presetSetByUser = false;
		scaleValue = 'custom';
		presetValue = '';

		if (batch) {
			const ratio = $batchSettings.width / $batchSettings.height;
			const w = $batchSettings.lockAspect ? Math.round(v * ratio) : $batchSettings.width;
			batchSettings.update((s) => ({ ...s, width: w, height: v }));
		} else {
			updateHeight(v);
		}
	}

	function handleScaleChange(e: CustomEvent<string>) {
		const v = e.detail;
		if (v === 'custom') return;
		scaleSetByUser = true;
		presetSetByUser = false;
		scaleValue = v;
		presetValue = '';

		if (batch) {
			const pct = parseInt(v) / 100;
			batchSettings.update((s) => ({
				...s,
				width: Math.round(s.width * pct),
				height: Math.round(s.height * pct)
			}));
		} else {
			applyScale(parseInt(v));
		}
	}

	function handlePresetChange(e: CustomEvent<string>) {
		const [w, h] = e.detail.split('x').map(Number);
		if (w && h) {
			presetSetByUser = true;
			scaleSetByUser = false;
			presetValue = e.detail;
			scaleValue = 'custom';

			if (batch) {
				batchSettings.update((s) => ({ ...s, width: w, height: h, lockAspect: false }));
			} else {
				applyPreset(w, h);
			}
		}
	}

	function handleFitMax(e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value);
		if (v <= 0) return;

		scaleSetByUser = false;
		presetSetByUser = false;
		fitMaxValue = String(v);
		presetValue = '';
		scaleValue = 'custom';

		if (batch) {
			const ratio = $batchSettings.width / $batchSettings.height;
			let w: number, h: number;
			if (ratio >= 1) {
				w = v;
				h = Math.round(v / ratio);
			} else {
				h = v;
				w = Math.round(v * ratio);
			}
			batchSettings.update((s) => ({ ...s, width: w, height: h }));
		} else {
			applyFitMax(v);
		}
	}

	function toggleAspectLock() {
		updateStore({ lockAspect: !lockAspect });
	}

	function handleSwapDimensions() {
		if (batch) {
			batchSettings.update((s) => ({ ...s, width: s.height, height: s.width }));
		} else {
			swapDimensions();
		}
	}

	function handleFormatChange(e: CustomEvent<string>) {
		const format = e.detail as ImageFormat;
		if (batch) {
			batchSettings.update((s) => ({
				...s,
				format,
				bgTransparent: format !== 'image/jpeg' ? s.bgTransparent : false
			}));
		} else {
			settings.update((s) => ({
				...s,
				format,
				bgTransparent: format !== 'image/jpeg' ? s.bgTransparent : false
			}));
		}
	}

	function handleQualityChange(e: Event) {
		const quality = parseInt((e.target as HTMLInputElement).value);
		updateStore({ quality });
	}

	function handleAlgorithmChange(e: CustomEvent<string>) {
		const algorithm = e.detail as ResizeAlgorithm;
		updateStore({ algorithm });
	}

	function handleFitModeChange(e: CustomEvent<string>) {
		const fitMode = e.detail as FitMode;
		updateStore({ fitMode });
	}

	function handleBgColorChange(e: CustomEvent<string>) {
		updateStore({ bgColor: e.detail });
	}

	function handleFilenameChange(e: Event) {
		const filename = (e.target as HTMLInputElement).value;
		settings.update((s) => ({ ...s, filename }));
	}
</script>

<!-- DIMENSIONS -->
<div class="space-y-3">
	<h3 class="text-xs font-semibold uppercase tracking-wide text-[#94A3B8] dark:text-slate-500">Dimensions</h3>

	<div class="flex items-end gap-1.5">
		<div class="flex-1">
			<label for="resize-width" class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Width</label>
			<div class="relative">
				<input
					id="resize-width"
					type="number"
					value={widthValue}
					min="1"
					on:input={handleWidthInput}
					class={cn(
						'w-full rounded-lg border bg-white px-3 py-2 pr-8 text-sm tabular-nums transition-colors',
						'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
						'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
					)}
				/>
				<span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#CBD5E1] dark:text-slate-600">px</span>
			</div>
		</div>

		<button
			class={cn(
				'mb-0.5 rounded-md p-2 transition-colors',
				lockAspect
					? 'text-[#0891B2] hover:bg-[#0891B2]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10'
					: 'text-[#CBD5E1] hover:bg-black/5 dark:text-slate-600 dark:hover:bg-white/5'
			)}
			title={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
			on:click={toggleAspectLock}
		>
			{#if lockAspect}
				<Link size={14} />
			{:else}
				<Unlink size={14} />
			{/if}
		</button>

		<div class="flex-1">
			<label for="resize-height" class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Height</label>
			<div class="relative">
				<input
					id="resize-height"
					type="number"
					value={heightValue}
					min="1"
					on:input={handleHeightInput}
					class={cn(
						'w-full rounded-lg border bg-white px-3 py-2 pr-8 text-sm tabular-nums transition-colors',
						'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
						'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
					)}
				/>
				<span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#CBD5E1] dark:text-slate-600">px</span>
			</div>
		</div>

		<button
			class="mb-0.5 rounded-md p-2 text-[#CBD5E1] transition-colors hover:bg-black/5 hover:text-[#94A3B8] dark:text-slate-600 dark:hover:bg-white/5 dark:hover:text-slate-400"
			title="Swap dimensions"
			on:click={handleSwapDimensions}
		>
			<ArrowLeftRight size={14} />
		</button>
	</div>

	<div class="grid grid-cols-2 gap-2">
		<div>
			<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Scale</span>
			<Select items={scaleItems} bind:value={scaleValue} icon={Scaling} placeholder="Scale..." on:change={handleScaleChange} />
		</div>
		<div>
			<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Longest side</span>
			<div class="relative">
				<input
					id="resize-fitmax"
					type="number"
					placeholder="e.g. 1280"
					value={fitMaxValue}
					min="1"
					on:input={handleFitMax}
					class={cn(
						'w-full rounded-lg border bg-white px-3 py-2 pr-8 text-sm transition-colors',
						'border-[#E2E8F0] text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
						'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
					)}
				/>
				<span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#CBD5E1] dark:text-slate-600">px</span>
			</div>
		</div>
	</div>

	<div>
		<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Presets</span>
		<Select items={presetItems} bind:value={presetValue} icon={LayoutGrid} placeholder="Choose a preset..." on:change={handlePresetChange} />
	</div>
</div>

<!-- DIVIDER -->
<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />

<!-- OUTPUT -->
<div class="space-y-3">
	<h3 class="text-xs font-semibold uppercase tracking-wide text-[#94A3B8] dark:text-slate-500">Output</h3>

	<div class="grid grid-cols-2 gap-2">
		<div>
			<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Format</span>
			<Select items={formatItems} bind:value={formatValue} icon={FileImage} on:change={handleFormatChange} />
		</div>
		<div>
			<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Algorithm</span>
			<Select items={algorithmItems} bind:value={algorithmValue} icon={Sparkles} on:change={handleAlgorithmChange} />
		</div>
	</div>

	<div>
		<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Fit mode</span>
		<Select items={fitModeItems} bind:value={fitModeValue} icon={Crop} on:change={handleFitModeChange} />
	</div>

	{#if showQuality}
		<div>
			<div class="mb-1 flex items-center justify-between">
				<label for="output-quality" class="text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Quality</label>
				<span class="text-[11px] font-semibold tabular-nums text-[#0891B2] dark:text-[#22D3EE]">{currentSettings.quality}</span>
			</div>
			<input
				id="output-quality"
				type="range"
				min="1"
				max="100"
				value={currentSettings.quality}
				on:input={handleQualityChange}
				class="h-1.5 w-full appearance-none rounded-full bg-[#E2E8F0] accent-[#0891B2] dark:bg-[#2A2578] dark:accent-[#22D3EE]"
			/>
		</div>
	{/if}

	<!-- BACKGROUND FILL -->
	<div class="space-y-2">
		<span class="block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Background fill</span>

		{#if currentSettings.format !== 'image/jpeg'}
			<div class="flex gap-1 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
				<button
					class={cn(
						'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all',
						currentSettings.bgTransparent
							? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#1E1A5E] dark:text-white'
							: 'text-[#94A3B8] hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-400'
					)}
					on:click={() => updateStore({ bgTransparent: true })}
				>
					<span class="inline-block h-3 w-3 rounded-sm" style="background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 6px 6px; background-position: 0 0, 0 3px, 3px -3px, -3px 0px;" />
					Transparent
				</button>
				<button
					class={cn(
						'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all',
						!currentSettings.bgTransparent
							? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#1E1A5E] dark:text-white'
							: 'text-[#94A3B8] hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-400'
					)}
					on:click={() => updateStore({ bgTransparent: false })}
				>
					<span class="inline-block h-3 w-3 rounded-sm border border-[#E2E8F0] dark:border-[#2A2578]" style="background-color: {currentSettings.bgColor};" />
					Color
				</button>
			</div>
		{/if}

		{#if currentSettings.format === 'image/jpeg' || !currentSettings.bgTransparent}
			<ColorPicker value={currentSettings.bgColor} on:input={(e) => handleBgColorChange(e)} />
			{#if currentSettings.format === 'image/jpeg'}
				<p class="text-[11px] text-[#CBD5E1] dark:text-slate-600">JPEG doesn't support transparency</p>
			{/if}
		{/if}
	</div>

	<!-- FILENAME (single mode only) -->
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
