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
import Block from "../components/Block"
import Hero from "../components/Hero"

// Images
import {
  nyImage,
  sanDiegoImage,
  floridaImage,
  mexicoImage,
  lostInAmericaImage,
  partialGallery,
} from "../images"

const HomePage = ({ data, location }) => {
  const locationData = data.allMarkdownRemark.nodes[0].frontmatter

  console.log(locationData)
  return (
    <div className="app">
      <NavBar />
      <Container>
        <div className="section">
          <div className="current-location-block">
            <Card>
              <Card.Img variant="top" src={lostInAmericaImage} />
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
          {locationData.tripDetails.map(item => {
            return (
              <Card className="trip-counter__card">
                <Stack gap={1}>
                  <div className="trip-counter__number">{item.number}</div>
                  <div className="trip-counter__title">{item.title}</div>
                </Stack>
              </Card>
            )
          })}
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
            {partialGallery.map(image => {
              return (
                <SwiperSlide key={image}>
                  <img src={image}></img>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </Container>
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
          tripDetails {
            title
            number
          }
        }
      }
    }
  }
`
