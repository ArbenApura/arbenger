<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket } from 'lucide-svelte';

	// IMPORTED MODULES
	import { categories } from '$lib/data/products';

	// IMPORTED COMPONENTS
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

	// -- CONSTANTS -- //

	const ICON_MAP: Record<string, typeof Code> = {
		code: Code,
		brain: Brain,
		wrench: Wrench,
		rocket: Rocket
	};
</script>

<!-- PRODUCT CATEGORIES SECTION -->
<section class="relative py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="PRODUCTS" />

		<h2 class="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
			What we build
		</h2>
		<p class="mt-4 max-w-2xl text-slate-300">
			From browser extensions to AI-powered tools, we craft products that solve real problems.
		</p>

		<!-- CATEGORY GRID -->
		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each categories as category}
				<Card>
					<!-- CATEGORY ICON -->
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#22D3EE]/10">
						{#if category.icon === 'chrome'}
							<!-- INLINE SVG FOR CHROME — BRAND ICONS REMOVED IN LUCIDE V1+ -->
							<svg class="size-6 text-[#22D3EE]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
								<rect x="3" y="3" width="18" height="18" rx="2" />
								<path d="M7 7h10v10H7z" />
								<path d="M12 3v4" />
								<path d="M12 17v4" />
								<path d="M3 12h4" />
								<path d="M17 12h4" />
							</svg>
						{:else}
							<svelte:component this={ICON_MAP[category.icon]} class="size-6 text-[#22D3EE]" />
						{/if}
					</div>

					<!-- CATEGORY NAME -->
					<h3 class="font-display text-lg font-bold tracking-tight text-white">
						{category.name}
					</h3>

					<!-- CATEGORY DESCRIPTION -->
					<p class="mt-2 text-sm text-slate-300">
						{category.description}
					</p>

					<!-- STATUS BADGE -->
					<div class="mt-4 flex items-center justify-between">
						<Badge variant="cyan">Coming soon</Badge>
						<span class="text-xs text-slate-500">
							{category.productCount} {category.productCount === 1 ? 'product' : 'products'}
						</span>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>
