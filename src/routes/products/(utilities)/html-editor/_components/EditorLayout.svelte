<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	import { get } from 'svelte/store';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { activeTab, htmlCode, cssCode, jsCode, getActiveStore } from '../_lib/store';
	import type { EditorTab } from '../_lib/store';
	import { formatByLanguage, formatAll } from '../_lib/formatter';
	// IMPORTED DEP-COMPONENTS
	import { Code, Paintbrush, Terminal, WandSparkles } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	// IMPORTED COMPONENTS
	import EditorPane from './EditorPane.svelte';

	// -- CONSTANTS -- //

	const TABS: { id: EditorTab; label: string; icon: typeof Code }[] = [
		{ id: 'html', label: 'HTML', icon: Code },
		{ id: 'css', label: 'CSS', icon: Paintbrush },
		{ id: 'js', label: 'JS', icon: Terminal },
	];

	// -- STATES -- //

	let formatting = false;

	// -- FUNCTIONS -- //

	function setTab(tab: EditorTab) {
		activeTab.set(tab);
	}

	function getLanguageForTab(tab: EditorTab): 'html' | 'css' | 'javascript' {
		return tab === 'js' ? 'javascript' : tab;
	}

	async function formatCurrentPane() {
		if (formatting) return;
		formatting = true;
		const tab = $activeTab;
		const store = getActiveStore(tab);
		const code = get(store);

		const result = await formatByLanguage(getLanguageForTab(tab), code);
		if (result.formatted !== null) {
			store.set(result.formatted);
			toast.success(`${tab.toUpperCase()} formatted`);
		} else {
			toast.error(`Format error: ${result.error}`);
		}
		formatting = false;
	}

	async function formatAllPanes() {
		if (formatting) return;
		formatting = true;
		const h = get(htmlCode);
		const c = get(cssCode);
		const j = get(jsCode);

		const results = await formatAll(h, c, j);
		let errors = 0;
		if (results.html.formatted !== null) htmlCode.set(results.html.formatted);
		else errors++;
		if (results.css.formatted !== null) cssCode.set(results.css.formatted);
		else errors++;
		if (results.js.formatted !== null) jsCode.set(results.js.formatted);
		else errors++;

		if (errors === 0) toast.success('All panes formatted');
		else toast.warning(`Formatted with ${errors} error(s)`);
		formatting = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.shiftKey && e.altKey && e.key === 'F') {
			e.preventDefault();
			formatCurrentPane();
		}
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class="flex h-full flex-col overflow-hidden">
	<!-- TAB BAR -->
	<div
		class="flex shrink-0 items-center border-b border-[#e2e8f0] bg-[#f8fafc] dark:border-[#1E1A5E] dark:bg-[#0d0c2b]"
	>
		{#each TABS as tab}
			<button
				class={cn(
					'flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors',
					$activeTab === tab.id
						? 'border-b-2 border-[#0891B2] text-[#0891B2] dark:border-[#22D3EE] dark:text-[#22D3EE]'
						: 'text-[#64748b] hover:text-[#0f172a] dark:text-slate-500 dark:hover:text-slate-300'
				)}
				on:click={() => setTab(tab.id)}
			>
				<svelte:component this={tab.icon} size={14} />
				{tab.label}
			</button>
		{/each}

		<div class="flex-1" />

		<button
			class="mr-1 flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={formatCurrentPane}
			disabled={formatting}
			title="Format current pane (Shift+Alt+F)"
		>
			<WandSparkles size={12} />
			Format
		</button>

		<button
			class="mr-2 flex items-center gap-1 rounded px-2 py-1 text-[10px] font-medium text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={formatAllPanes}
			disabled={formatting}
			title="Format all panes"
		>
			<WandSparkles size={12} />
			Format All
		</button>
	</div>

	<!-- EDITOR PANES -->
	<div class="relative min-h-0 flex-1">
		<div class={cn('absolute inset-0', $activeTab !== 'html' && 'invisible')}>
			<EditorPane language="html" value={$htmlCode} onChange={(v) => htmlCode.set(v)} placeholder="Write your HTML here..." />
		</div>
		<div class={cn('absolute inset-0', $activeTab !== 'css' && 'invisible')}>
			<EditorPane language="css" value={$cssCode} onChange={(v) => cssCode.set(v)} placeholder="Write your CSS here..." />
		</div>
		<div class={cn('absolute inset-0', $activeTab !== 'js' && 'invisible')}>
			<EditorPane language="javascript" value={$jsCode} onChange={(v) => jsCode.set(v)} placeholder="Write your JavaScript here..." />
		</div>
	</div>
</div>
