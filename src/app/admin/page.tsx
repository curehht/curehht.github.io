'use client'

import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Link from 'next/link'
import { gql, useQuery, useMutation } from '@apollo/client'

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      permissions {
        resource
        actions
      }
    }
  }
`

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      role_id
    }
  }
`

const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: String!, $roleId: String!) {
    updateUserRole(userId: $userId, roleId: $roleId) {
      id
      name
      email
      role_id
    }
  }
`

const AdminPage: React.FC = () => {
  const { data: rolesData } = useQuery(GET_ROLES)
  const { data: usersData } = useQuery(GET_USERS)

  const [updateUserRole] = useMutation(UPDATE_USER_ROLE, {
    refetchQueries: [{ query: GET_USERS }, { query: GET_ROLES }],
  })

  const handleUserRoleChange = (userId: string, roleId: string) => {
    updateUserRole({ variables: { userId, roleId } })
  }

  return (
    <Container>
      <h1>Админка</h1>
      <Row>
        <Col>
          <Link href="/admin/pages">Страницы</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/admin/news">Новости</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/admin/roles">Роли</Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul>
            {usersData?.users?.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                <ol>
                  {rolesData?.roles?.map((role) => (
                    <li key={role.id}>
                      <label>
                        <input
                          type="radio"
                          name={`user-${user.id}-role`}
                          value={role.id}
                          checked={user.role_id === role.id}
                          onChange={() =>
                            handleUserRoleChange(user.id, role.id)
                          }
                        />{' '}
                        {role.name}
                      </label>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminPage
