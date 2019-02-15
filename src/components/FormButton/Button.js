import React, { Component } from 'react';
import './Button.scss';


class Button extends Component {
	render() {
		let { className: cn, ...props } = this.props;
		return (
			<input
				className={ [' form-button', cn ].join( ' ' ) }
				{ ...props }
			/>
		);
	};
	
}


export default Button;