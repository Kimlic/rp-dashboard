import React, { Component, Fragment } from 'react';
import './MyListFilterForm.scss';


class MyListFilterForm extends Component {
	render() {
		items = (this.props.items || []).map(item => Object.assign({}, item));
		
		const li = (item, index) => (
			<li>
				<label>
					<input type='checkbox' className='filter-form__checkbox' />
					{}
					</label>
			</li>
		);
		const ul = (items) => items.map(li);
		return (
			<Fragment>
				<form className='filter-form'>{ul(items)}</form>
			</Fragment>
		);
	};

}


export default MyListFilterForm;