import React, { useState } from "react"

import Layout from "../components/layout"

import SEO from "../components/seo"
import StyledBackgroundSection from "../components/BgImg";
import ApiData from "../components/ApiData"
import Navbar from "../components/Navbar"
import { Container } from "@material-ui/core"

const IndexPage = () => {
  const screenConfig = useState(0);
  return (
    <>
    <StyledBackgroundSection>
      <Layout>
        <SEO title="Home" />
        
        <Container>
          <Navbar screenConfig={screenConfig}/>
          <ApiData currentScreen={screenConfig[0]} />
        </Container>
  
      </Layout>
    </StyledBackgroundSection>
    </>
  )
}

export default IndexPage

