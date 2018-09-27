import React, { Component } from 'react'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import uuidv4 from 'uuid/v4'

import './index.scss'

import logoPlaceholder from 'src/assets/logo_placeholder.svg'
 
// Component

export default class UI extends Component {

  // Handlers

  handleFileChange = (companyId, onLogoChange) => ({ target: { validity, files: [file] } }) => {
    const ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : '.jpg'
    const fileRenamed = new File([file], `${uuidv4()}.${ext}`)
    validity.valid && onLogoChange({ companyId, file: fileRenamed })
  }

  // Render

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
    const { company, logo, onChange, onLogoChange } = this.props
    const { id: companyId, name, email, website, phone, address, details } = company

    return (
      <Container fluid className="settings--details p-0">
        <div className="row row-eq-height">
          <Col sm={9}>
            <div className="settings--details--info">
              <h2>Company Details</h2>

              <Form>
                <Container fluid>
                  {this.renderRowFirst(name, companyId, onChange)}
                  {this.renderRowSecond(website, email, onChange)}
                  {this.renderRowThird(phone, address, onChange)}
                  {this.renderRowForth(details, onChange)}
                </Container>
              </Form>
            </div>
          </Col>

          <Col sm={3}>
            <div className="settings--details--logo">
              <img src={logo.url || logoPlaceholder} className="img img-fluid" alt="logo" />
              <Input id="logo" type="file" placeholder="Change logo" onChange={this.handleFileChange(companyId, onLogoChange)} />
              <Label for="logo">Change logo</Label>
            </div>
          </Col>
        </div>
      </Container>
    )
  }
}