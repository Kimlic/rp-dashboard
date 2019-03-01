import React, { Component, Fragment, } from 'react';
// import {  } from 'react-route';
import { createBrowserHistory } from 'history';
import { Router, Route, Redirect, Switch, } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import MyRoute from 'src/components/MyRoute';
import DashBoard from 'src/components/RouteDashBoard';
import SignIn from 'src/components/RouteSignIn';
import NotFount from 'src/components/RouteNotFound';
import './App.scss';


const history = createBrowserHistory();


const client = new ApolloClient({
	uri: 'https://48p1r2roz4.sse.codesandbox.io',
});


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
			<ApolloProvider client={client}>
				<Router history={history}>
					<Switch>
						<Route exact path='/not-found' component={NotFount} />
						<MyRoute exact path='/signin' component={SignIn} token={this.state.token} onLogin={this.onLogin} />
						<MyRoute strict path='/dashboard' component={DashBoard} token={this.state.token} onUnLogin={this.onUnLogin} />
						<Route strict path='/test' component={NotFount} />
						<Redirect push exact from='/' to='/signin' />
						<Redirect push from='*' to='/not-found' />
					</Switch>
				</Router>
			</ApolloProvider>
		);
	};
}


export default App;