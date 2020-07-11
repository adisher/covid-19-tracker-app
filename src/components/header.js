import React from "react"
import PropTypes from "prop-types"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rgba(0, 0, 255, 0.5)`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 
        style={{
          margin: 0, 
          color: "mintcream",
        }}
      >
        {siteTitle}
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
