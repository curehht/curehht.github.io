import React from 'react'
import { getClient } from '@/components/Apollo/ApolloClient'
import { GET_NEWS_ARTICLE } from '@/db/queries-qraphql'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const { data } = await fetchNewsArticle(id)
  const { title, summary, origin_url } = data?.newsArticle
  return {
    title: title,
    description: summary,
    keywords: origin_url,
  }
}

type NewsArticlePageProps = {
  params: Promise<{
    id: string
  }>
}

const NewsArticlePage = async ({ params }: NewsArticlePageProps) => {
  const { id } = await params
  const { data, loading, error } = await fetchNewsArticle(id)

  if (loading) return <div>Loading...</div>
  if (error) return <p>Error: {error.message}</p>

  const { title, summary, origin_url, created_at, updated_at } =
    data?.newsArticle

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <p>
          <time dateTime={new Date(created_at).toLocaleString()}>
            added {new Intl.DateTimeFormat().format(new Date(created_at))}
          </time>
        </p>
        <p>
          <time dateTime={new Date(updated_at).toLocaleString()}>
            updated {new Intl.DateTimeFormat().format(new Date(updated_at))}
          </time>
        </p>
      </header>

      <section>
        <div>{summary && <p>{summary}</p>}</div>
        {origin_url && (
          <p>
            Source: <a href={origin_url}>{origin_url}</a>
          </p>
        )}
      </section>
    </article>
  )
}

export default NewsArticlePage

async function fetchNewsArticle(id: string) {
  const client = getClient()
  const { data, loading, error } = await client.query({
    query: GET_NEWS_ARTICLE,
    variables: { id: parseInt(id, 10) },
  })

  return {
    data,
    loading,
    error,
  }
}
