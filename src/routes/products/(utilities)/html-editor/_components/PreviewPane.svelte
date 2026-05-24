<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { htmlCode, cssCode, jsCode, autoRun } from '../_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Play, RefreshCw, ExternalLink, Pause } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import DevicePresets from './DevicePresets.svelte';
	import DeviceFrame from './DeviceFrame.svelte';

	// -- OPTIONAL PROPS -- //

	export let className: string = '';

	// -- STATES -- //

	let iframe: HTMLIFrameElement;
	let pendingUpdate: ReturnType<typeof setTimeout> | null = null;
	let errorCount = 0;
	let lastContentHash = '';

	// -- FUNCTIONS -- //

	function buildSrcdoc(h: string, c: string, j: string): string {
		return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${c}<` + `/style>
</head>
<body>
${h}
<` + `script>
(function() {
	var _origConsole = {};
	['log','warn','error','info','clear'].forEach(function(m) {
		_origConsole[m] = console[m];
		console[m] = function() {
			var args = Array.prototype.slice.call(arguments).map(function(a) {
				try { return typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a); }
				catch(e) { return String(a); }
			});
			parent.postMessage({ type: 'console', method: m, args: args }, '*');
			_origConsole[m].apply(console, arguments);
		};
	});
	window.onerror = function(msg, src, line, col, err) {
		parent.postMessage({ type: 'console', method: 'error', args: [msg + ' (line ' + line + ')'] }, '*');
		return true;
	};
	window.addEventListener('unhandledrejection', function(e) {
		parent.postMessage({ type: 'console', method: 'error', args: ['Unhandled rejection: ' + e.reason] }, '*');
	});
})();
try {
${j}
} catch(e) {
	console.error(e.message);
}
<` + `/script>
</body>
</html>`;
	}

	function updatePreview() {
		if (!iframe) return;
		const contentHash = $htmlCode + '|' + $cssCode + '|' + $jsCode;
		if (contentHash === lastContentHash) return;
		lastContentHash = contentHash;
		iframe.srcdoc = buildSrcdoc($htmlCode, $cssCode, $jsCode);
	}

	function scheduleUpdate() {
		if (pendingUpdate) clearTimeout(pendingUpdate);
		pendingUpdate = setTimeout(() => {
			updatePreview();
			pendingUpdate = null;
		}, 300);
	}

	function runManual() {
		if (pendingUpdate) clearTimeout(pendingUpdate);
		updatePreview();
	}

	function openInNewTab() {
		const blob = new Blob([buildSrcdoc($htmlCode, $cssCode, $jsCode)], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		window.open(url, '_blank');
		setTimeout(() => URL.revokeObjectURL(url), 5000);
	}

	function handleMessage(e: MessageEvent) {
		if (e.data?.type === 'console' && e.data.method === 'error') {
			errorCount++;
		}
	}

	// -- REACTIVE STATEMENTS -- //

	$: if ($autoRun && iframe) {
		$htmlCode, $cssCode, $jsCode;
		scheduleUpdate();
	}

	// -- SUBSCRIPTIONS -- //

	if (typeof window !== 'undefined') {
		window.addEventListener('message', handleMessage);
	}

	// -- LIFECYCLES -- //

	onDestroy(() => {
		if (pendingUpdate) clearTimeout(pendingUpdate);
		if (typeof window !== 'undefined') {
			window.removeEventListener('message', handleMessage);
		}
	});
</script>

<div class={cn('flex h-full flex-col overflow-hidden', className)}>
	<!-- PREVIEW TOOLBAR -->
	<div
		class="flex shrink-0 items-center gap-2 border-b border-[#e2e8f0] bg-[#f8fafc] px-3 py-1.5 dark:border-[#1E1A5E] dark:bg-[#0d0c2b]"
	>
		<span class="mr-2 text-xs font-medium text-[#64748b] dark:text-slate-500">Preview</span>

		<DevicePresets />

		<div class="flex-1" />

		<button
			class="rounded p-1 text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={() => autoRun.update((v) => !v)}
			title={$autoRun ? 'Pause auto-run' : 'Enable auto-run'}
		>
			{#if $autoRun}
				<Pause size={14} />
			{:else}
				<Play size={14} />
			{/if}
		</button>

		<button
			class="rounded p-1 text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={runManual}
			title="Run"
		>
			<RefreshCw size={14} />
		</button>

		<button
			class="rounded p-1 text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={openInNewTab}
			title="Open in new tab"
		>
			<ExternalLink size={14} />
		</button>
	</div>

	<!-- IFRAME -->
	<div class="min-h-0 flex-1 overflow-auto bg-[#f1f5f9] dark:bg-[#070619]">
		<DeviceFrame>
			<iframe
				bind:this={iframe}
				title="Preview"
				sandbox="allow-scripts allow-modals"
				class="h-full w-full border-0 bg-white"
			/>
		</DeviceFrame>
	</div>
</div>
