DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'news_articles' AND column_name = 'author') THEN
    ALTER TABLE "news_articles" RENAME COLUMN "author" TO "author_id";
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'news_articles' AND column_name = 'author_id' AND is_nullable = 'NO') THEN
    ALTER TABLE "news_articles" ALTER COLUMN "author_id" DROP NOT NULL;
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns c WHERE c.table_schema = 'public' AND c.table_name = 'news_articles' AND c.column_name = 'author_id' AND c.data_type <> 'text') THEN
    ALTER TABLE "news_articles" ALTER COLUMN "author_id" SET DATA TYPE text;
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'documents' AND column_name = 'slug' AND column_default IS NOT NULL) THEN
    ALTER TABLE "documents" ALTER COLUMN "slug" DROP DEFAULT;
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'news_articles' AND column_name = 'id' AND data_type <> 'text') THEN
    ALTER TABLE "news_articles" ALTER COLUMN "id" SET DATA TYPE text USING id::text;
  END IF;
END $$;--> statement-breakpoint
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'pages' AND column_name = 'slug_name' AND column_default IS NOT NULL) THEN
    ALTER TABLE "pages" ALTER COLUMN "slug_name" DROP DEFAULT;
  END IF;
END $$;--> statement-breakpoint
UPDATE "news_articles" SET "author_id" = NULL WHERE "author_id" IS NOT NULL;--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'news_articles_author_id_user_id_fk') THEN
    ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
  END IF;
END $$;
