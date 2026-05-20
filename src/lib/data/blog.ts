// IMPORTED TYPES
import type { BlogCategoryInfo, BlogPost } from '$lib/types';

export const POSTS_PER_PAGE = 9;

export const blogCategories: BlogCategoryInfo[] = [
	{ id: 'tutorial', label: 'Tutorials' },
];

export const blogPosts: BlogPost[] = [
	{
		slug: 'browser-volume-beyond-100',
		title: 'Browser Volume Stops at 100%. Ours Goes to 600%.',
		description:
			'Volume boost, 5-band EQ, seven presets, keyboard shortcuts, and a live peak meter — all running on three Chrome permissions. Full walkthrough inside.',
		date: '2026-05-21',
		category: 'tutorial',
		tags: ['sound-booster', 'chrome-extension', 'guide'],
		readTime: 7,
		featured: true,
	},
	{
		slug: 'color-picker-without-tracking',
		title: 'Your Color Picker Extension Probably Reads Your Browsing Data. Ours Doesn\'t.',
		description:
			'Eyedropper, WCAG contrast checker, color blindness simulation, four output formats, and persistent history — with zero page-access permissions. Full walkthrough inside.',
		date: '2026-05-19',
		updatedDate: '2026-05-21',
		category: 'tutorial',
		tags: ['color-picker', 'chrome-extension', 'guide'],
		readTime: 8,
		featured: true,
	},
	{
		slug: 'resize-crop-convert-in-browser',
		title: 'Resize, Crop, and Batch-Convert Images Without Uploading Anything',
		description:
			'Single image or 50 at once — resize, crop, rotate, and convert to PNG/JPEG/WebP directly in your browser. No server, no signup, no file size limits.',
		date: '2026-05-10',
		updatedDate: '2026-05-21',
		category: 'tutorial',
		tags: ['image-resizer', 'guide', 'tools'],
		readTime: 8,
		featured: true,
	},
	{
		slug: 'compress-images-90-smaller',
		title: 'Compress Images 90% Smaller Without Visible Quality Loss',
		description:
			'Quality slider, target file size mode, before/after comparison, and batch compression for PNG, JPEG, and WebP — all client-side. No uploads, no watermarks.',
		date: '2026-05-11',
		updatedDate: '2026-05-21',
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
