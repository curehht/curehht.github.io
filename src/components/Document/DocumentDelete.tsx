'use client'

import { useRouter } from 'next/navigation'
import { deleteDocument } from '@/db/api/documents'

import classes from './document.module.css'

const DocumentDelete = ({
  documentId,
  className,
}: {
  documentId: string
  className?: string
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this document?'
    )
    if (isConfirmed) {
      const result = await deleteDocument(documentId)
      if (result.success) {
        router.refresh()
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`${classes.deleteButton} ${className}`}
    >
      Delete
    </button>
  )
}

export default DocumentDelete
