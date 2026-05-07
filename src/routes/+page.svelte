<script lang="ts">
	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
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
		]
	}}
/>

<Hero />
