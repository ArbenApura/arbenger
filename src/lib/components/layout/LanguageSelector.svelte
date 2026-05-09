<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	import { ChevronDown, Check } from 'lucide-svelte';

	// IMPORTED MODULES
	import { locales } from '$lib/data/locales';

	// IMPORTED STORES
	import { locale } from '$lib/stores/locale';

	// -- OPTIONAL PROPS -- //

	export let direction: 'up' | 'down' = 'down';

	// -- CONSTANTS -- //

	// INLINE SVG FLAG PATHS — SIMPLIFIED DESIGNS FOR SMALL DISPLAY SIZES
	const FLAGS: Record<string, { viewBox: string; content: string }> = {
		us: {
			viewBox: '0 0 24 16',
			content:
				'<rect width="24" height="16" rx="1.5" fill="#B22234"/>' +
				'<rect y="1.23" width="24" height="1.23" fill="white"/>' +
				'<rect y="3.69" width="24" height="1.23" fill="white"/>' +
				'<rect y="6.15" width="24" height="1.23" fill="white"/>' +
				'<rect y="8.62" width="24" height="1.23" fill="white"/>' +
				'<rect y="11.08" width="24" height="1.23" fill="white"/>' +
				'<rect y="13.54" width="24" height="1.23" fill="white"/>' +
				'<rect width="10" height="8.62" rx="1" fill="#3C3B6E"/>',
		},
		es: {
			viewBox: '0 0 24 16',
			content:
				'<rect width="24" height="16" rx="1.5" fill="#C60B1E"/>' +
				'<rect y="4" width="24" height="8" fill="#FFC400"/>',
		},
		fr: {
			viewBox: '0 0 24 16',
			content:
				'<rect width="24" height="16" rx="1.5" fill="#EF4135"/>' +
				'<rect width="16" height="16" rx="1" fill="white"/>' +
				'<rect width="8" height="16" rx="1" fill="#002395"/>',
		},
		jp: {
			viewBox: '0 0 24 16',
			content:
				'<rect width="24" height="16" rx="1.5" fill="white"/>' +
				'<circle cx="12" cy="8" r="4.5" fill="#BC002D"/>',
		},
	};

	// -- STATES -- //

	let isOpen = false;

	let dropdownRef: HTMLDivElement;

	// -- FUNCTIONS -- //

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLocale(code: string) {
		locale.set(code);
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	// -- REACTIVE STATES -- //

	$: activeLocale = locales.find((l) => l.code === $locale) || locales[0];

	// -- LIFECYCLES -- //

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<!-- LANGUAGE SELECTOR DROPDOWN -->
<div bind:this={dropdownRef} class="relative">
	<!-- TRIGGER BUTTON -->
	<button
		on:click={toggleDropdown}
		class="flex items-center gap-1.5 rounded-lg p-2 text-[#475569] transition-colors duration-200 hover:bg-black/5 hover:text-[#0891B2] dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-[#22D3EE]"
		aria-label="Select language"
		aria-expanded={isOpen}
	>
		<svg class="h-4 w-5 shrink-0 overflow-hidden rounded-[2px]" viewBox={FLAGS[activeLocale.flag]?.viewBox || '0 0 24 16'}>
			{@html FLAGS[activeLocale.flag]?.content || ''}
		</svg>
		<ChevronDown class="size-3.5 transition-transform duration-200" style="transform: rotate({direction === 'up' ? (isOpen ? 0 : 180) : (isOpen ? 180 : 0)}deg);" />
	</button>

	<!-- DROPDOWN MENU -->
	{#if isOpen}
		<div class="absolute right-0 z-50 w-52 rounded-xl border border-[#E2E8F0] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] {direction === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'}">
			{#each locales as loc}
				<button
					on:click={() => loc.enabled && selectLocale(loc.code)}
					class="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-150 {loc.enabled
						? 'text-[#0F172A] hover:bg-[#F1F5F9] dark:text-white dark:hover:bg-white/5'
						: 'cursor-default text-[#94A3B8] dark:text-slate-500'}"
					disabled={!loc.enabled}
				>
					<svg class="h-3.5 w-[18px] shrink-0 overflow-hidden rounded-[2px]" viewBox={FLAGS[loc.flag]?.viewBox || '0 0 24 16'}>
						{@html FLAGS[loc.flag]?.content || ''}
					</svg>
					<span class="flex-1">{loc.label}</span>
					{#if loc.code === $locale}
						<Check class="size-4 text-[#0891B2] dark:text-[#22D3EE]" />
					{:else if !loc.enabled}
						<span class="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-medium text-[#94A3B8] dark:bg-[#2A2578]/50 dark:text-slate-500">
							Soon
						</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>
