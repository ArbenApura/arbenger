<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { products } from '$lib/data/products';

	// IMPORTED COMPONENTS
	import MinorProjectCard from '$lib/components/projects/MinorProjectCard.svelte';

	// -- REACTIVE STATES -- //

	$: liveProducts = products.filter((p) => p.status === 'live');
</script>

<!-- MINOR TOOLS SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 md:py-24 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Still live</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				Small tools I've shipped
			</h2>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Free browser tools and Chrome extensions — all private, no uploads, no accounts.
			</p>
		</div>

		<!-- TOOL CARDS -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each liveProducts as product, i}
				<MinorProjectCard {product} delay={i * 80} />
			{/each}
		</div>
	</div>
</section>
