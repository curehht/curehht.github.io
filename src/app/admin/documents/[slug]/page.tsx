import { readDocumentWithBlocks } from '@/db/api/documents'
import { DocumentForm } from '@/components'

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const document = await readDocumentWithBlocks(slug)

  return (
    <div>
      <DocumentForm document={document} />
    </div>
  )
}

export default DocumentPage
