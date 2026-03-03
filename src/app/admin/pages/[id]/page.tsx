import Link from 'next/link'
import { getPageById } from '@/controllers/pages'
import { notFound } from 'next/navigation'
import { PageFormWithActions } from './PageFormWithActions'

export default async function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const page = await getPageById(id)

  if (!page) {
    notFound()
  }

  return (
    <section>
      <h2>Страница: {page.slug}</h2>
      <div>
        <Link href="/admin/pages">Назад</Link>
      </div>
      <PageFormWithActions
        page={{
          id: page.id,
          title: page.title,
          slug: page.slug,
          slug_name: page.slug_name ?? '',
          summary: page.summary ?? '',
          content: page.content ?? '',
        }}
      />
    </section>
  )
}
