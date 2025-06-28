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

// Text blocks
export const documentTextBlocks = pgTable('document_text_blocks', {
  ...randomId,
  document_id: text('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  // 'paragraph', 'heading1', 'heading2', 'heading3', 'quote', 'list-item'
  text_type: text('text_type').notNull(),
  content: text('content').notNull(),
  ...timestamps,
})

// Media blocks
export const documentMediaBlocks = pgTable('document_media_blocks', {
  ...randomId,
  document_id: text('document_id')
    .notNull()
    .references(() => documents.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  provider: text('provider').notNull(), // 'youtube', 'vimeo', 'dailymotion', 'image', 'audio', 'video'
  url: text('url').notNull(),
  id: text('id').notNull(),
  title: text('title'),
  ...timestamps,
})
