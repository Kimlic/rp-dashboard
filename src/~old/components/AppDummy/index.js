import React, { Fragment, Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './index.scss';
// import Logo from 'src/components/ComponentSignInLogo';
// import Form from 'src/components/ComponentSignInForm';
// import SignIn from 'src/components/ComponentSignIn';
import Sidebar from 'src/components/ComponentSidebar';


class AppDummy extends Component {
	constructor (props) {
		super(props);
	}

			// <div className="dummy">
			// 	<div className="dummy__title">Title</div>
			// 	<div className="dummy__text">Text</div>
			// </div>
			// <div className="dummy__test">
			// </div>
	render = () => (
		<Fragment>
			<Router>
				<Route path={} component />
				<Sidebar />
			</Router>
		</Fragment>
	);
}

export default AppDummy;