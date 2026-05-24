<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
	import JsonLd from '$lib/components/seo/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/seo/Breadcrumbs.svelte';
</script>

<MetaTags
	title="Privacy Policy | Arbenger"
	description="How Arbenger collects, uses, and protects your information. Plain-language privacy policy."
	url="https://arbenger.com/privacy/"
/>

<Breadcrumbs pageName="Privacy Policy" pageUrl="https://arbenger.com/privacy/" />

<JsonLd
	schema={{
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Privacy Policy',
		url: 'https://arbenger.com/privacy/',
		description: 'How Arbenger collects, uses, and protects your information.',
	}}
/>

<!-- PAGE HERO -->
<section class="relative overflow-hidden pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Legal</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Privacy Policy
		</h1>

		<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">Last updated: May 19, 2026</p>
	</div>
</section>

<!-- POLICY CONTENT -->
<section class="relative overflow-hidden pb-24">
	<div use:reveal class="mx-auto max-w-3xl px-6 lg:px-8">
		<p class="text-[#475569] leading-relaxed dark:text-slate-300">
			Arbenger ("we," "us," or "our") respects your privacy. This policy explains what information we collect,
			how we use it, and what choices you have. We keep it short and clear on purpose.
		</p>

		<!-- INFORMATION WE COLLECT -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Information We Collect</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Right now, we collect very little:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>
				<strong class="text-[#0F172A] dark:text-white">Theme preference</strong> -- We store your light/dark mode
				choice in your browser's localStorage. This never leaves your device.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Anonymous usage statistics</strong> -- Some tools (like
				our Image Resizer) send an anonymous counter when you complete an action (e.g., resizing an image).
				This records only the number of actions -- no personal data, no image data, no IP address, and no
				user identifier. The count is stored in an external database to display aggregate lifetime stats.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Analytics data</strong> -- We may add privacy-friendly
				analytics in the future (e.g., page views, referrer). If we do, we'll update this policy first.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Contact form data</strong> -- If we add a contact form,
				we'll collect whatever you submit (name, email, message). We won't use it for anything else.
			</li>
		</ul>

		<!-- CHROME EXTENSIONS -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Chrome Extensions</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Our Chrome extensions (such as Color Picker) are designed with minimal permissions and zero data collection:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>
				<strong class="text-[#0F172A] dark:text-white">No browsing data access</strong> -- Our extensions use only
				<code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-sm dark:bg-[#2A2578]">activeTab</code> (activates only when you click the extension icon) and
				<code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-sm dark:bg-[#2A2578]">storage</code> (saves preferences locally on your device).
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">No network requests</strong> -- Our extensions do not send any data to external servers. All processing happens locally in your browser.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Local storage only</strong> -- Settings like color history, theme preference, and panel states are saved to
				<code class="rounded bg-[#F1F5F9] px-1 py-0.5 font-mono text-sm dark:bg-[#2A2578]">chrome.storage.local</code> on your device. We cannot access this data.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">No analytics or tracking</strong> -- Our extensions contain no analytics code, no telemetry, and no crash reporting.
			</li>
		</ul>

		<!-- HOW WE USE YOUR INFORMATION -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">How We Use Your Information</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Any information we collect is used to:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>Make the site work properly (like remembering your theme)</li>
			<li>Understand how people use the site so we can improve it</li>
			<li>Respond to you if you reach out</li>
		</ul>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			We don't sell your data. We don't share it with advertisers. Period.
		</p>

		<!-- DATA STORAGE AND SECURITY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Data Storage and Security</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Your theme preference stays in your browser -- we never see it. Anonymous usage counts are stored in a
			PostgreSQL database hosted by Neon, accessed through Cloudflare's Hyperdrive connection pooling. This
			data contains no personal information -- only aggregate action counts per tool. We use reasonable
			security measures to protect all stored data. No system is 100% secure, but we take it seriously.
		</p>

		<!-- THIRD-PARTY SERVICES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Third-Party Services</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			We use the following third-party services:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>
				<strong class="text-[#0F172A] dark:text-white">Cloudflare</strong> -- For hosting and CDN. Cloudflare may
				collect some technical data (like IP addresses) as part of delivering the site. See
				<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Cloudflare's privacy policy</a>.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Neon</strong> -- Database provider used to store anonymous,
				aggregate usage counts (e.g., total images resized). No personal data is stored in this database. See
				<a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Neon's privacy policy</a>.
			</li>
			<li>
				<strong class="text-[#0F172A] dark:text-white">Analytics</strong> -- We may add a privacy-friendly
				analytics service in the future. We'll update this section when we do.
			</li>
		</ul>

		<!-- YOUR RIGHTS -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Your Rights</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			You have the right to:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li><strong class="text-[#0F172A] dark:text-white">Access</strong> -- Ask what data we have about you</li>
			<li><strong class="text-[#0F172A] dark:text-white">Deletion</strong> -- Ask us to delete any data we have about you</li>
			<li><strong class="text-[#0F172A] dark:text-white">Opt out</strong> -- Decline cookies via our consent banner or your browser settings</li>
		</ul>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			To exercise any of these rights, email us at
			<a href="mailto:contact@arbenger.com" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">contact@arbenger.com</a>.
		</p>

		<!-- CHILDREN'S PRIVACY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Children's Privacy</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			This site is not directed at children under 13. We don't knowingly collect information from children.
			If you believe a child has provided us with personal data, please contact us and we'll remove it.
		</p>

		<!-- CHANGES TO THIS POLICY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Changes to This Policy</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			If we make significant changes, we'll update the date at the top of this page. For major changes,
			we may also post a notice on the site. We recommend checking back occasionally.
		</p>

		<!-- RELATED POLICIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Related Policies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			For details on how we use cookies, see our
			<a href="/cookies/" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Cookie Policy</a>.
			For terms governing your use of this site, see our
			<a href="/terms/" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Terms of Service</a>.
		</p>

		<!-- CONTACT US -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Contact Us</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Questions about this policy? Email us at
			<a href="mailto:contact@arbenger.com" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">contact@arbenger.com</a>.
		</p>
	</div>
</section>
