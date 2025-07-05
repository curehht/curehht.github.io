import { drizzle } from 'drizzle-orm/vercel-postgres'
import { unionAll } from 'drizzle-orm/pg-core'
import { eq, sql } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { Document, DocumentWithContent } from '@/db/types'

const db = drizzle()

export const getDocumentWithContent = async (documentId: string) => {
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
  return result
}
