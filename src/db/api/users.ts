'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { users } from '@/db/schema'
import { Resources, PermissionAction } from '@/db/types'
import { isAuthorized } from '@/utils/isAuthorized'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'

export const getUsers = async () => {
  const result = await db.select().from(users)
  return result
}

export const updateUserRoleDb = async (userId: string, roleId: string) => {
  const [updated] = await db
    .update(users)
    .set({ role_id: roleId })
    .where(eq(users.id, userId))
    .returning()
  return updated
}

export async function updateUserRole(userId: string, roleId: string) {
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
    await updateUserRoleDb(userId, roleId)
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update user role',
    }
  }
}
