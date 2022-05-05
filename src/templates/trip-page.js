import * as React from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Col, Button, Container, Stack } from "react-bootstrap"

// Local Components
import NavBar from "../components/NavBar"
import Layout from "../components/utils/layout"

const TripTemplatePage = ({ data }) => {
  const tripDetails = data.markdownRemark.frontmatter
  const visibleStops = tripDetails.stops
    .reverse()
    .filter(item => item.published)

  return (
    <div className="app">
      <div className="trip-page">
        <NavBar />
        <Layout>
          <Stack gap={3}>
            {visibleStops.map((stop, index) => {
              if (stop.published) {
                const parsedStopName =
                  stop.city.replace(" ", "-").toLowerCase() +
                  "-" +
                  stop.state.toLowerCase()
                return (
                  <Card className={index === 0 ? "card--active" : ""}>
                    <Card.Img variant="top" src={stop.coverImage}></Card.Img>
                    <Card.Body>
                      <Row>
                        <Col xs={8}>
                          <Card.Title>
                            {stop.city}, {stop.state}
                          </Card.Title>
                          <Card.Text>
                            {stop.startDate} - {stop.endDate}
                          </Card.Text>
                        </Col>
                        <Col xs={4}>
                          <div className="card__button">
                            <Button
                              href={`/${parsedStopName}`}
                              variant="primary"
                            >
                              Stop Details
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )
              }
            })}
          </Stack>
        </Layout>
      </div>
    </div>
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
          coverImage
          published
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
