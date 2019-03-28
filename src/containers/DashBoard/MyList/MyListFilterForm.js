import React, { Component, Fragment } from 'react';
import './MyListFilterForm.scss';


class MyListFilterForm extends Component {
	constructor(props) {
		super(props);
		this.item2state = this.item2state.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onClear = this.onClear.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			states: [],
		};
	};
	
	item2state = (item) => {
		try {
			const { states } = this.state;
			const find = (_) => _.name===item.name;
			return states.find(find).state;
		} catch (e) {
			return item.state;
		}
	};
	
	onCheck = (event) => {
		const { target } = event;
		const { checked: state } = target;
		const name = target.getAttribute('data-name');
		const { states } = this.state;
		try {
			const find = (_) => _.name === name;
			const findIndex = states.findIndex(find);
			if (this.props.items.find(find).state === state) {
				states.splice(findIndex, 1);
			} else {
				states[findIndex].state = state;
			}
		} catch (e) {
			states.push({ name, state: state });
		}
		this.setState({ states: states });
	};
	
	onClear = (event) => {
		event.preventDefault();
		const { items, onClear } = this.props;
		onClear(items.map(_ => Object.assign({}, _, {state: true})));
	};
	
	onCancel = (event) => {
		event.preventDefault();
		const { items, onCancel } = this.props;
		onCancel(items);
	};
	
	onSubmit = (event) => {
		event.preventDefault();
		const { items, onSubmit } = this.props;
		onSubmit(items.map(_ => Object.assign({}, _, {state: this.item2state(_)})));
	};
	
	// onComponentDidMount
	
	render() {
		const { columns, items, title } = this.props;
		const key = (name, title) => {
			const cast = (_) => _.charCodeAt(0);
			const nameNew = [...name].map(cast).join('');
			return `${title}${nameNew}`;
		};
		const map = (_) => ({
			key: key(_.name, title),
			name: _.name,
			state: this.item2state(_),
		});
		const sort = (a, b) => (b.state - a.state) || a.name.localeCompare(b.name);
		const renderItem = (item) => {
			return (
				<li className='my-list-filter-form__item' key={item.key}>
					<label className='my-list-filter-form__label'>
						<input
							className='my-list-filter-form__input'
							type='checkbox'
							checked={item.state}
							onChange={this.onCheck}
							data-name={item.name}
						/>
						<span className='my-list-filter-form__checkbox'></span>
						<span className='my-list-filter-form__name'>{item.name}</span>
					</label>
				</li>
			);
		};
		return (
			<Fragment>
				<form className='my-list-filter-form' onSubmit={this.onSubmit}>
					<span className='my-list-filter-form__triangel'></span>
					<ul className='my-list-filter-form__items' style={{columns: columns || 1}}>
						{items.map(map).sort(sort).map(renderItem)}
					</ul>
					<ul className='my-list-filter-form__actions'>
						<li className='my-list-filter-form__action'><input className='my-list-filter-form__button my-list-filter-form__button_clear' type='button' value='Clear filters' onClick={this.onClear} /></li>
						<li className='my-list-filter-form__action'><input className='my-list-filter-form__button my-list-filter-form__button_cancel' type='button' value='Cancel' onClick={this.onCancel} /></li>
						<li className='my-list-filter-form__action'><input className='my-list-filter-form__button my-list-filter-form__button_apply' type='submit' value='Apply' /></li>
					</ul>
				</form>
				<input
					type="button"
					value="states"
					onClick={() => {
						console.log(this.state.states);
					}}
				/>
			</Fragment>
		);
	};

}


export default MyListFilterForm;