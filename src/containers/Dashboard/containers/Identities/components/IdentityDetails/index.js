import React, { Component } from 'react'

class IdentityDetails extends Component {

  render() {
    const document = this.props.document
    if (!document) return null
    console.log(document);
    
    return (
      <div className="identity-details">
        <Container fluid>
          <Row>
            <Col xs={6}>
              <h3>{`${document.firstName} ${document.lastName}`}</h3>
            </Col>
          </Row>
        </Container>
        
      </div>
    )
  }
}

export default IdentityDetails