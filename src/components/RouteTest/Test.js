import React, { Component, Fragment } from 'react';
import './Test.scss';
import MyListFilterForm from '../RouteDashBoard/MyList/MyListFilterForm';
import mock from '../RouteDashBoard/MyList/MyListFilterForm-mock';


class RouteTest extends Component{
	constructor(props) {
		super(props);
		this.verifierItems = mock;
	}
	
	render = () => (
		<Fragment>
			<div className='test'>
				<MyListFilterForm items={this.verifierItems} />
			</div>
		</Fragment>
	);
	
}


export default RouteTest;