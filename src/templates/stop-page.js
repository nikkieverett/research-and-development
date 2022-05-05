import * as React from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Nav, Tab, Col } from "react-bootstrap"

// Local Components
import Layout from "../components/utils/layout"

const StopPageTemplate = ({ data }) => {
  const { dailyLog, golfing, hiking, lodging, dining, galleryImages } =
    data.markdownRemark.frontmatter

  return (
    <Layout>
      <div></div>
      <div className="stop-cover-image"></div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="daily-log">
        <Row>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="daily-log">Daily Log</Nav.Link>
            </Nav.Item>
            {golfing && (
              <Nav.Item>
                <Nav.Link eventKey="golfing">Golfing</Nav.Link>
              </Nav.Item>
            )}
            {hiking && (
              <Nav.Item>
                <Nav.Link eventKey="hiking">Hiking</Nav.Link>
              </Nav.Item>
            )}
            {lodging && (
              <Nav.Item>
                <Nav.Link eventKey="lodging">Lodging</Nav.Link>
              </Nav.Item>
            )}
            {dining && (
              <Nav.Item>
                <Nav.Link eventKey="dining">Dining</Nav.Link>
              </Nav.Item>
            )}
            {galleryImages && (
              <Nav.Item>
                <Nav.Link eventKey="gallery">Gallery</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="daily-log">
              {dailyLog &&
                dailyLog.map(item => {
                  return (
                    <div className="entry" key={item.title}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Subtitle>{item.date}</Card.Subtitle>
                      {item.content}
                    </div>
                  )
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="golfing">
              {golfing &&
                golfing.map(item => {
                  return (
                    <div className="entry" key={item.title}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Subtitle>{item.date}</Card.Subtitle>
                      <p>{item.content}</p>
                    </div>
                  )
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="hiking">
              {hiking &&
                hiking.map(item => {
                  console.log(item)
                  return (
                    <div className="entry" key={item.title}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Subtitle>{item.date}</Card.Subtitle>
                      <ul className="hike-details">
                        <li>
                          <span>Length</span>: {item.length}
                        </li>
                        <li>
                          <span>Difficulty</span>: {item.difficulty}
                        </li>
                        <li>
                          <span>Elevation Gain</span>: {item.elevation}
                        </li>
                        <li>
                          <span>Time to Complete</span>: {item.time}
                        </li>
                      </ul>
                      <p>{item.content}</p>
                    </div>
                  )
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="lodging">
              {lodging &&
                lodging.map(item => {
                  return (
                    <div className="entry" key={item.title}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Subtitle>{item.date}</Card.Subtitle>
                      <p>{item.content}</p>
                    </div>
                  )
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="dining">
              {dining &&
                dining.map(item => {
                  return (
                    <div className="entry" key={item.title}>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Subtitle>{item.date}</Card.Subtitle>
                      <p>{item.content}</p>
                    </div>
                  )
                })}
            </Tab.Pane>
            <Tab.Pane eventKey="gallery">
              <Row className="gallery">
                {galleryImages &&
                  galleryImages.map(item => {
                    return (
                      <Col xs={12} sm={4} className="column" key={item}>
                        <img src={item}></img>
                      </Col>
                    )
                  })}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </Layout>
  )
}

export default StopPageTemplate

export const pageQuery = graphql`
  query StopBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
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
        location
        dailyLog {
          title
          date
          content
        }
        hiking {
          title
          subtitle
          length
          elevation
          time
          difficulty
          content
          coverImage
        }
        golfing {
          title
          content
          coverImage
        }
        lodging {
          title
          content
          coverImage
        }
        dining {
          title
          content
          coverImage
        }
        galleryImages
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
