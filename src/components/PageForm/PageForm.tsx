import { useState } from 'react'

import classes from './PageForm.module.css'

export type PageProps = {
  id?: string
  title: string
  slug: string
  slug_name: string
  summary: string
  content: string
}

export const PageForm = ({
  page,
  onSubmit,
  onDelete,
}: {
  page: PageProps
  onSubmit: (page: PageProps) => void
  onDelete?: () => void
}) => {
  const [formPage, setFormPage] = useState(page)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormPage({ ...formPage, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formPage)
  }

  const handleDelete = () => {
    if (onDelete && confirm('Are you sure you want to delete this page?')) {
      onDelete()
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <fieldset>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formPage.title}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formPage.slug}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="slug_name">Slug Name</label>
        <input
          type="text"
          id="slug_name"
          name="slug_name"
          value={formPage.slug_name}
          onChange={handleChange}
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          name="summary"
          value={formPage.summary}
          onChange={handleChange}
          rows={3}
          required
        />
      </fieldset>
      <fieldset>
        <label>Content</label>
        <textarea
          id="content"
          name="content"
          value={formPage.content}
          onChange={handleChange}
          rows={10}
        />
      </fieldset>

      <div className={classes.buttons}>
        <button type="submit">Save</button>
        {onDelete && (
          <button data-delete type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
