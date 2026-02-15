import {
  getRoles as dbGetRoles,
  createRoleDb as dbCreateRole,
  updateRoleDb as dbUpdateRole,
  deleteRoleDb as dbDeleteRole,
  initRoleDb as dbInitRole,
  type RoleInput,
} from '@/db/api/roles'
import type { UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'

export type RoleRow = Awaited<ReturnType<typeof dbGetRoles>>[number]
export type RolesListData = RoleRow[]

export async function getRoles(userData: UserData | null): Promise<RolesListData> {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.newsArticle,
    action: PermissionAction.read,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbGetRoles()
}

export async function createRole(
  role: RoleInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.roles,
    action: PermissionAction.create,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbCreateRole(role, userData)
}

export async function updateRole(
  id: string,
  role: RoleInput,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.roles,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdateRole(id, role, userData)
}

export async function deleteRole(id: string, userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.roles,
    action: PermissionAction.delete,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbDeleteRole(id, userData)
}

export async function initRole(userData: UserData | null) {
  if (!userData) throw new Error('Unauthorized')
  return dbInitRole(userData)
}
