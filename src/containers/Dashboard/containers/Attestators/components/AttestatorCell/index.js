import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'

import './index.scss'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import StarRating from '../StarRating'

class AttestatorCell extends Component {

  // Render

  render() {
    const { name, costPerUser, rating, compliance, response, status, logo } = this.props.attestator

    return (
      <div className="attestator-cell">
        <Container fluid className="attestator-cell--container text-center">
          <Row>
            <Col>
              <img src={logo} height="50px" alt="logo"/>
            </Col>

            <Col>
              <b>{name}</b>
            </Col>

            <Col>
              {costPerUser} KIM
            </Col>

            <Col>
              {compliance}
            </Col>

            <Col>
              {response}
            </Col>

            <Col>
              <StarRating
                editing={false}
                name="rating"
                starCount={5}
                value={rating}
                starColor="#005CB9"
                renderStarIcon={() => <Icon icon={faStar} />} />
            </Col>

            <Col>
              <Button disabled>{status ? "Disable" : "Enable"}</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default AttestatorCell