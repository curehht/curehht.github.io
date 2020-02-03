import React from "react"
import PropTypes from "prop-types"

const MainMenu = props => {
  console.log('mainMenu: ', props.mainMenu); // eslint-disable-line

  return (
    <nav className="main-menu">
      <ul className="main-menu__list">
        <li className="main-menu__item">MainMenu</li>
      </ul>
    </nav>
  )
}

export default MainMenu
