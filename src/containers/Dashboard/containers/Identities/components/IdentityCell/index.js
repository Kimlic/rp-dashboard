import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import './index.scss'

import { prettifyDate } from 'src/utils/date'

// Component

class IdentityCell extends Component {

  render() {
    const { firstName, lastName, type, insertedAt, verifiedAt, status } = this.props.document
    let statusStr
    let circleClass

    switch (status) {
      case null:
        statusStr = "Pending"
        circleClass = "circle__pending" 
        break

      case "approved": 
        statusStr = "Verified"
        circleClass = "circle__verified" 
        break

      case "declined":
      case "resubmission_requested": 
        statusStr = "Unverified"
        circleClass = "circle__unverified" 
        break
    }

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
              {prettifyDate(insertedAt)}
            </Col>

            <Col xs={2}>
              {verifiedAt && prettifyDate(verifiedAt)}
            </Col>

            <Col xs={2} className="col__verified">
              <svg xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="5" className={circleClass} />
              </svg>
              <b>{statusStr}</b>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default IdentityCell