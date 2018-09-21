import React, { Component, Fragment } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import './index.scss'

import logo from 'src/assets/rp_logo.svg'

import { role } from 'src/constants/auth'
import authorized from 'src/HOC/authorized'

import Identities from './containers/Identities'
import Funds from './containers/Funds'
import Settings from './containers/Settings'
import Attestators from './containers/Attestators'
import Sidebar from './components/Sidebar'

// Component

class Dashboard extends Component {

  // Private

  handleSidebarClick = (url) => (id) => {
    this.props.history.push(`${url}/${id}`)
  }

  // Render

  renderRoutes = (url) => (
    <Switch>
      <Route path={`${url}/identities`} component={Identities} />
      <Route path={`${url}/funds`} component={Funds} />
      <Route path={`${url}/settings`} component={Settings} />
      <Route path={`${url}/attestators`} component={Attestators} />
      <Redirect path={url} to={`${url}/identities`} />
    </Switch>
  )

  render() {
    const url = this.props.match.url

    return (
      <div className="d-flex flex-row">
        <div className="vh-100" id="sidebar">
          <div className="vh-100" id="sidebar-content">
            <Sidebar onClick={this.handleSidebarClick(url)} />
          </div>
        </div>
        <div></div>
        <div className="dashboard" id="dashboard">
          <Navbar light expand="md">
            <NavbarBrand href="/">
              <img src={logo} height="50rem" className="img-responsive" alt="logo" />
            </NavbarBrand>

            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/support">Help / Support</NavLink>
              </NavItem>
            </Nav>
          </Navbar>

          {this.renderRoutes(url)}
        </div>
      </div>
    )
  }
}

// Export 

export default authorized([role.admin])(Dashboard)