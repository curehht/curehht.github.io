import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

import { ApolloWrapper } from '@/components/Apollo'
import { GET_PAGES_SLUG } from '@/db/queries-qraphql'
import { getClient } from '@/components/Apollo/ApolloClient'
import { MainNavigation } from '@/components'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getClient().query({ query: GET_PAGES_SLUG })

  return (
    <>
      <header>
        <MainNavigation pages={data?.pages || []} />
      </header>

      <ApolloWrapper>
        {children}
        <SpeedInsights />
        <Analytics />
      </ApolloWrapper>
    </>
  )
}
