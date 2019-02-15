import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as authSelect from 'src/selectors/auth'
import { hasAnyRole } from 'src/utils/auth'

// Component

export default (authorizedRoles, blockedRoles = []) => ChildComponent => {
  class ComposedComponent extends Component {

    state = {}

    // Life

    static getDerivedStateFromProps(props, state) {
      const { isAuthenticated, roles, history } = props

      const hasIncorrectRole = hasAnyRole(roles, blockedRoles)
      const hasCorrectRole = hasAnyRole(roles, authorizedRoles)

      if (!isAuthenticated || hasIncorrectRole || !hasCorrectRole) history.push("/signin")

      return null
    }

    // Render

    render = () => <ChildComponent {...this.props} />
  }

  // Export

  const mapStateToProps = state => ({
    isAuthenticated: authSelect.isAuthenticated(state),
    roles: authSelect.roles(state)
  })

  return connect(mapStateToProps)(ComposedComponent)
}