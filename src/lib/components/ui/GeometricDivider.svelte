<script lang="ts">
	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';
</script>

<!-- GEOMETRIC DIVIDER — ANGULAR CHEVRON PATTERN MATCHING THE "A" LOGO ANGLE -->
<div class="relative w-full overflow-hidden" aria-hidden="true">
	<svg viewBox="0 0 1200 50" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full" preserveAspectRatio="none" style="height: 50px;">
		<!-- CHEVRON LINES -->
		<path d="M 0 48 L 200 25 L 400 48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.15" fill="none" />
		<path d="M 200 48 L 400 25 L 600 48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.2" fill="none" />
		<path d="M 400 48 L 600 25 L 800 48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.15" fill="none" />
		<path d="M 600 48 L 800 25 L 1000 48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.2" fill="none" />
		<path d="M 800 48 L 1000 25 L 1200 48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" opacity="0.15" fill="none" />
		<!-- CENTER ACCENT LINE -->
		<path d="M 0 25 L 1200 25" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.3" opacity="0.1" />
		<!-- DOT ACCENTS AT PEAKS -->
		<circle cx="200" cy="25" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<circle cx="400" cy="25" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<circle cx="600" cy="25" r="2.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
		<circle cx="800" cy="25" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<circle cx="1000" cy="25" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
	</svg>
</div>
