'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_DOCUMENT, UPDATE_DOCUMENT_BY_ID } from '@/db/queries-qraphql'
import { DocumentBlockForm } from './DocumentBlockForm'
import classes from './document.module.css'
import { useRouter } from 'next/navigation'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Checkbox } from '../Checkbox'
import { Button } from '../Button'

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
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const result = await createDocument({
        variables: {
          document: {
            title: currentDocument.title,
            description: currentDocument.description,
            is_published: currentDocument.is_published,
          },
        },
      })

      router.push(`/admin/documents/${result.data.createDocument.id}`)
    }
  }

  const handleBlockDelete = (id: string) => {
    setBlocksData((prevBlocks) => prevBlocks.filter((block) => block.id !== id))
  }

  const handleUnsavedBlockDelete = (index: number) => () => {
    setBlocksData((prevBlocks) => prevBlocks.filter((_, i) => i !== index))
  }

  return (
    <div className={classes.documentFormContainer}>
      <form className={classes.documentForm} onSubmit={handleSubmit}>
        <Input
          label="Title"
          name="title"
          type="text"
          required
          value={currentDocument.title}
          onChange={(e) => {
            setCurrentDocument({
              ...currentDocument,
              title: e.target.value,
            })
          }}
        />
        <TextArea
          label="Description"
          name="description"
          rows={5}
          value={currentDocument.description}
          onChange={(e) => {
            setCurrentDocument({
              ...currentDocument,
              description: e.target.value,
            })
          }}
        />
        <Checkbox
          label="Is published"
          name="is_published"
          checked={currentDocument.is_published}
          onChange={(e) => {
            setCurrentDocument({
              ...currentDocument,
              is_published: e.target.checked,
            })
          }}
        />
        <div style={{ marginTop: '1rem' }}>
          <Button type="submit">Save document</Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
      <div style={{ marginTop: '1rem' }}>
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
      <div>
        {!currentDocument.id && <p>Save a new document before adding blocks</p>}
        <Button
          type="button"
          disabled={!currentDocument.id}
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
        </Button>
      </div>
    </div>
  )
}

export default DocumentForm
