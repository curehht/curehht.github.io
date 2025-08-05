import Link from 'next/link'

import { readDocuments } from '@/db/api/documents'
import { DocumentDelete } from '@/components'
import classes from './page.module.css'

async function DocumentsPage() {
  const documents = await readDocuments({ type: 'newsItem' })

  return (
    <article className={classes.container}>
      <h1>Documents</h1>
      <Link className={classes.newDocument} href="/admin/documents/new">
        New document
      </Link>
      <ul className={classes.list}>
        {documents.map((document) => (
          <li key={document.id} className={classes.item}>
            <Link
              href={`/admin/documents/${document.id}`}
              className={classes.link}
            >
              {document.title}
            </Link>
            <DocumentDelete
              documentId={document.id}
              className={classes.delete}
            />
          </li>
        ))}
      </ul>
    </article>
  )
}

export default DocumentsPage
