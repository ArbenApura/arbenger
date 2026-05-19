// IMPORTED TYPES
import type { BlogCategoryInfo, BlogPost } from '$lib/types';

export const POSTS_PER_PAGE = 9;

export const blogCategories: BlogCategoryInfo[] = [
	{ id: 'tutorial', label: 'Tutorials' },
];

export const blogPosts: BlogPost[] = [
	{
		slug: 'introducing-color-picker',
		title: 'We Built a Color Picker Because Every Other One Reads Your Browsing Data',
		description:
			'A Chrome extension with WCAG contrast checking, color blindness simulation, and four output formats — using only two permissions. Here\'s why we built it.',
		date: '2026-05-19',
		category: 'tutorial',
		tags: ['color-picker', 'chrome-extension', 'guide'],
		readTime: 8,
		featured: true,
	},
	{
		slug: 'how-to-use-image-resizer',
		title: 'How to Use Arbenger Image Resizer — The Complete Guide',
		description:
			'Learn how to resize, crop, and batch-convert images directly in your browser. Step-by-step guide covering single image mode, batch processing, format conversion, and more.',
		date: '2026-05-10',
		category: 'tutorial',
		tags: ['image-resizer', 'guide', 'tools'],
		readTime: 8,
		featured: true,
	},
	{
		slug: 'how-to-use-image-compressor',
		title: 'How to Use Arbenger Image Compressor — The Complete Guide',
		description:
			'Learn how to compress PNG, JPEG, and WebP images directly in your browser. Step-by-step guide covering quality mode, target size, before/after comparison, batch compression, and more.',
		date: '2026-05-11',
		category: 'tutorial',
		tags: ['image-compressor', 'guide', 'tools'],
		readTime: 7,
		featured: true,
	},
];

export const sortedPosts = [...blogPosts].sort(
	(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
	return blogPosts.find((p) => p.slug === slug);
}

export function getCategoryLabel(id: string): string {
	return blogCategories.find((c) => c.id === id)?.label ?? id;
}

export function formatPostDate(iso: string): string {
	return new Date(iso).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
