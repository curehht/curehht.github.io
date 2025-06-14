import Link from 'next/link'

import { getClient } from '@/components/Apollo/ApolloClient'
import { GET_NEWS_ARTICLES } from '@/db/queries-qraphql'

export const metadata = {
  title: 'Новости',
  description: 'Новости о болезни Рандю-Ослера',
  keywords: 'Новости, болезнь Рандю-Ослера',
}

async function NewsListPage() {
  const client = getClient()
  const { data, loading, error } = await client.query({
    query: GET_NEWS_ARTICLES,
  })

  if (loading) return <div>Loading...</div>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      <h2>Новости</h2>
      <ul>
        {data?.newsArticles?.map((article) => (
          <li key={article.id}>
            <Link href={`/news/${article.id}`}>{article.title}</Link>
            <time dateTime={new Date(article.updated_at).toLocaleString()}>
              {' '}
              [{new Intl.DateTimeFormat().format(new Date(article.updated_at))}]
            </time>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default NewsListPage
