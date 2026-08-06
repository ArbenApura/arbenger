<script lang="ts">
	// IMPORTED TYPES
	import type { SocialLink } from '$lib/types';

	// IMPORTED DEP-COMPONENTS
	import { ArrowUpRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { SOCIAL_ICONS } from '$lib/utils/socialIcons';

	// -- REQUIRED PROPS -- //

	export let platform: SocialLink;

	// -- OPTIONAL PROPS -- //

	export let delay: number = 0;

	// -- REACTIVE STATES -- //

	$: displayUrl = (() => {
		try {
			return new URL(platform.url).hostname.replace(/^www\./, '');
		} catch {
			return platform.url;
		}
	})();
</script>

<a
	href={platform.url}
	target="_blank"
	rel="noopener noreferrer"
	use:reveal={{ delay }}
	class="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- TOP ROW: ICON + ARROW -->
	<div class="mb-4 flex items-center justify-between">
		<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
			<svg
				class="size-5 text-[#0891B2] dark:text-[#22D3EE]"
				viewBox={SOCIAL_ICONS[platform.icon].viewBox}
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
			>
				{#each SOCIAL_ICONS[platform.icon].paths as d}
					<path d={d} />
				{/each}
			</svg>
		</div>
		<ArrowUpRight
			size={18}
			class="text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0891B2] dark:text-slate-500 dark:group-hover:text-[#22D3EE]"
		/>
	</div>

	<!-- NAME -->
	<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
		{platform.platform}
	</h3>

	<!-- DESCRIPTION -->
	{#if platform.description}
		<p class="mt-1.5 flex-1 text-sm text-[#64748B] dark:text-slate-400">
			{platform.description}
		</p>
	{/if}

	<!-- STATS -->
	{#if platform.stats && platform.stats.length > 0}
		<div class="mt-4 flex flex-wrap gap-2">
			{#each platform.stats as stat}
				<span
					class="rounded-md bg-[#F1F5F9] px-2.5 py-1 font-mono text-xs font-medium text-[#0F172A] dark:bg-[#2A2578]/30 dark:text-white"
				>
					{stat.value}
					<span class="text-[#64748B] dark:text-slate-400"> {stat.label}</span>
				</span>
			{/each}
		</div>
	{/if}

	<!-- FOOTER -->
	<div class="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
		<span class="truncate text-xs text-[#94A3B8] dark:text-slate-500">{displayUrl}</span>
		<span
			class="flex shrink-0 items-center gap-1 text-xs font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]"
		>
			Visit profile
		</span>
	</div>
</a>
