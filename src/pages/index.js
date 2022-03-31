import * as React from "react"
import { Link, graphql } from "gatsby"

import CountdownClock from "../components/CountdownClock/countdownClock"
import Background from "../images/Background.svg"

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <div className="app">
      <div className="section section-placeholder" />
      <div className="hero">
        <CountdownClock />
      </div>
      <Background />
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
