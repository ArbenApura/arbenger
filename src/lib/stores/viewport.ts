import { readable } from 'svelte/store';
import { browser } from '$app/environment';

function createMediaStore(query: string) {
	return readable(false, (set) => {
		if (!browser) return;

		const mql = window.matchMedia(query);
		set(mql.matches);

		function onChange(e: MediaQueryListEvent) {
			set(e.matches);
		}

		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	});
}

export const isMobile = createMediaStore('(max-width: 767px)');
export const prefersReducedMotion = createMediaStore('(prefers-reduced-motion: reduce)');
