import { DocumentForm } from '@/components'

const NewDocumentPage = () => {
  const initialDocument = {
    title: '',
    description: '',
    is_published: false,
    blocks: [],
  }
  return (
    <article style={{ flexGrow: 1 }}>
      <h1>New document</h1>
      <DocumentForm document={initialDocument} />
    </article>
  )
}

export default NewDocumentPage
