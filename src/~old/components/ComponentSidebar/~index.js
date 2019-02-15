import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

import logo from 'src/assets/kimlic_logo.svg'

import Button from './components/Button'

class Sidebar extends Component {

  state = {
    selectedId: 'identities'
  }

  // Handlers

  handleClick = (id) => {
    this.setState({ selectedId: id })

    this.props.onClick(id)
  }

  // Render

  renderBtn = (selectedId) => (id) => (
    <Button key={id} id={id} imgSrc={require(`./assets/${id}_icon.svg`)} handleClick={this.handleClick} selected={selectedId === id} />
  )

  render() {
    const { selectedId } = this.state

    return (
      <div className="sidebar vh-100 d-flex flex-column">
        <button className="sidebar--logo">
          <Link to="/">
            <img src={logo} className="img-responsive" alt="logo" />
          </Link>
        </button>

        {["identities", "funds", "settings", "attestators"].map(this.renderBtn(selectedId))}
      </div>
    )
  }
}

export default Sidebar