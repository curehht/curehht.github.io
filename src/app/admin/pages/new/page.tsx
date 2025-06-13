'use client'

import { useMutation } from '@apollo/client'

import { PageForm, PageProps } from '@/components/PageForm'
import { CREATE_PAGE } from '@/db/queries-qraphql'
import { useRouter } from 'next/navigation'

const initPage: PageProps = {
  title: '',
  slug: '',
  slug_name: '',
  summary: '',
  content: '',
}

export default function AdminPagesNew() {
  const [createPage, { loading, error }] = useMutation(CREATE_PAGE)
  const router = useRouter()
  const handleSubmit = async (page: PageProps) => {
    const result = await createPage({ variables: { page } })
    // if created - redirect to /admin/pages
    if (result) {
      router.push('/admin/pages')
    } else {
      router.push(`/admin/pages/${result.data.createPage.id}`)
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section>
      <h2>Create Page</h2>
      <PageForm page={initPage} onSubmit={handleSubmit} />
    </section>
  )
}
