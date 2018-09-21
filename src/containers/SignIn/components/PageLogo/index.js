import React from 'react'

import logo from 'src/assets/kimlic_logo.svg'
import './index.scss'

// Component

export default () => (
  <div className="logo vh-100">
    <svg className="logo--bg">
      <circle cx="50%" cy="35%" r="100%" fill="purple" className="logo--bg--circle__extralight" />
      <circle cx="50%" cy="35%" r="75%" fill="green" className="logo--bg--circle__light" />
      <circle cx="50%" cy="35%" r="50%" className="logo--bg--circle__medium" />
      <circle cx="50%" cy="35%" r="25%" className="logo--bg--circle__dark"/>
    </svg>

    <img src={logo} className="logo--img img-responsive" alt="logo" />
  </div>
)