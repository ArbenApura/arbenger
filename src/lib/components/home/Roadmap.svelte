<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { reveal } from '$lib/actions/reveal';

	// -- TYPES -- //

	interface Milestone {
		quarter: string;
		title: string;
		status: 'in-progress' | 'planned' | 'exploring';
		statusLabel: string;
	}

	// -- CONSTANTS -- //

	const MILESTONES: Milestone[] = [
		{ quarter: 'Q2 2026', title: 'First VS Code extension', status: 'in-progress', statusLabel: 'In Progress' },
		{ quarter: 'Q3 2026', title: 'AI Wiki Reader beta', status: 'planned', statusLabel: 'Planned' },
		{ quarter: 'Q3 2026', title: 'Chrome productivity plugin', status: 'planned', statusLabel: 'Planned' },
		{ quarter: 'Q4 2026', title: 'More tools & SaaS products', status: 'exploring', statusLabel: 'Exploring' },
	];

	const STATUS_CLASSES: Record<Milestone['status'], { badge: string; dot: string }> = {
		'in-progress': {
			badge: 'bg-[#22D3EE]/10 text-[#0891B2] dark:bg-[#22D3EE]/15 dark:text-[#22D3EE]',
			dot: 'bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.5)]',
		},
		planned: {
			badge: 'bg-[#2DD4BF]/10 text-[#0D9488] dark:bg-[#2DD4BF]/15 dark:text-[#2DD4BF]',
			dot: 'bg-[#2DD4BF] shadow-[0_0_8px_rgba(45,212,191,0.4)]',
		},
		exploring: {
			badge: 'bg-[#94A3B8]/10 text-[#64748B] dark:bg-[#94A3B8]/15 dark:text-[#94A3B8]',
			dot: 'bg-[#94A3B8]',
		},
	};
</script>

<!-- ROADMAP SECTION -->
<section class="relative overflow-hidden py-32">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- SECTION HEADING -->
		<div use:reveal class="max-w-2xl">
			<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Roadmap</p>
			<h2 class="font-display mt-4 text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				What's ahead
			</h2>
		</div>

		<!-- VERTICAL TIMELINE -->
		<div class="relative mt-16 ml-4 border-l border-[#E2E8F0] pl-8 dark:border-[#2A2578]/60 sm:ml-8 sm:pl-12">
			{#each MILESTONES as milestone, i}
				<div
					use:reveal={{ delay: i * 100 }}
					class="relative pb-12 last:pb-0"
				>
					<!-- TIMELINE DOT -->
					<div
						class={cn(
							'absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full sm:-left-[calc(3rem+5px)]',
							STATUS_CLASSES[milestone.status].dot,
						)}
					></div>

					<!-- QUARTER LABEL -->
					<p class="font-mono text-xs text-[#94A3B8] dark:text-slate-500">
						{milestone.quarter}
					</p>

					<!-- MILESTONE TITLE + STATUS -->
					<div class="mt-2 flex flex-wrap items-center gap-3">
						<h3 class="font-display text-lg font-bold tracking-tight text-[#0F172A] dark:text-white">
							{milestone.title}
						</h3>
						<span
							class={cn(
								'rounded-full px-2.5 py-0.5 text-xs font-medium',
								STATUS_CLASSES[milestone.status].badge,
							)}
						>
							{milestone.statusLabel}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
