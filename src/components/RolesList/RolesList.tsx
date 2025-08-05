'use client'

import React from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { Button, RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'
import {
  GET_ROLES,
  CREATE_ROLE,
  UPDATE_ROLE,
  INIT_ROLE,
} from '@/db/queries-qraphql'
import classes from './RolesList.module.css'

const RolesList: React.FC = () => {
  const [updateRole] = useMutation(UPDATE_ROLE)
  const [createRole] = useMutation(CREATE_ROLE)
  const [initRole] = useMutation(INIT_ROLE, {
    refetchQueries: [GET_ROLES],
  })

  const { data: rolesData, loading, error } = useQuery(GET_ROLES)

  const handleRoleUpdate = async (role) => {
    if (role.id) {
      const updatingRole = { ...role }
      delete updatingRole.id

      await updateRole({
        variables: { id: role.id, role: cleanVariables(updatingRole) },
      })
    } else {
      await createRole({
        variables: { role },
      })
    }
  }

  const handleInitRole = async () => {
    await initRole()
  }

  return (
    <div className={classes.component}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !rolesData?.roles?.length && !error && (
        <div className={classes.noRoles}>
          <p>No roles found</p>
          <Button onClick={() => handleInitRole()}>
            Create default admin role
          </Button>
        </div>
      )}
      {rolesData?.roles?.map((role) => (
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
