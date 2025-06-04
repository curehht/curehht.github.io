import { gql } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Container, Row, Col, Breadcrumb, Nav } from 'react-bootstrap'
import Link from 'next/link'

import { ApolloWrapper } from '@/components/Apollo'
import { getClient } from '@/components/Apollo/ApolloClient'
import { Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'

const GET_PAGES_SLUG = gql`
  query GetPagesSlug {
    pages {
      slug
      slug_name
    }
  }
`

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getClient().query({ query: GET_PAGES_SLUG })

  return (
    <html lang="ru">
      <body>
        <Container>
          <Row>
            <Col>
              <Breadcrumb></Breadcrumb>
            </Col>
          </Row>
        </Container>
        <SessionProvider>
          <Container>
            <Row>
              <Col md={2}>
                <Nav className="flex-column">
                  <Link href="/">Главная</Link>

                  <Link href="/diagnostics">Диагностика</Link>

                  <Link href="/treatment">Лечение</Link>

                  <Link href="/life-style">Образ жизни</Link>

                  <Link href="/news">Новости</Link>

                  {data?.pages.map(
                    (page: { slug: string; slug_name: string }) => (
                      <Link key={page.slug} href={`/${page.slug}`}>
                        {page.slug_name}
                      </Link>
                    )
                  )}
                </Nav>
              </Col>
              <Col md={10}>
                <ApolloWrapper>
                  {children}
                  <SpeedInsights />
                  <Analytics />
                </ApolloWrapper>
              </Col>
            </Row>
          </Container>
        </SessionProvider>
        <div className="mt-5">
          <Footer />
        </div>
      </body>
    </html>
  )
}
