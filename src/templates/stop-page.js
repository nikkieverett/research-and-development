import * as React from "react"
import { graphql } from "gatsby"

// Third Party
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Stack,
  Tabs,
  Tab,
  TabContainer,
  TabContent,
} from "react-bootstrap"

// Local Components
import NavBar from "../components/NavBar"

const StopPageTemplate = ({ data }) => {
  const { dailyLog, golfing, hiking, lodging, location } =
    data.markdownRemark.frontmatter

  return (
    <>
      <NavBar />
      <TabContainer>
        <Tabs
          defaultActiveKey="daily-log"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="daily-log" title="Daily Log">
            <Container>
              {dailyLog &&
                dailyLog.map(log => {
                  return (
                    <div className="entry">
                      <Card.Title>{log.title}</Card.Title>
                      <Card.Subtitle>{log.date}</Card.Subtitle>
                      <p dangerouslySetInnerHTML={{ __html: log.content }}></p>
                    </div>
                  )
                })}
            </Container>
          </Tab>
          <Tab eventKey="golg" title="Golf" disabled={!golfing}>
            <Container>
              {golfing &&
                golfing.map(log => {
                  return (
                    <>
                      <Card.Title>{log.title}</Card.Title>
                      <Card.Subtitle>{log.date}</Card.Subtitle>
                      <p dangerouslySetInnerHTML={{ __html: log.content }}></p>
                    </>
                  )
                })}
            </Container>
          </Tab>
          <Tab eventKey="hiking" title="Hiking" disabled={!hiking}>
            <Container>
              {hiking &&
                hiking.map(log => {
                  return (
                    <>
                      <Card.Title>{log.title}</Card.Title>
                      <Card.Subtitle>{log.date}</Card.Subtitle>
                      <p dangerouslySetInnerHTML={{ __html: log.content }}></p>
                    </>
                  )
                })}
            </Container>
          </Tab>
          <Tab eventKey="lodging" title="Lodging" disabled={!lodging}>
            <Container>
              {lodging &&
                lodging.map(log => {
                  return (
                    <>
                      <Card.Title>{log.title}</Card.Title>
                      <Card.Subtitle>{log.date}</Card.Subtitle>
                      <p dangerouslySetInnerHTML={{ __html: log.content }}></p>
                    </>
                  )
                })}
            </Container>
          </Tab>
        </Tabs>
      </TabContainer>
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
