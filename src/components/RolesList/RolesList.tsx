'use client'

import React from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { RoleForm } from '@/components'
import { cleanVariables } from '@/utils/cleanVariables'
import { GET_ROLES, UPDATE_ROLE } from '@/db/queries-qraphql'

const RolesList: React.FC = () => {
  const [updateRole] = useMutation(UPDATE_ROLE)

  const { data: rolesData } = useQuery(GET_ROLES)

  const handleRoleUpdate = async (role) => {
    const updatingRole = { ...role }
    delete updatingRole.id

    await updateRole({
      variables: { id: role.id, role: cleanVariables(updatingRole) },
    })
  }

  return (
    <div>
      {rolesData?.roles?.map((role) => (
        <div key={role.id}>
          <h3>{role.name}</h3>
          <RoleForm onSubmit={handleRoleUpdate} {...role} />
        </div>
      ))}
    </div>
  )
}

export default RolesList
