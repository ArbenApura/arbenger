<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { showConsole } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { ChevronUp, ChevronDown, Trash2, AlertCircle, AlertTriangle, Info } from 'lucide-svelte';

	// -- TYPES -- //

	type LogEntry = {
		id: number;
		method: 'log' | 'warn' | 'error' | 'info' | 'clear';
		args: string[];
		timestamp: number;
	};

	// -- CONSTANTS -- //

	const METHOD_STYLES: Record<string, string> = {
		log: 'text-[#e2e8f0] dark:text-slate-300',
		warn: 'text-[#f59e0b] bg-[#f59e0b]/5',
		error: 'text-[#ef4444] bg-[#ef4444]/5',
		info: 'text-[#3b82f6] bg-[#3b82f6]/5',
	};

	const METHOD_ICONS: Record<string, typeof AlertCircle> = {
		warn: AlertTriangle,
		error: AlertCircle,
		info: Info,
	};

	// -- STATES -- //

	let entries: LogEntry[] = [];
	let nextId = 0;
	let scrollContainer: HTMLDivElement;
	type FilterType = 'all' | 'log' | 'warn' | 'error' | 'info';
	const FILTER_OPTIONS: FilterType[] = ['all', 'log', 'warn', 'error', 'info'];
	let filter: FilterType = 'all';

	// -- REACTIVE STATES -- //

	$: filteredEntries = filter === 'all' ? entries : entries.filter((e) => e.method === filter);
	$: errorCount = entries.filter((e) => e.method === 'error').length;
	$: warnCount = entries.filter((e) => e.method === 'warn').length;

	// -- FUNCTIONS -- //

	function handleMessage(e: MessageEvent) {
		if (e.data?.type !== 'console') return;

		if (e.data.method === 'clear') {
			entries = [];
			return;
		}

		entries = [
			...entries,
			{
				id: nextId++,
				method: e.data.method,
				args: e.data.args,
				timestamp: Date.now(),
			},
		];

		requestAnimationFrame(() => {
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight;
			}
		});
	}

	function clearConsole() {
		entries = [];
	}

	function toggleConsole() {
		showConsole.update((v) => !v);
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		window.addEventListener('message', handleMessage);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('message', handleMessage);
		}
	});
</script>

<div class="flex flex-col border-t border-[#e2e8f0] dark:border-[#1E1A5E]">
	<!-- CONSOLE HEADER -->
	<button
		class="flex shrink-0 items-center gap-2 bg-[#f8fafc] px-3 py-1.5 dark:bg-[#0d0c2b]"
		on:click={toggleConsole}
	>
		<span class="text-xs font-medium text-[#64748b] dark:text-slate-500">Console</span>

		{#if errorCount > 0}
			<span class="rounded-full bg-[#ef4444]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#ef4444]">
				{errorCount}
			</span>
		{/if}
		{#if warnCount > 0}
			<span class="rounded-full bg-[#f59e0b]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#f59e0b]">
				{warnCount}
			</span>
		{/if}

		<div class="flex-1" />

		{#if $showConsole}
			<button
				class="rounded p-0.5 text-[#64748b] transition-colors hover:text-[#0f172a] dark:text-slate-500 dark:hover:text-white"
				on:click|stopPropagation={clearConsole}
				title="Clear console"
			>
				<Trash2 size={12} />
			</button>
		{/if}

		{#if $showConsole}
			<ChevronDown size={14} class="text-[#64748b] dark:text-slate-500" />
		{:else}
			<ChevronUp size={14} class="text-[#64748b] dark:text-slate-500" />
		{/if}
	</button>

	<!-- CONSOLE BODY -->
	{#if $showConsole}
		<!-- FILTER BAR -->
		<div class="flex gap-1 border-t border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 dark:border-[#1E1A5E] dark:bg-[#0d0c2b]">
			{#each FILTER_OPTIONS as f}
				<button
					class={cn(
						'rounded px-2 py-0.5 text-[10px] font-medium transition-colors',
						filter === f
							? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
							: 'text-[#94A3B8] hover:text-[#64748b] dark:text-slate-600 dark:hover:text-slate-400'
					)}
					on:click={() => (filter = f)}
				>
					{f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
				</button>
			{/each}
		</div>

		<!-- LOG ENTRIES -->
		<div
			bind:this={scrollContainer}
			class="h-40 overflow-auto bg-[#0B0A23] font-mono text-xs"
		>
			{#if filteredEntries.length === 0}
				<div class="flex h-full items-center justify-center text-slate-600">
					No console output
				</div>
			{:else}
				{#each filteredEntries as entry (entry.id)}
					<div
						class={cn(
							'flex items-start gap-2 border-b border-[#1E1A5E]/50 px-3 py-1',
							METHOD_STYLES[entry.method]
						)}
					>
						{#if METHOD_ICONS[entry.method]}
							<svelte:component this={METHOD_ICONS[entry.method]} size={12} class="mt-0.5 shrink-0" />
						{/if}
						<span class="min-w-0 break-all whitespace-pre-wrap">{entry.args.join(' ')}</span>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
</div>
