import * as React from "react"
import { graphql } from "gatsby"

import CountdownClock from "../components/CountdownClock"
import Background from "../images/Background.svg"

const HomePage = ({ data, location }) => {
  return (
    <div className="app">
      <CountdownClock />
    </div>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
