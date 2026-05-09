// IMPORTED TYPES
import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
	{
		id: 'vscode-extensions',
		name: 'VS Code Extensions',
		description: 'Tools and add-ons for Visual Studio Code.',
		icon: 'code',
		productCount: 0,
	},
	{
		id: 'chrome-plugins',
		name: 'Chrome Plugins',
		description: 'Browser extensions that work inside Chrome.',
		icon: 'chrome',
		productCount: 0,
	},
	{
		id: 'ai-tools',
		name: 'AI Tools',
		description: 'Software that uses AI to get things done.',
		icon: 'brain',
		productCount: 0,
	},
	{
		id: 'misc-tools',
		name: 'Misc Tools',
		description: 'Converters, formatters, and other small utilities.',
		icon: 'wrench',
		productCount: 0,
	},
	{
		id: 'saas',
		name: 'SaaS Products',
		description: 'Web apps you can use from anywhere.',
		icon: 'rocket',
		productCount: 0,
	},
];

export const products: Product[] = [];
