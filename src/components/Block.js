import React, { useState } from "react"
import { Row, Col } from "react-bootstrap"
import ImageGrid from "./ImageGrid"

const Block = ({ data }) => {
  console.log(data)
  return (
    <Row>
      <Col xs={12} sm={7}>
        <ImageGrid images={data.images}></ImageGrid>
      </Col>
      <Col xs={12} sm={5}>
        <div className="block__title">{data.title}</div>
        <div className="block__meta">
          {data.meta.entryDate} - {data.meta.author}
        </div>
        <div
          className="block__description"
          dangerouslySetInnerHTML={{ __html: data.description }}
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
