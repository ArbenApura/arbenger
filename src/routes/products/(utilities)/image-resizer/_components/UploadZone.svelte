<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher } from 'svelte';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { Upload } from 'lucide-svelte';

	// -- OPTIONAL PROPS -- //

	let className: string = '';
	export { className as class };

	// -- CONSTANTS -- //

	const ACCEPT = '.png,.jpg,.jpeg,.webp,.gif,.bmp,.svg';

	// -- STATES -- //

	let isDragOver = false;
	let fileInput: HTMLInputElement;

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ files: FileList | File[] }>();

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragOver = false;
		if (e.dataTransfer?.files?.length) {
			dispatch('files', e.dataTransfer.files);
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave() {
		isDragOver = false;
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files?.length) {
			dispatch('files', input.files);
			input.value = '';
		}
	}

	function handleClick() {
		fileInput.click();
	}
</script>

<div
	role="button"
	tabindex="0"
	class={cn(
		'relative flex min-h-[400px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-300',
		'border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#0891B2] hover:bg-[#F1F5F9]',
		'dark:border-[#2A2578] dark:bg-[#1E1A5E]/30 dark:hover:border-[#22D3EE] dark:hover:bg-[#1E1A5E]/50',
		isDragOver && 'border-[#0891B2] bg-[#0891B2]/5 dark:border-[#22D3EE] dark:bg-[#22D3EE]/5',
		className
	)}
	on:drop={handleDrop}
	on:dragover={handleDragOver}
	on:dragleave={handleDragLeave}
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
	<div class={cn('mb-4 rounded-xl p-4', 'bg-[#E2E8F0] dark:bg-[#2A2578]/50')}>
		<Upload
			size={32}
			class={cn(
				'transition-colors duration-200',
				isDragOver ? 'text-[#0891B2] dark:text-[#22D3EE]' : 'text-[#94A3B8] dark:text-slate-400'
			)}
		/>
	</div>

	<p class="mb-1 text-base font-medium text-[#0F172A] dark:text-white">
		Drop images here, paste, or
	</p>

	<button
		class="mt-2 rounded-lg bg-[#0891B2] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]"
		on:click|stopPropagation={() => fileInput.click()}
	>
		Browse Files
	</button>

	<p class="mt-3 text-xs text-[#94A3B8] dark:text-slate-400">
		PNG, JPG, WebP, GIF, BMP, SVG
	</p>

	<input
		bind:this={fileInput}
		type="file"
		accept={ACCEPT}
		multiple
		class="hidden"
		on:change={handleFileSelect}
	/>
</div>
