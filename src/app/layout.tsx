import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components'

import '@/app/global.css'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
