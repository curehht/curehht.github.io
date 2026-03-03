import { getUsers as dbGetUsers, updateUserRoleDb as dbUpdateUserRole } from '@/db/api/users'
import type { UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'

export type UserRow = Awaited<ReturnType<typeof dbGetUsers>>[number]
export type UsersListData = UserRow[]

export async function getUsers(userData: UserData | null): Promise<UsersListData> {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.users,
    action: PermissionAction.read,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbGetUsers()
}

export async function updateUserRole(
  userId: string,
  roleId: string,
  userData: UserData | null
) {
  if (!userData) throw new Error('Unauthorized')
  const canDo = isAuthorized({
    userData,
    resourceName: Resources.roles,
    action: PermissionAction.update,
  })
  if (!canDo) throw new Error('Unauthorized')
  return dbUpdateUserRole(userId, roleId)
}
