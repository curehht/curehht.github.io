# About the Project

A website for the Russian-speaking community supporting patients with [Osler–Weber–Rendu](https://en.wikipedia.org/wiki/Hereditary_hemorrhagic_telangiectasia) disease.

## Technologies

- [Next.js 15](https://nextjs.org/) - React framework for building web applications
- [React 19](https://react.dev/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [NextAuth.js](https://next-auth.js.org/) - Authentication and authorization
- [Drizzle ORM](https://orm.drizzle.team/) - ORM for working with the database
- [Vercel Postgres](https://vercel.com/storage/postgres) - PostgreSQL database
- [Vercel Blob](https://vercel.com/storage/blob) - File storage
- [Vercel Analytics & Speed Insights](https://vercel.com/analytics) - Analytics and performance monitoring
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Code linting and formatting

## Add a Field to the Database

1. Add the field to the schema
2. Run `drizzle-kit generate`
3. Run `drizzle-kit migrate`

## Developer tools

VS Code Copilot loads project integrations from [`.mcp.json`](.mcp.json).
After opening the repository, authenticate each server with OAuth from **Chat:
Open Customizations** > **MCP Servers**:

- **GitHub** provides repository, pull request, and workflow context.
- **Vercel** provides project and deployment context. Grant access only to the
  team or project needed for this repository.
- **Neon** is limited to read-only schema and query inspection. Do not connect
  it to production or sensitive data.

The configuration contains no credentials. Keep tokens, OAuth client secrets,
and connection strings in local environment or editor storage only. Before
using an integration, confirm its OAuth scope; require explicit approval for
writes, deployments, and other production actions.

To verify setup, reconnect the MCP servers in Cursor, then request the current
repository's GitHub status, the linked Vercel project status, and a Neon schema
inspection. Run `pnpm typecheck`, `pnpm lint`, and `pnpm test` after changing
project configuration.
