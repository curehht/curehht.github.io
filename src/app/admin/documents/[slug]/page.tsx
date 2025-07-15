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
    <article style={{ flexGrow: 1 }}>
      <DocumentForm document={document} />
    </article>
  )
}

export default DocumentPage
