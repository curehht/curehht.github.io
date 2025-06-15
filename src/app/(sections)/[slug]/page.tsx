import { notFound } from 'next/navigation'

import { getClient } from '@/components/Apollo/ApolloClient'
import { GET_PAGES_SLUG, GET_PAGE } from '@/db/queries-qraphql'
import classes from './page.module.css'

export async function generateStaticParams() {
  const slugs = await fetchSlugsFromDB()

  return slugs.map((slug: string) => ({
    slug,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const page = (await fetchPageBySlug(slug)) ?? {}
  return {
    title: page.title,
    description: page.summary,
    keywords: page.keywords,
  }
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const page = await fetchPageBySlug(slug)

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

async function fetchSlugsFromDB() {
  const client = getClient()
  const { data } = await client.query({
    query: GET_PAGES_SLUG,
  })

  return data.pages.map((page: { slug: string }) => page.slug)
}

async function fetchPageBySlug(slug: string) {
  const client = getClient()
  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      slug,
    },
  })

  return data.page
}
