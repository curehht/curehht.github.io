import {
  pgTable,
  timestamp,
  json,
  text,
} from 'drizzle-orm/pg-core'

import { users } from './auth'

export const newsArticle = pgTable('news_articles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  author_id: text('author_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  summary: text('summary'),
  text: json('text').default([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]),
  origin_url: text('origin_url').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
})
