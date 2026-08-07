<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { sortedPosts, formatPostDate } from '$lib/data/blog';

	// IMPORTED DEP-COMPONENTS
	import { Menu, X, ChevronDown, ArrowRight, BookOpen } from 'lucide-svelte';

	// IMPORTED COMPONENTS
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- TYPES -- //

	type Popover = 'blog' | null;

	// -- CONSTANTS -- //

	const PLAIN_LINKS = [
		{ label: 'Projects', href: '/projects/' },
		{ label: 'About', href: '/about/' },
		{ label: 'Contact', href: '/contact/' },
		{ label: 'Resume', href: '/resume/' },
	];

	// -- STATES -- //

	let scrollY = 0;

	let isMobileMenuOpen = false;

	let activePopover: Popover = null;

	let navEl: HTMLElement;

	let mobileBlogOpen = false;

	// -- REACTIVE STATES -- //

	$: isScrolled = scrollY > 50;

	$: recentPosts = sortedPosts.slice(0, 3);

	// -- FUNCTIONS -- //

	function togglePopover(name: 'blog') {
		activePopover = activePopover === name ? null : name;
	}

	function closeAll() {
		activePopover = null;
		isMobileMenuOpen = false;
		mobileBlogOpen = false;
	}

	function handleWindowClick(e: MouseEvent) {
		if (activePopover && navEl && !navEl.contains(e.target as Node)) {
			activePopover = null;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			activePopover = null;
			isMobileMenuOpen = false;
		}
	}
</script>

<svelte:window bind:scrollY on:click={handleWindowClick} on:keydown={handleKeydown} />

<!-- NAVBAR -->
<nav
	bind:this={navEl}
	aria-label="Main navigation"
	class={cn(
		'fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300',
		isScrolled || isMobileMenuOpen || activePopover
			? 'border-[#F1F5F9] bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-lg dark:border-[#2A2578] dark:bg-[#0B0A23]/95 dark:shadow-none'
			: 'border-transparent bg-transparent',
		'print:hidden',
	)}
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<!-- LOGO + WORDMARK -->
		<a href="/" class="flex items-center gap-3" on:click={closeAll}>
			<Logo size={32} class="text-[#0F172A] dark:text-white" />
			<span class="font-display text-lg tracking-tight text-[#0F172A] dark:text-white">
				ARBENGER
			</span>
		</a>

		<!-- DESKTOP NAV -->
		<div class="hidden items-center gap-8 lg:flex">
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="text-sm text-[#475569] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]"
				>
					{link.label}
				</a>
			{/each}

			<!-- BLOG TRIGGER + DROPDOWN -->
			<div class="relative">
				<button
					on:click={() => togglePopover('blog')}
					class={cn(
						'flex items-center gap-1 text-sm transition-colors duration-200',
						activePopover === 'blog'
							? 'text-[#0891B2] dark:text-[#22D3EE]'
							: 'text-[#475569] hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]',
					)}
					aria-expanded={activePopover === 'blog'}
					aria-haspopup="true"
				>
					Blog
					<ChevronDown
						size={14}
						class={cn(
							'transition-transform duration-200',
							activePopover === 'blog' && 'rotate-180',
						)}
					/>
				</button>

				<!-- BLOG DROPDOWN PANEL -->
				{#if activePopover === 'blog'}
					<div
						transition:fly={{ y: -8, duration: 150, easing: cubicOut }}
						class="absolute left-1/2 top-full mt-4 w-96 -translate-x-1/2 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-[#2A2578] dark:bg-[#0F0E2A] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
					>
						<p class="mb-3 font-mono text-xs tracking-widest text-[#0891B2] dark:text-[#22D3EE]">
							LATEST
						</p>

						<div class="space-y-1">
							{#each recentPosts as post}
								<a
									href="/blog/{post.slug}/"
									class="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-[#1E1A5E]"
									on:click={() => (activePopover = null)}
								>
									<BookOpen
										size={16}
										class="mt-0.5 shrink-0 text-[#94A3B8] transition-colors group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE]"
									/>
									<div class="min-w-0">
										<p
											class="truncate text-sm font-medium text-[#0F172A] group-hover:text-[#0891B2] dark:text-white dark:group-hover:text-[#22D3EE]"
										>
											{post.title}
										</p>
										<p class="mt-0.5 text-xs text-[#94A3B8]">
											{formatPostDate(post.date)} · {post.readTime} min read
										</p>
									</div>
								</a>
							{/each}
						</div>

						<div class="mt-3 border-t border-[#E2E8F0] pt-3 dark:border-[#2A2578]">
							<a
								href="/blog/"
								class="group flex items-center gap-1.5 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
								on:click={() => (activePopover = null)}
							>
								View all posts
								<ArrowRight
									size={14}
									class="transition-transform group-hover:translate-x-0.5"
								/>
							</a>
						</div>
					</div>
				{/if}
			</div>

			<ThemeToggle />
		</div>

		<!-- MOBILE MENU BUTTON -->
		<div class="flex items-center gap-2 lg:hidden">
			<ThemeToggle />
			<button
				on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
				class="rounded-lg p-2 text-[#475569] transition-colors duration-200 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/5"
				aria-label="Toggle menu"
			>
				{#if isMobileMenuOpen}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>

	<!-- MOBILE MENU DRAWER -->
	{#if isMobileMenuOpen}
		<div
			transition:slide={{ duration: 200, easing: cubicOut }}
			class="border-t border-[#E2E8F0] bg-white/95 px-6 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden dark:border-[#2A2578] dark:bg-[#0B0A23]/95 dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
		>
			<!-- PLAIN LINKS -->
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-3.5 text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
					on:click={closeAll}
				>
					{link.label}
				</a>
			{/each}

			<!-- BLOG (EXPANDABLE) -->
			<button
				on:click={() => (mobileBlogOpen = !mobileBlogOpen)}
				class="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
			>
				Blog
				<ChevronDown
					size={16}
					class={cn(
						'transition-transform duration-200',
						mobileBlogOpen && 'rotate-180',
					)}
				/>
			</button>

			{#if mobileBlogOpen}
				<div transition:slide={{ duration: 150, easing: cubicOut }} class="mb-1 ml-4 space-y-0.5">
					{#each recentPosts as post}
						<a
							href="/blog/{post.slug}/"
							class="block rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-400 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
							on:click={closeAll}
						>
							<span class="line-clamp-1">{post.title}</span>
						</a>
					{/each}
					<a
						href="/blog/"
						class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#0891B2] transition-colors hover:bg-[#0891B2]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
						on:click={closeAll}
					>
						<ArrowRight size={14} />
						View all posts
					</a>
				</div>
			{/if}
		</div>
	{/if}
</nav>
