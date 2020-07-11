import React from "react"

const Header = () => (
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
          color: "white",
        }}
      >
        Covid-19 Tracker App
      </h1>
    </div>
  </header>
)

export default Header
