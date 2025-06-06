'use client'

import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
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
    <Accordion>
      {rolesData?.roles?.map((role) => (
        <Accordion.Item eventKey={role.id} key={role.id}>
          <Accordion.Header>{role.name}</Accordion.Header>
          <Accordion.Body>
            <RoleForm onSubmit={handleRoleUpdate} {...role} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default RolesList
