import {
  LOGIN,
  LOGOUT,
  NEW_EMPLOYEE,
  UPDATE_EMPLOYEE,
  GET_EMPLOYEE,
  EMPLOYEE_LIST,
  LOADING
} from '../actions/employee'

export const employee = (state = {}, action) => {
  const setState = obj => ({...state, ...obj})

  switch(action.type) {
    default:
      return state
  }
}
