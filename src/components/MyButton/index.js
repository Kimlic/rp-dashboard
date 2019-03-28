import React, { Component } from 'react';
import './index.scss';


export default class MyButton extends Component {
	render() {
		let { className, ...props } = this.props;
		return (
			<input
				className={ ['my-button', className ].join( ' ' ) }
				{ ...props }
			/>
		);
	};
	
}