<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
</script>

<MetaTags
	title="Cookie Policy | Arbenger"
	description="How Arbenger uses cookies and similar technologies. Learn about your choices and how to manage preferences."
	url="https://arbenger.com/cookies"
/>

<Breadcrumbs pageName="Cookie Policy" pageUrl="https://arbenger.com/cookies" />

<!-- PAGE HERO -->
<section class="relative pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Legal</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Cookie Policy
		</h1>

		<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">Last updated: May 8, 2026</p>
	</div>
</section>

<!-- COOKIE POLICY CONTENT -->
<section class="relative pb-24">
	<div use:reveal class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<p class="text-[#475569] leading-relaxed dark:text-slate-300">
			This policy explains how Arbenger uses cookies and similar technologies like localStorage.
			It's straightforward -- we'll tell you exactly what we store and why.
		</p>

		<!-- WHAT ARE COOKIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">What Are Cookies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Cookies are small text files that websites store on your device. They help sites remember things
			about you -- like your preferences or whether you've visited before. We also use localStorage,
			which is similar but stays in your browser and is never sent to our servers.
		</p>

		<!-- HOW WE USE COOKIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">How We Use Cookies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Currently, we use very few cookies and browser storage features:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>
				<strong class="text-[#0F172A] dark:text-white">Theme preference</strong> -- We save your light/dark mode
				choice in localStorage so the site looks the way you want on return visits.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Cookie consent</strong> -- We remember whether you accepted
				or declined cookies so we don't ask you again.
			</li>
		</ul>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			That's it for now. If we add more in the future, we'll update this page.
		</p>

		<!-- TYPES OF COOKIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Types of Cookies</h2>

		<h3 class="mt-6 text-lg font-semibold text-[#0F172A] dark:text-white">Essential</h3>
		<p class="mt-2 text-[#475569] leading-relaxed dark:text-slate-300">
			These are necessary for the site to function. Right now, this includes your theme preference
			(localStorage) and cookie consent choice. You can't opt out of these -- they're required for basic
			functionality.
		</p>

		<h3 class="mt-6 text-lg font-semibold text-[#0F172A] dark:text-white">Analytics</h3>
		<p class="mt-2 text-[#475569] leading-relaxed dark:text-slate-300">
			We don't currently use analytics cookies. If we add them in the future, they'll help us understand
			how people use the site (which pages get visited, how long people stay, etc.). These will be optional.
		</p>

		<h3 class="mt-6 text-lg font-semibold text-[#0F172A] dark:text-white">Functional</h3>
		<p class="mt-2 text-[#475569] leading-relaxed dark:text-slate-300">
			We don't currently use functional cookies. If we add features like saved preferences beyond theme,
			they'd fall into this category. Also optional.
		</p>

		<!-- MANAGING COOKIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Managing Cookies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			You have a few options for controlling cookies:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>
				<strong class="text-[#0F172A] dark:text-white">Our consent banner</strong> -- When you first visit,
				we'll ask whether you accept cookies. You can decline.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Browser settings</strong> -- Most browsers let you
				block or delete cookies. Check your browser's help documentation for instructions.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">localStorage</strong> -- You can clear localStorage
				through your browser's developer tools (usually F12 &gt; Application &gt; Local Storage).
			</li>
		</ul>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Note: blocking essential storage may affect how the site works (e.g., your theme preference won't be saved).
		</p>

		<!-- CHANGES TO THIS POLICY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Changes to This Policy</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			If we start using new cookies or change how we use existing ones, we'll update this page and the
			date at the top. For significant changes, we may show the consent banner again.
		</p>

		<!-- RELATED POLICIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Related Policies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			See also our
			<a href="/privacy" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Privacy Policy</a>
			and
			<a href="/terms" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Terms of Service</a>.
		</p>

		<!-- CONTACT US -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Contact Us</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Questions about cookies? Email us at
			<a href="mailto:contact@arbenger.com" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">contact@arbenger.com</a>.
		</p>
	</div>
</section>
