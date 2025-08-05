import { pgTable, text, integer, boolean } from 'drizzle-orm/pg-core'
import { users } from './auth'
import { timestamps, randomId } from './common-fileds'
import { sql } from 'drizzle-orm'

// Main documents table
export const documents = pgTable('documents', {
  ...randomId,
  title: text('title').notNull(),
  slug: text('slug')
    .notNull()
    .unique()
    .default(sql`gen_random_uuid()`),
  description: text('description'),
  type: text('type', {
    enum: ['no-value', 'newsItem', 'article', 'research'],
  }).$default(() => 'no-value'),
  author_id: text('author_id').references(() => users.id, {
    onDelete: 'set null',
  }),
  is_published: boolean('is_published').notNull().default(false),
  ...timestamps,
})

export const documentBlocks = pgTable('document_blocks', {
  ...randomId,
  document_id: text('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  // 'paragraph', 'heading2', 'heading3', 'list', 'youtube', 'image', 'quote'
  type: text('type').notNull(),
  content: text('content'),
  url: text('url'),
  title: text('title'),
  ...timestamps,
})
