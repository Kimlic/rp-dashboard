import React, { Component, Fragment } from 'react';
import './index.scss';
import MyListFilterForm               from '../DashBoard/MyList/MyListFilterForm';
import mockMyListFilter               from
	                                      '../DashBoard/MyList/MyListFilterForm-mock';
import  MyList                        from '../DashBoard/MyList/MyList';
import mockMyList                     from '../DashBoard/MyList/MyListFilterForm-mock';


const print = (items, title = 'print') => {
	const map = _ => console.log('\t', _.name, +_.state);
	console.log(`${title}:\n`);
	Array.from(items).map(map);
	
};

export default class Test extends Component{
	constructor(props) {
		super(props);
		this.onFilterSubmit = this.onFilterSubmit.bind(this);
		this.onFilterCancel = this.onFilterCancel.bind(this);
		this.onFilterClear = this.onFilterClear.bind(this);
		this.verifierFilterItems = mockMyListFilter;
	};
	
	onFilterSubmit = (items) => {
		print(items, 'Submit');
	};

	onFilterCancel = (items) => {
		print(items, 'Cancel');
	};

	onFilterClear = (items) => {
		print(items, 'Clear');
	};
	
	render = () => (
		<Fragment>
			<div className="test">

				<MyList
					headers={[ 'x', 'y', 'z' ]}
					items={[ 1, 2, 3 ]}
				/>

				{/*<MyListFilterForm*/}
					{/*columns={2}*/}
					{/*items={this.verifierFilterItems}*/}
					{/*title="VerifierFilter"*/}
					{/*onClear={this.onFilterClear}*/}
					{/*onCancel={this.onFilterCancel}*/}
					{/*onSubmit={this.onFilterSubmit}*/}
				{/*/>*/}
				{/*<input*/}
					{/*type="button"*/}
					{/*value="print"*/}
					{/*onClick={() => {*/}
						{/*print(this.verifierFilterItems, 'Print');*/}
					{/*}}*/}
				{/*/>*/}
				{/*<input*/}
					{/*type="button"*/}
					{/*value="addX"*/}
					{/*onClick={() => {*/}
						{/*const x = { name: "X", state: true };*/}
						{/*this.verifierFilterItems.push(x);*/}
						{/*this.forceUpdate();*/}
					{/*}}*/}
				{/*/>*/}

			</div>
		</Fragment>
	);
	
}