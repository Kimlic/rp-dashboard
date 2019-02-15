import React, { Component } from 'react';
import Edit from 'src/components/FormEdit';
import Button from 'src/components/FormButton';


class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	};
	
	render() {
		return (
			<div className='signin__item signin__form'>
				<div className='signin__subitem signin__form_bg'></div>
				<div className='signin__subitem signin__form_fg'>
					<form className='signin__fieldset' onSubmit={ this.onSubmit }>
						<Edit
							className='signin__edit'
							type='email'
							name='login'
							placeholder='Email'
							value={ this.state.login }
							onChange={ this.onChange }
						/>
						<Edit
							className='signin__edit'
							type='password'
							name='password'
							placeholder='Password'
							value={ this.state.password }
							onChange={ this.onChange }
						/>
						<Button
							className='signin__submit'
							type='submit'
							value='Sign In'
						/>
					</form>
				</div>
			</div>
		);
	};
	
	onChange(event) {
		const { onChange } = this.props;
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
		if (onChange) onChange( { name, svalue, tvalue, } );
	};
	
	onSubmit(event) {
		event.preventDefault();
		const { onSubmit } = this.props;
		const { login, password } = this.state;
		if (onSubmit && login && password) onSubmit(login, password);
	};
	
	componentDidMount() {};
	componentWillUnmount() {};
	
}


export default Form;