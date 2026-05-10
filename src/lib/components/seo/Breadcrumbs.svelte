<script lang="ts">
	// IMPORTED COMPONENTS
	import JsonLd from '$lib/components/seo/JsonLd.svelte';

	// -- OPTIONAL PROPS -- //

	export let pageName: string = '';
	export let pageUrl: string = '';
	export let items: Array<{ name: string; url: string }> = [];

	// -- REACTIVE STATES -- //

	$: breadcrumbItems = items.length > 0 ? items : [{ name: pageName, url: pageUrl }];
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
			...breadcrumbItems.map((item, i) => ({
				'@type': 'ListItem',
				position: i + 2,
				name: item.name,
				item: item.url,
			})),
		],
	}}
/>
