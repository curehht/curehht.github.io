import { readDocuments } from '@/db/api/documents'
import Link from 'next/link'

const NewsPage = async () => {
  const documents = await readDocuments()

  return (
    <div>
      <h1>Новости</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <Link href={`/news/${document.id}`}>{document.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewsPage
