<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	import { skillGroups } from '$lib/data/skills';
</script>

<!-- SKILLS SECTION -->
<section class="relative overflow-hidden border-t border-[#E2E8F0] py-16 md:py-24 dark:border-[#2A2578]/50">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<!-- SECTION INTRO -->
		<div use:reveal class="mb-10 max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Skills</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl dark:text-white">
				What I work with
			</h2>
		</div>

		<!-- SKILL GROUP CARDS -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each skillGroups as group, i}
				<div
					use:reveal={{ delay: i * 80 }}
					class="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:shadow-none"
				>
					<h3 class="font-display text-sm font-bold tracking-tight text-[#0891B2] uppercase dark:text-[#22D3EE]">
						{group.name}
					</h3>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each group.skills as skill}
							<span class="rounded-md bg-[#F1F5F9] px-2.5 py-1 text-xs text-[#64748B] dark:bg-[#2A2578]/30 dark:text-slate-400">
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
