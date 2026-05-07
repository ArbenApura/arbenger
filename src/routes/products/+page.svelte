<script lang="ts">
	// IMPORTED TYPES
	import type { ProductCategory } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket } from 'lucide-svelte';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { categories } from '$lib/data/products';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	// -- TYPES -- //

	type FilterOption = 'all' | ProductCategory;

	// -- CONSTANTS -- //

	const FILTERS: { label: string; value: FilterOption }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'VS Code', value: 'vscode-extensions' },
		{ label: 'Chrome', value: 'chrome-plugins' },
		{ label: 'AI Tools', value: 'ai-tools' },
		{ label: 'Misc', value: 'misc-tools' },
		{ label: 'SaaS', value: 'saas' },
	];

	const ICON_MAP: Record<string, typeof Code> = {
		code: Code,
		brain: Brain,
		wrench: Wrench,
		rocket: Rocket,
	};

	// -- STATES -- //

	let activeFilter: FilterOption = 'all';

	// -- REACTIVE STATES -- //

	$: filteredCategories = activeFilter === 'all' ? categories : categories.filter((c) => c.id === activeFilter);
</script>

<MetaTags
	title="Products | Arbenger"
	description="Explore Arbenger's catalog of AI tools, VS Code extensions, Chrome plugins, and SaaS products for developers and creators."
	url="https://arbenger.com/products"
/>

<!-- PAGE HERO -->
<section class="relative pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<SectionLabel label="PRODUCTS" />

		<h1 class="font-display text-4xl font-bold tracking-tight text-[#161446] md:text-5xl dark:text-white">Our Products</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#334155] dark:text-slate-300">
			Tools and products built for developers and creators. More coming soon.
		</p>
	</div>
</section>

<!-- FILTER TABS -->
<section class="relative pb-8">
	<div use:reveal={{ delay: 100 }} class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex flex-wrap gap-2">
			{#each FILTERS as filter}
				<button
					on:click={() => (activeFilter = filter.value)}
					class={cn(
						'rounded-lg px-4 py-2 font-mono text-sm transition-all duration-200',
						activeFilter === filter.value
							? 'bg-[#22D3EE] text-[#0B0A23]'
							: 'border border-[#E2E8F0] text-[#334155] hover:border-[#22D3EE]/50 hover:text-[#22D3EE] dark:border-[#2A2578] dark:text-slate-300',
					)}
				>
					{filter.label}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- PRODUCT GRID -->
<section class="relative pb-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredCategories as category, i (category.id)}
				<div use:reveal={{ delay: i * 80 }}>
					<Card>
						<!-- CATEGORY ICON -->
						<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#22D3EE]/10">
							{#if category.icon === 'chrome'}
								<!-- INLINE SVG FOR CHROME — BRAND ICONS REMOVED IN LUCIDE V1+ -->
								<svg
									class="size-6 text-[#22D3EE]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									xmlns="http://www.w3.org/2000/svg"
								>
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
						<h2 class="font-display text-lg font-bold tracking-tight text-[#161446] dark:text-white">
							{category.name}
						</h2>

						<!-- CATEGORY DESCRIPTION -->
						<p class="mt-2 text-sm text-[#334155] dark:text-slate-300">
							{category.description}
						</p>

						<!-- STATUS AND COUNT -->
						<div class="mt-4 flex items-center justify-between">
							<Badge variant="cyan">Coming soon</Badge>
							<span class="text-xs text-[#94A3B8] dark:text-slate-500">
								{category.productCount}
								{category.productCount === 1 ? 'product' : 'products'}
							</span>
						</div>
					</Card>
				</div>
			{/each}
		</div>

		<!-- EMPTY STATE -->
		{#if filteredCategories.length === 0}
			<div class="py-16 text-center">
				<p class="font-mono text-sm text-[#64748B] dark:text-slate-400">No products in this category yet.</p>
			</div>
		{/if}
	</div>
</section>
