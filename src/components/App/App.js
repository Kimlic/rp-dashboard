import React, { Component, Fragment, } from 'react';
// import {  } from 'react-route';
import { createBrowserHistory } from 'history';
import { Router, Redirect, Switch, } from 'react-router-dom';
import Route from 'src/components/MyRoute';
import DashBoard from 'src/components/RouteDashBoard';
import SignIn from 'src/components/RouteSignIn';
import NotFount from 'src/components/RouteNotFound';
import './App.scss';


const history = createBrowserHistory();


class App extends Component {
	constructor(props) {
		super(props);

		this.onLogin = this.onLogin.bind(this);
		this.onUnLogin = this.onUnLogin.bind(this);

		this.state = {
			token: '',
		};
	};
	
	onLogin(token) {
		console.log(`App.onLogin: token=${token}`);
		if (token) {
			this.setState( { token } );
			history.push('/dashboard');
		}
		else {
			this.onUnLogin();
		}
	};
	
	onUnLogin() {
		console.log('App.onUnLogin.');
		this.setState( { token: '' } );
		history.push('/signin');
	};

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route exact path='/not-found' component={NotFount} />
					<Route exact path='/signin' component={SignIn} token={this.state.token} onLogin={this.onLogin} />
					<Route strict path='/dashboard' component={DashBoard} token={this.state.token} onUnLogin={this.onUnLogin} />
					<Route strict path='/test' component={NotFount} />
					<Redirect push exact from='/' to='/signin' />
					<Redirect push from='*' to='/not-found' />
				</Switch>
			</Router>
		);
	};
}


export default App;