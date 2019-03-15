import React, { Component, Fragment } from 'react';
import './MyListFilterForm.scss';


const cmpTo = (asc = true) => asc ? 1 : -1;
const cmpS = (a, b) => a.localeCompare(b);
const cmpBy = (by, a, b, s) => s ? cmpS(a[by], b[by]) : (a[by]-b[by]);
const cmpOne = (_) => (a, b) => cmpBy(_.by, a, b, _.s) * cmpTo(_.asc);
const cmpAll = (...all) => {
	all = all.map(_ => cmpOne(_));
	return (a, b) => all.map(_ => _(a,b)).filter(_ => _!==0).shift() || 0;
};
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
		this.onCheck = this.onCheck.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.cmpItemsIn = cmpAll(
			{ by:'checked', asc:false, s: false },
			{ by:'name', asc:true, s: true },
		).bind(this);
		this.cmpItemsOut = cmpAll(
			{ by: 'index', asc: true, s: false },
		).bind(this);
		let { columns, items, title } = this.props;
		this.state = {
			columns: columns || 1,
			items: items.map(mapProps2Items(title))
				.sort(this.cmpItemsIn),
			title: title,
		};
	};
	
	onCheck = (event) => {
		const { target } = event;
		const { checked } = target;
		const key = target.getAttribute('data-key');
		// const index = Number(target.getAttribute('data-index'));
		const { items } = this.state;
		items.find( (_) => _.key===key ).checked = checked;
		this.setState({ items: items.sort(this.cmpItemsIn) });
	};
	
	onClear = (event) => {
		event.preventDefault();
		const { onClear } = this.props;
		const { items } = this.state;
		const map = (_) => {
			_.checked = true;
			return _;
		};
		onClear(items.map(map).sort(this.cmpItemsOut).map(mapItems2Props));
	};
	
	onCancel = (event) => {
		event.preventDefault();
		const { items, onCancel } = this.props;
		onCancel(items.sort(this.cmpItemsOut));
	};
	
	onSubmit = (event) => {
		event.preventDefault();
		const { onSubmit } = this.props;
		const { items } = this.state;
		onSubmit(items.sort(this.cmpItemsOut).map(mapItems2Props));
	};
	
	// onComponentDidMount
	
	render() {
		const { columns, items } = this.state;
		return (
			<form className='filter-form' onSubmit={this.onSubmit}>
				<span className='filter-form__triangel'></span>
				<ul className='filter-form__items' style={{columns: columns}}>
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
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_clear' type='button' value='Clear filters' onClick={this.onClear} /></li>
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_cancel' type='button' value='Cancel' onClick={this.onCancel} /></li>
					<li className='filter-form__action'><input className='filter-form__button filter-form__button_apply' type='submit' value='Apply' /></li>
				</ul>
			</form>
		);
	};

}


export default MyListFilterForm;