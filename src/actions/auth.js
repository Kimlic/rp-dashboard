import { AUTH_TOKEN } from 'src/constants/auth'

const mark = action => `auth/${action}`

// Actions

export const LOGIN_SUCCESS = mark('LOGIN_SUCCESS')
export const loginSuccess = (payload) => {
  localStorage.setItem(AUTH_TOKEN, payload.token)

  return { type: LOGIN_SUCCESS, payload }
}

export const LOGIN_FAILED = mark('LOGIN_FAILED')
export const loginFailed = () => {
  localStorage.removeItem(AUTH_TOKEN)

  return { type: LOGIN_FAILED, error: true }
}

export const LOGOUT = mark('LOGOUT')
export const logout = () => {
  localStorage.removeItem(AUTH_TOKEN)

  return { type: LOGOUT }
}
