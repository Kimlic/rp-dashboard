import React, { PureComponent } from 'react'
import { Container, Row, Col, Jumbotron, Form, FormGroup, Input } from 'reactstrap'

import logo from 'src/assets/rp_logo.svg'

import ImageUploadModal from '../ImageUploadModal'

// Component

export default class UI extends PureComponent {

  renderRowFirst = (name, id, onChange) => (
    <FormGroup row>
      <Col sm={6}>
        <Input type="text" name="name" id="name" placeholder="Company Name" bsSize="md" value={name} onChange={onChange} />
      </Col>
      <Col sm={6}>
        <Input type="text" name="id" id="id" placeholder="Client ID" bsSize="md" disabled value={id} onChange={onChange} />
      </Col>
    </FormGroup>
  )

  renderRowSecond = (website, email, onChange) => (
    <FormGroup row>
      <Col sm={6}>
        <Input type="url" name="website" id="website" placeholder="Website URL" bsSize="md" value={website} onChange={onChange} />
      </Col>

      <Col sm={6}>
        <Input type="email" name="email" id="email" placeholder="Email Address" bsSize="md" value={email} onChange={onChange} />
      </Col>
    </FormGroup>
  )

  renderRowThird = (phone, address, onChange) => (
    <FormGroup row>
      <Col sm={6}>
        <Input type="phone" name="phone" id="phone" placeholder="Contact Phone" bsSize="md" value={phone} onChange={onChange} />
      </Col>

      <Col sm={6}>
        <Input type="string" name="address" id="address" placeholder="Address" bsSize="md" value={address} onChange={onChange} />
      </Col>
    </FormGroup>
  )

  renderRowForth = (details, onChange) => (
    <FormGroup row>
      <Col sm={12}>
        <Input type="textarea" name="details" id="details" placeholder="Company Details" value={details} onChange={onChange} />
      </Col>
    </FormGroup>
  )

  render() {
    const { company, onChange } = this.props
    const { id, name, email, website, phone, address, details } = company

    return (
      <Container fluid className="settings--details">
        <Row>
          <Col sm={10}>
            <Jumbotron>
              <h2>Company Details</h2>

              <Form>
                <Container fluid>
                  {this.renderRowFirst(name, id, onChange)}
                  {this.renderRowSecond(website, email, onChange)}
                  {this.renderRowThird(phone, address, onChange)}
                  {this.renderRowForth(details, onChange)}
                </Container>
              </Form>
            </Jumbotron>
          </Col>

          <Col sm={2} className="text-center">
            <img src={logo} className="img-responsive mb-4" alt="logo" />
            <ImageUploadModal />
          </Col>
        </Row>
      </Container>
    )
  }
}