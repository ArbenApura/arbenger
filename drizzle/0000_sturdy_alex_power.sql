CREATE TABLE "tool_stats" (
	"tool_id" text PRIMARY KEY NOT NULL,
	"total_processed" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
