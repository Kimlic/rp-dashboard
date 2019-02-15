import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';


class RouteNotFound extends Component{
	render = () => (
		<Fragment>
			<div className='not-found'>
				<h1 className='not-found__title'>Page not specified</h1>
				<div className='not-found__content'>
					<p>Maybe you searched for</p>
					<ul className='not-found__go-list'>
						<li className='not-found__go-item'>
							<Link className='not-found__go-link' to='/signin'>SingIn</Link>
						</li>
						<li className='not-found__go-item'>
							<Link className='not-found__go-link' to='/dashboard'>DashBoard</Link>
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
	
}


export default RouteNotFound;