import { useState } from 'react'
import { DocumentBlockForm } from './DocumentBlockForm'

type BlockData = {
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

type DocumentWithBlocks = {
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

const DocumentForm = ({ document }: { document: DocumentWithBlocks }) => {
  const [blocksData, setBlocksData] = useState<BlockData[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('blocksData :>> ', blocksData)
  }

  const handleBlockChange = (blockData: BlockData) => {
    setBlocksData((prevBlocks) => {
      const blockExists = prevBlocks.find(
        (block) => block.position === blockData.position
      )
      if (blockExists) {
        return prevBlocks.map((block) =>
          block.position === blockData.position
            ? { ...block, ...blockData }
            : block
        )
      } else {
        return [...prevBlocks, blockData]
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={document.title} />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" value={document.description} />
        </fieldset>
        <fieldset>
          <label htmlFor="is_published">Is published</label>
          <input
            type="checkbox"
            name="is_published"
            checked={document.is_published}
          />
        </fieldset>
        <button type="submit">save</button>
      </form>
      <div>
        Blocks:
        <ol>
          {blocksData.map((block, index) => (
            <li key={index}>
              <DocumentBlockForm
                blockData={block}
                onChange={handleBlockChange}
              />
            </li>
          ))}
        </ol>
      </div>
      <button
        type="button"
        onClick={() => {
          setBlocksData((prevBlocks) => [
            ...prevBlocks,
            {
              position: prevBlocks.length + 1,
              type: 'paragraph',
              title: '',
              content: '',
              url: '',
            },
          ])
        }}
      >
        Add block
      </button>
    </div>
  )
}

export default DocumentForm
