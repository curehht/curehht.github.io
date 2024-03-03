import { Metadata } from 'next'

import {
  Menu,
  Footer,
} from '../components'

import '@/styles/index.css'
import Head from 'next/head'

export const metadata: Metadata = {
  authors: [{ name: 'Alex Baumgertner' }],
  title: 'HHT (Рандю-Ослева-Вебера) болезнь',
  description: 'HHT (Рандю-Ослева-Вебера) болезнь',
  keywords: 'Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера), синдром Ослера, семейная наследственная телеангиэктазия наследственная геморрагическая телеангиэктазия, геморрагический ангиоматоз',
}

export default function RootLayout ({ children }) {
  return (
    <html lang="ru">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet" />
    </Head>
    <body>
    <div className="columns">
      <div className="columns__col columns__col_left">
        <Menu />
      </div>
      <div className="columns__col columns__col_right">
        <main>{children}</main>
      </div>
    </div>

    <Footer />
    </body>
    </html>
  )
}
