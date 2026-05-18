<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// -- REQUIRED PROPS -- //

	export let label: string;

	// -- OPTIONAL PROPS -- //

	let className: string = '';
	export { className as class };
</script>

<!-- TERMINAL-STYLE SECTION LABEL -->
<p class={cn('mb-8 font-mono text-sm tracking-widest text-[#0891B2] uppercase dark:text-[#22D3EE]', className)}>
	{label}
</p>
