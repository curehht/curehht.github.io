import { DocumentForm } from '@/components'
import { auth } from '@/auth'
import { readUserPermissions } from '@/db/api/roles'
import { PermissionAction, Resources } from '@/db/types'

const NewDocumentPage = async () => {
  const session = await auth()
  const userPermissions = await readUserPermissions(session?.user?.id)

  const userPermissionsForDocument = userPermissions.find(
    (permission) => permission.resource === Resources.document
  )

  if (!userPermissionsForDocument) {
    return <div>You are not authorized to work with documents</div>
  }

  if (!userPermissionsForDocument.actions.includes(PermissionAction.create)) {
    return <div>You are not authorized to create documents</div>
  }

  return (
    <article style={{ flexGrow: 1 }}>
      <h1>New document</h1>
      <DocumentForm />
    </article>
  )
}

export default NewDocumentPage
