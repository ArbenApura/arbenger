import type { RequestHandler } from './$types';

const SITE_URL = 'https://arbenger.com';

const PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-05-09' },
	{ path: '/products', priority: '0.8', changefreq: 'weekly', lastmod: '2026-05-09' },
	{ path: '/about', priority: '0.6', changefreq: 'monthly', lastmod: '2026-05-09' },
	{ path: '/contact', priority: '0.5', changefreq: 'monthly', lastmod: '2026-05-09' },
	{ path: '/privacy', priority: '0.3', changefreq: 'yearly', lastmod: '2026-05-08' },
	{ path: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: '2026-05-08' },
	{ path: '/cookies', priority: '0.3', changefreq: 'yearly', lastmod: '2026-05-08' },
];

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
