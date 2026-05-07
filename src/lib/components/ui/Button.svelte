<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// -- OPTIONAL PROPS -- //

	export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';
	export let href: string = '';
	export let disabled: boolean = false;
	let className: string = '';
	export { className as class };

	// -- CONSTANTS -- //

	const BASE =
		'inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/50 active:scale-[0.98]';

	const VARIANTS = {
		primary: 'bg-[#22D3EE] text-[#0B0A23] hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:brightness-110',
		secondary: 'border border-[#161446] text-[#161446] hover:bg-[#161446]/5 dark:border-[#22D3EE] dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10',
		ghost: 'text-[#334155] hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5',
	} as const;
</script>

{#if href}
	<!-- LINK BUTTON -->
	<a {href} class={cn(BASE, VARIANTS[variant], disabled && 'pointer-events-none opacity-50', className)}>
		<slot />
	</a>
{:else}
	<!-- STANDARD BUTTON -->
	<button
		{disabled}
		class={cn(BASE, VARIANTS[variant], disabled && 'pointer-events-none opacity-50', className)}
		on:click
	>
		<slot />
	</button>
{/if}
