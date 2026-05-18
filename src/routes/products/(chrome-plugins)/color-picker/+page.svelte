<script lang="ts">
	// IMPORTED DEP-MODULES
	import { Pipette, Eye, Palette, SlidersHorizontal, EyeOff, History, Shield, ArrowRight, ExternalLink, Download, EyeIcon, Lock, Feather } from 'lucide-svelte';
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
			icon: Pipette,
			title: 'One-Click Eyedropper',
			desc: 'Click any pixel on any page. HEX copies to your clipboard instantly — color details appear right in the popup.'
		},
		{
			icon: SlidersHorizontal,
			title: 'Four Format Output',
			desc: 'HEX, RGB, HSL, OKLCH — tap any row to copy. No more converting between formats manually.'
		},
		{
			icon: Palette,
			title: 'Instant Harmonies',
			desc: 'Get complementary, analogous, triadic, and split-complementary palettes from any picked color.'
		},
		{
			icon: Eye,
			title: 'Two-Color Contrast',
			desc: 'Set a text color and background. See your WCAG AA/AAA ratio instantly — no second tool needed.'
		},
		{
			icon: EyeOff,
			title: 'Color Blindness Preview',
			desc: 'Check how 8% of men see your color. Protanopia, deuteranopia, tritanopia — verified with Machado 2009.'
		},
		{
			icon: History,
			title: 'Persistent History',
			desc: 'Your last 10 picks survive browser restarts. Tap any saved color to reload and copy.'
		}
	];

	const STEPS = [
		{ num: '1', title: 'Install', desc: 'One click from the Chrome Web Store. Under 20 KB — installs in seconds.' },
		{ num: '2', title: 'Pick', desc: 'Click the extension icon, press Pick Color, click any pixel on the page.' },
		{ num: '3', title: 'Copy', desc: 'HEX is already on your clipboard. Open the popup for formats, harmonies, and contrast.' }
	];
</script>

<MetaTags
	title="Free Color Picker Chrome Extension — HEX, RGB, HSL, Contrast Checker | Arbenger"
	description="Pick colors from any webpage. HEX, RGB, HSL, OKLCH output. Color harmonies, WCAG contrast checker, color blindness simulation. Zero permissions. 100% free."
	url="{SITE_URL}/products/color-picker/"
/>

<Breadcrumbs
	items={[
		{ name: 'Products', url: `${SITE_URL}/products/` },
		{ name: 'Color Picker', url: `${SITE_URL}/products/color-picker/` }
	]}
/>

<!-- WEB APPLICATION JSON-LD -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Color Picker — Arbenger',
		url: `${SITE_URL}/products/color-picker/`,
		applicationCategory: 'BrowserApplication',
		operatingSystem: 'Chrome',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description: 'Pick colors from any webpage. HEX, RGB, HSL, OKLCH. Color harmonies, WCAG contrast checker, color blindness simulation.'
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
			{ '@type': 'ListItem', position: 3, name: 'Color Picker', item: `${SITE_URL}/products/color-picker/` }
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

			<!-- PRODUCT LOGO — DARK VARIANT ON LIGHT, LIGHT VARIANT ON DARK -->
			<div class="mx-auto mb-8 flex justify-center">
				<img src="/color-picker-icon.svg" alt="" width="80" height="80" class="block dark:hidden" />
				<img src="/color-picker-icon-light.svg" alt="" width="80" height="80" class="hidden dark:block" />
			</div>

			<h1 class="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
				Pick any color. Check if it's accessible.
			</h1>
			<p class="mt-4 text-lg text-[#475569] dark:text-slate-300">
				A Chrome extension that picks colors, checks WCAG contrast, and simulates color blindness — without requesting access to your browsing data.
			</p>

			<!-- CTA BUTTONS -->
			<div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a
					href="https://chromewebstore.google.com"
					target="_blank"
					rel="noopener"
					class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0891B2] px-6 py-3 font-medium text-white transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] active:scale-[0.98] dark:bg-[#22D3EE] dark:text-[#0B0A23] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
				>
					<Download size={16} />
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
				Six tools designers keep open in separate tabs — in one popup
			</h2>
			<p class="mt-3 text-[#475569] dark:text-slate-300">
				Color picker, format converter, palette generator, contrast checker, color blindness simulator, and history — 20 KB total.
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

<!-- TRUST / PRIVACY -->
<section class="py-16 md:py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div use:reveal class="mx-auto max-w-2xl text-center">
			<SectionLabel label="Privacy" />
			<h2 class="font-display mt-4 text-2xl font-bold tracking-tight text-[#0F172A] md:text-3xl dark:text-white">
				Other color pickers read your browsing history. This one doesn't.
			</h2>
			<p class="mt-4 text-[#475569] dark:text-slate-300">
				ColorZilla and most alternatives request "access to all websites." We only use
				<code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-sm dark:bg-[#2A2578]">activeTab</code>
				and
				<code class="rounded bg-[#F1F5F9] px-1.5 py-0.5 font-mono text-sm dark:bg-[#2A2578]">storage</code>
				— the minimum Chrome allows. No page content access, no network requests, no analytics.
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
					<span class="text-sm text-[#475569] dark:text-slate-400">Under 20 KB</span>
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
				<a href="/products/image-resizer/" class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#475569] transition-colors hover:border-[#0891B2]/30 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/30 dark:hover:text-[#22D3EE]">
					Image Resizer
					<ExternalLink size={12} />
				</a>
				<a href="/products/image-compressor/" class="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2.5 text-sm text-[#475569] transition-colors hover:border-[#0891B2]/30 hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-[#22D3EE]/30 dark:hover:text-[#22D3EE]">
					Image Compressor
					<ExternalLink size={12} />
				</a>
			</div>
		</div>
	</div>
</section>
