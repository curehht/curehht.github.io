'use client'

import React, { useState } from 'react'
import { PermissionAction, Resources, Role } from '@/db/types'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { Button } from '@/components/Button'
import classes from './RoleForm.module.css'

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
    <form onSubmit={handleSubmit} className={classes.component}>
      <fieldset className={classes.formGroup}>
        <Input
          id="role-name"
          name="name"
          value={role.name || ''}
          onChange={handleNameChange}
          label="Role name"
        />
      </fieldset>
      <fieldset className={classes.formGroup}>
        <div className={classes.permissionsTable}>
          {Object.values(Resources).map((resource) => (
            <div key={resource} className={classes.resourceRow}>
              <span className={classes.resourceName}>{resource}</span>
              {Object.values(PermissionAction).map((action) => (
                <span key={action} className={classes.actionCell}>
                  <Checkbox
                    id={`${id}_${resource}-${action}`}
                    name={resource}
                    value={action}
                    onChange={handleRoleChange}
                    checked={
                      role.permissions
                        ?.find((p) => p.resource === resource)
                        ?.actions?.includes(action) ?? false
                    }
                    label={action}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </fieldset>
    </form>
  )
}

export { RoleForm }
