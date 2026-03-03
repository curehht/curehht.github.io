import {
  getNewsArticles as dbGetNewsArticles,
  getNewsArticleById as dbGetNewsArticleById,
  createNewsArticle as dbCreateNewsArticle,
  updateNewsArticle as dbUpdateNewsArticle,
  deleteNewsArticle as dbDeleteNewsArticle,
  type NewsArticleInput,
} from '@/db/api/news'
import type { UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'

export async function getNewsArticles() {
  return dbGetNewsArticles()
}

export async function getNewsArticleById(id: string) {
  return dbGetNewsArticleById(id)
}

export async function createNewsArticle(
  article: NewsArticleInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.newsArticle,
    action: PermissionAction.create,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbCreateNewsArticle(article, userData)
}

export async function updateNewsArticle(
  id: string,
  article: NewsArticleInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.newsArticle,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdateNewsArticle(id, article)
}

export async function deleteNewsArticle(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.newsArticle,
    action: PermissionAction.delete,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbDeleteNewsArticle(id)
}
