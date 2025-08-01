import { readDocuments } from '@/db/api/documents'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'О болезни Рандю-Ослера: новости, статьи, исследования',
  description: 'Общая информация о болезни Рандю-Ослера',
  keywords:
    'Болезнь Рандю-Ослера, синонимы, наследственность, аутосомно-доминантный тип наследования',
}

export default async function IndexPage() {
  const documents = await readDocuments()

  return (
    <div className="IndexPage">
      <article>
        <main>
          <section aria-label="Синонимы">
            <h2>Новости</h2>
            <ul>
              {documents.map((document) => (
                <li key={document.id}>
                  <Link href={`/news/${document.slug}`}>{document.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </article>
    </div>
  )
}
