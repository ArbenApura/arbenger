<script lang="ts">
	// IMPORTED TYPES
	import type { PortfolioProject } from '$lib/types';

	// -- REQUIRED PROPS -- //

	export let project: PortfolioProject;

	// -- OPTIONAL PROPS -- //

	export let imageClass: string = '';
	export let placeholderClass: string = '';

	// -- REACTIVE STATES -- //

	$: initials = project.name
		.split(' ')
		.map((w) => w[0])
		.join('')
		.slice(0, 3)
		.toUpperCase();
</script>

{#if project.video}
	<div class={placeholderClass}>
		<iframe
			src={project.video.embedUrl}
			title={project.video.title}
			class="h-full w-full"
			loading="lazy"
			allow="autoplay; fullscreen"
			allowfullscreen
		></iframe>
	</div>
{:else if project.cover}
	<img src={project.cover} alt={`${project.name} screenshot`} loading="lazy" class={imageClass} />
{:else}
	<div class={placeholderClass}>
		<div class="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E1A5E] via-[#0B0A23] to-[#0B0A23]">
			<div
				class="absolute h-40 w-40 rounded-full opacity-25 blur-3xl"
				style="background: radial-gradient(circle, rgba(34, 211, 238, 0.5) 0%, transparent 70%);"
				aria-hidden="true"
			></div>
			<div class="relative text-center">
				<p class="font-display text-5xl font-bold tracking-tight text-white">{initials}</p>
				<p class="font-mono mt-3 text-xs tracking-widest text-[#22D3EE]">{project.year}</p>
			</div>
		</div>
	</div>
{/if}
