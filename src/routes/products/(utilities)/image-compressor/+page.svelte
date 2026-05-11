<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy, onMount } from 'svelte';
	// IMPORTED MODULES
	import { beforeNavigate, goto } from '$app/navigation';
	import {
		activeImage,
		addImages,
		clearAll,
		destroyWorker,
		fetchStats,
		hasImages,
		hasUnprocessedImages,
		isBatchMode,
		processingState,
		totalProcessed,
	} from './_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { AlertTriangle, BookOpen, Globe, LogOut, Shield, Zap } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import UploadZone from '$lib/components/ui/UploadZone.svelte';
	import BatchImageList from './_components/BatchImageList.svelte';
	import CompareSlider from './_components/CompareSlider.svelte';
	import CompressControls from './_components/CompressControls.svelte';
	import CompressInfoPanel from './_components/CompressInfoPanel.svelte';
	import ThumbnailStrip from './_components/ThumbnailStrip.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- STATES -- //

	let leaveDialogOpen = false;
	let pendingLeaveUrl = '';
	let browserWarnings: string[] = [];

	// -- FUNCTIONS -- //

	async function handleFiles(e: CustomEvent<FileList | File[]>) {
		await addImages(e.detail);
	}

	function handlePaste(e: ClipboardEvent) {
		const items = e.clipboardData?.items;
		if (!items) return;

		const imageFiles: File[] = [];
		for (const item of items) {
			if (item.type.startsWith('image/')) {
				const file = item.getAsFile();
				if (file) imageFiles.push(file);
			}
		}

		if (imageFiles.length > 0) {
			e.preventDefault();
			addImages(imageFiles);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && $hasImages) {
			clearAll();
		}
	}

	// -- LIFECYCLES -- //

	function handleBeforeUnload(e: BeforeUnloadEvent) {
		if ($hasUnprocessedImages) {
			e.preventDefault();
		}
	}

	beforeNavigate(({ cancel, to }) => {
		if ($hasUnprocessedImages && !leaveDialogOpen) {
			cancel();
			pendingLeaveUrl = to?.url?.pathname ?? '/';
			leaveDialogOpen = true;
		}
	});

	function handleLeaveConfirm() {
		clearAll(true);
		goto(pendingLeaveUrl);
	}

	onMount(() => {
		document.addEventListener('paste', handlePaste);
		document.addEventListener('keydown', handleKeydown);
		window.addEventListener('beforeunload', handleBeforeUnload);
		fetchStats();

		const warnings: string[] = [];
		if (typeof createImageBitmap === 'undefined') warnings.push('Image decoding (createImageBitmap)');
		if (typeof OffscreenCanvas === 'undefined') warnings.push('Background processing (OffscreenCanvas)');
		if (typeof Worker === 'undefined') warnings.push('Web Workers');
		browserWarnings = warnings;
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('paste', handlePaste);
			document.removeEventListener('keydown', handleKeydown);
			window.removeEventListener('beforeunload', handleBeforeUnload);
		}
		clearAll(true);
		destroyWorker();
	});
</script>

<MetaTags
	title="Free Image Compressor — Compress PNG, JPEG, WebP Online | Arbenger"
	description="Compress PNG, JPEG, and WebP images up to 90% smaller. Quality slider, target size mode, and live before/after preview. No uploads — 100% private and free."
	url="{SITE_URL}/products/image-compressor/"
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Arbenger Image Compressor',
		url: `${SITE_URL}/products/image-compressor/`,
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'Any',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description: 'Free browser-based image compressor with quality slider, target size mode, and live before/after preview. No uploads — 100% private.',
	}}
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products/` },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Image Compressor',
				item: `${SITE_URL}/products/image-compressor/`,
			},
		],
	}}
/>

<div class="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pt-20 pb-8 sm:px-6 lg:px-8">
	<!-- TOP BAR -->
	<div class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
		<nav class="text-xs text-[#94A3B8] dark:text-slate-500">
			<a href="/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Home</a>
			<span class="mx-1">/</span>
			<a href="/products/" class="transition-colors hover:text-[#0891B2] dark:hover:text-[#22D3EE]">Products</a>
			<span class="mx-1">/</span>
			<span class="text-[#0F172A] dark:text-white">Image Compressor</span>
		</nav>

		<div class="flex items-center gap-3">
			<a
				href="/blog/how-to-use-image-compressor/"
				class="flex items-center gap-1 text-[10px] text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80"
			>
				<BookOpen size={10} />
				Guide
			</a>
			<span class="flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
				<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
				100% local — images never leave your browser
			</span>
		</div>
	</div>

	<!-- BROWSER COMPATIBILITY WARNING -->
	{#if browserWarnings.length > 0}
		<div class="mb-4 flex items-start gap-2.5 rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 px-4 py-3">
			<AlertTriangle size={16} class="mt-0.5 shrink-0 text-[#F59E0B]" />
			<div class="text-xs text-[#92400E] dark:text-[#FDE68A]">
				<p class="font-medium">Your browser is missing features needed for full functionality:</p>
				<p class="mt-1">{browserWarnings.join(', ')}. Some features may not work. Try updating your browser or switching to Chrome/Edge.</p>
			</div>
		</div>
	{/if}

	<h1 class="sr-only">Free Online Image Compressor — Reduce File Size Without Quality Loss</h1>

	{#if !$hasImages}
		<!-- UPLOAD ZONE -->
		<div class="flex flex-1 items-center justify-center py-6 lg:py-10">
			<UploadZone
				on:files={handleFiles}
				class="w-full max-w-2xl lg:min-h-[560px]"
				accept=".png,.jpg,.jpeg,.webp"
				formatHint="PNG, JPG, WebP"
			/>
		</div>
	{:else if !$isBatchMode}
		<!-- SINGLE IMAGE MODE -->
		<div class="flex flex-1 flex-col gap-4">
			<div class={cn($processingState !== 'idle' && 'pointer-events-none opacity-50')}>
				<ThumbnailStrip
					on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
					on:clearAll={() => clearAll()}
				/>
			</div>

			<div class="flex flex-1 gap-4">
				<!-- COMPARE SLIDER PREVIEW -->
				<div class="relative flex min-w-0 flex-1 flex-col">
					<CompareSlider />
				</div>

				<!-- DESKTOP SIDEBAR -->
				<div
					class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
				>
					<div class="flex flex-col gap-4 p-4">
						<CompressControls />
						<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
						<CompressInfoPanel />
					</div>
				</div>
			</div>

			<!-- MOBILE CONTROLS -->
			<div
				class="rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4">
					<CompressControls />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<CompressInfoPanel />
				</div>
			</div>
		</div>
	{:else}
		<!-- BATCH MODE -->
		<div class="flex gap-4 max-lg:flex-col">
			<!-- LEFT: IMAGE LIST -->
			<div
				class={cn(
					'flex min-h-[420px] min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#1E1A5E]/20',
					$processingState !== 'idle' && 'pointer-events-none opacity-50'
				)}
			>
				<BatchImageList
					on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
					on:clearAll={() => clearAll()}
				/>
			</div>

			<!-- RIGHT: BATCH CONTROLS SIDEBAR -->
			<div
				class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4 p-4">
					<CompressControls batch />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<CompressInfoPanel batch />
				</div>
			</div>
		</div>

		<!-- MOBILE BATCH CONTROLS -->
		<div
			class="mt-3 rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
		>
			<div class="flex flex-col gap-4">
				<CompressControls batch />
				<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
				<CompressInfoPanel batch />
			</div>
		</div>
	{/if}

	<!-- LIFETIME STATS -->
	{#if $totalProcessed !== null && $totalProcessed > 0}
		<div class="relative mt-4 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-10 text-center sm:p-14 dark:border-[#2A2578] dark:bg-[#0B0A23]">
			<!-- BACKGROUND GLOW -->
			<div class="pointer-events-none absolute inset-0">
				<div class="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE]/[0.07] blur-[100px]" />
			</div>

			<div class="relative">
				<!-- EYEBROW LABEL -->
				<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">
					Images compressed worldwide
				</p>

				<!-- BIG NUMBER -->
				<p class="mt-5 font-display text-7xl font-bold tabular-nums tracking-tight text-[#0F172A] sm:text-8xl dark:text-white">
					{$totalProcessed.toLocaleString()}
				</p>

				<p class="mt-3 font-display text-lg font-bold tracking-tight text-[#0F172A] sm:text-xl dark:text-white">
					and growing every day
				</p>

				<p class="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#64748B] dark:text-slate-400">
					Every single one processed right in the browser. No uploads, no servers, no compromises.
				</p>

				<!-- TRUST BADGES -->
				<div class="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Shield size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						Zero images stored
					</span>
					<span class="hidden h-3.5 w-px bg-[#E2E8F0] sm:block dark:bg-[#2A2578]" />
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Zap size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						Under 1s per image
					</span>
					<span class="hidden h-3.5 w-px bg-[#E2E8F0] sm:block dark:bg-[#2A2578]" />
					<span class="flex items-center gap-2 font-mono text-xs text-[#64748B] dark:text-slate-400">
						<Globe size={14} class="text-[#0891B2] dark:text-[#22D3EE]" />
						Works everywhere, no account
					</span>
				</div>
			</div>
		</div>
	{/if}

	<!-- RELATED TOOL -->
	<div class="mt-4 flex items-center justify-center gap-2 text-xs text-[#94A3B8] dark:text-slate-500">
		<span>Need to resize instead?</span>
		<a href="/products/image-resizer/" class="font-medium text-[#0891B2] transition-colors hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">
			Try Image Resizer
		</a>
	</div>
</div>

<!-- LEAVE PAGE CONFIRMATION -->
<ConfirmDialog
	bind:open={leaveDialogOpen}
	title="Leave Image Compressor?"
	message="You have images that haven't been processed yet. They'll be lost if you leave."
	confirmLabel="Leave"
	cancelLabel="Stay"
	variant="warning"
	icon={LogOut}
	on:confirm={handleLeaveConfirm}
/>
