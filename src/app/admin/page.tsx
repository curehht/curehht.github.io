import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import { UsersList } from '@/components'

async function AdminPage() {
  return (
    <Container>
      <h1>Админка</h1>

      <Row>
        <Col>
          <UsersList />
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
