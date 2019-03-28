import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect }    from 'react-router-dom';
import Index                          from 'src/components/MyRoute';
import SideBar                        from './SideBar';
import ToolBar                        from './ToolBar';
import Identity                       from './Identity';
import './index.scss';


export default class DashBoard extends Component {
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
				<div className='dashboard__sidebar'>
					<Route path='/dashboard/:pageId' component={SideBar} />
				</div>
				<div className='dashboard__main'>
					<ToolBar
						onProfile={() => console.log('profile')}
						onLogout={() => console.log('logout')}
						onSupport={() => console.log('support')}
						onSettings={() => console.log('settings')}
					/>
					<Switch>
						<Route path='/dashboard/identity' component={() => ''} />
						{/*<Route path='/dashboard/identity' component={Identity} />*/}
						<Redirect exact strict from='/dashboard' to='/dashboard/identity' />
					</Switch>
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