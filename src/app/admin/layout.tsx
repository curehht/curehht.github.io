'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { ApolloWrapper } from '@/components/Apollo'
import { AuthPanel } from '@/components'
import { Container, Row, Col } from 'react-bootstrap'

// Metadata is not supported in client components. Please define it in a server component.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()
  const router = useRouter()

  if (status !== 'loading' && status !== 'authenticated') {
    router.push('/api/auth/signin')
    return null
  }

  return (
    <SessionProvider>
      <Container>
        <Row>
          <Col align="right">
            <AuthPanel />
          </Col>
        </Row>
      </Container>
      <ApolloWrapper>{children}</ApolloWrapper>
    </SessionProvider>
  )
}
