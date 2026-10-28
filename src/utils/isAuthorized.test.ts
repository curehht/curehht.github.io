import { describe, expect, it } from 'vitest'

import { PermissionAction, Resources, type UserData } from '@/db/types'

import { isAuthorized } from './isAuthorized'

const makeUser = (
  permissions: { resource: Resources; actions: PermissionAction[] }[]
) =>
  ({
    id: 'user-1',
    role: { permissions },
  }) as unknown as UserData

describe('isAuthorized', () => {
  it('denies when there is no user', () => {
    expect(
      isAuthorized({
        resourceName: Resources.page,
        action: PermissionAction.read,
      })
    ).toBe(false)
  })

  it('allows an action granted by the role', () => {
    const userData = makeUser([
      { resource: Resources.page, actions: [PermissionAction.update] },
    ])
    expect(
      isAuthorized({
        userData,
        resourceName: Resources.page,
        action: PermissionAction.update,
      })
    ).toBe(true)
  })

  it('denies an action not granted or granted on another resource', () => {
    const userData = makeUser([
      { resource: Resources.page, actions: [PermissionAction.read] },
    ])
    expect(
      isAuthorized({
        userData,
        resourceName: Resources.page,
        action: PermissionAction.delete,
      })
    ).toBe(false)
    expect(
      isAuthorized({
        userData,
        resourceName: Resources.document,
        action: PermissionAction.read,
      })
    ).toBe(false)
  })

  it('allows the resource author regardless of role', () => {
    expect(
      isAuthorized({
        userData: makeUser([]),
        resourceName: Resources.document,
        resourceAuthorId: 'user-1',
        action: PermissionAction.delete,
      })
    ).toBe(true)
  })
})
