import Link from 'next/link'
import { readDocuments } from '@/db/api/documents'
import classes from './page.module.css'

const NewsLayout = async ({ children }: { children: React.ReactNode }) => {
  const documents = await readDocuments()

  return (
    <div className={classes.layout}>
      <div className={classes.container}>{children}</div>
      <div className={classes.sidebar}>
        <ul className={classes.list}>
          {documents.map((document) => (
            <li key={document.id} className={classes.item}>
              <Link
                title={document.title}
                className={classes.link}
                href={`/news/${document.slug}`}
              >
                {`${document.title.slice(0, 80)}...`}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NewsLayout
