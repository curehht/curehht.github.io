import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq, asc } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { DocumentInput, UserData } from '@/db/types'

const db = drizzle()

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

export const readDocuments = async () => {
  const documentsResponse = await db.select().from(documents)
  return documentsResponse
}

export const readDocumentWithBlocks = async (id: string) => {
  // First get the document
  const [document] = await db
    .select()
    .from(documents)
    .where(eq(documents.id, id))

  if (!document) return null

  // Then get the blocks
  const blocks = await db
    .select()
    .from(documentBlocks)
    .where(eq(documentBlocks.document_id, id))
    .orderBy(asc(documentBlocks.position))

  return {
    ...document,
    blocks,
  }
}

export const updateDocumentWithBlocks = async (
  id: string,
  documentWithBlocks: DocumentInput
) => {
  const result = await db.transaction(async (tx) => {
    const { blocks, ...document } = documentWithBlocks

    const [documentSaved] = await tx
      .update(documents)
      .set(document)
      .where(eq(documents.id, id))
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

export const deleteDocumentWithBlocks = async (id: string) => {
  const result = await db.transaction(async (tx) => {
    const [documentDeleted] = await tx
      .delete(documents)
      .where(eq(documents.id, id))
      .returning()

    const blocksDeleted = await tx
      .delete(documentBlocks)
      .where(eq(documentBlocks.document_id, id))
      .returning()

    return { documentDeleted, blocksDeleted }
  })

  return result.documentDeleted
}
