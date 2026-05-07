// IMPORTED TYPES
import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
	{
		id: 'vscode-extensions',
		name: 'VS Code Extensions',
		description: 'Productivity tools and DX improvements for the editor I live in.',
		icon: 'code',
		productCount: 0,
	},
	{
		id: 'chrome-plugins',
		name: 'Chrome Plugins',
		description: 'Browser extensions that fix the small things that bug me daily.',
		icon: 'chrome',
		productCount: 0,
	},
	{
		id: 'ai-tools',
		name: 'AI Tools',
		description: 'Practical AI utilities -- not wrappers, actual tools.',
		icon: 'brain',
		productCount: 0,
	},
	{
		id: 'misc-tools',
		name: 'Misc Tools',
		description: 'Converters, formatters, and the little things that save time.',
		icon: 'wrench',
		productCount: 0,
	},
	{
		id: 'saas',
		name: 'SaaS Products',
		description: 'Full apps for specific problems. No feature bloat.',
		icon: 'rocket',
		productCount: 0,
	},
];

export const products: Product[] = [];
