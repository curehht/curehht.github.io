import {
  pgTable,
  serial,
  varchar,
  timestamp,
  json,
  text,
} from 'drizzle-orm/pg-core'

export const newsArticle = pgTable('news_articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
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
