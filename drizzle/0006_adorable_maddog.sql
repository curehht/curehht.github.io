ALTER TABLE "documents" ADD COLUMN "slug" text DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_slug_unique" UNIQUE("slug");