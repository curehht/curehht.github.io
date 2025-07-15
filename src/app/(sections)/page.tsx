import { readDocumentWithBlocks } from '@/db/api/documents'

export const metadata = {
  title: 'О болезни Рандю-Ослера',
  description: 'Общая информация о болезни Рандю-Ослера',
  keywords:
    'Болезнь Рандю-Ослера, синонимы, наследственность, аутосомно-доминантный тип наследования',
}

export default async function IndexPage() {
  const document = await readDocumentWithBlocks(
    'fc03b912-6516-4508-a00e-0e1114731cd4'
  )
  console.log('document :>> ', document)
  return (
    <div className="IndexPage">
      <article>
        <main>
          <section aria-label="Синонимы">
            <h2>Синонимы</h2>
            <ul>
              <li>Болезнь Рандю́ — О́слера (Рандю — Ослера — Ве́бера)</li>
              <li>синдром Ослера</li>
              <li>семейная наследственная телеангиэктазия</li>
              <li>наследственная геморрагическая телеангиэктазия</li>
              <li>геморрагический ангиоматоз</li>
            </ul>
          </section>
        </main>
      </article>
    </div>
  )
}
