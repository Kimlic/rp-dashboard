import React, { Component } from 'react'

import './index.scss'

import AttestatorList from './components/AttestatorList'

class Attestators extends Component {

  // Render

  render() {
    return (
      <div className="attestators">
        <h2>Marketplace</h2>
        <AttestatorList />
      </div>
    )
  }
}

export default Attestators