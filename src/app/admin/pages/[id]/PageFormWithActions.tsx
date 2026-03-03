'use client'

import { useRouter } from 'next/navigation'
import { PageForm } from '@/components/PageForm'
import { cleanVariables } from '@/utils/cleanVariables'
import { updatePage, deletePage } from '@/db/api/pages'
import type { PageProps } from '@/components/PageForm'

export function PageFormWithActions({ page }: { page: PageProps }) {
  const router = useRouter()

  const handleSubmit = async (formPage: PageProps) => {
    if (!page.id) return
    const { id, ...rest } = formPage
    const result = await updatePage(page.id, cleanVariables(rest))
    if (result.success) {
      router.push('/admin/pages')
    }
  }

  const handleDelete = async () => {
    if (!page.id) return
    const result = await deletePage(page.id)
    if (result.success) {
      router.push('/admin/pages')
    }
  }

  return (
    <PageForm page={page} onSubmit={handleSubmit} onDelete={handleDelete} />
  )
}
