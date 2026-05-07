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
		'block rounded-xl border border-[#F1F5F9] bg-white p-6 transition-all duration-300',
		'shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)]',
		'dark:border-[#2A2578] dark:bg-[#1E1A5E] dark:shadow-none',
		isHovered && 'translate-y-[-2px] shadow-[0_4px_16px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] dark:shadow-[0_0_40px_rgba(34,211,238,0.1)]',
		href && 'cursor-pointer',
		className,
	)}
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role={href ? undefined : 'group'}
>
	<slot />
</svelte:element>
