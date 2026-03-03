'use client'

import { PageForm, PageProps } from '@/components/PageForm'
import { createPage } from '@/db/api/pages'
import { useRouter } from 'next/navigation'

const initPage: PageProps = {
  title: '',
  slug: '',
  slug_name: '',
  summary: '',
  content: '',
}

export default function AdminPagesNew() {
  const router = useRouter()

  const handleSubmit = async (page: PageProps) => {
    const result = await createPage({
      title: page.title,
      slug: page.slug,
      slug_name: page.slug_name,
      summary: page.summary,
      content: page.content,
    })
    if (result.success && result.id) {
      router.push(`/admin/pages/${result.id}`)
    } else if (result.success) {
      router.push('/admin/pages')
    }
  }

  return (
    <section>
      <h2>Создать страницу</h2>
      <PageForm page={initPage} onSubmit={handleSubmit} />
    </section>
  )
}
