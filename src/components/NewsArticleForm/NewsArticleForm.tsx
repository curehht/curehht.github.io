'use client'

import React from 'react'

import classes from './NewsArticleForm.module.css'
interface NewsArticleFormProps {
  id?: number
  title?: string
  summary?: string
  text?: []
  origin_url?: string
  onSubmit?: (article) => void
}

const NewsArticleForm: React.FC<NewsArticleFormProps> = ({
  id,
  title,
  summary,
  text,
  origin_url,
  onSubmit,
}) => {
  const [article, setArticle] = React.useState({
    title,
    summary,
    text: text,
    origin_url,
  })

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ ...article, id })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setArticle((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form className={classes.form}>
      <fieldset>
        <label htmlFor="title">Название</label>
        <input
          type="text"
          id="title"
          name="title"
          value={article.title || ''}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="summary">Текст</label>
        <textarea
          id="summary"
          name="summary"
          rows={10}
          value={article.summary || ''}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <label htmlFor="origin_url">Ссылка на новость</label>
        <input
          type="text"
          id="origin_url"
          name="origin_url"
          value={article.origin_url || ''}
          onChange={handleChange}
        />
      </fieldset>

      <button onClick={handleSubmit}>{id ? 'Сохранить' : 'Создать'}</button>
    </form>
  )
}

export { NewsArticleForm }
