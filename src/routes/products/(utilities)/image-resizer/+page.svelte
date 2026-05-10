<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onDestroy, onMount } from 'svelte';
	// IMPORTED MODULES
	import { beforeNavigate, goto } from '$app/navigation';
	import type { CropData } from './_lib/store';
	import {
		activeImage,
		addImages,
		clearAll,
		cropRevision,
		destroyWorker,
		hasImageCrop,
		hasImages,
		hasUnprocessedImages,
		isBatchMode,
		setImageCrop,
	} from './_lib/store';
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Crop, LogOut, Shield } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import BatchImageList from './_components/BatchImageList.svelte';
	import CropDialog from './_components/CropDialog.svelte';
	import InfoPanel from './_components/InfoPanel.svelte';
	import PreviewCanvas from './_components/PreviewCanvas.svelte';
	import ResizeControls from './_components/ResizeControls.svelte';
	import ThumbnailStrip from './_components/ThumbnailStrip.svelte';
	import UploadZone from './_components/UploadZone.svelte';

	// -- CONSTANTS -- //

	const SITE_URL = 'https://arbenger.com';

	// -- STATES -- //

	let cropDialogOpen = false;
	let cropDialogImage: typeof $activeImage = null;
	let cropDialogRef: CropDialog;

	let leaveDialogOpen = false;
	let pendingLeaveUrl = '';

	// -- FUNCTIONS -- //

	function openCropDialog(img: typeof $activeImage) {
		if (!img) return;
		cropDialogImage = img;
		cropDialogRef?.show(img);
	}

	function handleCropApply(e: CustomEvent<CropData>) {
		if (!cropDialogImage) return;
		const crop = e.detail;
		const isFullImage =
			crop.x === 0 &&
			crop.y === 0 &&
			crop.width === cropDialogImage.originalWidth &&
			crop.height === cropDialogImage.originalHeight;
		setImageCrop(cropDialogImage.id, isFullImage ? null : crop);
	}

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
	title="Free Image Resizer — Resize, Crop & Convert Online | Arbenger"
	description="Resize, crop, and batch-convert images to PNG, JPEG, or WebP — directly in your browser. No uploads, no signups. 100% private and free."
	url="{SITE_URL}/products/image-resizer"
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Arbenger Image Resizer',
		url: `${SITE_URL}/products/image-resizer`,
		applicationCategory: 'UtilitiesApplication',
		operatingSystem: 'Any',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		description: 'Free browser-based image resizer with crop, batch processing, and format conversion. No uploads — 100% private.',
	}}
/>

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
			{ '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
			{
				'@type': 'ListItem',
				position: 3,
				name: 'Image Resizer',
				item: `${SITE_URL}/products/image-resizer`,
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
			<span class="text-[#0F172A] dark:text-white">Image Resizer</span>
		</nav>

		<span class="flex items-center gap-1 text-[10px] text-[#94A3B8] dark:text-slate-500">
			<Shield size={10} class="text-[#0891B2] dark:text-[#22D3EE]" />
			100% local — images never leave your browser
		</span>
	</div>

	<h1 class="sr-only">Free Online Image Resizer — Resize, Crop & Convert</h1>

	{#if !$hasImages}
		<!-- UPLOAD ZONE -->
		<div class="flex flex-1 items-center justify-center">
			<UploadZone on:files={handleFiles} class="w-full max-w-2xl" />
		</div>
	{:else if !$isBatchMode}
		<!-- SINGLE IMAGE MODE -->
		<div class="flex flex-1 flex-col gap-4">
			<ThumbnailStrip
				on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
				on:clearAll={clearAll}
			/>

			<div class="flex flex-1 gap-4">
				<div class="flex min-w-0 flex-1 flex-col gap-2">
					<PreviewCanvas />
					{#if $activeImage}
						<button
							class={cn(
								'flex items-center gap-1.5 self-start rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
								$cropRevision >= 0 && hasImageCrop($activeImage.id)
									? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
									: 'text-[#64748B] hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5',
							)}
							on:click={() => openCropDialog($activeImage)}
						>
							<Crop size={12} />
							{$cropRevision >= 0 && hasImageCrop($activeImage.id) ? 'Cropped' : 'Crop'}
						</button>
					{/if}
				</div>

				<div
					class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
				>
					<div class="flex flex-col gap-4 p-4">
						<ResizeControls />
						<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
						<InfoPanel />
					</div>
				</div>
			</div>

			<div
				class="rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4">
					<ResizeControls />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<InfoPanel />
				</div>
			</div>
		</div>
	{:else}
		<!-- BATCH MODE -->
		<div class="flex gap-4 max-lg:flex-col">
			<!-- LEFT: IMAGE LIST -->
			<div
				class="flex min-h-[420px] min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<BatchImageList
					on:addFiles={(e) => handleFiles(new CustomEvent('files', { detail: e.detail }))}
					on:clearAll={clearAll}
					on:crop={(e) => openCropDialog(e.detail)}
				/>
			</div>

			<!-- RIGHT: BATCH CONTROLS SIDEBAR -->
			<div
				class="w-[360px] shrink-0 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white max-lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
			>
				<div class="flex flex-col gap-4 p-4">
					<ResizeControls batch />
					<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
					<InfoPanel batch />
				</div>
			</div>
		</div>

		<!-- MOBILE BATCH CONTROLS -->
		<div
			class="mt-3 rounded-xl border border-[#E2E8F0] bg-white p-4 lg:hidden dark:border-[#2A2578] dark:bg-[#1E1A5E]/20"
		>
			<div class="flex flex-col gap-4">
				<ResizeControls batch />
				<div class="border-t border-[#F1F5F9] dark:border-[#2A2578]/50" />
				<InfoPanel batch />
			</div>
		</div>
	{/if}
</div>

<CropDialog
	bind:this={cropDialogRef}
	bind:open={cropDialogOpen}
	image={cropDialogImage}
	on:apply={handleCropApply}
/>

<!-- LEAVE PAGE CONFIRMATION -->
<ConfirmDialog
	bind:open={leaveDialogOpen}
	title="Leave Image Resizer?"
	message="You have images that haven't been processed yet. They'll be lost if you leave."
	confirmLabel="Leave"
	cancelLabel="Stay"
	variant="warning"
	icon={LogOut}
	on:confirm={handleLeaveConfirm}
/>
