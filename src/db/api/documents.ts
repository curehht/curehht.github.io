import { drizzle } from 'drizzle-orm/vercel-postgres'
import { unionAll } from 'drizzle-orm/pg-core'
import { eq, sql } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { DocumentInput, UserData } from '@/db/types'

const db = drizzle()

export const getDocumentWithBlocks = async (documentId: string) => {
  const result = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
  return result
}

export const createDocumentWithBlocks = async (
  documentWithBlocks: DocumentInput,
  userData: UserData
) => {
  const result = await db.transaction(async (tx) => {
    const { blocks, ...document } = documentWithBlocks

    document.author_id = userData.id

    const [documentSaved] = await tx
      .insert(documents)
      .values(document)
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

  const savedDocument = {
    ...result.documentSaved,
    blocks: result.blocksSaved,
  }

  return savedDocument
}
