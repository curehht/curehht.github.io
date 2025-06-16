import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'

import { pages } from '@/db/schema'
import type { Page } from '@/db/types'

const db = drizzle()

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

export const getPageBySlug = async (slug: string): Promise<Page> => {
  const result = await db.select().from(pages).where(eq(pages.slug, slug))
  return result[0] ?? ({} as Page)
}

export const createPage = async (page: Page) => {
  const result = await db.insert(pages).values(page)
  return result
}
