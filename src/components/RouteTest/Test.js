import React, { Component, Fragment } from 'react';
import './Test.scss';
import MyListFilterForm from '../RouteDashBoard/MyList/MyListFilterForm';
import mock from '../RouteDashBoard/MyList/MyListFilterForm-mock';


class RouteTest extends Component{
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClear = this.onClear.bind(this);
		this.verifierItems = mock;
	};
	
	onSubmit = (items) => {
		console.log('Submit:', items);
	};
	
	onCancel = (items) => {
		console.log('Cancel:', items);
	};
	
	onClear = (items) => {
		console.log('Clear:', items);
	};
	
	render = () => (
		<Fragment>
			<div className="test">
				<MyListFilterForm
					columns={2}
					items={this.verifierItems}
					title="XFilter"
					onClear={this.onClear}
					onCancel={this.onCancel}
					onSubmit={this.onSubmit}
				/>
			</div>
		</Fragment>
	);
	
}


export default RouteTest;