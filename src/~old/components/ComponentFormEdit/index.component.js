import React, { Component } from 'react';
import './index.scss';


class Edit extends Component {
	constructor(props) {
		super(props);
	}

	render = () => (
		<div className={['form-edit', this.props.className].join(' ')}>
			<div className='form-edit__space'>
				<input
					autoComplete='off'
					{...this.props}
					className='form-edit__input' />
			</div>
		</div>
	);
}


export default Edit;