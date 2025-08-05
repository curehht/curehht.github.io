import { drizzle } from 'drizzle-orm/vercel-postgres'
import { roles, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { Permission } from '../types'

const db = drizzle()

export const readUserPermissions = async (
  userId: string
): Promise<Permission[]> => {
  const [user] = await db.select().from(users).where(eq(users.id, userId))
  if (!user) {
    return []
  }

  const [role] = await db.select().from(roles).where(eq(roles.id, user.role_id))
  return role?.permissions ?? []
}
