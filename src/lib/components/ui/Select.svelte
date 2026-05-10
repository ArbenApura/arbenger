<script lang="ts" context="module">
	export interface SelectOption {
		value: string;
		label: string;
		icon?: typeof import('lucide-svelte').Icon;
		hint?: string;
		disabled?: boolean;
	}

	export interface SelectGroup {
		label: string;
		options: SelectOption[];
	}

	export type SelectItems = SelectOption[] | SelectGroup[];

	function isGrouped(items: SelectItems): items is SelectGroup[] {
		return items.length > 0 && 'options' in items[0];
	}

	function flattenItems(items: SelectItems): SelectOption[] {
		if (isGrouped(items)) {
			return items.flatMap((g) => g.options);
		}
		return items as SelectOption[];
	}
</script>

<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { ChevronDown, Check } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let items: SelectItems;
	export let value: string = '';

	// -- OPTIONAL PROPS -- //

	export let placeholder: string = 'Select...';
	export let icon: typeof import('lucide-svelte').Icon | undefined = undefined;
	export let disabled: boolean = false;
	export let id: string = '';
	let className: string = '';
	export { className as class };

	// -- STATES -- //

	let open = false;
	let triggerEl: HTMLButtonElement;
	let dropdownEl: HTMLDivElement;

	// -- REACTIVE STATES -- //

	$: allOptions = flattenItems(items);
	$: selectedOption = allOptions.find((o) => o.value === value) ?? null;
	$: grouped = isGrouped(items);
	$: groupedItems = grouped ? (items as SelectGroup[]) : [];

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ change: string }>();

	function toggle() {
		if (disabled) return;
		open = !open;
	}

	function select(opt: SelectOption) {
		if (opt.disabled) return;
		value = opt.value;
		open = false;
		dispatch('change', opt.value);
	}

	function handleClickOutside(e: MouseEvent) {
		if (!open) return;
		const target = e.target as Node;
		if (triggerEl?.contains(target) || dropdownEl?.contains(target)) return;
		open = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) {
			e.stopPropagation();
			open = false;
			triggerEl?.focus();
		}
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (typeof document !== 'undefined') {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeydown);
		}
	});
</script>

<div class={cn('relative', className)}>
	<!-- TRIGGER -->
	<button
		bind:this={triggerEl}
		{id}
		type="button"
		{disabled}
		class={cn(
			'flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200',
			'border-[#E2E8F0] bg-white hover:border-[#0891B2]',
			'dark:border-[#2A2578] dark:bg-[#1E1A5E]/50 dark:hover:border-[#22D3EE]',
			open && 'border-[#0891B2] ring-1 ring-[#0891B2] dark:border-[#22D3EE] dark:ring-[#22D3EE]',
			disabled && 'pointer-events-none opacity-50',
		)}
		on:click={toggle}
	>
		{#if icon}
			<svelte:component this={icon} size={14} class="shrink-0 text-[#94A3B8] dark:text-slate-500" />
		{:else if selectedOption?.icon}
			<svelte:component this={selectedOption.icon} size={14} class="shrink-0 text-[#94A3B8] dark:text-slate-500" />
		{/if}

		<span class={cn('flex-1 truncate', selectedOption ? 'text-[#0F172A] dark:text-white' : 'text-[#94A3B8] dark:text-slate-500')}>
			{selectedOption?.label ?? placeholder}
		</span>

		{#if selectedOption?.hint}
			<span class="shrink-0 text-xs tabular-nums text-[#94A3B8] dark:text-slate-500">
				{selectedOption.hint}
			</span>
		{/if}

		<ChevronDown
			size={14}
			class={cn(
				'shrink-0 text-[#94A3B8] transition-transform duration-200 dark:text-slate-500',
				open && 'rotate-180'
			)}
		/>
	</button>

	<!-- DROPDOWN -->
	{#if open}
		<div
			bind:this={dropdownEl}
			transition:fly={{ y: -8, duration: 180, easing: cubicOut }}
			class={cn(
				'absolute left-0 top-full z-50 mt-1.5 min-w-full w-max max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-lg',
				'border-[#E2E8F0] bg-white',
				'dark:border-[#2A2578] dark:bg-[#1E1A5E]'
			)}
		>
			<div class="max-h-64 overflow-y-auto p-1">
				{#if grouped}
					{#each groupedItems as group}
						<div class="px-2.5 pb-1 pt-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] dark:text-slate-500">
							{group.label}
						</div>
						{#each group.options as opt}
							<button
								type="button"
								disabled={opt.disabled}
								class={cn(
									'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors duration-150',
									opt.disabled
										? 'pointer-events-none text-[#CBD5E1] dark:text-slate-600'
										: opt.value === value
											? 'bg-[#0891B2]/8 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
											: 'text-[#334155] hover:bg-[#F1F5F9] dark:text-slate-300 dark:hover:bg-white/5'
								)}
								on:click={() => select(opt)}
							>
								{#if opt.icon}
									<svelte:component this={opt.icon} size={14} class="shrink-0" />
								{/if}

								<span class="flex-1 truncate">{opt.label}</span>

								{#if opt.hint}
									<span class="shrink-0 text-xs tabular-nums text-[#94A3B8] dark:text-slate-500">{opt.hint}</span>
								{/if}

								{#if opt.value === value}
									<Check size={14} class="shrink-0" />
								{/if}
							</button>
						{/each}
					{/each}
				{:else}
					{#each allOptions as opt}
						<button
							type="button"
							disabled={opt.disabled}
							class={cn(
								'flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors duration-150',
								opt.disabled
									? 'pointer-events-none text-[#CBD5E1] dark:text-slate-600'
									: opt.value === value
										? 'bg-[#0891B2]/8 text-[#0891B2] dark:bg-[#22D3EE]/10 dark:text-[#22D3EE]'
										: 'text-[#334155] hover:bg-[#F1F5F9] dark:text-slate-300 dark:hover:bg-white/5'
							)}
							on:click={() => select(opt)}
						>
							{#if opt.icon}
								<svelte:component this={opt.icon} size={14} class="shrink-0" />
							{/if}

							<span class="flex-1 truncate">{opt.label}</span>

							{#if opt.hint}
								<span class="shrink-0 text-xs tabular-nums text-[#94A3B8] dark:text-slate-500">{opt.hint}</span>
							{/if}

							{#if opt.value === value}
								<Check size={14} class="shrink-0" />
							{/if}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>
