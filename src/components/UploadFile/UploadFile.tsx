'use client'

import { useState, useRef } from 'react'
import { type PutBlobResult } from '@vercel/blob'
import { upload } from '@vercel/blob/client'
import Image from 'next/image'

export default function UploadFile() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fileInputRef.current?.files) {
      throw new Error('No file selected')
    }

    const file = fileInputRef.current.files[0]

    const newBlob = await upload(fileName, file, {
      access: 'public',
      handleUploadUrl: '/api/upload',
    })

    setBlob(newBlob)
  }

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={handleSubmit} className="upload-form">
        <fieldset>
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            required
            onChange={() => {
              setFileName(fileInputRef.current?.files?.[0]?.name || '')
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="fileName">File name</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value)
            }}
          />
        </fieldset>
        <fieldset>
          <button
            type="submit"
            disabled={!fileInputRef.current?.files}
            className="submit-button"
          >
            Upload
          </button>
        </fieldset>
      </form>
      {blob && (
        <Image src={blob.url} alt="Uploaded file" width={194} height={140} />
      )}
    </>
  )
}
