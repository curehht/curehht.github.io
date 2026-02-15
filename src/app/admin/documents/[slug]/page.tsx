import { DocumentForm } from '@/components'
import { getDocumentById } from '@/controllers/documents'
import { readUserPermissions } from '@/db/api/roles'
import { PermissionAction, Resources } from '@/db/types'
import { auth } from '@/auth'
import { getUserDataFromSession } from '@/utils/getUserDataFromSession'

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const session = await auth()
  const userData = await getUserDataFromSession(session)
  const userPermissions = await readUserPermissions(session?.user?.id)

  const userPermissionsForDocument = userPermissions.find(
    (permission) => permission.resource === Resources.document
  )

  if (!userPermissionsForDocument) {
    return <div>You are not authorized to work with documents</div>
  }

  const { slug: id } = await params

  if (!userPermissionsForDocument.actions.includes(PermissionAction.update)) {
    return <div>You are not authorized to update this document</div>
  }

  const document = await getDocumentById(id, userData)

  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <article style={{ flexGrow: 1 }}>
      <DocumentForm document={document} />
    </article>
  )
}

export default DocumentPage
