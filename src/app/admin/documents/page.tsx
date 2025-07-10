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
  position: number
  type: string
  title: string
  content: string
  url: string
}

const CREATE_DOCUMENT = gql`
  mutation CreateDocument($document: DocumentInput!) {
    createDocument(document: $document) {
      id
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
      type: e.target.value,
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
      <p>Block {blockData.position}</p>
      <fieldset>
        <label htmlFor="block_type">Type</label>
        <select name="type" onChange={handleTypeChange} value={blockData.type}>
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
          name="title"
          onChange={handleChange}
          value={blockData.title}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Content</label>
        <input
          type="text"
          name="content"
          onChange={handleChange}
          value={blockData.content}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={blockData.url}
        />
      </fieldset>
    </form>
  )
}

function DocumentsPage() {
  const [blocksData, setBlocksData] = useState<BlockData[]>([])
  const [createDocument] = useMutation(CREATE_DOCUMENT)

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
    createDocument({ variables: { document } })
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
    </article>
  )
}

export default DocumentsPage
