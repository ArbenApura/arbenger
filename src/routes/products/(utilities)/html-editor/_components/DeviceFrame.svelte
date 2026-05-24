<script lang="ts">
	// IMPORTED MODULES
	import { devicePreset, deviceRotated } from '../_lib/store';
	import type { DevicePreset } from '../_lib/store';

	// -- CONSTANTS -- //

	const SIZES: Record<Exclude<DevicePreset, 'full'>, { w: number; h: number }> = {
		mobile: { w: 375, h: 667 },
		tablet: { w: 768, h: 1024 },
		desktop: { w: 1440, h: 900 },
	};

	// -- REACTIVE STATES -- //

	$: preset = $devicePreset === 'full' ? null : $devicePreset;
	$: dims = preset ? SIZES[preset] : null;
	$: screenW = dims ? ($deviceRotated ? dims.h : dims.w) : 0;
	$: screenH = dims ? ($deviceRotated ? dims.w : dims.h) : 0;
</script>

{#if !preset}
	<!-- FULL WIDTH — NO FRAME -->
	<div class="h-full w-full">
		<slot />
	</div>
{:else if preset === 'mobile'}
	<!-- PHONE FRAME -->
	<div class="flex min-h-full w-full items-start justify-center overflow-auto p-6">
		<div
			class="relative shrink-0 rounded-[40px] border-[3px] border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_0_0_2px_#2a2a4e,0_20px_60px_rgba(0,0,0,0.3)] dark:border-[#2a2a4e] dark:bg-[#1a1a2e] dark:shadow-[0_0_0_2px_#0B0A23,0_20px_60px_rgba(0,0,0,0.5)]"
			style="width: {screenW + 24}px; height: {screenH + 100}px;"
		>
			<!-- NOTCH / DYNAMIC ISLAND -->
			<div class="absolute left-1/2 top-[10px] z-10 -translate-x-1/2">
				<div class="h-[22px] w-[80px] rounded-full bg-[#0d0d1a]" />
			</div>

			<!-- SIDE BUTTONS -->
			<div class="absolute -left-[5px] top-[120px] h-[30px] w-[3px] rounded-l-sm bg-[#2a2a4e]" />
			<div class="absolute -left-[5px] top-[170px] h-[50px] w-[3px] rounded-l-sm bg-[#2a2a4e]" />
			<div class="absolute -left-[5px] top-[230px] h-[50px] w-[3px] rounded-l-sm bg-[#2a2a4e]" />
			<div class="absolute -right-[5px] top-[160px] h-[60px] w-[3px] rounded-r-sm bg-[#2a2a4e]" />

			<!-- SCREEN -->
			<div
				class="absolute left-[12px] top-[46px] overflow-hidden rounded-[28px] bg-white"
				style="width: {screenW}px; height: {screenH}px;"
			>
				<slot />
			</div>

			<!-- HOME INDICATOR -->
			<div class="absolute bottom-[8px] left-1/2 -translate-x-1/2">
				<div class="h-[4px] w-[100px] rounded-full bg-[#3a3a5e]" />
			</div>
		</div>
	</div>
{:else if preset === 'tablet'}
	<!-- TABLET FRAME -->
	<div class="flex min-h-full w-full items-start justify-center overflow-auto p-6">
		<div
			class="relative shrink-0 rounded-[20px] border-[3px] border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_0_0_2px_#2a2a4e,0_20px_60px_rgba(0,0,0,0.3)] dark:border-[#2a2a4e] dark:bg-[#1a1a2e] dark:shadow-[0_0_0_2px_#0B0A23,0_20px_60px_rgba(0,0,0,0.5)]"
			style="width: {screenW + 32}px; height: {screenH + 32}px;"
		>
			<!-- CAMERA -->
			<div class="absolute left-1/2 top-[6px] z-10 -translate-x-1/2">
				<div class="h-[4px] w-[4px] rounded-full bg-[#2a2a4e]" />
			</div>

			<!-- SCREEN -->
			<div
				class="absolute left-[16px] top-[16px] overflow-hidden rounded-[8px] bg-white"
				style="width: {screenW}px; height: {screenH}px;"
			>
				<slot />
			</div>
		</div>
	</div>
{:else if preset === 'desktop'}
	<!-- MONITOR FRAME -->
	<div class="flex min-h-full w-full flex-col items-center justify-start overflow-auto p-6 pt-8">
		<!-- MONITOR -->
		<div
			class="relative shrink-0 rounded-t-[8px] border-[3px] border-b-[16px] border-[#1a1a2e] bg-[#1a1a2e] shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:border-[#2a2a4e] dark:bg-[#1a1a2e] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
			style="width: {screenW + 20}px; height: {screenH + 30}px;"
		>
			<!-- WEBCAM -->
			<div class="absolute left-1/2 top-[3px] z-10 -translate-x-1/2">
				<div class="h-[3px] w-[3px] rounded-full bg-[#2a2a4e]" />
			</div>

			<!-- SCREEN -->
			<div
				class="absolute left-[10px] top-[10px] overflow-hidden rounded-[2px] bg-white"
				style="width: {screenW}px; height: {screenH}px;"
			>
				<slot />
			</div>

			<!-- CHIN LOGO -->
			<div class="absolute bottom-[-12px] left-1/2 -translate-x-1/2">
				<div class="h-[3px] w-[20px] rounded-full bg-[#3a3a5e]" />
			</div>
		</div>

		<!-- STAND NECK -->
		<div class="h-[20px] w-[40px] shrink-0 bg-[#1a1a2e] dark:bg-[#2a2a4e]" />

		<!-- STAND BASE -->
		<div class="h-[6px] w-[120px] shrink-0 rounded-b-md rounded-t-sm bg-[#1a1a2e] shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:bg-[#2a2a4e]" />
	</div>
{/if}
