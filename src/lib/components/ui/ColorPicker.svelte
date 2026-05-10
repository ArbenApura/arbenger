<script lang="ts" context="module">
	function portal(node: HTMLElement, target: HTMLElement) {
		target.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) {
					node.parentNode.removeChild(node);
				}
			},
		};
	}
</script>

<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Pipette } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let value: string = '#ffffff';

	// -- OPTIONAL PROPS -- //

	export let presets: string[] = [
		'#FFFFFF', '#000000', '#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', '#3B82F6',
		'#8B5CF6', '#EC4899', '#F8FAFC', '#E2E8F0', '#94A3B8', '#475569', '#1E293B', '#0F172A',
	];
	let className: string = '';
	export { className as class };

	// -- TYPES -- //

	type InputMode = 'hex' | 'rgb' | 'hsv';

	// -- STATES -- //

	let open = false;
	let triggerEl: HTMLButtonElement;
	let popoverEl: HTMLDivElement;
	let portalTarget: HTMLDivElement;
	let satValCanvas: HTMLCanvasElement;
	let hueCanvas: HTMLCanvasElement;
	let isDraggingSV = false;
	let isDraggingHue = false;
	let hexInput = value;
	let popoverStyle = '';
	let inputMode: InputMode = 'hex';
	let initialValue = value;

	let hue = 0;
	let sat = 0;
	let val = 100;

	// -- REACTIVE STATES -- //

	$: svPosX = sat;
	$: svPosY = 100 - val;
	$: huePos = (hue / 360) * 100;
	$: rgb = hexToRGB(value);

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ input: string }>();

	function hexToRGB(hex: string): { r: number; g: number; b: number } {
		hex = hex.replace('#', '');
		if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
		return {
			r: parseInt(hex.substring(0, 2), 16),
			g: parseInt(hex.substring(2, 4), 16),
			b: parseInt(hex.substring(4, 6), 16),
		};
	}

	function rgbToHex(r: number, g: number, b: number): string {
		const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	function hexToHSV(hex: string): { h: number; s: number; v: number } {
		const { r, g, b } = hexToRGB(hex);
		const rn = r / 255, gn = g / 255, bn = b / 255;
		const max = Math.max(rn, gn, bn);
		const min = Math.min(rn, gn, bn);
		const d = max - min;

		let h = 0;
		if (d !== 0) {
			if (max === rn) h = ((gn - bn) / d + 6) % 6;
			else if (max === gn) h = (bn - rn) / d + 2;
			else h = (rn - gn) / d + 4;
			h *= 60;
		}
		return { h, s: max === 0 ? 0 : (d / max) * 100, v: max * 100 };
	}

	function hsvToHex(h: number, s: number, v: number): string {
		s /= 100; v /= 100;
		const c = v * s;
		const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
		const m = v - c;
		let r = 0, g = 0, b = 0;

		if (h < 60) { r = c; g = x; }
		else if (h < 120) { r = x; g = c; }
		else if (h < 180) { g = c; b = x; }
		else if (h < 240) { g = x; b = c; }
		else if (h < 300) { r = x; b = c; }
		else { r = c; b = x; }

		const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
	}

	function hueToColor(h: number): string {
		return hsvToHex(h, 100, 100);
	}

	function syncFromHSV() {
		value = hsvToHex(hue, sat, val);
		hexInput = value;
		dispatch('input', value);
	}

	function syncFromHex(hex: string) {
		if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return;
		const hsv = hexToHSV(hex);
		hue = hsv.h; sat = hsv.s; val = hsv.v;
		value = hex;
		hexInput = hex;
		dispatch('input', hex);
		drawSatVal();
	}

	function syncFromRGB(r: number, g: number, b: number) {
		const hex = rgbToHex(r, g, b);
		syncFromHex(hex);
	}

	function drawSatVal() {
		if (!satValCanvas) return;
		const ctx = satValCanvas.getContext('2d')!;
		const w = satValCanvas.width;
		const h = satValCanvas.height;
		const hueColor = hueToColor(hue);
		const gW = ctx.createLinearGradient(0, 0, w, 0);
		gW.addColorStop(0, '#ffffff');
		gW.addColorStop(1, hueColor);
		ctx.fillStyle = gW;
		ctx.fillRect(0, 0, w, h);
		const gB = ctx.createLinearGradient(0, 0, 0, h);
		gB.addColorStop(0, 'rgba(0,0,0,0)');
		gB.addColorStop(1, '#000000');
		ctx.fillStyle = gB;
		ctx.fillRect(0, 0, w, h);
	}

	function drawHue() {
		if (!hueCanvas) return;
		const ctx = hueCanvas.getContext('2d')!;
		const w = hueCanvas.width;
		const h = hueCanvas.height;
		const grad = ctx.createLinearGradient(0, 0, w, 0);
		for (let i = 0; i <= 6; i++) grad.addColorStop(i / 6, hueToColor(i * 60));
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
	}

	function handleSVPointer(e: PointerEvent) {
		if (!satValCanvas) return;
		const rect = satValCanvas.getBoundingClientRect();
		sat = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
		val = Math.max(0, Math.min(100, (1 - (e.clientY - rect.top) / rect.height) * 100));
		syncFromHSV();
		drawSatVal();
	}

	function handleHuePointer(e: PointerEvent) {
		if (!hueCanvas) return;
		const rect = hueCanvas.getBoundingClientRect();
		hue = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360));
		syncFromHSV();
		drawSatVal();
	}

	function handleSVDown(e: PointerEvent) { isDraggingSV = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); handleSVPointer(e); }
	function handleSVMove(e: PointerEvent) { if (isDraggingSV) handleSVPointer(e); }
	function handleSVUp() { isDraggingSV = false; }
	function handleHueDown(e: PointerEvent) { isDraggingHue = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); handleHuePointer(e); }
	function handleHueMove(e: PointerEvent) { if (isDraggingHue) handleHuePointer(e); }
	function handleHueUp() { isDraggingHue = false; }

	function handleHexInput(e: Event) {
		hexInput = (e.target as HTMLInputElement).value;
		syncFromHex(hexInput);
	}

	function handleRGBInput(channel: 'r' | 'g' | 'b', e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value) || 0;
		const c = { ...rgb, [channel]: Math.max(0, Math.min(255, v)) };
		syncFromRGB(c.r, c.g, c.b);
	}

	function handleHSVInput(channel: 'h' | 's' | 'v', e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value) || 0;
		if (channel === 'h') hue = Math.max(0, Math.min(360, v));
		else if (channel === 's') sat = Math.max(0, Math.min(100, v));
		else val = Math.max(0, Math.min(100, v));
		syncFromHSV();
		drawSatVal();
	}

	function handleRGBSlider(channel: 'r' | 'g' | 'b', e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value);
		const c = { ...rgb, [channel]: v };
		syncFromRGB(c.r, c.g, c.b);
	}

	function handleHSVSlider(channel: 'h' | 's' | 'v', e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value);
		if (channel === 'h') hue = v;
		else if (channel === 's') sat = v;
		else val = v;
		syncFromHSV();
		drawSatVal();
	}

	function selectPreset(color: string) {
		syncFromHex(color);
	}

	function updatePosition() {
		if (!triggerEl) return;
		const rect = triggerEl.getBoundingClientRect();
		const pw = 280;
		const ph = 420;
		let left = rect.left;
		let top = rect.bottom + 6;
		if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
		if (left < 8) left = 8;
		if (top + ph > window.innerHeight - 8) top = rect.top - ph - 6;
		popoverStyle = `position:fixed;left:${left}px;top:${top}px;width:${pw}px;z-index:9999;`;
	}

	async function toggle() {
		open = !open;
		if (open) {
			initialValue = value;
			const hsv = hexToHSV(value);
			hue = hsv.h; sat = hsv.s; val = hsv.v;
			hexInput = value;
			updatePosition();
			await tick();
			requestAnimationFrame(() => { drawSatVal(); drawHue(); });
		}
	}

	function handleClickOutside(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		if (triggerEl?.contains(target) || popoverEl?.contains(target)) return;
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) { e.stopPropagation(); open = false; }
	}

	function handleScroll() { if (open) updatePosition(); }

	// -- CONSTANTS -- //

	const INPUT_CLASS = 'rounded-md border bg-white px-1.5 py-1 text-center font-mono text-[11px] tabular-nums border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE]';
	const SLIDER_CLASS = 'h-1.5 min-w-0 flex-1 appearance-none rounded-full bg-[#E2E8F0] dark:bg-[#2A2578]';

	// -- LIFECYCLES -- //

	onMount(() => {
		portalTarget = document.createElement('div');
		document.body.appendChild(portalTarget);
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleScroll);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleScroll);
			if (portalTarget?.parentNode) portalTarget.parentNode.removeChild(portalTarget);
		}
	});
</script>

<div class={cn('relative', className)}>
	<button
		bind:this={triggerEl}
		class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-2 py-1.5 transition-all hover:border-[#0891B2] dark:border-[#2A2578] dark:hover:border-[#22D3EE]"
		on:click={toggle}
	>
		<span class="h-6 w-6 shrink-0 rounded-md border border-black/10" style="background-color: {value};" />
		<span class="font-mono text-xs uppercase text-[#334155] dark:text-slate-300">{value}</span>
		<Pipette size={12} class="text-[#94A3B8] dark:text-slate-500" />
	</button>
</div>

{#if open && portalTarget}
	<div
		bind:this={popoverEl}
		use:portal={portalTarget}
		transition:fly={{ y: -8, duration: 180, easing: cubicOut }}
		class="rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-xl dark:border-[#2A2578] dark:bg-[#1E1A5E]"
		style={popoverStyle}
	>
		<!-- SATURATION / VALUE -->
		<div class="relative mb-5" style="height: 150px;">
			<canvas
				bind:this={satValCanvas}
				width={280}
				height={150}
				class="h-full w-full rounded-lg"
				on:pointerdown={handleSVDown}
				on:pointermove={handleSVMove}
				on:pointerup={handleSVUp}
			/>
			<div
				class="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]"
				style="left: {svPosX}%; top: {svPosY}%; background-color: {value};"
			/>
		</div>

		<!-- HUE -->
		<div class="relative mb-4" style="height: 14px;">
			<canvas
				bind:this={hueCanvas}
				width={280}
				height={14}
				class="h-full w-full rounded-full"
				on:pointerdown={handleHueDown}
				on:pointermove={handleHueMove}
				on:pointerup={handleHueUp}
			/>
			<div
				class="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.3)]"
				style="left: {huePos}%; background-color: {hsvToHex(hue, 100, 100)};"
			/>
		</div>

		<!-- MODE TABS -->
		<div class="mb-3 flex gap-0.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-0.5 dark:border-[#2A2578] dark:bg-[#0B0A23]/50">
			<button
				class={cn('flex-1 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all', inputMode === 'hex' ? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#1E1A5E] dark:text-white' : 'text-[#94A3B8] hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-400')}
				on:click={() => (inputMode = 'hex')}
			>HEX</button>
			<button
				class={cn('flex-1 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all', inputMode === 'rgb' ? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#1E1A5E] dark:text-white' : 'text-[#94A3B8] hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-400')}
				on:click={() => (inputMode = 'rgb')}
			>RGB</button>
			<button
				class={cn('flex-1 rounded-md px-2 py-1 text-[11px] font-semibold uppercase tracking-wide transition-all', inputMode === 'hsv' ? 'bg-white text-[#0F172A] shadow-sm dark:bg-[#1E1A5E] dark:text-white' : 'text-[#94A3B8] hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-400')}
				on:click={() => (inputMode = 'hsv')}
			>HSV</button>
		</div>

		<!-- INPUT FIELDS -->
		{#if inputMode === 'hex'}
			<div class="mb-3 flex items-center gap-2">
				<span class="h-8 w-8 shrink-0 rounded-lg border border-black/10" style="background-color: {value};" />
				<input
					type="text"
					value={hexInput}
					on:input={handleHexInput}
					maxlength="7"
					class={cn(
						'min-w-0 flex-1 rounded-lg border bg-white px-2.5 py-1.5 font-mono text-xs uppercase transition-colors',
						'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
						'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
					)}
				/>
			</div>
		{:else if inputMode === 'rgb'}
			<div class="mb-3 space-y-2">
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">R</span>
					<input type="range" min="0" max="255" value={rgb.r} on:input={(e) => handleRGBSlider('r', e)} class="{SLIDER_CLASS} accent-[#EF4444]" />
					<input type="number" min="0" max="255" value={rgb.r} on:input={(e) => handleRGBInput('r', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">G</span>
					<input type="range" min="0" max="255" value={rgb.g} on:input={(e) => handleRGBSlider('g', e)} class="{SLIDER_CLASS} accent-[#22C55E]" />
					<input type="number" min="0" max="255" value={rgb.g} on:input={(e) => handleRGBInput('g', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">B</span>
					<input type="range" min="0" max="255" value={rgb.b} on:input={(e) => handleRGBSlider('b', e)} class="{SLIDER_CLASS} accent-[#3B82F6]" />
					<input type="number" min="0" max="255" value={rgb.b} on:input={(e) => handleRGBInput('b', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
			</div>
		{:else}
			<div class="mb-3 space-y-2">
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">H</span>
					<input type="range" min="0" max="360" value={Math.round(hue)} on:input={(e) => handleHSVSlider('h', e)} class="{SLIDER_CLASS} accent-[#0891B2] dark:accent-[#22D3EE]" />
					<input type="number" min="0" max="360" value={Math.round(hue)} on:input={(e) => handleHSVInput('h', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">S</span>
					<input type="range" min="0" max="100" value={Math.round(sat)} on:input={(e) => handleHSVSlider('s', e)} class="{SLIDER_CLASS} accent-[#0891B2] dark:accent-[#22D3EE]" />
					<input type="number" min="0" max="100" value={Math.round(sat)} on:input={(e) => handleHSVInput('s', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
				<div class="flex items-center gap-2">
					<span class="w-4 text-center text-[10px] font-bold text-[#94A3B8] dark:text-slate-500">V</span>
					<input type="range" min="0" max="100" value={Math.round(val)} on:input={(e) => handleHSVSlider('v', e)} class="{SLIDER_CLASS} accent-[#0891B2] dark:accent-[#22D3EE]" />
					<input type="number" min="0" max="100" value={Math.round(val)} on:input={(e) => handleHSVInput('v', e)} class="{INPUT_CLASS} w-12 shrink-0" />
				</div>
			</div>
		{/if}

		<!-- PRESETS -->
		<div class="grid grid-cols-8 gap-1.5">
			{#each presets as color}
				<button
					class={cn(
						'aspect-square w-full rounded-md border transition-all hover:scale-110',
						value.toLowerCase() === color.toLowerCase()
							? 'border-[#0891B2] ring-1 ring-[#0891B2] dark:border-[#22D3EE] dark:ring-[#22D3EE]'
							: 'border-black/10'
					)}
					style="background-color: {color};"
					title={color}
					on:click={() => selectPreset(color)}
				/>
			{/each}
		</div>

		<!-- ACTIONS -->
		<div class="mt-3 flex items-center justify-between border-t border-[#E2E8F0] pt-3 dark:border-white/10">
			<button
				class="text-xs font-medium text-[#94A3B8] transition-colors hover:text-[#64748B] dark:text-slate-500 dark:hover:text-slate-300"
				on:click={() => { selectPreset(initialValue); }}
			>
				Reset
			</button>
			<button
				class="rounded-lg bg-[#0891B2] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
				on:click={toggle}
			>
				Done
			</button>
		</div>
	</div>
{/if}
