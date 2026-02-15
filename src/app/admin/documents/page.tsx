import Link from 'next/link'

import { DocumentDelete } from '@/components'
import { getDocuments } from '@/controllers/documents'
import { readUserPermissions } from '@/db/api/roles'
import { PermissionAction, Resources } from '@/db/types'
import classes from './page.module.css'
import { auth } from '@/auth'

async function DocumentsPage() {
  const session = await auth()
  const userPermissions = await readUserPermissions(session?.user?.id)

  const userPermissionsForDocument = userPermissions.find(
    (permission) => permission.resource === Resources.document
  )

  if (!userPermissionsForDocument) {
    return <div>You are not authorized to work with documents</div>
  }

  const documents = await getDocuments('newsItem')

  return (
    <article className={classes.container}>
      <h1>Documents</h1>
      {userPermissionsForDocument.actions.includes(PermissionAction.create) && (
        <Link className={classes.newDocument} href="/admin/documents/new">
          New document
        </Link>
      )}
      <ul className={classes.list}>
        {documents.map((document) => (
          <li key={document.id} className={classes.item}>
            <Link
              href={`/admin/documents/${document.id}`}
              className={classes.link}
            >
              {document.title}
            </Link>
            {userPermissionsForDocument.actions.includes(
              PermissionAction.delete
            ) && (
              <DocumentDelete
                documentId={document.id}
                className={classes.delete}
              />
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default DocumentsPage
