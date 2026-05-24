<script lang="ts">
	// IMPORTED TYPES
	import type { ProductCategory } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket, ArrowRight, Shield } from 'lucide-svelte';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { categories, products } from '$lib/data/products';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';

	// -- TYPES -- //

	type FilterOption = 'all' | ProductCategory;

	// -- CONSTANTS -- //

	const FILTERS: { label: string; value: FilterOption }[] = [
		{ label: 'All', value: 'all' },
		{ label: 'Utilities', value: 'misc-tools' },
		{ label: 'VS Code', value: 'vscode-extensions' },
		{ label: 'Chrome', value: 'chrome-plugins' },
		{ label: 'AI Tools', value: 'ai-tools' },
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

	$: liveProducts = products.filter((p) => p.status === 'live');
	$: filteredCategories = activeFilter === 'all' ? categories : categories.filter((c) => c.id === activeFilter);
</script>

<MetaTags
	title="Products — Utilities, Extensions & AI Tools | Arbenger"
	description="Browse Arbenger's product catalog. Free browser-based utilities, VS Code extensions, Chrome plugins, AI tools, and web apps. Try what's live now."
	url="https://arbenger.com/products/"
/>

<Breadcrumbs pageName="Products" pageUrl="https://arbenger.com/products/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Arbenger Products',
		url: 'https://arbenger.com/products/',
		description: 'Browse Arbenger\'s product catalog. Free browser-based utilities, Chrome extensions, AI tools, and web apps.',
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Image Resizer', url: 'https://arbenger.com/products/image-resizer/' },
				{ '@type': 'ListItem', position: 2, name: 'Image Compressor', url: 'https://arbenger.com/products/image-compressor/' },
				{ '@type': 'ListItem', position: 3, name: 'Color Picker', url: 'https://arbenger.com/products/color-picker/' },
				{ '@type': 'ListItem', position: 4, name: 'Sound Booster', url: 'https://arbenger.com/products/sound-booster/' },
				{ '@type': 'ListItem', position: 5, name: 'HTML Editor', url: 'https://arbenger.com/products/html-editor/' },
			],
		},
	}}
/>

<!-- HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="max-w-3xl">
			<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				Products
			</h1>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Browser tools, Chrome extensions, and more. Everything runs local, everything is free.
			</p>
		</div>
	</div>
</section>

<!-- LIVE PRODUCTS SPOTLIGHT -->
{#if liveProducts.length > 0}
	<section class="relative overflow-hidden pb-16">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<p use:reveal class="mb-6 text-xs font-semibold uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
				Available now
			</p>

			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each liveProducts as product, i}
					<a
						href={product.externalUrl || `/products/${product.slug}/`}
						use:reveal={{ delay: i * 80 }}
						class="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
					>
						<!-- STATUS -->
						<div class="mb-4 flex items-center gap-2">
							<span class="inline-flex items-center gap-1 rounded-full bg-[#2DD4BF]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2DD4BF]">
								<span class="h-1.5 w-1.5 rounded-full bg-[#2DD4BF]" />
								Live
							</span>
							<span class="text-[10px] text-[#94A3B8] dark:text-slate-500">
								{categories.find((c) => c.id === product.category)?.name}
							</span>
						</div>

						<!-- TITLE -->
						<h2 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
							{product.name}
						</h2>

						<!-- DESCRIPTION -->
						<p class="mt-2 flex-1 text-sm text-[#64748B] dark:text-slate-400">
							{product.description}
						</p>

						<!-- TAGS -->
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each product.tags.slice(0, 4) as tag}
								<span class="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-500">
									{tag}
								</span>
							{/each}
						</div>

						<!-- FOOTER -->
						<div class="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
							<div class="flex items-center gap-1.5 text-xs text-[#94A3B8] dark:text-slate-500">
								<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
								Free & private
							</div>
							<span class="flex items-center gap-1 text-xs font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]">
								Open tool
								<ArrowRight size={13} />
							</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- DIVIDER -->
<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<div class="border-t border-[#E2E8F0] dark:border-[#2A2578]/40" />
</div>

<!-- CATEGORIES -->
<section class="relative overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION HEADER + FILTERS -->
		<div use:reveal class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<p class="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] dark:text-slate-500">
				Browse by category
			</p>

			<div class="flex flex-wrap gap-1.5">
				{#each FILTERS as filter}
					<button
						on:click={() => (activeFilter = filter.value)}
						class={cn(
							'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200',
							activeFilter === filter.value
								? 'bg-[#0F172A] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
								: 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
						)}
					>
						{filter.label}
					</button>
				{/each}
			</div>
		</div>

		<!-- CATEGORY GRID -->
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredCategories as category, i (category.id)}
				<div
					use:reveal={{ delay: i * 60 }}
					class={cn(
						'group rounded-2xl border p-5 transition-all duration-300',
						category.productCount > 0
							? 'border-[#E2E8F0] bg-white hover:border-[#0891B2]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/30'
							: 'border-dashed border-[#E2E8F0] bg-[#F8FAFC]/50 dark:border-[#2A2578]/30 dark:bg-[#1E1A5E]/5',
					)}
				>
					<div class="flex items-start gap-4">
						<!-- ICON -->
						<div class={cn(
							'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
							category.productCount > 0
								? 'bg-[#0891B2]/10 dark:bg-[#22D3EE]/10'
								: 'bg-[#F1F5F9] dark:bg-[#2A2578]/20'
						)}>
							{#if category.icon === 'chrome'}
								<svg
									class={cn('size-5', category.productCount > 0 ? 'text-[#0891B2] dark:text-[#22D3EE]' : 'text-[#CBD5E1] dark:text-slate-600')}
									viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h10v10H7z" />
								</svg>
							{:else}
								<svelte:component
									this={ICON_MAP[category.icon]}
									class={cn('size-5', category.productCount > 0 ? 'text-[#0891B2] dark:text-[#22D3EE]' : 'text-[#CBD5E1] dark:text-slate-600')}
								/>
							{/if}
						</div>

						<!-- INFO -->
						<div class="flex-1">
							<div class="flex items-center gap-2">
								<h3 class={cn(
									'font-display text-sm font-bold tracking-tight',
									category.productCount > 0
										? 'text-[#0F172A] dark:text-white'
										: 'text-[#94A3B8] dark:text-slate-500'
								)}>
									{category.name}
								</h3>
								{#if category.productCount > 0}
									<span class="rounded-full bg-[#0891B2]/10 px-2 py-0.5 text-[9px] font-semibold tabular-nums text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
										{category.productCount}
									</span>
								{/if}
							</div>
							<p class={cn(
								'mt-1 text-xs',
								category.productCount > 0
									? 'text-[#64748B] dark:text-slate-400'
									: 'text-[#CBD5E1] dark:text-slate-600'
							)}>
								{category.description}
							</p>
						</div>
					</div>

					<!-- NESTED PRODUCTS -->
					{#each products.filter((p) => p.category === category.id) as product}
						<a
							href={product.externalUrl || `/products/${product.slug}/`}
							class="mt-3 flex items-center justify-between rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] px-3.5 py-2.5 transition-all duration-200 hover:border-[#0891B2]/20 hover:bg-white dark:border-[#2A2578]/30 dark:bg-[#0B0A23]/30 dark:hover:border-[#22D3EE]/20 dark:hover:bg-[#1E1A5E]/30"
						>
							<span class="text-xs font-medium text-[#334155] dark:text-slate-300">{product.name}</span>
							<ArrowRight size={13} class="text-[#CBD5E1] transition-transform group-hover:translate-x-0.5 dark:text-slate-600" />
						</a>
					{/each}

					<!-- COMING SOON (no products) -->
					{#if category.productCount === 0}
						<div class="mt-3 flex items-center justify-center rounded-xl border border-dashed border-[#E2E8F0] py-2 dark:border-[#2A2578]/30">
							<span class="text-[10px] text-[#CBD5E1] dark:text-slate-600">Coming soon</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- EMPTY STATE -->
		{#if filteredCategories.length === 0}
			<div class="py-16 text-center">
				<p class="text-sm text-[#94A3B8] dark:text-slate-500">No categories match this filter.</p>
			</div>
		{/if}
	</div>
</section>
