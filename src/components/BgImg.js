import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'


import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({children}) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "covid-4.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          fluid={imageData}
          backgroundColor={`#040e18`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
          }}
        >
        {children}
        
        </BackgroundImage>
      )
    }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  min-height: 100vh;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent,
`

export default StyledBackgroundSection