<script lang="ts">
	// IMPORTED DEP-MODULES
	import { onMount, onDestroy } from 'svelte';

	// -- REQUIRED PROPS -- //

	export let phrases: string[];

	// -- OPTIONAL PROPS -- //

	export let typingSpeed: number = 80;
	export let deletingSpeed: number = 40;
	export let pauseDuration: number = 2000;

	// -- STATES -- //

	let displayText = '';

	let phraseIndex = 0;

	let charIndex = 0;

	let isDeleting = false;

	let timeoutId: ReturnType<typeof setTimeout>;

	// -- FUNCTIONS -- //

	function tick() {
		const currentPhrase = phrases[phraseIndex];

		if (!isDeleting) {
			// TYPING
			displayText = currentPhrase.slice(0, charIndex + 1);
			charIndex++;

			if (charIndex >= currentPhrase.length) {
				// FINISHED TYPING, PAUSE THEN DELETE
				timeoutId = setTimeout(() => {
					isDeleting = true;
					tick();
				}, pauseDuration);
				return;
			}

			timeoutId = setTimeout(tick, typingSpeed);
		} else {
			// DELETING
			displayText = currentPhrase.slice(0, charIndex - 1);
			charIndex--;

			if (charIndex <= 0) {
				// FINISHED DELETING, MOVE TO NEXT PHRASE
				isDeleting = false;
				phraseIndex = (phraseIndex + 1) % phrases.length;
				timeoutId = setTimeout(tick, typingSpeed * 2);
				return;
			}

			timeoutId = setTimeout(tick, deletingSpeed);
		}
	}

	// -- LIFECYCLES -- //

	onMount(() => {
		timeoutId = setTimeout(tick, 500);
	});

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<!-- TYPEWRITER TEXT WITH BLINKING CURSOR -->
<span class="inline">
	{displayText}<span class="animate-blink ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-[#22D3EE]"
	></span>
</span>
