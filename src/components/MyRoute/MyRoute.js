import React, { Component } from 'react';
import { Route } from 'react-router-dom';


class MyRoute extends Component {
	render() {
		const { component: MyComponent, exact, path, sensitive, staticContext, strict, ...rest } = this.props;
		return (
			<Route
				exact={exact}
				path={path}
				render={(props) => (
					<MyComponent {...rest} {...props}/>
				)}
				sensitive={sensitive}
				strict={strict}
			>{staticContext}</Route>
		);
	}
}


export default MyRoute;