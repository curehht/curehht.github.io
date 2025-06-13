'use client'

import { use } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { PageForm } from '@/components/PageForm'
import { cleanVariables } from '@/utils/cleanVariables'
import {
  GET_PAGE_BY_ID,
  UPDATE_PAGE_BY_ID,
  DELETE_PAGE_BY_ID,
} from '@/db/queries-qraphql'
import { useRouter } from 'next/navigation'

export default function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_PAGE_BY_ID, {
    variables: { id },
  })
  const [updatePageById] = useMutation(UPDATE_PAGE_BY_ID, {
    refetchQueries: [{ query: GET_PAGE_BY_ID, variables: { id } }],
  })

  const [deletePageById] = useMutation(DELETE_PAGE_BY_ID, {
    refetchQueries: [{ query: DELETE_PAGE_BY_ID }],
  })

  const handleSubmit = async (page) => {
    delete page.id
    const result = await updatePageById({
      variables: { id, page: cleanVariables(page) },
    })
    if (result) {
      router.push(`/admin/pages`)
    } else {
      router.push(`/admin/pages/${id}`)
    }
  }

  const handleDelete = async () => {
    await deletePageById({ variables: { id } })
    router.push('/admin/pages')
  }

  return (
    <section>
      <h2>Page {data?.pageById?.slug}</h2>
      {loading && <div>Loading...</div>}
      {error && <p>Error: {error.message}</p>}
      {data?.pageById && (
        <PageForm
          page={data.pageById}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}
