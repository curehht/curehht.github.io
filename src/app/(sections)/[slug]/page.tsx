import gql from 'graphql-tag'
import { notFound } from 'next/navigation'

import { getClient } from '@/components/Apollo/ApolloClient'

const GET_PAGES_SLUG = gql`
  query GetPages {
    pages {
      slug
    }
  }
`
const GET_PAGE = gql`
  query GetPage($slug: String!) {
    page(slug: $slug) {
      id
      slug
      title
      summary
      content
      created_at
      updated_at
    }
  }
`

async function fetchSlugsFromDB() {
  const client = getClient()
  const { data } = await client.query({
    query: GET_PAGES_SLUG,
  })

  return data.pages.map((page: { slug: string }) => page.slug)
}

export async function generateStaticParams() {
  const slugs = await fetchSlugsFromDB()

  return slugs.map((slug: string) => ({
    slug,
  }))
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
