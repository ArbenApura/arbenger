<script lang="ts">
	// IMPORTED TYPES
	import type { JsonLdSchema } from '$lib/types';

	// -- REQUIRED PROPS -- //

	export let schema: JsonLdSchema;
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
</svelte:head>
