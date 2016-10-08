export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const NEW_EMPLOYEE = 'NEW_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const GET_EMPLOYEE = 'GET_EMPLOYEE'
export const EMPLOYEE_LIST = 'EMPLOYEE_LIST'
export const LOADING = 'LOADING'


export const login = employee => {
  return dispatch => {
    dispatch({ type: LOADING })

    request
      .post('/api/employees/login')
      .send(employee)
      .end((err, res) => {
        if(res.ok) {
          console.log(res)
          localStorage.setItem('HDEV_AUTH_TOKEN', res.body.token)

          dispatch({
            type: LOGIN,
            data: res.body
          })
        } else {
          console.log(err)
        }
      })
  }
}

export const logout = employee => {
  return dispatch => {
    request
      .post('/api/employees/logout')
      .set('Authorization ', authString)
      .end((err, res) => {
        if(res.ok) {
          localStorage.removeItem('HDEV_AUTH_TOKEN')

          dispatch({
            type: LOGOUT,
            data: res.body
          })
        }
      })
  }
}
