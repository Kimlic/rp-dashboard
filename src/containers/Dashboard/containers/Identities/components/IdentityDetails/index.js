import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  CardDeck, Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, CardGroup, Button
} from 'reactstrap'

import { prettifyDate } from 'src/utils/date'
import documentFetchContainer from 'src/graphql/documentFetchContainer'

// Company

class IdentityDetails extends Component {

  render() {
    const { loading, document } = this.props.documentData
    if (loading || !document) return <div></div>
    console.log("DOCUMENT:", this.props.documentData);

    return (
      <div className="identity-details">
        <Container>
          <Row>
            <Col xs={12}>
              <h5>{`${document.firstName} ${document.lastName}`}</h5>
            </Col>
          </Row>

          <Row>
            <Col xs={6}>
              Type: {document.type}
            </Col>

            <Col xs={6}>
              Country: {document.country}
            </Col>
          </Row>

          <Row className="my-2">
            <Col xs={6}>
              Created: {prettifyDate(document.insertedAt)}
            </Col>

            {document.verifiedAt && <Col xs={6}>
              Verified: {prettifyDate(document.verifiedAt)}
            </Col>}
          </Row>
        </Container>

        <div className="identity-details--photos">
          <CardGroup>
            {document.photos.map(photo => {
              return (
                <Card>
                  <CardImg top width="100%" src={photo.url} alt={photo.type} />
                  <CardBody>
                    <CardSubtitle>{photo.type}</CardSubtitle>
                  </CardBody>
                </Card>
              )
            })}
          </CardGroup>
        </div>
      </div>
    )
  }
}

export default documentFetchContainer(IdentityDetails)