import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createDb } from '$lib/server/db';
import { toolStats } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

const ALLOWED_TOOL_IDS = new Set(['image-resizer', 'image-compressor']);

export const GET: RequestHandler = async ({ url, platform }) => {
	const connectionString = platform?.env?.HYPERDRIVE?.connectionString;
	if (!connectionString) {
		return json({ error: 'Service unavailable' }, { status: 503 });
	}

	const toolId = url.searchParams.get('toolId') ?? 'image-resizer';
	if (!ALLOWED_TOOL_IDS.has(toolId)) {
		return json({ error: 'Invalid toolId' }, { status: 400 });
	}

	try {
		const db = createDb(connectionString);

		const row = await db
			.select({ totalProcessed: toolStats.totalProcessed })
			.from(toolStats)
			.where(eq(toolStats.toolId, toolId))
			.limit(1);

		return json({
			totalProcessed: row[0]?.totalProcessed ?? 0
		});
	} catch {
		return json({ error: 'Service unavailable' }, { status: 503 });
	}
};

export const POST: RequestHandler = async ({ request, platform }) => {
	const connectionString = platform?.env?.HYPERDRIVE?.connectionString;
	if (!connectionString) {
		return json({ error: 'Service unavailable' }, { status: 503 });
	}

	const body = await request.json().catch(() => null);
	const toolId = body?.toolId ?? 'image-resizer';

	if (!ALLOWED_TOOL_IDS.has(toolId)) {
		return json({ error: 'Invalid toolId' }, { status: 400 });
	}

	const count = Math.min(Math.max(Math.round(body?.count ?? 1), 1), 10000);

	try {
		const db = createDb(connectionString);

		await db
			.insert(toolStats)
			.values({
				toolId,
				totalProcessed: count,
				updatedAt: new Date()
			})
			.onConflictDoUpdate({
				target: toolStats.toolId,
				set: {
					totalProcessed: sql`${toolStats.totalProcessed} + ${count}`,
					updatedAt: new Date()
				}
			});

		return json({ success: true });
	} catch {
		return json({ error: 'Service unavailable' }, { status: 503 });
	}
};
