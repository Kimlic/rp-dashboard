import React, { Fragment, Component } from 'react';
import './index.scss';
// import Logo from 'src/components/ComponentSignInLogo';
// import Form from 'src/components/ComponentSignInForm';
import SignIn from 'src/components/ComponentSignIn';


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
			<SignIn />
		</Fragment>
	);
}

export default AppDummy;