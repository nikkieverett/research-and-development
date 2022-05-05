import * as React from "react"

const Layout = ({ children }) => {
  return (
    <>
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
      <footer>Outdoor RND © {new Date().getFullYear()}</footer>
    </>
  )
}

export default Layout
