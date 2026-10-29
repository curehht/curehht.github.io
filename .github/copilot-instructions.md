# Copilot instructions

Read [AGENTS.md](../AGENTS.md) before changing application code. It is the
authoritative source for the stack, layout, validation commands, and
engineering workflow.

## Application

- Use functional TypeScript and guard clauses; do not introduce classes.
- Prefer Server Components. Isolate necessary client-side editors, uploads, and
  forms.
- Use plain CSS modules and mobile-first layouts; do not add a UI or state
  management library without an approved change.
- Keep user-facing text in Russian.
- Preserve static-export compatibility: public pages must not depend on
  `src/app/admin` or `src/app/api`.

## Workflow

- Read the affected `docs/specs/` file before changing a domain. Follow the
  change-proposal workflow in `AGENTS.md` for new behavior.
- Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` before completing code
  changes. Add focused Vitest tests for changed pure logic.
- Do not commit secrets, `.env*`, or local tool credentials.

## Database

- Define schema changes under `src/db/schemas/` and re-export them from
  `src/db/schema.ts`.
- Access the database only through `src/db/api/`. Mutating or admin-only
  operations must go through controllers and check `isAuthorized`.
- Generate migrations with `pnpm migration:generate`; do not hand-edit applied
  migrations or change the database outside the migration workflow.
- Apply migrations only with explicit approval and a local `POSTGRES_URL`.

## MCP tools

- Use GitHub and Vercel integrations for inspection before proposing changes.
- Require explicit user approval before creating or modifying GitHub resources,
  changing Vercel settings, deploying, or triggering production actions.
- Neon access is restricted to schema and query inspection. Never use an MCP
  tool to modify a database, and never connect an agent to production data.
- Authenticate with OAuth in VS Code. Do not add tokens, connection strings,
  or OAuth client secrets to tracked files.
