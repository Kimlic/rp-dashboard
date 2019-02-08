import React, { Component } from 'react';
import './index.scss';
import img1Src from 'src/assets/fingerprint.svg';
import img2Src from 'src/assets/shild-with-fingerprint+kimlic.svg';


class Logo extends Component {
	constructor(props) {
		super(props);
	}
	
	render = () => (
	<div className='signin-logo'>
		<div className='signin-logo__item signin-logo__bg'></div>
		<div className='signin-logo__item signin-logo__fg'></div>
	</div>
	);
}


export default Logo;
