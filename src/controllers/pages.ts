import {
  getPages as dbGetPages,
  getPageById as dbGetPageById,
  getPageBySlug as dbGetPageBySlug,
  getPagesSlugs as dbGetPagesSlugs,
  createPageDb as dbCreatePage,
  updatePageDb as dbUpdatePage,
  deletePageDb as dbDeletePage,
  type PageInput,
} from '@/db/api/pages'
import type { UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'

export async function getPages() {
  return dbGetPages()
}

export async function getPagesSlugs() {
  return dbGetPagesSlugs()
}

export async function getPageById(id: string) {
  return dbGetPageById(id)
}

export async function getPageBySlug(slug: string) {
  return dbGetPageBySlug(slug)
}

export async function createPage(
  page: PageInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.page,
    action: PermissionAction.create,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbCreatePage(page, userData.id)
}

export async function updatePage(
  id: string,
  page: Partial<PageInput>,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.page,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdatePage(id, page)
}

export async function deletePage(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.page,
    action: PermissionAction.delete,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbDeletePage(id)
}
