import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Label, Input, Button } from 'reactstrap'

import './index.scss'

// Component

class InviteMembers extends Component {

  // Render

  render() {
    return (
      <div className="settings--invite">
        <h2>Members Information</h2>
        
        <Container fluid>
          {this.props.members.map((el, idx) => {
            return (
              <Row key={idx}>
                <Col sm={6}>
                  <Label for="email">{el[0]['role']}</Label>
                  <Input type="email" name="email" id="email" placeholder="Email" value={el[0]['email']} bsSize="md" />
                </Col>

                {el[1] && <Col sm={6}>
                  <Label for="email">{el[1]['role']}</Label>
                  <Input type="email" name="email" id="email" placeholder="Email" value={el[1]['email']} bsSize="md" />
                </Col>}
              </Row>
            )
          })}
        </Container>

        <Button className="btn-kimlic" size="lg" color="primary">Invite</Button>
      </div>
    )
  }
}

// Export

export default InviteMembers