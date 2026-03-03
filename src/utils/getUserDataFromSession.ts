import { eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { users, roles } from '@/db/schema'
import type { UserData } from '@/db/types'
import { Resources, PermissionAction } from '@/db/types'
import type { Session } from 'next-auth'

const ADMIN_ROLE_NAME = 'Roles Admin'
const ADMIN_ROLES = [
  { resource: Resources.roles, actions: [PermissionAction.create, PermissionAction.read, PermissionAction.update, PermissionAction.delete] },
  { resource: Resources.users, actions: [PermissionAction.create, PermissionAction.read, PermissionAction.update, PermissionAction.delete] },
  { resource: Resources.page, actions: [PermissionAction.create, PermissionAction.read, PermissionAction.update, PermissionAction.delete] },
  { resource: Resources.document, actions: [PermissionAction.create, PermissionAction.read, PermissionAction.update, PermissionAction.delete] },
  { resource: Resources.newsArticle, actions: [PermissionAction.create, PermissionAction.read, PermissionAction.update, PermissionAction.delete] },
]

/** Creates an admin role with full permissions and returns it. */
async function ensureAdminRoleExists(ownerId: string) {
  const existing = await db.select().from(roles)
  const adminRole = existing.find((r) => r.name === ADMIN_ROLE_NAME)
  if (adminRole) return adminRole

  const result = await db
    .insert(roles)
    .values({
      name: ADMIN_ROLE_NAME,
      owner_id: ownerId,
      permissions: ADMIN_ROLES,
    })
    .returning()
  const created = Array.isArray(result) ? result[0] : undefined
  return created ?? null
}

/**
 * Loads full user data (with role and permissions) from a NextAuth session.
 * If the user has no role (e.g. after DB init), creates an admin role and assigns it.
 * Use in server components and server actions.
 */
export async function getUserDataFromSession(
  session: Session | null
): Promise<UserData | null> {
  if (!session?.user?.id) return null

  const [row] = await db
    .select({
      user: users,
      role: roles,
    })
    .from(users)
    .leftJoin(roles, eq(roles.id, users.role_id))
    .where(eq(users.id, session.user.id))
    .limit(1)

  if (!row?.user) return null

  let role = row.role

  if (!role) {
    const adminRole = await ensureAdminRoleExists(session.user.id)
    if (adminRole) {
      await db
        .update(users)
        .set({ role_id: adminRole.id })
        .where(eq(users.id, session.user.id))
      role = adminRole
    }
  }

  if (!role) return null

  return {
    ...row.user,
    role,
    sessionExpires: session.expires ? new Date(session.expires) : new Date(0),
  }
}
