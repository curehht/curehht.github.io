'use client'

import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

type Document = {
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

type BlockData = {
  block_position: number
  block_type: string
  block_title: string
  block_content: string
  block_url: string
}

const SAVE_DOCUMENT = gql`
  mutation SaveDocument($document: DocumentInput!) {
    saveDocument(document: $document) {
      id
      title
      description
      is_published
      blocks {
        block_position
        block_type
        block_title
        block_content
        block_url
      }
    }
  }
`

const DocumentBlock = ({
  blockData,
  onChange,
}: {
  blockData: BlockData
  onChange: (blockData: BlockData) => void
}) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      ...blockData,
      block_type: e.target.value,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...blockData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '20px',
      }}
    >
      <p>Block {blockData.block_position}</p>
      <fieldset>
        <label htmlFor="block_type">Type</label>
        <select
          name="block_type"
          onChange={handleTypeChange}
          value={blockData.block_type}
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading1">Heading 1</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="list-item">List item</option>
          <option value="youtube">Youtube</option>
          <option value="vimeo">Vimeo</option>
          <option value="dailymotion">Dailymotion</option>
          <option value="image">Image</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="quote">Quote</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="block_title">Title</label>
        <input
          type="text"
          name="block_title"
          onChange={handleChange}
          value={blockData.block_title}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="block_content">Content</label>
        <input
          type="text"
          name="block_content"
          onChange={handleChange}
          value={blockData.block_content}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="block_url">URL</label>
        <input
          type="text"
          name="block_url"
          onChange={handleChange}
          value={blockData.block_url}
        />
      </fieldset>
    </form>
  )
}

function DocumentsPage() {
  const [blocksData, setBlocksData] = useState<BlockData[]>([])
  const [saveDocument] = useMutation(SAVE_DOCUMENT, {
    refetchQueries: ['GetDocument'],
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const document: Document = {
      title: data.title as string,
      description: data.description as string,
      is_published: data.is_published === 'on',
      blocks: blocksData,
    }
    saveDocument({ variables: { document } })
  }

  const handleBlockChange = (blockData: BlockData) => {
    setBlocksData((prevBlocks) => {
      const blockExists = prevBlocks.find(
        (block) => block.block_position === blockData.block_position
      )
      if (blockExists) {
        return prevBlocks.map((block) =>
          block.block_position === blockData.block_position
            ? { ...block, ...blockData }
            : block
        )
      } else {
        return [...prevBlocks, blockData]
      }
    })
  }

  return (
    <article>
      <h1>Documents</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" />
        </fieldset>
        <fieldset>
          <label htmlFor="is_published">Is published</label>
          <input type="checkbox" name="is_published" />
        </fieldset>
        <button type="submit">save</button>
      </form>
      <div>
        Blocks:
        <ol>
          {blocksData.map((block, index) => (
            <li key={index}>
              <DocumentBlock blockData={block} onChange={handleBlockChange} />
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
              block_position: prevBlocks.length + 1,
              block_type: 'paragraph',
              block_title: '',
              block_content: '',
              block_url: '',
            },
          ])
        }}
      >
        Add block
      </button>
    </article>
  )
}

export default DocumentsPage
