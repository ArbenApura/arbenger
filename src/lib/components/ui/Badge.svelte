<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// -- OPTIONAL PROPS -- //

	export let variant: 'teal' | 'cyan' = 'teal';
	let className: string = '';
	export { className as class };

	// -- CONSTANTS -- //

	const VARIANTS = {
		teal: 'bg-[#2DD4BF]/10 text-[#2DD4BF]',
		cyan: 'bg-[#22D3EE]/10 text-[#22D3EE]',
	} as const;
</script>

<!-- BADGE PILL -->
<span class={cn('inline-flex items-center rounded-full px-3 py-1 font-mono text-sm', VARIANTS[variant], className)}>
	<slot />
</span>
