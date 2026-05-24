<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { htmlCode, cssCode, jsCode } from './_lib/store';
	import { exportAsZip, exportAsHTML } from './_lib/exporter';
	import { initPersistence, destroyPersistence } from './_lib/persistence';
	import { hideChrome } from '$lib/stores/layout';
	import { isDark } from '$lib/stores/theme';
	// IMPORTED DEP-COMPONENTS
	import { ArrowLeft, Download, FileCode, FolderArchive, Moon, Shield, Sun } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	// IMPORTED COMPONENTS
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';
	import EditorLayout from './_components/EditorLayout.svelte';
	import PreviewPane from './_components/PreviewPane.svelte';
	import ConsolePane from './_components/ConsolePane.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- STATES -- //

	let exportOpen = false;

	// -- FUNCTIONS -- //

	async function handleExportZip() {
		exportOpen = false;
		await exportAsZip($htmlCode, $cssCode, $jsCode);
		toast.success('Exported as ZIP');
	}

	function handleExportHTML() {
		exportOpen = false;
		exportAsHTML($htmlCode, $cssCode, $jsCode);
		toast.success('Exported as HTML');
	}

	// -- LIFECYCLES -- //

	onMount(async () => {
		hideChrome.set(true);
		const saved = await initPersistence();
		if (saved) {
			toast.info('Restored previous session');
		}
	});

	onDestroy(() => {
		hideChrome.set(false);
		destroyPersistence();
	});
</script>

<MetaTags
	title="Free HTML Editor — Live Preview, Prettier & Error Detection | Arbenger"
	description="Write HTML, CSS, and JavaScript with live preview, Prettier formatting, and inline error detection. No signup, no uploads. 100% private and free."
	url="{SITE_URL}/products/html-editor/"
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Arbenger HTML Editor',
		url: `${SITE_URL}/products/html-editor/`,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description:
			'Free browser-based HTML/CSS/JS editor with live preview, Prettier formatting, and inline error detection. No uploads — 100% private.',
	}}
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products/` },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'HTML Editor',
				item: `${SITE_URL}/products/html-editor/`,
			},
		],
	}}
/>

<div class="flex h-screen flex-col">
	<!-- MINIMAL HEADER -->
	<div class="flex shrink-0 items-center gap-3 border-b border-[#e2e8f0] bg-white px-3 py-1.5 dark:border-[#1E1A5E] dark:bg-[#0B0A23]">
		<!-- BACK + LOGO -->
		<a
			href="/products/"
			class="flex items-center gap-2 rounded-lg px-2 py-1 text-[#64748b] transition-colors hover:bg-[#f1f5f9] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			title="Back to Products"
		>
			<ArrowLeft size={14} />
			<Logo size={18} />
		</a>

		<div class="h-4 w-px bg-[#e2e8f0] dark:bg-[#1E1A5E]" />

		<span class="text-xs font-medium text-[#0f172a] dark:text-white">HTML Editor</span>

		<div class="flex-1" />

		<!-- STATUS BADGES -->
		<span class="hidden items-center gap-1 text-[10px] text-[#94A3B8] sm:flex dark:text-slate-500">
			<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
			100% Private
		</span>

		<!-- THEME TOGGLE -->
		<button
			class="rounded p-1 text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={() => isDark.toggle()}
			title="Toggle theme"
		>
			{#if $isDark}
				<Sun size={14} />
			{:else}
				<Moon size={14} />
			{/if}
		</button>

		<!-- EXPORT DROPDOWN -->
		<div class="relative">
			<button
				class="flex items-center gap-1 rounded border border-[#e2e8f0] px-2 py-1 text-[10px] font-medium text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:border-[#1E1A5E] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
				on:click={() => (exportOpen = !exportOpen)}
			>
				<Download size={12} />
				Export
			</button>

			{#if exportOpen}
				<div class="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[#e2e8f0] bg-white py-1 shadow-lg dark:border-[#1E1A5E] dark:bg-[#0d0c2b]">
					<button
						class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#0f172a] transition-colors hover:bg-[#f1f5f9] dark:text-slate-300 dark:hover:bg-[#1E1A5E]"
						on:click={handleExportZip}
					>
						<FolderArchive size={14} />
						Export as ZIP
					</button>
					<button
						class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-[#0f172a] transition-colors hover:bg-[#f1f5f9] dark:text-slate-300 dark:hover:bg-[#1E1A5E]"
						on:click={handleExportHTML}
					>
						<FileCode size={14} />
						Export as HTML
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- MAIN EDITOR AREA -->
	<div class="flex min-h-0 flex-1 flex-col md:flex-row">
		<!-- EDITORS -->
		<div class="h-1/2 border-r-0 border-b border-[#e2e8f0] md:h-full md:w-1/2 md:border-r md:border-b-0 dark:border-[#1E1A5E]">
			<EditorLayout />
		</div>

		<!-- PREVIEW + CONSOLE -->
		<div class="flex h-1/2 flex-col md:h-full md:w-1/2">
			<div class="min-h-0 flex-1">
				<PreviewPane />
			</div>
			<ConsolePane />
		</div>
	</div>
</div>
