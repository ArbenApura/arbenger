<script lang="ts">
	// -- REQUIRED PROPS -- //

	export let title: string;
	export let description: string;
	export let url: string;

	// -- OPTIONAL PROPS -- //

	export let image: string = 'https://arbenger.com/og-image.png';
	export let type: 'website' | 'article' = 'website';
	export let siteName: string = 'Arbenger';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<!-- OPEN GRAPH -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteName} />

	<!-- TWITTER CARD -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@arbenger" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
