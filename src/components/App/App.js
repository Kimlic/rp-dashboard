import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import RouteDashBoard from 'src/components/RouteDashBoard';
import RouteSignIn from 'src/components/RouteSignIn';
import RouteNotFount from 'src/components/RouteNotFound';
import './App.scss';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
		};
		this.onLoginChange = this.onLoginChange.bind(this);
		// this.onLogin = this.onLogin.bind(this);
		// this.onUnLogin = this.onUnLogin.bind(this);
		this.onLogined = this.onLogined.bind(this);
		this.onUnLogined = this.onUnLogined.bind(this);
		this.getToken = this.getToken.bind(this);
	};
	
	render() {
		return (
			<Router>
				<Switch>
					<Redirect
						exact={true}
						from='/'
						to='/dashboard'
					/>
					<Route
						path='/signin'
						render={
							( props ) =>
								<RouteSignIn
									onChange={ this.onLoginChange() }
									onLogin={ this.onLogin(props) }
									getToken={ this.getToken }
									{ ...props }
								/>
						}
					/>
					<Route
						path='/dashboard'
						render={
							( props ) =>
								<RouteDashBoard
									onUnLogin={ this.onUnLogin(props) }
									getToken={ this.getToken }
									{ ...props }
								/>
						}
					/>
					<Route
						exact={ true }
						path='/test'
						component={ RouteNotFount }
					/>
					<Route
						exact={ true }
						path='/not-found'
						component={ RouteNotFount }
					/>
					<Redirect from='*' to='/not-found' />
				</Switch>
			</Router>
		);
	};
	
	onLoginChange = () => () => 0;
	
	onLogin = (props) => (token) => this.onLogined(token, props);
	
	onUnLogin = (props) => () => this.onUnLogined(props);
	
	onLogined(token, props) {
		console.log(`Login: token=${token}`);
		if (token) {
			this.setState( { token } );
			props.history.push('/dashboard');
		}
		else {
			this.onUnLogin(props);
		}
	};
	
	onUnLogined(props) {
		console.log('UnLogin.');
		this.setState( { token: '' } );
		props.history.push('/signin');
	};
	
	getToken() {
		return this.state.token;
	};
	
}


export default App;