import React, { useState, useCallback, useEffect } from "react"
import { graphql } from "gatsby"

// Third Party
import { Col, Row } from "react-bootstrap"
import ImgsViewer from "react-images-viewer"

// Local Components
import Layout from "../components/utils/layout"

const GalleryPage = ({ data }) => {
  const [allGalleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    if (data) {
      data.allMarkdownRemark.nodes.forEach(item => {
        const { galleryImages } = item.frontmatter

        if (galleryImages) {
          setGalleryImages(prevData => {
            return [...prevData, ...item.frontmatter.galleryImages]
          })
        }
      })
    }
  }, [data])

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageViewerIsOpen, setImageViewerIsOpen] = useState(false)

  const openImageViewer = useCallback(
    index => {
      setCurrentImageIndex(index)
      setImageViewerIsOpen(true)
    },
    [setCurrentImageIndex, setImageViewerIsOpen]
  )

  const gotoNextImg = useCallback(() => {
    setCurrentImageIndex(currentImageIndex + 1)
  }, [setCurrentImageIndex, currentImageIndex])

  const gotoPrevImg = useCallback(() => {
    setCurrentImageIndex(currentImageIndex - 1)
  }, [setCurrentImageIndex, currentImageIndex])

  const closeImgsViewer = useCallback(() => {
    setCurrentImageIndex(0)
    setImageViewerIsOpen(false)
  }, [setCurrentImageIndex, setImageViewerIsOpen])

  return (
    <>
      <Layout>
        <Row className="gallery">
          {allGalleryImages.map((item, index) => {
            return (
              <Col xs={12} sm={4} className="column" key={item}>
                <img src={item} onClick={() => openImageViewer(index)}></img>
              </Col>
            )
          })}
        </Row>
        <ImgsViewer
          imgs={allGalleryImages.map(item => {
            return {
              src: item,
            }
          })}
          currImg={currentImageIndex}
          isOpen={imageViewerIsOpen}
          onClickPrev={gotoPrevImg}
          onClickNext={gotoNextImg}
          onClose={closeImgsViewer}
        />
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
          galleryImages
        }
      }
    }
  }
`
