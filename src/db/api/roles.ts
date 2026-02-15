'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { roles, users } from '@/db/schema'
import type { Permission, UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'

export type RoleInput = {
  name?: string
  permissions?: Permission[]
}

export const readUserPermissions = async (
  userId: string | undefined
): Promise<Permission[]> => {
  if (!userId) return []
  const [user] = await db.select().from(users).where(eq(users.id, userId))
  if (!user) return []
  const [role] = await db.select().from(roles).where(eq(roles.id, user.role_id))
  return role?.permissions ?? []
}

export const getRoles = async () => {
  const result = await db.select().from(roles)
  return result
}

export const createRoleDb = async (role: RoleInput, userData: UserData) => {
  const result = await db
    .insert(roles)
    .values({ ...role, owner_id: userData.id })
    .returning()
  const created = Array.isArray(result) ? result[0] : undefined
  return created
}

export const updateRoleDb = async (
  id: string,
  role: RoleInput,
  _userData: UserData
) => {
  const result = await db
    .update(roles)
    .set(role)
    .where(eq(roles.id, id))
    .returning()
  return Array.isArray(result) ? result[0] : undefined
}

export const deleteRoleDb = async (id: string, _userData: UserData) => {
  const result = await db
    .delete(roles)
    .where(eq(roles.id, id))
    .returning()
  return Array.isArray(result) ? result[0] : undefined
}

export const initRoleDb = async (userData: UserData) => {
  const usersList = await db.select().from(users)
  if (usersList.length > 1) {
    throw new Error('Only one user is allowed to init role')
  }
  const result = await db
    .insert(roles)
    .values({
      name: 'Roles Admin',
      owner_id: userData.id,
      permissions: [
        {
          resource: Resources.roles,
          actions: [
            PermissionAction.create,
            PermissionAction.read,
            PermissionAction.update,
            PermissionAction.delete,
          ],
        },
      ],
    })
    .returning()
  return Array.isArray(result) ? result[0] : undefined
}

export async function createRole(role: RoleInput) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.roles,
      action: PermissionAction.create,
    })
    if (!canDo) throw new Error('Unauthorized')
    await createRoleDb(role, userData)
    revalidatePath('/admin')
    revalidatePath('/admin/roles')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create role',
    }
  }
}

export async function updateRole(id: string, role: RoleInput) {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    const canDo = isAuthorized({
      userData,
      resourceName: Resources.roles,
      action: PermissionAction.update,
    })
    if (!canDo) throw new Error('Unauthorized')
    await updateRoleDb(id, role, userData)
    revalidatePath('/admin')
    revalidatePath('/admin/roles')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update role',
    }
  }
}

export async function initRole() {
  try {
    const session = await auth()
    const userData = await getUserDataFromSession(session)
    if (!userData) throw new Error('Unauthorized')
    await initRoleDb(userData)
    revalidatePath('/admin')
    revalidatePath('/admin/roles')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to init role',
    }
  }
}
