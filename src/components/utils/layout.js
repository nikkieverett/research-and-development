import * as React from "react"
import NavBar from "../NavBar"

const Layout = ({ children }) => {
  return (
    <>
      <div className="global-wrapper">
        <NavBar />
        <main>{children}</main>
      </div>
      <footer>Outdoor RND © {new Date().getFullYear()}</footer>
    </>
  )
}

export default Layout
