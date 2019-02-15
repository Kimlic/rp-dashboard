import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import SideBar from './SideBar';
import './DashBoard.scss';


class DashBoard extends Component {
	constructor(props) {
		super(props);
		// TODO: disabled for debug
		// if (!this.props.getToken()) {
		// 	this.props.onUnLogin();
		// }
		
	};
	
	render() {
		const { match } = this.props;
		console.log(match);
		return (
			<div className='dashboard'>
				<Router>
					<Fragment>
						<Route path={`${match.url}`} component={ SideBar }/>
					</Fragment>
				</Router>
			</div>
		);
	};
	
}


export default DashBoard;
