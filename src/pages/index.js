import React, { useEffect, useState, useRef } from "react"
import { graphql } from "gatsby"

import CountdownClock from "../components/Countdown/CountdownClock"
import Layout from "../components/utils/layout"
import Block from "../components/Block"
import Image1 from "../images/post-photos/lost-in-america-1.jpeg"
import Image2 from "../images/post-photos/lost-in-america-2.jpeg"
import Image3 from "../images/post-photos/lost-in-america-3.webp"
import Image4 from "../images/post-photos/lost-in-america-4.jpg"
import Image5 from "../images/post-photos/lost-in-america-5.jpeg"

const HomePage = ({ data, location }) => {
  const [clockIsVisble, setClockIsVisible] = useState(true)
  const belowTheFoldRef = useRef(null)

  const introData = {
    images: [Image1, Image2, Image3, Image4, Image5],
    title: "Let's get lost in America",
    meta: {
      entryDate: "Sat Apr 30, 2022",
      author: "Ryan and Nikki DuCharme",
    },
    description:
      "It's only proper that we start this thing off with an introduction. For those of you who have decided to follow along, welcome! You're in for a good time. Much like the movie, Lost in America, Ryan and I have decided to <em>drop out of society</em> for a bit. Our bags are packed, and we are hitting the road for one of our most exciting adventures to date. Join us on our trek through the southwest, and stay tuned here for updates from our trip.<br/><br/>Much love, RND",
    buttonPresent: false,
  }

  useEffect(() => {
    if (!clockIsVisble && belowTheFoldRef.current) {
      belowTheFoldRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [clockIsVisble, belowTheFoldRef])

  return (
    <div className="app">
      <div className="hero fullscreen">
        {clockIsVisble && (
          <CountdownClock setClockIsVisible={setClockIsVisible} />
        )}
        {!clockIsVisble && <div className="welcome">Welcome</div>}
      </div>
      {!clockIsVisble && (
        <div className="below-the-fold fullscreen" ref={belowTheFoldRef}>
          <Layout location={location}>
            <Block data={introData} />
          </Layout>
        </div>
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
