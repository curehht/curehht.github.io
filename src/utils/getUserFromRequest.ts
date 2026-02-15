import { NextRequest } from 'next/server'
import { eq } from 'drizzle-orm'

import { db } from '@/db/client'
import { sessions, users, roles } from '@/db/schema'

import { getSessionTokenName } from './getSessionTokenName'

export const getUserDataFromRequest = async (req: NextRequest) => {
  const sessionTokenName = getSessionTokenName()
  const sessionId = req.cookies?.get(sessionTokenName)?.value

  if (!sessionId) return null

  const currentUserWithRoles = await db
    .select({
      user: users,
      sessionExpires: sessions.expires,
      role: roles,
    })
    .from(users)
    .innerJoin(roles, eq(roles.id, users.role_id))
    .innerJoin(sessions, eq(sessions.userId, users.id))
    .where(eq(sessions.sessionToken, sessionId))
    .limit(1)

  if (!currentUserWithRoles.length) return null

  const result = currentUserWithRoles[0]

  return {
    ...result.user,
    role: result.role,
    sessionExpires: result.sessionExpires,
  }
}
