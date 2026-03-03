ALTER TABLE "documents" ADD COLUMN IF NOT EXISTS "slug" text DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'documents_slug_unique') THEN
    ALTER TABLE "documents" ADD CONSTRAINT "documents_slug_unique" UNIQUE("slug");
  END IF;
END $$;