// IMPORTED DEP-MODULES
import { writable } from 'svelte/store';
// IMPORTED MODULES
import { browser } from '$app/environment';

// PERSISTED TO localStorage KEY: arbenger-theme

function createThemeStore() {
	const initial = browser ? localStorage.getItem('arbenger-theme') !== 'light' : true;

	const { subscribe, set, update } = writable<boolean>(initial);

	return {
		subscribe,
		set: (value: boolean) => {
			if (browser) {
				localStorage.setItem('arbenger-theme', value ? 'dark' : 'light');
				document.documentElement.classList.toggle('dark', value);
			}
			set(value);
		},
		toggle: () => {
			update((current) => {
				const next = !current;
				if (browser) {
					localStorage.setItem('arbenger-theme', next ? 'dark' : 'light');
					document.documentElement.classList.toggle('dark', next);
				}
				return next;
			});
		}
	};
}

export const isDark = createThemeStore();
