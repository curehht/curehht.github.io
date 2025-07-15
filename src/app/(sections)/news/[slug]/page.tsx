import { readDocumentWithBlocks } from '@/db/api/documents'
import { Document } from '@/components'

const NewsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const document = await readDocumentWithBlocks(slug)

  return (
    <article style={{ flexGrow: 1 }}>
      <Document document={document} />
    </article>
  )
}

export default NewsPage
