'use client'

import { useQuery } from '@apollo/client'
import Link from 'next/link'

import { GET_PAGES } from '@/db/queries-qraphql'

export default function AdminPages() {
  const { data, loading, error } = useQuery(GET_PAGES)
  return (
    <section>
      <h2>Pages</h2>
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      <Link href="/admin/pages/new">Create Page</Link>
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
