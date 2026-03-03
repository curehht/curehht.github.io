'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'
import { createRole, updateRole, initRole } from '@/db/api/roles'
import type { RolesListData } from '@/controllers/roles'
import type { Permission } from '@/db/types'
import classes from './RolesList.module.css'

const RolesList: React.FC<{ roles: RolesListData }> = ({ roles }) => {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const handleRoleUpdate = async (role: RolesListData[number] & { id?: string }) => {
    setError(null)
    if (role.id) {
      const updatingRole = { ...role }
      delete updatingRole.id
      const result = await updateRole(role.id, cleanVariables(updatingRole))
      if (!result.success) setError(result.error ?? 'Failed')
      else router.refresh()
    } else {
      const result = await createRole(cleanVariables(role))
      if (!result.success) setError(result.error ?? 'Failed')
      else router.refresh()
    }
  }

  const handleInitRole = async () => {
    setError(null)
    const result = await initRole()
    if (!result.success) setError(result.error ?? 'Failed')
    else router.refresh()
  }

  return (
    <div className={classes.component}>
      {error && <p>Error: {error}</p>}
      {!roles.length && !error && (
        <div className={classes.noRoles}>
          <p>No roles found</p>
          <Button onClick={() => handleInitRole()}>
            Create default admin role
          </Button>
        </div>
      )}
      {roles.map((role) => (
        <div key={role.id}>
          <h3>{role.name}</h3>
          <RoleForm onSubmit={handleRoleUpdate} {...role} />
        </div>
      ))}
      <h2>Add new role</h2>
      <RoleForm onSubmit={handleRoleUpdate} />
    </div>
  )
}

export default RolesList
