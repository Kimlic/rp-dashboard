import React, { Component, Fragment } from 'react';
import Logo from 'src/components/ComponentSignInLogo';
import Form from 'src/components/ComponentSignInForm';
// import Toasts from 'src/components/Toasts';
import './index.scss';


class SignIn extends Component {
					// email={email}
					// password={password}
					// onChange={this.handleChange}
					// onSubmit={this.handleSubmit(login)} 
				// <Toasts />
	render = () => {
		return (
			<div className='signin'>
				<div className='signin__form'>
					<Form
						/>
				</div>
				<div className='signin__logo'>
					<Logo />
				</div>
			</div>
		);
	}
}

export default SignIn