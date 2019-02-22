import React, { Component } from 'react';
import Edit from 'src/components/FormEdit';
import Button from 'src/components/FormButton';


class Form extends Component {
	
	render() {
		return (
			<div className='signin__item signin__form'>
				<div className='signin__subitem signin__form_bg'></div>
				<div className='signin__subitem signin__form_fg'>
					<form className='signin__fieldset' onSubmit={this.props.onSubmit}>
						<Edit
							className='signin__edit'
							type='email'
							name='login'
							placeholder='Email'
							value={this.props.login}
							onChange={this.props.onChange}
						/>
						<Edit
							className='signin__edit'
							type='password'
							name='password'
							placeholder='Password'
							value={this.props.password}
							onChange={this.props.onChange}
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
}


export default Form;