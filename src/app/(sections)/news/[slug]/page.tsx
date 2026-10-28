import { readDocumentBySlug, readDocumentsSlugs } from '@/db/api/documents'
import { Document } from '@/components'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const document = await readDocumentBySlug(slug, { publishedOnly: true })
  if (!document) return { title: 'Not found' }
  return {
    title: document.title,
    description: document.description,
  }
}

export async function generateStaticParams() {
  const documentsSlugs = await readDocumentsSlugs()
  return documentsSlugs
}

const NewsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const document = await readDocumentBySlug(slug, { publishedOnly: true })

  if (!document) notFound()

  return (
    <article className="NewsPage" style={{ flexGrow: 1 }}>
      <Document document={document} />
    </article>
  )
}

export default NewsPage
