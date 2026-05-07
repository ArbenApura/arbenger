<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ProductCategories from '$lib/components/home/ProductCategories.svelte';
	import AboutTeaser from '$lib/components/home/AboutTeaser.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import GeometricDivider from '$lib/components/ui/GeometricDivider.svelte';
</script>

<MetaTags
	title="AI Tools & Developer Products | Arbenger"
	description="Arbenger builds AI tools, VS Code extensions, Chrome plugins, and SaaS products for developers and creators."
	url="https://arbenger.com"
/>

<!-- ORGANIZATION JSON-LD (HOMEPAGE ONLY) -->
<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Arbenger',
		url: 'https://arbenger.com',
		logo: 'https://arbenger.com/arbenger.svg',
		description: 'Building AI tools, developer extensions, and SaaS products.',
		sameAs: [
			'https://github.com/arbenger',
		],
	}}
/>

<!-- HERO -->
<Hero />

<!-- PRODUCT CATEGORIES -->
<ProductCategories />

<!-- ABOUT TEASER -->
<AboutTeaser />

<!-- GEOMETRIC DIVIDER -->
<GeometricDivider />

<!-- SINGLE-LINE CTA — REPLACES THE BLOATED CONNECT SECTION -->
<section class="py-20">
	<div use:reveal class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
		<p class="text-lg text-[#475569] dark:text-slate-300">
			Got an idea? Want to collaborate? Just want to say hey?
		</p>
		<Button href="/contact" variant="primary">Let's talk</Button>
	</div>
</section>
