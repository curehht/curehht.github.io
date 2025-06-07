'use client'

import { useMutation } from '@apollo/client'

import { PageForm, PageProps } from '@/components/PageForm'
import { CREATE_PAGE } from '@/db/queries-qraphql'

const initPage: PageProps = {
  title: '',
  slug: '',
  slug_name: '',
  summary: '',
  content: '',
}

export default function AdminPagesNew() {
  const [createPage, { loading, error }] = useMutation(CREATE_PAGE)

  const handleSubmit = (page: PageProps) => {
    const result = createPage({ variables: { page } })
    console.log('result :>> ', result)
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
