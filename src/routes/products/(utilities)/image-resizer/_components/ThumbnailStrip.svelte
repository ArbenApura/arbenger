<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import {
		images,
		activeImageId,
		selectImage,
		removeImage,
		processingState
	} from '../_lib/store';
	// IMPORTED DEP-COMPONENTS
	import { Plus, X, Trash2 } from 'lucide-svelte';
	// IMPORTED COMPONENTS
	import ConfirmDialog from '$lib/components/ui/ConfirmDialog.svelte';

	// -- STATES -- //

	let fileInput: HTMLInputElement;
	let showClearConfirm = false;

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ addFiles: FileList; clearAll: void }>();

	function handleAdd(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.length) {
			dispatch('addFiles', input.files);
			input.value = '';
		}
	}
</script>

<div class="flex items-center gap-1.5 overflow-x-auto rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1.5 dark:border-[#2A2578] dark:bg-[#1E1A5E]/20">
	{#each $images as img (img.id)}
		<div class="group relative shrink-0">
			<button
				class={cn(
					'h-12 w-12 overflow-hidden rounded-lg border-2 transition-all duration-200',
					img.id === $activeImageId
						? 'border-[#0891B2] shadow-[0_0_8px_rgba(8,145,178,0.15)] dark:border-[#22D3EE] dark:shadow-[0_0_8px_rgba(34,211,238,0.15)]'
						: 'border-transparent hover:border-[#CBD5E1] dark:hover:border-slate-500',
					$processingState !== 'idle' && 'pointer-events-none opacity-60'
				)}
				on:click={() => selectImage(img.id)}
			>
				<img src={img.thumbnailUrl} alt="" class="h-full w-full object-cover" />
			</button>

			<button
				class="absolute -right-0.5 -top-0.5 hidden h-4 w-4 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-sm transition-all hover:bg-[#DC2626] group-hover:flex"
				on:click|stopPropagation={() => removeImage(img.id)}
			>
				<X size={10} />
			</button>
		</div>
	{/each}

	<button
		class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-dashed border-[#CBD5E1] text-[#CBD5E1] transition-all duration-200 hover:border-[#0891B2] hover:text-[#0891B2] dark:border-[#2A2578] dark:text-slate-600 dark:hover:border-[#22D3EE] dark:hover:text-[#22D3EE]"
		title="Add more images"
		on:click={() => fileInput.click()}
	>
		<Plus size={16} />
	</button>

	<div class="mx-0.5 h-6 w-px shrink-0 bg-[#E2E8F0] dark:bg-[#2A2578]" />

	<button
		class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-[#CBD5E1] transition-all duration-200 hover:bg-[#EF4444]/10 hover:text-[#EF4444] dark:text-slate-600 dark:hover:text-[#EF4444]"
		title="Clear all"
		disabled={$processingState !== 'idle'}
		on:click={() => (showClearConfirm = true)}
	>
		<Trash2 size={16} />
	</button>

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
