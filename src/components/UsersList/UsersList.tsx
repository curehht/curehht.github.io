'use client'

import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, GET_ROLES, UPDATE_USER_ROLE } from '@/db/queries-qraphql'
import classes from './UsersList.module.css'

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
    <div className={classes.component}>
      <h2>Users</h2>
      <ul className={classes.list}>
        {usersData?.users?.map((user) => (
          <li key={user.id} className={classes.item}>
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
    </div>
  )
}
