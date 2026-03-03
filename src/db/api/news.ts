'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { newsArticle } from '@/db/schema'
import type { UserData } from '@/db/types'

export type NewsArticleInput = {
  title: string
  summary?: string | null
  text?: unknown
  origin_url?: string
}

export const getNewsArticles = async () => {
  const result = await db.select().from(newsArticle)
  return result
}

export const getNewsArticleById = async (id: string) => {
  const [article] = await db
    .select()
    .from(newsArticle)
    .where(eq(newsArticle.id, id))
  return article ?? null
}

export const createNewsArticle = async (
  article: NewsArticleInput,
  userData: UserData
) => {
  const [created] = await db
    .insert(newsArticle)
    .values({
      ...article,
      author_id: userData.id,
      origin_url: article.origin_url ?? '',
    })
    .returning()
  return created
}

export const updateNewsArticle = async (
  id: string,
  article: NewsArticleInput
) => {
  const [updated] = await db
    .update(newsArticle)
    .set(article)
    .where(eq(newsArticle.id, id))
    .returning()
  return updated
}

export const deleteNewsArticle = async (id: string) => {
  const [deleted] = await db
    .delete(newsArticle)
    .where(eq(newsArticle.id, id))
    .returning()
  return deleted
}
