<script lang="ts">
	// IMPORTED DEP-MODULES
	import { fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// IMPORTED MODULES
	import { cn } from '$lib/utils/cn';
	import { products } from '$lib/data/products';
	import { sortedPosts, formatPostDate } from '$lib/data/blog';

	// IMPORTED DEP-COMPONENTS
	import {
		Menu,
		X,
		ChevronDown,
		ArrowRight,
		Image,
		Minimize2,
		Palette,
		Volume2,
		Code,
		Wrench,
		Puzzle,
		BookOpen,
	} from 'lucide-svelte';

	// IMPORTED COMPONENTS
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import LanguageSelector from '$lib/components/layout/LanguageSelector.svelte';
	import Logo from '$lib/components/ui/Logo.svelte';

	// -- TYPES -- //

	type Popover = 'products' | 'blog' | null;

	// -- CONSTANTS -- //

	const PRODUCT_ICONS: Record<string, typeof Code> = {
		'image-resizer': Image,
		'image-compressor': Minimize2,
		'color-picker': Palette,
		'sound-booster': Volume2,
		'html-editor': Code,
	};

	const PLAIN_LINKS = [
		{ label: 'About', href: '/about/' },
		{ label: 'Contact', href: '/contact/' },
	];

	// -- STATES -- //

	let scrollY = 0;

	let isMobileMenuOpen = false;

	let activePopover: Popover = null;

	let navEl: HTMLElement;

	let mobileProductsOpen = false;

	let mobileBlogOpen = false;

	// -- REACTIVE STATES -- //

	$: isScrolled = scrollY > 50;

	$: liveProducts = products.filter((p) => p.status === 'live');

	$: utilities = liveProducts.filter((p) => p.category === 'misc-tools');

	$: extensions = liveProducts.filter((p) => p.category === 'chrome-plugins');

	$: recentPosts = sortedPosts.slice(0, 3);

	// -- FUNCTIONS -- //

	function togglePopover(name: 'products' | 'blog') {
		activePopover = activePopover === name ? null : name;
	}

	function closeAll() {
		activePopover = null;
		isMobileMenuOpen = false;
		mobileProductsOpen = false;
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

	function firstSentence(text: string): string {
		const dot = text.indexOf('.');
		return dot >= 0 ? text.slice(0, dot + 1) : text;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
		mobileProductsOpen = false;
		mobileBlogOpen = false;
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
			<!-- PRODUCTS TRIGGER -->
			<button
				on:click={() => togglePopover('products')}
				class={cn(
					'flex items-center gap-1 text-sm transition-colors duration-200',
					activePopover === 'products'
						? 'text-[#0891B2] dark:text-[#22D3EE]'
						: 'text-[#475569] hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]',
				)}
				aria-expanded={activePopover === 'products'}
				aria-haspopup="true"
			>
				Products
				<ChevronDown
					size={14}
					class={cn(
						'transition-transform duration-200',
						activePopover === 'products' && 'rotate-180',
					)}
				/>
			</button>

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
						<p
							class="mb-3 font-mono text-xs tracking-widest text-[#0891B2] dark:text-[#22D3EE]"
						>
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

			<!-- PLAIN LINKS -->
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="text-sm text-[#475569] transition-colors duration-200 hover:text-[#0891B2] dark:text-slate-300 dark:hover:text-[#22D3EE]"
				>
					{link.label}
				</a>
			{/each}

			<LanguageSelector />
			<ThemeToggle />
		</div>

		<!-- MOBILE MENU BUTTON -->
		<div class="flex items-center gap-2 lg:hidden">
			<LanguageSelector />
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

	<!-- PRODUCTS MEGA MENU (FULL WIDTH, DESKTOP ONLY) -->
	{#if activePopover === 'products'}
		<div
			transition:slide={{ duration: 200, easing: cubicOut }}
			class="hidden border-t border-[#E2E8F0] bg-white/98 backdrop-blur-lg lg:block dark:border-[#2A2578] dark:bg-[#0B0A23]/98"
		>
			<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
				<div class="grid grid-cols-2 gap-10">
					<!-- UTILITIES COLUMN -->
					{#if utilities.length > 0}
						<div>
							<div class="mb-3 flex items-center gap-2">
								<Wrench size={14} class="text-[#94A3B8]" />
								<p
									class="font-mono text-xs tracking-widest text-[#0891B2] dark:text-[#22D3EE]"
								>
									UTILITIES
								</p>
							</div>
							<div class="space-y-1">
								{#each utilities as product}
									{@const Icon = PRODUCT_ICONS[product.slug] || Code}
									<a
										href={product.externalUrl}
										class="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-[#1E1A5E]"
										on:click={() => (activePopover = null)}
									>
										<div
											class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] transition-colors group-hover:bg-[#0891B2]/10 dark:bg-[#1E1A5E] dark:group-hover:bg-[#22D3EE]/10"
										>
											<Icon
												size={16}
												class="text-[#64748B] transition-colors group-hover:text-[#0891B2] dark:text-slate-400 dark:group-hover:text-[#22D3EE]"
											/>
										</div>
										<div>
											<p
												class="text-sm font-medium text-[#0F172A] group-hover:text-[#0891B2] dark:text-white dark:group-hover:text-[#22D3EE]"
											>
												{product.name}
											</p>
											<p class="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
												{firstSentence(product.description)}
											</p>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}

					<!-- CHROME EXTENSIONS COLUMN -->
					{#if extensions.length > 0}
						<div>
							<div class="mb-3 flex items-center gap-2">
								<Puzzle size={14} class="text-[#94A3B8]" />
								<p
									class="font-mono text-xs tracking-widest text-[#0891B2] dark:text-[#22D3EE]"
								>
									CHROME EXTENSIONS
								</p>
							</div>
							<div class="space-y-1">
								{#each extensions as product}
									{@const Icon = PRODUCT_ICONS[product.slug] || Code}
									<a
										href={product.externalUrl}
										class="group flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-[#F1F5F9] dark:hover:bg-[#1E1A5E]"
										on:click={() => (activePopover = null)}
									>
										<div
											class="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] transition-colors group-hover:bg-[#0891B2]/10 dark:bg-[#1E1A5E] dark:group-hover:bg-[#22D3EE]/10"
										>
											<Icon
												size={16}
												class="text-[#64748B] transition-colors group-hover:text-[#0891B2] dark:text-slate-400 dark:group-hover:text-[#22D3EE]"
											/>
										</div>
										<div>
											<p
												class="text-sm font-medium text-[#0F172A] group-hover:text-[#0891B2] dark:text-white dark:group-hover:text-[#22D3EE]"
											>
												{product.name}
											</p>
											<p class="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
												{firstSentence(product.description)}
											</p>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>

				<!-- VIEW ALL PRODUCTS LINK -->
				<div class="mt-5 border-t border-[#E2E8F0] pt-4 dark:border-[#2A2578]">
					<a
						href="/products/"
						class="group flex items-center gap-1.5 text-sm font-medium text-[#0891B2] transition-colors hover:text-[#0E7490] dark:text-[#22D3EE] dark:hover:text-[#67E8F9]"
						on:click={() => (activePopover = null)}
					>
						View all products
						<ArrowRight
							size={14}
							class="transition-transform group-hover:translate-x-0.5"
						/>
					</a>
				</div>
			</div>
		</div>
	{/if}

	<!-- MOBILE MENU DRAWER -->
	{#if isMobileMenuOpen}
		<div
			transition:slide={{ duration: 200, easing: cubicOut }}
			class="border-t border-[#E2E8F0] bg-white/95 px-6 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden dark:border-[#2A2578] dark:bg-[#0B0A23]/95 dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
		>
			<!-- PRODUCTS (EXPANDABLE) -->
			<button
				on:click={() => (mobileProductsOpen = !mobileProductsOpen)}
				class="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
			>
				Products
				<ChevronDown
					size={16}
					class={cn(
						'transition-transform duration-200',
						mobileProductsOpen && 'rotate-180',
					)}
				/>
			</button>

			{#if mobileProductsOpen}
				<div
					transition:slide={{ duration: 150, easing: cubicOut }}
					class="mb-1 ml-4 space-y-0.5"
				>
					{#each liveProducts as product}
						{@const Icon = PRODUCT_ICONS[product.slug] || Code}
						<a
							href={product.externalUrl}
							class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-400 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
							on:click={closeMobileMenu}
						>
							<Icon size={15} class="shrink-0" />
							{product.name}
						</a>
					{/each}
					<a
						href="/products/"
						class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#0891B2] transition-colors hover:bg-[#0891B2]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
						on:click={closeMobileMenu}
					>
						<ArrowRight size={14} />
						View all
					</a>
				</div>
			{/if}

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
				<div
					transition:slide={{ duration: 150, easing: cubicOut }}
					class="mb-1 ml-4 space-y-0.5"
				>
					{#each recentPosts as post}
						<a
							href="/blog/{post.slug}/"
							class="block rounded-lg px-4 py-2.5 text-sm text-[#475569] transition-colors hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-slate-400 dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
							on:click={closeMobileMenu}
						>
							<span class="line-clamp-1">{post.title}</span>
						</a>
					{/each}
					<a
						href="/blog/"
						class="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-[#0891B2] transition-colors hover:bg-[#0891B2]/10 dark:text-[#22D3EE] dark:hover:bg-[#22D3EE]/10"
						on:click={closeMobileMenu}
					>
						<ArrowRight size={14} />
						View all posts
					</a>
				</div>
			{/if}

			<!-- ABOUT + CONTACT (PLAIN LINKS) -->
			{#each PLAIN_LINKS as link}
				<a
					href={link.href}
					class="block rounded-lg px-4 py-3.5 text-base font-medium text-[#0F172A] transition-colors duration-200 hover:bg-[#0891B2]/10 hover:text-[#0891B2] dark:text-white dark:hover:bg-[#22D3EE]/10 dark:hover:text-[#22D3EE]"
					on:click={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>
