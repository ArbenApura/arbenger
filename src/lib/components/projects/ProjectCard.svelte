<script lang="ts">
	// IMPORTED TYPES
	import type { PortfolioProject } from '$lib/types';

	// IMPORTED DEP-MODULES
	import { ArrowUpRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import ProjectCover from '$lib/components/projects/ProjectCover.svelte';

	// -- REQUIRED PROPS -- //

	export let project: PortfolioProject;
	export let delay: number = 0;
</script>

<a
	href="/projects/{project.slug}/"
	use:reveal={{ delay }}
	class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:from-[#1E1A5E]/30 dark:to-[#0B0A23] dark:shadow-none dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- COVER -->
	<ProjectCover {project} imageClass="aspect-video w-full object-cover" placeholderClass="aspect-video w-full" />

	<!-- BODY -->
	<div class="flex flex-1 flex-col gap-4 p-6">
		<!-- BADGES -->
		<div class="flex flex-wrap items-center gap-2">
			<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 font-mono text-xs text-[#2DD4BF]">
				{project.year}
			</span>
			<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
				{project.category}
			</span>
		</div>

		<h2 class="font-display text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
			{project.name}
		</h2>

		<p class="flex-1 text-sm text-[#64748B] dark:text-slate-400">
			{project.tagline}
		</p>

		{#if project.recognition}
			<p class="flex items-center gap-1.5 text-xs font-medium text-[#0891B2] dark:text-[#22D3EE]">
				<span class="h-1.5 w-1.5 rounded-full bg-[#0891B2] dark:bg-[#22D3EE]" />
				{project.recognition}
			</p>
		{/if}

		<!-- FOOTER -->
		<div class="flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
			<span class="text-xs text-[#94A3B8] dark:text-slate-500">{project.role}</span>
			<span class="flex items-center gap-1 text-sm font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]">
				View project
				<ArrowUpRight size={14} />
			</span>
		</div>
	</div>
</a>
