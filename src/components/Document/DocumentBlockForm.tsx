import { useMutation } from '@apollo/client'
import {
  CREATE_DOCUMENT_BLOCK,
  DELETE_DOCUMENT_BLOCK_BY_ID,
  UPDATE_DOCUMENT_BLOCK_BY_ID,
} from '@/db/queries-qraphql'
import { useState, useEffect } from 'react'
import { Button, Input, TextArea } from '@/components'
import classes from './document.module.css'

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
  onDragStart?: (e: React.DragEvent, blockId: string) => void
  onDragOver?: (e: React.DragEvent) => void
  onDragEnd?: () => void
  isCollapsed?: boolean
}
export const DocumentBlockForm = ({
  documentId,
  blockData,
  onDelete,
  onDragStart,
  onDragOver,
  onDragEnd,
  isCollapsed,
}: DocumentBlockFormProps) => {
  const [currentBlockData, setCurrentBlockData] = useState<BlockData>(blockData)

  // Update local state when blockData prop changes
  useEffect(() => {
    setCurrentBlockData(blockData)
  }, [blockData])

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

      setCurrentBlockData(createdBlock)
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, currentBlockData.id || `temp-${currentBlockData.position}`)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (onDragOver) {
      onDragOver(e)
    }
  }

  const handleDragEnd = () => {
    onDragEnd?.()
  }

  return (
    <div
      className={`${classes.container} ${isCollapsed ? classes.dragging : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={classes.blockHeader}>
        <div>{currentBlockData.position}</div>
        {!!currentBlockData.id && <div>Type: {currentBlockData.type}</div>}
      </div>

      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        {!isCollapsed && (
          <>
            {!currentBlockData.id && (
              <fieldset className={classes.fieldset}>
                <label htmlFor="block_type">Type</label>
                <select
                  name="type"
                  onChange={handleTypeChange}
                  value={currentBlockData.type}
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="heading2">Heading 2</option>
                  <option value="heading3">Heading 3</option>
                  <option value="list">List</option>
                  <option value="youtube">Youtube</option>
                  <option value="image">Image</option>
                  <option value="quote">Quote</option>
                </select>
              </fieldset>
            )}
            {['heading2', 'heading3'].includes(currentBlockData.type) && (
              <fieldset className={classes.fieldset}>
                <Input
                  id={`title_${currentBlockData.id}`}
                  label="Title"
                  name="title"
                  type="text"
                  value={currentBlockData.title || ''}
                  onChange={handleChange}
                  required
                />
              </fieldset>
            )}
            {['paragraph', 'list', 'quote'].includes(currentBlockData.type) && (
              <fieldset className={classes.fieldset}>
                <TextArea
                  id={`content_${currentBlockData.id}`}
                  label="Content"
                  name="content"
                  rows={10}
                  value={currentBlockData.content}
                  onChange={(e) => {
                    setCurrentBlockData({
                      ...currentBlockData,
                      [e.target.name]: e.target.value,
                    })
                  }}
                />
              </fieldset>
            )}
            {['youtube', 'image', 'quote'].includes(currentBlockData.type) && (
              <fieldset className={classes.fieldset}>
                <Input
                  id={`url_${currentBlockData.id}`}
                  label="URL"
                  name="url"
                  type="url"
                  value={currentBlockData.url || ''}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </fieldset>
            )}
            <div className={classes.blockActions}>
              <Button type="submit">
                {currentBlockData.id ? 'Update block' : 'Create block'}
              </Button>
              <Button type="button" variant="danger" onClick={handleDelete}>
                Delete block
              </Button>
            </div>
          </>
        )}

        {isCollapsed && (
          <div className={classes.collapsedContent}>
            <div className={classes.blockType}>{currentBlockData.type}</div>
            {currentBlockData.title && (
              <div className={classes.blockTitle}>{currentBlockData.title}</div>
            )}
            {currentBlockData.content && (
              <div className={classes.blockPreview}>
                {currentBlockData.content}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
