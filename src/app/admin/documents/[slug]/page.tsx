import { readDocumentWithBlocks } from '@/db/api/documents'
import { DocumentForm } from '@/components'
import { readUserPermissions } from '@/db/api/roles'
import { auth } from '@/auth'
import { PermissionAction, Resources } from '@/db/types'

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const session = await auth()
  const userPermissions = await readUserPermissions(session?.user?.id)

  const userPermissionsForDocument = userPermissions.find(
    (permission) => permission.resource === Resources.document
  )

  if (!userPermissionsForDocument) {
    return <div>You are not authorized to work with documents</div>
  }

  const { slug } = await params

  if (!userPermissionsForDocument.actions.includes(PermissionAction.update)) {
    return <div>You are not authorized to update this document</div>
  }

  const document = await readDocumentWithBlocks(slug)

  return (
    <article style={{ flexGrow: 1 }}>
      <DocumentForm document={document} />
    </article>
  )
}

export default DocumentPage
