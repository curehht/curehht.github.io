import { MainNavigation } from '@/components'
import { getPagesSlugs } from '@/db/api/pages'

import classes from './layout.module.css'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pagesSlugs = await getPagesSlugs()

  return (
    <div className={classes.layout}>
      <div className={classes.leftColumn}>
        <MainNavigation pages={pagesSlugs || []} />
      </div>

      <div className={classes.rightColumn}>{children}</div>
    </div>
  )
}
