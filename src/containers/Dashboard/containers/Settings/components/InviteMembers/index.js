import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Label, Input, Button } from 'reactstrap'

// Component

class InviteMembers extends Component {

  // Render

  render() {
    return (
      <div className="settings--invite">
        <Container fluid>
          <Jumbotron>
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

              <Row>
                <Col sm={{ size: 2, offset: 10 }} className="text-right">
                  <Button className="btn-kimlic" size="lg" color="primary">Invite</Button>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    )
  }
}

// Export

export default InviteMembers