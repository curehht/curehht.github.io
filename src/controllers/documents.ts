import {
  readDocuments,
  readDocumentWithBlocks,
  readDocumentBySlug,
  createDocumentDb as dbCreateDocument,
  updateDocumentDb as dbUpdateDocument,
  deleteDocumentDb as dbDeleteDocument,
  createDocumentBlockDb as dbCreateDocumentBlock,
  readDocumentBlockById as dbReadDocumentBlockById,
  updateDocumentBlockDb as dbUpdateDocumentBlock,
  deleteDocumentBlockDb as dbDeleteDocumentBlock,
} from '@/db/api/documents'
import type {
  UserData,
  DocumentInput,
  DocumentBlockInput,
} from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'

export async function getDocuments(type: 'newsItem' | 'article' | 'research') {
  return readDocuments({ type })
}

export async function getDocumentById(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.read,
  })
  if (!canDo) throw new Error('Unauthorized')
  return readDocumentWithBlocks(id)
}

export async function getDocumentBySlug(slug: string) {
  return readDocumentBySlug(slug)
}

export async function createDocument(
  document: Omit<DocumentInput, 'author_id' | 'blocks'>,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.create,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbCreateDocument(
    {
      ...document,
      author_id: userData.id,
    } as DocumentInput,
    userData
  )
}

export async function updateDocument(
  id: string,
  document: Partial<Omit<DocumentInput, 'author_id' | 'blocks'>>,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdateDocument(id, document)
}

export async function deleteDocument(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.delete,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbDeleteDocument(id)
}

export async function getDocumentBlockById(id: string) {
  return dbReadDocumentBlockById(id)
}

export async function createDocumentBlock(
  documentId: string,
  block: DocumentBlockInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.create,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbCreateDocumentBlock({ document_id: documentId, block })
}

export async function updateDocumentBlock(
  id: string,
  block: DocumentBlockInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdateDocumentBlock({ id, block })
}

export async function deleteDocumentBlock(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.document,
    action: PermissionAction.delete,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbDeleteDocumentBlock(id)
}
