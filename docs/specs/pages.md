# Pages

Code: `src/app/(sections)/[slug]/page.tsx`, `src/app/admin/pages/*`, `src/controllers/pages.ts`, `src/db/api/pages.ts`, `src/db/schemas/pages.ts` (+ `keywords`, `pages_keywords`).

## Behavior

- A page has unique `slug`, `slug_name` (navigation label), `title`, `description`, `summary`, HTML `content`, author, timestamps.
- Public route `/[slug]` renders the page; unknown slug → 404. `generateStaticParams` prebuilds all slugs.
- Metadata: `title` from page title, `description` from `summary`.
- Admin (`/admin/pages`, `/new`, `/[id]`) lists, creates, edits, deletes pages using a rich-text editor (TinyMCE).

## Rules

- Create/update/delete SHALL require the `page` permission for that action.
- Slug SHALL be unique.

## Known gaps

- Keywords tables exist but are not used in metadata (`keywords: ''`).
