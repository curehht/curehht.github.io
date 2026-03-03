import Link from 'next/link'

import classes from './MainNavigation.module.css'

interface MainNavigationProps {
  pages: { slug: string; slug_name: string }[]
}

const MainNavigation = ({ pages }: MainNavigationProps) => {
  return (
    <nav aria-label="Главная навигация" className={classes.component}>
      <ul>
        <li>
          <Link href="/">Главная</Link>
        </li>
        <li>
          <Link href="/news">новости</Link>
        </li>
        {pages.map((page: { slug: string; slug_name: string }) => (
          <li key={page.slug}>
            <Link href={`/${page.slug}`}>{page.slug_name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MainNavigation
