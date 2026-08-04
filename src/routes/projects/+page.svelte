<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Shield } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/data/projects';
	import { products } from '$lib/data/products';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import MinorProjectCard from '$lib/components/projects/MinorProjectCard.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- REACTIVE STATES -- //

	$: liveProducts = products.filter((p) => p.status === 'live');
	$: sortedProjects = [...projects].sort((a, b) => parseInt(a.year) - parseInt(b.year)).reverse();
</script>

<MetaTags
	title="Projects — Arben Apura"
	description="A selection of projects by Arben Apura — capstone IoT systems, AI web apps, client work, and free browser tools."
	url="{SITE_URL}/projects/"
/>

<Breadcrumbs pageName="Projects" pageUrl="{SITE_URL}/projects/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: 'Arben Apura Projects',
		url: `${SITE_URL}/projects/`,
		description: 'A selection of projects by Arben Apura.',
		mainEntity: {
			'@type': 'ItemList',
			itemListElement: sortedProjects.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: p.name,
				url: `${SITE_URL}/projects/${p.slug}/`,
			})),
		},
	}}
/>

<!-- HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="max-w-3xl">
			<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				Projects
			</h1>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				A few things I've built — capstone systems, client work, AI tools, and small utilities that are still live.
			</p>
		</div>
	</div>
</section>

<!-- FEATURED PROJECTS -->
<section class="relative overflow-hidden pb-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p use:reveal class="mb-6 text-xs font-semibold uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
			Featured projects
		</p>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each sortedProjects as project, i}
				<ProjectCard {project} delay={i * 100} />
			{/each}
		</div>
	</div>
</section>

<!-- DIVIDER -->
<div class="mx-auto max-w-7xl px-6 lg:px-8">
	<div class="border-t border-[#E2E8F0] dark:border-[#2A2578]/40" />
</div>

<!-- MINOR PROJECTS -->
<section class="relative overflow-hidden py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div use:reveal class="mb-8 max-w-2xl">
			<p class="text-xs font-semibold uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
				Minor projects
			</p>
			<h2 class="font-display mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
				Small tools I've shipped — still live
			</h2>
			<p class="mt-3 text-[#64748B] dark:text-slate-400">
				Free browser tools and Chrome extensions. Everything runs local, everything is free.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each liveProducts as product, i}
				<MinorProjectCard {product} delay={i * 80} />
			{/each}
		</div>

		<p use:reveal class="mt-6 flex items-center gap-1.5 text-xs text-[#94A3B8] dark:text-slate-500">
			<Shield size={12} class="text-[#0891B2] dark:text-[#22D3EE]" />
			No uploads, no accounts, no tracking — all tools run 100% in your browser.
		</p>
	</div>
</section>
