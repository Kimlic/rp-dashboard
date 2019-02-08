import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Container, Row, Col } from 'reactstrap'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'


import unauthorized from 'src/HOC/unauthorized'
import { addToast } from "src/actions/toast"
import * as authSelect from "src/selectors/auth"
import { loginSuccess, loginFailed } from "src/actions/auth"


import ComponentSignInLogo from 'src/components/ComponentSignInLogo';
import ComponentSignInForm from 'src/components/ComponentSignInForm'
import Toasts from "src/components/Toasts"


import './index.scss';
// import { FormEdit } from 'src/components/FormEdit';


// GraphQL

const M_LOGIN = gql`
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

	renderFormOld = ( login, { data } ) => (
			<Container fluid className="signin">
				<Row>
					<Col sm={6} className="vh-100">
						<ComponentSignInLogo />
					</Col>

					<Col xs={6} className="vh-100">
						<ComponentSignInForm
							email={email}
							password={password}
							handleChange={this.handleChange}
							handleSubmit={this.handleSubmit(login)} />

						<Toasts />
					</Col>
				</Row>
			</Container>
		);

	renderForm = ( login, { data } ) => (
			<div className="signin">
				<ComponentSignInForm
					email={email}
					password={password}
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit(login)} />

				<Toasts />
				<ComponentSignInLogo />
			</div>
		);

	// Render

	render() {
		const { email, password } = this.state

		return (
			<Fragment>
				<Mutation mutation={M_LOGIN} variables={{ email, password }} onCompleted={this.onCompleted} onError={this.onError}>
					{this.renderForm}
				</Mutation>
			</Fragment>
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