import React, { Component, Fragment } from 'react';
import './MyListFilterForm.scss';


class MyListFilterForm extends Component {
	sortItems = (a, b) => a.index - b.index;
	sortFItems = (a, b) => b.checked - a.checked || a.name.localeCompare(b.name);
	
	mapItem2FItem = (title) => (_, index) => ({
		key: _.key || `filter-form-item-${title}-${_.name}`,
		name: _.name,
		checked: _.state,
		index: index,
	});
	mapFItem2Item = (_) => ({
		name: _.name,
		state: _.checked,
	});

	castItems2FItems(items, title='') {
		try {
			return items.map(this.mapItem2FItem(title)).sort(this.sortFItems);
		} catch (e) {
			return [];
		}
	};
	castFItems2Items(items) {
		try {
			return items.sort(this.sortItems).map(this.mapFItem2Item);
		} catch (e) {
			return [];
		}
	};
	
	constructor(props) {
		super(props);
		this.state = {
			items: this.castItems2FItems(this.props.items, this.props.title),
		};
		this.onCheck = this.onCheck.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	
	onCheck = (event) => {
		const { target } = event;
		const { checked } = target;
		const key = target.getAttribute('data-key');
		const index = Number(target.getAttribute('data-index'));
		try {
			const { items } = this.state;
			const item = items.find( (_) => _.index===index );
			item.checked = checked;
			this.setState({ items: items.sort(this.sortFItems) });
		} catch (e) {
			console.log(key, index, checked, e);
		}
	};
	
	onCancel = () => {};
	onSubmit = () => {};
	
	// onComponentDidMount
	
	render() {
		const items = this.state.items;
		return (
			<form className='filter-form' onSubmit={this.onSubmit}>
				<ul className='filter-form__items' style={{columns: 2}}>
					{items.map(item => (
						<li className='filter-form__item' key={item.key}>
							<label className='filter-form__label'>
								<input
									className='filter-form__input'
									type='checkbox'
									checked={item.checked}
									onChange={this.onCheck}
									data-key={item.key}
									data-index={item.index}
								/>
								<span className='filter-form__checkbox'></span>
								<span className='filter-form__name'>{item.name}</span>
							</label>
						</li>
					))}
				</ul>
				<ul className='filter-form__actions'>
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_clear' type='button' value='Clear filters' /></li>
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_cancel' type='button' value='Cancel' /></li>
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_apply' type='submit' value='Apply' /></li>
				</ul>
			</form>
		);
	};

}


export default MyListFilterForm;