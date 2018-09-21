import React, { Component, Fragment } from 'react'

import './index.scss'

import FundsChart from './components/FundsChart'
import FundsList from './components/FundsList'

// Component

class Funds extends Component {

  // Render

  render() {
    return (
      <Fragment>
        <FundsChart />
        <FundsList />
      </Fragment>
    )
  }
}

// Export

export default Funds