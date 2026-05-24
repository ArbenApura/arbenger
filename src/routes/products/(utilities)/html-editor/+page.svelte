<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';
	// IMPORTED MODULES
	import { htmlCode, cssCode, jsCode, resetAll } from './_lib/store';
	import { exportAsZip, exportAsHTML } from './_lib/exporter';
	import { initPersistence, destroyPersistence } from './_lib/persistence';
	import { hideChrome } from '$lib/stores/layout';
	import { isDark } from '$lib/stores/theme';
	// IMPORTED DEP-COMPONENTS
	import { ArrowLeft, Check, Download, FileCode, FilePlus2, FolderArchive, Moon, Shield, Sun } from 'lucide-svelte';
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
	let showInfo = false;

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

	function handleNew() {
		resetAll();
		toast.success('Editor reset');
	}

	function handleClickOutside(e: MouseEvent) {
		if (exportOpen) exportOpen = false;
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

<svelte:window on:click={handleClickOutside} />

<MetaTags
	title="Free Online HTML Editor — Live Preview & Formatting | Arbenger"
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
		featureList:
			'Live preview, Prettier formatting, Syntax highlighting, Inline error detection, Emmet abbreviations, Responsive device preview, Built-in console, Export as ZIP or HTML',
		browserRequirements: 'Requires a modern web browser with JavaScript enabled',
		publisher: { '@type': 'Organization', name: 'Arbenger', url: 'https://arbenger.com' },
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

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'Is my code sent to a server?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'No. Everything runs in your browser. Your code never leaves your device — there are no uploads, no accounts, and no server-side processing.',
				},
			},
			{
				'@type': 'Question',
				name: 'What languages does this editor support?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'HTML, CSS, and JavaScript. Each language has its own editor pane with syntax highlighting, auto-completion, and bracket matching powered by CodeMirror 6.',
				},
			},
			{
				'@type': 'Question',
				name: 'Can I use this HTML editor offline?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. After your first visit, the editor and all its dependencies are cached in your browser. You can write and preview code without an internet connection.',
				},
			},
			{
				'@type': 'Question',
				name: 'How does the code formatting work?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'The editor uses Prettier, the same formatter used by most professional codebases. It runs entirely in your browser. Click Format or press Shift+Alt+F.',
				},
			},
			{
				'@type': 'Question',
				name: 'Can I export my code?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes. Export as a ZIP file (index.html, style.css, script.js) or as a single standalone HTML file with CSS and JS inlined.',
				},
			},
		],
	}}
/>

<h1 class="sr-only">Free Online HTML Editor — Write HTML, CSS & JavaScript with Live Preview</h1>

<div class="flex h-screen flex-col">
	<!-- MINIMAL HEADER -->
	<div class="flex shrink-0 items-center gap-2 border-b border-[#e2e8f0] bg-white px-2 py-1.5 sm:gap-3 sm:px-3 dark:border-[#1E1A5E] dark:bg-[#0B0A23]">
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

		<span class="text-sm font-semibold text-[#0f172a] dark:text-white">HTML Editor</span>

		<div class="flex-1" />

		<!-- STATUS BADGES -->
		<span class="hidden items-center gap-1 text-[10px] text-[#94A3B8] sm:flex dark:text-slate-500">
			<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
			100% Private
		</span>

		<div class="hidden h-3 w-px bg-[#e2e8f0] sm:block dark:bg-[#1E1A5E]" />

		<!-- NEW BUTTON -->
		<button
			class="rounded p-1 text-[#64748b] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] dark:text-slate-500 dark:hover:bg-[#1E1A5E] dark:hover:text-white"
			on:click={handleNew}
			title="New (reset all code)"
		>
			<FilePlus2 size={14} />
		</button>

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
				on:click|stopPropagation={() => (exportOpen = !exportOpen)}
			>
				<Download size={12} />
				<span class="hidden sm:inline">Export</span>
			</button>

			{#if exportOpen}
				<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
				<div
					class="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[#e2e8f0] bg-white py-1 shadow-lg dark:border-[#1E1A5E] dark:bg-[#0d0c2b]"
					on:click|stopPropagation
				>
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

<!-- SEO CONTENT SECTION -->
<div class="border-t border-[#e2e8f0] bg-white dark:border-[#1E1A5E] dark:bg-[#0B0A23]">
	<button
		class="flex w-full items-center justify-center gap-2 py-3 text-xs text-[#94A3B8] transition-colors hover:text-[#64748b] dark:text-slate-600 dark:hover:text-slate-400"
		on:click={() => (showInfo = !showInfo)}
	>
		{showInfo ? 'Hide' : 'About this tool'}
	</button>

	{#if showInfo}
		<div class="mx-auto max-w-4xl px-6 pb-16 pt-4">
			<!-- WHAT IT IS -->
			<section class="mb-12">
				<h2 class="font-display mb-4 text-xl font-bold text-[#0f172a] dark:text-white">
					A free HTML editor that runs entirely in your browser
				</h2>
				<p class="max-w-2xl text-sm leading-relaxed text-[#475569] dark:text-slate-300">
					Write HTML, CSS, and JavaScript side by side with a live preview that updates as you type.
					Format your code with Prettier, catch errors before they reach the browser, and expand Emmet
					abbreviations — all without creating an account or sending your code to a server.
				</p>
			</section>

			<!-- FEATURES -->
			<section class="mb-12">
				<h2 class="font-display mb-6 text-lg font-bold text-[#0f172a] dark:text-white">
					Features
				</h2>
				<div class="grid gap-4 sm:grid-cols-2">
					{#each [
						{ title: 'Live Preview', desc: 'See your changes instantly. Auto-updates with a 300ms debounce, or switch to manual run mode.' },
						{ title: 'Prettier Formatting', desc: 'One-click formatting for HTML, CSS, and JavaScript. Keyboard shortcut: Shift+Alt+F.' },
						{ title: 'Error Detection', desc: 'Inline warnings for unclosed HTML tags, CSS brace mismatches, and JavaScript syntax errors.' },
						{ title: 'Emmet Abbreviations', desc: 'Type div.container>ul>li*5 and press Tab. Works in HTML and CSS panes.' },
						{ title: 'Device Preview', desc: 'Test your layout on phone (375×667), tablet (768×1024), and desktop (1440×900) frames.' },
						{ title: 'Built-in Console', desc: 'Captures console.log, warnings, errors, and unhandled rejections from your preview.' },
						{ title: 'Export', desc: 'Download your work as a ZIP with separate files, or as a single standalone HTML file.' },
						{ title: 'Session Persistence', desc: 'Your code saves to your browser automatically. Come back tomorrow and pick up where you left off.' },
					] as feature}
						<div class="rounded-lg border border-[#e2e8f0] p-4 dark:border-[#1E1A5E]">
							<div class="mb-1 flex items-center gap-2">
								<Check size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
								<h3 class="text-sm font-semibold text-[#0f172a] dark:text-white">{feature.title}</h3>
							</div>
							<p class="text-xs leading-relaxed text-[#64748b] dark:text-slate-400">{feature.desc}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- FAQ -->
			<section>
				<h2 class="font-display mb-6 text-lg font-bold text-[#0f172a] dark:text-white">
					Frequently Asked Questions
				</h2>
				<div class="space-y-4">
					{#each [
						{ q: 'Is my code sent to a server?', a: 'No. Everything runs in your browser. Your code never leaves your device — there are no uploads, no accounts, and no server-side processing.' },
						{ q: 'What languages does this editor support?', a: 'HTML, CSS, and JavaScript. Each language has its own editor pane with syntax highlighting, auto-completion, and bracket matching powered by CodeMirror 6.' },
						{ q: 'Can I use this offline?', a: 'Yes. After your first visit, the editor and all its dependencies are cached in your browser. You can write and preview code without an internet connection.' },
						{ q: 'How does the formatting work?', a: 'The editor uses Prettier — the same formatter used by most professional codebases. It runs entirely in your browser via the Prettier standalone build. Click Format or press Shift+Alt+F.' },
						{ q: 'Can I export my code?', a: 'Yes. Export as a ZIP file (index.html, style.css, script.js) or as a single standalone HTML file with CSS and JS inlined. Both download directly to your device.' },
						{ q: 'Does the editor work on mobile?', a: 'The editor is responsive and works on tablets and phones. On smaller screens, the editor and preview stack vertically with tabbed switching between panes.' },
					] as faq}
						<details class="group rounded-lg border border-[#e2e8f0] dark:border-[#1E1A5E]">
							<summary class="cursor-pointer px-4 py-3 text-sm font-medium text-[#0f172a] dark:text-white">
								{faq.q}
							</summary>
							<p class="px-4 pb-4 text-xs leading-relaxed text-[#64748b] dark:text-slate-400">
								{faq.a}
							</p>
						</details>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
