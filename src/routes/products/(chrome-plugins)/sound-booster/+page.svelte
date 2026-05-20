<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Volume2, SlidersHorizontal, Music, Keyboard, Power, BarChart3, Shield, ArrowRight, ExternalLink, Lock, Feather } from 'lucide-svelte';
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';
	// IMPORTED COMPONENTS
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import SectionLabel from '$lib/components/ui/SectionLabel.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	const FEATURES = [
		{
			icon: Volume2,
			title: 'Volume Boost up to 600%',
			desc: 'Amplify any tab far beyond the browser limit. Smooth slider with snap-to-100% and real-time peak meter.'
		},
		{
			icon: SlidersHorizontal,
			title: '5-Band Equalizer',
			desc: 'Fine-tune bass, mids, and treble across five frequency bands: 60Hz, 230Hz, 910Hz, 4kHz, and 14kHz.'
		},
		{
			icon: Music,
			title: 'Built-in Presets',
			desc: 'Instantly switch between Flat, Bass Boost, Treble Boost, Music, Movie, Voice, and Bass Cut profiles.'
		},
		{
			icon: Keyboard,
			title: 'Keyboard Shortcuts',
			desc: 'Adjust volume and toggle mute without opening the popup. Alt+Shift+Up, Down, and M — works globally.'
		},
		{
			icon: Power,
			title: 'On/Off Toggle',
			desc: 'Instantly bypass all audio processing without losing your volume and EQ settings. One click to resume.'
		},
		{
			icon: BarChart3,
			title: 'Live Peak Meter',
			desc: 'Visual audio level indicator updates in real time so you can see exactly how loud the output is.'
		}
	];

	const STEPS = [
		{ num: '1', title: 'Install', desc: 'One click from the Chrome Web Store. No account needed.' },
		{ num: '2', title: 'Play', desc: 'Open a tab with audio — YouTube, Spotify Web, podcasts, anything.' },
		{ num: '3', title: 'Boost', desc: 'Click the extension icon and drag the slider past 100%. Adjust EQ to taste.' }
	];
</script>

<MetaTags
	title="Free Sound Booster Chrome Extension — Volume up to 600%, Equalizer | Arbenger"
	description="Boost audio beyond 100% on any tab. Per-tab volume up to 600%, 5-band equalizer, presets, keyboard shortcuts. Minimal permissions. Free."
	url="{SITE_URL}/products/sound-booster/"
/>

<Breadcrumbs
	items={[
		{ name: 'Products', url: `${SITE_URL}/products/` },
		{ name: 'Sound Booster', url: `${SITE_URL}/products/sound-booster/` }
	]}
/>

<!-- WEB APPLICATION JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Sound Booster — Arbenger',
		url: `${SITE_URL}/products/sound-booster/`,
		applicationCategory: 'BrowserApplication',
		operatingSystem: 'Chrome',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description: 'Boost audio beyond 100%. Per-tab volume up to 600%, 5-band equalizer, presets, keyboard shortcuts.'
	}}
/>

<!-- BREADCRUMB JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products/` },
			{ '@type': 'ListItem', position: 3, name: 'Sound Booster', item: `${SITE_URL}/products/sound-booster/` }
		]
	}}
/>

<!-- HERO SECTION -->
<section class="relative overflow-hidden pt-32 pb-16 md:pb-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mx-auto max-w-3xl text-center">
			<!-- BADGES -->
			<div class="mb-6 flex items-center justify-center gap-3">
				<span class="rounded-full bg-[#2DD4BF]/10 px-3 py-1 text-xs font-semibold text-[#2DD4BF]">
					Live
				</span>
				<span class="rounded-full border border-[#E2E8F0] px-3 py-1 text-xs text-[#94A3B8] dark:border-[#2A2578] dark:text-slate-500">
					Chrome Extension
				</span>
			</div>

			<!-- PRODUCT LOGO -->
			<div class="mx-auto mb-8 flex justify-center">
				<img src="/sound-booster-icon.svg" alt="" width="80" height="80" class="block dark:hidden" />
				<img src="/sound-booster-icon-light.svg" alt="" width="80" height="80" class="hidden dark:block" />
			</div>

			<h1 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				Your browser stops at 100%. This goes to 600%.
			</h1>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				Volume boost, 5-band equalizer, seven presets, and keyboard shortcuts — in a Chrome extension that never touches your browsing data.
			</p>

			<!-- CTA BUTTONS -->
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="https://chromewebstore.google.com"
					target="_blank"
					rel="noopener"
					class="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#0891B2] px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_24px_rgba(8,145,178,0.3)] active:scale-[0.98] dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
				>
					<img src="/icons/chrome.svg" alt="Chrome" width="20" height="20" class="shrink-0 drop-shadow-sm" />
					Add to Chrome — Free
				</a>
				<Button href="/products/" variant="secondary" class="gap-2">
					All Products
					<ArrowRight size={14} />
				</Button>
			</div>
		</div>
	</div>
</section>

<!-- FEATURES GRID -->
<section class="py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mb-12 max-w-2xl">
			<SectionLabel label="Features" />
			<h2 class="font-display mt-4 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Quiet videos are not your problem anymore
			</h2>
			<p class="mt-3 text-[#475569] dark:text-slate-300">
				Volume boost, equalizer, presets, peak meter, keyboard shortcuts, and per-tab control — all in one popup.
			</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each FEATURES as feature, i}
				<!-- FEATURE CARD -->
				<div
					use:reveal={{ delay: i * 80 }}
					class="rounded-xl border border-[#E2E8F0] bg-white p-6 transition-all hover:border-[#0891B2]/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:border-[#2A2578] dark:bg-[#1E1A5E]/20 dark:hover:border-[#22D3EE]/30 dark:hover:shadow-none"
				>
					<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0891B2]/10 dark:bg-[#22D3EE]/10">
						<svelte:component this={feature.icon} size={20} class="text-[#0891B2] dark:text-[#22D3EE]" />
					</div>
					<h3 class="font-display text-lg font-bold text-[#0F172A] dark:text-white">{feature.title}</h3>
					<p class="mt-2 text-sm text-[#475569] dark:text-slate-400">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- HOW IT WORKS -->
<section class="border-y border-[#E2E8F0] bg-[#F8FAFC] py-16 md:py-24 dark:border-[#2A2578] dark:bg-[#1E1A5E]/10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mb-12 text-center">
			<SectionLabel label="How it works" />
			<h2 class="font-display mt-4 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Three steps. That's it.
			</h2>
		</div>

		<div class="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3">
			{#each STEPS as step, i}
				<!-- STEP CARD -->
				<div use:reveal={{ delay: i * 100 }} class="text-center">
					<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0891B2] font-mono text-lg font-bold text-white dark:bg-[#22D3EE] dark:text-[#0B0A23]">
						{step.num}
					</div>
					<h3 class="font-display text-lg font-bold text-[#0F172A] dark:text-white">{step.title}</h3>
					<p class="mt-2 text-sm text-[#475569] dark:text-slate-400">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- EQ PRESETS SHOWCASE -->
<section class="py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mb-12 text-center">
			<SectionLabel label="Presets" />
			<h2 class="font-display mt-4 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Seven profiles, one click each
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-[#475569] dark:text-slate-300">
				Seven built-in profiles tuned for different content. Save unlimited custom presets for your own setups.
			</p>
		</div>

		<div use:reveal={{ delay: 80 }} class="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{#each [
				{ name: 'Bass Boost', bands: [8, 5, 0, 0, 0] },
				{ name: 'Music', bands: [4, 2, 0, 3, 5] },
				{ name: 'Voice', bands: [-2, 0, 6, 4, -1] },
				{ name: 'Movie', bands: [6, 4, 2, 1, 3] }
			] as preset}
				<div class="rounded-xl border border-[#E2E8F0] bg-white p-4 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
					<p class="mb-3 font-mono text-xs font-semibold text-[#0891B2] dark:text-[#22D3EE]">{preset.name}</p>
					<div class="flex items-end justify-between gap-1" style="height: 48px;">
						{#each preset.bands as gain}
							<div class="flex-1 rounded-sm bg-[#0891B2]/20 dark:bg-[#22D3EE]/20" style="height: {Math.max(4, ((gain + 12) / 24) * 48)}px;"></div>
						{/each}
					</div>
					<div class="mt-2 flex justify-between">
						{#each ['60', '230', '910', '4k', '14k'] as freq}
							<span class="text-[7px] text-[#94A3B8] dark:text-slate-500">{freq}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- TRUST / PRIVACY -->
<section class="border-y border-[#E2E8F0] bg-[#F8FAFC] py-16 md:py-24 dark:border-[#2A2578] dark:bg-[#1E1A5E]/10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mx-auto max-w-2xl text-center">
			<SectionLabel label="Privacy" />
			<h2 class="font-display mt-4 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Most volume boosters want access to every page you visit. This one doesn't.
			</h2>
			<p class="mt-4 text-[#475569] dark:text-slate-300">
				We use only
				<code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-sm dark:bg-[#2A2578]">activeTab</code>,
				<code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-sm dark:bg-[#2A2578]">storage</code>, and
				<code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-sm dark:bg-[#2A2578]">scripting</code>
				— the minimum needed to process audio. No page content access, no network requests, no analytics.
			</p>

			<!-- TRUST BADGES -->
			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<div class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 dark:border-[#2A2578]">
					<Lock size={16} class="text-[#2DD4BF]" />
					<span class="text-sm text-[#475569] dark:text-slate-400">No page access</span>
				</div>
				<div class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 dark:border-[#2A2578]">
					<Shield size={16} class="text-[#2DD4BF]" />
					<span class="text-sm text-[#475569] dark:text-slate-400">No tracking</span>
				</div>
				<div class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 dark:border-[#2A2578]">
					<Feather size={16} class="text-[#2DD4BF]" />
					<span class="text-sm text-[#475569] dark:text-slate-400">Lightweight</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CROSS-LINKS -->
<section class="border-t border-[#E2E8F0] py-16 dark:border-[#2A2578]">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="text-center">
			<p class="text-sm text-[#64748B] dark:text-slate-400">Also from Arbenger</p>
			<div class="mt-4 flex flex-wrap items-center justify-center gap-4">
				<a href="/products/color-picker/" class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#475569] transition-colors hover:border-[#0891B2]/30 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/30 dark:hover:text-[#22D3EE]">
					Color Picker
					<ExternalLink size={12} />
				</a>
			</div>
		</div>
	</div>
</section>
