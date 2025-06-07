import React from 'react'

const NewsLayout: React.FC = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <main>{children}</main>
}

export default NewsLayout
