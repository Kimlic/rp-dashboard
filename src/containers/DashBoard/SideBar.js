import React, { Component } from 'react';
import { Link }             from 'react-router-dom';
import './SideBar.scss';
import img0Src              from 'src/assets/icons-logo.svg';
import img1Src              from 'src/assets/icons-identity.svg';
import img2Src              from 'src/assets/icons-transactions.svg';
import img5Src              from 'src/assets/icons-store.svg';
// import img3Src              from 'src/assets/icons-settings.svg';
// import img4Src              from 'src/assets/icons-attestators.svg';


export default class SideBar extends Component {
	constructor(props) {
		super(props);
		
		this.IDs = this.IDs.bind(this);
	}
	
	IDs = () => [
		'identity',
		'transactions',
		'store',
		// 'settings',
		// 'attestators',
	];
	
	render() {
		const pageId = this.props.match.params.pageId;
		const id2item = (id, index) => ({
			key: `sidebar-item-${id}`,
			to: `/dashboard/${id}`,
			className: [
				'sidebar__item',
				`sidebar__item_${id}`,
				pageId===id ? 'sidebar__item_active' : ''
			],
			text: '',
		});
		const item2jsx = (item) => (
			<Link
				key={item.key}
				to={item.to}
				className={item.className.join(' ')}>
				{item.text}
			</Link>
		);
		const items = this.IDs().map(id2item).map(item2jsx);
		return (
			<div className='sidebar'>
				<div className='sidebar__item_logo'></div>
				{items}
			</div>
		);
	}
}