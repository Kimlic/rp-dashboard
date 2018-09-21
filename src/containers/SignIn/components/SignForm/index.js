import React from 'react'
import { Container, Row, Col, Button, Jumbotron, Form, Input } from 'reactstrap'

import fingerprint from '../../assets/fingerprint.svg'
import logo from 'src/assets/rp_logo.svg'

import './index.scss'

// Component

export default ({ email, password, handleChange, handleSubmit }) => (
  <Row className="signin vh-100">
    <img src={fingerprint} className="signin--bg" alt="fingerprint" />

    <Col xs={6} className="signin--content d-flex flex-column justify-content-center">
      <Container className="my-5">
        <Row>
          <Col xs={12} className="d-flex justify-content-center">
            <img src={logo} className="signin--logo img-responsive" alt="logo" />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col xs={12}>
            <Jumbotron className="py-5">
              <Form className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange} />

                <Input
                  className="mt-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange} />

                <Button className="mt-4 mx-auto btn-kimlic" size="lg" color="primary" type="submit">Sign In</Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </Col>
  </Row>
)