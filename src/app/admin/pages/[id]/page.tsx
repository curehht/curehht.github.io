'use client'

import { use } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { PageForm } from '@/components/PageForm'
import { cleanVariables } from '@/utils/cleanVariables'
import { GET_PAGE_BY_ID, UPDATE_PAGE_BY_ID } from '@/db/queries-qraphql'

export default function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { data, loading, error } = useQuery(GET_PAGE_BY_ID, {
    variables: { id },
  })
  const [updatePageById] = useMutation(UPDATE_PAGE_BY_ID, {
    refetchQueries: [{ query: GET_PAGE_BY_ID, variables: { id } }],
  })

  const handleSubmit = (page) => {
    delete page.id
    updatePageById({
      variables: { id, page: cleanVariables(page) },
    })
  }

  return (
    <section>
      <h2>Page {data?.pageById?.slug}</h2>
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      {data?.pageById && (
        <PageForm page={data.pageById} onSubmit={handleSubmit} />
      )}
    </section>
  )
}
