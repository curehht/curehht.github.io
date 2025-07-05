import { pgTable, text, integer, boolean } from 'drizzle-orm/pg-core'
import { users } from './auth'
import { timestamps, randomId } from './common-fileds'

// Main documents table
export const documents = pgTable('documents', {
  ...randomId,
  title: text('title').notNull(),
  description: text('description'),
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
  // 'paragraph', 'heading1', 'heading2', 'heading3', 'quote', 'list-item'
  // 'youtube', 'vimeo', 'dailymotion', 'image', 'audio', 'video'
  type: text('type').notNull(),
  content: text('content'),
  url: text('url'),
  title: text('title'),
  ...timestamps,
})
