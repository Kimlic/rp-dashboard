import React, { Component, Fragment } from 'react'

import './index.scss'

import IdentityChart from './components/IdentityChart'
import IdentityList from './components/IdentityList'

// Component

class Identities extends Component {

  // Render

  render() {
    return (
      <Fragment>
        <IdentityChart />
        <IdentityList />
      </Fragment>
    )
  }
}

// Export

export default Identities