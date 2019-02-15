import React, { Component } from 'react';
import './index.scss';


class Button extends Component {
	constructor(props) {
		super(props);
	}

	render = () => (
		<input
			{...this.props}
			className={['form-button', this.props.className].join(' ')}
		/>
	);
}


export default Button;