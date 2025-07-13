type DocumentWithBlocks = {
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

type BlockData = {
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

const Document = ({ document }: { document: DocumentWithBlocks }) => {
  return (
    <div>
      <h1>{document.title}</h1>
      <p>{document.description}</p>
      <ul>
        {document.blocks.map((block) => (
          <li key={block.position}>
            <h2>{block.title}</h2>
            <p>{block.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Document
