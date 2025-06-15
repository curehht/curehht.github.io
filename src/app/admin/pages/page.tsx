import { getClient } from '@/components/Apollo/ApolloClient'
import Link from 'next/link'

import { GET_PAGES } from '@/db/queries-qraphql'

export default async function AdminPages() {
  const client = getClient()
  const { data, loading, error } = await client.query({
    query: GET_PAGES,
  })
  return (
    <section>
      <h2>Админка страниц</h2>
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      <Link href="/admin/pages/new">Создать страницу</Link>
      {data && (
        <ul>
          {data.pages.map((page) => (
            <li key={page.id}>
              <Link href={`/admin/pages/${page.id}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
