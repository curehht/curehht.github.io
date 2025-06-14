import Link from 'next/link'
import Image from 'next/image'

import { getClient } from '@/components/Apollo/ApolloClient'
import { GET_NEWS_ARTICLES } from '@/db/queries-qraphql'

export const metadata = {
  title: 'О болезни Рандю-Ослера',
  description: 'Общая информация о болезни Рандю-Ослера',
  keywords:
    'Болезнь Рандю-Ослера, синонимы, наследственность, аутосомно-доминантный тип наследования',
}

export default async function IndexPage() {
  const client = getClient()
  const { data, loading, error } = await client.query({
    query: GET_NEWS_ARTICLES,
  })

  if (loading) return <div>Loading...</div>

  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="IndexPage">
      <section aria-label="Новости">
        <h2>Новости</h2>
        {loading && <div>Loading...</div>}
        <ul>
          {!loading &&
            data?.newsArticles?.map((article) => (
              <li key={article.id}>
                <Link href={`/news/${article.id}`}>{article.title}</Link>
              </li>
            ))}
        </ul>
      </section>
      <article>
        <main>
          <section aria-label="Синонимы">
            <h2>Синонимы</h2>
            <ul>
              <li>Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера)</li>
              <li>синдром Ослера</li>
              <li>семейная наследственная телеангиэктазия</li>
              <li>наследственная геморрагическая телеангиэктазия</li>
              <li>геморрагический ангиоматоз</li>
            </ul>
          </section>
        </main>
      </article>
    </div>
  )
}
