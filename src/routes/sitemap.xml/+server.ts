import type { RequestHandler } from './$types';

const SITE_URL = 'https://arbenger.com';

const PAGES = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/products', priority: '0.8', changefreq: 'weekly' },
	{ path: '/about', priority: '0.6', changefreq: 'monthly' },
	{ path: '/contact', priority: '0.5', changefreq: 'monthly' }
];

export const GET: RequestHandler = async () => {
	const today = new Date().toISOString().split('T')[0];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
	(page) => `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};

export const prerender = true;
