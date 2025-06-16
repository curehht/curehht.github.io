'use client'

import React, { useState } from 'react'
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
    <form onSubmit={handleSubmit} className="role-form">
      <div className="form-group">
        <label htmlFor="role-name">Role name</label>
        <input
          type="text"
          id="role-name"
          name="name"
          value={role.name}
          onChange={handleNameChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <table className="permissions-table">
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
                {Object.values(PermissionAction).map((action) => (
                  <td key={action}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        id={`${id}_${resource}-${action}`}
                        name={resource}
                        value={action}
                        onChange={handleRoleChange}
                        checked={
                          role.permissions
                            ?.find((p) => p.resource === resource)
                            ?.actions?.includes(action) ?? false
                        }
                      />
                      <span className="checkbox-text">{resource}</span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  )
}

export { RoleForm }
