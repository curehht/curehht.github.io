import { readDocuments } from '@/db/api/documents'
import Link from 'next/link'
import classes from './page.module.css'

export const metadata = {
  title: 'Новости',
  description: 'Новости о болезни Рандю-Ослера',
  keywords: 'новости, болезнь Рандю-Ослера',
}

const NewsPage = async () => {
  const documents = await readDocuments()

  return (
    <div className={classes.component}>
      <h1>Новости</h1>
      <ul className={classes.list}>
        {documents.map((document) => (
          <li key={document.id} className={classes.item}>
            <time
              dateTime={document.created_at.toISOString()}
              className={classes.date}
            >
              {new Date(document.created_at).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </time>
            <Link className={classes.link} href={`/news/${document.id}`}>
              {document.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NewsPage
