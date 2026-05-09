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
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import CategoryIllustration from '$lib/components/ui/CategoryIllustration.svelte';
	import EmptyStateIllustration from '$lib/components/ui/EmptyStateIllustration.svelte';

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
	title="Products — Extensions, Plugins & AI Tools | Arbenger"
	description="Browse Arbenger's full product catalog. VS Code extensions, Chrome plugins, AI tools, and web applications — all in one place. More coming soon."
	url="https://arbenger.com/products"
/>

<Breadcrumbs pageName="Products" pageUrl="https://arbenger.com/products" />

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Products</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Our Products
		</h1>

		<p class="mt-6 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Everything in one place. More on the way.
		</p>
	</div>
</section>

<!-- FILTER TABS -->
<section class="relative overflow-hidden pb-8">
	<div use:reveal={{ delay: 100 }} class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="flex flex-wrap gap-2">
			{#each FILTERS as filter}
				<button
					on:click={() => (activeFilter = filter.value)}
					class={cn(
						'rounded-lg px-4 py-2 font-mono text-sm transition-all duration-200',
						activeFilter === filter.value
							? 'bg-[#0F172A] text-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:shadow-none'
							: 'border border-[#E2E8F0] text-[#475569] hover:border-[#0891B2]/50 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-300 dark:hover:border-[#22D3EE]/50 dark:hover:text-[#22D3EE]',
					)}
				>
					{filter.label}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- PRODUCT LIST -->
<section class="relative overflow-hidden pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="space-y-4">
			{#each filteredCategories as category, i (category.id)}
				<div
					use:reveal={{ delay: i * 80 }}
					class="group flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-white px-4 py-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 sm:px-8 sm:py-6 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]"
				>
					<div class="flex items-center gap-3 sm:gap-6">
						<!-- CATEGORY ICON -->
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
							{#if category.icon === 'chrome'}
								<!-- INLINE SVG FOR CHROME — BRAND ICONS REMOVED IN LUCIDE V1+ -->
								<svg
									class="size-6 text-[#0891B2] dark:text-[#22D3EE]"
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
								<svelte:component this={ICON_MAP[category.icon]} class="size-6 text-[#0891B2] dark:text-[#22D3EE]" />
							{/if}
						</div>

						<!-- CATEGORY INFO -->
						<div>
							<h2 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
								{category.name}
							</h2>
							<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">
								{category.description}
							</p>
						</div>
					</div>

					<!-- ILLUSTRATION + STATUS -->
					<div class="flex shrink-0 items-center gap-6">
						<div class="hidden md:block">
							<CategoryIllustration category={category.id} />
						</div>
						<div class="flex items-center gap-4">
							<span class="hidden text-xs text-[#94A3B8] sm:block dark:text-slate-500">
								{category.productCount}
								{category.productCount === 1 ? 'product' : 'products'}
							</span>
							<Badge variant="cyan">Coming soon</Badge>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- EMPTY STATE -->
		{#if filteredCategories.length === 0}
			<div class="py-16 text-center">
				<EmptyStateIllustration />
				<p class="mt-6 font-mono text-sm text-[#64748B] dark:text-slate-400">Nothing here yet. Check back soon.</p>
			</div>
		{/if}
	</div>
</section>
