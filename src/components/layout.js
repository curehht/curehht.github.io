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
import MainMenu from "./MainMenu"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          mainMenu {
            url
            text
          }
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
      />
      <MainMenu mainMenu={data.site.siteMetadata.mainMenu} />
      <main className={'content'}>{children}</main>
      <footer className='footer'>
        <section className='footer__section'>
          <h3 className="section__header">официальные источники</h3>
          <ul className='communities'>
            <li>Сайт <a href="https://curehht.org">curehht.org</a></li>
            <li>Ютуб <a href="https://www.youtube.com/user/HHTFoundation">HHTFoundation</a></li>
            <li>Facebook <a href="https://www.facebook.com/hht.org">facebook.com/hht.org</a></li>
          </ul>
        </section>
        <section className='footer__section'>
          <h3 className="section__header">дополнительно</h3>
          <ul className='communities'>
            <li><a href="https://www.facebook.com/groups/5484437834/">HHT Awareness</a></li>
            <li><a href="https://www.facebook.com/groups/152612813303/">HHT International</a></li>
            <li><a href="https://www.facebook.com/groups/L.W.H.H.Tphotosvideos/">Living with HHT Read our stories & see our Photos & More.</a></li>
            <li><a href="https://www.facebook.com/groups/1503220203260718/">Women with HHT</a></li>
            <li><a href="https://www.facebook.com/groups/349798917563/">HHT or (Osler-Weber-Rendu Syndrome)</a></li>
            <li><a href="https://www.facebook.com/groups/238198683185208/">HHT WARRIORS</a></li>
          </ul>
        </section>
        <section className='footer__section'>
          <h3 className="section__header">на русском</h3>
          <ul className='communities'>
            <li><a href="https://www.facebook.com/groups/curehhtru/">facebook/curehhtru</a></li>
            <li><a href="https://vk.com/curehhtru">vk.com/curehhtru</a></li>
          </ul>
        </section>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
