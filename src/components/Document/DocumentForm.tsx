'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_DOCUMENT, UPDATE_DOCUMENT_BY_ID } from '@/db/queries-qraphql'
import { DocumentBlockForm } from './DocumentBlockForm'

type BlockData = {
  id?: string
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

type DocumentWithBlocks = {
  id?: string
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

const initialDocument: DocumentWithBlocks = {
  id: '',
  title: '',
  description: '',
  is_published: false,
  blocks: [],
}

const DocumentForm = ({
  document = initialDocument,
}: {
  document: DocumentWithBlocks
}) => {
  const [currentDocument, setCurrentDocument] =
    useState<DocumentWithBlocks>(document)
  const [blocksData, setBlocksData] = useState<BlockData[]>(
    document.blocks || []
  )
  const [createDocument] = useMutation(CREATE_DOCUMENT)
  const [updateDocument] = useMutation(UPDATE_DOCUMENT_BY_ID)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentDocument.id) {
      updateDocument({
        variables: {
          id: currentDocument.id,
          document: {
            title: currentDocument.title,
            description: currentDocument.description,
            is_published: currentDocument.is_published,
          },
        },
      })
    } else {
      createDocument({
        variables: {
          document: {
            title: currentDocument.title,
            description: currentDocument.description,
            is_published: currentDocument.is_published,
            blocks: blocksData,
          },
        },
      })
    }
  }

  const handleBlockDelete = (id: string) => {
    setBlocksData((prevBlocks) => prevBlocks.filter((block) => block.id !== id))
  }

  const handleUnsavedBlockDelete = (index: number) => () => {
    setBlocksData((prevBlocks) => prevBlocks.filter((_, i) => i !== index))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={currentDocument.title}
            onChange={(e) => {
              setCurrentDocument({
                ...currentDocument,
                title: e.target.value,
              })
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <textarea
            rows={5}
            name="description"
            value={currentDocument.description}
            onChange={(e) => {
              setCurrentDocument({
                ...currentDocument,
                description: e.target.value,
              })
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="is_published">Is published</label>
          <input
            type="checkbox"
            name="is_published"
            checked={currentDocument.is_published}
            onChange={(e) => {
              setCurrentDocument({
                ...currentDocument,
                is_published: e.target.checked,
              })
            }}
          />
        </fieldset>
        <button type="submit">save</button>
      </form>
      <div>
        Blocks:
        <ol>
          {currentDocument.id &&
            blocksData.map((block, index) => (
              <li key={block.id || index}>
                <DocumentBlockForm
                  documentId={currentDocument.id}
                  blockData={block}
                  onDelete={
                    block.id
                      ? handleBlockDelete
                      : handleUnsavedBlockDelete(index)
                  }
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
