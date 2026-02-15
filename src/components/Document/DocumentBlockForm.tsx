'use client'

import {
  createDocumentBlock,
  updateDocumentBlock,
  deleteDocumentBlock,
} from '@/db/api/documents'
import { useState, useEffect } from 'react'
import { Button, Input, TextArea } from '@/components'
import classes from './document.module.css'
import { Select } from '../Select'

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
  onDelete?: (id: string | undefined) => void
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

  useEffect(() => {
    setCurrentBlockData(blockData)
  }, [blockData])

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

    const result = await deleteDocumentBlock(currentBlockData.id)
    if (result.success) {
      onDelete?.(blockData.id)
    }
  }

  const handleSubmit = async () => {
    const blockPayload = {
      position: currentBlockData.position,
      type: currentBlockData.type as
        | 'paragraph'
        | 'heading2'
        | 'heading3'
        | 'list'
        | 'youtube'
        | 'image'
        | 'quote',
      title: currentBlockData.title ?? '',
      content: currentBlockData.content,
      url: currentBlockData.url ?? '',
    }

    if (currentBlockData.id) {
      const result = await updateDocumentBlock(
        currentBlockData.id,
        blockPayload
      )
      if (result.success) {
        setCurrentBlockData({ ...currentBlockData, ...blockPayload })
      }
    } else {
      const result = await createDocumentBlock(documentId, {
        ...blockPayload,
        type: blockPayload.type,
      })
      if (result.success && result.block) {
        setCurrentBlockData({
          ...result.block,
          position: result.block.position,
          type: result.block.type,
          title: result.block.title ?? '',
          content: result.block.content ?? '',
          url: result.block.url ?? '',
        })
      }
    }
  }

  const handleDragStart = (e: React.DragEvent) => {
    if (onDragStart) {
      onDragStart(e, currentBlockData.id || `temp-${currentBlockData.position}`)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver?.(e)
  }

  return (
    <div
      className={`${classes.container} ${isCollapsed ? classes.dragging : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={onDragEnd}
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
                <Select
                  id="type"
                  label="Type"
                  name="type"
                  options={[
                    'paragraph',
                    'heading2',
                    'heading3',
                    'list',
                    'youtube',
                    'image',
                    'quote',
                  ]}
                  required
                  onChange={handleTypeChange}
                  value={currentBlockData.type}
                />
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
