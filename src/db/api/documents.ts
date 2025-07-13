import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq, asc } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { DocumentBlockInput, DocumentInput, UserData } from '@/db/types'

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
    return { ...documentSaved, blocks: blocksSaved }
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

export const updateDocument = async (id: string, document: DocumentInput) => {
  const [documentSaved] = await db
    .update(documents)
    .set(document)
    .where(eq(documents.id, id))
    .returning()

  return documentSaved
}

export const deleteDocument = async (id: string) => {
  const [documentDeleted] = await db
    .delete(documents)
    .where(eq(documents.id, id))
    .returning()

  return documentDeleted
}

export const createDocumentBlock = async ({
  document_id,
  block,
}: {
  document_id: string
  block: DocumentBlockInput
}) => {
  console.log('createDocumentBlock document_id :>> ', document_id)
  console.log('createDocumentBlock block :>> ', block)

  const [blockCreated] = await db
    .insert(documentBlocks)
    .values({
      ...block,
      document_id,
    })
    .returning()
  console.log('createDocumentBlock blockCreated :>> ', blockCreated)

  return blockCreated
}

export const readDocumentBlockById = async (id: string) => {
  const [block] = await db
    .select()
    .from(documentBlocks)
    .where(eq(documentBlocks.id, id))
  return block
}

export const updateDocumentBlock = async ({
  id,
  block,
}: {
  id: string
  block: DocumentBlockInput
}) => {
  const [blockUpdated] = await db
    .update(documentBlocks)
    .set(block)
    .where(eq(documentBlocks.id, id))
    .returning()
  return blockUpdated
}

export const deleteDocumentBlock = async (id: string) => {
  const [blockDeleted] = await db
    .delete(documentBlocks)
    .where(eq(documentBlocks.id, id))
    .returning()

  return blockDeleted
}
