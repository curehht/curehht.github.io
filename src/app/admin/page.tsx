import React from 'react'
import Link from 'next/link'
import { UsersList } from '@/components'

async function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Админка</h1>
      <div className="space-y-4">
        <div>
          <Link
            href="/admin/pages"
            className="text-blue-600 hover:text-blue-800"
          >
            Страницы
          </Link>
        </div>
        <div>
          <Link
            href="/admin/news"
            className="text-blue-600 hover:text-blue-800"
          >
            Новости
          </Link>
        </div>
        <div>
          <Link
            href="/admin/roles"
            className="text-blue-600 hover:text-blue-800"
          >
            Роли
          </Link>
        </div>
        <div>
          <UsersList />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
