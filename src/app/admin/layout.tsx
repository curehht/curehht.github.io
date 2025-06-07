import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { AuthPanel } from '@/components'
import Link from 'next/link'
import { ApolloWrapper } from '@/components/Apollo'

// Metadata is not supported in client components. Please define it in a server component.

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <SessionProvider>
      <ApolloWrapper>
        <AuthPanel />
        <ul>
          <li>
            <Link href="/admin">Главная</Link>
          </li>
          <li>
            <Link href="/admin/pages">Страницы</Link>
          </li>
          <li>
            <Link href="/admin/news">Новости</Link>
          </li>
          <li>
            <Link href="/admin/roles">Роли</Link>
          </li>
          <li>
            <Link href="/admin/users">Пользователи</Link>
          </li>
        </ul>
        {children}
      </ApolloWrapper>
    </SessionProvider>
  )
}
