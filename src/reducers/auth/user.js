import * as authAction from 'src/actions/auth'

export default (state = null, action) => {
  switch (action.type) {
    case authAction.LOGIN_FAILED:
    case authAction.LOGOUT: return null
    case authAction.LOGIN_SUCCESS: return action.payload.user
    default: return state
  }
}