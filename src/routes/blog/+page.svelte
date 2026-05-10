<script lang="ts">
	// IMPORTED TYPES
	import type { BlogCategory } from '$lib/types';

	// IMPORTED MODULES
	import { blogCategories, POSTS_PER_PAGE, sortedPosts } from '$lib/data/blog';
	import { reveal } from '$lib/actions/reveal';
	import { cn } from '$lib/utils/cn';

	// IMPORTED COMPONENTS
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import BlogPagination from '$lib/components/blog/BlogPagination.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- STATES -- //

	let activeCategory: BlogCategory | 'all' = 'all';

	let currentPage = 1;

	// -- REACTIVE STATES -- //

	$: filteredPosts =
		activeCategory === 'all' ? sortedPosts : sortedPosts.filter((p) => p.category === activeCategory);

	$: totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

	$: pagedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

	// -- FUNCTIONS -- //

	function setCategory(cat: BlogCategory | 'all') {
		activeCategory = cat;
		currentPage = 1;
	}
</script>

<MetaTags
	title="Blog — Tutorials, Guides & Dev Logs | Arbenger"
	description="Tutorials, deep dives, and behind-the-scenes on the tools we build. Learn how to use Arbenger products and follow our engineering journey."
	url="{SITE_URL}/blog/"
/>

<Breadcrumbs pageName="Blog" pageUrl="{SITE_URL}/blog/" />

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Blog</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Tutorials & Dev Logs
		</h1>

		<p class="mt-4 max-w-2xl text-lg text-[#475569] dark:text-slate-300">
			Step-by-step guides for our tools, engineering deep dives, and product updates.
		</p>
	</div>
</section>

<!-- CATEGORY FILTER + POST GRID -->
<section class="relative overflow-hidden pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- CATEGORY FILTER PILLS -->
		<div use:reveal={{ delay: 100 }} class="mb-10 flex flex-wrap gap-2">
			<button
				class={cn(
					'rounded-full px-4 py-1.5 font-mono text-xs transition-colors',
					activeCategory === 'all'
						? 'bg-[#0891B2] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
						: 'border border-[#E2E8F0] text-[#64748B] hover:border-[#0891B2]/40 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/40 dark:hover:text-[#22D3EE]',
				)}
				on:click={() => setCategory('all')}
			>
				All
			</button>
			{#each blogCategories as cat}
				<button
					class={cn(
						'rounded-full px-4 py-1.5 font-mono text-xs transition-colors',
						activeCategory === cat.id
							? 'bg-[#0891B2] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
							: 'border border-[#E2E8F0] text-[#64748B] hover:border-[#0891B2]/40 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/40 dark:hover:text-[#22D3EE]',
					)}
					on:click={() => setCategory(cat.id)}
				>
					{cat.label}
				</button>
			{/each}
		</div>

		<!-- POST GRID -->
		{#if pagedPosts.length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each pagedPosts as post, i (post.slug)}
					<BlogCard {post} delay={i * 80} />
				{/each}
			</div>

			<BlogPagination {currentPage} {totalPages} onPageChange={(p) => (currentPage = p)} />
		{:else}
			<!-- EMPTY STATE -->
			<div use:reveal class="flex flex-col items-center justify-center py-20 text-center">
				<p class="font-display text-xl font-bold text-[#0F172A] dark:text-white">No posts yet</p>
				<p class="mt-2 text-sm text-[#64748B] dark:text-slate-400">
					Check back soon — we're working on it.
				</p>
			</div>
		{/if}
	</div>
</section>
