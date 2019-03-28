import React, { Component, Fragment } from 'react';
import PageBlock                      from '../PageBlock/index';
import MyList                         from '../MyList/index';
import './Identity.scss';
import mock                           from '../MyList/MyList-mock';

class Identity extends Component {
	cmp = (a, b) => a > b ? 1 : a < b ? -1 : 0;
	cmpText = (a, b) => a.localeCompare(b);
	cmpDate = (a, b) => this.cmp(+a, +b);
	filterInList = (value, list = []) => (list || []).some( (_) => value===_ );
	headers = () => [
		{
			key: 'name',
			title: 'Client name',
			render: (item) => (<div>{item.firstName} {item.lastName}</div>),
			cmp: (a, b) => this.cmpText(a.firstName, b.firstName) || this.cmpText(a.lastName, b.lastName),
		},
		{
			key: 'verifier',
			title: 'Verifier',
			render: (item) => (<div>{item.attestator}</div>),
			cmp: (a, b) => this.cmpText(a.attestator, b.attestator),
			filter: (item) => this.filterInList(item.attestatator, this.state.filters.attestator),
		},
		{
			key: 'country',
			title: 'Country',
			render: (item) => (<div>{item.country}</div>),
			cmp: (a, b) => this.cmpText(a.country, b.country),
			filter: (item) => this.filterInList(item.country, this.state.filters.country),
		},
		{
			key: 'type',
			title: 'Doc Type',
			render: (item) => (<div>{item.type}</div>),
			cmp: (a, b) => this.cmpText(a.type, b.type),
			filter: (item) => this.filterInList(item.type, this.state.filters.type),
		},
		{
			key: 'created',
			title: 'Applied At',
			render: (item) => (<div>{item.insertedAt}</div>),
			cmp: (a, b) => this.cmpDate(a, b),
		},
		{
			key: 'verified',
			title: 'Verified At',
			render: (item) => (<div>{item.verifiedAt}</div>),
			cmp: (a, b) => this.cmpDate(a, b),
		},
		{
			key: 'status',
			title: 'Status',
			render: (item) => (<div>{item.status}</div>),
			cmp: (a, b) => this.cmpText(a, b),
		},
	];
	
	// filters2List = (field) => this.state.
	
	constructor(props) {
		super(props);
		
		this.renderHeader = this.renderHeader.bind(this);

		this.state = {
			headers: this.headers,
			sort: [
				{
					header: 'name',
					direction: 'up',
				},
				{
					header: 'country',
					direction: 'down',
				},
			],
			filter: { // scope ( function or function or ...) and scope (...)
				// 'name': [ filter function f1(item) ],
			},
			items: [],
		};
	};
	
	componentDidMount() {
		this.setState({ list: mock });
	};
	
	render() {
		const headers = this.state.headers.map((header) => this.renderHeader(header));
		return (
			<Fragment>
				<PageBlock>
					{headers}
				</PageBlock>
			</Fragment>
		);
	};
	
	renderHeader = (item) => {
		const { title } = item;
		const filter = (_) => _[0] === item.key;
		const map = (_) => _[1];
		const { headersOreder } = this.state;
		const order = headersOreder.filter(filter).map(map).shift() || 0;
		const direction = order>0 ? 'up' : order<0 ? 'down' : '';
		return (
			<Fragment>
				<span className='header-line__name'>{title}</span>
				{/*<Link to={ {*/}
					{/*search: '?' + this.state.headersOreder.map((_) => _[0] + (_[1]>1 ? 'up' : _[1]<-1 ? 'down' : ''))*/}
				{/*}}>*/}
				<span className='header-line__sort' data-sort={direction}></span>
				{/*</Link>*/}
			</Fragment>
		);
	};
	
	// renderRow = (items) => {
	// 	return (
	// 		<Fragment>
	//
	// 		</Fragment>
	// 	);
	// };
	
	
}


export default Identity;