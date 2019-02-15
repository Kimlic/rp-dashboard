import React, { Component, Fragment } from 'react';
import Logo from './SignInLogo';
import Form from './SignInForm';
import './SignIn.scss';
import img1Src from 'src/assets/fingerprint.svg';
import img2Src from 'src/assets/shild-with-fingerprint+kimlic.svg';


class SignIn extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		if (this.props.getToken() ) {
			this.props.onLogin(this.props.getToken());
		}
	};
	
	render() {
		return (
			<div className='signin'>
				<Form
					onSubmit={ this.onSubmit(this.props.onLogin) }
					onChange={ this.onChange }
				/>
				<Logo />
			</div>
		);
	};
	
	onChange(change) {
		const { onChange } = this.props;
		if (onChange) {
			onChange(change);
		}
		else {
			const { name, svalue, tvalue } = change;
			console.log(`Change: ${name}='${svalue}' -> '${tvalue}'`);
		}
	};
	
	onSubmit = (onLogin) => (login, password) => {
		console.log(`Submit: login='${login}', password='${password}'`);
		if (onLogin) {
			if (login && password) {
			
			}
			// TODO: async login and then call onLogin
			setTimeout(() => {
				if (login==='1@2.3' && password==='123') {
					let token = `${login}:${password}`;
					onLogin( token );
				}
				else {
					onLogin( );
				}
			}, 100);
		}
		else {
			console.log('onLogin: unspecified');
		}
	};
	
}


export default SignIn;