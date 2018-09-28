import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import './index.scss'

class IdentityCell extends Component {

  // Render

  render() {
    const { firstName, lastName, type, insertedAt, verifiedAt, verified } = this.props.document

    const insertionTime = new Date(insertedAt)
    const prettyInsertionTime = new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: 'numeric', 
      minute: 'numeric'
    }).format(insertionTime)

    const verifiedTime = new Date(verifiedAt)
    const prettyVerifiedTime = new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: '2-digit',
      hour: 'numeric', 
      minute: 'numeric'
    }).format(verifiedTime)

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
              {prettyInsertionTime}
            </Col>

            <Col xs={2}>
              {prettyVerifiedTime}
            </Col>

            <Col xs={2} className="col__verified">
              <svg xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="5" className={verified ? "circle__verified" : "circle__unverified"} />
              </svg>
              <b>{verified ? "Verified" : "Not verified"}</b>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default IdentityCell