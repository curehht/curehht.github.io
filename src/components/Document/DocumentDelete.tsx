'use client'

import { useMutation } from '@apollo/client'
import { DELETE_DOCUMENT_BY_ID } from '@/db/queries-qraphql'

import classes from './document.module.css'

const DocumentDelete = ({
  documentId,
  className,
}: {
  documentId: string
  className?: string
}) => {
  const [deleteDocument] = useMutation(DELETE_DOCUMENT_BY_ID)

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this document?'
    )
    if (isConfirmed) {
      await deleteDocument({
        variables: {
          id: documentId,
        },
      })
      window.location.reload()
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
