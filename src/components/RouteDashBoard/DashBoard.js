import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Route from 'src/components/MyRoute';
import SideBar from './SideBar';
import './DashBoard.scss';


class DashBoard extends Component {
	constructor(props) {
		super(props);
		// TODO: disabled for debug
		// if (!this.props.token) {
		// 	this.props.onUnLogin();
		// }
		
	};
	
	render() {
		const { match } = this.props;
		console.log(match);
		return (
			<div className='dashboard'>
				<Redirect exact strict from='/dashboard' to='/dashboard/identity' />
				<Route path='/dashboard/:pageId' component={SideBar} />
				{/*<Router>*/}
					{/*<Fragment>*/}
						{/*<Route path={`${match.url}`} component={ SideBar }/>*/}
					{/*</Fragment>*/}
				{/*</Router>*/}
			</div>
		);
	};
	
}


export default DashBoard;
