import React, { Component } from 'react';
import { Route } from 'react-router-dom';


export default class MyRoute extends Component {
	render() {
		const {
			component: MyComponent,
			exact,
			path,
			sensitive,
			staticContext,
			strict,
			...rest
		} = this.props;
		return (
			<Route
				exact={exact}
				path={path}
				sensitive={sensitive}
				strict={strict}
				render={(props) => (
					<MyComponent {...rest} {...props} />
				)}
			>
				{staticContext}
			</Route>
		);
	}
}