import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import './ToolBar.scss';
import img0Src                        from 'src/assets/icons-settings.svg';
import img1Src                        from 'src/assets/icons-support.svg';


const ToolItem = (props) => {
	const { className, onClick, value, children, ...rest } = props;
	console.log(rest);
	return (
		<span
			className={className.map(_ => `toolbar_${_}`).join(' ')}
			onClick={onClick}
			{...rest}
		>
		{value || children}
	</span>
	);
}


class ToolBar extends Component {
	constructor(props) {
		super(props);
	}
	
	render () {
		const { onProfile, onLogout, onSupport, onSettings } = this.props;
		return (
			<div className='toolbar'>
				<ToolItem className={['item', 'logo']} style={{ backgroundImage: 'none' }} />
				<ToolItem className={['item']}>
					<ToolItem className={['link', 'avatar']} onClick={onProfile} />
					<ToolItem className={['link', 'login']} onClick={onProfile} value={this.login} />
					|
					<ToolItem className={['link', 'logout']} onClick={onLogout} value='Logout'/>
				</ToolItem>
				<ToolItem className={['link', 'item', 'support']} onClick={onSupport} value='Support'/>
				<ToolItem className={['link', 'item', 'settings']} onClick={onSettings} value='Settings' />
			</div>
		);
	}
}

export default ToolBar;