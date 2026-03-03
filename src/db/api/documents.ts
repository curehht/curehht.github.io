'use server'

import { eq, asc, and } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { documents, documentBlocks } from '@/db/schema'
import type { DocumentBlockInput, DocumentInput, UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'

export type DocumentInputAction = {
  title: string
  type: string
  slug: string
  description?: string
  is_published?: boolean
}

export const createDocumentDb = async (
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

export const readDocumentsSlugs = async () => {
  const documentsSlugs = await db
    .select({ slug: documents.slug })
    .from(documents)
  return documentsSlugs
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

export const updateDocumentDb = async (
  id: string,
  document: Partial<Omit<DocumentInput, 'author_id' | 'blocks'>>
) => {
  const [documentSaved] = await db
    .update(documents)
    .set(document)
    .where(eq(documents.id, id))
    .returning()

  return documentSaved
}

export const deleteDocumentDb = async (id: string) => {
  const [documentDeleted] = await db
    .delete(documents)
    .where(eq(documents.id, id))
    .returning()

  return documentDeleted
}

export const createDocumentBlockDb = async ({
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

export const updateDocumentBlockDb = async ({
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

export const deleteDocumentBlockDb = async (id: string) => {
  const [blockDeleted] = await db
    .delete(documentBlocks)
    .where(eq(documentBlocks.id, id))
    .returning()

  return blockDeleted
}

export async function createDocument(document: DocumentInputAction) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.create,
    })
    if (!canDo) throw new Error('Unauthorized')
    const payload = {
      title: document.title,
      type: document.type,
      slug: document.slug,
      description: document.description ?? '',
      is_published: document.is_published ?? false,
    }
    const created = await createDocumentDb(
      { ...payload, author_id: userData.id, blocks: [] } satisfies DocumentInput,
      userData
    )
    revalidatePath('/admin/documents')
    return { success: true, id: created?.id }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create document',
    }
  }
}

export async function updateDocument(id: string, document: Partial<DocumentInputAction>) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.update,
    })
    if (!canDo) throw new Error('Unauthorized')
    await updateDocumentDb(id, document)
    revalidatePath('/admin/documents')
    revalidatePath(`/admin/documents/${id}`)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update document',
    }
  }
}

export async function deleteDocument(id: string) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.delete,
    })
    if (!canDo) throw new Error('Unauthorized')
    await deleteDocumentDb(id)
    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete document',
    }
  }
}

export async function createDocumentBlock(documentId: string, block: DocumentBlockInput) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.create,
    })
    if (!canDo) throw new Error('Unauthorized')
    const created = await createDocumentBlockDb({ document_id: documentId, block })
    revalidatePath(`/admin/documents/${documentId}`)
    return { success: true, block: created }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create document block',
    }
  }
}

export async function updateDocumentBlock(id: string, block: DocumentBlockInput) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.update,
    })
    if (!canDo) throw new Error('Unauthorized')
    await updateDocumentBlockDb({ id, block })
    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update document block',
    }
  }
}

export async function deleteDocumentBlock(id: string) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.document,
      action: PermissionAction.delete,
    })
    if (!canDo) throw new Error('Unauthorized')
    await deleteDocumentBlockDb(id)
    revalidatePath('/admin/documents')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete document block',
    }
  }
}
