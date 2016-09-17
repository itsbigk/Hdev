import { combineReducers } from 'redux'
import { user } from './user'
import { employee } from './employee'

const rootReducer = combineReducers({
  user,
  employee
})

export default rootReducer
