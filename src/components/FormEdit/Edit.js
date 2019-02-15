import React, { Component } from 'react';
import './Edit.scss';


class Edit extends Component {
	render() {
		let { className: cn, autoComplete: ac, ...props } = this.props;
		return (
			<div className={ [ 'form-edit', cn ].join( ' ' ) }>
				<div className='form-edit__space'>
					<input
						className='form-edit__input'
						autoComplete={ ac ? ac : 'off' }
						{ ...props }
					/>
				</div>
			</div>
		);
	};
	
}


export default Edit;