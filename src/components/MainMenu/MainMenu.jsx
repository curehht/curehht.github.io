import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"

import "./MainMenu.css"

const MainMenuItem = ({ url, text }) => {
  return (
    <li className="main-menu__item">
      <Link to={url} activeClassName="main-menu__item_active">{text}</Link>
    </li>
  )
}

const MainMenu = ({ mainMenu }) => {
  return (
    <nav className="main-menu">
      <ul className="main-menu__list">
        {mainMenu.map(({ url, text }) => <MainMenuItem key={url} url={url} text={text} />)}
      </ul>
    </nav>
  )
}

MainMenu.propTypes = {
  mainMenu: PropTypes.array,
}

MainMenu.defaultProps = {
  mainMenu: [],
}

export default MainMenu
