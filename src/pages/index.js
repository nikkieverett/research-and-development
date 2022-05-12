import React, { useState, useCallback } from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Col, Button, Stack } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import ImgsViewer from "react-images-viewer"

import "swiper/css/bundle"
import "swiper/css"
import "swiper/css/navigation"

// Local Components
import Layout from "../components/utils/layout"

const HomePage = ({ data }) => {
  const locationData = data.allMarkdownRemark.nodes[0].frontmatter
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
    <div className="app">
      <Layout>
        <div className="section">
          <div className="current-location-block">
            <Card>
              <Card.Img variant="top" src={locationData.currentMapImage} />
              <Card.Body>
                <Row>
                  <Col xs={7}>
                    <Card.Title>We are currently in...</Card.Title>
                    <Card.Text>{locationData.currentLocation}</Card.Text>
                  </Col>
                  <Col xs={5}>
                    <div className="card__button">
                      <Button href="/southwest-roadtrip" variant="primary">
                        Trip Details
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="section">
          <div className="section__title">
            <span>Current Trip Details</span>
          </div>
          <Row>
            {locationData.tripDetails.map(item => {
              return (
                <Col xs={12} sm={6} key={item.title}>
                  <Card className="trip-counter__card" key={item.title}>
                    <Stack gap={1}>
                      <div className="trip-counter__number">{item.number}</div>
                      <div className="trip-counter__title">{item.title}</div>
                    </Stack>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </div>

        <div className="section">
          <div className="section__title">
            <span>Photo Gallery</span>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            slidesPerGroup={1}
            navigation={true}
            loopFillGroupWithBlank={false}
            modules={[Navigation]}
            className="gallerySwiper"
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
              },
            }}
          >
            {locationData.homeGalleryImages.map((item, index) => {
              return (
                <SwiperSlide key={item}>
                  <img src={item} onClick={() => openImageViewer(index)}></img>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <ImgsViewer
          imgs={locationData.homeGalleryImages.map(item => {
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
    </div>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { title: { eq: "Current Location" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
          currentLocation
          currentMapImage
          homeGalleryImages
          tripDetails {
            title
            number
          }
        }
      }
    }
  }
`
