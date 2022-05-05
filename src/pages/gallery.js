import * as React from "react"
import { graphql } from "gatsby"

import { Col, Row } from "react-bootstrap"
import Layout from "../components/utils/layout"

const GalleryPage = ({ data }) => {
  const galleryData = data.allMarkdownRemark.nodes
  const galleryImages = galleryData.filter(
    item => item.frontmatter.homeGalleryImages
  )
  return (
    <>
      <Layout>
        <Row className="gallery">
          {galleryImages[0].frontmatter.homeGalleryImages.map(item => {
            return (
              <Col xs={12} sm={4} className="column" key={item}>
                <img src={item}></img>
              </Col>
            )
          })}
        </Row>
      </Layout>
    </>
  )
}

export default GalleryPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          homeGalleryImages
        }
      }
    }
  }
`
