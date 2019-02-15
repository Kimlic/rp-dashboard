import React, { Component } from 'react';
import FormEdit from 'src/components/ComponentFormEdit';
import FormButton from 'src/components/ComponentFormButton';
import './index.scss';
import img1Src from 'src/assets/fingerprint.svg';
import img2Src from 'src/assets/shild-with-fingerprint+kimlic.svg';


class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: '',
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {}
	componentWillUnmount() {}
	handleChange() {}

	onSubmit(event) {
		const state = this.state;
		console.log(`Submit: login='${state.login}', password='${state.password}'`);
		event.preventDefault();
	}

	onChange(event) {
		const target = event.target;
		const state = this.state;
		if(target.name==='login') {
			console.log(`Change: login='${state.login}' -> '${target.value}'`);
			this.setState( { login: target.value } );
		}
		else if(target.name==='password') {
			console.log(`Change: password='${state.password}' -> '${target.value}'`);
			this.setState( { password: target.value } );
		}
	}

	render = () => (
		<div className='signin-form'>
			<div className='signin-form__item signin-form__bg'></div>
			<div className='signin-form__item signin-form__fg'>
				<form className='signin-form__fieldset' onSubmit={this.onSubmit}>
					<FormEdit
						className='signin-form__edit'
						type='email'
						name='login'
						placeholder='Email'
						value={this.state.login}
						onChange={this.onChange} />
					<FormEdit
						className='signin-form__edit'
						type='password'
						name='password'
						placeholder='Password'
						value={this.state.password}
						onChange={this.onChange} />
					<FormButton
						className='form-button_submit signin-form__submit'
						type='submit'
						value='Sign In' />
				</form>
			</div>
		</div>
	);
}


export default Form;