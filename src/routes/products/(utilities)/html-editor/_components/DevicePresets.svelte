<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { devicePreset, deviceRotated } from '../_lib/store';
	import type { DevicePreset } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Maximize, Monitor, Smartphone, Tablet, RotateCw } from 'lucide-svelte';

	// -- TYPES -- //

	type PresetConfig = {
		id: DevicePreset;
		label: string;
		icon: typeof Monitor;
		width: number;
		height: number;
	};

	// -- CONSTANTS -- //

	const PRESETS: PresetConfig[] = [
		{ id: 'mobile', label: 'Mobile', icon: Smartphone, width: 375, height: 667 },
		{ id: 'tablet', label: 'Tablet', icon: Tablet, width: 768, height: 1024 },
		{ id: 'desktop', label: 'Desktop', icon: Monitor, width: 1440, height: 900 },
	];

	// -- REACTIVE STATES -- //

	$: activePreset = PRESETS.find((p) => p.id === $devicePreset);
	$: displayWidth = activePreset
		? $deviceRotated
			? activePreset.height
			: activePreset.width
		: null;
	$: displayHeight = activePreset
		? $deviceRotated
			? activePreset.width
			: activePreset.height
		: null;

	// -- FUNCTIONS -- //

	function setPreset(id: DevicePreset) {
		devicePreset.set(id);
		deviceRotated.set(false);
	}
</script>

<div class="flex items-center gap-1">
	{#each PRESETS as preset}
		<button
			class={cn(
				'rounded p-1 transition-colors',
				$devicePreset === preset.id
					? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
					: 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white'
			)}
			on:click={() => setPreset(preset.id)}
			title={preset.label}
		>
			<svelte:component this={preset.icon} size={14} />
		</button>
	{/each}

	<button
		class={cn(
			'rounded p-1 transition-colors',
			$devicePreset === 'full'
				? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
				: 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white'
		)}
		on:click={() => setPreset('full')}
		title="Full Width"
	>
		<Maximize size={14} />
	</button>

	{#if $devicePreset !== 'full'}
		<div class="mx-1 h-3 w-px bg-[#e2e8f0] dark:bg-[#1E1A5E]" />

		<button
			class={cn(
				'rounded p-1 transition-colors',
				$deviceRotated
					? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
					: 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white'
			)}
			on:click={() => deviceRotated.update((v) => !v)}
			title="Rotate"
		>
			<RotateCw size={14} />
		</button>

		<span class="ml-1 text-[10px] tabular-nums text-[#94A3B8] dark:text-slate-500">
			{displayWidth} × {displayHeight}
		</span>
	{/if}
</div>
