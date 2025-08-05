import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq, asc, and } from 'drizzle-orm'

import { documents, documentBlocks } from '@/db/schema'
import type { DocumentBlockInput, DocumentInput, UserData } from '@/db/types'

const db = drizzle()

export const createDocument = async (
  document: DocumentInput,
  userData: UserData
) => {
  document.author_id = userData.id

  const [documentSaved] = await db
    .insert(documents)
    .values(document)
    .returning()

  return documentSaved
}

export const readDocuments = async (searchParams: {
  type?: 'newsItem' | 'article' | 'research'
}) => {
  const documentsResponse = await db
    .select()
    .from(documents)
    .where(eq(documents.type, searchParams.type))
    .orderBy(asc(documents.created_at))
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

export const readDocumentBySlug = async (slug: string) => {
  const [document] = await db
    .select()
    .from(documents)
    .where(eq(documents.slug, slug))

  if (!document) return null

  const blocks = await db
    .select()
    .from(documentBlocks)
    .where(eq(documentBlocks.document_id, document.id))
    .orderBy(asc(documentBlocks.position))

  return {
    ...document,
    blocks,
  }
}

export const readDocumentBySlugAndType = async (
  slug: string,
  type: 'newsItem' | 'article' | 'research'
) => {
  const [document] = await db
    .select()
    .from(documents)
    .where(and(eq(documents.slug, slug), eq(documents.type, type)))
  return document
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
  const [blockCreated] = await db
    .insert(documentBlocks)
    .values({
      ...block,
      document_id,
    })
    .returning()

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
