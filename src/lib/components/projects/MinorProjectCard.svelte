<script lang="ts">
	// IMPORTED TYPES
	import type { Product } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { ArrowRight, Image, Minimize2, Palette, Volume2, Code, Wrench } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// -- REQUIRED PROPS -- //

	export let product: Product;
	export let delay: number = 0;

	// -- CONSTANTS -- //

	const PRODUCT_ICONS: Record<string, typeof Code> = {
		'image-resizer': Image,
		'image-compressor': Minimize2,
		'color-picker': Palette,
		'sound-booster': Volume2,
		'html-editor': Code,
	};

	// -- REACTIVE STATES -- //

	$: Icon = PRODUCT_ICONS[product.slug] || Wrench;
	$: isExtension = product.category === 'chrome-plugins';
</script>

<a
	href={product.externalUrl || `/products/${product.slug}/`}
	use:reveal={{ delay }}
	class="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- TOP ROW -->
	<div class="mb-4 flex items-center justify-between">
		<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
			<Icon class="size-5 text-[#0891B2] dark:text-[#22D3EE]" />
		</div>
		{#if isExtension}
			<span class="rounded-full border border-[#E2E8F0] px-2.5 py-0.5 text-[10px] text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				Chrome extension
			</span>
		{/if}
	</div>

	<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
		{product.name}
	</h3>

	<p class="mt-2 flex-1 text-sm text-[#64748B] dark:text-slate-400">
		{product.description}
	</p>

	<!-- FOOTER -->
	<div class="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
		<span class="flex items-center gap-1.5 text-xs text-[#2DD4BF]">
			<span class="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
			Live
		</span>
		<span class="flex items-center gap-1 text-xs font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]">
			Open tool
			<ArrowRight size={13} />
		</span>
	</div>
</a>
