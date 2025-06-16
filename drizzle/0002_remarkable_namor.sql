ALTER TABLE "role" ALTER COLUMN "permissions" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "role" ALTER COLUMN "permissions" SET DEFAULT '[{"resource":"newsArticle","actions":["create","read"]}]'::jsonb;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "slug_name" text DEFAULT 'TODO' NOT NULL;