import React from "react"
import { Row, Col } from "react-bootstrap"
import ImageGrid from "../ImageGrid"

const Block = ({ data }) => {
  const previewDescription = data.description.substr(0, 100)

  return (
    <Row>
      <Col xs={12} sm={7}>
        {data.images.length > 1 ? (
          <ImageGrid images={data.images}></ImageGrid>
        ) : (
          <div className="block__image">
            <img src={data.images[0]} />
          </div>
        )}
      </Col>
      <Col xs={12} sm={5}>
        <div
          className="block__title"
          dangerouslySetInnerHTML={{
            __html: data.title,
          }}
        />
        <div className="block__meta">
          {data.meta.entryDate} - {data.meta.author}
        </div>
        <div
          className="block__description"
          dangerouslySetInnerHTML={{
            __html: previewDescription,
          }}
        />
        {data.buttonPresent && (
          <div className="block__button">
            <a href={data.buttonDetails.href}>
              {data.buttonDetails.buttonText}
            </a>
          </div>
        )}
      </Col>
    </Row>
  )
}

export default Block
