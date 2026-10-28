# Documents

Code: `src/app/admin/documents/*`, `src/controllers/documents.ts`, `src/db/api/documents.ts`, `src/db/schemas/documents.ts`, `src/components/Document`.

## Behavior

- A document has unique `slug`, `title`, `description`, `type` (`no-value` | `newsItem` | `article` | `research`), `is_published`, author, timestamps.
- A document is an ordered list of blocks (`position`): `paragraph`, `heading2`, `heading3`, `list`, `youtube`, `image`, `quote`. Blocks have `content`, optional `title` and `url`. Deleting a document deletes its blocks.
- Public listing by type; lookup by slug. News (`/news`, `/news/[slug]`, home page list) are documents of type `newsItem`.
- Admin (`/admin/documents`, `/new`, `/[slug]`) creates and edits documents and blocks.

## Rules

- Create/update/delete (document and block) SHALL require the `document` permission; read by id in admin also requires `document:read`.
- `author_id` SHALL be set from the current user on create, never from client input.
- Unpublished documents SHALL NOT appear on public pages: public listings, slug lookups, static params and metadata filter on `is_published` (`publishedOnly`). Admin lists show all.

## Known gaps

- Legacy table `news_articles` is no longer used by any code. It stays in the DB and in `src/db/schemas/news_articles.ts`; dropping it needs a data decision and a migration. `Resources.newsArticle` stays in the enum because existing roles may reference it.
- `/news/[slug]` does not check `type = newsItem`; any published document is reachable there.
