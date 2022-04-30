import React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"

const NavBar = () => {
  return (
    <>
      <Navbar fixed="top" expand="lg">
        <Container>
          <Navbar.Brand>
            <span className="logo" />
            Outdoor RND
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              {/* <Nav.Link href="/articles">
                Articles
              </Nav.Link>
              <Nav.Link href="/trips">
                Trips
              </Nav.Link> */}
              <Nav.Link href="/gallery">Gallery</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
