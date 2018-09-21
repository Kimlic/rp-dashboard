import { combineReducers } from 'redux'
import recycleState from 'redux-recycle'

import { LOGOUT } from 'src/actions/auth'

import authReducer from './auth'
import notificationsReducer from './notifications'
import uploadReducer from './upload'

// Reducers

const libReducers = {}
const appReducers = {
  authReducer,
  notificationsReducer,
  uploadReducer
}

const rootReducer = combineReducers({
  ...libReducers,
  ...appReducers
})
const safeRootReducer = recycleState(rootReducer, [LOGOUT]);

export default safeRootReducer