<script lang="ts">
	// IMPORTED TYPES
	import type { BlogPost } from '$lib/types';

	// IMPORTED MODULES
	import { formatPostDate, getCategoryLabel } from '$lib/data/blog';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED DEP-COMPONENTS
	import { ArrowRight } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let post: BlogPost;

	// -- OPTIONAL PROPS -- //

	export let delay: number = 0;
</script>

<a
	href="/blog/{post.slug}/"
	use:reveal={{ delay }}
	class="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0891B2]/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/40 dark:hover:shadow-[0_8px_30px_rgba(34,211,238,0.06)]"
>
	<!-- CATEGORY + READ TIME -->
	<div class="mb-4 flex items-center justify-between">
		<span
			class="rounded-full bg-[#0891B2]/10 px-2.5 py-0.5 font-mono text-[10px] text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]"
		>
			{getCategoryLabel(post.category)}
		</span>
		<span class="text-[11px] text-[#94A3B8] dark:text-slate-500">{post.readTime} min read</span>
	</div>

	<!-- TITLE -->
	<h2 class="font-display line-clamp-2 text-xl font-bold tracking-tight text-[#0F172A] dark:text-white">
		{post.title}
	</h2>

	<!-- DESCRIPTION -->
	<p class="mt-2 flex-1 text-sm leading-relaxed text-[#64748B] line-clamp-3 dark:text-slate-400">
		{post.description}
	</p>

	<!-- TAGS -->
	<div class="mt-4 flex flex-wrap gap-1.5">
		{#each post.tags.slice(0, 3) as tag}
			<span class="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[10px] text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-500">
				#{tag}
			</span>
		{/each}
	</div>

	<!-- FOOTER -->
	<div class="mt-5 flex items-center justify-between border-t border-[#F1F5F9] pt-4 dark:border-[#2A2578]/40">
		<time datetime={post.date} class="text-xs text-[#94A3B8] dark:text-slate-500">
			{formatPostDate(post.date)}
		</time>
		<span
			class="flex items-center gap-1 text-xs font-medium text-[#0891B2] transition-all group-hover:gap-2 dark:text-[#22D3EE]"
		>
			Read post
			<ArrowRight size={13} />
		</span>
	</div>
</a>
