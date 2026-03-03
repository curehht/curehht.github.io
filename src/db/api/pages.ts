'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { pages } from '@/db/schema'
import type { Page } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'

export const getPages = async () => {
  const result = await db.select().from(pages)
  return result
}

export const getPagesSlugs = async () => {
  const result = await db
    .select({ slug: pages.slug, slug_name: pages.slug_name })
    .from(pages)
  return result
}

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  const result = await db.select().from(pages).where(eq(pages.slug, slug))
  return result[0] ?? null
}

export const getPageById = async (id: string) => {
  const [page] = await db.select().from(pages).where(eq(pages.id, id))
  return page ?? null
}

export type PageInput = {
  slug: string
  slug_name?: string
  title: string
  summary?: string | null
  content?: string | null
  description?: string | null
}

export const createPageDb = async (page: PageInput, authorId: string) => {
  const [created] = await db
    .insert(pages)
    .values({ ...page, author_id: authorId, slug_name: page.slug_name ?? page.slug })
    .returning()
  if (!created) throw new Error('Failed to create page')
  return created
}

export const updatePageDb = async (id: string, page: Partial<PageInput>) => {
  const [updated] = await db
    .update(pages)
    .set(page)
    .where(eq(pages.id, id))
    .returning()
  return updated ?? null
}

export const deletePageDb = async (id: string) => {
  const [deleted] = await db
    .delete(pages)
    .where(eq(pages.id, id))
    .returning()
  return deleted ?? null
}

export async function createPage(page: PageInput) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.page,
      action: PermissionAction.create,
    })
    if (!canDo) throw new Error('Unauthorized')
    const created = await createPageDb(page, userData.id)
    revalidatePath('/admin/pages')
    return { success: true, id: created.id }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create page',
    }
  }
}

export async function updatePage(id: string, page: Partial<PageInput>) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.page,
      action: PermissionAction.update,
    })
    if (!canDo) throw new Error('Unauthorized')
    await updatePageDb(id, page)
    revalidatePath('/admin/pages')
    revalidatePath(`/admin/pages/${id}`)
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update page',
    }
  }
}

export async function deletePage(id: string) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.page,
      action: PermissionAction.delete,
    })
    if (!canDo) throw new Error('Unauthorized')
    await deletePageDb(id)
    revalidatePath('/admin/pages')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete page',
    }
  }
}
