import React, { Component, Fragment } from 'react';
import './MyList.scss';


class MyList extends Component {
	constructor(props) {
		super(props);
		this.items = this.props.items || [];
		this.headers = this.props.headers || [];
		this.renderHeader = this.renderHeader.bind(this);
		this.renderHeaders = this.renderHeaders.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.renderItems = this.renderItems.bind(this);
	}
	
	renderHeader = (header, index) => 'header-' + index; // html
	renderItem = (item, index) => 'data-' + index; // html
	
	renderHeaders() {
		const hmap = ( header, index ) => this.renderHeader(header, index);
		return this.headers().map(hmap);
	}
	renderItems() {
		const hmap = (item, index) => (header, hIndex) => header.render(item, index, {index: hIndex, ...header});
		const imap = (item, index) => this.headers().map(hmap(item, index));
		return this.items().map(imap);
	}
	
	render() {
		return (
			<Fragment>
				xxx
			</Fragment>
		);
	}
	
}


export default MyList;