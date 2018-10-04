import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { compose } from 'react-apollo'

import './index.scss'

import documentFetchContainer from 'src/graphql/documentFetchContainer'

// Company

class IdentityDetails extends Component {

  render() {
    // const { loading, document } = this.props.documentData
    console.log("DOCUMENT:", this.props.documentData);
    // if (loading || !document) return null
    return null
    
    return (
      <div className="identity-details">
        <Container>
          <Row>
            <Col xs={6}>
              <h5>{`${document.firstName} ${document.lastName}`}</h5>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              Type: {document.type}
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              Country: {document.country}
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              Created: {document.insertedAt}
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              Verified: {document.verifiedAt}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default compose(documentFetchContainer)(IdentityDetails)