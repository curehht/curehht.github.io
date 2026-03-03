ALTER TABLE "news_articles" RENAME COLUMN "author" TO "author_id";--> statement-breakpoint
ALTER TABLE "news_articles" ALTER COLUMN "author_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ALTER COLUMN "author_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "slug" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "news_articles" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pages" ALTER COLUMN "slug_name" DROP DEFAULT;--> statement-breakpoint
UPDATE "news_articles" SET "author_id" = NULL;--> statement-breakpoint
ALTER TABLE "news_articles" ADD CONSTRAINT "news_articles_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;