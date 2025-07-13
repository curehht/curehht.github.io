import { useMutation } from '@apollo/client'
import {
  CREATE_DOCUMENT_BLOCK,
  DELETE_DOCUMENT_BLOCK_BY_ID,
  UPDATE_DOCUMENT_BLOCK_BY_ID,
  GET_DOCUMENT_BLOCK_BY_ID,
} from '@/db/queries-qraphql'
import { useState } from 'react'

type BlockData = {
  id?: string
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

type DocumentBlockFormProps = {
  documentId: string
  blockData: BlockData
  onDelete?: (id: string) => void
}
export const DocumentBlockForm = ({
  documentId,
  blockData,
  onDelete,
}: DocumentBlockFormProps) => {
  const [currentBlockData, setCurrentBlockData] = useState<BlockData>(blockData)

  const [deleteDocumentBlock] = useMutation(DELETE_DOCUMENT_BLOCK_BY_ID)
  const [updateDocumentBlock] = useMutation(UPDATE_DOCUMENT_BLOCK_BY_ID)
  const [createDocumentBlock] = useMutation(CREATE_DOCUMENT_BLOCK)
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBlockData({
      ...currentBlockData,
      type: e.target.value,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentBlockData({
      ...currentBlockData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete = async () => {
    if (!currentBlockData.id) {
      onDelete?.(currentBlockData.id)
      return
    }

    const isConfirmed = confirm('Are you sure you want to delete this block?')
    if (!isConfirmed) return

    await deleteDocumentBlock({
      variables: {
        id: currentBlockData.id,
      },
    })

    onDelete?.(blockData.id)
  }

  const handleSubmit = async () => {
    console.log('handleSubmit currentBlockData :>> ', currentBlockData)

    if (currentBlockData.id) {
      await updateDocumentBlock({
        variables: {
          id: currentBlockData.id,
          block: {
            position: currentBlockData.position,
            type: currentBlockData.type,
            title: currentBlockData.title,
            content: currentBlockData.content,
            url: currentBlockData.url,
          },
        },
      })
    } else {
      const result = await createDocumentBlock({
        variables: {
          block: {
            position: currentBlockData.position,
            type: currentBlockData.type,
            title: currentBlockData.title,
            content: currentBlockData.content,
            url: currentBlockData.url,
          },
          document_id: documentId,
        },
      })

      const createdBlock = result.data.createDocumentBlock

      console.log('createdBlock :>> ', createdBlock)

      setCurrentBlockData(createdBlock)
    }
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
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <p>Block {currentBlockData.position}</p>
      <fieldset>
        <label htmlFor="block_type">Type</label>
        <select
          name="type"
          onChange={handleTypeChange}
          value={currentBlockData.type}
          disabled={!!currentBlockData.id}
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading2">Heading 2</option>
          <option value="heading3">Heading 3</option>
          <option value="list-item">List item</option>
          <option value="youtube">Youtube</option>
          <option value="image">Image</option>
          <option value="quote">Quote</option>
        </select>
      </fieldset>
      {['heading2', 'heading3'].includes(currentBlockData.type) && (
        <fieldset>
          <label htmlFor="block_title">Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={currentBlockData.title}
          />
        </fieldset>
      )}
      {['paragraph', 'list-item', 'quote'].includes(currentBlockData.type) && (
        <fieldset>
          <label htmlFor="content">Content</label>
          <textarea
            rows={10}
            name="content"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCurrentBlockData({
                ...currentBlockData,
                [e.target.name]: e.target.value,
              })
            }
            value={currentBlockData.content}
          />
        </fieldset>
      )}
      {['youtube', 'vimeo', 'dailymotion', 'image', 'audio', 'video'].includes(
        currentBlockData.type
      ) && (
        <fieldset>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            onChange={handleChange}
            value={currentBlockData.url}
          />
        </fieldset>
      )}
      <button type="submit">
        {currentBlockData.id ? 'Update block' : 'Create block'}
      </button>
      <button type="button" onClick={handleDelete}>
        Delete block
      </button>
    </form>
  )
}
