import { pgTable, text, bigint, timestamp } from 'drizzle-orm/pg-core';

export const toolStats = pgTable('tool_stats', {
	toolId: text('tool_id').primaryKey(),
	totalProcessed: bigint('total_processed', { mode: 'number' }).notNull().default(0),
	updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});
