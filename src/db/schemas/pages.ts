import { pgTable, timestamp, text } from 'drizzle-orm/pg-core'

import { users } from './auth'

export const pages = pgTable('pages', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').notNull().unique(),
  slug_name: text('slug_name').notNull().default('TODO'),
  title: text('title').notNull(),
  author_id: text('author_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  description: text('description'),
  summary: text('summary'),
  content: text('content'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})
