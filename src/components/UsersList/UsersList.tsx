'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Radiobox } from '../Radiobox'
import { updateUserRole } from '@/db/api/users'
import type { UsersListData } from '@/controllers/users'
import type { RolesListData } from '@/controllers/roles'
import classes from './UsersList.module.css'

export const UsersList = ({
  users,
  roles,
}: {
  users: UsersListData
  roles: RolesListData
}) => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleUserRoleChange = async (userId: string, roleId: string) => {
    setLoading(true)
    const result = await updateUserRole(userId, roleId)
    setLoading(false)
    if (result.success) {
      router.refresh()
    }
  }

  return (
    <div className={classes.component}>
      <h2>Users</h2>
      <ul className={classes.list}>
        {users.map((user) => (
          <li key={user.id} className={classes.item}>
            <p className={classes.email}>{user.email}</p>
            <ol className={classes.roles}>
              {roles.map((role) => (
                <li key={role.id}>
                  <Radiobox
                    name={`user-${user.id}-role`}
                    value={role.id}
                    checked={user.role_id === role.id}
                    onChange={() => handleUserRoleChange(user.id, role.id)}
                    label={role.name}
                    disabled={loading}
                  />
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </div>
  )
}
