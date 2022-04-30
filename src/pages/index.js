import React, { useState } from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Col, Li } from "react-bootstrap"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import "swiper/css/bundle"
import "swiper/css"
import "swiper/css/navigation"

// Local Components
import CountdownClock from "../components/Countdown"
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
  const [clockIsVisble, setClockIsVisible] = useState(false)

  const recentArticleData = {
    images: [lostInAmericaImage],
    title: "Our Trip is Currently in&nbsp;Progress",
    meta: {
      entryDate: "Sat Apr 30, 2022",
      author: "Ryan and Nikki DuCharme",
    },
    description:
      "Check back soon for more deets on our current journey!<br/><br/> Much love - RND <3",
    buttonPresent: false,
  }

  const tripsData = [
    {
      name: "Florida",
      dates: [""],
      travelType: "Flight",
      coverImage: floridaImage,
      href: "",
    },
    {
      name: "Mexico",
      dates: [""],
      travelType: "Flight",
      coverImage: mexicoImage,
      href: "",
    },
    {
      name: "San Diego",
      dates: [""],
      travelType: "Flight",
      coverImage: sanDiegoImage,
      href: "",
    },
    {
      name: "New York",
      dates: [""],
      travelType: "Flight",
      coverImage: nyImage,
      href: "",
    },
  ]

  return (
    <div className="app">
      {clockIsVisble && (
        <div className="hero hero--fullscreen">
          <CountdownClock setClockIsVisible={setClockIsVisible} />
        </div>
      )}
      {!clockIsVisble && (
        <>
          <Hero />
          <div className="below-the-fold">
            <Layout location={location}>
              <div className="most-recent-article">
                {/* <div className="section__title section__title--light">
                  Most Recent Article
                </div> */}
                <Block data={recentArticleData} />
              </div>
              <div className="padding-offset"></div>
              <div className="section">
                <div className="section__title">Past Trips</div>
                <Row>
                  {tripsData.map(trip => {
                    return (
                      <Col key={trip.name}>
                        <Card>
                          <Card.Img variant="top" src={trip.coverImage} />
                          <Card.Body>
                            <Card.Title>{trip.name}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
                </Row>
              </div>
              <div className="section">
                <div className="section__title">
                  <a href="/gallery">Photo Gallery</a>
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
            </Layout>
          </div>
        </>
      )}
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
