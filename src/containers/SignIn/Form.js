import React, { Component } from 'react';
import MyEdit               from 'src/components/MyEdit';
import MyButton             from 'src/components/MyButton';


export default class Form extends Component {
	
	render() {
		return (
			<form
				className='signin__fieldset'
				onSubmit={this.props.onSubmit}
			>
				<MyEdit
					className='signin__edit'
					type='email'
					name='login'
					placeholder='Email'
					value={this.props.login}
					onChange={this.props.onChange}
				/>
				<MyEdit
					className='signin__edit'
					type='password'
					name='password'
					placeholder='Password'
					value={this.props.password}
					onChange={this.props.onChange}
				/>
				<MyButton
					className='signin__submit'
					type='submit'
					value='Sign In'
				/>
			</form>
		);
	};
}