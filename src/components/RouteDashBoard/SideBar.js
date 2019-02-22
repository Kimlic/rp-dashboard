import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import img0Src from 'src/assets/sidebar-0-logo.svg';
import img1Src from 'src/assets/sidebar-1-identity.svg';
import img2Src from 'src/assets/sidebar-2-transactions.svg';
import img3Src from 'src/assets/sidebar-3-settings.svg';
import img4Src from 'src/assets/sidebar-4-attestators.svg';
import img5Src from 'src/assets/sidebar-5-store.svg';


class SideBar extends Component {
	constructor(props) {
		super(props);
		
		this.IDs = this.IDs.bind(this);
		
		
		console.log(props);
	}
	
	IDs = () => [
		'identity',
		'transactions',
		// 'xxx3',
		// 'xxx4',
		'store',
	];
	
	render() {
		const pageId = this.props.match.params.pageId;
		const id2item = (id, index) => ({
			key: id,
			to: `/dashboard/${id}`,
			className: ['sidebar__item', `sidebar__item_${id}`, pageId===id ? 'sidebar__item_active' : ''],
			text: '',
		});
		const item2jsx = (item) => (
			<Link key={item.key} to={item.to} className={item.className.join(' ')}>{item.text}</Link>
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


export default SideBar;
