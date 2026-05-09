<script lang="ts">
	// IMPORTED COMPONENTS
	import JsonLd from '$lib/components/seo/JsonLd.svelte';

	// -- REQUIRED PROPS -- //

	export let pageName: string;
	export let pageUrl: string;
</script>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://arbenger.com',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: pageName,
				item: pageUrl,
			},
		],
	}}
/>
