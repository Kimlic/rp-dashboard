import React, { Component, Fragment } from 'react';
import './MyList.scss';


const mapProps2Header = () => ({

});


class MyList extends Component {
	constructor(props) {
		super(props);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderHeaders = this.renderHeaders.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.renderItems = this.renderItems.bind(this);
		const { header, items } = this.props;
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
		const { headers, items } = this.props;
		const mapItems = (_) => ({
		
		});
		const sortItems = (a, b) => {};
		const renderItem = (item) => (
			<tr key={item}>
				{headers.map(header => (
					<td key={item + header}>{item + header}</td>
				))}
			</tr>
		);
		return (
			<Fragment>
				<table>
					<thead>
						<tr>
							{headers.map(header => (
								<th>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{items.map(mapItems).sort(sortItems).map(renderItem)}
					</tbody>
				</table>
			</Fragment>
		);
	}
	
}


export default MyList;