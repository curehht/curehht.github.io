import { readDocumentWithBlocks } from '@/db/api/documents'

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const document = await readDocumentWithBlocks(slug)

  return (
    <div>
      DocumentPage {slug} <pre>{JSON.stringify(document, null, 2)}</pre>
    </div>
  )
}

export default DocumentPage
