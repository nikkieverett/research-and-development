const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const tripPage = path.resolve(`./src/templates/trip-page.js`)
  const stopPage = path.resolve(`./src/templates/stop-page.js`)

  // Get all markdown blog posts sorted by date
  const tripResults = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "trips" } }) {
          nodes {
            childrenMarkdownRemark {
              fields {
                slug
              }
              id
            }
          }
        }
      }
    `
  )
  const stopResults = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "stops" } }) {
          nodes {
            childrenMarkdownRemark {
              fields {
                slug
              }
              id
            }
          }
        }
      }
    `
  )

  if (tripResults.errors || stopResults.errors) {
    const errorMessage = ""
    if (tripResults.errors) errorMessage = tripResults.errors
    if (stopResults.errors) errorMessage = stopResults.errors

    reporter.panicOnBuild(
      `There was an error loading your blog pages`,
      errorMessage
    )
    return
  }

  const trips = tripResults.data.allFile.nodes

  if (trips.length > 0) {
    trips.forEach(post => {
      if (post.childrenMarkdownRemark.length > 0) {
        createPage({
          path: post.childrenMarkdownRemark[0].fields.slug,
          component: tripPage,
          context: {
            id: post.childrenMarkdownRemark[0].id,
          },
        })
      }
    })
  }

  const stops = stopResults.data.allFile.nodes

  if (stops.length > 0) {
    stops.forEach(post => {
      if (post.childrenMarkdownRemark.length > 0) {
        createPage({
          path: post.childrenMarkdownRemark[0].fields.slug,
          component: stopPage,
          context: {
            id: post.childrenMarkdownRemark[0].id,
          },
        })
      }
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
