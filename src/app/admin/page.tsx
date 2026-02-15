import React from 'react'
import { UsersList } from '@/components'
import * as usersController from '@/controllers/users'
import * as rolesController from '@/controllers/roles'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'
import { auth } from '@/auth'

async function AdminPage() {
  const session = await auth()
  const userData = await getUserDataFromSession(session)
  console.log(':>>> userData', userData)
  const [users, roles] = await Promise.all([
    usersController.getUsers(userData),
    rolesController.getRoles(userData),
  ])

  return (
    <article>
      <h1>Админка</h1>
      <UsersList users={users} roles={roles} />
    </article>
  )
}

export default AdminPage
