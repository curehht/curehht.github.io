import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components'

import 'bootstrap/dist/css/bootstrap.min.css'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
        <div className="mt-5">
          <Footer />
        </div>
      </body>
    </html>
  )
}
