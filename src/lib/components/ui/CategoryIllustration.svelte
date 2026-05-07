<script lang="ts">
	// IMPORTED TYPES
	import type { ProductCategory } from '$lib/types';

	// IMPORTED STORES
	import { isDark } from '$lib/stores/theme';

	// -- REQUIRED PROPS -- //

	export let category: ProductCategory;
</script>

<!-- CATEGORY ILLUSTRATION — INLINE SVG MOCKUPS FOR EACH PRODUCT CATEGORY -->
{#if category === 'vscode-extensions'}
	<!-- VS CODE EDITOR MOCKUP -->
	<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20 w-30" aria-hidden="true">
		<!-- WINDOW FRAME -->
		<rect x="1" y="1" width="118" height="78" rx="4" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
		<!-- TITLE BAR -->
		<rect x="1" y="1" width="118" height="12" rx="4" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<circle cx="10" cy="7" r="2" fill="#EF4444" opacity="0.6" />
		<circle cx="18" cy="7" r="2" fill="#F59E0B" opacity="0.6" />
		<circle cx="26" cy="7" r="2" fill="#22C55E" opacity="0.6" />
		<!-- SIDEBAR -->
		<rect x="1" y="13" width="24" height="66" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.05" />
		<rect x="6" y="20" width="14" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="9" y="26" width="11" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="9" y="32" width="9" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="6" y="40" width="14" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="9" y="46" width="11" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<!-- CODE LINES -->
		<rect x="32" y="20" width="40" height="2" rx="1" fill="#A78BFA" opacity="0.5" />
		<rect x="36" y="26" width="55" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
		<rect x="36" y="32" width="35" height="2" rx="1" fill="#F59E0B" opacity="0.4" />
		<rect x="40" y="38" width="50" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="40" y="44" width="30" height="2" rx="1" fill="#22C55E" opacity="0.4" />
		<rect x="36" y="50" width="45" height="2" rx="1" fill="#A78BFA" opacity="0.4" />
		<rect x="32" y="56" width="25" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="36" y="62" width="60" height="2" rx="1" fill="#F59E0B" opacity="0.3" />
	</svg>

{:else if category === 'chrome-plugins'}
	<!-- BROWSER WINDOW MOCKUP -->
	<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20 w-30" aria-hidden="true">
		<!-- WINDOW FRAME -->
		<rect x="1" y="1" width="118" height="78" rx="4" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
		<!-- TAB BAR -->
		<rect x="1" y="1" width="118" height="10" rx="4" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="6" y="3" width="30" height="6" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<!-- ADDRESS BAR -->
		<rect x="6" y="14" width="90" height="6" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.08" />
		<rect x="10" y="16" width="50" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<!-- EXTENSION ICON — HIGHLIGHTED -->
		<rect x="100" y="13" width="14" height="8" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
		<rect x="103" y="15" width="8" height="4" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.5" />
		<!-- PAGE CONTENT -->
		<rect x="10" y="28" width="70" height="3" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<rect x="10" y="35" width="100" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="10" y="41" width="85" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="10" y="47" width="95" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<!-- EXTENSION POPUP -->
		<rect x="80" y="24" width="34" height="44" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="0.5" stroke-opacity="0.3" />
		<rect x="84" y="30" width="26" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="84" y="36" width="20" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="84" y="42" width="16" height="6" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
	</svg>

{:else if category === 'ai-tools'}
	<!-- AI CHAT INTERFACE MOCKUP -->
	<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20 w-30" aria-hidden="true">
		<!-- WINDOW FRAME -->
		<rect x="1" y="1" width="118" height="78" rx="4" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
		<!-- AI MESSAGE BUBBLE -->
		<rect x="8" y="10" width="60" height="14" rx="6" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
		<rect x="14" y="14" width="40" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="14" y="19" width="30" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<!-- USER MESSAGE BUBBLE -->
		<rect x="50" y="30" width="62" height="10" rx="5" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="56" y="34" width="35" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
		<!-- AI RESPONSE WITH THINKING INDICATOR -->
		<rect x="8" y="46" width="70" height="16" rx="6" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
		<rect x="14" y="50" width="50" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<circle cx="18" cy="58" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.5" class="animate-pulse" />
		<circle cx="26" cy="58" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" class="animate-pulse" style="animation-delay: 0.2s;" />
		<circle cx="34" cy="58" r="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" class="animate-pulse" style="animation-delay: 0.4s;" />
		<!-- INPUT BAR -->
		<rect x="8" y="68" width="104" height="6" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.08" />
	</svg>

{:else if category === 'misc-tools'}
	<!-- UTILITY DASHBOARD MOCKUP -->
	<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20 w-30" aria-hidden="true">
		<!-- WINDOW FRAME -->
		<rect x="1" y="1" width="118" height="78" rx="4" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
		<!-- TITLE BAR -->
		<rect x="1" y="1" width="118" height="10" rx="4" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<!-- CONVERSION ARROWS -->
		<rect x="10" y="18" width="30" height="12" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<rect x="14" y="22" width="16" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
		<path d="M 48 24 L 56 24" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1.5" opacity="0.4" />
		<path d="M 53 21 L 56 24 L 53 27" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1.5" opacity="0.4" fill="none" />
		<rect x="62" y="18" width="30" height="12" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<rect x="66" y="22" width="16" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.4" />
		<!-- PROGRESS BAR -->
		<rect x="10" y="38" width="100" height="6" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.08" />
		<rect x="10" y="38" width="65" height="6" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.25" />
		<!-- FILE ICONS ROW -->
		<rect x="10" y="52" width="12" height="14" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
		<rect x="12" y="58" width="8" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="28" y="52" width="12" height="14" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
		<rect x="30" y="58" width="8" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="46" y="52" width="12" height="14" rx="2" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.12" />
		<rect x="48" y="58" width="8" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
	</svg>

{:else if category === 'saas'}
	<!-- APP DASHBOARD MOCKUP -->
	<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-20 w-30" aria-hidden="true">
		<!-- WINDOW FRAME -->
		<rect x="1" y="1" width="118" height="78" rx="4" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.4" />
		<!-- SIDEBAR NAV -->
		<rect x="1" y="1" width="22" height="78" rx="4" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.06" />
		<rect x="5" y="10" width="14" height="3" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="5" y="18" width="14" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<rect x="5" y="24" width="14" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<rect x="5" y="30" width="14" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.15" />
		<!-- DATA CARDS ROW -->
		<rect x="28" y="8" width="26" height="18" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="32" y="12" width="12" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="32" y="18" width="18" height="3" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="58" y="8" width="26" height="18" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="62" y="12" width="12" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="62" y="18" width="18" height="3" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<rect x="88" y="8" width="26" height="18" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.1" />
		<rect x="92" y="12" width="12" height="2" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.3" />
		<rect x="92" y="18" width="18" height="3" rx="1" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.2" />
		<!-- CHART AREA -->
		<rect x="28" y="32" width="86" height="40" rx="3" fill={$isDark ? '#22D3EE' : '#0891B2'} opacity="0.05" />
		<polyline points="32,64 45,52 55,58 70,44 82,50 95,38 110,42" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1.5" opacity="0.4" fill="none" />
		<polyline points="32,64 45,56 55,60 70,50 82,54 95,46 110,48" stroke={$isDark ? '#22D3EE' : '#0891B2'} stroke-width="1" opacity="0.2" fill="none" stroke-dasharray="2 2" />
	</svg>
{/if}
