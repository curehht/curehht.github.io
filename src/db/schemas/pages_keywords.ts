import { pgTable, integer, primaryKey, text } from 'drizzle-orm/pg-core'

import { pages } from './pages'
import { keywords } from './keywords'

export const pagesKeywords = pgTable(
  'pages_keywords',
  {
    page_id: text('page_id')
      .notNull()
      .references(() => pages.id, { onDelete: 'cascade' }),
    keyword_id: integer('keyword_id')
      .notNull()
      .references(() => keywords.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.page_id, table.keyword_id] })]
)
