import React, { Component, Fragment } from 'react';
import './Test.scss';
import MyListFilterForm from '../RouteDashBoard/MyList/MyListFilterForm';


class RouteTest extends Component{
	constructor(props) {
		super(props);
		this.verifierItems = [
			{
				state: true,
				name: 'Veriff',
			},
			{
				state: true,
				name: 'Jumio',
			},
			{
				state: false,
				name: 'Trulioo',
			},
			{
				state: false,
				name: 'Onfido',
			},
			{
				state: false,
				name: 'Electronic ID',
			},
			{
				state: false,
				name: 'Idscan',
			},
		];
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