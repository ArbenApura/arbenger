// IMPORTED DEP-MODULES
import { writable } from 'svelte/store';

// IMPORTED MODULES
import { browser } from '$app/environment';
import { defaultLocale } from '$lib/data/locales';

// PERSISTED TO localStorage KEY: arbenger-locale

function createLocaleStore() {
	const initial = browser ? localStorage.getItem('arbenger-locale') || defaultLocale : defaultLocale;

	const { subscribe, set } = writable<string>(initial);

	return {
		subscribe,
		set: (code: string) => {
			if (browser) {
				localStorage.setItem('arbenger-locale', code);
				document.documentElement.setAttribute('lang', code);
			}
			set(code);
		},
	};
}

export const locale = createLocaleStore();
