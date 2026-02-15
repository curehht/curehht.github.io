import Link from 'next/link'

import { getPages } from '@/controllers/pages'

export default async function AdminPages() {
  const pages = await getPages()
  return (
    <section>
      <h2>Админка страниц</h2>
      <Link href="/admin/pages/new">Создать страницу</Link>
      {pages && (
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={`/admin/pages/${page.id}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
