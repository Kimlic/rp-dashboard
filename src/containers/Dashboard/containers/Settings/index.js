import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Form, FormGroup, CustomInput, Label, Input, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import './index.scss'

import { role, roleLabel } from 'src/constants/auth'

import ImageUploadModal from './components/ImageUploadModal'

// Component

class Settings extends Component {

  state = {
    dropdownOpen: false
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  // Render

  renderCompanySettings = () => (
    <div className="settings--company">
      <Jumbotron>
        <h2>Basic Information</h2>

        <Form>
          <Container fluid>
            <FormGroup row>
              <Col sm={6}>
                <Input type="text" name="name" id="name" placeholder="Company Name" bsSize="md" />
              </Col>
              <Col sm={6}>
                <Input type="text" name="client" id="client" placeholder="Client ID" bsSize="md" disabled />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={6}>
                <Input type="url" name="domain" id="domain" placeholder="Domain Address" bsSize="md" />
              </Col>

              <Col sm={6}>
                <Input type="text" name="session" id="session" placeholder="Session Type" bsSize="md" />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={6}>
                <Input type="email" name="email" id="email" placeholder="Email Address" bsSize="md" />
              </Col>

              <Col sm={6}>
                <ImageUploadModal />
              </Col>
            </FormGroup>

            <Row>
              <Col sm={{ size: 2, offset: 10 }} className="text-right">
                <Button className="mt-4 mx-auto btn-kimlic" size="lg" color="primary" type="submit">Submit</Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Jumbotron>
    </div>
  )

  renderAccessManagement = (members) => (
    <div className="settings--access">
      <Jumbotron>
        <h2>Basic Information</h2>

        <Container fluid>
          {members.map((el, idx) => {
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
              <Button className="mt-4 mx-auto btn-kimlic" size="lg" color="primary">Invite</Button>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  )

  render() {
    const members = [
      { email: "aaa@aaa.com", role: role.admin },
      { email: "bbb@bbb.com", role: role.member },
      { email: "ccc@ccc.com", role: role.member },
      { email: "ddd@ddd.com", role: role.member }
    ].map((el) => {
      return { ...el, role: roleLabel[el.role] }
    })
    const memberList = members.reduce((acc, el, idx) => {
      if (idx % 2 === 0) acc.push([members[idx], members[idx + 1]])
      return acc
    }, [])

    return (
      <div className="settings">
        {this.renderCompanySettings()}
        {this.renderAccessManagement(memberList)}
      </div>
    )
  }
}

export default Settings