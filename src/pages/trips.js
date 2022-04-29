import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/utils/layout"
import Seo from "../components/utils/seo"

const TripsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location}>
      <Seo title="404: Not Found" />
      <h1>Whoopsies!</h1>
      <p>
        You've found a page that's not quite finished. We are probably too busy
        hiking through the wilderness to notice...
      </p>
      <p>Feel free to check back later!</p>
      <p>Much love, RND</p>
    </Layout>
  )
}

export default TripsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
