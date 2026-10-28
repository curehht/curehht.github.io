# AGENTS.md

Site of the Russian-speaking Cure HHT (Osler–Weber–Rendu) patient community.
This file is the single source of agent instructions (Claude Code, Cursor, cloud agents).
`CLAUDE.md` just imports it.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Drizzle ORM + Postgres (Neon) · NextAuth v5 (Google) · Vercel Blob · Sentry · pnpm.

## Commands

- `pnpm dev` / `pnpm build`
- Checks (same as CI): `pnpm typecheck`, `pnpm lint`, `pnpm test` (vitest, `src/**/*.test.ts`). Run all three before finishing.
- `pnpm migration:generate` then `pnpm migration:migrate` (needs `POSTGRES_URL` in `.env.local`)
- Add a unit test next to any pure logic you add or change (permissions, helpers).

## Layout

- `src/db/schemas/*` Drizzle tables, re-exported from `src/db/schema.ts`. Schema in TS is the source of truth.
- `src/db/api/*` the only place that talks to the DB.
- `src/controllers/*` authorization (`isAuthorized`) + calls to `db/api`. Pages and server actions call controllers, not `db/api`, for anything mutating or admin-only.
- `src/app/(sections)` public site, `src/app/admin` admin UI (login required), `src/app/api` route handlers.
- `src/components/*` UI components with CSS modules, exported via `src/components/index.ts`.
- `drizzle/` generated SQL migrations. Never hand-edit applied ones.

## Conventions

- Functional TS, no classes. Early returns and guard clauses.
- Prefer Server Components. `'use client'` only for editors, uploads, forms; keep those isolated.
- No state management libraries. UI: plain CSS modules, mobile-first, until a design system is chosen (then update this line).
- Images: size data, lazy loading.
- Prettier + ESLint run on commit (husky + lint-staged). Match surrounding style.
- UI text is in Russian.

## Spec-driven workflow (lightweight)

Specs live in `docs/specs/` and describe current behavior per domain. Read the relevant spec before changing a domain.

- Small fix or refactor: just do it. Update a spec only if behavior it describes changes.
- New feature or behavior change: copy `docs/changes/_template.md` to `docs/changes/<short-name>.md`, fill it in, get approval from the owner, then implement. In the same PR, update the affected `docs/specs/*.md` and delete the change file (git history keeps it).
- Spec must match code. If you find a mismatch, say so in the PR; don't silently pick one.
- Details: `docs/specs/README.md`.

## Hard rules

- Schema change = edit `src/db/schemas/*`, run `migration:generate`, commit the SQL. Never edit the DB by hand.
- Every mutating controller function must check `isAuthorized` and throw `Unauthorized` otherwise.
- Never commit secrets or `.env*`.
- Production static export removes `src/app/admin` and `src/app/api` (see `docs/specs/deployment.md`); public pages must not import from them.
- Suggest an approach before large changes and wait for confirmation.
