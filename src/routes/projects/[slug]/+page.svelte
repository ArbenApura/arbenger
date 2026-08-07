<script lang="ts">
	// IMPORTED TYPES
	import type { PageData } from './$types';

	// IMPORTED DEP-MODULES
	import { ArrowLeft, ExternalLink, FileText } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import ProjectCover from '$lib/components/projects/ProjectCover.svelte';
	import Screenshot from '$lib/components/projects/Screenshot.svelte';

	// -- REQUIRED PROPS -- //

	export let data: PageData;

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- REACTIVE STATES -- //

	$: project = data.project;

	// -- GALLERY STATE: EACH SHOT REPORTS ITS ORIENTATION ON LOAD; LAYOUT GROUPS
	//    LANDSCAPES (FULL-WIDTH ROWS) SEPARATELY FROM PORTRAITS (TWO-COLUMN) -- //

	let orientations: (boolean | undefined)[] = [];

	function handleResolve(index: number, isLandscape: boolean) {
		orientations[index] = isLandscape;
		orientations = orientations;
	}
</script>

<MetaTags
	title="{project.name} — Arben Apura"
	description={project.summary}
	url="{SITE_URL}/projects/{project.slug}/"
/>

<Breadcrumbs
	items={[
		{ name: 'Projects', url: `${SITE_URL}/projects/` },
		{ name: project.name, url: `${SITE_URL}/projects/${project.slug}/` },
	]}
/>

<!-- PROJECT JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: project.name,
		url: `${SITE_URL}/projects/${project.slug}/`,
		description: project.summary,
		...(project.year ? { dateCreated: project.year } : {}),
		author: { '@type': 'Person', name: 'Arben M. Apura', url: SITE_URL },
		...(project.cover ? { image: `${SITE_URL}${project.cover}` } : {}),
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-12">
	<div use:reveal class="mx-auto max-w-4xl px-6 lg:px-8">
		<!-- BADGES -->
		<div class="mb-6 flex flex-wrap items-center gap-2">
			<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 font-mono text-xs text-[#2DD4BF]">
				{project.year}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.category}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.status}
			</span>
		</div>

		<h1 class="font-display text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			{project.name}
		</h1>

		<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
			{project.summary}
		</p>

		{#if project.recognition}
			<p class="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0891B2]/10 px-4 py-1.5 font-mono text-xs text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				{project.recognition}
			</p>
		{/if}

		<!-- COVER -->
		<div class="mt-10 overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#2A2578]/60">
			<ProjectCover {project} imageClass="aspect-video w-full object-cover" placeholderClass="aspect-video min-h-[240px] w-full" />
		</div>

		<!-- LINKS -->
		{#if project.links.length > 0}
			<div class="mt-8 flex flex-wrap gap-3">
				{#each project.links as link}
					<a
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg border border-[#0891B2] px-5 py-2.5 text-sm font-medium text-[#0891B2] transition-all duration-300 hover:bg-[#0891B2]/10 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
					>
						<ExternalLink class="size-4" />
						{link.label}
					</a>
				{/each}

				{#if project.pdf}
					<a
						href={project.pdf.path}
						download
						class="inline-flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-5 py-2.5 text-sm font-medium text-[#64748B] transition-all duration-300 hover:border-[#0891B2]/50 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/50 dark:hover:text-[#22D3EE]"
					>
						<FileText class="size-4" />
						{project.pdf.label}
					</a>
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- PROBLEM / SOLUTION -->
{#if project.problem || project.solution}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<div class="grid gap-8 md:grid-cols-2">
				{#if project.problem}
					<div use:reveal={{ delay: 0 }}>
						<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">The problem</p>
						<p class="mt-4 text-[#475569] dark:text-slate-300">{project.problem}</p>
					</div>
				{/if}
				{#if project.solution}
					<div use:reveal={{ delay: 100 }}>
						<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">The solution</p>
						<p class="mt-4 text-[#475569] dark:text-slate-300">{project.solution}</p>
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

<!-- FEATURES -->
{#if project.features.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Key features</p>
			<div class="mt-6 grid gap-3 sm:grid-cols-2">
				{#each project.features as feature, i}
					<div
						use:reveal={{ delay: i * 60 }}
						class="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
					>
						<span class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0891B2]/10 text-[10px] font-bold text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]">
							{i + 1}
						</span>
						<span class="text-sm text-[#475569] dark:text-slate-300">{feature}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- WHAT I LEARNED -->
{#if project.learnings && project.learnings.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">What I learned</p>
			<div class="mt-6 grid gap-3 sm:grid-cols-2">
				{#each project.learnings as learning, i}
					<div
						use:reveal={{ delay: i * 60 }}
						class="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
					>
						<span
							class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0891B2]/10 text-[10px] font-bold text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]"
						>
							{i + 1}
						</span>
						<span class="text-sm text-[#475569] dark:text-slate-300">{learning}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- TECH STACK -->
{#if project.stack.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Tech stack</p>
			<div class="mt-6 flex flex-wrap gap-2">
				{#each project.stack as tech}
					<span class="rounded-md bg-[#F1F5F9] px-3 py-1.5 font-mono text-xs text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-400">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- VIDEO EMBED — SKIPPED WHEN VIDEO IS THE COVER -->
{#if project.video && project.cover}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Demo</p>
			<h2 class="font-display mt-3 text-2xl font-bold tracking-tight text-[#0F172A] dark:text-white">
				{project.video.title}
			</h2>
			<div class="mt-6 aspect-video min-h-[240px] overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#2A2578]/60">
				<iframe
					src={project.video.embedUrl}
					title={project.video.title}
					class="h-full w-full"
					loading="lazy"
					allow="autoplay; fullscreen"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</section>
{/if}

<!-- GALLERY -->
{#if project.screenshots && project.screenshots.length > 0}
	<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]/50">
		<div class="mx-auto max-w-4xl px-6 lg:px-8">
			<p use:reveal class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Screenshots</p>

			<!-- ALL SHOTS RENDER UNCONDITIONALLY (THEY DETECT ORIENTATION ON LOAD); ONCE RESOLVED:
			     LANDSCAPES -> w-full + order-1 (own rows, on top) | PORTRAITS -> half-width + order-2
			     (two-column below; justify-center centers a lone last portrait). Never mixed. -->
			<div class="mt-6 flex flex-wrap justify-center gap-6">
				{#each project.screenshots as src, i (src)}
					<Screenshot
						src={src}
						alt={`${project.name} screenshot ${i + 1}`}
						onResolve={(isLandscape) => handleResolve(i, isLandscape)}
						extraClass={orientations[i] === true ? 'w-full order-1' : orientations[i] === false ? 'sm:w-[calc(50%-0.75rem)] order-2' : ''}
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- BACK LINK -->
<section class="pb-16">
	<div class="mx-auto max-w-4xl px-6 lg:px-8">
		<a
			href="/projects/"
			class="inline-flex items-center gap-2 font-mono text-sm text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
		>
			<ArrowLeft class="size-4" />
			Back to all projects
		</a>
	</div>
</section>
