<script lang="ts">
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';

	// -- OPTIONAL PROPS -- //

	let className: string = '';
	export { className as class };
</script>

<!-- DOT-GRID BACKGROUND LAYER -->
<div class={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
	<!-- GRID PATTERN — RADIAL-GRADIENT DOTS CANNOT BE EXPRESSED AS TAILWIND -->
	<div
		class="absolute inset-0 opacity-15"
		style="background-image: radial-gradient(circle, #2A2578 1px, transparent 1px); background-size: 50px 50px;"
	></div>

	<!-- CENTER GLOW -->
	<div
		class="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
		style="background: radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%);"
	></div>
</div>
