import React from "react"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <a href="/">
              <span className="logo" />
              Outdoor RND
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Trips" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/southwest-roadtrip">
                  Southwest Roadtrip
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
