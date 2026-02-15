'use client'

import { useState } from 'react'
import {
  createDocument,
  updateDocument,
  updateDocumentBlock,
} from '@/db/api/documents'
import { DocumentBlockForm } from './DocumentBlockForm'
import classes from './document.module.css'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/Input'
import { TextArea } from '@/components/TextArea'
import { Checkbox } from '@/components/Checkbox'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'

type BlockData = {
  id?: string
  type: string
  position: number
  title?: string
  content: string
  url?: string
}

type DocumentWithBlocks = {
  id: string
  type: string
  slug: string
  title: string
  description: string
  is_published: boolean
  blocks: BlockData[]
}

const initialDocument: DocumentWithBlocks = {
  id: '',
  type: 'newsItem',
  slug: '',
  title: '',
  description: '',
  is_published: false,
  blocks: [],
}

// DropZone component for drag and drop
const DropZone = ({
  onDragOver,
  onDrop,
  position,
}: {
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, position: number) => void
  position: number
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
    onDragOver(e)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    onDrop(e, position)
  }

  return (
    <div
      className={`${classes.dropZone} ${isDragOver ? classes.dragOver : ''}`}
      data-dragover={isDragOver}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  )
}

const DocumentForm = ({
  document = initialDocument,
}: {
  document?: DocumentWithBlocks
}) => {
  const [currentDocument, setCurrentDocument] =
    useState<DocumentWithBlocks>(document)
  const [blocksData, setBlocksData] = useState<BlockData[]>(
    document.blocks || []
  )
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentDocument.id) {
      await updateDocument(currentDocument.id, {
        title: currentDocument.title,
        type: currentDocument.type,
        slug: currentDocument.slug,
        description: currentDocument.description ?? undefined,
        is_published: currentDocument.is_published,
      })
    } else {
      const result = await createDocument({
        title: currentDocument.title,
        type: currentDocument.type,
        slug: currentDocument.slug,
        description: currentDocument.description ?? undefined,
        is_published: currentDocument.is_published,
      })
      if (result.success && result.id) {
        router.push(`/admin/documents/${result.id}`)
      }
    }
  }

  const handleBlockDelete = (id: string) => {
    setBlocksData((prevBlocks) => prevBlocks.filter((block) => block.id !== id))
  }

  const handleUnsavedBlockDelete = (index: number) => () => {
    setBlocksData((prevBlocks) => prevBlocks.filter((_, i) => i !== index))
  }

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnd = () => {
    setDraggedBlockId(null)
  }

  const handleDrop = async (e: React.DragEvent, targetPosition: number) => {
    e.preventDefault()

    if (!draggedBlockId) {
      setDraggedBlockId(null)
      return
    }

    const draggedIndex = blocksData.findIndex(
      (block) => (block.id || `temp-${block.position}`) === draggedBlockId
    )

    if (draggedIndex === -1) {
      setDraggedBlockId(null)
      return
    }

    // Calculate the target index based on position
    let targetIndex = targetPosition

    // If dropping after the dragged item, adjust the index
    if (targetIndex > draggedIndex) {
      targetIndex -= 1
    }

    // Reorder blocks
    const newBlocks = [...blocksData]
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1)
    newBlocks.splice(targetIndex, 0, draggedBlock)

    // Update positions
    const updatedBlocks = newBlocks.map((block, index) => ({
      ...block,
      position: index + 1,
    }))

    setBlocksData(updatedBlocks)
    setDraggedBlockId(null)

    // Update positions in database for saved blocks
    const savedBlocks = updatedBlocks.filter((block) => block.id)
    for (const block of savedBlocks) {
      if (!block.id) continue
      const result = await updateDocumentBlock(block.id, {
        position: block.position,
        type: block.type as
          | 'paragraph'
          | 'heading2'
          | 'heading3'
          | 'list'
          | 'youtube'
          | 'image'
          | 'quote',
        title: block.title ?? '',
        content: block.content,
        url: block.url,
      })
      if (!result.success) {
        console.error('Failed to update block position', result.error)
        setDraggedBlockId(null)
      }
    }
  }

  return (
    <div className={classes.documentFormContainer}>
      <form className={classes.documentForm} onSubmit={handleSubmit}>
        <fieldset className={classes.fieldset}>
          <Select
            id="type"
            label="Type"
            name="type"
            options={['no-value', 'newsItem', 'article', 'research']}
            required
            value={currentDocument.type || 'no-value'}
            onChange={(e) => {
              setCurrentDocument({
                ...currentDocument,
                type: e.target.value,
              })
            }}
          />
        </fieldset>
        <fieldset className={classes.fieldset}>
          <Input
            id="title"
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
        </fieldset>
        <fieldset className={classes.fieldset}>
          <Input
            id="slug"
            label="Slug"
            name="slug"
            type="text"
            prefix="/"
            placeholder="enter a slug"
            required
            value={currentDocument.slug}
            onChange={(e) => {
              setCurrentDocument({
                ...currentDocument,
                slug: e.target.value,
              })
            }}
          />
        </fieldset>
        <fieldset className={classes.fieldset}>
          <TextArea
            id="description"
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
        </fieldset>
        <Checkbox
          id="is_published"
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
        <div className={classes.actions}>
          <Button type="submit">Save document</Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
      <div className={classes.blocksContainer}>
        {blocksData.length > 0 && <h3>Document blocks:</h3>}
        {blocksData.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCollapsed(true)
              }}
            >
              Collapse all
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCollapsed(false)}
            >
              Expand all
            </Button>
          </div>
        )}
        <div className={classes.blocks}>
          {currentDocument.id && (
            <>
              {/* Drop zone at the beginning */}
              <DropZone
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                position={0}
              />

              {/* Render blocks with drop zones */}
              {blocksData.map((block, index) => (
                <div key={block.id || index} className={classes.blockWrapper}>
                  <DocumentBlockForm
                    documentId={currentDocument.id}
                    blockData={block}
                    onDelete={
                      block.id
                        ? handleBlockDelete
                        : handleUnsavedBlockDelete(index)
                    }
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    isCollapsed={isCollapsed}
                  />
                  {isCollapsed && (
                    <DropZone
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      position={index + 1}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className={classes.addBlock}>
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
