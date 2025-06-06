import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { getClient } from '@/components/Apollo/ApolloClient'

import { RoleForm, RolesList } from '@/components'

const AdminRolePage: React.FC = async () => {
  const client = getClient()

  return (
    <Container>
      <Row>
        <Col>
          <section>
            <h3>Добавить роль</h3>
            <RoleForm />
          </section>
        </Col>
      </Row>
      <Row>
        <Col>
          <section>
            <h3>Редактировать роли</h3>
            <RolesList />
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminRolePage
