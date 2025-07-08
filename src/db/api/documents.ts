import { drizzle } from 'drizzle-orm/vercel-postgres'
import { unionAll } from 'drizzle-orm/pg-core'
import { eq, sql } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { Document, DocumentBlock, DocumentWithContent } from '@/db/types'

const db = drizzle()

export const getDocumentWithContent = async (documentId: string) => {
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
  return result
}

export const createDocumentWithBlocks = async (
  documentWithBlocks: Omit<Document, 'id' | 'created_at' | 'updated_at'> & {
    blocks: Omit<DocumentBlock, 'id' | 'created_at' | 'updated_at'>[]
  }
) => {
  const result = await db.transaction(async (tx) => {
    const { blocks, ...document } = documentWithBlocks

    console.log('{ blocks, ...document } :>> ', { blocks, ...document })

    return

    const documentSaved = await tx
      .insert(document)
      .values(documentWithBlocks)
      .returning()

    const blocksSaved = await tx
      .insert(documentBlocks)
      .values(
        blocks.map((block) => ({
          ...block,
          document_id: documentSaved.id,
        }))
      )
      .returning()
    return { documentSaved, blocksSaved }
  })
  return result
}
