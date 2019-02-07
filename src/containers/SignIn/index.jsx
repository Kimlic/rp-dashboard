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


// import PageLogo from './components/PageLogo'
import SignForm from './components/SignForm'
import Toasts from "src/components/Toasts"


import './index.scss'
import logoSrc from 'src/assets/kimlic_logo.svg'
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

	renderFormLogo = () => (
		<div className="signin__log logo">
			<svg className="logo_bg">
				<circle cx="50%" cy="35%" r="100%" fill="purple" className="logo_bg--circle__extralight" />
				<circle cx="50%" cy="35%" r="75%" fill="green" className="logo--bg--circle__light" />
				<circle cx="50%" cy="35%" r="50%" className="logo--bg--circle__medium" />
				<circle cx="50%" cy="35%" r="25%" className="logo--bg--circle__dark"/>
			</svg>

			<img src={logoSrc} className="logo--img img-responsive" alt="logo" />
		</div>
	);

	renderFormOld = ( login, { data } ) => (
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
		);

	renderForm = ( login, { data } ) => (
			<div className="signin">
				<div className="signin__item signin__form">Form</div>
				<div className="signin__item signin__logo logo">
					<svg className="logo_bg">
						<circle cx="50%" cy="35%" r="100%" fill="purple" className="logo_circle-extralight" />
						<circle cx="50%" cy="35%" r="75%" fill="green" className="logo_circle-light" />
						<circle cx="50%" cy="35%" r="50%" className="logo_circle-medium" />
						<circle cx="50%" cy="35%" r="25%" className="logo_circle-dark"/>
					</svg>

					<img src={logoSrc} className="logo--img img-responsive" alt="logo" />
				</div>
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