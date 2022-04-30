import React from "react"

const ImageGrid = ({ images }) => {
  return (
    <div className="image-grid__container">
      {images.map((image, index) => {
        return (
          <div className="image-grid__item" key={image + index}>
            <img src={image} />
          </div>
        )
      })}
    </div>
  )
}

export default ImageGrid
