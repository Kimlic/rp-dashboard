import React from 'react'
import { Row, Col, Button, Jumbotron, Form, Input } from 'reactstrap'
import { compose } from 'react-apollo'

import fingerprint from '../../assets/fingerprint.svg'

import logoFetchContainer from 'src/graphql/logoFetchContainer'

import './index.scss'

// Component

const component = ({ email, password, handleChange, handleSubmit, logoData }) => (
  <Row className="signin vh-100">
    <img src={fingerprint} className="signin--bg" alt="fingerprint" />

    <Col xs={6} className="signin--content d-flex flex-column justify-content-center text-center">
      {!logoData.loading && logoData.logo && logoData.logo.url && <img src={logoData.logo.url} className="img img-fluid" alt="logo" />}

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
)

export default compose(logoFetchContainer)(component)