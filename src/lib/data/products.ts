// IMPORTED TYPES
import type { ProductCategoryInfo, Product } from '$lib/types';

export const categories: ProductCategoryInfo[] = [
	{
		id: 'misc-tools',
		name: 'Utilities',
		description: 'Image tools, code formatters, converters, and other browser-based utilities.',
		icon: 'wrench',
		productCount: 2,
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
		productCount: 1,
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
	{
		slug: 'image-compressor',
		name: 'Image Compressor',
		description:
			'Compress PNG, JPEG, and WebP images up to 90% smaller. Batch processing, target size mode, and before/after preview.',
		category: 'misc-tools',
		status: 'live',
		platform: 'web',
		externalUrl: '/products/image-compressor',
		tags: ['image', 'compress', 'optimize', 'free'],
		featured: false,
	},
	{
		slug: 'color-picker',
		name: 'Color Picker',
		description:
			'Pick colors from any webpage. HEX, RGB, HSL, OKLCH formats. Color harmonies, WCAG contrast checker, color blindness simulation, and shade generator.',
		category: 'chrome-plugins',
		status: 'live',
		platform: 'chrome-web-store',
		externalUrl: '/products/color-picker',
		tags: ['color', 'eyedropper', 'design', 'free'],
		featured: false,
	},
];
