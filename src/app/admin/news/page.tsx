'use client'

import React from 'react'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/client'

import { NewsArticleForm } from '@/components'
import { GET_NEWS_ARTICLES, CREATE_NEWS_ARTICLE } from '@/db/queries-qraphql'

const AdminNewsPage: React.FC = () => {
  const { data } = useQuery(GET_NEWS_ARTICLES)
  const [createNewsArticle] = useMutation(CREATE_NEWS_ARTICLE, {
    refetchQueries: [{ query: GET_NEWS_ARTICLES }],
  })

  const handleSubmitCreate = (article) => {
    createNewsArticle({ variables: { article } })
  }

  return (
    <div className="AdminNewsPage">
      <section>
        <h3>Добавить</h3>
        <NewsArticleForm onSubmit={handleSubmitCreate} />
      </section>

      <section>
        <h3>Редактировать</h3>
        <ul>
          {data?.newsArticles?.map((article) => (
            <li key={article.id}>
              <Link href={`/admin/news/${article.id}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default AdminNewsPage
