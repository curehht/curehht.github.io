import { useEffect } from 'react'
import Head from 'next/head'

export default function Layout({ children }) {
  useEffect(() => {
    const script = document.createElement('script')

    script.text = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(72721354, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
    `

    document.body.appendChild(script)
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="yandex-verification" content="108af3153e0f952a" />
        <meta name="author" content="Alex Baumgertner" />
        <meta
          name="description"
          lang="en"
          content="HHT Russian user group"
        />
        <meta
          name="description"
          lang="ru"
          content="HHT (Рандю-Ослева-Вебера) болезнь"
        />
        <meta name="keywords"
          content="Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера), синдром Ослера, семейная наследственная телеангиэктазия наследственная геморрагическая телеангиэктазия, геморрагический ангиоматоз " />
        <title>Болезнь Рандю-Ослера-Вебера (HHT)</title>
      </Head>

      <div className="columns">
        <div className="columns__col columns__col_left">
          <main>{children}</main>
        </div>
        <div className="columns__col columns__col_right">
        </div>
      </div>

      <noscript>
        <div><img src="//mc.yandex.ru/watch/72721354" style={{ 'position': 'absolute', 'left': '-9999px' }} alt="" />
        </div>
      </noscript>
    </>
  )
}
