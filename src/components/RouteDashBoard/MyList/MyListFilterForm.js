import React, { Component, Fragment } from 'react';
import './MyListFilterForm.scss';


const cmpTo = (asc = true) => asc ? 1 : -1;
const cmpS = (a, b) => a.localeCompare(b);
const cmpBy = (by, a, b, s) => s ? cmpS(a[by], b[by]) : (a[by]-b[by]);
const cmpOne = (_) => (a, b) => cmpBy(_.by, a, b, _.s) * cmpTo(_.asc);
const cmpAll = (_, ...all) => (a, b) => cmpOne(_) || cmpAll(...all)(a, b);
const mapProps2Items = (title = '') => (_, index) => ({
	key: _.key || `filter-form-item-${title}-${_.name}`,
	name: _.name,
	checked: _.state,
	index: index,
});
const mapItems2Props = (_) => ({
	name: _.name,
	state: _.checked,
});

class MyListFilterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onCheck = this.onCheck.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		try {
			this.state.items = props.items
				.map(mapProps2Items(props.title))
				.sort(cmpAll({by:'checked', asc:true}, {by:'name', asc:true}));
		} catch (e) {
			this.state.items = [];
		}
	}
	
	onCheck = (event) => {
		const { target } = event;
		const { checked } = target;
		const key = target.getAttribute('data-key');
		const index = Number(target.getAttribute('data-index'));
		try {
			const { items } = this.state;
			items.find( (_) => _.index===index ).checked = checked;
			this.setState({ items: items.sort(this.sortFItems) });
		} catch (e) {
			console.log(key, index, checked, e);
		}
	};
	
	onCancel = () => this.props.onCancal(
		this.state.items
			.sort(cmpAll({by: 'index'}))
			.map(mapItems2Props)
	);
	
	onSubmit = () => this.props.onSubmit(
		this.state.items
			.sort(cmpAll({by: 'index'}))
			.map(mapItems2Props)
	);
	
	// onComponentDidMount
	
	render() {
		const items = this.state.items;
		return (
			<form className='filter-form' onSubmit={this.onSubmit}>
				<span className='filter-form__triangel'></span>
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