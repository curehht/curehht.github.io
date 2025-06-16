import { pgTable, timestamp, text, jsonb } from 'drizzle-orm/pg-core'

import { Resources, PermissionAction } from '../types'
import { users } from './auth'

export const roles = pgTable('role', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
  permissions: jsonb('permissions')
    .notNull()
    .default([
      {
        resource: Resources.newsArticle,
        actions: [PermissionAction.create, PermissionAction.read],
      },
    ]),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdateFn(() => new Date()),
  owner_id: text('owner_id').references(() => users.id, {
    onDelete: 'set null',
  }),
})
