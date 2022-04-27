import React, { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid__container">
      {images.map(image => {
        return (
          <div className="image-grid__item">
            <img src={image} />
          </div>
        )
      })}
    </div>
  )
}

export default ImageGrid
