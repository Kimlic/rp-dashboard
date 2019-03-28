import React, { Component, Fragment, }           from 'react';
// import {  } from 'react-route';
import { createBrowserHistory }                  from 'history';
import { Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import { ApolloProvider }                        from 'react-apollo';
import ApolloClient                              from 'apollo-boost';
import './index.scss';
import MyRoute                                   from 'src/components/MyRoute';
import DashBoard                                 from 'src/containers/DashBoard';
import SignIn                                    from 'src/containers/SignIn';
import NotFount                                  from 'src/containers/NotFound';
import Test                                      from 'src/containers/Test';


const history = createBrowserHistory();


const client = new ApolloClient({
	uri: 'https://48p1r2roz4.sse.codesandbox.io',
});


export default class App extends Component {
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
		// const gql = (_) => (<ApolloProvider client={client}>{_}</ApolloProvider>);
		
		const routes = () => (
			<Router history={history}>
				<Fragment>
					
					<ul
						style={{
								zIndex: 1000,
								position: 'fixed',
								display: 'inline-block',
								right: '12px',
								bottom: '12px',
								border: '1px solid red',
								margin: 0,
								padding: '12px'
							}}>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/test'>Test</Link></li>
						<li><Link to='/signin'>SignIn</Link></li>
						<li><Link to='/dashboard'>Dashboard</Link></li>
						<li><Link to='/not-found'>404</Link></li>
					</ul>
					
					<Switch>
						<MyRoute
							exact
							path='/not-found'
							component={NotFount}
						/>
						<MyRoute
							exact
							path='/signin'
							component={SignIn}
							token={this.state.token}
							onLogin={this.onLogin}
						/>
						<MyRoute
							strict
							path='/dashboard'
							component={DashBoard}
							token={this.state.token}
							onUnLogin={this.onUnLogin}
						/>
						<Route
							strict
							path='/test'
							component={Test}
						/>
						<Redirect push exact from='/' to='/signin' />
						<Redirect push from='*' to='/not-found' />
					</Switch>
					
				</Fragment>
			</Router>
		);
		return routes();
	};
}