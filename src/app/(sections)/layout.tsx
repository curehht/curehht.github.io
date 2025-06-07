import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import Link from 'next/link'

import { ApolloWrapper } from '@/components/Apollo'
import { GET_PAGES_SLUG } from '@/db/queries-qraphql'
import { getClient } from '@/components/Apollo/ApolloClient'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getClient().query({ query: GET_PAGES_SLUG })

  return (
    <section>
      <nav>
        <Link href="/">Главная</Link>

        <Link href="/diagnostics">Диагностика</Link>

        <Link href="/treatment">Лечение</Link>

        <Link href="/life-style">Образ жизни</Link>

        <Link href="/news">Новости</Link>

        {data?.pages.map((page: { slug: string; slug_name: string }) => (
          <Link key={page.slug} href={`/${page.slug}`}>
            {page.slug_name}
          </Link>
        ))}
      </nav>
      <ApolloWrapper>
        {children}
        <SpeedInsights />
        <Analytics />
      </ApolloWrapper>
    </section>
  )
}
