import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import './index.scss'

class IdentityCell extends Component {

  // Private

  prettifyDate = (dateStr) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: 'numeric', 
      minute: 'numeric'
    }).format(date)
  }

  // Render

  render() {
    const { firstName, lastName, type, insertedAt, verifiedAt, verified } = this.props.document

    return (
      <div className="identity-cell">
        <Container fluid className="identity-cell--container text-center">
          <Row>
            <Col xs={2}>
              <b>{firstName} {lastName}</b>
            </Col>

            <Col xs={2}>
              <b>Veriff</b>
            </Col>

            <Col xs={2}>
              {type}
            </Col>

            <Col xs={2}>
              {this.prettifyDate(insertedAt)}
            </Col>

            <Col xs={2}>
              {verifiedAt && this.prettifyDate(verifiedAt)}
            </Col>

            <Col xs={2} className="col__verified">
              <svg xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="5" className={verified ? "circle__verified" : "circle__unverified"} />
              </svg>
              <b>{verified ? "Verified" : "Unverified"}</b>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default IdentityCell