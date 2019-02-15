import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import './index.scss';

// import logo from 'src/assets/kimlic_logo.svg'

// import Button from './components/Button'


const XXX = () => (xxx);

class Sidebar extends Component {

	constructor(props) {
		console.log(arguments);
		console.log('constructor', props);
		super(props);
		this.IDs = [
			'identities',
			'funds',
			'settings',
			'attestators',
		];
		this.state = {
			selectedId: '',

		}
	};

	componentDidMount() {
		if (!this.state.selectedId.length) {
			this.state.selectedId = this.IDs[0];
		}
	}

	componentWillUnmount() {
	}

	// state = {
	//   selectedId: 'identities'
	// }

	// handleClick = (id) => {
	//   this.setState({ selectedId: id })

	//   this.props.onClick(id)
	// }

	// renderBtn = (selectedId) => (id) => (
	//   <Button key={id} id={id} imgSrc={require(`./assets/${id}_icon.svg`)} handleClick={this.handleClick} selected={selectedId === id} />
	// )

	// render2() {
	//   const { selectedId } = this.state

	//   return (
	//     <div className="sidebar vh-100 d-flex flex-column">
	//       <button className="sidebar--logo">
	//         <Link to="/">
	//           <img src={logo} className="img-responsive" alt="logo" />
	//         </Link>
	//       </button>

	//       {["identities", "funds", "settings", "attestators"].map(this.renderBtn(selectedId))}
	//     </div>
	//   )
	// }

	render(props) {
		console.log(arguments);
		console.log('render', props);
		return (
			<Router>
				<div className='sitebar'>
					<Link to='/xxx'>xxx</Link>
				</div>
				<Route exact path='/xxx' component={XXX} />
			</Router>
		);
	}
}

export default Sidebar;