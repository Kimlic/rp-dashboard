import React, { Component } from 'react';
import './index.scss';


export default class MyEdit extends Component {
	render() {
		const { className, autoComplete, ...props } = this.props;
		return (
			<div className={ [ 'my-edit', className ].join( ' ' ) }>
				<div className='my-edit__space'>
					<input
						className='my-edit__input'
						autoComplete={ autoComplete || 'off' }
						{ ...props }
					/>
				</div>
			</div>
		);
	};
	
}