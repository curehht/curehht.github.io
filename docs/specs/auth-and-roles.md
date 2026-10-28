# Auth and roles

Code: `src/auth.ts`, `src/utils/isAuthorized.ts`, `src/utils/getUserFromRequest.ts`, `src/controllers/{roles,users}.ts`, `src/db/schemas/{auth,role}.ts`, `src/db/types.ts`.

## Behavior

- Users sign in with Google (NextAuth v5, Drizzle adapter, DB sessions).
- `/admin/*` redirects unauthenticated visitors to `/api/auth/signin`.
- Each user has one role (`users.role_id`). A role has a unique name and a JSON list of permissions: `{ resource, actions[] }`.
- Resources: `newsArticle`, `page`, `roles`, `users`, `document`. Actions: `create`, `read`, `update`, `delete`.
- Default permissions of a new role: `newsArticle` create + read (legacy; no longer meaningful).

## Rules

- Every mutating controller function SHALL throw `Unauthorized` when there is no user or `isAuthorized` returns false.
- `isAuthorized` SHALL allow an action if the user's role grants it on the resource, or if the user is the resource author (any action).
- Only users with `roles` / `users` permissions SHALL manage roles or assign roles.
- Public pages SHALL NOT require login.

## Known gaps

- `src/app/api/upload/route.ts` authorizes by a hard-coded owner email instead of a permission. Accepted: the owner is the only admin. Revisit if more admins are added.
- `isAuthorized` author rule grants all actions (including delete) to the author; confirm this is intended.
- Only `isAuthorized` has unit tests (`src/utils/isAuthorized.test.ts`); controllers are untested.
