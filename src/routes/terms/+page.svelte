<script lang="ts">
	// IMPORTED MODULES
	import { reveal } from '$lib/actions/reveal';

	// IMPORTED COMPONENTS
	import MetaTags from '$lib/components/seo/MetaTags.svelte';
</script>

<MetaTags
	title="Terms of Service | Arbenger"
	description="Terms governing your use of Arbenger's website, products, tools, and extensions."
	url="https://arbenger.com/terms"
/>

<!-- PAGE HERO -->
<section class="relative pt-32 pb-16">
	<div use:reveal class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<p class="font-mono text-sm text-[#0891B2] dark:text-[#22D3EE]">Legal</p>

		<h1 class="font-display mt-4 text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl dark:text-white">
			Terms of Service
		</h1>

		<p class="mt-4 text-sm text-[#64748B] dark:text-slate-400">Last updated: May 8, 2026</p>
	</div>
</section>

<!-- TERMS CONTENT -->
<section class="relative pb-24">
	<div use:reveal class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<p class="text-[#475569] leading-relaxed dark:text-slate-300">
			These terms apply to your use of arbenger.com and any products, tools, or extensions we offer.
			By using this site, you agree to these terms. If you don't agree, that's fine -- but please don't
			use the site.
		</p>

		<!-- ACCEPTANCE OF TERMS -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Acceptance of Terms</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			By accessing or using Arbenger's website and services, you agree to be bound by these terms.
			If you're using our services on behalf of an organization, you're agreeing to these terms on their behalf.
		</p>

		<!-- USE OF SERVICES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Use of Services</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Arbenger builds and offers products, tools, and extensions. You can use them for their intended purpose.
			Specific products may have additional terms -- if they do, those terms will be provided with the product.
		</p>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			You agree to use our services lawfully and respectfully. Don't use them to do anything illegal,
			harmful, or that interferes with other users.
		</p>

		<!-- INTELLECTUAL PROPERTY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Intellectual Property</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			All content on this site -- including text, graphics, logos, code, and product designs -- belongs to
			Arbenger unless stated otherwise. The Arbenger name and logo are our trademarks.
		</p>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			You may not copy, modify, distribute, or create derivative works from our content without written
			permission. Using our products as intended is fine -- reverse-engineering or redistributing them is not.
		</p>

		<!-- USER CONDUCT -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">User Conduct</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			When using our site and services, you agree not to:
		</p>
		<ul class="mt-4 list-disc space-y-2 pl-6 text-[#475569] leading-relaxed dark:text-slate-300">
			<li>Violate any laws or regulations</li>
			<li>Attempt to gain unauthorized access to our systems</li>
			<li>Interfere with the site's functionality or other users' experience</li>
			<li>Use automated tools to scrape or overload the site</li>
			<li>Misrepresent your identity or affiliation with Arbenger</li>
		</ul>

		<!-- DISCLAIMERS -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Disclaimers</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Everything we provide is offered "as is" and "as available." We do our best to keep things working
			and accurate, but we don't guarantee that the site or our products will be error-free, uninterrupted,
			or meet your specific needs.
		</p>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			We don't make warranties of any kind -- express or implied -- including warranties of merchantability,
			fitness for a particular purpose, or non-infringement.
		</p>

		<!-- LIMITATION OF LIABILITY -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Limitation of Liability</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			To the fullest extent allowed by law, Arbenger is not liable for any indirect, incidental, special,
			or consequential damages arising from your use of our site or products. This includes lost data,
			lost profits, or business interruption -- even if we've been told about the possibility.
		</p>

		<!-- MODIFICATIONS TO TERMS -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Modifications to Terms</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			We may update these terms from time to time. When we do, we'll update the date at the top.
			Continued use of the site after changes means you accept the updated terms.
		</p>

		<!-- TERMINATION -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Termination</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			We reserve the right to suspend or terminate your access to our services at any time, for any reason,
			without notice. Sections on intellectual property, disclaimers, and limitation of liability survive
			termination.
		</p>

		<!-- RELATED POLICIES -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Related Policies</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			See also our
			<a href="/privacy" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Privacy Policy</a>
			and
			<a href="/cookies" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">Cookie Policy</a>.
		</p>

		<!-- CONTACT US -->
		<h2 class="font-display mt-12 text-xl font-bold text-[#0F172A] dark:text-white">Contact Us</h2>
		<p class="mt-4 text-[#475569] leading-relaxed dark:text-slate-300">
			Questions about these terms? Email us at
			<a href="mailto:contact@arbenger.com" class="text-[#0891B2] underline hover:text-[#0891B2]/80 dark:text-[#22D3EE] dark:hover:text-[#22D3EE]/80">contact@arbenger.com</a>.
		</p>
	</div>
</section>
