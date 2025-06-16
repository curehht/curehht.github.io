import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

import { ApolloWrapper } from '@/components/Apollo'
import { MainNavigation } from '@/components'
import { getPagesSlugs } from '@/db/api/pages'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pagesSlugs = await getPagesSlugs()

  return (
    <div className="Layout">
      <header>
        <MainNavigation pages={pagesSlugs || []} />
      </header>

      <ApolloWrapper>
        {children}
        <SpeedInsights />
        <Analytics />
      </ApolloWrapper>
    </div>
  )
}
