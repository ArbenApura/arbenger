<script lang="ts">
	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';
</script>

<!-- EMPTY STATE — ROCKET LAUNCHING SVG ILLUSTRATION -->
<svg viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="mx-auto h-30 w-[150px]" aria-hidden="true">
	<!-- LAUNCH PAD -->
	<rect x="55" y="100" width="40" height="4" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />

	<!-- EXHAUST FLAMES -->
	<path d="M 70 95 L 65 110 L 75 105 L 80 110 L 75 95" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" />
	<path d="M 72 90 L 68 108 L 75 102 L 82 108 L 78 90" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" class="animate-pulse" style="animation-delay: 0.3s;" />

	<!-- ROCKET BODY -->
	<rect x="68" y="40" width="14" height="50" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />

	<!-- ROCKET NOSE CONE -->
	<path d="M 68 40 L 75 20 L 82 40" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />

	<!-- ROCKET WINDOW -->
	<circle cx="75" cy="50" r="4" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" stroke-opacity="0.4" />

	<!-- ROCKET FINS -->
	<path d="M 68 80 L 60 92 L 68 88" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
	<path d="M 82 80 L 90 92 L 82 88" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />

	<!-- STARS -->
	<circle cx="30" cy="25" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" class="animate-pulse" />
	<circle cx="120" cy="35" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" style="animation-delay: 0.5s;" />
	<circle cx="40" cy="60" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" class="animate-pulse" style="animation-delay: 1s;" />
	<circle cx="110" cy="15" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" style="animation-delay: 0.7s;" />
	<circle cx="25" cy="80" r="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" class="animate-pulse" style="animation-delay: 1.2s;" />
	<circle cx="130" cy="70" r="1.5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" style="animation-delay: 0.3s;" />
</svg>
