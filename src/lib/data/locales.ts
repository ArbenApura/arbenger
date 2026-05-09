// IMPORTED TYPES
import type { Locale } from '$lib/types';

export const locales: Locale[] = [
	{ code: 'en-US', label: 'English (US)', flag: 'us', enabled: true },
	{ code: 'es', label: 'Español', flag: 'es', enabled: false },
	{ code: 'fr', label: 'Français', flag: 'fr', enabled: false },
	{ code: 'ja', label: '日本語', flag: 'jp', enabled: false },
];

export const defaultLocale = 'en-US';
