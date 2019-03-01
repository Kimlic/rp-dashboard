import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import MyRoute from 'src/components/MyRoute';
import SideBar from './SideBar';
import Identity from './Identity';
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
				{/*<Redirect exact strict from='/dashboard' to='/dashboard/identity' />*/}
				<div className='dashboard__sidebar'>
					<Route path='/dashboard/:pageId' component={SideBar} />
				</div>
				<div className='dashboard__main'>
					<Route path='/dashboard/identity' component={Identity} />
				</div>
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
