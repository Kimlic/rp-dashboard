import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Container, Row, Col } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import './index.scss'

import unauthorized from 'src/HOC/unauthorized'
import { addToast } from "src/actions/toast"
import * as authSelect from "src/selectors/auth"
import { loginSuccess, loginFailed } from "src/actions/auth"

import PageLogo from './components/PageLogo'
import SignForm from './components/SignForm'
import Toasts from "src/components/Toasts"

// GraphQL

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

// Component

class SignIn extends Component {

  state = {
    credentials: {
      email: '',
      password: ''
    }
  }

  // Handlers

  handleChange = (event) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = (login) => (e) => {
    e.preventDefault()

    const { email, password } = this.state
    login({ variables: { email, password } })
  }

  // Private

  onCompleted = (data) => {
    console.log("INCOMING DATA:", data);
    // loginSuccess(data.login)
    loginSuccess({ token: '123', roles: ['ROLE_ADMIN'], user: { firstName: 'Vasja', lastName: 'Petrov' } })
  }

  onError = (error) => {
    const { addToast } = this.props.actions
    addToast({ text: error.message })

    const action = loginSuccess({ token: '123', roles: ['ROLE_ADMIN'], user: { firstName: 'Vasja', lastName: 'Petrov' } })
    this.props.dispatch(action)
    // loginFailed()

    // localStorage.setItem(AUTH_TOKEN, "123")
    // this.props.history.push('/')
  }

  // Render

  render() {
    const { email, password } = this.state

    return (
      <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }} onCompleted={this.onCompleted} onError={this.onError}>
        {(login, { data }) => {
          return (
            <Container fluid className="signin">
              <Row>
                <Col sm={6} className="vh-100">
                  <PageLogo />
                </Col>

                <Col xs={6} className="vh-100">
                  <SignForm
                    email={email}
                    password={password}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit(login)} />

                  <Toasts />
                </Col>
              </Row>
            </Container>
          )
        }}
      </Mutation>
    )
  }
}

// Export

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addToast }, dispatch)
})

const mapStateToProps = (state) => ({
  isAuthenticating: authSelect.isAuthenticated(state)
})

export default unauthorized(connect(mapStateToProps, mapDispatchToProps)(SignIn))