<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// IMPORTED DEP-COMPONENTS
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let currentPage: number;
	export let totalPages: number;
	export let onPageChange: (page: number) => void;
</script>

{#if totalPages > 1}
	<!-- PAGINATION CONTROLS -->
	<nav class="mt-12 flex items-center justify-center gap-2" aria-label="Blog pagination">
		<!-- PREVIOUS -->
		<button
			class={cn(
				'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
				currentPage === 1
					? 'cursor-default text-[#CBD5E1] dark:text-slate-600'
					: 'text-[#64748B] hover:bg-[#F1F5F9] dark:text-slate-400 dark:hover:bg-[#2A2578]/30',
			)}
			disabled={currentPage === 1}
			on:click={() => onPageChange(currentPage - 1)}
		>
			<ChevronLeft size={16} />
			Prev
		</button>

		<!-- PAGE NUMBERS -->
		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
			<button
				class={cn(
					'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors',
					page === currentPage
						? 'bg-[#0891B2] text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]'
						: 'text-[#64748B] hover:bg-[#F1F5F9] dark:text-slate-400 dark:hover:bg-[#2A2578]/30',
				)}
				on:click={() => onPageChange(page)}
			>
				{page}
			</button>
		{/each}

		<!-- NEXT -->
		<button
			class={cn(
				'flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
				currentPage === totalPages
					? 'cursor-default text-[#CBD5E1] dark:text-slate-600'
					: 'text-[#64748B] hover:bg-[#F1F5F9] dark:text-slate-400 dark:hover:bg-[#2A2578]/30',
			)}
			disabled={currentPage === totalPages}
			on:click={() => onPageChange(currentPage + 1)}
		>
			Next
			<ChevronRight size={16} />
		</button>
	</nav>
{/if}
