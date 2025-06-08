import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const keywords = pgTable('keywords', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
})
