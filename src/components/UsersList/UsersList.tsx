'use client'

import React from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'

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

export const UsersList = () => {
  const [updateUserRole] = useMutation(UPDATE_USER_ROLE)
  const { data: usersData } = useQuery(GET_USERS)
  const { data: rolesData } = useQuery(GET_ROLES)

  const handleUserRoleChange = async (userId: string, roleId: string) => {
    await updateUserRole({
      mutation: UPDATE_USER_ROLE,
      variables: { userId, roleId },
      refetchQueries: [{ query: GET_USERS }, { query: GET_ROLES }],
    })
  }

  return (
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
                    onChange={() => handleUserRoleChange(user.id, role.id)}
                  />{' '}
                  {role.name}
                </label>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ul>
  )
}
