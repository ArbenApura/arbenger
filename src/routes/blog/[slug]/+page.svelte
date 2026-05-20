<script lang="ts">
	// IMPORTED TYPES
	import type { PageData } from './$types';

	// IMPORTED MODULES
	import { formatPostDate, getCategoryLabel } from '$lib/data/blog';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import ReadingProgress from '$lib/components/blog/ReadingProgress.svelte';

	// -- REQUIRED PROPS -- //

	export let data: PageData;

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	const postModules = import.meta.glob('./_posts/*.svelte', { eager: true }) as Record<
		string,
		{ default: ConstructorOfATypedSvelteComponent }
	>;

	// -- REACTIVE STATES -- //

	$: post = data.post;

	$: contentKey = `./_posts/${post.slug}.svelte`;

	$: ContentComponent = postModules[contentKey]?.default;

	$: categoryLabel = getCategoryLabel(post.category);

	$: formattedDate = formatPostDate(post.date);
</script>

<MetaTags
	title="{post.title} | Arbenger Blog"
	description={post.description}
	url="{SITE_URL}/blog/{post.slug}/"
	type="article"
	image={post.coverImage}
/>

<svelte:head>
	<meta name="author" content="Arbenger" />
</svelte:head>

<Breadcrumbs
	items={[
		{ name: 'Blog', url: `${SITE_URL}/blog/` },
		{ name: post.title, url: `${SITE_URL}/blog/${post.slug}/` },
	]}
/>

<!-- ARTICLE JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		dateModified: post.updatedDate ?? post.date,
		author: { '@type': 'Organization', name: 'Arbenger', url: SITE_URL },
		publisher: {
			'@type': 'Organization',
			name: 'Arbenger',
			url: SITE_URL,
			logo: { '@type': 'ImageObject', url: `${SITE_URL}/arbenger.svg` },
		},
		url: `${SITE_URL}/blog/${post.slug}/`,
		timeRequired: `PT${post.readTime}M`,
		...(post.coverImage ? { image: post.coverImage } : {}),
	}}
/>

<ReadingProgress />

<!-- POST HEADER -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-3xl px-6 lg:px-8">
		<!-- EYEBROW: CATEGORY + READ TIME -->
		<div class="mb-6 flex items-center gap-3">
			<a
				href="/blog/"
				class="rounded-full bg-[#0891B2]/10 px-3 py-1 font-mono text-xs text-[#0891B2] transition-colors hover:bg-[#0891B2]/20 dark:bg-[#22D3EE]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/20"
			>
				{categoryLabel}
			</a>
			<span class="text-xs text-[#94A3B8] dark:text-slate-500">{post.readTime} min read</span>
		</div>

		<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			{post.title}
		</h1>

		<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
			{post.description}
		</p>

		<!-- META ROW -->
		<div
			class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#E2E8F0] pb-8 text-sm text-[#64748B] dark:border-[#2A2578] dark:text-slate-400"
		>
			<time datetime={post.date}>{formattedDate}</time>
			<span class="text-[#CBD5E1] dark:text-slate-600">|</span>
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag}
					<span class="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-xs dark:bg-[#2A2578]/30">#{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- POST CONTENT -->
<article class="pb-24">
	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		{#if ContentComponent}
			<svelte:component this={ContentComponent} />
		{:else}
			<!-- MISSING CONTENT FILE -->
			<p class="text-[#94A3B8] dark:text-slate-500">Content not available.</p>
		{/if}
	</div>
</article>

<!-- BACK TO BLOG -->
<section class="pb-16">
	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		<a
			href="/blog/"
			class="inline-flex items-center gap-2 font-mono text-sm text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
		>
			&larr; Back to all posts
		</a>
	</div>
</section>
