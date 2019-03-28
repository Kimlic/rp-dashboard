import React, { Component, Fragment } from 'react';
import './PageBlock.scss';


class PageBlock extends Component {
	render() {
		return (
			<div className='page-block'>
				{this.props.children}
			</div>
		);
	}
}


export default PageBlock;