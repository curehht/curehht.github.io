'use client'

import { use } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import gql from 'graphql-tag'

import { PageForm } from '@/components/PageForm'
import { cleanVariables } from '@/utils/cleanVariables'

const GET_PAGE_BY_ID = gql`
  query GetPageById($id: String!) {
    pageById(id: $id) {
      id
      slug
      slug_name
      title
      summary
      content
    }
  }
`

const UPDATE_PAGE_BY_ID = gql`
  mutation UpdatePageById($id: String!, $page: PageInput!) {
    updatePage(id: $id, page: $page) {
      id
      slug
      slug_name
      title
      summary
      content
      updated_at
    }
  }
`

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
    <div>
      <h3>Page {data?.pageById?.slug}</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.pageById && (
        <PageForm page={data.pageById} onSubmit={handleSubmit} />
      )}
    </div>
  )
}
