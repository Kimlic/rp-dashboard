import { combineReducers } from 'redux'

import user from './user'
import roles from './roles'

export default combineReducers({
  user,
  roles
})
