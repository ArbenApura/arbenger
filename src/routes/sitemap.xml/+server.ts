import type { RequestHandler } from './$types';
import { sortedPosts } from '$lib/data/blog';
import { projects } from '$lib/data/projects';

const SITE_URL = 'https://arbenger.com';

const LAST_MOD = '2026-08-04';

const STATIC_PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/projects/', priority: '0.9', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/blog/', priority: '0.8', changefreq: 'weekly', lastmod: LAST_MOD },
	{ path: '/about/', priority: '0.6', changefreq: 'monthly', lastmod: LAST_MOD },
	{ path: '/contact/', priority: '0.5', changefreq: 'monthly', lastmod: LAST_MOD },
	{ path: '/resume/', priority: '0.5', changefreq: 'monthly', lastmod: LAST_MOD },
	{ path: '/products/image-resizer/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/image-compressor/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/color-picker/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/sound-booster/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-05-21' },
	{ path: '/products/html-editor/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-05-25' },
];

const PROJECT_PAGES = projects.map((p) => ({
	path: `/projects/${p.slug}/`,
	priority: '0.7',
	changefreq: 'monthly' as const,
	lastmod: LAST_MOD,
}));

const BLOG_PAGES = sortedPosts.map((post) => ({
	path: `/blog/${post.slug}/`,
	priority: '0.7',
	changefreq: 'monthly' as const,
	lastmod: post.updatedDate ?? post.date,
}));

const PAGES = [...STATIC_PAGES, ...PROJECT_PAGES, ...BLOG_PAGES];

export const GET: RequestHandler = async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
	(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
};

export const prerender = true;
