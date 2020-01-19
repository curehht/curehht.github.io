/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer className='footer'>
        <section>
          <ul className='communities'>
            <li>Official website <a href="https://curehht.org">https://curehht.org</a></li>
            <li>Official <a href="https://www.youtube.com/user/HHTFoundation">HHTFoundation</a> youtube channel</li>
            <li>Facebook <a href="https://www.facebook.com/hht.org">facebook.com/hht.org</a></li>
            <li>Русскоязычная группа <a href="https://www.facebook.com/groups/curehhtru/">facebook/curehhtru</a></li>
            <li><a href="https://vk.com/curehhtru">vk.com/curehhtru</a></li>
          </ul>
        </section>
        <section>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </section>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
