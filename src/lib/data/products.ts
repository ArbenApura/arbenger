// IMPORTED TYPES
import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
	{
		id: 'vscode-extensions',
		name: 'VS Code Extensions',
		description: 'Developer tools and productivity extensions for Visual Studio Code.',
		icon: 'code',
		productCount: 0,
	},
	{
		id: 'chrome-plugins',
		name: 'Chrome Plugins',
		description: 'Browser extensions that enhance your web experience.',
		icon: 'chrome',
		productCount: 0,
	},
	{
		id: 'ai-tools',
		name: 'AI Tools',
		description: 'Intelligent tools powered by artificial intelligence.',
		icon: 'brain',
		productCount: 0,
	},
	{
		id: 'misc-tools',
		name: 'Misc Tools',
		description: 'Converters, formatters, and everyday utilities.',
		icon: 'wrench',
		productCount: 0,
	},
	{
		id: 'saas',
		name: 'SaaS Products',
		description: 'Full-featured applications for teams and individuals.',
		icon: 'rocket',
		productCount: 0,
	},
];

export const products: Product[] = [];
