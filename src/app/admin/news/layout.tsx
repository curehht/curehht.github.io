import React from 'react'

interface NewsLayoutProps {
  children: React.ReactNode
}

const NewsLayout: React.FC<NewsLayoutProps> = ({ children }) => {
  return (
    <>
      <h1>Админка новостей</h1>
      {children}
    </>
  )
}

export default NewsLayout
