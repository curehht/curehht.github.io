'use client'

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { PermissionAction, Resources, Role } from '@/db/types'

type RoleFormProps = {
  onSubmit?: (role: {
    id?: string
    name: string
    permissions: { resource: Resources; actions: PermissionAction[] }[]
  }) => void
  id?: string
  name?: string
  permissions?: { resource: Resources; actions: PermissionAction[] }[]
}

type RoleFormState = Pick<Role, 'name' | 'permissions'>

const createStubPermissions = () =>
  Object.values(Resources).map((resource) => ({ resource, actions: [] }))

const RoleForm: React.FC<RoleFormProps> = ({
  onSubmit,
  id,
  name,
  permissions,
}) => {
  const [role, setRole] = useState<RoleFormState>({
    name: name || '',
    permissions: permissions || createStubPermissions(),
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRole((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSubmit) {
      onSubmit({ ...role, id })
    } else {
      console.log(role)
    }
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target as {
      name: Resources
      value: PermissionAction
      checked: boolean
    }
    setRole((prev) => {
      const isNewResource = !prev.permissions.find(
        (permission) => permission.resource === name
      )

      let updatedRoleState: RoleFormState

      if (isNewResource) {
        updatedRoleState = {
          ...prev,
          permissions: [
            ...prev.permissions,
            { resource: name, actions: [value] },
          ],
        }
      } else {
        updatedRoleState = {
          ...prev,
          permissions: prev.permissions.map((permission) => {
            return permission.resource === name
              ? {
                  ...permission,
                  actions: checked
                    ? [...permission.actions, value]
                    : permission.actions.filter((action) => action !== value),
                }
              : permission
          }),
        }
      }
      return updatedRoleState
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Role name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={role.name}
          onChange={handleNameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Resource name</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(Resources).map((resource) => (
              <tr key={resource}>
                <td>{resource}</td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={resource}
                    id={`${id}_${resource}-create`}
                    name={resource}
                    value={PermissionAction.create}
                    onChange={handleRoleChange}
                    checked={role.permissions
                      ?.find((p) => p.resource === resource)
                      ?.actions?.includes(PermissionAction.create)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={resource}
                    id={`${id}_${resource}-read`}
                    name={resource}
                    value={PermissionAction.read}
                    onChange={handleRoleChange}
                    checked={role.permissions
                      ?.find((p) => p.resource === resource)
                      ?.actions?.includes(PermissionAction.read)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={resource}
                    id={`${id}_${resource}-update`}
                    name={resource}
                    value={PermissionAction.update}
                    onChange={handleRoleChange}
                    checked={role.permissions
                      ?.find((p) => p.resource === resource)
                      ?.actions?.includes(PermissionAction.update)}
                  />
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    label={resource}
                    id={`${id}_${resource}-delete`}
                    name={resource}
                    value={PermissionAction.delete}
                    onChange={handleRoleChange}
                    checked={role.permissions
                      ?.find((p) => p.resource === resource)
                      ?.actions?.includes(PermissionAction.delete)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button type="submit">Submit</Button>
      </Form.Group>
    </Form>
  )
}

export { RoleForm }
