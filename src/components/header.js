import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "./header.css"

const Header = ({ siteTitle, title_text }) => (
  <header className="header">
    <div>
      <h1>
        <Link to="/">
          {siteTitle}
        </Link>
      </h1>
      <div className="header__text">{title_text}</div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  title_text: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  title_text: ``,
}

export default Header
