import createToast from "src/factories/createToast"

const mark = action => `toast/${action}`

// Actions

export const ADD_TOAST = mark('ADD_TOAST')
export const addToast = (options = {}) => {
  const payload = createToast(options)

  return { type: ADD_TOAST, payload }
}

export const REMOVE_TOAST = mark('REMOVE_TOAST')
export const removeToast = (id) => ({ type: REMOVE_TOAST, payload: id })