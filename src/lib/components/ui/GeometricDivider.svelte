<script lang="ts">
	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// -- REACTIVE STATES -- //

	$: gridColor = $isDark ? 'rgba(34, 211, 238, 0.3)' : 'rgba(8, 145, 178, 0.35)';
</script>

<!-- GEOMETRIC DIVIDER — 3D DIAMOND MESH IN PERSPECTIVE -->
<section class="relative overflow-hidden py-32">
	<!-- PERSPECTIVE CONTAINER — perspective CREATES 3D VIEWING CONTEXT, NOT EXPRESSIBLE AS TAILWIND -->
	<div class="pointer-events-none absolute inset-0" style="perspective: 800px;" aria-hidden="true">
		<!-- DIAMOND GRID — repeating-linear-gradient AT ±45° WITH rotateX FOR 3D DEPTH, OVERSCALED TO FILL PAST PERSPECTIVE EDGES -->
		<div
			class="absolute -left-[150%] -top-[500%] bottom-0 origin-bottom"
			style="width: 400%; transform: rotateX(70deg); background-image: repeating-linear-gradient(45deg, {gridColor} 0px, transparent 1px, transparent 50px), repeating-linear-gradient(-45deg, {gridColor} 0px, transparent 1px, transparent 50px);"
		></div>
	</div>

	<!-- TOP EDGE FADE -->
	<div class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-[#F1F5F9] to-transparent dark:from-[#0B0A23]"></div>
	<!-- BOTTOM EDGE FADE -->
	<div class="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-20 bg-gradient-to-t from-[#F1F5F9] to-transparent dark:from-[#0B0A23]"></div>
	<!-- LEFT EDGE FADE -->
	<div class="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[#F1F5F9] to-transparent dark:from-[#0B0A23]"></div>
	<!-- RIGHT EDGE FADE -->
	<div class="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[#F1F5F9] to-transparent dark:from-[#0B0A23]"></div>

	<!-- CONTENT -->
	<div class="relative z-10">
		<slot />
	</div>
</section>
