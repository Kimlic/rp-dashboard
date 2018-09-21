import React from "react"
import PropTypes from "prop-types"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { CSSTransitionGroup, CSSTransition, transit } from "react-css-transition"

import { removeToast } from "src/actions/toast"

import './index.scss'

import Toast from "./Toast"

// Component

const FadeInOut = (props) => (
  <CSSTransition
    {...props}
    defaultStyle={{ opacity: 0 }}
    enterStyle={{ opacity: transit(1, 500, "ease-in-out") }}
    leaveStyle={{ opacity: transit(0, 500, "ease-in-out") }}
    activeStyle={{ opacity: 1 }} />
)

const Toasts = ({ actions, toasts }) => {
  if (!toasts) return null

  return (
    <ul className="toasts">
      <CSSTransitionGroup>
        {toasts.map(toast => {
          setTimeout(() => { actions.removeToast(toast.id) }, 2000)

          return (
            <FadeInOut className="py-1" key={toast.id}>
              <Toast {...toast} onDismissClick={actions.removeToast} />
            </FadeInOut>
          )
        })}
      </CSSTransitionGroup>
    </ul>
  )
}

// Export

CSSTransition.childContextTypes = {}

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired
  }).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeToast }, dispatch)
})

const mapStateToProps = state => ({
  toasts: state.notificationsReducer.toasts
})

export default connect(mapStateToProps, mapDispatchToProps)(Toasts)