'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { gql, useQuery } from '@apollo/client'

const GET_NEWS_ARTICLE = gql`
  query GetNewsArticle($id: Int!) {
    newsArticle(id: $id) {
      id
      title
      summary
      origin_url
      created_at
      updated_at
    }
  }
`

type NewsArticlePageProps = {
  params: Promise<{
    id: string
  }>
}

const NewsArticlePage = async ({ params }: NewsArticlePageProps) => {
  const { id } = await params
  return <NewsArticlePageContent id={id} />
}

const NewsArticlePageContent = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(GET_NEWS_ARTICLE, {
    variables: { id: parseInt(id, 10) },
  })

  if (loading) return <Spinner animation="border" />
  if (error) return <p>Error: {error.message}</p>

  const { title, summary, origin_url, created_at, updated_at } =
    data?.newsArticle

  return (
    <Container as="article">
      <header>
        <h1>{title}</h1>
        <p>
          <time dateTime={new Date(created_at).toLocaleString()}>
            added {new Intl.DateTimeFormat().format(new Date(created_at))}
          </time>
        </p>
        <p>
          <time dateTime={new Date(updated_at).toLocaleString()}>
            updated {new Intl.DateTimeFormat().format(new Date(updated_at))}
          </time>
        </p>
      </header>

      <section>
        <Row>
          <Col>
            <div>{summary && <p>{summary}</p>}</div>
            {origin_url && (
              <p>
                Source: <a href={origin_url}>{origin_url}</a>
              </p>
            )}
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default NewsArticlePage
