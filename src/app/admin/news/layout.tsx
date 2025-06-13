import React from 'react'

interface NewsLayoutProps {
  children: React.ReactNode
}

const NewsLayout: React.FC<NewsLayoutProps> = ({ children }) => {
  return (
    <div className="NewsLayout">
      <h1>Админка новостей</h1>
      {children}
    </div>
  )
}

export default NewsLayout
