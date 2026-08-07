<script lang="ts">
	// -- REQUIRED PROPS -- //

	export let src: string;
	export let title: string;

	// -- OPTIONAL PROPS -- //

	// Aspect ratio applied to the framed box. Only used as a frame: media inside
	// is letterboxed with `object-contain` so it is never cropped.
	export let aspectClass: string = 'aspect-video';

	// -- DIRECT MEDIA FILE? -- //
	//
	// If the src points to a raw video file (e.g. an R2 object / public mp4) we
	// render a native <video>, whose controls scale cleanly at every width — no
	// third-party player chrome that gets squished on narrow screens. Otherwise we
	// fall back to a responsive iframe embed (Drive, YouTube, etc.).
	const DIRECT_VIDEO_RE = /\.(mp4|webm|ogv|mov)(\?.*)?$/i;
	const isDirectVideo = DIRECT_VIDEO_RE.test(src);
</script>

{#if isDirectVideo}
	<div class="w-full max-w-full overflow-hidden rounded-2xl border border-[#E2E8F0] bg-black dark:border-[#2A2578]/60 {aspectClass}">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			src={src}
			controls
			playsinline
			preload="metadata"
			controlslist="nodownload"
			class="h-full w-full object-contain"
		></video>
	</div>
{:else}
	<div class="relative w-full max-w-full overflow-hidden rounded-2xl border border-[#E2E8F0] dark:border-[#2A2578]/60 {aspectClass}">
		<iframe
			src={src}
			title={title}
			class="absolute inset-0 h-full w-full border-0"
			loading="lazy"
			allow="autoplay; fullscreen"
			allowfullscreen
		></iframe>
	</div>
{/if}
