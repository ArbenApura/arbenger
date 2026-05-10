<script lang="ts">
	// IMPORTED DEP-MODULES
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	// IMPORTED DEP-COMPONENTS
	import { AlertTriangle, X } from 'lucide-svelte';

	// -- REQUIRED PROPS -- //

	export let open: boolean = false;
	export let title: string = 'Are you sure?';
	export let message: string = 'This action cannot be undone.';

	// -- OPTIONAL PROPS -- //

	export let confirmLabel: string = 'Confirm';
	export let cancelLabel: string = 'Cancel';
	export let variant: 'danger' | 'warning' | 'default' = 'danger';
	export let icon: typeof import('lucide-svelte').Icon = AlertTriangle;

	// -- CONSTANTS -- //

	const VARIANT_STYLES = {
		danger: {
			icon: 'text-[#EF4444]',
			iconBg: 'bg-[#EF4444]/10 dark:bg-[#EF4444]/10',
			confirm: 'bg-[#EF4444] text-white hover:bg-[#DC2626]'
		},
		warning: {
			icon: 'text-[#F59E0B]',
			iconBg: 'bg-[#F59E0B]/10 dark:bg-[#F59E0B]/10',
			confirm: 'bg-[#F59E0B] text-white hover:bg-[#D97706]'
		},
		default: {
			icon: 'text-[#0891B2] dark:text-[#22D3EE]',
			iconBg: 'bg-[#0891B2]/10 dark:bg-[#22D3EE]/10',
			confirm: 'bg-[#0891B2] text-white hover:brightness-110 dark:bg-[#22D3EE] dark:text-[#0B0A23]'
		}
	} as const;

	// -- FUNCTIONS -- //

	const dispatch = createEventDispatcher<{ confirm: void; cancel: void }>();

	function handleConfirm() {
		open = false;
		dispatch('confirm');
	}

	function handleCancel() {
		open = false;
		dispatch('cancel');
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) handleCancel();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!open) return;
		if (e.key === 'Escape') handleCancel();
	}

	function lockScroll() {
		document.body.style.overflow = 'hidden';
	}

	function unlockScroll() {
		document.body.style.overflow = '';
	}

	// -- REACTIVE STATEMENTS -- //

	$: if (typeof document !== 'undefined') {
		if (open) lockScroll();
		else unlockScroll();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<!-- BACKDROP -->
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
		on:click={handleBackdropClick}
		role="dialog"
		aria-modal="true"
		aria-labelledby="confirm-dialog-title"
		transition:fade={{ duration: 150 }}
	>
		<!-- DIALOG -->
		<div
			class="mx-4 w-full max-w-sm rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-2xl dark:border-[#2A2578] dark:bg-[#161446]"
			transition:fly={{ y: 16, duration: 220, easing: cubicOut }}
		>
			<div class="flex gap-4">
				<!-- ICON -->
				<div class={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full', VARIANT_STYLES[variant].iconBg)}>
					<svelte:component this={icon} size={20} class={VARIANT_STYLES[variant].icon} />
				</div>

				<!-- CONTENT -->
				<div class="min-w-0 flex-1">
					<h3 id="confirm-dialog-title" class="text-sm font-semibold text-[#0F172A] dark:text-white">
						{title}
					</h3>
					<p class="mt-1 text-xs text-[#64748B] dark:text-slate-400">
						{message}
					</p>
				</div>

				<!-- CLOSE -->
				<button
					class="h-6 w-6 shrink-0 rounded-md text-[#CBD5E1] transition-colors hover:text-[#94A3B8] dark:text-slate-600 dark:hover:text-slate-400"
					on:click={handleCancel}
				>
					<X size={16} />
				</button>
			</div>

			<!-- ACTIONS -->
			<div class="mt-5 flex justify-end gap-2">
				<button
					class="rounded-lg border border-[#E2E8F0] px-4 py-2 text-xs font-medium text-[#64748B] transition-all hover:border-[#CBD5E1] hover:text-[#334155] dark:border-[#2A2578] dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300"
					on:click={handleCancel}
				>
					{cancelLabel}
				</button>
				<button
					class={cn('rounded-lg px-4 py-2 text-xs font-medium transition-all', VARIANT_STYLES[variant].confirm)}
					on:click={handleConfirm}
				>
					{confirmLabel}
				</button>
			</div>
		</div>
	</div>
{/if}
