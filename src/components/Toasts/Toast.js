import React, { Component } from "react"
import PropTypes from "prop-types"

// Component

class Toast extends Component {

  // Life

  shouldComponentUpdate() {
    return false
  }

  // Render

  render() {
    const { color: backgroundColor, text, id, onDismissClick } = this.props

    return (
      <li className="toast" style={{ backgroundColor }}>
        <p className="toast__content">{text}</p>
        <button className="toast__dismiss" onClick={() => onDismissClick(id)}>x</button>
      </li>
    )
  }
}

// Export

Toast.propTypes = {
  color: PropTypes.string.isRequired,
  onDismissClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default Toast