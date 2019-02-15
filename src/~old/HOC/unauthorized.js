import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authSelect from 'src/selectors/auth'

// Component

export default ChildComponent => {
  class ComposedComponent extends Component {

    state = {}

    // Life
    
    static getDerivedStateFromProps(props, state) {
      const { isAuthenticated, history } = props
      if (isAuthenticated) history.push("/")

      return null
    }

    // Render

    render = () => <ChildComponent {...this.props} />
  }

  // Export

  const mapStateToProps = (state) => ({ 
    isAuthenticated: authSelect.isAuthenticated(state)
  })

  return connect(mapStateToProps)(ComposedComponent)
}