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
