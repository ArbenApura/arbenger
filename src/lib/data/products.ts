// IMPORTED TYPES
import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
	{
		id: 'misc-tools',
		name: 'Utilities',
		description: 'Image tools, code formatters, converters, and other browser-based utilities.',
		icon: 'wrench',
		productCount: 1,
	},
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
		id: 'saas',
		name: 'SaaS Products',
		description: 'Web apps you can use from anywhere.',
		icon: 'rocket',
		productCount: 0,
	},
];

export const products: Product[] = [
	{
		slug: 'image-resizer',
		name: 'Image Resizer',
		description: 'Resize, crop, and convert images in your browser. Batch processing, presets, and zero uploads.',
		category: 'misc-tools',
		status: 'live',
		platform: 'web',
		externalUrl: '/products/image-resizer',
		tags: ['image', 'resize', 'converter', 'free'],
		featured: false,
	},
];
