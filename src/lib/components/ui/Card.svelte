<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// -- OPTIONAL PROPS -- //

	export let href: string = '';
	let className: string = '';
	export { className as class };

	// -- STATES -- //

	let isHovered = false;
</script>

<!-- CARD WRAPPER -->
<svelte:element
	this={href ? 'a' : 'div'}
	{...href ? { href } : {}}
	class={cn(
		'block rounded-xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300',
		'dark:border-[#2A2578] dark:bg-[#1E1A5E]',
		isHovered && 'translate-y-[-2px] shadow-[0_0_40px_rgba(34,211,238,0.1)]',
		href && 'cursor-pointer',
		className,
	)}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role={href ? undefined : 'group'}
>
	<slot />
</svelte:element>
