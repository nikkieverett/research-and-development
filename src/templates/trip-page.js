import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/utils/bio"
import Layout from "../components/utils/layout"
import Seo from "../components/utils/seo"

const TripTemplatePage = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  console.log(data)

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

export default TripTemplatePage

export const pageQuery = graphql`
  query TripBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        startDate
        endDate
        description
        stops {
          city
          state
          startDate
          endDate
          #   coverImage
          articles
          #   published
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
