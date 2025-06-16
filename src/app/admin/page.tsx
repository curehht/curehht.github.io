import React from 'react'
import { UsersList } from '@/components'

async function AdminPage() {
  return (
    <article>
      <h1>Админка</h1>
      <UsersList />
    </article>
  )
}

export default AdminPage
