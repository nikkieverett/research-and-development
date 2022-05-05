import React, { useState } from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Col, Button, Stack, Container } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css/bundle"
import "swiper/css"
import "swiper/css/navigation"

// Local Components
import NavBar from "../components/NavBar"
import Layout from "../components/utils/layout"

const HomePage = ({ data }) => {
  const locationData = data.allMarkdownRemark.nodes[0].frontmatter

  return (
    <div className="app">
      <NavBar />
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
                <Col xs={12} sm={6}>
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
            {locationData.galleryImages.map(item => {
              return (
                <SwiperSlide key={item.image}>
                  <img src={item.image}></img>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
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
          galleryImages {
            image
          }
          tripDetails {
            title
            number
          }
        }
      }
    }
  }
`
