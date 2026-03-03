import React from 'react'
import RolesList from '@/components/RolesList/RolesList'
import * as rolesController from '@/controllers/roles'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'
import { auth } from '@/auth'

export default async function RolesPage() {
  const session = await auth()
  const userData = await getUserDataFromSession(session)
  const roles = await rolesController.getRoles(userData)

  return (
    <article>
      <h1>Roles</h1>
      <RolesList roles={roles} />
    </article>
  )
}
