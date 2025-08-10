import { useState } from 'react'

import classes from './PageForm.module.css'
import { Input } from '../Input'
import { TextArea } from '../TextArea'
import { Button } from '../Button'

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
        <Input
          id="title"
          name="title"
          value={formPage.title}
          onChange={handleChange}
          label="Title"
        />
      </fieldset>
      <fieldset>
        <Input
          id="slug"
          name="slug"
          value={formPage.slug}
          onChange={handleChange}
          label="Slug"
        />
      </fieldset>
      <fieldset>
        <Input
          id="slug_name"
          name="slug_name"
          value={formPage.slug_name}
          onChange={handleChange}
          label="Slug Name"
        />
      </fieldset>
      <fieldset>
        <TextArea
          id="summary"
          name="summary"
          value={formPage.summary}
          onChange={handleChange}
          label="Summary"
          rows={3}
        />
      </fieldset>
      <fieldset>
        <TextArea
          id="content"
          name="content"
          value={formPage.content}
          onChange={handleChange}
          label="Content"
          rows={10}
        />
      </fieldset>

      <div className={classes.buttons}>
        <Button type="submit">Save</Button>
        {onDelete && (
          <Button data-delete type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </div>
    </form>
  )
}
