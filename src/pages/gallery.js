import * as React from "react"

import Layout from "../components/utils/layout"
import ImageGrid from "../components/ImageGrid"

import { galleryImages } from "../images"
import NavBar from "../components/NavBar"

const GalleryPage = ({ location }) => {
  console.log(galleryImages)
  const row1 = [
    galleryImages[0],
    galleryImages[1],
    galleryImages[2],
    galleryImages[3],
    galleryImages[4],
  ]
  const row2 = [
    galleryImages[5],
    galleryImages[6],
    galleryImages[7],
    galleryImages[8],
    galleryImages[9],
  ]
  const row3 = [
    galleryImages[10],
    galleryImages[11],
    galleryImages[12],
    galleryImages[13],
    galleryImages[14],
  ]
  const row4 = [
    galleryImages[15],
    galleryImages[16],
    galleryImages[17],
    galleryImages[18],
    galleryImages[19],
  ]
  return (
    <>
      <NavBar />
      <Layout location={location}>
        <div className="gallery__container">
          <ImageGrid images={row1} />
          <ImageGrid images={row2} />
          <ImageGrid images={row3} />
          <ImageGrid images={row4} />
        </div>
      </Layout>
    </>
  )
}

export default GalleryPage
