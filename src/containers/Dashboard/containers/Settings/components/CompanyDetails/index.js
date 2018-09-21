import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Form, FormGroup, Input, Button } from 'reactstrap'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import logo from 'src/assets/rp_logo.svg'

import ImageUploadModal from '../ImageUploadModal'

// Component

const COMPANY_DETAILS = gql`
  {
    settings {
      company_details {
        id,

      }
    }
  }
`

class CompanyDetails extends Component {

  // Render

  renderPage = (details) => {
    console.log("DETAILS: ", details);

    return (
      <Container fluid>
        <Row>
          <Col sm={10}>
            <Jumbotron>
              <h2>Company Details</h2>

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
                      <Input type="url" name="website" id="website" placeholder="Website URL" bsSize="md" />
                    </Col>

                    <Col sm={6}>
                      <Input type="email" name="email" id="email" placeholder="Email Address" bsSize="md" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col sm={6}>
                      <Input type="phone" name="phone" id="phone" placeholder="Contact Phone" bsSize="md" />
                    </Col>

                    <Col sm={6}>
                      <Input type="string" name="address" id="address" placeholder="Address" bsSize="md" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col sm={12}>
                      <Input type="textarea" name="details" id="details" placeholder="Company Details" />
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
          </Col>

          <Col sm={2} className="text-center">
            <img src={logo} className="img-responsive" alt="logo" />
            <ImageUploadModal />
          </Col>
        </Row>
      </Container>
    )
  }

  render() {
    return (
      <Query query={COMPANY_DETAILS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const details = data.settings.company_details

          return (
            <div className="settings--details">
              {this.renderPage(details)}
            </div>
          )
        }}
      </Query>
    )
  }
}

// Export

export default CompanyDetails