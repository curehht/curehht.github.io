'use client'

import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { gql, useQuery, useMutation } from '@apollo/client'

import { NewsArticleForm } from '@/components'

const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: Int!) {
    newsArticle(id: $id) {
      id
      title
      author
      text
      summary
      origin_url
      created_at
      updated_at
    }
  }
`

const UPDATE_NEWS_ARTICLE = gql`
  mutation UpdateNewsArticle($id: Int!, $article: NewsArticleInput) {
    updateNewsArticle(id: $id, article: $article) {
      id
      title
      author
      summary
      text
      origin_url
      created_at
      updated_at
    }
  }
`

type EditNewsArticlePageProps = {
  params: Promise<{
    id: string
  }>
}

const EditNewsArticlePageContent = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLE, {
    variables: { id: parseInt(id, 10) },
  })

  const [updateNewsArticle] = useMutation(UPDATE_NEWS_ARTICLE, {
    refetchQueries: [
      {
        query: GET_NEWS_ARTICLE,
        variables: { id: parseInt(id as string, 10) },
      },
    ],
  })

  const handleSubmit = (article) => {
    console.log('article: ', article)
    const updatingArticle = { ...article }
    delete updatingArticle.id
    updateNewsArticle({
      variables: { id: parseInt(id, 10), article: updatingArticle },
    })
  }

  if (loading) return <Spinner animation="border" />
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      {data?.newsArticle && (
        <NewsArticleForm onSubmit={handleSubmit} {...data.newsArticle} />
      )}
    </section>
  )
}

const EditNewsArticlePage = async ({ params }: EditNewsArticlePageProps) => {
  const { id } = await params
  return <EditNewsArticlePageContent id={id} />
}

export default EditNewsArticlePage
