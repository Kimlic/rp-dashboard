import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import img1Src from 'src/assets/sidebar-1-identity.svg';
import img2Src from 'src/assets/sidebar-2-fund.svg';
import img3Src from 'src/assets/sidebar-3-settings.svg';
import img4Src from 'src/assets/sidebar-4-attestators.svg';


class SideBar extends Component {
	constructor(props) {
		super(props);
		
		this.IDs = this.IDs.bind(this);
		
		
		console.log(props);
	}
	
	IDs = () => [
		'xxx1',
		'xxx2',
		'xxx3',
		'xxx4',
	];
	
	render() {
		const id2item = (id, index) => ({
			to: `/dashboard/${id}`,
			className: ['sidebar__item', `sidebar__item_${id}`],
			active: 2,
			text: '',
		});
		const item2jsx = (item) => (
			<Link to={item.to} className={item.className.join(' ')}>{item.text}</Link>
		);
		const items = this.IDs().map(id2item).map(item2jsx);
		return (
			<div className='sidebar'>
				{items}
			</div>
		);
	}
}


export default SideBar;
