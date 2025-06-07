import React from 'react'

const NewsLayout: React.FC = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <section>{children}</section>
}

export default NewsLayout
