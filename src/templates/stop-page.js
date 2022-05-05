import * as React from "react"
import { graphql } from "gatsby"

// Third Party
import { Card, Row, Nav, Tab } from "react-bootstrap"

// Local Components
import NavBar from "../components/NavBar"
import Layout from "../components/utils/layout"

const StopPageTemplate = ({ data }) => {
  const { dailyLog, golfing, hiking, lodging, dining } =
    data.markdownRemark.frontmatter

  return (
    <>
      <NavBar />
      <Layout>
        <div></div>
        <div className="stop-cover-image"></div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="daily-log">
          <Row>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="daily-log">Daily Log</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="golfing">Golfing</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="hiking">Hiking</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="lodging">Lodging</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="dining">Dining</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="daily-log">
                {dailyLog &&
                  dailyLog.map(item => {
                    return (
                      <div className="entry">
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle>{item.date}</Card.Subtitle>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </div>
                    )
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="golfing">
                {golfing &&
                  golfing.map(item => {
                    return (
                      <>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle>{item.date}</Card.Subtitle>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </>
                    )
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="hiking">
                {hiking &&
                  hiking.map(item => {
                    return (
                      <>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle>{item.date}</Card.Subtitle>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </>
                    )
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="lodging">
                {lodging &&
                  lodging.map(item => {
                    return (
                      <>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle>{item.date}</Card.Subtitle>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </>
                    )
                  })}
              </Tab.Pane>
              <Tab.Pane eventKey="dining">
                {dining &&
                  dining.map(item => {
                    return (
                      <>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Subtitle>{item.date}</Card.Subtitle>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        ></p>
                      </>
                    )
                  })}
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </Layout>
    </>
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
