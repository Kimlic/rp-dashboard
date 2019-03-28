import React, { Component, Fragment } from 'react';
import './index.scss';
import Form                           from './Form';
import img1Src                        from 'src/assets/fingerprint.svg';
import img2Src                        from 'src/assets/shild-with-fingerprint+kimlic.svg';


export default class SignIn extends Component {
	constructor(props) {
		super(props);
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			login: '',
			password: '',
		};
		
		this.onTyping = this.onTyping.bind(this);
		this.onLogin  = this.onLogin.bind(this);

		if (this.props.token) {
			this.onLogin(this.props.token);
		}
	};
	
	onChange(event) {
		const { name, value: tvalue } = event.target;
		let svalue = undefined;
		switch(name) {
			case 'login':
				svalue = this.state.login;
				this.setState( { login: tvalue } );
				break;
			case 'password':
				svalue = this.state.password;
				this.setState( { password: tvalue } );
				break;
		}
		this.onTyping(name, svalue, tvalue);
	};
	
	onSubmit(event) {
		event.preventDefault();
		const { login, password } = this.state;
		// TODO: form submit validation
		if (!login || !password) return;
		// TODO: async login and then call onLogin
		setTimeout(() => {
			if (!login || !password) return;
			let token = `${login}:${password}`;
			this.onLogin(token, login, password);
		}, 100);
	};
	
	render() {
		return (
			<div className='signin'>
				<div className='signin__item signin__form'>
					<div className='signin__subitem signin__form_bg'></div>
					<div className='signin__subitem signin__form_fg'>
					<Form
						login={this.state.login}
						password={this.state.password}
						onChange={this.onChange}
						onSubmit={this.onSubmit}
					/>
					</div>
				</div>
				<div className='signin__item signin__logo'>
					<div className='signin__subitem signin__logo_bg'></div>
					<div className='signin__subitem signin__logo_fg'></div>
				</div>
			</div>
		);
	};
	
	onTyping(fieldName, sourceValue, targetValue) {
		const { onTyping } = this.props;
		if(onTyping instanceof Function) {
			onTyping(fieldName, sourceValue, targetValue);
		}
		else if(onTyping===true) {
			console.log(`SignIn.onTyping: ${fieldName}='${sourceValue}' -> '${targetValue}'`);
		}
	}
	
	onLogin(token, login, password) {
		const { onLogin } = this.props;
		if(onLogin instanceof Function) {
			onLogin(token);
		}
		else if(onLogin===true) {
			console.log(`SignIn.onLogin: token=${token}, login='${login}', password='${password}'`);
		}
	}
}