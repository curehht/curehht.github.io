import Link from 'next/link'

import { readDocuments } from '@/db/api/documents'
import { DocumentDelete } from '@/components'

async function DocumentsPage() {
  const documents = await readDocuments()

  return (
    <article>
      <h1>Documents</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <Link href={`/admin/documents/${document.id}`}>
              {document.title}
            </Link>
            <DocumentDelete documentId={document.id} />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default DocumentsPage
