import { notFound } from 'next/navigation'

import { getPageBySlug, getPagesSlugs } from '@/db/api/pages'

import classes from './page.module.css'
import { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = await getPagesSlugs()

  return slugs
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  return {
    title: page.title,
    description: page.summary,
    keywords: '',
  }
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <main className={classes.main}>
      <article className={classes.article}>
        <h1 className={classes.title}>{page.title}</h1>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </main>
  )
}
