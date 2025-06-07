import { notFound } from 'next/navigation'

import { getClient } from '@/components/Apollo/ApolloClient'
import { GET_PAGES_SLUG, GET_PAGE } from '@/db/queries-qraphql'

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
  const page = await fetchPageBySlug(slug)
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
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
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
