'use client'

import React, { use } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { NewsArticleForm } from '@/components'
import { GET_NEWS_ARTICLE, UPDATE_NEWS_ARTICLE } from '@/db/queries-qraphql'

const EditNewsArticlePage = ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = use(params)
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

  if (loading) return <div>Loading...</div>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section>
      {data?.newsArticle && (
        <NewsArticleForm onSubmit={handleSubmit} {...data.newsArticle} />
      )}
    </section>
  )
}

export default EditNewsArticlePage
