CREATE TABLE IF NOT EXISTS "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "keywords_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pages_keywords" (
	"page_id" text NOT NULL,
	"keyword_id" integer NOT NULL,
	CONSTRAINT "pages_keywords_page_id_keyword_id_pk" PRIMARY KEY("page_id","keyword_id")
);
--> statement-breakpoint
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_keywords_page_id_pages_id_fk') THEN
    ALTER TABLE "pages_keywords" ADD CONSTRAINT "pages_keywords_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_keywords_keyword_id_keywords_id_fk') THEN
    ALTER TABLE "pages_keywords" ADD CONSTRAINT "pages_keywords_keyword_id_keywords_id_fk" FOREIGN KEY ("keyword_id") REFERENCES "public"."keywords"("id") ON DELETE cascade ON UPDATE no action;
  END IF;
END $$;