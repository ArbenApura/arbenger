<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { activeTab, htmlCode, cssCode, jsCode } from '../_lib/store';
	import type { EditorTab } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Code, Paintbrush, Terminal } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import EditorPane from './EditorPane.svelte';

	// -- CONSTANTS -- //

	const TABS: { id: EditorTab; label: string; icon: typeof Code }[] = [
		{ id: 'html', label: 'HTML', icon: Code },
		{ id: 'css', label: 'CSS', icon: Paintbrush },
		{ id: 'js', label: 'JS', icon: Terminal },
	];

	// -- FUNCTIONS -- //

	function setTab(tab: EditorTab) {
		activeTab.set(tab);
	}
</script>

<div class="flex h-full flex-col overflow-hidden">
	<!-- TAB BAR -->
	<div
		class="flex shrink-0 border-b border-[#e2e8f0] bg-[#f8fafc] dark:border-[#1E1A5E] dark:bg-[#0d0c2b]"
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
