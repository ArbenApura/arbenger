<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Code, Brain, Wrench, Rocket, ArrowRight } from 'lucide-svelte';

	// IMPORTED MODULES
	import { categories } from '$lib/data/products';
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// -- CONSTANTS -- //

	const ICON_MAP: Record<string, typeof Code> = {
		code: Code,
		brain: Brain,
		wrench: Wrench,
		rocket: Rocket,
	};
</script>

<!-- PRODUCT CATEGORIES SECTION -->
<section class="relative overflow-hidden py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- SECTION INTRO — LEFT-ALIGNED, NO SECTION LABEL -->
		<div use:reveal class="max-w-2xl">
			<p class="font-mono text-sm text-[#22D3EE]">What I'm working on</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#161446] md:text-5xl dark:text-white">
				If the tool doesn't exist, I make it.
			</h2>
		</div>

		<!-- STACKED CATEGORY ROWS — EACH ONE UNIQUE, NOT A GRID -->
		<div class="mt-20 space-y-4">
			{#each categories as category, i}
				<a
					href="/products"
					use:reveal={{ delay: i * 80 }}
					class="group flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white/60 px-8 py-6 backdrop-blur-sm transition-all duration-500 hover:border-[#22D3EE]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:border-[#2A2578]/60 dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/30 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]"
				>
					<div class="flex items-center gap-6">
						<!-- ICON -->
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#22D3EE]/10 transition-all duration-300 group-hover:bg-[#22D3EE]/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
						>
							{#if category.icon === 'chrome'}
								<svg
									class="size-6 text-[#22D3EE]"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="3" y="3" width="18" height="18" rx="2" />
									<path d="M7 7h10v10H7z" />
								</svg>
							{:else}
								<svelte:component this={ICON_MAP[category.icon]} class="size-6 text-[#22D3EE]" />
							{/if}
						</div>

						<!-- TEXT -->
						<div>
							<h3 class="font-display text-lg font-bold tracking-tight text-[#161446] dark:text-white">
								{category.name}
							</h3>
							<p class="mt-1 text-sm text-[#64748B] dark:text-slate-400">
								{category.description}
							</p>
						</div>
					</div>

					<!-- ARROW -->
					<ArrowRight
						class="size-5 shrink-0 text-[#94A3B8] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#22D3EE] dark:text-slate-500"
					/>
				</a>
			{/each}
		</div>
	</div>
</section>
