<script lang="ts">
	// IMPORTED DEP-MODULES
	import { ArrowRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { projects } from '$lib/data/projects';

	// IMPORTED COMPONENTS
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
</script>

<!-- FEATURED PROJECTS SECTION -->
<section class="relative overflow-hidden py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div class="max-w-2xl">
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Selected work</p>
				<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
					Featured projects
				</h2>
			</div>
			<a
				href="/projects/"
				class="group flex items-center gap-1.5 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
			>
				View all projects
				<ArrowRight size={14} class="transition-transform group-hover:translate-x-0.5" />
			</a>
		</div>

		<!-- PROJECT CARDS -->
		<div class="grid gap-6 sm:grid-cols-2">
			{#each projects as project, i}
				<ProjectCard {project} delay={i * 100} />
			{/each}
		</div>
	</div>
</section>
