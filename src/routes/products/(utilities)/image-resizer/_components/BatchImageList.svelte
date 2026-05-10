<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		images,
		removeImage,
		reorderImages,
		updateImageFilename,
		applyBatchNaming,
		getImageFilename,
		hasImageCrop,
		getImageCrop,
		formatBytes,
		processingState,
		filenameRevision,
		cropRevision
	} from '../_lib/store';
	import type { NamingPattern, ImageEntry } from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { GripVertical, X, Plus, Trash2, Wand2, Crop } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import Select from '$lib/components/ui/Select.svelte';
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';
	import type { SelectOption } from '$lib/components/ui/Select.svelte';

	// -- CONSTANTS -- //

	const namingOptions: SelectOption[] = [
		{ value: 'sequential', label: 'Prefix + Number', hint: 'photo-1, photo-2' },
		{ value: 'prefix-original', label: 'Prefix + Original', hint: 'photo-name' },
		{ value: 'original-suffix', label: 'Original + Suffix', hint: 'name_resized' },
		{ value: 'number-only', label: 'Number Only', hint: '1, 2, 3' },
		{ value: 'template', label: 'Custom Template', hint: '{name}_{n}' }
	];

	// -- STATES -- //

	let fileInput: HTMLInputElement;
	let showClearConfirm = false;
	let dragFromIndex: number | null = null;
	let dragOverIndex: number | null = null;
	let namingPattern: string = 'sequential';
	let namingPrefix: string = 'photo';
	let namingTemplate: string = '{name}_{n}';
	let showNaming = false;

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ addFiles: FileList; clearAll: void; crop: ImageEntry }>();

	function handleAdd(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.length) {
			dispatch('addFiles', input.files);
			input.value = '';
		}
	}

	function handleDragStart(e: DragEvent, index: number) {
		dragFromIndex = index;
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			e.dataTransfer.setData('text/plain', String(index));
		}
	}

	function handleDragOver(e: DragEvent, index: number) {
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
		dragOverIndex = index;
	}

	function handleDragLeave() {
		dragOverIndex = null;
	}

	function handleDrop(e: DragEvent, toIndex: number) {
		e.preventDefault();
		if (dragFromIndex !== null && dragFromIndex !== toIndex) {
			reorderImages(dragFromIndex, toIndex);
		}
		dragFromIndex = null;
		dragOverIndex = null;
	}

	function handleDragEnd() {
		dragFromIndex = null;
		dragOverIndex = null;
	}

	let listEl: HTMLDivElement;
	let showScrollHint = false;

	function checkScroll() {
		if (!listEl) return;
		const { scrollTop, scrollHeight, clientHeight } = listEl;
		showScrollHint = scrollHeight > clientHeight && scrollTop < scrollHeight - clientHeight - 10;
	}

	function handleTouchStart(index: number) {
		dragFromIndex = index;
	}

	function handleTouchMove(e: TouchEvent) {
		if (dragFromIndex === null || !listEl) return;
		e.preventDefault();
		const touch = e.touches[0];
		const rows = listEl.querySelectorAll('[data-row-index]');
		for (const row of rows) {
			const rect = row.getBoundingClientRect();
			if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
				const idx = parseInt(row.getAttribute('data-row-index')!);
				dragOverIndex = idx;
				return;
			}
		}
	}

	function handleTouchEnd() {
		if (dragFromIndex !== null && dragOverIndex !== null && dragFromIndex !== dragOverIndex) {
			reorderImages(dragFromIndex, dragOverIndex);
		}
		dragFromIndex = null;
		dragOverIndex = null;
	}

	function handleFilenameInput(id: string, e: Event) {
		const value = (e.target as HTMLInputElement).value;
		updateImageFilename(id, value);
	}

	function applyNaming() {
		applyBatchNaming(
			namingPattern as NamingPattern,
			namingPrefix,
			namingTemplate
		);
	}

	function resolveFilename(id: string, _rev: number): string {
		return getImageFilename(id);
	}

	const cropThumbUrls = new Map<string, string>();

	function getCropThumbUrl(img: typeof $images[0], _rev: number): string | null {
		const crop = getImageCrop(img.id);
		if (!crop) {
			const old = cropThumbUrls.get(img.id);
			if (old) { URL.revokeObjectURL(old); cropThumbUrls.delete(img.id); }
			return null;
		}
		const key = `${img.id}-${crop.x}-${crop.y}-${crop.width}-${crop.height}`;
		if (cropThumbUrls.has(key)) return cropThumbUrls.get(key)!;

		const el = new Image();
		el.src = img.thumbnailUrl;
		const gen = () => {
			const canvas = document.createElement('canvas');
			canvas.width = crop.width;
			canvas.height = crop.height;
			const ctx = canvas.getContext('2d')!;
			ctx.drawImage(el, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
			canvas.toBlob((blob) => {
				if (blob) {
					const old = cropThumbUrls.get(img.id);
					if (old) URL.revokeObjectURL(old);
					cropThumbUrls.set(key, URL.createObjectURL(blob));
					cropThumbUrls.set(img.id, cropThumbUrls.get(key)!);
					images.update((l) => l);
				}
			});
		};
		if (el.complete) gen();
		else el.onload = gen;
		return null;
	}

	$: if ($images && listEl) {
		requestAnimationFrame(checkScroll);
	}
</script>

<div class="flex min-h-0 flex-1 flex-col">
	<!-- TOOLBAR -->
	<div class="flex items-center gap-2 border-b border-[#E2E8F0] px-3 py-2 dark:border-[#2A2578]">
		<span class="text-xs font-semibold text-[#0F172A] dark:text-white">
			{$images.length} images
		</span>

		<div class="flex-1" />

		<button
			class={cn(
				'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
				showNaming
					? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
					: 'text-[#64748B] hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5'
			)}
			on:click={() => (showNaming = !showNaming)}
		>
			<Wand2 size={12} />
			<span class="hidden sm:inline">Auto-name</span>
		</button>

		<button
			class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-black/5 dark:text-slate-400 dark:hover:bg-white/5"
			on:click={() => fileInput.click()}
		>
			<Plus size={12} />
			<span class="hidden sm:inline">Add</span>
		</button>

		<button
			class="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444] dark:text-slate-400"
			disabled={$processingState !== 'idle'}
			on:click={() => (showClearConfirm = true)}
		>
			<Trash2 size={12} />
		</button>
	</div>

	<!-- NAMING PANEL -->
	{#if showNaming}
		<div class="flex flex-wrap items-end gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 dark:border-[#2A2578] dark:bg-[#0B0A23]/30">
			<div class="w-full min-w-[200px] sm:w-auto">
				<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">Pattern</span>
				<Select items={namingOptions} bind:value={namingPattern} placeholder="Pattern..." class="w-full" />
			</div>

			{#if namingPattern === 'sequential' || namingPattern === 'prefix-original' || namingPattern === 'original-suffix'}
				<div class="w-28">
					<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">
						{namingPattern === 'original-suffix' ? 'Suffix' : 'Prefix'}
					</span>
					<input
						type="text"
						bind:value={namingPrefix}
						placeholder={namingPattern === 'sequential' ? 'photo' : 'resized'}
						class={cn(
							'w-full rounded-lg border bg-white px-3 py-2 text-sm transition-colors',
							'border-[#E2E8F0] text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
							'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
						)}
					/>
				</div>
			{/if}

			{#if namingPattern === 'template'}
				<div class="min-w-0 flex-1">
					<span class="mb-1 block text-[11px] font-medium text-[#94A3B8] dark:text-slate-500">
						Template <span class="text-[#CBD5E1] dark:text-slate-600">{'{name}'} {'{n}'} {'{w}'} {'{h}'}</span>
					</span>
					<input
						type="text"
						bind:value={namingTemplate}
						placeholder="{'{name}'}_{'{n}'}"
						class={cn(
							'w-full rounded-lg border bg-white px-3 py-2 font-mono text-sm transition-colors',
							'border-[#E2E8F0] text-[#0F172A] placeholder:text-[#CBD5E1] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
							'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
						)}
					/>
				</div>
			{/if}

			<button
				class="rounded-lg bg-[#0891B2] px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
				on:click={applyNaming}
			>
				Apply
			</button>
		</div>
	{/if}

	<!-- DESKTOP HEADER ROW (hidden on mobile) -->
	<div class="hidden items-center gap-2 border-b border-[#E2E8F0] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8] md:flex dark:border-[#2A2578] dark:text-slate-500">
		<span class="w-5" />
		<span class="w-4 text-center">#</span>
		<span class="w-10" />
		<span class="min-w-0 flex-1">Output name</span>
		<span class="w-24 text-right">Orig. size</span>
		<span class="w-28 text-right">Orig. dims</span>
		<span class="w-16" />
	</div>

	<!-- IMAGE ROWS -->
	<div class="relative min-h-0 flex-1">
		<div class="absolute inset-0 overflow-y-auto" bind:this={listEl} on:scroll={checkScroll}>
		{#each $images as img, i (img.id)}
			<!-- DESKTOP ROW -->
			<div
				data-row-index={i}
				class={cn(
					'group hidden items-center gap-2 border-b border-[#F1F5F9] px-3 py-2 transition-colors md:flex dark:border-[#2A2578]/30',
					dragOverIndex === i && 'border-t-2 border-t-[#0891B2] dark:border-t-[#22D3EE]',
					dragFromIndex === i && 'opacity-40'
				)}
				draggable="true"
				on:dragstart={(e) => handleDragStart(e, i)}
				on:dragover={(e) => handleDragOver(e, i)}
				on:dragleave={handleDragLeave}
				on:drop={(e) => handleDrop(e, i)}
				on:dragend={handleDragEnd}
				role="listitem"
			>
				<span class="w-5 shrink-0 text-[#CBD5E1] dark:text-slate-600">
					<GripVertical size={14} class="cursor-grab active:cursor-grabbing" />
				</span>

				<span class="w-4 shrink-0 text-center text-[11px] tabular-nums text-[#CBD5E1] dark:text-slate-600">
					{i + 1}
				</span>

				<div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
					<img src={getCropThumbUrl(img, $cropRevision) || img.thumbnailUrl} alt="" class="h-full w-full object-cover" />
				</div>

				<input
					type="text"
					value={resolveFilename(img.id, $filenameRevision)}
					on:input={(e) => handleFilenameInput(img.id, e)}
					class={cn(
						'min-w-0 flex-1 rounded-lg border bg-white px-2.5 py-2 text-xs transition-colors',
						'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
						'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
					)}
				/>

				<span class="w-24 shrink-0 text-right text-[11px] tabular-nums text-[#94A3B8] dark:text-slate-500">
					{formatBytes(img.originalSize)}
				</span>

				<span class="w-28 shrink-0 text-right text-[11px] tabular-nums text-[#94A3B8] dark:text-slate-500">
					{img.originalWidth}×{img.originalHeight}
				</span>

				<div class="flex shrink-0 items-center gap-0.5 opacity-0 transition-all group-hover:opacity-100">
					<button
						class={cn(
							'rounded-md p-1.5 transition-colors',
							$cropRevision >= 0 && hasImageCrop(img.id)
								? 'bg-[#0891B2]/10 text-[#0891B2] opacity-100 dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
								: 'text-[#94A3B8] hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-500 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]'
						)}
						title={hasImageCrop(img.id) ? 'Edit crop' : 'Crop image'}
						on:click={() => dispatch('crop', img)}
					>
						<Crop size={13} />
					</button>
					<button
						class="rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444] dark:text-slate-500"
						title="Remove image"
						on:click={() => removeImage(img.id)}
					>
						<X size={13} />
					</button>
				</div>
			</div>

			<!-- MOBILE CARD -->
			<div
				data-row-index={i}
				class={cn(
					'group flex items-start gap-3 border-b border-[#F1F5F9] px-3 py-2.5 transition-colors md:hidden dark:border-[#2A2578]/30',
					dragOverIndex === i && 'border-t-2 border-t-[#0891B2] dark:border-t-[#22D3EE]',
					dragFromIndex === i && 'opacity-40'
				)}
				role="listitem"
			>
				<span
					class="mt-1 shrink-0 touch-none text-[#CBD5E1] dark:text-slate-600"
					on:touchstart|preventDefault={() => handleTouchStart(i)}
					on:touchmove|nonpassive={handleTouchMove}
					on:touchend={handleTouchEnd}
				>
					<GripVertical size={14} class="cursor-grab active:cursor-grabbing" />
				</span>

				<div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#E2E8F0] dark:border-[#2A2578]">
					<img src={getCropThumbUrl(img, $cropRevision) || img.thumbnailUrl} alt="" class="h-full w-full object-cover" />
				</div>

				<div class="min-w-0 flex-1 space-y-1.5">
					<div class="flex items-center gap-2">
						<input
							type="text"
							value={resolveFilename(img.id, $filenameRevision)}
							on:input={(e) => handleFilenameInput(img.id, e)}
							class={cn(
								'min-w-0 flex-1 rounded-lg border bg-white px-2.5 py-2 text-xs transition-colors',
								'border-[#E2E8F0] text-[#0F172A] focus:border-[#0891B2] focus:outline-none focus:ring-1 focus:ring-[#0891B2]',
								'dark:border-[#2A2578] dark:bg-[#0B0A23]/50 dark:text-white dark:focus:border-[#22D3EE] dark:focus:ring-[#22D3EE]'
							)}
						/>
						<div class="flex shrink-0 items-center gap-0.5">
							<button
								class={cn(
									'rounded-md p-1.5 transition-colors',
									$cropRevision >= 0 && hasImageCrop(img.id)
										? 'bg-[#0891B2]/10 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
										: 'text-[#94A3B8] hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-500 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]'
								)}
								on:click={() => dispatch('crop', img)}
							>
								<Crop size={13} />
							</button>
							<button
								class="rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-[#EF4444]/10 hover:text-[#EF4444] dark:text-slate-500"
								on:click={() => removeImage(img.id)}
							>
								<X size={13} />
							</button>
						</div>
					</div>

					<div class="flex gap-3 text-[11px] tabular-nums text-[#94A3B8] dark:text-slate-500">
						<span>{formatBytes(img.originalSize)}</span>
						<span>{img.originalWidth}×{img.originalHeight}</span>
					</div>
				</div>
			</div>
		{/each}
		</div>

		<!-- SCROLL HINT -->
		{#if showScrollHint}
			<div class="pointer-events-none absolute bottom-0 left-0 right-0 flex flex-col items-center pb-2 pt-8 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#1E1A5E] dark:via-[#1E1A5E]/80">
				<div class="animate-bounce text-[#94A3B8] dark:text-slate-500">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</div>
		{/if}
	</div>

	<input
		bind:this={fileInput}
		type="file"
		accept=".png,.jpg,.jpeg,.webp,.gif,.bmp,.svg"
		multiple
		class="hidden"
		on:change={handleAdd}
	/>
</div>

<ConfirmDialog
	bind:open={showClearConfirm}
	title="Clear all images?"
	message="This will remove all uploaded images and reset all settings."
	confirmLabel="Clear all"
	variant="danger"
	on:confirm={() => dispatch('clearAll')}
/>
