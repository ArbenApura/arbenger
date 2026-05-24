<script lang="ts">
	// IMPORTED DEP-COMPONENTS
	import { Shield, Wifi } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import EditorLayout from './_components/EditorLayout.svelte';
	import PreviewPane from './_components/PreviewPane.svelte';
	import ConsolePane from './_components/ConsolePane.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';
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

<div class="flex h-[calc(100vh-5rem)] flex-col pt-20">
	<!-- TOP BAR -->
	<div class="flex shrink-0 items-center justify-between border-b border-[#e2e8f0] px-4 py-2 dark:border-[#1E1A5E]">
		<nav class="text-xs text-[#94A3B8] dark:text-slate-500">
			<a href="/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Home</a>
			<span class="mx-1">/</span>
			<a href="/products/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Products</a>
			<span class="mx-1">/</span>
			<span class="text-[#0f172a] dark:text-white">HTML Editor</span>
		</nav>

		<div class="flex items-center gap-3">
			<span class="flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
				<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
				100% Private
			</span>
			<span class="flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
				<Wifi size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
				Works Offline
			</span>
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
